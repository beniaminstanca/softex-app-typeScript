import { useRouteLoaderData } from "react-router-dom";
import OfferForm from "../components/offers/OfferForm";
import { Offer} from '../models/types';

function EditOfferPage (){
    const offer = useRouteLoaderData('offer-detail') as Offer;
    console.log(offer);
    return <OfferForm offer={offer} method={'PATCH'}/>
}

export default EditOfferPage;