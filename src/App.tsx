import { BestSellers } from "./components/BestSellers";
import { Categories } from "./components/Categories";
import { Hero } from "./components/Hero";

export default function App() {
  return (
    <main className="bg-black font-sans text-white antialiased">
      <Hero />
      <BestSellers />
      <Categories />
    </main>
  );
}
