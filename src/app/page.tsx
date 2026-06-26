import Header from "@/components/Header";
import SummaryRow from "@/components/SummaryRow";

export default function Home() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto py-6">
      <Header />
      <SummaryRow />
      
      <div className="px-4">
        <div className="glass-panel p-8 text-center text-[var(--foreground)]/70">
          <h2 className="text-xl font-medium mb-2">Más componentes en construcción...</h2>
          <p className="text-sm">Gráficos de tráfico y monitores WAN se añadirán pronto.</p>
        </div>
      </div>
    </main>
  );
}
