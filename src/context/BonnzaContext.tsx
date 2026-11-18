import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Locale, WebinarSessionId, ArticleRecord } from '../domain/types';
import type { FeatureFlagRecord, PageContentBlock } from '../db/schema';
import { getLocaleFromPath, localizePath } from '../utilities/locale';
import { getPromotedWebinarGroup, WEBINAR_SESSIONS } from '../content/webinars';
import { ARTICLES } from '../content/articles';
import { recordAnalyticsEvent } from '../integrations/futureInterfaces';

const DISPLAY_LANG_STORAGE_KEY = 'bonnza_display_locale_v1';
const WEBINAR_SESSION_STORAGE_KEY = 'bonnza_selected_webinar_session_v1';

interface ContactDraftState {
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
}

interface PublicGateStatus {
  g1CompletedCount: number;
  g1TotalCount: number;
  g1Ready: boolean;
}

interface BonnzaContextValue {
  locale: Locale;
  switchLocale: (nextLocale: Locale) => void;
  selectedSessionId: WebinarSessionId;
  selectWebinarSession: (sessionId: WebinarSessionId) => void;
  contactDraft: ContactDraftState;
  setContactDraft: React.Dispatch<React.SetStateAction<ContactDraftState>>;
  featureFlags: FeatureFlagRecord[];
  pageBlocks: PageContentBlock[];
  liveArticles: ArticleRecord[];
  gateStatus: PublicGateStatus;
  refreshPublicBootstrap: () => Promise<void>;
}

const BonnzaContext = createContext<BonnzaContextValue | undefined>(undefined);

function readInitialSession(): WebinarSessionId {
  const promoted = getPromotedWebinarGroup();
  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem(WEBINAR_SESSION_STORAGE_KEY);
    if (saved) {
      const matched = WEBINAR_SESSIONS.find((s) => s.id === saved);
      if (matched && new Date(matched.endUtc).getTime() > Date.now()) {
        return matched.id;
      }
    }
  }
  return promoted.enSession.id;
}

export function BonnzaProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const routeLocale: Locale = getLocaleFromPath(location.pathname);

  const [selectedSessionId, setSelectedSessionId] = useState<WebinarSessionId>(readInitialSession);

  const [contactDraft, setContactDraft] = useState<ContactDraftState>({
    name: '',
    email: '',
    phone: '',
    category: 'workshop',
    message: '',
  });

  const [featureFlags, setFeatureFlags] = useState<FeatureFlagRecord[]>([]);
  const [pageBlocks, setPageBlocks] = useState<PageContentBlock[]>([]);
  const [liveArticles, setLiveArticles] = useState<ArticleRecord[]>(ARTICLES);
  const [gateStatus, setGateStatus] = useState<PublicGateStatus>({
    g1CompletedCount: 11,
    g1TotalCount: 17,
    g1Ready: false,
  });

  const refreshPublicBootstrap = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/public/bootstrap');
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.featureFlags)) setFeatureFlags(data.featureFlags);
      if (Array.isArray(data.pageBlocks)) setPageBlocks(data.pageBlocks);
      if (Array.isArray(data.articles) && data.articles.length > 0) {
        setLiveArticles(data.articles);
      }
      if (data.gateStatus) setGateStatus(data.gateStatus);
    } catch {
      // Fallback to static seed if offline
    }
  }, []);

  useEffect(() => {
    refreshPublicBootstrap();
  }, [refreshPublicBootstrap]);

  useEffect(() => {
    document.documentElement.lang = routeLocale;
    if (
      typeof window !== 'undefined' &&
      (location.pathname.startsWith('/en') || location.pathname.startsWith('/hi'))
    ) {
      window.localStorage.setItem(DISPLAY_LANG_STORAGE_KEY, routeLocale);
    }
  }, [routeLocale, location.pathname]);

  const switchLocale = (nextLocale: Locale) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(DISPLAY_LANG_STORAGE_KEY, nextLocale);
    }
    const targetPath = localizePath(location.pathname, nextLocale) + location.search;
    navigate(targetPath);
  };

  const selectWebinarSession = (sessionId: WebinarSessionId) => {
    const exists = WEBINAR_SESSIONS.some((s) => s.id === sessionId);
    if (!exists) return;
    setSelectedSessionId(sessionId);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(WEBINAR_SESSION_STORAGE_KEY, sessionId);
    }
    recordAnalyticsEvent({
      event: 'session_selected',
      locale: routeLocale,
      path: location.pathname,
      metadata: { sessionId },
    });
  };

  return (
    <BonnzaContext.Provider
      value={{
        locale: routeLocale,
        switchLocale,
        selectedSessionId,
        selectWebinarSession,
        contactDraft,
        setContactDraft,
        featureFlags,
        pageBlocks,
        liveArticles,
        gateStatus,
        refreshPublicBootstrap,
      }}
    >
      {children}
    </BonnzaContext.Provider>
  );
}

export function useBonnza(): BonnzaContextValue {
  const ctx = useContext(BonnzaContext);
  if (!ctx) {
    throw new Error('useBonnza must be used inside BonnzaProvider');
  }
  return ctx;
}
