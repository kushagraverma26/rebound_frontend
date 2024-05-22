import { createBrowserRouter } from "react-router-dom";

import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import ResourcesPage from "./pages/ResourcesPage";
import SheltersPage from "./pages/SheltersPage";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignupPage";
import ChatPage from "./pages/ChatPage";
import ShelterDetailsPage from "./pages/ShelterDetailsPage";
import AdminHomePage from "./pages/AdminHomePage";
import ManageShelterPage from "./pages/ManageShelterPage";
import ManageResourcePage from "./pages/ManageResourcePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ResourceDetailsPage from "./pages/ResourceDetailsPage";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "resources", element: <ResourcesPage /> },
      { path: "resources/:id", element: <ResourceDetailsPage /> },
      { path: "shelters", element: <SheltersPage /> },
      { path: "shelters/:id", element: <ShelterDetailsPage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "chat", element: <ChatPage /> },
      {
        path: "admin",
        element: <ProtectedRoute />,
        children: [
          { path: "", element: <AdminHomePage />, index: true },
          { path: "shelters", element: <ManageShelterPage /> },
          { path: "resources", element: <ManageResourcePage /> },
          { path: "dashboard", element: <AdminDashboardPage /> },
        ],
      },
    ],
  },
]);

export default router;
