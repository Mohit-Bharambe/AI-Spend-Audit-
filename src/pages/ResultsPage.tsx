import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
import AuditCard from '../components/results/AuditCard';
import { generateAudit } from '../utils/auditEngine';
import { getTotalMonthlySavings, getAnnualSavings, isHighSavings } from '../utils/calculateSavings';
import { mockInput } from '../data/mockAuditInput';
import { getAiAuditSummary } from '../services/aiSummary';

const ResultsPage: React.FC = () => {
  const [aiSummary, setAiSummary] = useState<string>('');
  const [isLoadingSummary, setIsLoadingSummary] = useState<boolean>(true);

  // In a real app, we'd get this from local storage or context
  const auditResults = generateAudit(mockInput);
  const monthlySavings = getTotalMonthlySavings(auditResults);
  const annualSavings = getAnnualSavings(monthlySavings);
  const isHigh = isHighSavings(monthlySavings);

  useEffect(() => {
    async function fetchSummary() {
      setIsLoadingSummary(true);
      try {
        const summary = await getAiAuditSummary(auditResults);
        setAiSummary(summary);
      } finally {
        setIsLoadingSummary(false);
      }
    }
    fetchSummary();
  }, []);

  return (
    <Layout>
      <div className="animate-enter space-y-10 py-6">
        {/* HERO SAVINGS CARD */}
        <section className="panel relative overflow-hidden bg-slate-900 px-6 py-12 text-center text-white shadow-2xl sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.15),_transparent_50%)]" />
          <div className="relative">
            <span className="eyebrow border-white/10 bg-white/5 text-blue-200">Audit Summary</span>
            <h1 className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-slate-400">You Can Save</h1>
            <div className="mt-4 flex flex-col items-center justify-center gap-2">
              <p className="text-6xl font-black tracking-tighter text-white sm:text-8xl">
                ${monthlySavings}<span className="text-2xl text-slate-500 sm:text-3xl">/mo</span>
              </p>
              <p className="text-2xl font-bold text-blue-400 sm:text-3xl">
                ${annualSavings}/year
              </p>
            </div>
            <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-slate-400">
              Based on your current AI tooling stack, we've identified significant recovery opportunities across seat counts and tier overlaps.
            </p>
            
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button className="btn-primary bg-white text-slate-900 hover:bg-blue-50">
                Download PDF Report
              </button>
              <button className="btn-secondary border-white/10 bg-white/5 text-white hover:bg-white/10">
                Share Results
              </button>
            </div>
          </div>
        </section>

        {/* TOOL BREAKDOWN */}
        <section id="breakdown" className="space-y-6">
          <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Tool-by-Tool Analysis</h2>
              <p className="text-sm text-slate-500">Individual optimization strategies for your stack</p>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {auditResults.length} Tools Audited
            </span>
          </div>
          
          <div className="grid gap-4 lg:grid-cols-2">
            {auditResults.map((result, idx) => (
              <AuditCard key={idx} result={result} />
            ))}
          </div>
        </section>

        {/* AI SUMMARY & CTA */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="panel bg-slate-50/50 p-8 border-dashed border-2">
            <h3 className="text-lg font-bold text-slate-900">AI Intelligence Summary</h3>
            <div className="mt-4">
              {isLoadingSummary ? (
                <div className="space-y-3">
                  <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-4/6 animate-pulse rounded bg-slate-200" />
                </div>
              ) : (
                <p className="text-sm leading-7 text-slate-600 whitespace-pre-wrap">
                  {aiSummary}
                </p>
              )}
            </div>
          </div>

          <div className={`panel p-8 transition-all ${isHigh ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-white border-slate-200'}`}>
            <h3 className={`text-xl font-bold ${isHigh ? 'text-white' : 'text-slate-900'}`}>
              {isHigh ? 'Unlock Enterprise Credits' : 'Ready to Optimize?'}
            </h3>
            <p className={`mt-4 text-sm leading-relaxed ${isHigh ? 'text-blue-100' : 'text-slate-600'}`}>
              {isHigh 
                ? "Your savings potential is massive. Credex can help you secure up to $50,000 in AI credits to offset your infrastructure costs immediately."
                : "While your stack is relatively lean, there are still ways to tighten your procurement cycle and prevent future waste."}
            </p>
            <button className={`mt-8 w-full rounded-full py-4 text-sm font-bold transition-all ${isHigh ? 'bg-white text-blue-600 hover:scale-[1.02]' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
              {isHigh ? 'Talk to Credex Experts' : 'Schedule Procurement Review'}
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
};


export default ResultsPage;
