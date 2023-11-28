import { createBrowserRouter } from "react-router-dom";
import PanelLayout from "./layout/PanelLayout";
import Dashboard from "./pages/user/dashboard/Dashboard";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/register/Login";
import Register from "./pages/register/Register";
import PrivateRoutes from "./auth/PrivateRoutes";
import ViewTikets from "./pages/user/tiket/ViewTikets";
import NewTicket from "./pages/user/new-ticket/NewTicket";
import Notifications from "./pages/user/notifications/Notifications";
import SiteGuide from "./pages/user/site-guide/SiteGuide";
import CurrentRequests from "./pages/user/current-requests/CurrentRequests";

const router = createBrowserRouter([
  // user routes
  {
    path: "/user",
    element: (
      <PrivateRoutes>
        <PanelLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },

      // requests
      {
        path: "current-requests",
        element: <CurrentRequests />,
      },

      // support
      {
        path: "view-tickets",
        element: <ViewTikets />,
      },
      {
        path: "new-tiket",
        element: <NewTicket />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "guide",
        element: <SiteGuide />,
      },
    ],
  },

  // expert routes
  {
    path: "/expert",
    element: <PanelLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },

  // admin routes
  {
    path: "/admin",
    element: <PanelLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },

  // auth routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
