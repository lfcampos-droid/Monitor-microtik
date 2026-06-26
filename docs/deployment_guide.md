# Guía de Despliegue - REN Enterprise Monitor (Next.js)

Este documento proporciona una guía paso a paso para la instalación, configuración e inicio desde cero de la plataforma **REN Enterprise Monitor v2.2** utilizando Node.js, Next.js y PostgreSQL.

---

## 1. Requisitos Previos del Sistema

### 1.1 Hardware y Red
*   **Servidor/PC**: Windows, Linux o macOS. Conexión de red permanente al MikroTik.
*   **Router MikroTik**: Conector y API de RouterOS habilitada en el puerto predeterminado: `/ip service enable api`

### 1.2 Software
*   **Node.js**: Versión 18.0 o superior (`npm` v9+).
*   **Base de Datos**: PostgreSQL 13 o superior corriendo de forma local o remota.

---

## 2. Instalación de Dependencias

Abra una terminal en la raíz del proyecto y ejecute el siguiente comando para instalar las librerías necesarias del framework Next.js:

```bash
npm install
```

---

## 3. Configuración de Entorno (.env)

Cree un archivo llamado `.env` en la raíz del proyecto e ingrese sus variables críticas:

```env
# Conexión a la base de datos PostgreSQL
DATABASE_URL="postgresql://usuario:password@localhost:5432/ren_monitor"

# Credenciales de MikroTik
MK_IP="10.24.0.1"
MK_USER="admin"
MK_PASS="TuPassword"

# Alertas SMTP
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="tu_correo@gmail.com"
SMTP_PASS="tu_password_de_aplicacion"
```

---

## 4. Inicialización de la Base de Datos

El sistema incluye migraciones ORM (por ejemplo, con Prisma). Para crear el esquema de tablas en su instancia de PostgreSQL, ejecute:

```bash
npx prisma db push
# O el comando equivalente de su ORM para aplicar migraciones.
```

---

## 5. Ejecución en Modo Desarrollo

Para iniciar el servidor local con recarga en caliente (Hot-Reload) e inspeccionar los componentes React y el Worker de Telemetría:

```bash
npm run dev
```

Abra el navegador en `http://localhost:3000`.

---

## 6. Despliegue en Producción

Para llevar el proyecto a un estado óptimo y productivo, es necesario compilar la aplicación Fullstack de Next.js.

1.  Construya la versión de producción:
    ```bash
    npm run build
    ```
2.  Inicie el servidor de producción:
    ```bash
    npm run start
    ```
3.  *(Opcional)* Para ejecutar la aplicación como un servicio permanente (Daemon) que resista reinicios, instale **PM2**:
    ```bash
    npm install -g pm2
    pm2 start npm --name "ren-monitor" -- run start
    ```
