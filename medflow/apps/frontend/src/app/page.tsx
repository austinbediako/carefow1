import React from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { NewsSection } from "@/components/NewsSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="grow">
        <Hero />
        <Services />
        <NewsSection />
      </main>

      <Footer />
    </div>
  );
}
