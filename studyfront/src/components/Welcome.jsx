import { useEffect, useRef } from "react";

export default function Welcome() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 레티나 스케일
    const dpr = window.devicePixelRatio || 1;
    const W = 300,
      H = 300;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    // 움직일 '사각형' 크기/위치
    const rect = { w: 50, h: 50, x: (W - 50) / 2, y: (H - 50) / 2 };
    const pressed = { left: false, right: false, up: false, down: false };
    const speed = 5;

    // 이미지 로드
    const img = new Image();
    img.src = "/dino.jpg"; // public/ 에 player.png 넣어두면 /player.png 로 접근
    // img.crossOrigin = "anonymous"; // 외부 도메인 이미지면 필요(CORS 허용도 필요)

    let ready = false;
    img
      .decode()
      .then(() => {
        ready = true;
      })
      .catch(() => {
        /* fallback 허용 */
      });

    function loop() {
      ctx.clearRect(0, 0, W, H);

      // 이동
      if (pressed.right && rect.x < W - rect.w) rect.x += speed;
      if (pressed.left && rect.x > 0) rect.x -= speed;
      if (pressed.down && rect.y < H - rect.h) rect.y += speed;
      if (pressed.up && rect.y > 0) rect.y -= speed;

      // 그리기: 이미지가 준비되면 drawImage, 아니면 테두리 사각형
      if (ready) {
        // 픽셀아트 깨끗하게: 필요시 ↓
        // ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, rect.x, rect.y, rect.w, rect.h);
      } else {
        ctx.strokeStyle = "lightgreen";
        ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    function onDown(e) {
      if (e.key === "ArrowRight") pressed.right = true;
      if (e.key === "ArrowLeft") pressed.left = true;
      if (e.key === "ArrowUp") pressed.up = true;
      if (e.key === "ArrowDown") pressed.down = true;
    }
    function onUp(e) {
      if (e.key === "ArrowRight") pressed.right = false;
      if (e.key === "ArrowLeft") pressed.left = false;
      if (e.key === "ArrowUp") pressed.up = false;
      if (e.key === "ArrowDown") pressed.down = false;
    }

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    loop();

    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div>
      <marquee className="text-5xl font-bold">WELCOME</marquee>
      <p>공룡을 움직여보세요</p>
      <canvas ref={canvasRef} />
    </div>
  );
}
