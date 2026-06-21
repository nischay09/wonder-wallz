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

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      // Make sure the message is from our own iframe, not some other source
      if (iframeRef.current && e.source !== iframeRef.current.contentWindow) {
        return;
      }
      const data = e.data;
      if (data && data.type === "wonderwallz:resize" && typeof data.height === "number") {
        // Small buffer so nothing is clipped due to sub-pixel rounding
        setHeight(Math.ceil(data.height) + 2);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
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
          transition: "height 0.15s ease",
        }}
        loading="lazy"
      />
    </section>
  );
}
