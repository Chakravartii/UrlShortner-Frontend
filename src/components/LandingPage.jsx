import React, { useEffect, useState, useCallback } from "react";
import Card from "./Card";
import { useStoreContext } from "../contextApi/ContextApi";
const THEME_KEY = "theme";

export const LandingPage = () => {
  const{token} = useStoreContext();
  console.log("Token in Landing :"+token);

  const [isDark, setIsDark] = useState(() => {
    try {
      if (typeof window === "undefined") return false;
      const saved = window.localStorage.getItem(THEME_KEY);
      if (saved) return saved === "dark";
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  const applyDark = useCallback((enabled) => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", !!enabled);
  }, []);

  // initialize and listen to system theme changes (only if user hasn't chosen explicitly)
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      const saved = window.localStorage.getItem(THEME_KEY);
      if (saved === "dark" || saved === "light") {
        const enabled = saved === "dark";
        setIsDark(enabled);
        applyDark(enabled);
      } else {
        const prefers = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDark(prefers);
        applyDark(prefers);
      }

      const mq = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = (e) => {
        if (!window.localStorage.getItem(THEME_KEY)) {
          setIsDark(e.matches);
          applyDark(e.matches);
        }
      };
      if (mq?.addEventListener) mq.addEventListener("change", onChange);
      else if (mq?.addListener) mq.addListener(onChange);

      return () => {
        if (mq?.removeEventListener) mq.removeEventListener("change", onChange);
        else if (mq?.removeListener) mq.removeListener(onChange);
      };
    } catch {
      applyDark(false);
    }
  }, [applyDark]);

  // persist whenever user toggles
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      applyDark(isDark);
      window.localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, [isDark, applyDark]);

  const toggleTheme = () => setIsDark((s) => !s);

  const landingDescription = `Stop sending long URLs. Start sharing experiences.\nCreate clean, branded, trackable links that boost engagement across social media, emails, campaigns, and QR codes. With built-in analytics and security, you stay in control of every link you share.`;

  const features = [
    { title: "Custom domains", desc: "Use your brand domain for links." },
    { title: "UTM Tracking", desc: "Analytics with UTM tagging." },
    { title: "Password & Expiry", desc: "Control access easily." },
    { title: "QR Codes", desc: "Instant QR for every link." },
  ];

  return (
    <main className="min-h-screen font-inter bg-white dark:bg-dm-surface text-dark dark:text-dm-muted transition-colors duration-300">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-2 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Short links. <span className="text-primary dark:text-dm-glow">Bigger impact.</span>
          </h1>

          <p className="text-gray-600 dark:text-dm-muted leading-relaxed whitespace-pre-line">
            {landingDescription}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-deep focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Get started
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-gray-200 dark:border-gray-700"
            >
              Learn more
            </a>
          </div>
        </div>

        {/* Analytics Preview */}
        <aside className="order-first md:order-last" aria-labelledby="analytics-heading">
          <div className="rounded-card p-6 shadow-glass bg-glass-white dark:bg-glass-dark border border-gray-100 dark:border-gray-800">
            <div className="flex items-start justify-between">
              <div>
                <h3 id="analytics-heading" className="text-lg font-semibold">Campaign analytics</h3>
                <p className="text-sm text-gray-500 dark:text-dm-muted">Real-time clicks, geo, and referrers</p>
              </div>
              <div className="text-sm text-gray-500 dark:text-dm-muted">Last 7 days</div>
            </div>

            <div className="mt-4" role="img" aria-label="Bar chart showing last 7 days clicks">
              <div className="flex items-end gap-2 h-28">
                {[8, 14, 10, 22, 18, 26, 16].map((v, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-md ${i === 3 ? "bg-primary dark:bg-dm-glow" : "bg-gray-200 dark:bg-gray-700"}`}
                    style={{ height: `${v * 3}px` }}
                    aria-hidden
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 mt-20">
        <h2 className="text-2xl font-bold">Features built for growth</h2>
        <p className="mt-2 text-gray-600 dark:text-dm-muted">Everything you need to shorten, brand and track URLs — without complexity.</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <Card key={i} title={f.title} desc={f.desc} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 mt-20 mb-16">
        <div className="rounded-card p-8 bg-premium-blue text-white shadow-deep">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-extrabold">Ready to grow your clicks?</h3>
              <p className="mt-2 opacity-90">Create your free account and start shortening links.</p>
            </div>
            <a href="#" className="mt-6 md:mt-0 inline-block px-6 py-3 rounded-xl bg-white text-primary font-semibold">
              Start free
            </a>
          </div>
        </div>
      </section>

    </main>
  );
};

export default LandingPage;
