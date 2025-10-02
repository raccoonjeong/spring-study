# 1. 이미지쇼 1단계

```jsx
import { useState } from "react";
import "./ImagePreviewStep0.css"; // 같은 이름의 CSS

// 0단계: 썸네일을 목록 뿌리긴
export default function ImagePreviewStep0() {
  // 샘플 이미지들 (원하는 URL/경로로 바꿔 사용)
  const images = [
    { src: "https://picsum.photos/id/10/800/500", alt: "img-1" },
    { src: "https://picsum.photos/id/20/800/500", alt: "img-2" },
    { src: "https://picsum.photos/id/30/800/500", alt: "img-3" }, // 오타: picsum -> 고쳐 사용
    { src: "https://picsum.photos/id/40/800/500", alt: "img-4" },
  ];

  return (
    <div className="imgpv-container">
      <div className="imgpv-grid">
        {images.map((img, idx) => (
          <button className="imgpv-thumb">
            <img src={img.src} alt={img.alt} />
          </button>
        ))}
      </div>
    </div>
  );
}
```
