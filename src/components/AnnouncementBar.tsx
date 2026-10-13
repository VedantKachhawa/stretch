import { ChevronLeft, ChevronRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-30 bg-[#F9F4F0] py-2.5 text-black md:py-3">
      <div className="flex items-center justify-center gap-3 px-4 text-sm">
        <ChevronLeft size={16} aria-hidden="true" />
        <p className="text-center">free shipping for orders over 50€</p>
        <ChevronRight size={16} aria-hidden="true" />
      </div>
    </div>
  );
}
