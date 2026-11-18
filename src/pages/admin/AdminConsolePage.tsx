import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Shield,
  LayoutDashboard,
  Calendar,
  Users,
  ShoppingCart,
  CreditCard,
  RotateCcw,
  UserCheck,
  MessageSquare,
  FileText,
  BookOpen,
  Layers,
  Mail,
  BarChart3,
  Settings,
  ClipboardList,
  LogOut,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Download,
} from 'lucide-react';
import { SeoHead } from '../../components/SeoHead';
import { BrandWordmark } from '../../components/BrandWordmark';
import { signInStaffWithGoogle, syncAuditLogToFirestore } from '../../firebase';
import { useBonnza } from '../../context/BonnzaContext';
import type {
  StaffRoleCode,
  ManagedWebinarSession,
  WebinarRegistrationRecord,
  OrderRecord,
  PaymentRecord,
  WebhookEventRecord,
  RefundRecord,
  ReconciliationRunRecord,
  AttendanceRecord,
  ReminderJobRecord,
  CustomerProfile,
  SupportTicketRecord,
  ManagedArticleRecord,
  PageContentBlock,
  DownloadableResourceRecord,
  EmailTemplateRecord,
  EmailOutboxRecord,
  FeatureFlagRecord,
  LaunchChecklistItem,
  AuditLogRecord,
} from '../../db/schema';
import type { CourseRecord, Locale, WebinarSessionId } from '../../domain/types';

const ADMIN_SESSION_STORAGE_KEY = 'bonnza_admin_session_v1';

interface StoredAdminAuth {
  sessionToken: string;
  csrfToken: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    roles: StaffRoleCode[];
  };
}

interface AdminOverviewPayload {
  currentUser: {
    email: string;
    fullName: string;
    roles: StaffRoleCode[];
  };
  kpis: {
    totalRegistrations: number;
    confirmedPaidRegistrations: number;
    pendingVerificationCount: number;
    verifiedRevenuePaise: number;
    verifiedRevenueInr: number;
    openSupportTickets: number;
    publishedArticlesEn: number;
    publishedArticlesHi: number;
    totalArticles: number;
    queuedEmailsCount: number;
  };
  razorpayStatus: {
    mode: 'inactive' | 'test' | 'live';
    keyIdConfigured: boolean;
    keySecretConfigured: boolean;
    webhookSecretConfigured: boolean;
  };
  webinarSessions: ManagedWebinarSession[];
  registrations: WebinarRegistrationRecord[];
  orders: OrderRecord[];
  payments: PaymentRecord[];
  webhookEvents: WebhookEventRecord[];
  refunds: RefundRecord[];
  reconciliationRuns: ReconciliationRunRecord[];
  attendance: AttendanceRecord[];
  reminderJobs: ReminderJobRecord[];
  customers: CustomerProfile[];
  supportTickets: SupportTicketRecord[];
  courses: CourseRecord[];
  articles: ManagedArticleRecord[];
  pageBlocks: PageContentBlock[];
  resources: DownloadableResourceRecord[];
  emailTemplates: EmailTemplateRecord[];
  emailOutbox: EmailOutboxRecord[];
  featureFlags: FeatureFlagRecord[];
  launchChecklist: LaunchChecklistItem[];
  auditLogs: AuditLogRecord[];
  seoAudit?: {
    generatedAtUtc: string;
    totalRoutesChecked: number;
    passedCount: number;
    warningCount: number;
    failedCount: number;
    checks: Array<{
      routePath: string;
      locale: Locale;
      expectedIndexable: boolean;
      expectedRobots: string;
      expectedCanonical: string;
      hreflangPairs: Array<{ lang: string; href: string }>;
      schemaTypes: string[];
      passed: boolean;
      notes: string[];
    }>;
  };
  launchReadiness?: {
    generatedAtUtc: string;
    currentLaunchState: string;
    overallReadinessDecision: string;
    blockingCategoriesRemaining: number;
    categories: Array<{
      id: number;
      code: string;
      name: string;
      status: string;
      responsibleRole: string;
      blockingClassification: string;
      evidenceReference: string;
      blockerSummary: string | null;
    }>;
    launchStates: Array<{
      state: string;
      title: string;
      active: boolean;
      criteria: string;
    }>;
  };
  internalAnalytics?: {
    generatedAtUtc: string;
    acquisition: {
      totalLeadsAndRegistrants: number;
      byUtmSource: Record<string, number>;
      byLocalePreference: { en: number; hi: number };
      byBusinessInterest: Record<string, number>;
    };
    conversionFunnel: {
      registrationsCreated: number;
      ordersCreated: number;
      paymentInitiatedCount: number;
      verifiedPaidSeatsCount: number;
      failedOrCancelledCount: number;
      refundedCount: number;
      registrationToPaidConversionPercent: number;
    };
    revenueAndSettlement: {
      grossVerifiedCollectionsPaise: number;
      grossVerifiedCollectionsInr: number;
      refundedPaise: number;
      refundedInr: number;
      estimatedGatewayFeePaise: number;
      netSettlementBeforeTaxPaise: number;
      netSettlementBeforeTaxInr: number;
      revenueNote: string;
    };
    webinarOperations: {
      sessions: Array<{
        sessionId: string;
        locale: Locale;
        timeWindowIst: string;
        totalRegistrations: number;
        confirmedPaidSeats: number;
        attendedCount: number;
        noShowCount: number;
        transferredCount: number;
      }>;
    };
    contentPerformance: {
      totalSeededArticles: number;
      draftCountEn: number;
      inReviewCountEn: number;
      publishedCountEn: number;
      draftCountHi: number;
      inReviewCountHi: number;
      publishedCountHi: number;
      articlesByCluster: Record<string, number>;
    };
    programmeInterest: {
      totalWaitlistAndCourseEnquiries: number;
      byLearningPath: { resell: number; craftToCommerce: number; bothOrGeneral: number };
      totalCoursesPrepared: number;
    };
  };
}

const DEMO_STAFF_ACCOUNTS: Array<{
  label: string;
  email: string;
  password: string;
  role: StaffRoleCode;
}> = [
  {
    label: 'Owner (Shubham Chaturvedi)',
    email: 'mtforstartups@gmail.com',
    password: 'BonnzaOwner#2026',
    role: 'OWNER',
  },
  {
    label: 'Platform Admin',
    email: 'admin@bonnza.marketingtusk.com',
    password: 'BonnzaAdmin#2026',
    role: 'ADMIN',
  },
  {
    label: 'Content Editor',
    email: 'editor@bonnza.marketingtusk.com',
    password: 'BonnzaEditor#2026',
    role: 'CONTENT_EDITOR',
  },
  {
    label: 'Faculty Reviewer',
    email: 'reviewer@bonnza.marketingtusk.com',
    password: 'BonnzaReviewer#2026',
    role: 'FACULTY_REVIEWER',
  },
  {
    label: 'Webinar Operator',
    email: 'operator@bonnza.marketingtusk.com',
    password: 'BonnzaOperator#2026',
    role: 'WEBINAR_OPERATOR',
  },
  {
    label: 'Support Agent',
    email: 'support@bonnza.marketingtusk.com',
    password: 'BonnzaSupport#2026',
    role: 'SUPPORT_AGENT',
  },
];

const NAV_ITEMS = [
  { slug: 'overview', label: 'Overview', icon: LayoutDashboard },
  { slug: 'webinars', label: 'Webinars & Sessions', icon: Calendar },
  { slug: 'registrations', label: 'Registrations', icon: Users },
  { slug: 'orders', label: 'Orders', icon: ShoppingCart },
  { slug: 'payments', label: 'Payments & Webhooks', icon: CreditCard },
  { slug: 'refunds', label: 'Refunds', icon: RotateCcw },
  { slug: 'customers', label: 'Customers & CRM', icon: UserCheck },
  { slug: 'crm', label: 'Support Tickets', icon: MessageSquare },
  { slug: 'articles', label: 'Blog Editorial CMS', icon: FileText },
  { slug: 'content', label: 'Courses & Curriculum', icon: BookOpen },
  { slug: 'pages', label: 'Pages & Resources', icon: Layers },
  { slug: 'notifications', label: 'Email Outbox (16)', icon: Mail },
  { slug: 'analytics', label: 'Internal Analytics & SEO', icon: BarChart3 },
  { slug: 'launch-readiness', label: 'Launch Control (16)', icon: Shield },
  { slug: 'reports', label: 'Reports & CSV Export', icon: Download },
  { slug: 'settings', label: 'Gates (G1/G2) & Flags', icon: Settings },
  { slug: 'audit-log', label: 'Audit Log', icon: ClipboardList },
] as const;

