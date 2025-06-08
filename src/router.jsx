import { createBrowserRouter } from "react-router";
import App from "./App";
import Home, { loadSampleData } from "./pages/Home";
import SingleMovieDetail, { loader } from "./pages/SingleMovieDetail";
import ErrorPage from "./pages/ErrorPage";

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: loadSampleData,
        errorElement: <ErrorPage />,
      },
      {
        path: "/detail/:imdbID",
        element: <SingleMovieDetail />,
        loader: loader,
      },
    ],
  },
]);

export default router;
