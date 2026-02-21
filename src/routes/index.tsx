import { createFileRoute } from "@tanstack/react-router";
import Hero from "../components/pages/home/hero";
import Features from "../components/pages/home/features";
import Pricing from "../components/pages/home/pricing";

export const Route = createFileRoute("/")({
  component: () => (
    <>
      <Hero />
      <Features />
      <Pricing />
    </>
  ),
});
