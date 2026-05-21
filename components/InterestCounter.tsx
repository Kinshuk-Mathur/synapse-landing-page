"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";

const BASE_INTEREST = 1000;
const COUNT_KEY = "synapse_interest_count";
const VOTED_KEY = "synapse_interest_voted";

function playSuccessSfx() {
  const AudioContextClass =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const context = new AudioContextClass();
  const master = context.createGain();
  master.gain.setValueAtTime(0.0001, context.currentTime);
  master.gain.exponentialRampToValueAtTime(0.18, context.currentTime + 0.015);
  master.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.58);
  master.connect(context.destination);

  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = context.currentTime + index * 0.075;
    const end = start + 0.16;

    oscillator.type = index === notes.length - 1 ? "sine" : "triangle";
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.025, end);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.38, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, end);

    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(start);
    oscillator.stop(end + 0.02);
  });

  window.setTimeout(() => {
    void context.close();
  }, 850);
}

function formatCount(count: number) {
  return new Intl.NumberFormat("en-US").format(count);
}

export default function InterestCounter() {
  const [count, setCount] = useState(BASE_INTEREST);
  const [hasVoted, setHasVoted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedCount = Number(window.localStorage.getItem(COUNT_KEY));
    const savedVote = window.localStorage.getItem(VOTED_KEY) === "true";

    setCount(Number.isFinite(savedCount) && savedCount >= BASE_INTEREST ? savedCount : BASE_INTEREST);
    setHasVoted(savedVote);
    setIsReady(true);
  }, []);

  const handleInterest = () => {
    if (hasVoted) return;

    const nextCount = count + 1;
    setCount(nextCount);
    setHasVoted(true);
    window.localStorage.setItem(COUNT_KEY, String(nextCount));
    window.localStorage.setItem(VOTED_KEY, "true");
    playSuccessSfx();

    if ("vibrate" in navigator) {
      navigator.vibrate?.(35);
    }
  };

  return (
    <div className="interest-card" aria-live="polite">
      <p className="interest-count">
        <strong>{formatCount(count)}</strong> students are already interested in SYNAPSE.
      </p>
      {!hasVoted ? (
        <button
          className="interest-button"
          type="button"
          onClick={handleInterest}
          disabled={!isReady}
        >
          <Sparkles className="h-4 w-4" />
          I&apos;m interested
        </button>
      ) : (
        <div className="interest-success" role="status">
          <CheckCircle2 className="h-5 w-5" />
          <strong>Stay tuned.</strong>
        </div>
      )}
    </div>
  );
}
