"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Typewriter from "@/components/ui/Typewriter";

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const { t } = useLanguage();

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      {/* Full-Screen Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Text Content - Split Left & Right - DESKTOP ONLY */}
      <div className="hidden md:flex relative z-20 h-full items-center justify-between px-16 lg:px-24">
        {/* Left Side Text */}
        <div className="max-w-md text-left pr-5">
          <h1 className="text-6xl lg:text-7xl font-display font-bold mb-6 text-white leading-tight">
            <Typewriter
              text="MANUEL"
              delay={500}
              speed={80}
              onComplete={() => setTimeout(() => setShowSubtitle(true), 100)}
            />
            <br />
            <Typewriter text="ECHAVARRIA" delay={1500} speed={80} />
            <br />
            <Typewriter
              text="ROMERO"
              delay={2500}
              speed={80}
              onComplete={() => setTimeout(() => setShowTagline(true), 300)}
            />
          </h1>

          {showSubtitle && (
            <p className="text-xl mb-6 text-white/90">
              <Typewriter text="Designer of Systems" delay={0} speed={60} />
            </p>
          )}
        </div>

        {/* Right Side Text */}
        <div className="max-w-md text-right pl-5">
          {showTagline && (
            <>
              <p className="text-2xl font-display mb-6 text-white leading-snug">
                <Typewriter
                  text={t.hero.tagline}
                  delay={0}
                  speed={30}
                  onComplete={() => setTimeout(() => setShowStats(true), 400)}
                />
              </p>
            </>
          )}

          {showStats && (
            <p className="text-lg mb-8 text-white/90 whitespace-pre-line">
              <Typewriter
                text={t.hero.stats}
                delay={0}
                speed={20}
                onComplete={() => setTimeout(() => setShowScroll(true), 500)}
              />
            </p>
          )}
        </div>
      </div>

      {/* Mobile Center Text */}
      <div className="md:hidden relative z-20 h-full flex flex-col items-center justify-center text-center px-6 bg-black/40">
        <h1 className="text-4xl font-display font-bold mb-4 text-white">
          <Typewriter
            text="MANUEL ECHAVARRIA ROMERO"
            delay={500}
            speed={60}
            onComplete={() => setTimeout(() => setShowTagline(true), 300)}
          />
        </h1>

        {showTagline && (
          <>
            <p className="text-base mb-6 text-white/90">
              <Typewriter
                text={t.hero.tagline}
                delay={0}
                speed={30}
                onComplete={() => setTimeout(() => setShowStats(true), 400)}
              />
            </p>
          </>
        )}

        {showStats && (
          <p className="text-sm text-white/80 whitespace-pre-line">
            <Typewriter
              text={t.hero.stats}
              delay={0}
              speed={20}
              onComplete={() => setTimeout(() => setShowScroll(true), 500)}
            />
          </p>
        )}
      </div>

      {/* Scroll Indicator */}
      {showScroll && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-fade-in-up">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2 animate-bounce">
            <div className="w-1 h-3 bg-white rounded-full" />
          </div>
        </div>
      )}
    </section>
  );
}
