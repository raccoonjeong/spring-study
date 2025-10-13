# 4. 이미지쇼 4단계

```jsx
import { useState } from "react";
import "./ImagePreviewStep3.css";

// 3단계: 이전/다음이 끝에서 이어지는 루프 + 모달 하단 썸네일 스트립
export default function ImagePreviewStep3() {
  const images = [
    { src: "https://picsum.photos/id/10/800/500", alt: "img-1" },
    { src: "https://picsum.photos/id/20/800/500", alt: "img-2" },
    { src: "https://picsum.photos/id/30/800/500", alt: "img-3" },
    { src: "https://picsum.photos/id/40/800/500", alt: "img-4" },
    { src: "https://picsum.photos/id/50/800/500", alt: "img-5" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const openModal = (idx) => {
    setCurrentIndex(idx);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setCurrentIndex(null);
  };

  const prev = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };
  const next = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const jump = (idx) => setCurrentIndex(idx);

  return (
    <div className="imgpv-container">
      <div className="imgpv-grid">
        {images.map((img, idx) => (
          <button
            key={idx}
            className="imgpv-thumb"
            onClick={() => openModal(idx)}
          >
            <img src={img.src} alt={img.alt} />
          </button>
        ))}
      </div>

      {isOpen ? (
        <div className="imgpv-modal-bg" onClick={closeModal}>
          <div className="imgpv-modal" onClick={(e) => e.stopPropagation()}>
            <div className="imgpv-modal-top">
              <button onClick={closeModal}>닫기</button>
            </div>

            <div className="imgpv-stage">
              <button className="imgpv-nav" onClick={prev} aria-label="이전">
                ◀
              </button>

              <img
                className="imgpv-modal-img"
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
              />

              <button className="imgpv-nav" onClick={next} aria-label="다음">
                ▶
              </button>
            </div>

            <div className="imgpv-counter">
              {currentIndex + 1} / {images.length}
            </div>

            {/* 하단 썸네일 스트립 */}
            <div className="imgpv-strip">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`imgpv-strip-thumb ${
                    idx === currentIndex ? "is-active" : ""
                  }`}
                  onClick={() => jump(idx)}
                  aria-label={`이동 ${idx + 1}`}
                >
                  <img src={img.src} alt={img.alt} />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
```
