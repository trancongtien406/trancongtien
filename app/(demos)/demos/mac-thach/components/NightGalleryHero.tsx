"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowDown, ArrowLeft, Check, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import styles from "../brand.module.css";
import { FRAGRANCES, formatVnd, type Fragrance } from "../data";

type Props = {
  activeId: string | null;
  onSelect: (id: string | null) => void;
  onAddToCart: (fragrance: Fragrance, ml: 50 | 100) => void;
};

export function NightGalleryHero({ activeId, onSelect, onAddToCart }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [displayedId, setDisplayedId] = useState<string | null>(null);
  const [phase, setPhase] = useState<"idle" | "entering" | "detail" | "exiting">("idle");
  const [selectedMl, setSelectedMl] = useState<50 | 100>(100);
  const [justAdded, setJustAdded] = useState(false);

  const stageRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const heroFooterRef = useRef<HTMLDivElement | null>(null);
  const hudRef = useRef<HTMLDivElement | null>(null);
  const infoPanelRef = useRef<HTMLDivElement | null>(null);
  const nicheRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const captionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const activeTlRef = useRef<gsap.core.Timeline | null>(null);
  const currentIdRef = useRef<string | null>(null);
  const wasOpenRef = useRef<boolean>(false);

  const displayedFragrance = displayedId
    ? FRAGRANCES.find((f) => f.id === displayedId) ?? null
    : null;

  const ambientFragrance =
    displayedFragrance ??
    (hoveredId ? FRAGRANCES.find((f) => f.id === hoveredId) : null) ??
    FRAGRANCES[4];

  /**
   * Computes exact camera pan (tx, ty) and zoom (scale) on `.nicheTrack`
   * so the zoomed bottle ALWAYS sits completely clear of the text column
   * (right of the left column on desktop; upper half above the info on mobile).
   */
  const computeCameraTarget = useCallback((id: string) => {
    const stageEl = stageRef.current;
    const trackEl = trackRef.current;
    const cardEl = nicheRefs.current[id];
    const alcoveEl = cardEl?.querySelector("[data-alcove]") as HTMLElement | null;

    if (!stageEl || !trackEl || !cardEl || !alcoveEl) {
      return { x: 0, y: 0, scale: 1 };
    }

    const stageW = stageEl.clientWidth;
    const stageH = stageEl.clientHeight;
    const isDesktop = stageW >= 960;

    const trackW = trackEl.offsetWidth;
    const trackH = trackEl.offsetHeight;
    const alcoveCx = cardEl.offsetLeft + alcoveEl.offsetLeft + alcoveEl.offsetWidth / 2;
    const alcoveCy = cardEl.offsetTop + alcoveEl.offsetTop + alcoveEl.offsetHeight / 2;
    const alcoveH = alcoveEl.offsetHeight;
    const alcoveW = alcoveEl.offsetWidth;

    const trackCenterX = trackEl.offsetLeft + trackW / 2;
    const trackCenterY = trackEl.offsetTop + trackH / 2;

    if (isDesktop) {
      // Reserve left single column (padding + max 340px width + 48px gutter)
      const padX = Math.min(Math.max(stageW * 0.045, 28), 64);
      const colW = Math.min(340, stageW * 0.3);
      const safeLeft = padX + colW + 44;
      const safeRight = stageW - padX;
      const availW = Math.max(260, safeRight - safeLeft);

      const desiredH = Math.min(stageH * 0.72, 600);
      const maxWScale = (availW * 0.78) / alcoveW;
      const scale = Math.min(Math.max(desiredH / alcoveH, 1.16), maxWScale, 1.75);

      const targetX = safeLeft + availW / 2;
      const targetY = stageH * 0.53;

      const x = targetX - trackCenterX - (alcoveCx - trackW / 2) * scale;
      const y = targetY - trackCenterY - (alcoveCy - trackH / 2) * scale;
      return { x, y, scale };
    } else {
      // Mobile: bottle sits cleanly in upper 44% (below header, above bottom text block)
      const topZoneStart = 68;
      const topZoneEnd = stageH * 0.48;
      const availH = Math.max(180, topZoneEnd - topZoneStart);
      const desiredH = Math.min(availH * 0.9, 300);
      const maxWScale = (stageW * 0.68) / alcoveW;
      const scale = Math.min(Math.max(desiredH / alcoveH, 1.08), maxWScale, 1.65);

      const targetX = stageW * 0.5;
      const targetY = topZoneStart + availH / 2;

      const x = targetX - trackCenterX - (alcoveCx - trackW / 2) * scale;
      const y = targetY - trackCenterY - (alcoveCy - trackH / 2) * scale;
      return { x, y, scale };
    }
  }, []);

  const runEnterTimeline = useCallback(
    (id: string, wasOpen: boolean) => {
      const trackEl = trackRef.current;
      const footerEl = heroFooterRef.current;
      const hudEl = hudRef.current;
      const infoEl = infoPanelRef.current;
      if (!trackEl) return;

      activeTlRef.current?.kill();

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const target = computeCameraTarget(id);
      const otherCards = FRAGRANCES.filter((f) => f.id !== id)
        .map((f) => nicheRefs.current[f.id])
        .filter(Boolean);
      const selectedCard = nicheRefs.current[id];
      const allCaptions = Object.values(captionRefs.current).filter(Boolean);
      const infoItems = infoEl ? Array.from(infoEl.children) : [];

      if (prefersReduced) {
        gsap.set(trackEl, { x: target.x, y: target.y, scale: target.scale });
        gsap.set(otherCards, { opacity: 0.04 });
        if (selectedCard) gsap.set(selectedCard, { opacity: 1 });
        gsap.set(allCaptions, { opacity: 0 });
        if (footerEl) gsap.set(footerEl, { opacity: 0 });
        if (hudEl) gsap.set(hudEl, { opacity: 1 });
        if (infoItems.length > 0) gsap.set(infoItems, { opacity: 1, y: 0 });
        setPhase("detail");
        return;
      }

      if (hudEl && !wasOpen) {
        gsap.set(hudEl, { opacity: 0 });
      }
      if (infoItems.length > 0) {
        gsap.set(infoItems, { opacity: 0, y: 22 });
      }

      const tl = gsap.timeline({
        onComplete: () => {
          setPhase("detail");
        },
      });
      activeTlRef.current = tl;

      if (!wasOpen) {
        if (footerEl) {
          tl.to(footerEl, { opacity: 0, y: 18, duration: 0.36, ease: "power2.inOut" }, 0);
        }
        tl.to(allCaptions, { opacity: 0, y: 8, duration: 0.3, ease: "power2.inOut" }, 0);
      }

      // Smooth camera pan + zoom directly onto the selected niche
      tl.to(
        trackEl,
        {
          x: target.x,
          y: target.y,
          scale: target.scale,
          duration: wasOpen ? 0.85 : 1.05,
          ease: "power3.inOut",
        },
        0.02
      );

      tl.to(
        otherCards,
        {
          opacity: 0.04,
          filter: "blur(6px) brightness(0.45)",
          duration: 0.72,
          ease: "power2.inOut",
        },
        0.04
      );

      if (selectedCard) {
        tl.to(
          selectedCard,
          {
            opacity: 1,
            filter: "blur(0px) brightness(1)",
            duration: 0.65,
            ease: "power2.out",
          },
          0.04
        );
      }

      // Reveal single-column text AFTER the bottle settles into position
      const textDelay = wasOpen ? 0.78 : 1.08;
      if (hudEl) {
        tl.to(hudEl, { opacity: 1, duration: 0.45, ease: "power2.out" }, textDelay - 0.14);
      }
      if (infoItems.length > 0) {
        tl.to(
          infoItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.68,
            stagger: 0.075,
            ease: "power3.out",
          },
          textDelay
        );
      }
    },
    [computeCameraTarget]
  );

  const animateBackToGallery = useCallback(() => {
    const trackEl = trackRef.current;
    const footerEl = heroFooterRef.current;
    if (!trackEl || currentIdRef.current === null) {
      setDisplayedId(null);
      setPhase("idle");
      return;
    }

    setPhase("exiting");
    activeTlRef.current?.kill();

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const allCards = Object.values(nicheRefs.current).filter(Boolean);
    const allCaptions = Object.values(captionRefs.current).filter(Boolean);
    const infoEl = infoPanelRef.current;
    const hudEl = hudRef.current;
    const infoItems = infoEl ? Array.from(infoEl.children) : [];

    if (prefersReduced) {
      gsap.set(trackEl, { clearProps: "transform" });
      gsap.set(allCards, { clearProps: "opacity,filter" });
      gsap.set(allCaptions, { clearProps: "opacity,transform" });
      if (footerEl) gsap.set(footerEl, { clearProps: "opacity,transform" });
      currentIdRef.current = null;
      wasOpenRef.current = false;
      setDisplayedId(null);
      setPhase("idle");
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(trackEl, { clearProps: "transform" });
        gsap.set(allCards, { clearProps: "opacity,filter" });
        gsap.set(allCaptions, { clearProps: "opacity,transform" });
        if (footerEl) gsap.set(footerEl, { clearProps: "opacity,transform" });
        currentIdRef.current = null;
        wasOpenRef.current = false;
        setDisplayedId(null);
        setPhase("idle");
      },
    });
    activeTlRef.current = tl;

    // 1. Fade text out first
    if (infoItems.length > 0) {
      tl.to(
        infoItems,
        { opacity: 0, y: 14, duration: 0.32, stagger: 0.025, ease: "power2.in" },
        0
      );
    }
    if (hudEl) {
      tl.to(hudEl, { opacity: 0, duration: 0.32, ease: "power2.in" }, 0.05);
    }

    // 2. Zoom OUT & glide bottle smoothly back into its original slot
    tl.to(
      trackEl,
      { x: 0, y: 0, scale: 1, duration: 0.98, ease: "power3.inOut" },
      0.24
    );

    tl.to(
      allCards,
      { opacity: 1, filter: "blur(0px) brightness(1)", duration: 0.82, ease: "power2.out" },
      0.36
    );

    tl.to(allCaptions, { opacity: 0.72, y: 0, duration: 0.45, ease: "power2.out" }, 0.8);

    if (footerEl) {
      tl.to(footerEl, { opacity: 1, y: 0, duration: 0.52, ease: "power3.out" }, 0.76);
    }
  }, []);

  useEffect(() => {
    if (activeId && activeId !== currentIdRef.current) {
      wasOpenRef.current = currentIdRef.current !== null;
      currentIdRef.current = activeId;
      setJustAdded(false);
      setPhase("entering");
      setDisplayedId(activeId);
      if (window.scrollY > 12) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (!activeId && currentIdRef.current !== null) {
      animateBackToGallery();
    }
  }, [activeId, animateBackToGallery]);

  useLayoutEffect(() => {
    if (!displayedId || phase !== "entering") return;
    runEnterTimeline(displayedId, wasOpenRef.current);
  }, [displayedId, phase, runEnterTimeline]);

  useEffect(() => {
    if (!displayedId || phase === "exiting") return;
    const onResize = () => {
      const trackEl = trackRef.current;
      if (!trackEl || !currentIdRef.current) return;
      const target = computeCameraTarget(currentIdRef.current);
      gsap.set(trackEl, { x: target.x, y: target.y, scale: target.scale });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [displayedId, phase, computeCameraTarget]);

  useEffect(() => {
    if (!activeId) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onSelect(null);
      } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const idx = FRAGRANCES.findIndex((f) => f.id === activeId);
        if (idx === -1) return;
        const nextIdx =
          e.key === "ArrowRight"
            ? (idx + 1) % FRAGRANCES.length
            : (idx - 1 + FRAGRANCES.length) % FRAGRANCES.length;
        onSelect(FRAGRANCES[nextIdx].id);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeId, onSelect]);

  useEffect(() => {
    if (phase === "idle") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  const handleStep = (dir: 1 | -1) => {
    if (!displayedFragrance) return;
    const idx = FRAGRANCES.findIndex((f) => f.id === displayedFragrance.id);
    const next = FRAGRANCES[(idx + dir + FRAGRANCES.length) % FRAGRANCES.length];
    onSelect(next.id);
  };

  const handleAdd = () => {
    if (!displayedFragrance) return;
    onAddToCart(displayedFragrance, selectedMl);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  const activePrice = displayedFragrance
    ? displayedFragrance.volumes.find((v) => v.ml === selectedMl)?.price ??
      displayedFragrance.volumes[1].price
    : 0;

  const isExpanded = phase !== "idle";

  return (
    <section
      ref={stageRef}
      id="bo-suu-tap"
      className={`${styles.heroStage} ${isExpanded ? styles.heroStageExpanded : ""}`}
      style={
        {
          "--stage-glow-rgb": ambientFragrance.glowRgb,
          "--stage-accent-hex": ambientFragrance.accentHex,
        } as React.CSSProperties
      }
      aria-label="Bộ sưu tập The Night Collection"
      onClick={(e) => {
        if (phase === "detail" && e.target === e.currentTarget) {
          onSelect(null);
        }
      }}
    >
      <div className={styles.stageAmbient} aria-hidden />
      <div className={styles.galleryFloorLine} aria-hidden />

      {/* Single Continuous 5-Niche Camera Track */}
      <div
        ref={trackRef}
        className={`${styles.nicheGrid} ${isExpanded ? styles.nicheGridZoomed : ""}`}
      >
        {FRAGRANCES.map((item) => {
          const isSelected = displayedId === item.id;
          return (
            <button
              key={item.id}
              ref={(el) => {
                nicheRefs.current[item.id] = el;
              }}
              type="button"
              className={`${styles.nicheCard} ${isSelected ? styles.nicheCardActive : ""}`}
              style={
                {
                  "--flacon-hex": item.accentHex,
                  "--flacon-rgb": item.accentRgb,
                } as React.CSSProperties
              }
              onMouseEnter={() => {
                if (!isExpanded) setHoveredId(item.id);
              }}
              onMouseLeave={() => {
                if (!isExpanded) setHoveredId((prev) => (prev === item.id ? null : prev));
              }}
              onFocus={() => {
                if (!isExpanded) setHoveredId(item.id);
              }}
              onClick={() => {
                if (phase === "idle") {
                  onSelect(item.id);
                } else if (phase === "detail" && isSelected) {
                  onSelect(null);
                }
              }}
              aria-label={
                isSelected
                  ? `Quay lại bộ sưu tập từ ${item.fullName}`
                  : `Khám phá ${item.fullName} — ${item.subtitleVi}`
              }
              tabIndex={isExpanded && !isSelected ? -1 : 0}
            >
              <div className={styles.nicheAlcove} data-alcove>
                <div className={styles.nicheLightBar} aria-hidden />
                <div className={styles.nicheSpotlight} aria-hidden />
                <Image
                  src={item.image}
                  alt={`Chai nước hoa ${item.fullName} trong hốc đá bazan`}
                  fill
                  priority
                  loading="eager"
                  sizes="(min-width: 1024px) 34vw, (min-width: 640px) 46vw, 72vw"
                  className={styles.nichePhoto}
                />
                <div className={styles.nicheVignette} aria-hidden />
              </div>
              <div className={styles.nicheFloorGlow} aria-hidden />
              <div
                ref={(el) => {
                  captionRefs.current[item.id] = el;
                }}
                className={styles.nicheCaption}
              >
                <span translate="no" className={styles.nicheName}>
                  {item.namePrefix}
                  <span className={styles.nicheNameAccent}>{item.nameAccent}</span>
                </span>
                <span className={styles.nicheMeta}>{item.subtitleVi}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom-Left Editorial Title ("The night collection") */}
      <div
        ref={heroFooterRef}
        className={styles.heroFooter}
        aria-hidden={isExpanded}
      >
        <div>
          <h1 className={styles.heroTitle}>
            <span translate="no">The </span>
            <span translate="no" className={styles.heroTitleAccent}>
              night
            </span>
            <span translate="no"> collection</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Năm sáng tạo Extrait de Parfum ủ lạnh trong bóng tối đá bazan. Bấm vào từng hốc trưng bày để mở ánh sáng chi tiết.
          </p>
        </div>

        <div className={styles.heroHint}>
          <span>5 mùi hương đêm · 28–35% tinh dầu</span>
          <a href="#kien-truc-huong" className={styles.scrollCue}>
            Kiến trúc mùi hương <ArrowDown size={14} aria-hidden />
          </a>
        </div>
      </div>

      {/* Clean Single-Column Detail HUD (zero overlap with bottle; minimal text tabs only) */}
      {displayedFragrance && (
        <div
          ref={hudRef}
          className={`${styles.detailHud} ${phase === "detail" ? styles.detailHudInteractive : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label={`Chi tiết nước hoa ${displayedFragrance.fullName}`}
          style={
            {
              "--detail-hex": displayedFragrance.accentHex,
              "--detail-rgb": displayedFragrance.accentRgb,
              "--detail-glow-rgb": displayedFragrance.glowRgb,
            } as React.CSSProperties
          }
          onClick={(e) => {
            if (phase === "detail" && e.target === e.currentTarget) {
              onSelect(null);
            }
          }}
        >
          <div ref={infoPanelRef} className={styles.detailInfoCol}>
            <div className={styles.detailTopRow}>
              <button
                type="button"
                className={styles.backBtn}
                onClick={() => onSelect(null)}
              >
                <ArrowLeft size={14} aria-hidden />
                Bộ sưu tập
              </button>

              <div className={styles.detailStepControls}>
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={() => handleStep(-1)}
                  aria-label="Mùi hương trước"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={() => handleStep(1)}
                  aria-label="Mùi hương tiếp theo"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            {/* Minimal text-only tab bar to switch between the 5 fragrances (no extra images) */}
            <div className={styles.fragranceTabs} role="tablist" aria-label="Chuyển đổi mùi hương">
              {FRAGRANCES.map((item) => {
                const active = item.id === displayedFragrance.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={`${styles.fragranceTab} ${active ? styles.fragranceTabActive : ""}`}
                    style={
                      {
                        "--tab-hex": item.accentHex,
                        "--tab-rgb": item.accentRgb,
                      } as React.CSSProperties
                    }
                    onClick={() => onSelect(item.id)}
                  >
                    <span className={styles.fragranceTabIndex}>{item.index}</span>
                    <span translate="no" className={styles.fragranceTabName}>
                      {item.fullName}
                    </span>
                  </button>
                );
              })}
            </div>

            <h2 translate="no" className={styles.detailTitle}>
              {displayedFragrance.namePrefix}
              <span className={styles.detailTitleAccent}>
                {displayedFragrance.nameAccent}
              </span>
            </h2>

            <p className={styles.detailSubtitle}>
              {displayedFragrance.concentration} · {displayedFragrance.subtitleVi}
            </p>

            <p className={styles.detailStory}>{displayedFragrance.shortDesc}</p>

            <div className={styles.notesBlock}>
              <div className={styles.noteRow}>
                <span className={styles.noteLabel}>Hương đầu</span>
                <span className={styles.noteVal}>{displayedFragrance.notes.top.join(", ")}</span>
              </div>
              <div className={styles.noteRow}>
                <span className={styles.noteLabel}>Hương giữa</span>
                <span className={styles.noteVal}>{displayedFragrance.notes.heart.join(", ")}</span>
              </div>
              <div className={styles.noteRow}>
                <span className={styles.noteLabel}>Hương cuối</span>
                <span className={styles.noteVal}>{displayedFragrance.notes.base.join(", ")}</span>
              </div>
            </div>

            <div className={styles.volumeRow}>
              <div className={styles.volumeGroup} role="radiogroup" aria-label="Chọn dung tích">
                {displayedFragrance.volumes.map((v) => (
                  <button
                    key={v.ml}
                    type="button"
                    role="radio"
                    aria-checked={selectedMl === v.ml}
                    className={`${styles.volumeBtn} ${
                      selectedMl === v.ml ? styles.volumeBtnActive : ""
                    }`}
                    onClick={() => setSelectedMl(v.ml)}
                  >
                    {v.ml} ml
                  </button>
                ))}
              </div>
              <span className={styles.detailPrice}>{formatVnd(activePrice)}</span>
            </div>

            <button type="button" className={styles.addBtn} onClick={handleAdd}>
              {justAdded ? (
                <>
                  <Check size={16} aria-hidden />
                  Đã thêm vào giỏ hàng
                </>
              ) : (
                <>
                  <ShoppingBag size={16} aria-hidden />
                  Thêm vào giỏ · {selectedMl} ml
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