export function AdminConsolePage() {
  const { section = 'overview' } = useParams<{ section?: string }>();
  const navigate = useNavigate();
  const { refreshPublicBootstrap } = useBonnza();

  const [authState, setAuthState] = useState<StoredAdminAuth | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = window.localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as StoredAdminAuth) : null;
    } catch {
      return null;
    }
  });

  const [emailInput, setEmailInput] = useState('mtforstartups@gmail.com');
  const [passwordInput, setPasswordInput] = useState('BonnzaOwner#2026');
  const [authError, setAuthError] = useState<string | null>(null);
  const [data, setData] = useState<AdminOverviewPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionBanner, setActionBanner] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Sub-view state controls
  const [selectedArticleId, setSelectedArticleId] = useState<string>('B01');
  const [selectedArticleLocale, setSelectedArticleLocale] = useState<Locale>('en');
  const [cmsReviewer, setCmsReviewer] = useState<string>('Shubham Chaturvedi');
  const [cmsSourceDate, setCmsSourceDate] = useState<string>('2026-11-16');
  const [cmsChangeNote, setCmsChangeNote] = useState<string>('');

  const [attendanceCsvText, setAttendanceCsvText] = useState<string>(
    'email,duration_minutes\nlearner@example.com,95'
  );
  const [attendancePreview, setAttendancePreview] = useState<
    Array<{
      email: string;
      durationMinutes: number;
      status: 'ATTENDED' | 'NO_SHOW' | 'PARTIAL';
      matchedRegistrationReference: string | null;
    }>
  >([]);

  const [refundOrderId, setRefundOrderId] = useState<string>('');
  const [refundReason, setRefundReason] = useState<string>(
    'Customer requested cancellation prior to workshop.'
  );

  const [crmNoteCustomerId, setCrmNoteCustomerId] = useState<string>('');
  const [crmNoteBody, setCrmNoteBody] = useState<string>('');
  const [crmTagInput, setCrmTagInput] = useState<string>('');

  const fetchOverview = useCallback(
    async (currentAuth: StoredAdminAuth | null) => {
      if (!currentAuth) return;
      setLoading(true);
      try {
        const res = await fetch('/api/v1/admin/overview', {
          headers: {
            'x-admin-session': currentAuth.sessionToken,
          },
        });
        if (res.status === 401) {
          window.localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
          setAuthState(null);
          setData(null);
          return;
        }
        const json = await res.json();
        if (res.ok) {
          setData(json as AdminOverviewPayload);
        }
      } catch {
        // Ignore transient network errors
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (authState) {
      fetchOverview(authState);
    }
  }, [authState, fetchOverview]);

  const adminFetch = async (
    url: string,
    method: 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    bodyObj?: Record<string, unknown>
  ) => {
    if (!authState) return;
    setActionBanner(null);
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-admin-session': authState.sessionToken,
        'x-csrf-token': authState.csrfToken,
      },
      body: bodyObj ? JSON.stringify(bodyObj) : undefined,
    });
    const json = await res.json();
    if (!res.ok) {
      setActionBanner({
        type: 'error',
        message: json.message || 'Operation rejected by RBAC / validation gate.',
      });
      return null;
    }
    await fetchOverview(authState);
    await refreshPublicBootstrap();
    return json;
  };

  const handleLogin = async (e?: React.FormEvent, quickEmail?: string, quickPass?: string) => {
    if (e) e.preventDefault();
    setAuthError(null);
    try {
      const res = await fetch('/api/v1/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: quickEmail ?? emailInput,
          password: quickPass ?? passwordInput,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setAuthError(json.message || 'Invalid credentials');
        return;
      }
      const nextAuth: StoredAdminAuth = {
        sessionToken: json.sessionToken,
        csrfToken: json.csrfToken,
        user: json.user,
      };
      window.localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(nextAuth));
      setAuthState(nextAuth);
      if (section === 'login') {
        navigate('/admin/overview');
      }
    } catch {
      setAuthError('Could not connect to authentication service.');
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    try {
      const fbUser = await signInStaffWithGoogle();
      if (fbUser.email === 'mtforstartups@gmail.com') {
        await handleLogin(undefined, 'mtforstartups@gmail.com', 'BonnzaOwner#2026');
        await syncAuditLogToFirestore({
          logId: `fb_login_${Date.now()}`,
          action: 'ADMIN_GOOGLE_OAUTH_LOGIN',
          targetType: 'AUTH',
          targetId: fbUser.uid,
          summary: `Owner ${fbUser.email} signed in via Firebase Google Auth`,
        });
      } else {
        setAuthError(
          `Signed in as ${fbUser.email}, which is not in the authorized Bonnza staff allowlist.`
        );
      }
    } catch (err) {
      setAuthError(
        err instanceof Error ? err.message : 'Google Sign-In popup closed or blocked.'
      );
    }
  };

  const handleLogout = async () => {
    if (authState) {
      await fetch('/api/v1/admin/auth/logout', {
        method: 'POST',
        headers: {
          'x-admin-session': authState.sessionToken,
          'x-csrf-token': authState.csrfToken,
        },
      });
    }
    window.localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
    setAuthState(null);
    setData(null);
    navigate('/admin/login');
  };

  const downloadCsv = (filename: string, headers: string[], rows: string[][]) => {
    const csvContent = [
      headers.join(','),
      ...rows.map((r) => r.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ==========================================================================
  // UNPROTECTED LOGIN VIEW
  // ==========================================================================
  if (!authState || section === 'login') {
    return (
      <div className="min-h-screen bg-[#FAF9F5] text-[#1A1B1A] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <SeoHead
          locale="en"
          title="Bonnza Admin Console Sign In (Non-Indexed)"
          description="Protected staff administration console for Bonnza webinar operations, CRM, and bilingual CMS."
          path="/admin/login"
          allowIndex={false}
        />

        <div className="max-w-md w-full mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Link to="/en" className="inline-flex items-center gap-2">
              <BrandWordmark />
            </Link>
            <span className="text-xs font-mono-tabular px-2.5 py-1 rounded bg-[#202220] text-[#F4C940]">
              STAFF CONSOLE
            </span>
          </div>

          <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 sm:p-8 space-y-5">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-[#1A1B1A]">Sign in to Bonnza Admin</h1>
              <p className="text-xs text-[#666A65]">
                Protected by RBAC role verification, CSRF tokens, and immutable audit logging.
              </p>
            </div>

            <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
              <label className="block space-y-1">
                <span className="text-xs font-semibold text-[#1A1B1A]">Staff Email</span>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full min-h-[42px] rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] px-3 py-2 text-sm"
                />
              </label>

              <label className="block space-y-1">
                <span className="text-xs font-semibold text-[#1A1B1A]">Password</span>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full min-h-[42px] rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] px-3 py-2 text-sm"
                />
              </label>

              {authError && (
                <p role="alert" className="text-xs font-semibold text-red-700">
                  {authError}
                </p>
              )}

              <button
                type="submit"
                className="w-full min-h-[44px] rounded-[10px] bg-[#F4C940] hover:bg-[#eab924] text-[#1A1B1A] font-semibold text-sm"
              >
                Sign in with Staff Credentials
              </button>
            </form>

            <div className="pt-2 border-t border-[#E6E6DF]">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full min-h-[42px] rounded-[10px] border border-[#1A1B1A] bg-[#FAF9F5] hover:bg-[#F3F1E9] text-[#1A1B1A] font-semibold text-xs"
              >
                Sign in with Google (Firebase Auth — Owner Allowlist)
              </button>
            </div>

            <div className="pt-3 border-t border-[#E6E6DF] space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#666A65]">
                Quick Role Evaluation Sign-In (Test RBAC Boundaries):
              </p>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_STAFF_ACCOUNTS.map((acct) => (
                  <button
                    key={acct.role}
                    type="button"
                    onClick={() => {
                      setEmailInput(acct.email);
                      setPasswordInput(acct.password);
                      handleLogin(undefined, acct.email, acct.password);
                    }}
                    className="p-2 rounded-[8px] border border-[#E6E6DF] bg-[#FAF9F5] hover:border-[#1A1B1A] text-left text-[11px]"
                  >
                    <p className="font-bold text-[#1A1B1A]">{acct.role}</p>
                    <p className="text-[#666A65] truncate">{acct.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const normalizedSection = section === 'sessions' ? 'webinars' : section;
  const g1Items = data?.launchChecklist.filter((i) => i.gate === 'G1') || [];
  const g2Items = data?.launchChecklist.filter((i) => i.gate === 'G2') || [];
  const selectedArticle =
    data?.articles.find((a) => a.id === selectedArticleId) || data?.articles[0];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1A1B1A] flex flex-col lg:flex-row">
      <SeoHead
        locale="en"
        title={`Bonnza Admin — ${normalizedSection.toUpperCase()}`}
        description="Bonnza internal operations console."
        path={`/admin/${section}`}
        allowIndex={false}
      />

      {/* Charcoal Left Navigation Sidebar */}
      <aside className="w-full lg:w-64 shrink-0 bg-[#1A1B1A] text-[#FAF9F5] p-4 flex flex-col justify-between gap-6">
        <div className="space-y-5">
          <div className="flex items-center justify-between px-2 pt-1">
            <Link to="/en" className="text-lg font-extrabold tracking-tight text-white">
              BONNZA <span className="text-[#F4C940] text-xs font-mono-tabular">OPS</span>
            </Link>
            <span className="text-[11px] font-mono-tabular px-2 py-0.5 rounded bg-white/10 text-[#F4C940]">
              {authState.user.roles[0]}
            </span>
          </div>

          <nav aria-label="Admin sections" className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                normalizedSection === item.slug ||
                (section === 'sessions' && item.slug === 'webinars');
              return (
                <Link
                  key={item.slug}
                  to={`/admin/${item.slug}`}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#F4C940] text-[#1A1B1A]'
                      : 'text-[#FAF9F5]/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={15} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-white/10 pt-3 space-y-2 px-2 text-xs">
          <p className="font-semibold text-white truncate">{authState.user.fullName}</p>
          <p className="text-[#FAF9F5]/60 truncate">{authState.user.email}</p>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
            >
              <LogOut size={13} aria-hidden="true" />
              Sign out
            </button>
            <Link
              to="/en"
              className="px-3 py-1.5 rounded-[8px] border border-white/20 text-[#FAF9F5]/80 hover:text-white text-xs"
            >
              Public Site
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 p-5 sm:p-8 space-y-6 overflow-x-hidden">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E6E6DF] pb-4">
          <div>
            <p className="text-xs font-mono-tabular uppercase text-[#666A65]">
              ROLE: {authState.user.roles.join(', ')} · CSRF PROTECTED
            </p>
            <h1 className="text-2xl font-extrabold text-[#1A1B1A] capitalize">
              {normalizedSection.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fetchOverview(authState)}
              className="inline-flex items-center gap-1.5 min-h-[38px] px-3.5 py-1.5 rounded-[10px] border border-[#E6E6DF] bg-[#FFFFFF] text-xs font-semibold text-[#1A1B1A]"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              Refresh Data
            </button>
          </div>
        </header>

        {actionBanner && (
          <div
            role="status"
            className={`rounded-[12px] p-4 text-xs font-semibold flex items-center justify-between ${
              actionBanner.type === 'success'
                ? 'bg-[#E8EDDD] text-[#1A1B1A] border border-[#1A1B1A]/20'
                : 'bg-red-50 text-red-900 border border-red-200'
            }`}
          >
            <span>{actionBanner.message}</span>
            <button
              type="button"
              onClick={() => setActionBanner(null)}
              className="underline ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {!data ? (
          <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-8 text-sm text-[#666A65]">
            Loading operational records...
          </div>
        ) : (
          <>
            {/* ============================================================== */}
            {/* 1. OVERVIEW */}
            {/* ============================================================== */}
            {normalizedSection === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="rounded-[16px] border border-[#E6E6DF] bg-[#FFFFFF] p-5 space-y-1">
                    <p className="text-xs text-[#666A65]">Confirmed Paid Seats</p>
                    <p className="text-2xl font-extrabold font-mono-tabular text-[#1A1B1A]">
                      {data.kpis.confirmedPaidRegistrations}{' '}
                      <span className="text-xs font-normal text-[#666A65]">
                        / {data.kpis.totalRegistrations} total
                      </span>
                    </p>
                  </div>

                  <div className="rounded-[16px] border border-[#E6E6DF] bg-[#FFFFFF] p-5 space-y-1">
                    <p className="text-xs text-[#666A65]">Verified Revenue (Paise)</p>
                    <p className="text-2xl font-extrabold font-mono-tabular text-[#1A1B1A]">
                      ₹{data.kpis.verifiedRevenueInr}{' '}
                      <span className="text-xs font-normal text-[#666A65]">
                        ({data.kpis.verifiedRevenuePaise}p)
                      </span>
                    </p>
                  </div>

                  <div className="rounded-[16px] border border-[#E6E6DF] bg-[#FFFFFF] p-5 space-y-1">
                    <p className="text-xs text-[#666A65]">Published Blog Articles</p>
                    <p className="text-2xl font-extrabold font-mono-tabular text-[#1A1B1A]">
                      EN: {data.kpis.publishedArticlesEn} · HI: {data.kpis.publishedArticlesHi}{' '}
                      <span className="text-xs font-normal text-[#666A65]">
                        / {data.kpis.totalArticles}
                      </span>
                    </p>
                  </div>

                  <div className="rounded-[16px] border border-[#E6E6DF] bg-[#FFFFFF] p-5 space-y-1">
                    <p className="text-xs text-[#666A65]">Open Tickets & Outbox Queue</p>
                    <p className="text-2xl font-extrabold font-mono-tabular text-[#1A1B1A]">
                      {data.kpis.openSupportTickets} tickets · {data.kpis.queuedEmailsCount} emails
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                    <h2 className="text-base font-bold text-[#1A1B1A]">
                      5 Dec 2026 Webinar Sessions (Asia/Kolkata)
                    </h2>
                    <div className="space-y-3">
                      {data.webinarSessions.map((s) => (
                        <div
                          key={s.id}
                          className="rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] p-4 flex items-center justify-between gap-4 text-xs"
                        >
                          <div>
                            <p className="font-bold text-sm text-[#1A1B1A]">{s.title.en}</p>
                            <p className="font-mono-tabular text-[#666A65]">
                              {s.id} · Status: {s.status}
                            </p>
                          </div>
                          <div className="text-right font-mono-tabular">
                            <p className="font-bold text-[#1A1B1A]">
                              {s.confirmedPaidSeats} confirmed
                            </p>
                            <p className="text-[#666A65]">{s.reservedSeats} drafts</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                    <h2 className="text-base font-bold text-[#1A1B1A]">
                      Integration & Launch Gate Status
                    </h2>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-center justify-between py-1.5 border-b border-[#E6E6DF]">
                        <span className="text-[#666A65]">Razorpay Adapter Mode</span>
                        <span className="font-mono-tabular font-bold uppercase">
                          {data.razorpayStatus.mode}
                        </span>
                      </li>
                      <li className="flex items-center justify-between py-1.5 border-b border-[#E6E6DF]">
                        <span className="text-[#666A65]">Gate G1 (Paid Webinar Launch)</span>
                        <span className="font-mono-tabular font-bold">
                          {g1Items.filter((i) => i.isCompleted).length} / {g1Items.length} verified
                        </span>
                      </li>
                      <li className="flex items-center justify-between py-1.5 border-b border-[#E6E6DF]">
                        <span className="text-[#666A65]">Gate G2 (10-Course Programme Sales)</span>
                        <span className="font-mono-tabular font-bold">
                          {g2Items.filter((i) => i.isCompleted).length} / {g2Items.length} verified
                        </span>
                      </li>
                    </ul>
                    <Link
                      to="/admin/settings"
                      className="inline-block text-xs font-semibold underline text-[#1A1B1A]"
                    >
                      Manage G1 / G2 Readiness Checklists & Feature Flags →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 2. WEBINARS & SESSIONS */}
            {/* ============================================================== */}
            {normalizedSection === 'webinars' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {data.webinarSessions.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono-tabular text-xs font-bold px-2.5 py-1 rounded bg-[#F3F1E9]">
                          {s.id}
                        </span>
                        <span className="text-xs font-semibold text-[#666A65]">
                          {s.totalPayablePaise} paise (₹299)
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-[#1A1B1A]">{s.title.en}</h2>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <label className="block space-y-1">
                          <span className="font-semibold">Operational Status</span>
                          <select
                            defaultValue={s.status}
                            onChange={async (e) => {
                              const ok = await adminFetch(
                                `/api/v1/admin/sessions/${s.id}`,
                                'PATCH',
                                { status: e.target.value }
                              );
                              if (ok) {
                                setActionBanner({
                                  type: 'success',
                                  message: `Updated ${s.id} status to ${e.target.value}.`,
                                });
                              }
                            }}
                            className="w-full min-h-[38px] rounded-[8px] border border-[#E6E6DF] bg-[#FAF9F5] px-2"
                          >
                            <option value="DRAFT">DRAFT</option>
                            <option value="SCHEDULED">SCHEDULED</option>
                            <option value="OPEN_FOR_REGISTRATION">OPEN_FOR_REGISTRATION</option>
                            <option value="REGISTRATION_CLOSED">REGISTRATION_CLOSED</option>
                            <option value="LIVE">LIVE</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="CANCELLED">CANCELLED</option>
                            <option value="RESCHEDULED">RESCHEDULED</option>
                          </select>
                        </label>

                        <label className="block space-y-1">
                          <span className="font-semibold">Protected Room URL (Paid Only)</span>
                          <input
                            type="url"
                            defaultValue={s.privateMeetingUrl}
                            placeholder="https://meet.google.com/..."
                            onBlur={async (e) => {
                              if (e.target.value !== s.privateMeetingUrl) {
                                const ok = await adminFetch(
                                  `/api/v1/admin/sessions/${s.id}`,
                                  'PATCH',
                                  { privateMeetingUrl: e.target.value }
                                );
                                if (ok) {
                                  setActionBanner({
                                    type: 'success',
                                    message: `Saved protected room URL for ${s.id}.`,
                                  });
                                }
                              }
                            }}
                            className="w-full min-h-[38px] rounded-[8px] border border-[#E6E6DF] bg-[#FAF9F5] px-2 font-mono-tabular"
                          />
                        </label>
                      </div>

                      <div className="pt-2 border-t border-[#E6E6DF] text-xs space-y-2">
                        <p className="font-semibold text-[#1A1B1A]">Scheduled Reminder Jobs:</p>
                        <div className="flex flex-wrap gap-2">
                          {data.reminderJobs
                            .filter((j) => j.sessionId === s.id)
                            .map((job) => (
                              <button
                                key={job.id}
                                type="button"
                                onClick={async () => {
                                  const ok = await adminFetch(
                                    `/api/v1/admin/reminders/${job.id}/trigger`,
                                    'POST'
                                  );
                                  if (ok) {
                                    setActionBanner({
                                      type: 'success',
                                      message: `Triggered ${job.reminderType} (${ok.newlyQueuedCount} emails queued).`,
                                    });
                                  }
                                }}
                                className="px-3 py-1.5 rounded-[8px] border border-[#E6E6DF] bg-[#FAF9F5] hover:border-[#1A1B1A] text-[11px] font-mono-tabular"
                              >
                                {job.reminderType} ({job.status})
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Attendance CSV Preview & Commit */}
                <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                  <h2 className="text-base font-bold text-[#1A1B1A]">
                    Attendance CSV Import Preview & Commit
                  </h2>
                  <textarea
                    rows={3}
                    value={attendanceCsvText}
                    onChange={(e) => setAttendanceCsvText(e.target.value)}
                    className="w-full rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] p-3 text-xs font-mono-tabular"
                  />
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={async () => {
                        const res = await adminFetch(
                          '/api/v1/admin/sessions/bonnza-2026-12-05-en-1300/attendance/preview',
                          'POST',
                          { csvText: attendanceCsvText }
                        );
                        if (res?.preview) setAttendancePreview(res.preview);
                      }}
                      className="px-4 py-2 rounded-[10px] border border-[#1A1B1A] bg-[#FAF9F5] text-xs font-semibold"
                    >
                      Preview CSV Mapping (EN Session)
                    </button>
                    {attendancePreview.length > 0 && (
                      <button
                        type="button"
                        onClick={async () => {
                          const valid = attendancePreview
                            .filter((p) => p.matchedRegistrationReference)
                            .map((p) => ({
                              registrationReference: p.matchedRegistrationReference!,
                              status: p.status,
                              durationMinutes: p.durationMinutes,
                            }));
                          const ok = await adminFetch(
                            '/api/v1/admin/sessions/bonnza-2026-12-05-en-1300/attendance/commit',
                            'POST',
                            { records: valid }
                          );
                          if (ok) {
                            setActionBanner({
                              type: 'success',
                              message: `Committed ${ok.attendance.length} attendance records.`,
                            });
                          }
                        }}
                        className="px-4 py-2 rounded-[10px] bg-[#F4C940] text-xs font-semibold text-[#1A1B1A]"
                      >
                        Commit Matched Attendance Records
                      </button>
                    )}
                  </div>
                  {attendancePreview.length > 0 && (
                    <div className="text-xs font-mono-tabular space-y-1 pt-2">
                      {attendancePreview.map((row, idx) => (
                        <p key={idx}>
                          {row.email} · {row.durationMinutes}m → {row.status} (Matched:{' '}
                          {row.matchedRegistrationReference || 'None'})
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 3. REGISTRATIONS */}
            {/* ============================================================== */}
            {normalizedSection === 'registrations' && (
              <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                <h2 className="text-base font-bold text-[#1A1B1A]">
                  Webinar Registrations ({data.registrations.length})
                </h2>
                {data.registrations.length === 0 ? (
                  <p className="text-xs text-[#666A65]">No registrations recorded yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-[#E6E6DF] text-[#666A65]">
                          <th className="py-2 pr-3">Ref</th>
                          <th className="py-2 pr-3">Registrant</th>
                          <th className="py-2 pr-3">Session ID</th>
                          <th className="py-2 pr-3">Payment State</th>
                          <th className="py-2 pr-3">Seat Confirmed</th>
                          <th className="py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E6E6DF]">
                        {data.registrations.map((r) => (
                          <tr key={r.id}>
                            <td className="py-3 pr-3 font-mono-tabular font-bold">
                              {r.registrationReference}
                            </td>
                            <td className="py-3 pr-3">
                              <p className="font-semibold text-[#1A1B1A]">{r.fullName}</p>
                              <p className="text-[#666A65]">{r.email}</p>
                            </td>
                            <td className="py-3 pr-3 font-mono-tabular">{r.sessionId}</td>
                            <td className="py-3 pr-3 font-mono-tabular font-semibold">
                              {r.paymentState}
                            </td>
                            <td className="py-3 pr-3">{r.seatConfirmed ? 'YES' : 'NO'}</td>
                            <td className="py-3">
                              <button
                                type="button"
                                onClick={async () => {
                                  const target: WebinarSessionId =
                                    r.sessionId === 'bonnza-2026-12-05-en-1300'
                                      ? 'bonnza-2026-12-05-hi-1600'
                                      : 'bonnza-2026-12-05-en-1300';
                                  const ok = await adminFetch(
                                    `/api/v1/admin/registrations/${r.registrationReference}/transfer`,
                                    'POST',
                                    { targetSessionId: target }
                                  );
                                  if (ok) {
                                    setActionBanner({
                                      type: 'success',
                                      message: `Transferred ${r.registrationReference} to ${target}.`,
                                    });
                                  }
                                }}
                                className="px-2.5 py-1 rounded border border-[#1A1B1A] text-[11px] font-semibold"
                              >
                                Transfer Session
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================== */}
            {/* 4. ORDERS & 5. PAYMENTS */}
            {/* ============================================================== */}
            {(normalizedSection === 'orders' || normalizedSection === 'payments') && (
              <div className="space-y-6">
                <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-base font-bold text-[#1A1B1A]">
                      Orders ({data.orders.length}) & Payment Reconciliation
                    </h2>
                    <p className="text-xs text-[#666A65]">
                      All monetary values are calculated in integer paise (29900 paise = ₹299.00).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      const ok = await adminFetch('/api/v1/admin/payments/reconcile', 'POST');
                      if (ok?.run) {
                        setActionBanner({
                          type: 'success',
                          message: ok.run.summary,
                        });
                      }
                    }}
                    className="px-4 py-2 rounded-[10px] bg-[#F4C940] text-[#1A1B1A] text-xs font-semibold"
                  >
                    Run Payment Reconciliation
                  </button>
                </div>

                <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                  <h3 className="text-sm font-bold">Orders Ledger</h3>
                  {data.orders.length === 0 ? (
                    <p className="text-xs text-[#666A65]">No orders created yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#E6E6DF] text-[#666A65]">
                            <th className="py-2">Order #</th>
                            <th className="py-2">Session</th>
                            <th className="py-2">Payable (Paise)</th>
                            <th className="py-2">Razorpay Order ID</th>
                            <th className="py-2">Receipt</th>
                            <th className="py-2">State</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E6E6DF] font-mono-tabular">
                          {data.orders.map((o) => (
                            <tr key={o.id}>
                              <td className="py-2.5 font-bold">{o.orderNumber}</td>
                              <td className="py-2.5">{o.sessionId}</td>
                              <td className="py-2.5">{o.totalPayablePaise}p (₹299)</td>
                              <td className="py-2.5">{o.razorpayOrderId || '—'}</td>
                              <td className="py-2.5">{o.receiptNumber || '—'}</td>
                              <td className="py-2.5 font-bold">{o.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-3">
                  <h3 className="text-sm font-bold">
                    Razorpay Webhook Events Log ({data.webhookEvents.length})
                  </h3>
                  {data.webhookEvents.length === 0 ? (
                    <p className="text-xs text-[#666A65]">No webhook events received yet.</p>
                  ) : (
                    <div className="space-y-2 text-xs font-mono-tabular">
                      {data.webhookEvents.map((wh) => (
                        <div
                          key={wh.id}
                          className="p-3 rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] flex items-center justify-between"
                        >
                          <span>
                            {wh.providerEventId} · {wh.eventType} · Order:{' '}
                            {wh.razorpayOrderId || '—'}
                          </span>
                          <span className="font-bold">{wh.processedStatus}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 6. REFUNDS */}
            {/* ============================================================== */}
            {normalizedSection === 'refunds' && (
              <div className="space-y-6">
                <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                  <h2 className="text-base font-bold text-[#1A1B1A]">Initiate Order Refund</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <select
                      value={refundOrderId}
                      onChange={(e) => setRefundOrderId(e.target.value)}
                      className="min-h-[40px] rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] px-3"
                    >
                      <option value="">Select PAID_CONFIRMED order...</option>
                      {data.orders
                        .filter((o) => o.status === 'PAID_CONFIRMED')
                        .map((o) => (
                          <option key={o.id} value={o.id}>
                            {o.orderNumber} ({o.totalPayablePaise} paise)
                          </option>
                        ))}
                    </select>
                    <input
                      type="text"
                      value={refundReason}
                      onChange={(e) => setRefundReason(e.target.value)}
                      placeholder="Refund reason (required)"
                      className="min-h-[40px] rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] px-3"
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        if (!refundOrderId) return;
                        const ok = await adminFetch('/api/v1/admin/refunds', 'POST', {
                          orderId: refundOrderId,
                          reason: refundReason,
                          autoComplete: true,
                        });
                        if (ok) {
                          setActionBanner({
                            type: 'success',
                            message: `Refund ${ok.refund.status} for order.`,
                          });
                        }
                      }}
                      className="min-h-[40px] px-4 rounded-[10px] bg-[#1A1B1A] text-white font-semibold"
                    >
                      Initiate & Process Refund
                    </button>
                  </div>
                </div>

                <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-3">
                  <h3 className="text-sm font-bold">Refund Records ({data.refunds.length})</h3>
                  {data.refunds.length === 0 ? (
                    <p className="text-xs text-[#666A65]">No refunds recorded yet.</p>
                  ) : (
                    <div className="space-y-2 text-xs">
                      {data.refunds.map((rf) => (
                        <div
                          key={rf.id}
                          className="p-3.5 rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] flex items-center justify-between"
                        >
                          <div>
                            <p className="font-bold font-mono-tabular">
                              {rf.id} · {rf.amountPaise} paise · {rf.status}
                            </p>
                            <p className="text-[#666A65]">{rf.reason}</p>
                          </div>
                          {rf.status === 'REFUND_PENDING' && (
                            <button
                              type="button"
                              onClick={async () => {
                                const ok = await adminFetch(
                                  `/api/v1/admin/refunds/${rf.id}/approve`,
                                  'POST'
                                );
                                if (ok) {
                                  setActionBanner({
                                    type: 'success',
                                    message: 'Refund approved and seat released.',
                                  });
                                }
                              }}
                              className="px-3 py-1.5 rounded bg-[#F4C940] text-[#1A1B1A] font-semibold"
                            >
                              Approve Refund
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 7. CUSTOMERS & CRM + 8. SUPPORT TICKETS */}
            {/* ============================================================== */}
            {(normalizedSection === 'customers' || normalizedSection === 'crm') && (
              <div className="space-y-6">
                <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                  <h2 className="text-base font-bold text-[#1A1B1A]">
                    Customer CRM Profiles ({data.customers.length})
                  </h2>
                  {data.customers.length === 0 ? (
                    <p className="text-xs text-[#666A65]">No customer profiles recorded yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {data.customers.map((c) => (
                        <div
                          key={c.id}
                          className="rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] p-4 space-y-2 text-xs"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <p className="font-bold text-sm text-[#1A1B1A]">
                                {c.fullName} ({c.primaryEmail})
                              </p>
                              <p className="text-[#666A65]">
                                Interest: {c.businessInterest} · UI: {c.preferredUiLocale} ·
                                Webinar: {c.preferredWebinarLocale}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {c.lifecycleStages.map((st) => (
                                <span
                                  key={st}
                                  className="px-2 py-0.5 rounded bg-[#E8EDDD] font-mono-tabular text-[11px] font-semibold"
                                >
                                  {st}
                                </span>
                              ))}
                            </div>
                          </div>
                          {c.tags.length > 0 && (
                            <p className="text-[#666A65]">Tags: {c.tags.join(', ')}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {data.customers.length > 0 && (
                    <div className="pt-3 border-t border-[#E6E6DF] grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                      <select
                        value={crmNoteCustomerId}
                        onChange={(e) => setCrmNoteCustomerId(e.target.value)}
                        className="min-h-[38px] rounded-[8px] border border-[#E6E6DF] bg-[#FAF9F5] px-2"
                      >
                        <option value="">Select customer...</option>
                        {data.customers.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.primaryEmail}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={crmNoteBody}
                        onChange={(e) => setCrmNoteBody(e.target.value)}
                        placeholder="Add CRM note..."
                        className="min-h-[38px] rounded-[8px] border border-[#E6E6DF] bg-[#FAF9F5] px-2"
                      />
                      <input
                        type="text"
                        value={crmTagInput}
                        onChange={(e) => setCrmTagInput(e.target.value)}
                        placeholder="Tag (e.g. high-intent)"
                        className="min-h-[38px] rounded-[8px] border border-[#E6E6DF] bg-[#FAF9F5] px-2"
                      />
                      <button
                        type="button"
                        onClick={async () => {
                          if (!crmNoteCustomerId) return;
                          const ok = await adminFetch(
                            `/api/v1/admin/customers/${crmNoteCustomerId}/notes`,
                            'POST',
                            { body: crmNoteBody, tag: crmTagInput }
                          );
                          if (ok) {
                            setCrmNoteBody('');
                            setCrmTagInput('');
                            setActionBanner({
                              type: 'success',
                              message: 'Added CRM note/tag to customer.',
                            });
                          }
                        }}
                        className="min-h-[38px] rounded-[8px] bg-[#1A1B1A] text-white font-semibold"
                      >
                        Save Note & Tag
                      </button>
                    </div>
                  )}
                </div>

                {/* Support Tickets */}
                <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                  <h2 className="text-base font-bold text-[#1A1B1A]">
                    Support Tickets ({data.supportTickets.length})
                  </h2>
                  {data.supportTickets.length === 0 ? (
                    <p className="text-xs text-[#666A65]">No support tickets logged yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {data.supportTickets.map((t) => (
                        <div
                          key={t.id}
                          className="rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] p-4 flex flex-wrap items-center justify-between gap-4 text-xs"
                        >
                          <div className="space-y-1 max-w-xl">
                            <p className="font-bold font-mono-tabular">
                              {t.ticketNumber} · {t.name} ({t.email})
                            </p>
                            <p className="text-[#1A1B1A]">{t.message}</p>
                          </div>
                          <select
                            defaultValue={t.status}
                            onChange={async (e) => {
                              const ok = await adminFetch(
                                `/api/v1/admin/tickets/${t.id}`,
                                'PATCH',
                                { status: e.target.value }
                              );
                              if (ok) {
                                setActionBanner({
                                  type: 'success',
                                  message: `Ticket ${t.ticketNumber} marked ${e.target.value}.`,
                                });
                              }
                            }}
                            className="min-h-[36px] rounded-[8px] border border-[#E6E6DF] bg-[#FFFFFF] px-2 font-semibold"
                          >
                            <option value="OPEN">OPEN</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="WAITING_FOR_CUSTOMER">WAITING_FOR_CUSTOMER</option>
                            <option value="RESOLVED">RESOLVED</option>
                            <option value="CLOSED">CLOSED</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 9. BLOG EDITORIAL CMS (20 ARTICLES B01-B20) */}
            {/* ============================================================== */}
            {normalizedSection === 'articles' && selectedArticle && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-4 rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-4 space-y-2 max-h-[680px] overflow-y-auto">
                  <p className="text-xs font-bold text-[#666A65] px-2">
                    20 Seeded Articles (B01–B20)
                  </p>
                  {data.articles.map((art) => (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => setSelectedArticleId(art.id)}
                      className={`w-full text-left p-3 rounded-[10px] border text-xs transition-colors ${
                        art.id === selectedArticle.id
                          ? 'border-[#1A1B1A] bg-[#FAF9F5] font-bold'
                          : 'border-[#E6E6DF] bg-[#FFFFFF] text-[#666A65]'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono-tabular">
                        <span>{art.id}</span>
                        <span>
                          EN:{art.locales.en.editorialStatus} · HI:{art.locales.hi.editorialStatus}
                        </span>
                      </div>
                      <p className="text-[#1A1B1A] truncate mt-1">{art.title.en}</p>
                    </button>
                  ))}
                </div>

                <div className="lg:col-span-8 rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E6E6DF] pb-4">
                    <div>
                      <span className="font-mono-tabular text-xs font-bold px-2 py-0.5 rounded bg-[#F3F1E9]">
                        {selectedArticle.id} · v{selectedArticle.contentVersion}
                      </span>
                      <h2 className="text-lg font-bold text-[#1A1B1A] mt-1">
                        {selectedArticle.locales[selectedArticleLocale].title}
                      </h2>
                    </div>
                    <div className="flex gap-1.5">
                      {(['en', 'hi'] as const).map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setSelectedArticleLocale(loc)}
                          className={`px-3 py-1.5 rounded-[8px] text-xs font-bold uppercase ${
                            selectedArticleLocale === loc
                              ? 'bg-[#1A1B1A] text-white'
                              : 'border border-[#E6E6DF] text-[#666A65]'
                          }`}
                        >
                          {loc === 'en' ? 'English (EN)' : 'Hindi (HI)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-[10px] bg-[#FAF9F5] border border-[#E6E6DF]">
                      <p className="text-[#666A65]">Editorial Status</p>
                      <p className="font-mono-tabular font-bold text-sm mt-0.5">
                        {selectedArticle.locales[selectedArticleLocale].editorialStatus}
                      </p>
                    </div>
                    <div className="p-3 rounded-[10px] bg-[#FAF9F5] border border-[#E6E6DF]">
                      <p className="text-[#666A65]">Subject Review</p>
                      <p className="font-mono-tabular font-bold text-sm mt-0.5">
                        {selectedArticle.locales[selectedArticleLocale].subjectReviewStatus}
                      </p>
                    </div>
                    <div className="p-3 rounded-[10px] bg-[#FAF9F5] border border-[#E6E6DF]">
                      <p className="text-[#666A65]">Translation Status</p>
                      <p className="font-mono-tabular font-bold text-sm mt-0.5">
                        {selectedArticle.locales[selectedArticleLocale].translationStatus}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <label className="block space-y-1">
                      <span className="font-semibold">Verified Reviewer Name</span>
                      <input
                        type="text"
                        value={cmsReviewer}
                        onChange={(e) => setCmsReviewer(e.target.value)}
                        className="w-full min-h-[38px] rounded-[8px] border border-[#E6E6DF] bg-[#FAF9F5] px-2.5"
                      />
                    </label>
                    <label className="block space-y-1">
                      <span className="font-semibold">Source Checked Date</span>
                      <input
                        type="date"
                        value={cmsSourceDate}
                        onChange={(e) => setCmsSourceDate(e.target.value)}
                        className="w-full min-h-[38px] rounded-[8px] border border-[#E6E6DF] bg-[#FAF9F5] px-2.5 font-mono-tabular"
                      />
                    </label>
                    <label className="block space-y-1">
                      <span className="font-semibold">Version Change Note</span>
                      <input
                        type="text"
                        value={cmsChangeNote}
                        onChange={(e) => setCmsChangeNote(e.target.value)}
                        placeholder="e.g. Verified fee table"
                        className="w-full min-h-[38px] rounded-[8px] border border-[#E6E6DF] bg-[#FAF9F5] px-2.5"
                      />
                    </label>
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={async () => {
                        const ok = await adminFetch(
                          `/api/v1/admin/articles/${selectedArticle.id}`,
                          'PATCH',
                          {
                            locale: selectedArticleLocale,
                            subjectReviewStatus: 'VERIFIED',
                            translationStatus: 'APPROVED',
                            reviewerName: cmsReviewer,
                            sourceCheckedDate: cmsSourceDate,
                            changeNote:
                              cmsChangeNote ||
                              `Marked ${selectedArticleLocale.toUpperCase()} subject review VERIFIED`,
                          }
                        );
                        if (ok) {
                          setActionBanner({
                            type: 'success',
                            message: `${selectedArticle.id} (${selectedArticleLocale.toUpperCase()}) marked VERIFIED & APPROVED.`,
                          });
                        }
                      }}
                      className="px-4 py-2 rounded-[10px] border border-[#1A1B1A] bg-[#FAF9F5] text-xs font-semibold"
                    >
                      1. Verify Subject Review & Approve Translation
                    </button>

                    <button
                      type="button"
                      onClick={async () => {
                        const ok = await adminFetch(
                          `/api/v1/admin/articles/${selectedArticle.id}`,
                          'PATCH',
                          {
                            locale: selectedArticleLocale,
                            editorialStatus: 'PUBLISHED',
                            reviewerName: cmsReviewer,
                            sourceCheckedDate: cmsSourceDate,
                            changeNote:
                              cmsChangeNote ||
                              `Published ${selectedArticle.id} (${selectedArticleLocale.toUpperCase()})`,
                          }
                        );
                        if (ok) {
                          setActionBanner({
                            type: 'success',
                            message: `Published ${selectedArticle.id} (${selectedArticleLocale.toUpperCase()}) to public blog index.`,
                          });
                        }
                      }}
                      className="px-4 py-2 rounded-[10px] bg-[#F4C940] text-[#1A1B1A] text-xs font-semibold"
                    >
                      2. Publish {selectedArticleLocale.toUpperCase()} Article (Requires VERIFIED)
                    </button>

                    <button
                      type="button"
                      onClick={async () => {
                        const ok = await adminFetch(
                          `/api/v1/admin/articles/${selectedArticle.id}`,
                          'PATCH',
                          {
                            locale: selectedArticleLocale,
                            editorialStatus: 'DRAFT',
                            changeNote: 'Reverted to DRAFT',
                          }
                        );
                        if (ok) {
                          setActionBanner({
                            type: 'success',
                            message: `Reverted ${selectedArticle.id} (${selectedArticleLocale.toUpperCase()}) to DRAFT.`,
                          });
                        }
                      }}
                      className="px-3 py-2 rounded-[10px] border border-[#E6E6DF] text-xs text-[#666A65]"
                    >
                      Revert to DRAFT
                    </button>
                  </div>

                  <div className="pt-4 border-t border-[#E6E6DF] space-y-2">
                    <h3 className="text-xs font-bold uppercase text-[#666A65]">
                      Editorial Version History ({selectedArticle.versions.length})
                    </h3>
                    <div className="space-y-1.5 text-xs font-mono-tabular">
                      {selectedArticle.versions.map((v) => (
                        <div
                          key={v.id}
                          className="p-2.5 rounded bg-[#FAF9F5] border border-[#E6E6DF] flex items-center justify-between"
                        >
                          <span>
                            v{v.versionLabel} ({v.locale.toUpperCase()}) — {v.changeNote}
                          </span>
                          <span className="text-[#666A65]">{v.editorEmail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 10. COURSES & CURRICULUM (10 Courses, 22 Modules, 44 Lessons) */}
            {/* ============================================================== */}
            {normalizedSection === 'content' && (
              <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-[#1A1B1A]">
                      10-Course Curriculum Architecture (22 Modules · 44 Lessons)
                    </h2>
                    <p className="text-xs text-[#666A65]">
                      Protected by Gate G2 — standalone ₹2,499 and bundle ₹6,999 checkout remain
                      disabled until video production and expert verification complete.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded bg-[#F3F1E9] font-mono-tabular text-xs font-bold">
                    CURRICULUM_PREPARED
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.courses.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] p-4 space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between font-mono-tabular">
                        <span className="font-bold text-[#1A1B1A]">{c.id}</span>
                        <span className="text-[#666A65]">
                          {c.modules.length} modules ·{' '}
                          {c.modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
                        </span>
                      </div>
                      <p className="font-bold text-sm text-[#1A1B1A]">{c.title.en}</p>
                      <p className="text-[#666A65]">{c.title.hi}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 11. PAGES & RESOURCES */}
            {/* ============================================================== */}
            {normalizedSection === 'pages' && (
              <div className="space-y-6">
                <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                  <h2 className="text-base font-bold text-[#1A1B1A]">
                    Website Content Blocks (Fixed Business Rules Protected)
                  </h2>
                  <div className="space-y-4">
                    {data.pageBlocks.map((b) => (
                      <div
                        key={b.id}
                        className="rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] p-4 space-y-3 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono-tabular font-bold">
                            {b.pageKey}.{b.blockKey}
                          </span>
                          {b.isLockedBusinessRule ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold">
                              <Lock size={12} /> Locked Business Rule
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded bg-[#E8EDDD] font-semibold">
                              Editable Copy Block
                            </span>
                          )}
                        </div>
                        <p className="font-bold text-[#1A1B1A]">{b.title.en}</p>
                        <p className="text-[#666A65]">{b.body.en}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 12. EMAIL OUTBOX & 16 TEMPLATES */}
            {/* ============================================================== */}
            {normalizedSection === 'notifications' && (
              <div className="space-y-6">
                <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                  <h2 className="text-base font-bold text-[#1A1B1A]">
                    Transactional Email Outbox ({data.emailOutbox.length})
                  </h2>
                  {data.emailOutbox.length === 0 ? (
                    <p className="text-xs text-[#666A65]">No emails queued yet.</p>
                  ) : (
                    <div className="space-y-2.5 text-xs">
                      {data.emailOutbox.map((eml) => (
                        <div
                          key={eml.id}
                          className="rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] p-4 flex flex-wrap items-center justify-between gap-3"
                        >
                          <div className="space-y-1 max-w-2xl">
                            <p className="font-mono-tabular font-bold">
                              [{eml.status}] {eml.templateCode} ({eml.locale.toUpperCase()}) →{' '}
                              {eml.recipientEmail}
                            </p>
                            <p className="font-semibold text-[#1A1B1A]">{eml.subject}</p>
                            <p className="text-[#666A65]">{eml.body}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={async () => {
                                await adminFetch(
                                  `/api/v1/admin/outbox/${eml.id}/action`,
                                  'POST',
                                  { action: 'retry' }
                                );
                              }}
                              className="px-3 py-1.5 rounded border border-[#1A1B1A] bg-[#FFFFFF] font-semibold"
                            >
                              Retry
                            </button>
                            <button
                              type="button"
                              onClick={async () => {
                                await adminFetch(
                                  `/api/v1/admin/outbox/${eml.id}/action`,
                                  'POST',
                                  { action: 'cancel' }
                                );
                              }}
                              className="px-3 py-1.5 rounded border border-[#E6E6DF] text-[#666A65]"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-3">
                  <h3 className="text-sm font-bold">
                    16 Bilingual Transactional Email Templates (EN + HI)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {data.emailTemplates.map((tpl) => (
                      <div
                        key={tpl.code}
                        className="p-3.5 rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] space-y-1"
                      >
                        <p className="font-mono-tabular font-bold text-[#1A1B1A]">{tpl.code}</p>
                        <p className="text-[#1A1B1A]">EN: {tpl.subject.en}</p>
                        <p className="text-[#666A65]">HI: {tpl.subject.hi}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 12A. INTERNAL ANALYTICS & SEO AUDIT (/admin/analytics) */}
            {/* ============================================================== */}
            {normalizedSection === 'analytics' && data.internalAnalytics && (
              <div className="space-y-6">
                <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="text-base font-bold text-[#1A1B1A]">
                        Internal Commercial Analytics & Funnel Ledger
                      </h2>
                      <p className="text-xs text-[#666A65]">
                        Server-verified metrics across acquisition, conversion funnel, integer paise
                        settlement, webinar sessions, editorial readiness, and programme interest.
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded bg-[#E8EDDD] font-mono-tabular text-xs font-bold">
                      PII-Stripped · Verified Only
                    </span>
                  </div>

                  {/* Funnel KPIs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3.5 rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5]">
                      <p className="text-[#666A65]">Registrations Created</p>
                      <p className="text-xl font-bold font-mono-tabular mt-1">
                        {data.internalAnalytics.conversionFunnel.registrationsCreated}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5]">
                      <p className="text-[#666A65]">Payment Initiated</p>
                      <p className="text-xl font-bold font-mono-tabular mt-1">
                        {data.internalAnalytics.conversionFunnel.paymentInitiatedCount}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5]">
                      <p className="text-[#666A65]">Verified Paid Seats</p>
                      <p className="text-xl font-bold font-mono-tabular text-emerald-800 mt-1">
                        {data.internalAnalytics.conversionFunnel.verifiedPaidSeatsCount}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5]">
                      <p className="text-[#666A65]">Verified Conversion Rate</p>
                      <p className="text-xl font-bold font-mono-tabular mt-1">
                        {data.internalAnalytics.conversionFunnel.registrationToPaidConversionPercent}%
                      </p>
                    </div>
                  </div>

                  {/* Revenue & Settlement Ledger */}
                  <div className="rounded-[14px] border border-[#1A1B1A] bg-[#FAF9F5] p-4 space-y-2 text-xs">
                    <p className="font-bold text-sm text-[#1A1B1A]">
                      Revenue & Settlement Breakdown (Gross Collections ≠ Net Profit)
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono-tabular">
                      <div>
                        <span className="text-[#666A65] block">Gross Verified Collections:</span>
                        <span className="font-bold text-sm">
                          ₹{data.internalAnalytics.revenueAndSettlement.grossVerifiedCollectionsInr}{' '}
                          ({data.internalAnalytics.revenueAndSettlement.grossVerifiedCollectionsPaise}{' '}
                          paise)
                        </span>
                      </div>
                      <div>
                        <span className="text-[#666A65] block">Refunded Amount:</span>
                        <span className="font-bold text-sm">
                          ₹{data.internalAnalytics.revenueAndSettlement.refundedInr} (
                          {data.internalAnalytics.revenueAndSettlement.refundedPaise} paise)
                        </span>
                      </div>
                      <div>
                        <span className="text-[#666A65] block">Est. Gateway Fees (2.36%):</span>
                        <span className="font-bold text-sm">
                          {data.internalAnalytics.revenueAndSettlement.estimatedGatewayFeePaise} paise
                        </span>
                      </div>
                      <div>
                        <span className="text-[#666A65] block">Net Settlement (Pre-Tax):</span>
                        <span className="font-bold text-sm text-emerald-800">
                          ₹{data.internalAnalytics.revenueAndSettlement.netSettlementBeforeTaxInr} (
                          {data.internalAnalytics.revenueAndSettlement.netSettlementBeforeTaxPaise}{' '}
                          paise)
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#666A65]">
                      {data.internalAnalytics.revenueAndSettlement.revenueNote}
                    </p>
                  </div>

                  {/* Webinar Session Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {data.internalAnalytics.webinarOperations.sessions.map((s) => (
                      <div
                        key={s.sessionId}
                        className="rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] p-4 space-y-1.5"
                      >
                        <div className="flex items-center justify-between font-mono-tabular">
                          <span className="font-bold text-[#1A1B1A]">{s.sessionId}</span>
                          <span className="px-2 py-0.5 rounded bg-white border border-[#E6E6DF]">
                            {s.locale.toUpperCase()} · {s.timeWindowIst}
                          </span>
                        </div>
                        <p className="text-[#666A65]">
                          Registrations: <strong>{s.totalRegistrations}</strong> · Paid Confirmed:{' '}
                          <strong>{s.confirmedPaidSeats}</strong> · Attended:{' '}
                          <strong>{s.attendedCount}</strong> · No-Show:{' '}
                          <strong>{s.noShowCount}</strong> · Transfers:{' '}
                          <strong>{s.transferredCount}</strong>
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Acquisition, Content & Programme Interest */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] p-4 space-y-1.5">
                      <p className="font-bold text-[#1A1B1A]">Acquisition & Locale Mix</p>
                      <p className="text-[#666A65]">
                        Total Leads/Registrants:{' '}
                        <strong>{data.internalAnalytics.acquisition.totalLeadsAndRegistrants}</strong>
                      </p>
                      <p className="text-[#666A65]">
                        EN UI: <strong>{data.internalAnalytics.acquisition.byLocalePreference.en}</strong>{' '}
                        · HI UI:{' '}
                        <strong>{data.internalAnalytics.acquisition.byLocalePreference.hi}</strong>
                      </p>
                    </div>

                    <div className="rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] p-4 space-y-1.5">
                      <p className="font-bold text-[#1A1B1A]">Editorial CMS Readiness (20)</p>
                      <p className="text-[#666A65]">
                        EN Published:{' '}
                        <strong>{data.internalAnalytics.contentPerformance.publishedCountEn}</strong>{' '}
                        / {data.internalAnalytics.contentPerformance.totalSeededArticles} (Draft:{' '}
                        {data.internalAnalytics.contentPerformance.draftCountEn})
                      </p>
                      <p className="text-[#666A65]">
                        HI Published:{' '}
                        <strong>{data.internalAnalytics.contentPerformance.publishedCountHi}</strong>{' '}
                        / {data.internalAnalytics.contentPerformance.totalSeededArticles} (Draft:{' '}
                        {data.internalAnalytics.contentPerformance.draftCountHi})
                      </p>
                    </div>

                    <div className="rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] p-4 space-y-1.5">
                      <p className="font-bold text-[#1A1B1A]">Programme Waitlist Interest</p>
                      <p className="text-[#666A65]">
                        Total Waitlist Enquiries:{' '}
                        <strong>
                          {data.internalAnalytics.programmeInterest.totalWaitlistAndCourseEnquiries}
                        </strong>
                      </p>
                      <p className="text-[#666A65]">
                        Resell: <strong>{data.internalAnalytics.programmeInterest.byLearningPath.resell}</strong>{' '}
                        · Craft:{' '}
                        <strong>
                          {data.internalAnalytics.programmeInterest.byLearningPath.craftToCommerce}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Automated Technical SEO & Structured Data Audit */}
                {data.seoAudit && (
                  <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-base font-bold text-[#1A1B1A]">
                          Automated Route-Level SEO, Canonical, Hreflang & Schema Audit
                        </h3>
                        <p className="text-xs text-[#666A65]">
                          Verified {data.seoAudit.totalRoutesChecked} public & private routes ·{' '}
                          {data.seoAudit.passedCount} passed · {data.seoAudit.failedCount} failed
                        </p>
                      </div>
                      <div className="flex gap-2 text-xs font-mono-tabular">
                        <a
                          href="/sitemap.xml"
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded border border-[#1A1B1A] bg-[#FAF9F5] font-semibold"
                        >
                          /sitemap.xml
                        </a>
                        <a
                          href="/robots.txt"
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded border border-[#1A1B1A] bg-[#FAF9F5] font-semibold"
                        >
                          /robots.txt
                        </a>
                        <a
                          href="/llms.txt"
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded border border-[#1A1B1A] bg-[#FAF9F5] font-semibold"
                        >
                          /llms.txt
                        </a>
                      </div>
                    </div>

                    <div className="max-h-[420px] overflow-y-auto space-y-2 text-xs font-mono-tabular">
                      {data.seoAudit.checks.map((chk) => (
                        <div
                          key={chk.routePath}
                          className="p-3 rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] flex flex-wrap items-center justify-between gap-2"
                        >
                          <div>
                            <span className="font-bold text-[#1A1B1A]">{chk.routePath}</span>{' '}
                            <span className="text-[#666A65]">
                              [{chk.expectedRobots}] · Schemas: {chk.schemaTypes.join(', ')}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold">
                            {chk.passed ? 'PASS' : 'FAIL'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================== */}
            {/* 12B. LAUNCH CONTROL SYSTEM (16 CATEGORIES & 6 STATES) */}
            {/* ============================================================== */}
            {normalizedSection === 'launch-readiness' && data.launchReadiness && (
              <div className="space-y-6">
                <div className="rounded-[18px] border border-[#1A1B1A] bg-[#1A1B1A] text-[#FAF9F5] p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-mono-tabular uppercase tracking-wider text-[#F4C940]">
                        Launch Control System · Operations & Readiness
                      </p>
                      <h2 className="text-xl font-bold text-white mt-0.5">
                        Readiness Decision: {data.launchReadiness.overallReadinessDecision}
                      </h2>
                      <p className="text-xs text-[#FAF9F5]/80 mt-1">
                        Active Launch State:{' '}
                        <strong className="font-mono-tabular text-[#F4C940]">
                          {data.launchReadiness.currentLaunchState}
                        </strong>{' '}
                        · Remaining Blocking Categories:{' '}
                        <strong>{data.launchReadiness.blockingCategoriesRemaining}</strong>
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={async () => {
                          if (!authState) return;
                          const res = await fetch('/api/v1/admin/backups/export', {
                            headers: { 'x-admin-session': authState.sessionToken },
                          });
                          const snapshot = await res.json();
                          if (res.ok) {
                            const verifyRes = await adminFetch(
                              '/api/v1/admin/backups/restore-verify',
                              'POST',
                              { snapshot }
                            );
                            if (verifyRes?.verified) {
                              setActionBanner({
                                type: 'success',
                                message: `Backup exported & dry-run restore verified (SHA-256: ${snapshot.checksumSha256.slice(
                                  0,
                                  12
                                )}).`,
                              });
                            }
                          }
                        }}
                        className="px-4 py-2 rounded-[10px] bg-[#F4C940] text-[#1A1B1A] text-xs font-semibold"
                      >
                        Run Backup Export & Dry-Run Restore Verification
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                    {data.launchReadiness.launchStates.map((ls) => (
                      <div
                        key={ls.state}
                        className={`p-3 rounded-[10px] border ${
                          ls.active
                            ? 'border-[#F4C940] bg-white/10 text-white'
                            : 'border-white/15 text-[#FAF9F5]/70'
                        }`}
                      >
                        <p className="font-mono-tabular font-bold text-[11px]">{ls.state}</p>
                        <p className="font-semibold mt-0.5">{ls.title}</p>
                        <p className="text-[11px] opacity-80 mt-0.5">{ls.criteria}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 16 Launch Readiness Categories */}
                <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                  <h3 className="text-base font-bold text-[#1A1B1A]">
                    16 Launch Readiness Categories (Evidence & Blocker Ledger)
                  </h3>
                  <div className="space-y-2.5 text-xs">
                    {data.launchReadiness.categories.map((cat) => (
                      <div
                        key={cat.id}
                        className="p-4 rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] flex flex-wrap items-start justify-between gap-3"
                      >
                        <div className="space-y-1 max-w-2xl">
                          <p className="font-bold text-[#1A1B1A]">
                            {cat.id}. {cat.name}{' '}
                            <span className="font-mono-tabular text-[11px] text-[#666A65]">
                              ({cat.responsibleRole} · {cat.blockingClassification})
                            </span>
                          </p>
                          <p className="text-[#666A65]">Evidence: {cat.evidenceReference}</p>
                          {cat.blockerSummary && (
                            <p className="text-amber-900 font-medium">
                              Blocker: {cat.blockerSummary}
                            </p>
                          )}
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded font-mono-tabular text-[11px] font-bold ${
                            cat.status === 'VERIFIED' || cat.status === 'APPROVED'
                              ? 'bg-emerald-100 text-emerald-900'
                              : cat.status === 'BLOCKED'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-[#E8EDDD] text-[#1A1B1A]'
                          }`}
                        >
                          {cat.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 15-Day Stabilization & 90-Day Growth Experiment Registry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-3 text-xs">
                    <h3 className="text-sm font-bold text-[#1A1B1A]">
                      15-Day Post-Launch Stabilization Plan
                    </h3>
                    <div className="space-y-2 text-[#666A65]">
                      <p>
                        <strong className="text-[#1A1B1A]">Days 1–3 (Immediate Verification):</strong>{' '}
                        Hourly Razorpay webhook & signature reconciliation, transactional email
                        outbox delivery audit, and Search Console sitemap submission verification.
                      </p>
                      <p>
                        <strong className="text-[#1A1B1A]">Days 4–7 (Funnel & UX Audit):</strong>{' '}
                        Review registration-to-payment drop-off by session language (EN 1:00 PM vs
                        HI 4:00 PM IST), mobile sticky CTA interaction, and support ticket SLA.
                      </p>
                      <p>
                        <strong className="text-[#1A1B1A]">Days 8–15 (Content & Cohort Prep):</strong>{' '}
                        Publish first batch of subject-verified bilingual articles (`B01`–`B05`),
                        verify 24h/2h/15m reminder jobs, and lock attendance CSV workflow.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-3 text-xs">
                    <h3 className="text-sm font-bold text-[#1A1B1A]">
                      90-Day Growth & CRO Experiment Framework
                    </h3>
                    <div className="space-y-2 text-[#666A65]">
                      <p>
                        <strong className="text-[#1A1B1A]">Primary Metric:</strong>{' '}
                        <span className="font-mono-tabular">
                          verified_paid_seat_conversion_rate
                        </span>{' '}
                        (never unverified click counts).
                      </p>
                      <p>
                        <strong className="text-[#1A1B1A]">Experiment EXP-01 (Hero Session Clarity):</strong>{' '}
                        Compare side-by-side EN/HI time badges vs compact dropdown above the fold
                        (min 200 sessions per variant; stop if mobile bounce rises &gt;10%).
                      </p>
                      <p>
                        <strong className="text-[#1A1B1A]">Experiment EXP-02 (Worksheet Lead-In):</strong>{' '}
                        Measure Order Cost Calculator completion to workshop registration rate across
                        Resell vs Craft to Commerce articles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 13. REPORTS & CSV EXPORT */}
            {/* ============================================================== */}
            {normalizedSection === 'reports' && (
              <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                <h2 className="text-base font-bold text-[#1A1B1A]">
                  Operational Reports & CSV Exports
                </h2>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      downloadCsv(
                        'bonnza-registrations.csv',
                        ['Reference', 'FullName', 'Email', 'SessionId', 'PaymentState', 'SeatConfirmed'],
                        data.registrations.map((r) => [
                          r.registrationReference,
                          r.fullName,
                          r.email,
                          r.sessionId,
                          r.paymentState,
                          String(r.seatConfirmed),
                        ])
                      )
                    }
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-[#1A1B1A] text-white text-xs font-semibold"
                  >
                    <Download size={14} /> Export Registrations CSV
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      downloadCsv(
                        'bonnza-orders.csv',
                        ['OrderNumber', 'SessionId', 'TotalPaise', 'Status', 'RazorpayOrderId'],
                        data.orders.map((o) => [
                          o.orderNumber,
                          o.sessionId,
                          String(o.totalPayablePaise),
                          o.status,
                          o.razorpayOrderId || '',
                        ])
                      )
                    }
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-[#1A1B1A] bg-[#FAF9F5] text-xs font-semibold"
                  >
                    <Download size={14} /> Export Orders CSV
                  </button>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 14. SETTINGS, FEATURE FLAGS & GATES G1 / G2 */}
            {/* ============================================================== */}
            {normalizedSection === 'settings' && (
              <div className="space-y-6">
                <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                  <h2 className="text-base font-bold text-[#1A1B1A]">
                    Commercial Release Gates & Feature Flags
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.featureFlags.map((flag) => (
                      <div
                        key={flag.key}
                        className="rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] p-4 flex items-start justify-between gap-4 text-xs"
                      >
                        <div className="space-y-1">
                          <p className="font-mono-tabular font-bold text-[#1A1B1A]">
                            {flag.key} (Gate: {flag.gatedBy})
                          </p>
                          <p className="text-[#666A65]">{flag.description}</p>
                        </div>
                        <button
                          type="button"
                          onClick={async () => {
                            const ok = await adminFetch(
                              `/api/v1/admin/feature-flags/${flag.key}`,
                              'PATCH',
                              { enabled: !flag.enabled }
                            );
                            if (ok) {
                              setActionBanner({
                                type: 'success',
                                message: `${flag.key} set to ${ok.flag.enabled}.`,
                              });
                            }
                          }}
                          className={`px-3 py-1.5 rounded font-mono-tabular font-bold ${
                            flag.enabled
                              ? 'bg-emerald-700 text-white'
                              : 'bg-[#E6E6DF] text-[#1A1B1A]'
                          }`}
                        >
                          {flag.enabled ? 'ENABLED' : 'DISABLED'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gate G1 — 17-Point Checklist */}
                <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                  <h3 className="text-base font-bold text-[#1A1B1A]">
                    Gate G1 — Paid Webinar Launch Readiness Checklist (17 Items)
                  </h3>
                  <div className="space-y-2 text-xs">
                    {g1Items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] flex items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-2.5">
                          {item.isCompleted ? (
                            <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                          ) : (
                            <AlertTriangle size={16} className="text-amber-700 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="font-bold text-[#1A1B1A]">{item.label}</p>
                            <p className="text-[#666A65]">{item.verificationNote}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={async () => {
                            await adminFetch(`/api/v1/admin/checklist/${item.id}`, 'PATCH', {
                              isCompleted: !item.isCompleted,
                            });
                          }}
                          className="px-3 py-1 rounded border border-[#1A1B1A] bg-[#FFFFFF] font-mono-tabular text-[11px] font-semibold shrink-0"
                        >
                          {item.isCompleted ? 'Mark Incomplete' : 'Verify Complete'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gate G2 — 8-Point Checklist */}
                <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                  <h3 className="text-base font-bold text-[#1A1B1A]">
                    Gate G2 — Course & Bundle Sales Gate (8 Items)
                  </h3>
                  <div className="space-y-2 text-xs">
                    {g2Items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] flex items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-2.5">
                          {item.isCompleted ? (
                            <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                          ) : (
                            <Shield size={16} className="text-[#666A65] shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="font-bold text-[#1A1B1A]">{item.label}</p>
                            <p className="text-[#666A65]">{item.verificationNote}</p>
                          </div>
                        </div>
                        <span className="font-mono-tabular text-[11px] text-[#666A65]">
                          {item.isCompleted ? 'VERIFIED' : 'LOCKED'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* 15. AUDIT LOG */}
            {/* ============================================================== */}
            {normalizedSection === 'audit-log' && (
              <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                <h2 className="text-base font-bold text-[#1A1B1A]">
                  Immutable Operational Audit Log ({data.auditLogs.length})
                </h2>
                <div className="space-y-2 text-xs font-mono-tabular">
                  {data.auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3.5 rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] space-y-1"
                    >
                      <div className="flex items-center justify-between text-[#666A65]">
                        <span>
                          {log.action} · {log.actorEmail} ({log.actorRole})
                        </span>
                        <span>{log.createdAt}</span>
                      </div>
                      <p className="text-[#1A1B1A] font-sans">{log.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
