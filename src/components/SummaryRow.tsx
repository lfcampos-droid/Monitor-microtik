import React from 'react';
import { Cpu, HardDrive, ShieldCheck, Wifi } from 'lucide-react';

export default function SummaryRow() {
  const kpis = [
    {
      label: 'CPU Load',
      value: '24%',
      icon: <Cpu className="w-6 h-6 text-indigo-400" />,
      status: 'Normal',
      color: 'bg-indigo-500/10 border-indigo-500/20'
    },
    {
      label: 'Memoria Libre',
      value: '1.2 GB',
      icon: <HardDrive className="w-6 h-6 text-emerald-400" />,
      status: 'Óptimo',
      color: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      label: 'Latencia Promedio',
      value: '12 ms',
      icon: <Wifi className="w-6 h-6 text-blue-400" />,
      status: 'Excelente',
      color: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      label: 'Estado del Sistema',
      value: 'Protegido',
      icon: <ShieldCheck className="w-6 h-6 text-violet-400" />,
      status: 'Activo',
      color: 'bg-violet-500/10 border-violet-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 mb-8">
      {kpis.map((kpi, idx) => (
        <div key={idx} className="glass-card p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400 mb-1">{kpi.label}</p>
            <h3 className="text-2xl font-bold text-white mb-2">{kpi.value}</h3>
            <span className={`text-xs font-semibold px-2 py-1 rounded border ${kpi.color} text-white/80`}>
              {kpi.status}
            </span>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 shadow-inner">
            {kpi.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
