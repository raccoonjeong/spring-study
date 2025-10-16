#!/usr/bin/env bash
# create-react-boiler-interactive.sh
# Usage: ./create-react-boiler-interactive.sh my-app [--start]
set -euo pipefail

APP_NAME="${1:-my-app}"

echo ">>> [1/9] Create Vite(React) app (interactive)."
#npm create vite@latest "$APP_NAME" -- --template react (직접 응답)
printf "n\nn\n" | npm create vite@latest "$APP_NAME" -- --template react # 자동응답 no / no

cd "$APP_NAME"
rm -f src/App.css

echo ">>> [2/9] npm install (보장용)"
npm i

echo ">>> [3/9] Install Tailwind v4 plugin & react-router-dom"
npm i -D tailwindcss @tailwindcss/vite
npm i react-router-dom

echo ">>> [4/9] Create folders"
mkdir -p src/pages src/layouts

echo ">>> [5/9] Write vite.config.js"
cat > vite.config.js <<'EOF'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
EOF

echo ">>> [6/9] Write src/index.css"
cat > src/index.css <<'EOF'
@import "tailwindcss";
EOF

echo ">>> [7/9] Write src/main.jsx"
cat > src/main.jsx <<'EOF'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
EOF

echo ">>> [8/9] Write router + layout + pages"
cat > src/App.jsx <<'EOF'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalLayout from "./layouts/GlobalLayout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
EOF

cat > src/layouts/GlobalLayout.jsx <<'EOF'
import { Outlet, Link } from "react-router-dom";
export default function GlobalLayout() {
  return (
    <div>
      <nav className="p-4 border-b flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <main className="p-6"><Outlet /></main>
    </div>
  );
}
EOF

cat > src/pages/Home.jsx <<'EOF'
export default function Home(){ return <h1 className="text-2xl font-bold">Home</h1>; }
EOF

cat > src/pages/About.jsx <<'EOF'
export default function About(){ return <h1 className="text-2xl font-bold">About</h1>; }
EOF

echo ">>> [9/9] Write jsconfig.json (alias @)"
cat > jsconfig.json <<'EOF'
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] },
    "jsx": "react-jsx"
  }
}
EOF

echo "✅ 프로젝트 생성 완료: $APP_NAME"

echo "수동 실행: cd $APP_NAME && npm run dev"

