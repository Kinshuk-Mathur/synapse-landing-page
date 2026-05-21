import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Instagram, Mail } from "lucide-react";
import InterestCounter from "@/components/InterestCounter";

export const metadata: Metadata = {
  title: "Coming Soon - SYNAPSE",
  description: "SYNAPSE is preparing the main website experience."
};

export default function ComingSoonPage() {
  return (
    <main className="coming-page">
      <div className="site-noise" />
      <div className="ambient-field" />

      <header className="coming-nav">
        <Link className="nav-brand" href="/" aria-label="Back to SYNAPSE landing page">
          <Image
            src="/assets/synapse-wordmark-dark.jpeg"
            alt="SYNAPSE"
            width={206}
            height={80}
            priority
          />
        </Link>
        <Link className="coming-back-link" href="/">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </header>

      <section className="coming-hero">
        <div className="coming-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
          <Image
            src="/assets/synapse_icon_transparent.png"
            alt=""
            width={424}
            height={386}
            priority
          />
        </div>

        <div className="coming-copy">
          <span className="section-kicker">SYNAPSE</span>
          <h1>
            Coming Soon<span className="coming-dots" aria-hidden="true" />
          </h1>
          <p>
            The future of focused learning and student productivity is coming soon.
            For now, this page is holding
            the launch space while SYNAPSE gets ready.
          </p>
          <InterestCounter />
        </div>
      </section>

      <footer className="landing-footer" aria-label="SYNAPSE footer">
        <div className="footer-brand-block">
          <a className="footer-logo-lockup" href="/" aria-label="SYNAPSE home">
            <Image
              src="/assets/synapse-icon-transparent.png"
              alt=""
              width={58}
              height={48}
              className="footer-logo-mark"
            />
            <span>SYNAPSE</span>
          </a>
          <p>AI student operating system for focus, planning, goals, and intelligent learning.</p>
          <div className="footer-legal">
            <span>Copyright 2026</span>
            <a href="mailto:aisynapse08@gmail.com">Contact</a>
            <a href="/coming-soon">Launch</a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Follow Us</h3>
          <div className="footer-socials">
            <a
              href="https://www.instagram.com/synapse.27"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow SYNAPSE on Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
          <a className="footer-text-link" href="https://www.instagram.com/synapse.27" target="_blank" rel="noreferrer">
            @synapse.27
          </a>
        </div>

        <div className="footer-column">
          <h3>Support Us</h3>
          <a className="footer-text-link" href="mailto:aisynapse08@gmail.com">
            <Mail className="h-4 w-4" />
            aisynapse08@gmail.com
          </a>
        </div>

        <div className="footer-column footer-links-column">
          <h3>Resources & Links</h3>
          <div className="footer-links-grid">
            <a href="/#showcase">Product</a>
            <a href="/#features">Features</a>
            <a href="/#ai">SYNAPSE AI</a>
            <a href="/#experience">Experience</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
