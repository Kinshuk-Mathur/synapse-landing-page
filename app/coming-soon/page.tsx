import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Instagram, Mail } from "lucide-react";

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
            src="/assets/synapse-icon-transparent.png"
            alt=""
            width={128}
            height={106}
            priority
          />
        </div>

        <div className="coming-copy">
          <span className="section-kicker">SYNAPSE</span>
          <h1>
            Coming Soon<span className="coming-dots" aria-hidden="true" />
          </h1>
          <p>
            We will add the main website link here in the future. For now, this page is holding
            the launch space while SYNAPSE gets ready.
          </p>
        </div>
      </section>

      <footer className="coming-footer">
        <a href="https://www.instagram.com/synapse.27" target="_blank" rel="noreferrer">
          <Instagram className="h-4 w-4" />
          @synapse.27
        </a>
        <a href="mailto:aisynapse08@gmail.com">
          <Mail className="h-4 w-4" />
          aisynapse08@gmail.com
        </a>
      </footer>
    </main>
  );
}
