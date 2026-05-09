import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
import AuditCard from '../components/results/AuditCard';
import { generateAudit } from '../utils/auditEngine';
import { getTotalMonthlySavings, getAnnualSavings, isHighSavings } from '../utils/calculateSavings';
import { mockInput } from '../data/mockAuditInput';
import { getAiAuditSummary } from '../services/aiSummary';
import LeadCapture from '../components/LeadCapture';
import { supabase } from '../services/supabase';

import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ResultsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [aiSummary, setAiSummary] = useState<string>('');
  const [isLoadingSummary, setIsLoadingSummary] = useState<boolean>(true);
  const [isLoadingDb, setIsLoadingDb] = useState<boolean>(!!id);
  const [sharedResults, setSharedResults] = useState<any[] | null>(null);
  const [sharedTeamSize, setSharedTeamSize] = useState<number>(12);
  
  // Real app data from local storage (only for non-shared view)
  const [storedTools] = useState(() => {
    if (typeof window !== 'undefined' && !id) return JSON.parse(localStorage.getItem('audit-tools') || '[]');
    return [];
  });
  const [storedTeamSize] = useState(() => {
    if (typeof window !== 'undefined' && !id) return Number(localStorage.getItem('audit-team-size')) || 12;
    return 12;
  });
  const [primaryUseCase] = useState(() => {
    if (typeof window !== 'undefined' && !id) return localStorage.getItem('audit-primary-use-case') || 'Coding';
    return 'Coding';
  });

  // Fetch shared results from Supabase if ID exists
  useEffect(() => {
    if (id) {
      async function fetchSharedAudit() {
        setIsLoadingDb(true);
        try {
          const { data, error } = await supabase
            .from('audits')
            .select('*')
            .eq('id', id)
            .single();
          
          if (error) throw error;
          if (data) {
            setSharedResults(data.audit_data);
            setSharedTeamSize(data.team_size);
          }
        } catch (err) {
          console.error('Error fetching shared audit:', err);
        } finally {
          setIsLoadingDb(false);
        }
      }
      fetchSharedAudit();
    }
  }, [id]);

  // Determine which results to use
  const activeAuditResults = id 
    ? (sharedResults || [])
    : generateAudit(storedTools.length > 0 ? storedTools.map((t: any) => ({
        tool: t.tool,
        plan: t.plan,
        monthlySpend: Number(t.spend) || 0,
        seats: Number(t.seats) || 1,
        useCase: primaryUseCase
      })) : mockInput);

  const monthlySavings = getTotalMonthlySavings(activeAuditResults);
  const annualSavings = getAnnualSavings(monthlySavings);
  const isHigh = isHighSavings(monthlySavings);

  useEffect(() => {
    if (activeAuditResults.length > 0) {
      async function fetchSummary() {
        setIsLoadingSummary(true);
        try {
          const summary = await getAiAuditSummary(activeAuditResults);
          setAiSummary(summary);
        } finally {
          setIsLoadingSummary(false);
        }
      }
      fetchSummary();
    }
  }, [activeAuditResults]);

  if (isLoadingDb) {
    return (
      <Layout>
        <div className="flex h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="h-12 w-12 animate-spin border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
            <p className="mt-4 text-slate-500 font-medium">Retrieving Audit Results...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Recovered ${annualSavings}/year in AI Waste | Spend Audit</title>
        <meta name="description" content={`We identified ${activeAuditResults.length} optimization opportunities in this AI stack. See how we uncovered $${monthlySavings}/mo in recurring savings.`} />
        <meta property="og:title" content={`Recovered $${annualSavings}/year in AI Waste`} />
        <meta property="og:description" content="Startup AI spend auditing. Identify waste, consolidate seats, and tighten your procurement cycle." />
        <meta property="og:image" content="https://xdjulsytbmiqvfdulfii.supabase.co/storage/v1/object/public/assets/audit-preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Recovered $${annualSavings}/year in AI Waste`} />
      </Helmet>
      <div className="animate-enter space-y-10 py-6">
        {/* HERO SAVINGS CARD */}
        <section className="panel relative overflow-hidden bg-slate-900 px-6 py-12 text-center text-white shadow-2xl sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.15),_transparent_50%)]" />
          <div className="relative">
            <span className="eyebrow border-white/10 bg-white/5 text-blue-200">
              {id ? 'Shared Audit Report' : 'Audit Summary'}
            </span>
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
              {id 
                ? "This audit identifies recurring waste in this organization's AI stack and provides a roadmap for significant cost recovery."
                : "Based on your current AI tooling stack, we've identified significant recovery opportunities across seat counts and tier overlaps."}
            </p>
          </div>
        </section>

        {/* TOOL BREAKDOWN */}
        <section id="breakdown" className="space-y-6">
          <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Tool-by-Tool Analysis</h2>
              <p className="text-sm text-slate-500">Individual optimization strategies for this stack</p>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {activeAuditResults.length} Tools Audited
            </span>
          </div>
          
          <div className="grid gap-4 lg:grid-cols-2">
            {activeAuditResults.map((result, idx) => (
              <AuditCard key={idx} result={result} />
            ))}
          </div>
        </section>

        {/* AI SUMMARY & LEAD CAPTURE */}
        <section className={`grid gap-6 ${!id ? 'lg:grid-cols-2' : ''}`}>
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

          {!id && <LeadCapture auditData={activeAuditResults} teamSize={storedTeamSize} />}
        </section>
      </div>
    </Layout>
  );
};

export default ResultsPage;

