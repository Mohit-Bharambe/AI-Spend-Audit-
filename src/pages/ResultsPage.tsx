import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AuditCard from '../components/results/AuditCard';
import { generateAudit } from '../utils/auditEngine';
import { getTotalMonthlySavings, getAnnualSavings, isHighSavings } from '../utils/calculateSavings';
import { mockInput } from '../data/mockAuditInput';
import { generateSummary } from '../services/generateSummary';
import LeadCapture from '../components/LeadCapture';
import { supabase } from '../services/supabase';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { TwitterShareButton, LinkedinShareButton } from 'react-share';

const ResultsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [aiSummary, setAiSummary] = useState<string>('');
  const [isLoadingSummary, setIsLoadingSummary] = useState<boolean>(true);
  const [isLoadingDb, setIsLoadingDb] = useState<boolean>(!!id);
  const [sharedResults, setSharedResults] = useState<any[] | null>(null);
  const [sharedTeamSize, setSharedTeamSize] = useState<number>(12);
  const [dbError, setDbError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Real app data from local storage (only for non-shared view)
  const [storedTools] = useState(() => {
    if (typeof window !== 'undefined' && !id) {
      try {
        return JSON.parse(localStorage.getItem('audit-tools') || '[]');
      } catch {
        return [];
      }
    }
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
        setDbError(null);
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
        } catch (err: any) {

          setDbError('This audit report could not be found or may have expired.');
          toast.error('Failed to load shared audit report');
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

  const ogTitle = "Save $" + monthlySavings + "/month on AI tools | SpendLens";
  const ogDescription = "This startup could save $" + annualSavings + "/year on AI spend. See the full audit breakdown.";
  const tweetText = "Just discovered we could save $" + annualSavings + "/year on our AI stack 🤯\n\nFree audit by @SpendLens 👇";

  // AI Summary fetch
  useEffect(() => {
    if (activeAuditResults.length > 0) {
      async function fetchSummary() {
        setIsLoadingSummary(true);
        try {
          const summary = await generateSummary(activeAuditResults);
          setAiSummary(summary);
        } catch (err) {

          setAiSummary('Your AI stack shows multiple optimization opportunities that could reduce recurring software spend while maintaining productivity and performance.');
          toast.error('AI summary generation failed — using fallback');
        } finally {
          setIsLoadingSummary(false);
        }
      }
      fetchSummary();
    } else {
      setIsLoadingSummary(false);
    }
  }, []);

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  // LOADING STATE — Full Page Skeleton
  if (isLoadingDb) {
    return (
      <Layout>
        <div className="animate-enter space-y-10 py-6">
          <div className="panel h-[400px] w-full animate-pulse bg-slate-100" />
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="panel h-48 animate-pulse bg-slate-100" />
            <div className="panel h-48 animate-pulse bg-slate-100" />
            <div className="panel h-48 animate-pulse bg-slate-100" />
            <div className="panel h-48 animate-pulse bg-slate-100" />
          </div>
        </div>
      </Layout>
    );
  }

  // ERROR STATE — Failed to load shared audit
  if (dbError) {
    return (
      <Layout>
        <div className="flex h-[60vh] items-center justify-center">
          <div className="panel p-10 text-center max-w-md">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900">Audit Not Found</h3>
            <p className="mt-2 text-sm text-slate-600">{dbError}</p>
            <a href="/" className="btn-primary mt-6 inline-block">Run a New Audit</a>
          </div>
        </div>
      </Layout>
    );
  }

  // EMPTY STATE — No tools to audit
  if (activeAuditResults.length === 0) {
    return (
      <Layout>
        <div className="flex h-[60vh] items-center justify-center">
          <div className="panel p-10 text-center max-w-md">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-500">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900">No Tools Selected</h3>
            <p className="mt-2 text-sm text-slate-600">
              Select at least one AI tool to generate an audit. Head back to the form and add your stack.
            </p>
            <a href="/#spend-form" className="btn-primary mt-6 inline-block">Add Your Tools</a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{ogTitle}</title>
        <meta name="description" content={ogDescription} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:image" content="https://xdjulsytbmiqvfdulfii.supabase.co/storage/v1/object/public/assets/audit-preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
      </Helmet>
      <div className="animate-enter space-y-10 py-6">
        {/* HERO SAVINGS CARD */}
        <section className="panel relative overflow-hidden bg-slate-900 px-5 py-10 text-center text-white shadow-2xl sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.15),_transparent_50%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.08),_transparent_50%)]" />
          <div className="relative">
            <span className="eyebrow border-white/10 bg-white/5 text-blue-200">
              {id ? '🔗 Shared Audit Report' : '📊 Audit Summary'}
            </span>

            {id ? (
              /* Public share hero — viral, Twitter-worthy */
              <>
                <h1 className="mt-8 mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  This startup could save{' '}
                  <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                    ${annualSavings}/year
                  </span>{' '}
                  on AI spend
                </h1>
                <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-slate-400">
                  A SpendLens audit uncovered ${monthlySavings}/month in recoverable waste across {activeAuditResults.length} AI tools. See the full breakdown below.
                </p>
              </>
            ) : (
              /* Private audit hero */
              <>
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
              </>
            )}

            {/* SHARE BUTTONS */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <TwitterShareButton url={shareUrl} title={tweetText}>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 px-5 py-2.5 text-sm font-semibold text-[#1DA1F2] transition hover:bg-[#1DA1F2]/20 hover:-translate-y-0.5">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Share on X
                </span>
              </TwitterShareButton>

              <LinkedinShareButton url={shareUrl} title={ogTitle} summary={ogDescription}>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2]/10 border border-[#0A66C2]/20 px-5 py-2.5 text-sm font-semibold text-[#0A66C2] transition hover:bg-[#0A66C2]/20 hover:-translate-y-0.5">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </span>
              </LinkedinShareButton>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20 hover:-translate-y-0.5"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
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

        {/* PUBLIC CTA — only on shared view */}
        {id && (
          <section className="panel bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-center sm:p-12">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">Want to audit your own stack?</h3>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-400">
              SpendLens identifies waste in your AI tooling in under 60 seconds. Free, instant, shareable.
            </p>
            <a href="/" className="btn-primary mt-8 inline-block bg-white text-slate-900 hover:bg-slate-100">
              Run My Free Audit →
            </a>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ResultsPage;
