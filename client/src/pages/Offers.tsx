import { useLoaderData, json, redirect } from "react-router-dom";
import { OffersData } from "../models/types";
import MuiTable from '../components/table/MuiTable';
import { getAuthToken } from "../util/auth";

function OffersPage() {
  const { offers, counter } = useLoaderData() as OffersData;

  return (
    <>
      <h2>Ai {counter} oferte</h2>
      <MuiTable offers={offers} counter={counter}/>
    </>
  );
}

export default OffersPage;

export async function loader() {
  const token = getAuthToken();
  if(!token){
   return redirect("/")
  }
  const response = await fetch("http://localhost:8080/offers");
  if (!response.ok) {
    throw json({ message: "Could not fetch offers" }, { status: 500 });
  } else {
    return response;
  }
}
