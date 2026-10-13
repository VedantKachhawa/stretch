import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { heroImage, heroSlides } from "../data";
import { useInView } from "../hooks/useInView";
import { AnnouncementBar } from "./AnnouncementBar";
import { Navigation } from "./Navigation";

export function Hero() {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [isPlaying, active]);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return;
      if (isPlaying) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [isPlaying]);

  return (
    <section id="top" className="relative flex h-screen flex-col lg:flex-row">
      <AnnouncementBar />
      <Navigation />

      <div className="relative flex min-h-[60vh] w-full flex-col overflow-hidden bg-[#1a1a1a] lg:min-h-0 lg:w-1/2">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          ref={ref}
          className={`relative z-10 flex flex-1 flex-col justify-end p-6 text-white transition-all duration-1000 sm:p-10 lg:p-16 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="mb-6 text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl lg:text-[clamp(3.5rem,5vw,6rem)]">
            ethical beauty,
            <br />
            sustainable{" "}
            <span className="relative inline-block">
              impact.
              <svg
                className="absolute -bottom-1 left-0 h-4 w-full"
                viewBox="0 0 120 16"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 3 C10 3 10 6 20 6 C30 6 30 3 40 3 C50 3 50 6 60 6 C70 6 70 3 80 3 C90 3 90 6 100 6 C110 6 110 3 120 3"
                  stroke="#C8A45C"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M0 8 C10 8 10 11 20 11 C30 11 30 8 40 8 C50 8 50 11 60 11 C70 11 70 8 80 8 C90 8 90 11 100 11 C110 11 110 8 120 8"
                  stroke="#C8A45C"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M0 12 C10 12 10 15 20 15 C30 15 30 12 40 12 C50 12 50 15 60 15 C70 15 70 12 80 12 C90 12 90 15 100 15 C110 15 110 12 120 12"
                  stroke="#C8A45C"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
          </h1>
          <p className="mb-10 max-w-md text-sm text-white/80 md:text-base">
            Committed to sustainable beauty and minimize our impact on the planet.
          </p>
          <div>
            <a href="#bestsellers" className="btn-primary inline-block rounded-full bg-white px-10 py-4 text-sm text-black">
              about us
            </a>
          </div>
        </div>
      </div>

      <div className="relative min-h-[40vh] w-full overflow-hidden bg-[#1a1a1a] lg:min-h-0 lg:w-1/2">
        {heroSlides.map((src, index) => (
          <video
            key={src}
            ref={(node) => {
              videoRefs.current[index] = node;
              if (node) node.muted = true;
            }}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              index === active ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          />
        ))}

        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
          {heroSlides.map((src, index) => (
            <button
              key={src}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => setActive(index)}
              className={`h-2 w-2 rounded-full transition-transform ${
                index === active ? "scale-125 bg-white" : "bg-white/50"
              }`}
            />
          ))}
          <button
            type="button"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            onClick={() => setIsPlaying((value) => !value)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 text-white"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>
      </div>
    </section>
  );
}
