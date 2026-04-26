import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Container, Section, EmptyState } from "./UI";
import { HiArrowRight, HiChartBar, HiShieldCheck, HiQrCode, HiTag } from "react-icons/hi2";

const LandingPage = () => {
  const [isDark, setIsDark] = useState(() => {
    try {
      if (typeof window === "undefined") return false;
      const saved = window.localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia?.("(prefers-color-scheme: dark)").matches || false;
    } catch {
      return false;
    }
  });

  const applyDark = useCallback((enabled) => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", !!enabled);
  }, []);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const saved = window.localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") {
        const enabled = saved === "dark";
        setIsDark(enabled);
        applyDark(enabled);
      } else {
        const prefers = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
        setIsDark(prefers);
        applyDark(prefers);
      }

      const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
      const onChange = (e) => {
        if (!window.localStorage.getItem("theme")) {
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

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      applyDark(isDark);
      window.localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, [isDark, applyDark]);

  const toggleTheme = () => setIsDark((s) => !s);

  const features = [
    {
      icon: HiTag,
      title: "Custom Domains",
      description: "Use your brand domain for links and maintain your identity across all shares.",
    },
    {
      icon: HiChartBar,
      title: "Advanced Analytics",
      description: "Track clicks, geography, referrers, and devices in real-time with detailed insights.",
    },
    {
      icon: HiShieldCheck,
      title: "Security & Controls",
      description: "Password protect links, set expiry dates, and control access with precision.",
    },
    {
      icon: HiQrCode,
      title: "QR Code Generation",
      description: "Instantly generate QR codes for every link you create and share.",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* Hero Section */}
      <Section className="pt-20 md:pt-32 pb-16 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-10 pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-10 pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Short links.{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    Bigger impact.
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  Stop sending long URLs. Create clean, branded, trackable links that boost engagement across social media, emails, and campaigns.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Get Started Free <HiArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">10K+</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">1M+</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Links Created</p>
                </div>
              </div>
            </div>

            {/* Right: Visual Preview */}
            <div className="hidden md:flex items-center justify-center">
              <Card className="w-full aspect-square bg-gradient-to-br from-blue-500/5 to-blue-600/5 border-blue-200 dark:border-blue-800 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-5xl">🔗</div>
                  <h3 className="text-lg font-semibold">Your Links, Optimized</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Shorten, track, and analyze every click
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section id="features" title="Powerful Features" subtitle="Everything you need to shorten, brand, and track URLs" className="bg-gray-50 dark:bg-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center hover:scale-105 hover:shadow-lg">
                <Icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <Container className="text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to grow your clicks?
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Join thousands of creators and businesses using Linklytics to track and optimize their links.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto">
                Start Free Today
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                Explore Features
              </Button>
            </a>
          </div>
        </Container>
      </Section>
    </main>
  );
};

export default LandingPage;
