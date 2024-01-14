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

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "resources", element: <ResourcesPage /> },
        { path: "shelters", element: <SheltersPage /> },
        { path: "shelters/:id", element: <ShelterDetailsPage />},
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },
        { path: "chat", element: <ChatPage /> },
      ],
    },
]);

export default router;