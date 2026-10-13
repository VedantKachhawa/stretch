import { categories } from "../data";
import { useInView } from "../hooks/useInView";

export function Categories() {
  const { ref, isVisible } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`grid grid-cols-1 bg-black text-white transition-all duration-1000 md:grid-cols-3 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      {categories.map((category) => (
        <article
          key={category.name}
          className="group relative flex min-h-[400px] flex-col overflow-hidden p-6 sm:min-h-[500px] sm:p-8 md:min-h-[750px] md:p-12"
        >
          <video
            src={category.video}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />
          <div className="relative z-10 flex flex-1 flex-col justify-between">
            <div className="transition-transform duration-300 group-hover:-translate-y-0.5">
              <h2
                className="text-5xl font-medium sm:text-6xl md:text-7xl lg:text-8xl"
                style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
              >
                {category.name}
              </h2>
            </div>
            <div>
              <button
                type="button"
                className="btn-primary rounded-full bg-white px-8 py-3 text-sm text-black"
              >
                shop {category.name}
              </button>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
