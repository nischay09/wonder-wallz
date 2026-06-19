"use client";

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
  return (
    <section id={id} aria-label={title} style={{ lineHeight: 0 }}>
      <iframe
        src={src}
        title={title}
        scrolling="no"
        style={{
          width: "100%",
          height: `${defaultHeight}px`,
          border: "none",
          display: "block",
        }}
        loading="lazy"
      />
    </section>
  );
}