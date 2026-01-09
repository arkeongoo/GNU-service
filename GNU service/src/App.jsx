// src/App.jsx
import { useMatch } from "react-router-dom";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";

// pages
import HomePage from "./pages/Home/HomePage.jsx";
import MapPage from "./pages/Map/MapPage.jsx";
import NotFoundPage from "./pages/NotFound/NotFoundPage.jsx";
import Header from "./shared/layout/Header.jsx";
import Footer from "./shared/layout/Footer.jsx";
import ComplaintsPage from "./pages/Complaints/ComplaintsPage.jsx";

// layout parts


function Layout() {
  const location = useLocation();

  // 필요하면 이런식으로 매칭해서 숨김 제어 가능
  const isMap = !!useMatch("/map");

  // 예시: 지도 페이지에서는 Footer 숨김
  const hideFooterOnPaths = ["/map"];
  const showFooter = !hideFooterOnPaths.includes(location.pathname);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      {showFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* 메인 */}
        <Route index element={<HomePage />} />

        {/* 지도 */}
        <Route path="/map" element={<MapPage />} />

<Route path="/complaints" element={<ComplaintsPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
