import { Outlet } from "react-router-dom";
import PageContent from "../components/content/PageContent";

function OffersRootLayout() {
  return (
    <>
    <PageContent title="Oferte">
      <Outlet />
    </PageContent>
    </>
  );
}

export default OffersRootLayout;
