"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/src/reduxSlices/loginSlice";
import type { AppDispatch, RootState } from "@/src/store/reduxStore";

const INACTIVITY_LIMIT_MS = 30 * 60 * 1000;
const ACTIVITY_WRITE_INTERVAL_MS = 60 * 1000;
const LAST_ACTIVITY_KEY = "auth_last_activity";
const AUTH_STORAGE_KEYS = ["access_token", "custNo", "userData", LAST_ACTIVITY_KEY];

export default function SessionTimeout() {
  const accessToken = useSelector((state: RootState) => state.login.access_token);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const lastWrite = useRef(0);

  const endSession = useCallback(() => {
    AUTH_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    dispatch(logout());
    router.replace("/login?reason=session-expired");
  }, [dispatch, router]);

  useEffect(() => {
    const token = accessToken || localStorage.getItem("access_token");
    if (!token) return;

    const now = Date.now();
    const storedActivity = Number(localStorage.getItem(LAST_ACTIVITY_KEY));
    if (storedActivity && now - storedActivity >= INACTIVITY_LIMIT_MS) {
      endSession();
      return;
    }

    // Loading the site is itself activity; stale sessions were already rejected above.
    localStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
    lastWrite.current = now;

    const recordActivity = () => {
      const activityTime = Date.now();
      if (activityTime - lastWrite.current >= ACTIVITY_WRITE_INTERVAL_MS) {
        localStorage.setItem(LAST_ACTIVITY_KEY, activityTime.toString());
        lastWrite.current = activityTime;
      }
    };
    const checkExpiry = () => {
      const lastActivity = Number(localStorage.getItem(LAST_ACTIVITY_KEY));
      if (lastActivity && Date.now() - lastActivity >= INACTIVITY_LIMIT_MS) endSession();
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "access_token" && event.newValue === null) endSession();
    };
    const activityEvents: (keyof WindowEventMap)[] = ["click", "keydown", "pointermove", "scroll", "touchstart"];

    activityEvents.forEach((event) => window.addEventListener(event, recordActivity, { passive: true }));
    window.addEventListener("focus", checkExpiry);
    window.addEventListener("storage", handleStorage);
    document.addEventListener("visibilitychange", checkExpiry);
    const interval = window.setInterval(checkExpiry, 60 * 1000);

    return () => {
      activityEvents.forEach((event) => window.removeEventListener(event, recordActivity));
      window.removeEventListener("focus", checkExpiry);
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener("visibilitychange", checkExpiry);
      window.clearInterval(interval);
    };
  }, [accessToken, endSession]);

  return null;
}
