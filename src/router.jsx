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
import WarrantyDocsUpload from "./pages/user/requests/warranty/WarrantyDocsUpload";
import WarrantyComplet from "./pages/user/requests/warranty/WarrantyComplet";
import CreditLimit from "./pages/user/requests/credit-limit/CreditLimit";
import Facilities from "./pages/user/requests/facilities/Facilities";
import PhoneVerify from "./pages/register/PhoneVerify";
import GenuineProfile from "./pages/user/update-profile/GenuineProfile";
import UpdateGenuineProfile from "./pages/user/update-profile/UpdateGenuineProfile";
import LegalProfile from "./pages/user/update-profile/LegalProfile";
import UpdateLegalProfile from "./pages/user/update-profile/UpdateLegalProfile";
import ViewRequest from "./pages/user/requests/view-request/ViewRequest";
import Support from "./pages/user/tiket/Support";
import ExpertDashboard from "./pages/expert/dashboard/Dashboard";
import ExpertCurrentRequests from "./pages/expert/current-requests/CurrentRequests";
import CheckRequestLayout from "./pages/expert/check-request/layout/CheckRequestLayout";
import RecordCheck from "./pages/expert/check-request/check-steps/RecordCheck";
import RecordAssessment from "./pages/expert/check-request/check-steps/RecordAssessment";
import RecordReport from "./pages/expert/check-request/check-steps/RecordReport";
import Loader from "./components/loader/Loader";
import RecordCommite from "./pages/expert/check-request/check-steps/RecordCommite";
import RecordCredit from "./pages/expert/check-request/check-steps/RecordCredit";

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
      {
        path: "view-requests/:requestId",
        element: <ViewRequest />,
      },
      {
        path: "warranty-docs-upload",
        element: <WarrantyDocsUpload />,
      },
      {
        path: "warranty-complet/:bondId",
        element: <WarrantyComplet />,
      },
      {
        path: "credit-limit",
        element: <CreditLimit />,
      },
      {
        path: "facilities",
        element: <Facilities />,
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
        path: "support/:tiketId",
        element: <Support />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "guide",
        element: <SiteGuide />,
      },

      // genuine profile
      {
        path: "update_genuine_profile",
        element: <UpdateGenuineProfile />,
      },
      {
        path: "record_genuine_profile",
        element: <GenuineProfile />,
      },

      // legal profile
      {
        path: "update_legal_profile",
        element: <UpdateLegalProfile />,
      },
      {
        path: "record_genuine_legal",
        element: <LegalProfile />,
      },
    ],
  },

  // expert routes
  {
    path: "/expert",

    element: (
      <PrivateRoutes>
        <PanelLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "dashboard",
        element: <ExpertDashboard />,
      },
      {
        path: "current-requests",
        element: <ExpertCurrentRequests />,
      },
      // check request
      {
        path: "check-request",
        element: <CheckRequestLayout />,
        children: [
          {
            path: ":requestId",
            index: true,
            element: (
              <div className=" relative w-full h-full">
                <Loader />
              </div>
            ),
          },
          {
            path: "check/:requestId",
            element: <RecordCheck />,
          },
          {
            path: "assessment/:requestId",
            element: <RecordAssessment />,
          },
          {
            path: "report/:requestId",
            element: <RecordReport />,
          },
          {
            path: "commite/:requestId",
            element: <RecordCommite />,
          },
          {
            path: "credit/:requestId",
            element: <RecordCredit />,
          },
        ],
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
      {
        path: "verify",
        element: <PhoneVerify />,
      },
    ],
  },
]);

export default router;
