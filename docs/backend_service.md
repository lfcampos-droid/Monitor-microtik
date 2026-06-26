# Servicios Backend y API (Next.js) - REN Enterprise Monitor

Este documento detalla el funcionamiento interno de la capa de recolección de telemetría y los endpoints de acceso a datos utilizando únicamente el ecosistema de **Next.js** y **Node.js**.

---

## 1. Worker de Telemetría Node.js (Background Task)

En lugar de utilizar un daemon de Python, el proyecto integra un sistema de procesos en segundo plano (vía Custom Node.js Server en Next.js, o cron jobs como `node-cron`) que extrae las métricas del Router MikroTik.

### 1.1 Estructura y Flujo de Operación
El script de Worker (ej. `workers/telemetry.js`) realiza un bucle continuo o es invocado cada 1 segundo:

1. **Conexión API**: Se autentica con MikroTik usando librerías como `node-routeros`.
2. **Extracción (`collectTelemetry()`)**: Extrae CPU, Memoria, Interfaces, Ping, Firewall, VPNs.
3. **Cálculo (bps)**: Compara los bytes anteriores en caché (Redis o en memoria) para calcular tasas bps reales (WAN1 y WAN2).
4. **Validación de Alertas**: Si hay anomalías críticas (pérdida de paquetes, exceso de carga), registra en la base de datos `system_alerts` y dispara un correo SMTP vía `Nodemailer`.
5. **Persistencia (Ingesta)**: Escribe el JSON final directamente en **PostgreSQL** mediante el ORM (e.g. Prisma `prisma.router_stats.create()`).

### 1.2 Mapeo de Inventario y Speedtests
* **Cada 5 minutos**: Se consulta `/ip/arp` y `/ip/dhcp-server/lease`. Los datos se procesan realizando un "Upsert" (`ON CONFLICT (mac_address) DO UPDATE`) en la tabla `device_inventory` de PostgreSQL.
* **Cada 1 hora**: Se ejecuta el chequeo de ancho de banda y se persiste en `speed_history`.

---

## 2. API Routes (Next.js)

Next.js expone puntos de acceso `/api` (App Router: `app/api/...`) para que el Frontend consuma la información.

### 2.1 Consulta de Datos (`/api/metrics`)
Permite a los Client Components de React extraer la información en formato JSON a través de peticiones HTTP GET.

| Ruta (Endpoint) | Parámetros Query | Salida Retornada | Caso de Uso |
| :--- | :--- | :--- | :--- |
| `/api/metrics/live` | *Ninguno* | Últimos 60 registros ordenados desc. | Gráficos de tráfico en tiempo real. |
| `/api/metrics/history` | `start=ISO`, `end=ISO` | Registros históricos en un rango. | Reportes de uso y SLA. |
| `/api/alerts` | *Ninguno* | Alertas activas o resueltas. | Listado de eventos en el UI. |
| `/api/devices` | *Ninguno* | Dispositivos online. | Inventario de equipos conectados. |

---

## 3. Configuración de Correo SMTP
Se utiliza **Nodemailer** dentro de las API Routes o el Worker. La configuración se administra mediante variables de entorno en el archivo `.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_correo@gmail.com
SMTP_PASS=tu_password_de_aplicacion
ALERT_RECIPIENT=administrador@empresa.com
```
