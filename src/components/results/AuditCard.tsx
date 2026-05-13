import React from 'react';
import { AuditResult } from "../../types/audit";

interface AuditCardProps {
  result: AuditResult;
}

const AuditCard: React.FC<AuditCardProps> = ({ result }) => {
  const isOptimized = result.monthlySavings <= 0;

  return (
    <div className="panel group overflow-hidden border-slate-200 bg-white p-6 transition-all hover:border-blue-400/30 hover:shadow-lg">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-slate-900 text-xs font-bold tracking-wider text-white shadow-sm">
              {result.tool.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{result.tool}</h3>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{result.currentPlan} Plan</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-y border-slate-50 py-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Spend</p>
              <p className="text-xl font-bold text-slate-900">${result.currentSpend}<span className="text-xs text-slate-400 font-medium ml-1">/mo</span></p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Action</p>
              <p className={`text-sm font-bold ${isOptimized ? 'text-slate-600' : 'text-blue-600'}`}>
                {isOptimized ? 'Keep current plan' : `Switch to ${result.recommendedPlan}`}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Reasoning</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {result.reason}
            </p>
          </div>
        </div>

        {isOptimized ? (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-center shadow-sm sm:min-w-[140px]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              Optimal
            </p>
            <div className="mt-2 flex items-center justify-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[10px] font-medium text-emerald-600 uppercase tracking-tighter">Healthy Spend</p>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-center shadow-sm sm:min-w-[140px]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600/80">Monthly Savings</p>
            <p className="mt-1 text-3xl font-bold text-emerald-700">
              ${result.monthlySavings}
            </p>
            <p className="mt-1 text-[10px] font-medium text-emerald-600/60 uppercase">Recoverable</p>
          </div>
        )}
      </div>

      <div className={`mt-6 h-1.5 w-full rounded-full bg-slate-50 overflow-hidden`}>
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${result.severity === 'high' ? 'bg-red-500' : result.severity === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}`}
          style={{ width: isOptimized ? '100%' : '65%' }}
        />
      </div>
    </div>
  );
};

export default AuditCard;
