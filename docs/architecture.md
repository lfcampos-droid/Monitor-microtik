# Arquitectura del Sistema - REN Enterprise Monitor

Este documento describe la arquitectura técnica, los flujos de datos y las relaciones entre los diferentes componentes del sistema **REN Enterprise Monitor v2.2**, reconstruido íntegramente con **Next.js** y **PostgreSQL**.

---

## 1. Vista General de Componentes

El sistema se basa en una arquitectura **Monolítica/Fullstack** moderna utilizando el framework Next.js. Todos los componentes operan dentro del mismo ecosistema de Node.js:

1. **Plataforma de Monitoreo Web (Next.js App Router)**:
    * **Frontend (React Server/Client Components)**: Interfaz web optimizada para visualización interactiva y pantallas de Centros de Operación de Red (Modo NOC). Construida con Tailwind CSS o Vanilla CSS manteniendo la estética Glassmorphism.
    * **Capa de APIs (Next.js API Routes)**: Endpoints RESTful integrados en Next.js que actúan como puente hacia la base de datos PostgreSQL y hacia el router MikroTik.
    * **Worker de Telemetría (Node.js Background)**: Un proceso secundario (o cron job integrado) que se ejecuta del lado del servidor para recolectar métricas del router en tiempo real.
    * **Base de Datos PostgreSQL**: Almacena de forma persistente la telemetría, el inventario, los históricos de velocidad y las alertas del sistema (útil para auditorías e ISO 9001).

*(Nota: La aplicación de escritorio en Python ha sido deprecada en favor de una PWA responsiva integrada directamente en este dashboard web).*

---

## 2. Flujo de Datos Principal (Monitoreo Web)

El flujo de recolección y despliegue del sistema sigue los siguientes pasos:

1. **Recolección (Polling)**: El Worker de Node.js realiza peticiones a la API del MikroTik cada 1 segundo (usando librerías como `node-routeros`) para consultar:
    * Uso de CPU, memoria RAM disponible, almacenamiento, temperatura interna y voltaje del hardware.
    * Contadores de bytes recibidos (`rx-byte`) y transmitidos (`tx-byte`) en las interfaces WAN1 (`v_2689`) y WAN2 (`WAN2-ether3`).
    * Túneles VPN activos y sesiones.
2. **Cálculo de Tasas (bps)**: El worker compara el total acumulado de bytes respecto al segundo anterior para calcular con precisión la tasa de transferencia en bits por segundo (bps).
3. **Procesamiento de Tareas de Fondo**:
    * **Cada 5 minutos**: Escanea la tabla ARP y los leases de DHCP activos para registrar dispositivos online.
    * **Cada 1 hora**: Ejecuta pruebas de latencia y velocidad para verificar el ancho de banda del ISP contratado.
4. **Validación de Alertas Directas**: El backend comprueba si el tráfico supera umbrales críticos o si hay pérdida de paquetes. En tal caso, despacha una alerta por correo electrónico.
5. **Persistencia**: Los datos se insertan directamente en **PostgreSQL** mediante un ORM (como Prisma o Drizzle) o consultas nativas.
6. **Visualización**: El Frontend en React (Client Components) se suscribe a los cambios o realiza polling (`SWR` / `React Query`) a las API Routes de Next.js para renderizar los gráficos dinámicos.

---

## 3. Diagnósticos y Herramientas (Reemplazo de la App de Escritorio)

Las funciones de diagnóstico profundo (ICMP Ping, Traceroute, análisis de caídas) han sido migradas al servidor de Next.js. El usuario puede invocar un "Run Diagnostics" desde la interfaz web, lo cual ejecuta comprobaciones a nivel de servidor (Node.js) y devuelve un reporte en pantalla instantáneo.
