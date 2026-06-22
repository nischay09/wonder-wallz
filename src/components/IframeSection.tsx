"use client";

import { useEffect, useRef, useState } from "react";

interface IframeSectionProps {
  src: string;
  title: string;
  defaultHeight?: number;
  id?: string;
}

export default function IframeSection({
  src,
  title,
  defaultHeight = 700,
  id,
}: IframeSectionProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(defaultHeight);
  const rafRef = useRef<number | null>(null);
  const pendingHeightRef = useRef<number | null>(null);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      // Make sure the message is from our own iframe, not some other source
      if (iframeRef.current && e.source !== iframeRef.current.contentWindow) {
        return;
      }
      const data = e.data;
      if (data && data.type === "wonderwallz:resize" && typeof data.height === "number") {
        const next = Math.ceil(data.height) + 2;
        pendingHeightRef.current = next;

        // Coalesce bursts of resize messages (load, font-ready, timers, etc.)
        // into a single layout pass per animation frame instead of one
        // reflow per message — this is what was causing the navbar repaint.
        if (rafRef.current !== null) return;
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          const value = pendingHeightRef.current;
          if (value === null) return;
          setHeight((prev) => (Math.abs(prev - value) < 2 ? prev : value));
        });
      }
    }
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section id={id} aria-label={title} style={{ lineHeight: 0 }}>
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        scrolling="no"
        style={{
          width: "100%",
          height: `${height}px`,
          border: "none",
          display: "block",
        }}
        loading="lazy"
      />
    </section>
  );
}
