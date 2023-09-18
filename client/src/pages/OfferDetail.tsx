import { useRouteLoaderData, json, redirect } from "react-router-dom";
import OfferItem from "../components/offers/OfferItem";
import { getAuthToken } from "../util/auth";
import { OfferDetail} from '../models/types';


function OffersDetailPage() {
  const {offer} = useRouteLoaderData('offer-detail') as OfferDetail;

  return (
    <>
      <OfferItem offer={offer} />
    </>
  );
}

export default OffersDetailPage;

type MyParams = {
  offerId : string;
}

export async function loader({ request, params}:{request:Request, params: MyParams}) {
  const id = params.offerId;
  const response = await fetch(
    "http://localhost:8080/offers/" + id
  );

  if (!response.ok) {
    throw json({ message: "Could not fetch details for selected offer" }, { status: 500 });
  } else {
    return response;
  }
}

export async function action ({params, request}:{params:any, request:Request}) {
  const offerId = params.offerId;
  const token = getAuthToken();
  const response = await fetch(
    "http://localhost:8080/offers/" + offerId, {
      method: request.method,
      headers:{
        'Authorization' : 'Bearer ' + token
      }
    });
    if (!response.ok) {
      throw json({ message: "Could not delete offer" }, { status: 500 });
    } 
    return redirect('/offers');
}