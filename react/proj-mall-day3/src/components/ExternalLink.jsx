// src/components/ExternalLink.jsx
import React from "react";

export default function ExternalLink({
  href,
  children,
  className = "text-purple-500 underline",
  target = "_blank",
  rel,
  ...props
}) {
  const isExternal = /^https?:\/\//i.test(href);
  const safeRel =
    rel ??
    (target === "_blank" || isExternal ? "noopener noreferrer" : undefined);

  return (
    <a
      href={href}
      target={target}
      rel={safeRel}
      className={className}
      {...props}
    >
      {children ?? href}
    </a>
  );
}
