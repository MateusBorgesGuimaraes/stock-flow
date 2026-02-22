import { createFileRoute } from "@tanstack/react-router";
import Hero from "../components/pages/home/hero";
import Features from "../components/pages/home/features";
import Pricing from "../components/pages/home/pricing";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

export const Route = createFileRoute("/")({
  component: () => (
    <>
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </>
  ),
});
