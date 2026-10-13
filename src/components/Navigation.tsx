import { useEffect, useState } from "react";
import { ChevronDown, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { navLinks } from "../data";

export function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`absolute inset-x-0 top-[38px] px-4 sm:px-6 lg:px-10 md:top-[42px] ${open ? "z-50" : "z-30"}`}
      >
        <div className="relative flex items-center justify-between text-white">
          <a href="#top" className="text-lg font-bold uppercase tracking-[0.2em] sm:text-xl">
            STRETCH
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="group relative text-sm">
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center">
            <div className="hidden items-center gap-2 md:flex">
              <span className="flex h-4 w-6 overflow-hidden" aria-hidden="true">
                <span className="flex-1 bg-blue-700" />
                <span className="flex-1 bg-white" />
                <span className="flex-1 bg-red-600" />
              </span>
              <span className="text-sm">eur €</span>
              <ChevronDown size={16} aria-hidden="true" />
            </div>

            <span className="mx-2 hidden h-5 w-px bg-white/30 md:block" />

            <button type="button" aria-label="Account" className="hidden p-2 sm:inline-flex">
              <User size={20} />
            </button>
            <button type="button" aria-label="Search" className="p-2">
              <Search size={20} />
            </button>
            <button type="button" aria-label="Bag" className="p-2">
              <ShoppingBag size={20} />
            </button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="p-2 md:hidden"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-3xl font-light text-white"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
