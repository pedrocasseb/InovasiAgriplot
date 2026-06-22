"use client";

import { Key } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 1,
    src: "/card1.png",
    alt: "Key Feature 1",
    aspect: "aspect-[444/576]",
  },
  {
    id: 2,
    src: "/card2.png",
    alt: "Key Feature 2",
    aspect: "aspect-[452/578]",
  },
  {
    id: 3,
    src: "/card3.png",
    alt: "Key Feature 3",
    aspect: "aspect-[448/580]",
  },
  {
    id: 4,
    src: "/card4.png",
    alt: "Key Feature 4",
    aspect: "aspect-[424/610]",
  },
];

export default function KeyFeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        ".feat-badge",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      );

      tl.fromTo(
        ".feat-title",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        "-=0.8"
      );

      tl.fromTo(
        ".feat-desc",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        "-=1.0"
      );

      tl.fromTo(
        ".feat-card",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.12 },
        "-=0.8"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="features"
      ref={sectionRef}
      className="w-full h-screen bg-[#081904] py-8 sm:py-12 md:py-16 flex flex-col text-left overflow-hidden"
    >
      {/* Header Container */}
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 md:px-24 lg:px-32 flex flex-col gap-4 md:gap-6 mb-6 md:mb-10 shrink-0">
        {/* Badge */}
        <div className="feat-badge flex items-center gap-2 border border-emerald-500/20 bg-emerald-950/30 px-3.5 py-1.5 rounded-full text-emerald-300 w-fit backdrop-blur-sm">
          <Key size={14} className="text-emerald-400" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
            Key Features
          </span>
        </div>

        {/* Header Content: Title and Description side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          <h1 className="feat-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[450] tracking-tight leading-[1.15] text-white lg:col-span-8">
            Building Sustainable Supply Chains for a Greener Future
          </h1>
          <p className="feat-desc text-emerald-100/70 text-sm sm:text-base md:text-lg leading-relaxed lg:col-span-4 lg:pt-3">
            EUDR requires strict supply chain transparency, deforestation-free
            sourcing, and detailed due diligence, posing compliance and
            traceability challenges for businesses.
          </p>
        </div>
      </div>

      {/* Cards Static Container (takes 100% of remaining vertical height, no scroll, no clipping at the bottom) */}
      <div className="w-full flex-1 min-h-0 overflow-hidden flex gap-6 pb-8 pt-2 pl-6 sm:pl-12 md:pl-24 lg:pl-32 xl:pl-[calc((100vw-1280px)/2+8rem)] pr-6 sm:pr-12 md:pr-24 lg:pr-32 xl:pr-[calc((100vw-1280px)/2+8rem)]">
        {cards.map((card) => (
          <div
            key={card.id}
            className="feat-card shrink-0 h-full w-auto aspect-auto rounded-3xl overflow-hidden border border-emerald-500/10 shadow-lg shadow-black/20 relative"
            style={{ aspectRatio: card.aspect.replace("aspect-[", "").replace("]", "") }}
          >
            <div className={`h-full ${card.aspect} relative`}>
              <Image
                src={card.src}
                alt={card.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 30vw, 25vw"
                priority={card.id <= 2}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
