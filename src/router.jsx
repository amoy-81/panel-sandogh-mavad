import { Navigate, createBrowserRouter } from "react-router-dom";
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
import RecordWage from "./pages/expert/check-request/check-steps/RecordWage";
import RecordEvidence from "./pages/expert/check-request/check-steps/RecordEvidence";
import RecordCheck_evidence from "./pages/expert/check-request/check-steps/RecordCheck_evidence";
import UserViewRequest from "./pages/user/requests/view-request/layout/UserViewRequestLayout";
import UserViewRequestLayout from "./pages/user/requests/view-request/layout/UserViewRequestLayout";
import RecordAgreement from "./pages/expert/check-request/check-steps/RecordAgreement";
import ViewBondRequest from "./pages/user/requests/view-request/ViewBondRequest";

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

      // view requests
      {
        path: "view-requests",
        element: <UserViewRequestLayout />,
        children: [
          {
            path: "bond/:requestId",
            element: <ViewBondRequest />,
          },
          {
            path: "wf/:requestId",
            element: <ViewRequest />,
          },
        ],
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
      {
        path: "notifications",
        element: <Notifications />,
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
          // bond type
          {
            path: "wage/:requestId",
            element: <RecordWage />,
          },
          {
            path: "evidence/:requestId",
            element: <RecordEvidence />,
          },
          {
            path: "check_evidence/:requestId",
            element: <RecordCheck_evidence />,
          },
          {
            path: "agreement/:requestId",
            element: <RecordAgreement />,
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

  {
    path: "*",
    element: <Navigate to={"/auth/login"} />,
  },
]);

export default router;
