import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

let done = false;
export function setupGsap() {
  if (done) return;
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  done = true;
}
export const prefersReduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 900px)").matches;
