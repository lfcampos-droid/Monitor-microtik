# Diagrama Entidad-Relación (ER) - Base de Datos

> Documento fuente: [database_schema.md](../database_schema.md)

Sistema orientado a telemetría de series de tiempo. Las tablas están diseñadas para lecturas rápidas e inserciones masivas optimizadas mediante índices en campos temporales.

```mermaid
erDiagram
    router_stats {
        int id PK
        timestamp created_at
        int cpu_load
        bigint free_memory
        bigint total_memory
        bigint hdd_free
        bigint hdd_total
        int temperature
        int voltage
        varchar uptime
        int dhcp_leases
        int queue_count
        int wan_drops
        double sfp_rx_power
        text log_message
        bigint wan1_tx
        bigint wan1_rx
        bigint wan2_tx
        bigint wan2_rx
        int vpn_count
        int vpn_l2tp
        int vpn_ovpn
        int vpn_sstp
        int vpn_pptp
        double ping_avg_ms
        int ping_loss_percent
        text vpn_profiles_detail
        bigint firewall_drops_total
        text top_consumers
        int active_connections
        double gateway_ping
        text interface_errors
    }

    system_alerts {
        int id PK
        varchar alert_type
        varchar severity
        text alert_message
        timestamp created_at
        timestamp resolved_at
    }

    speed_history {
        int id PK
        timestamp created_at
        double download_mbps
        double upload_mbps
        double ping_ms
        varchar isp
        varchar server_location
    }

    device_inventory {
        int id PK
        varchar mac_address
        varchar ip_address
        varchar hostname
        varchar vendor
        varchar iface
        boolean is_online
        timestamp first_seen
        timestamp last_seen
    }

    network_logs {
        int id PK
        timestamp created_at
        varchar topic
        text log_message
        varchar severity
    }

    router_stats ||--o{ system_alerts : "genera"
    router_stats ||--o{ network_logs : "registra"
    router_stats ||--o{ speed_history : "mide"
    router_stats ||--o{ device_inventory : "monitorea"
```
