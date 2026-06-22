"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveSection(hash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    navItems.forEach((item) => {
      const id = item.href.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
    };
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || !menuRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        if (isOpen) {
          gsap.to(containerRef.current, {
            borderRadius: "2rem",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.set(menuRef.current, { display: "block" });
          gsap.to(menuRef.current, {
            height: "auto",
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        } else {
          gsap.to(containerRef.current, {
            borderRadius: "24px",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to(menuRef.current, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(menuRef.current, { display: "none" });
            },
          });
        }
      });

      mm.add("(min-width: 768px)", () => {
        gsap.set(containerRef.current, {
          clearProps: "borderRadius,paddingTop,paddingBottom",
        });
        gsap.set(menuRef.current, {
          clearProps: "all",
        });
      });

      return () => mm.revert();
    },
    { dependencies: [isOpen], scope: containerRef }
  );

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0, xPercent: -50 },
      { y: 0, opacity: 1, xPercent: -50, duration: 1.2, ease: "power4.out", delay: 0.2 }
    );
  });


  return (
    <header
      ref={headerRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 w-[88%] lg:w-[50%] max-w-5xl z-50 transition-all duration-300"
    >
      <div
        ref={containerRef}
        className="w-full bg-black/90 backdrop-blur-md border border-neutral-800 shadow-2xl shadow-black/40 rounded-3xl md:rounded-full px-6 py-3"
      >
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <Image src="/logo.png" alt="Agriplot Logo" width={24} height={24} />
            <span className="text-white tracking-tight text-md">
              Inovasi Agriplot
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveSection(item.href.replace("#", ""))}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-white bg-neutral-900"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900/40"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#dashboard"
              className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-white/50 bg-transparent text-white text-sm font-medium rounded-full transition-all duration-300 hover:bg-white/5 active:scale-95 whitespace-nowrap"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Dashboard
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 focus:outline-none transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div
          ref={menuRef}
          className="md:hidden overflow-hidden"
          style={{ height: 0, opacity: 0, display: "none" }}
        >
          <div className="pt-4 mt-4 border-t border-neutral-800/60 flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.href.replace("#", ""));
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2.5 text-base font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-white bg-neutral-900"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900/40"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
