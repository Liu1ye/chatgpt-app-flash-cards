"use client";

import dynamic from "next/dynamic";
const FlashCardsPage = dynamic(() => import("./FlashCards/page"), {
  ssr: false,
});

export default function Home() {
  return (
      <FlashCardsPage />
  );
}