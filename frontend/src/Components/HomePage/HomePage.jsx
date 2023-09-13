import React from "react";
import InteractionSection from "../InteractionSection/InteractionSection";
import HeadLine from "../HeadlineSection/HeadLine";
import Header from "../Header/Header";

export default function HomePage() {
  return (
    <div>
      <Header />
      <HeadLine />
      <InteractionSection />
    </div>
  );
}
