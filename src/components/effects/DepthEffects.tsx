"use client";

import { useEffect } from "react";

/**
 * Adds depth to the sections below the hero without touching their markup:
 * - cards rise into place with a slight 3D rotation the first time they scroll into view
 * - cards tilt toward the cursor on devices with a mouse
 * Both are skipped under prefers-reduced-motion. Styles live in globals.css ([data-depth]).
 */
const CARD_SELECTOR = "main .slide-section:not(#hero) .rounded-2xl.bg-white";
const MAX_TILT = 5;

export default function DepthEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = Array.from(document.querySelectorAll<HTMLElement>(CARD_SELECTOR));
    if (!cards.length) return;

    const viewportH = window.innerHeight;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.depth = "in";
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    const perParent = new Map<Element | null, number>();
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      if (rect.top < viewportH && rect.bottom > 0) {
        card.dataset.depth = "in";
        continue;
      }
      const index = perParent.get(card.parentElement) ?? 0;
      perParent.set(card.parentElement, index + 1);
      card.style.setProperty("--depth-delay", `${Math.min(index, 5) * 70}ms`);
      card.dataset.depth = "out";
      io.observe(card);
    }

    const cleanups: (() => void)[] = [];
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      for (const card of cards) {
        const onMove = (e: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          // Wide cards get a smaller angle so their edges do not swing far.
          const scale = Math.min(1, 420 / rect.width);
          card.style.setProperty("--tilt-x", `${(-y * MAX_TILT * scale).toFixed(2)}deg`);
          card.style.setProperty("--tilt-y", `${(x * MAX_TILT * scale).toFixed(2)}deg`);
          card.dataset.tilting = "true";
        };
        const onLeave = () => {
          card.style.setProperty("--tilt-x", "0deg");
          card.style.setProperty("--tilt-y", "0deg");
          delete card.dataset.tilting;
        };
        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        });
      }
    }

    return () => {
      io.disconnect();
      cleanups.forEach((fn) => fn());
      for (const card of cards) {
        delete card.dataset.depth;
        delete card.dataset.tilting;
      }
    };
  }, []);

  return null;
}
