import { createFileRoute } from "@tanstack/react-router";
import Hero from "../components/pages/home/hero";

export const Route = createFileRoute("/")({
  component: () => (
    <>
      <div className="dots"></div>
      <Hero />
    </>
  ),
});
