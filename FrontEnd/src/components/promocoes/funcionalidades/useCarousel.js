import { useState, useEffect, useRef, useCallback } from "react";

export function useCarousel(offers) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const trackRef = useRef(null);

  const getVisibleCount = useCallback(() => {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 1024) return 2;
    return 3;
  }, []);

  useEffect(() => {
    const update = () => {
      const newVisible = getVisibleCount();
      setVisibleCount(newVisible);
      setCurrentIndex((prev) =>
        Math.min(prev, Math.max(0, offers.length - newVisible))
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [offers.length, getVisibleCount]);

  const maxIndex = Math.max(0, offers.length - visibleCount);

  const nextSlide = useCallback(
    () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex)),
    [maxIndex]
  );

  const prevSlide = useCallback(
    () => setCurrentIndex((prev) => Math.max(prev - 1, 0)),
    []
  );

  useEffect(() => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.querySelector(".offer-card");
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 15;
    const offset = -currentIndex * (cardWidth + gap);
    trackRef.current.style.transform = `translateX(${offset}px)`;
  }, [currentIndex, visibleCount]);

  return {
    currentIndex,
    visibleCount,
    maxIndex,
    nextSlide,
    prevSlide,
    trackRef,
    setCurrentIndex,
  };
}