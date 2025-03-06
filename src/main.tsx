import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import App from "./App";
import CandidateSearch from "./pages/CandidateSearch";
import ErrorPage from "./pages/ErrorPage";
import SavedCandidates from "./pages/SavedCandidates";
import "./index.css"; 

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <CandidateSearch />,
        },
        {
          path: "/saved",
          element: <SavedCandidates />,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}
