import React from "react";
import { Card, Container, Section } from "./UI";
import { HiLink, HiChartBar, HiShieldCheck, HiLightningBolt, HiUsers, HiGlobe } from "react-icons/hi";

const AboutPage = () => {
  const features = [
    {
      icon: HiLink,
      title: "Simple URL Shortening",
      description: "Create short, memorable URLs with just a few clicks. No complications, just efficiency.",
    },
    {
      icon: HiChartBar,
      title: "Powerful Analytics",
      description: "Track clicks, location, device type, and traffic sources. Get insights that matter.",
    },
    {
      icon: HiShieldCheck,
      title: "Enhanced Security",
      description: "Your links and data are protected with industry-standard encryption and security.",
    },
    {
      icon: HiLightningBolt,
      title: "Fast & Reliable",
      description: "Lightning-fast redirects with 99.9% uptime guaranteed. Always available.",
    },
    {
      icon: HiUsers,
      title: "Team Collaboration",
      description: "Share and manage links with your team. Perfect for marketing, sales, and support.",
    },
    {
      icon: HiGlobe,
      title: "Global Reach",
      description: "CDN-powered delivery ensures fast links worldwide. Optimized for every region.",
    },
  ];

  const values = [
    {
      title: "Simplicity",
      description: "We believe great tools should be easy to use. No learning curve, just results.",
    },
    {
      title: "Privacy",
      description: "Your data is yours. We never sell or share your information with third parties.",
    },
    {
      title: "Performance",
      description: "Speed matters. Our infrastructure is optimized for instant redirects globally.",
    },
    {
      title: "Innovation",
      description: "We're constantly improving. New features and improvements ship regularly.",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-64px)] bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <Section className="py-20 md:py-28 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <Container className="text-center space-y-6 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            About Linklytics
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            We're building the most intuitive URL shortening platform with powerful analytics and security built in. Making links work better for everyone.
          </p>
        </Container>
      </Section>

      {/* Mission Section */}
      <Section
        title="Our Mission"
        subtitle="Making link management simple and powerful"
        className="bg-gray-50 dark:bg-gray-800"
      >
        <Container>
          <Card className="text-center max-w-2xl mx-auto space-y-4">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              At Linklytics, we believe that sharing links should be simple. Too many URL shorteners are either feature-rich but complex, or simple but limited. We're here to prove you don't have to choose.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our platform combines the ease of use you expect with the powerful analytics and security features you need. Whether you're a marketer tracking campaigns, a business owner sharing content, or just someone who wants cleaner links, Linklytics is for you.
            </p>
          </Card>
        </Container>
      </Section>

      {/* Features Section */}
      <Section title="Why Choose Linklytics" subtitle="Powerful features designed for your needs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="space-y-3">
                <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Values Section */}
      <Section className="bg-gray-50 dark:bg-gray-800">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team Section */}
      <Section title="Built by creators, for creators">
        <Container className="text-center">
          <Card className="space-y-4 max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Linklytics was founded by a team of developers and marketers who were frustrated with existing URL shortening solutions. We decided to build something better.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Today, we're trusted by thousands of users worldwide, from individual creators to enterprise teams.
            </p>
          </Card>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Container className="text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            Have questions?
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out to us at any time.
          </p>
          <a
            href="mailto:contact@linklytics.com"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </a>
        </Container>
      </Section>
    </main>
  );
};

export default AboutPage;
