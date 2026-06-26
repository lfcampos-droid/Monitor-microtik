# Esquema de Base de Datos - REN Enterprise Monitor

Este documento detalla el esquema y la estructura de la base de datos **PostgreSQL**, la cual almacena de forma persistente la telemetría, el inventario, los históricos de velocidad y las alertas operativas.

---

## 1. Diagrama Entidad-Relación (ER)

Dado que es un sistema orientado a telemetría de series de tiempo, las tablas están diseñadas para lecturas rápidas e inserciones masivas optimizadas mediante índices en campos temporales (Timestamp).

---

## 2. Descripción de Tablas

### 2.1 Tabla `router_stats`

Almacena las métricas de rendimiento recolectadas del router en tiempo real.

| Columna | Tipo PostgreSQL | Nulabilidad | Descripción / Unidad |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL / BIGSERIAL | NOT NULL | Clave primaria autoincrementable. |
| `created_at` | TIMESTAMPTZ | NOT NULL | Fecha y hora de captura (Default: `NOW()`). Indexado. |
| `cpu_load` | INTEGER | NULL | Uso de CPU en porcentaje (0 - 100%). |
| `free_memory` | BIGINT | NULL | Memoria RAM disponible en bytes. |
| `total_memory` | BIGINT | NULL | Memoria RAM total física en bytes. |
| `hdd_free` | BIGINT | NULL | Almacenamiento libre en disco en bytes. |
| `hdd_total` | BIGINT | NULL | Almacenamiento total en disco en bytes. |
| `temperature` | INTEGER | NULL | Temperatura interna en grados Celsius. |
| `voltage` | NUMERIC(5,2) | NULL | Voltaje de alimentación del router (V). |
| `uptime` | VARCHAR(50) | NULL | Formato de tiempo activo (ej. `3d5h12m`). |
| `dhcp_leases` | INTEGER | NULL | Cantidad de concesiones activas de DHCP. |
| `queue_count` | INTEGER | NULL | Cantidad de colas simples activas. |
| `wan_drops` | INTEGER | NULL | Cantidad de paquetes descartados en recepción (WAN). |
| `log_message` | TEXT | NULL | Última línea de log registrada en el MikroTik. |
| `wan1_tx` | BIGINT | NULL | Velocidad de subida en WAN1 (bps). |
| `wan1_rx` | BIGINT | NULL | Velocidad de descarga en WAN1 (bps). |
| `wan2_tx` | BIGINT | NULL | Velocidad de subida en WAN2 (bps). |
| `wan2_rx` | BIGINT | NULL | Velocidad de descarga en WAN2 (bps). |
| `vpn_count` | INTEGER | NULL | Cantidad de conexiones VPN activas. |
| `ping_avg_ms` | NUMERIC(8,2) | NULL | Latencia promedio en milisegundos hacia internet. |
| `ping_loss_percent`| INTEGER | NULL | Porcentaje de paquetes perdidos hacia internet. |
| `vpn_profiles_detail`| JSONB | NULL | JSONB detallando perfiles activos (ej: `{"VIP": 2}`). |
| `top_consumers` | JSONB | NULL | JSONB con el top de interfaces que consumen tráfico. |
| `active_connections`| INTEGER | NULL | Cantidad de sesiones concurrentes activas. |

**Índices**:
* `PRIMARY KEY (id)`
* `CREATE INDEX idx_created_at ON router_stats(created_at)`

---

### 2.2 Tabla `system_alerts`

Registra las alertas operativas críticas del sistema (Conformidad ISO 9001).

| Columna | Tipo PostgreSQL | Nulabilidad | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL | NOT NULL | Clave primaria. |
| `alert_type` | VARCHAR(50) | NULL | Clasificación del incidente. |
| `severity` | VARCHAR(20) | NULL | Nivel de impacto (`Warning`, `Critical`). |
| `message` | TEXT | NULL | Mensaje detallado del error. |
| `created_at` | TIMESTAMPTZ | NOT NULL | Fecha de disparo (Default: `NOW()`). |
| `resolved_at` | TIMESTAMPTZ | NULL | Fecha de resolución. Nulo si activa. |

---

### 2.3 Tabla `speed_history`

| Columna | Tipo PostgreSQL | Nulabilidad | Descripción / Unidad |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL | NOT NULL | Clave primaria. |
| `created_at` | TIMESTAMPTZ | NOT NULL | Fecha del test (Default: `NOW()`). |
| `download_mbps` | NUMERIC(8,2) | NULL | Descarga (Mbps). |
| `upload_mbps` | NUMERIC(8,2) | NULL | Subida (Mbps). |
| `ping_ms` | NUMERIC(8,2) | NULL | Latencia (ms). |
| `isp` | VARCHAR(100) | NULL | Proveedor (ej. `Claro Colombia`). |

---

### 2.4 Tabla `device_inventory`

| Columna | Tipo PostgreSQL | Nulabilidad | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | SERIAL | NOT NULL | Clave primaria. |
| `mac_address` | VARCHAR(20) | NOT NULL | Clave única (`UNIQUE`). |
| `ip_address` | VARCHAR(20) | NULL | Última dirección IP. |
| `hostname` | VARCHAR(100) | NULL | Nombre de host DHCP. |
| `vendor` | VARCHAR(100) | NULL | Fabricante asociado a la MAC. |
| `is_online` | BOOLEAN | NULL | Estado actual. |
| `first_seen` | TIMESTAMPTZ | NOT NULL | Detección inicial. |
| `last_seen` | TIMESTAMPTZ | NOT NULL | Última detección. |

---

### 2.5 Tabla `network_logs`

| Columna | Tipo PostgreSQL | Nulabilidad | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | BIGSERIAL | NOT NULL | Clave primaria. |
| `created_at` | TIMESTAMPTZ | NOT NULL | Fecha de registro. |
| `topic` | VARCHAR(50) | NULL | Temas (ej: `system,error`). |
| `message` | TEXT | NULL | Trama literal del log. |
| `severity` | VARCHAR(20) | NULL | Clasificación (`info`, `warning`, `error`, `critical`). |
