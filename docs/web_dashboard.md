# Dashboard Web (Next.js) - REN Enterprise Monitor

Este documento detalla el diseño, la estructura visual y la lógica del cliente frontend del **REN Enterprise Monitor**, construido con **React** dentro del framework **Next.js**.

---

## 1. Diseño Estético y Sistema de Estilos

El dashboard mantiene un diseño moderno con efectos de **glassmorphism** (cristal esmerilado). Todo el estilizado se gestiona mediante CSS Modules o Vanilla CSS importado globalmente, con variables CSS para el cambio dinámico de tema.

### 1.1 Variables y Modos (Claro / Oscuro)
La paleta se maneja con variables en el `:root` de `globals.css`:
*   **Modo Oscuro**: Fondo general con gradiente `linear-gradient(135deg, #0f172a, #581c87)`.
*   Fondo de Tarjetas (`--glass-bg`): Púrpura translúcido con desenfoque de fondo `backdrop-filter: blur(16px)`.
*   Bordes (`--glass-border`): `rgba(196, 181, 253, 0.35)`.

---

## 2. Estructura de Componentes React

La interfaz se divide en múltiples **Client y Server Components**:

1.  **`<Layout />` y `<Header />`**: Contiene la navegación, el logotipo, el botón de cambio de tema (Claro/Oscuro) y la gestión de estado global.
2.  **`<SummaryRow />`**: Tarjetas de KPIs que muestran métricas crudas de CPU, RAM, Latencia y Salud Operativa.
3.  **`<WanMonitors />`**: Visualizaciones de consumo para las interfaces WAN1 y WAN2, con animaciones en CSS puro.
4.  **`<TrafficChart />`**: Integra un gráfico de **Chart.js** (mediante `react-chartjs-2`) que renderiza las curvas de tráfico en tiempo real.
5.  **`<AlertPanel />` y `<VpnDistribution />`**: Gráficos de Doughnut y listas de estado que se auto-actualizan mostrando incidencias y túneles encriptados.

---

## 3. Lógica Asíncrona (SWR / React Query)

Para garantizar la reactividad en tiempo real:
*   Se emplea la librería **SWR** (Stale-While-Revalidate) para consumir periódicamente los endpoints `/api/metrics/live`.
*   Esto asegura que los componentes React (como el `TrafficChart`) reciban arreglos actualizados cada segundo y redibujen los gradientes sin bloquear el hilo de la interfaz (UI Thread).

---

## 4. Modos Especiales y PWA

### 4.1 Modo NOC (Centro de Operaciones)
Un estado especial del componente React que oculta el marco estándar y renderiza la pantalla en modo "Kiosk" (Fondo `#000`, fuentes gigantes) para su lectura a distancia en pantallas de TV grandes.

### 4.2 Progressive Web App (PWA)
Al estar basado en Next.js, el dashboard puede ser configurado como una PWA (`next-pwa`). Esto significa que reemplaza a la antigua aplicación de escritorio: el personal del NOC puede instalar la web como una app nativa en sus terminales, obteniendo una experiencia inmersiva y un acceso directo a la red sin necesidad de binarios separados de Python.
