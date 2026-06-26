# Diagrama MVC - Aplicación de Escritorio

> Documento fuente: [desktop_app.md](../desktop_app.md)

Arquitectura Modelo-Vista-Controlador de la aplicación de escritorio desarrollada en Python 3 con CustomTkinter.

```mermaid
graph TD
    subgraph Vistas ["Capa de Vista - UI CustomTkinter"]
        DV["DashboardView\nVentana Principal"]
        CV["MetricCard - WANCard - HealthCard"]
        CHV["ChartsView\nGrafico Matplotlib"]
        AV["AlertsView\nAlertas y Listas"]
        SV["SettingsView\nFormulario de Ajustes"]
    end

    subgraph Controladores ["Capa de Controlador"]
        DC["DashboardController\nOrquestador Central"]
        TC["ThemeController\nGestion de Interfaz"]
        NC["NetworkController\nEscaneo ARP"]
        DIC["DiagnosticsController\nComprobaciones"]
    end

    subgraph Modelos ["Capa de Modelo - Estado de Datos"]
        RM["RouterModel\nCPU - Memoria - Uptime"]
        NM["NetworkModel\nHistorial de trafico"]
        SM["SystemModel\nAlertas - Logs y Salud"]
        DIM["DiagnosticsModel\nHistorial de Chequeos"]
    end

    subgraph Servicios ["Servicios de Soporte"]
        MS["MonitoringService\nHilo de Polling"]
        MKS["MikrotikService\nAPI RouterOS o Mock"]
        PS["PingService\nLatencia ICMP"]
        LS["LoggingService\nHistorial de Eventos"]
    end

    DV -->|Acciones de Usuario| DC
    DC -->|Actualiza| RM
    DC -->|Actualiza| NM
    DC -->|Actualiza| SM
    DC -->|Inicia o Detiene Hilo| MS
    MS -->|Consulta RouterOS| MKS
    MS -->|Retorna Payload Telemetria| DC
    DC -->|Callback refresh_view| DV
    TC -->|Aplica Estilos| DV
```
