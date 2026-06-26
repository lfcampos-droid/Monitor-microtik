# Diagrama de Arquitectura Unificada

> Documento fuente: [architecture.md](../architecture.md)

Interacción de todos los elementos del sistema, desde la infraestructura física hasta las interfaces de cara al usuario.

```mermaid
graph TD
    subgraph Infraestructura ["Infraestructura de Red"]
        MT["MikroTik RouterOS\nAPI Puerto 8728"]
    end

    subgraph BackendDaemon ["Daemon de Telemetria - Python Backend"]
        BD["ren_monitor_backend.py"]
        ST["Speedtest CLI\nCada 1 hora"]
        SCAN["Escaner ARP y DHCP\nCada 5 min"]
        MA["Motor de Alertas SMTP"]
    end

    subgraph ServidorWeb ["Servidor Web - Apache y PHP"]
        AI["api_ingest.php\nIngesta"]
        AR["api_read.php\nLectura"]
    end

    subgraph DB ["Base de Datos MySQL"]
        MYSQL[("MySQL")]
        RS["router_stats"]
        SA["system_alerts"]
        SH["speed_history"]
        DI["device_inventory"]
        NL["network_logs"]
    end

    subgraph Monitoreo ["Interfaces de Monitoreo - Frontend"]
        WD["Dashboard Web\nDashboardREN.html"]
        DA["App Escritorio\nCustomTkinter MVC"]
    end

    MT -->|API Polling 1s| BD
    BD -->|API Polling 1s| MT
    BD -->|Ejecuta| ST
    BD -->|Ejecuta| SCAN
    BD -->|Envia Alertas| MA
    MA -->|Email| SMTP["Servidor SMTP Externo"]

    BD -->|HTTP POST JSON| AI
    AI -->|Escritura SQL| MYSQL

    AR -->|Consulta SQL| MYSQL
    MYSQL -->|Retorna Datos| AR
    WD -->|AJAX Requests| AR
    AR -->|JSON Response| WD

    DA -->|API Polling 1s Directo| MT
    MT -->|Respuesta API| DA
    DA -->|Lectura Alertas Activas| MYSQL
```
