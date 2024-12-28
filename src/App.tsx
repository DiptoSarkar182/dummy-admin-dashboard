import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Home from "./components/home";
import AnalyticsPage from "./components/analytics/AnalyticsPage";
import CalendarPage from "./components/calendar/CalendarPage";
import UsersPage from "./components/users/UsersPage";
import NotificationsPage from "./components/notifications/NotificationsPage";
import SettingsPage from "./components/settings/SettingsPage";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </Suspense>
  );
}

export default App;
