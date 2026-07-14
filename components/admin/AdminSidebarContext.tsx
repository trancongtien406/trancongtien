"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type SidebarCtx = {
  open: boolean;
  collapsed: boolean;
  setOpen: (v: boolean) => void;
  toggleOpen: () => void;
  toggleCollapsed: () => void;
};

const Ctx = createContext<SidebarCtx | null>(null);

export function AdminSidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(
    () =>
      typeof window !== "undefined" &&
      localStorage.getItem("admin-sidebar-collapsed") === "1",
  );

  useEffect(() => {
    localStorage.setItem("admin-sidebar-collapsed", collapsed ? "1" : "0");
  }, [collapsed]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleOpen = useCallback(() => setOpen((v) => !v), []);
  const toggleCollapsed = useCallback(() => setCollapsed((v) => !v), []);

  const value = useMemo(
    () => ({ open, collapsed, setOpen, toggleOpen, toggleCollapsed }),
    [open, collapsed, toggleOpen, toggleCollapsed],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAdminSidebar() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAdminSidebar must be used within provider");
  return ctx;
}
