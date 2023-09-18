import "./App.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import OffersPage, { loader as offersLoader } from "./pages/Offers";
import OffersDetailPage, {
  loader as offerDetailLoader,
  action as deleteofferAction,
} from "./pages/OfferDetail";
import NewOfferPage from "./pages/NewOffer";
import EditOfferPage from "./pages/EditOffer";
import OffersRootLayout from "./pages/OffersRoot";
import { action as manipulateofferAction } from "./components/offers/OfferForm";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { loader as tokenLoader } from "./util/auth";
import { ckeckAuthLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "offers",
        element: <OffersRootLayout />,
        children: [
          {
            index: true,
            element: <OffersPage />,
            loader: offersLoader,
          },
          {
            path: ":offerId",
            id: "offer-detail",
            loader: offerDetailLoader as any,
            children: [
              {
                index: true,
                element: <OffersDetailPage />,
                action: deleteofferAction,
              },
              {
                path: "edit",
                element: <EditOfferPage />,
                action: manipulateofferAction,
                loader: ckeckAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewOfferPage />,
            action: manipulateofferAction,
          },
        ],
      },
      { path: "auth", element: <AuthenticationPage />, action: authAction },
      { path: "logout", action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
