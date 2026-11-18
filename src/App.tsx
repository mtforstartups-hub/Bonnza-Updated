import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { BonnzaProvider, useBonnza } from './context/BonnzaContext';
import { localizePath } from './utilities/locale';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { StickyMobileCta } from './components/StickyMobileCta';
import { ConsentBannerModal } from './components/ConsentBannerModal';
import { HomePage } from './pages/HomePage';
import { WebinarsDirectoryPage } from './pages/WebinarsDirectoryPage';
import { WebinarLandingPage } from './pages/WebinarLandingPage';
import { Dec5WebinarPage } from './pages/Dec5WebinarPage';
import { WebinarRegistrationPage } from './pages/WebinarRegistrationPage';
import { ProgrammeOverviewPage } from './pages/ProgrammeOverviewPage';
import { CoursesCatalogPage } from './pages/CoursesCatalogPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LearningPathPage } from './pages/LearningPathPage';
import { ChannelDetailPage } from './pages/ChannelDetailPage';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { BlogArticlePage } from './pages/BlogArticlePage';
import { ResourcesPage } from './pages/ResourcesPage';
import { BusinessIdeasPage } from './pages/BusinessIdeasPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminConsolePage } from './pages/admin/AdminConsolePage';
import { recordAnalyticsEvent } from './integrations/futureInterfaces';
import { trackRoutePageView } from './utilities/analyticsAndConsent';
import { useRouteSeo } from './hooks/useRouteSeo';

function ScrollAndAnalyticsWatcher() {
  const location = useLocation();
  const { locale } = useBonnza();
  useRouteSeo();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!location.pathname.startsWith('/admin')) {
      if (trackRoutePageView(location.pathname, locale)) {
        recordAnalyticsEvent({
          event: 'page_view',
          locale,
          path: location.pathname,
        });
      }
    }
  }, [location.pathname, locale]);

  return null;
}

function EditorialPreviewRedirect() {
  const { slug } = useParams<{ slug?: string }>();
  const { locale } = useBonnza();
  return <Navigate to={localizePath(slug ? `/blog/${slug}` : '/blog', locale)} replace />;
}

function LocaleRoutes() {
  return (
    <>
      <Route index element={<HomePage />} />
      <Route path="webinars" element={<WebinarsDirectoryPage />} />
      <Route path="webinars/5-december-2026" element={<Dec5WebinarPage />} />
      <Route path="webinars/2026-12-05" element={<Dec5WebinarPage />} />
      <Route path="webinars/first-online-business" element={<WebinarLandingPage />} />
      <Route path="webinars/session/:sessionId" element={<WebinarLandingPage />} />
      <Route path="webinars/register" element={<WebinarRegistrationPage mode="register" />} />
      <Route path="webinars/payment-status" element={<WebinarRegistrationPage mode="status" />} />
      <Route path="programme" element={<ProgrammeOverviewPage />} />
      <Route path="courses" element={<CoursesCatalogPage />} />
      <Route path="courses/:courseSlug" element={<CourseDetailPage />} />
      <Route path="learning-paths/:pathSlug" element={<LearningPathPage />} />
      <Route path="paths/:pathSlug" element={<LearningPathPage />} />
      <Route path="learn/:channelSlug" element={<ChannelDetailPage />} />
      <Route path="ecommerce-guides" element={<BlogIndexPage />} />
      <Route path="ecommerce-guides/cluster/:clusterSlug" element={<BlogIndexPage />} />
      <Route path="blog" element={<BlogIndexPage />} />
      <Route path="blog/cluster/:clusterSlug" element={<BlogIndexPage />} />
      <Route path="blog/:slug" element={<BlogArticlePage />} />
      <Route path="editorial-preview" element={<EditorialPreviewRedirect />} />
      <Route path="editorial-preview/:slug" element={<EditorialPreviewRedirect />} />
      <Route path="resources" element={<ResourcesPage />} />
      <Route path="business-ideas" element={<BusinessIdeasPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="faq" element={<FaqPage />} />
      <Route path="privacy" element={<LegalPage defaultSlug="privacy" />} />
      <Route path="terms" element={<LegalPage defaultSlug="terms" />} />
      <Route path="refund-policy" element={<LegalPage defaultSlug="refund-policy" />} />
      <Route path="legal/:policySlug" element={<LegalPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  );
}

function BonnzaAppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <>
        <ScrollAndAnalyticsWatcher />
        <Routes>
          <Route path="/admin" element={<Navigate to="/admin/overview" replace />} />
          <Route path="/admin/:section" element={<AdminConsolePage />} />
        </Routes>
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1A1B1A]">
      <ScrollAndAnalyticsWatcher />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Routes>
          {/* Root resolves directly to the English homepage */}
          <Route path="/" element={<HomePage />} />

          {/* Localized public route trees */}
          <Route path="/en">{LocaleRoutes()}</Route>
          <Route path="/hi">{LocaleRoutes()}</Route>

          {/* Convenience non-prefixed redirects to English default */}
          <Route path="/webinars/*" element={<Navigate to="/en/webinars" replace />} />
          <Route path="/programme" element={<Navigate to="/en/programme" replace />} />
          <Route path="/courses/*" element={<Navigate to="/en/courses" replace />} />
          <Route path="/learning-paths/resell" element={<Navigate to="/en/learning-paths/resell" replace />} />
          <Route
            path="/learning-paths/craft-to-commerce"
            element={<Navigate to="/en/learning-paths/craft-to-commerce" replace />}
          />
          <Route path="/resources" element={<Navigate to="/en/resources" replace />} />
          <Route path="/business-ideas" element={<BusinessIdeasPage />} />
          <Route path="/ecommerce-guides/*" element={<Navigate to="/en/ecommerce-guides" replace />} />
          <Route path="/blog/*" element={<Navigate to="/en/blog" replace />} />
          <Route path="/editorial-preview/*" element={<Navigate to="/en/blog" replace />} />
          <Route path="/about" element={<Navigate to="/en/about" replace />} />
          <Route path="/contact" element={<Navigate to="/en/contact" replace />} />
          <Route path="/faq" element={<Navigate to="/en/faq" replace />} />
          <Route path="/privacy" element={<Navigate to="/en/privacy" replace />} />
          <Route path="/terms" element={<Navigate to="/en/terms" replace />} />
          <Route path="/refund-policy" element={<Navigate to="/en/refund-policy" replace />} />

          {/* Custom 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
      <StickyMobileCta />
      <ConsentBannerModal />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <BonnzaProvider>
        <BonnzaAppShell />
      </BonnzaProvider>
    </BrowserRouter>
  );
}
