import { useEffect, useRef, useState } from "react";
import { products } from "../data";
import { useInView } from "../hooks/useInView";

const tabs = ["best sellers", "sets"] as const;
type Tab = (typeof tabs)[number];

export function BestSellers() {
  const { ref, isVisible } = useInView<HTMLElement>();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>("best sellers");
  const [scrollProgress, setScrollProgress] = useState(0);

  const visibleProducts =
    activeTab === "sets" ? products.filter((product) => product.isSet) : products;

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const updateProgress = () => {
      const max = el.scrollWidth - el.clientWidth;
      setScrollProgress(max <= 0 ? 0 : el.scrollLeft / max);
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      el.scrollLeft += event.deltaY;
    };

    updateProgress();
    el.addEventListener("scroll", updateProgress, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", updateProgress);

    return () => {
      el.removeEventListener("scroll", updateProgress);
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", updateProgress);
    };
  }, [activeTab]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    setScrollProgress(0);
  }, [activeTab]);

  return (
    <section id="bestsellers" ref={ref} className="bg-[#F9F4F0] px-4 py-12 text-black sm:px-6 sm:py-16 lg:px-10">
      <div
        className={`mb-8 flex flex-wrap items-center gap-6 transition-all duration-[800ms] sm:mb-12 sm:gap-10 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        {tabs.map((tab) => {
          const active = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-3 text-2xl font-medium sm:text-4xl md:text-5xl ${
                active ? "text-[#1a1a1a]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
              {active && (
                <span className="inline-block h-5 w-5 animate-scale-in rounded-full bg-[#1a1a1a] sm:h-6 sm:w-6" />
              )}
            </button>
          );
        })}
      </div>

      <div ref={scrollerRef} className="scrollbar-hide flex overflow-x-auto">
        {visibleProducts.map((product, index) => (
          <article
            key={product.name}
            className={`group w-[260px] shrink-0 border border-gray-200 first:ml-0 -ml-[1px] sm:w-[280px] md:w-[300px] lg:w-[calc(25%-1px)] ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-[8px] opacity-0"
            } transition-all duration-500`}
            style={{ transitionDelay: `${200 + index * 80}ms` }}
          >
            <div className="flex h-12 flex-col justify-center px-4">
              <p className="text-xs font-medium uppercase tracking-wider">{product.category}</p>
              {product.subcategory && (
                <p className="mt-0.5 text-xs uppercase text-gray-500">{product.subcategory}</p>
              )}
            </div>
            <div className="mx-4 aspect-[3/4] overflow-hidden rounded-lg bg-[#F9F4F0]">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="px-4 py-5 text-center">
              <p className="text-sm">{product.name}</p>
              <p className="mt-1 flex items-center justify-center gap-2 text-sm">
                <span>{product.price}</span>
                {product.oldPrice && (
                  <span className="text-gray-400 line-through">{product.oldPrice}</span>
                )}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-[280px] sm:mt-10">
        <div className="h-[2px] rounded-full bg-gray-300">
          <div
            className="h-full rounded-full bg-[#1a1a1a]"
            style={{
              width: "30%",
              transform: `translateX(${scrollProgress * ((1 - 0.3) / 0.3) * 100}%)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
