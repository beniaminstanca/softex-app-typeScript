import { useState } from "react";
import {
  useNavigate,
  Form,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";
import {Offer} from '../../models/types'
import { getAuthToken } from "../../util/auth";
import classes from "./OfferForm.module.scss";
import DynamicFields from "../dynamicFields/DynamicFields";

const OfferForm: React.FC<{ method: any; offer?: Offer }> = ({
  method,
  offer,
}) => {
  console.log("offer", offer);
  const data: any = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [tipAsigurare, setTipAsigurare] = useState("");

  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("..");
  }
  const handleTipAsigurare = (value: any) => {
    setTipAsigurare(value);
  };

  return (
    <div className={classes["create-offer-form"]}>
      <Form method={method} className={classes["form-offer"]}>
        <h1>{offer ? "Editeaza " : "Creare "} oferta</h1>
        <p>
          <label htmlFor="nume">Nume</label>
          <input
            id="nume"
            type="text"
            name="nume"
            required
            defaultValue={offer ? offer.nume : ""}
          />
          {data &&
            data.errors &&
            data.errors &&
            data.errors.hasOwnProperty("nume") && (
              <span>{data.errors["nume"]}</span>
            )}
          <p></p>
          <label htmlFor="prenume">Prenume</label>
          <input
            id="prenume"
            type="text"
            name="prenume"
            maxLength={10}
            defaultValue={offer ? offer.prenume : ""}
          />
          {data &&
            data.errors &&
            data.errors &&
            data.errors.hasOwnProperty("prenume") && (
              <span>{data.errors["prenume"]}</span>
            )}
        </p>
        <p>
          <label htmlFor="date">Date Nasterii</label>
          <input
            id="date"
            type="date"
            name="date"
            min="1900-01-01"
            max={new Date().toJSON().slice(0, 10)}
            required
            defaultValue={offer ? offer.data : ""}
          />
          {data &&
            data.errors &&
            data.errors &&
            data.errors.hasOwnProperty("data") && (
              <span>{data.errors["data"]}</span>
            )}
        </p>
        <p>
          <label htmlFor="tipAsigurare">Tip asigurare: </label>
          <select
            disabled={offer ? true : false}
            required
            name="tipAsigurare"
            id="tipAsigurare"
            onChange={(event) => handleTipAsigurare(event.target.value)}
            value={offer?.tipAsigurare}
          >
            <option value="">Alege</option>
            <option value="0">Rca</option>
            <option value="1">Casco</option>
          </select>
        </p>
        {
          offer ? (
            <DynamicFields tipAsigurare={offer.tipAsigurare} offer={offer} />
          ) : (
            <DynamicFields tipAsigurare={tipAsigurare} />
          )
        }
        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Trimitere formular"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default OfferForm;

export async function action({
  request,
  params,
}: {
  request: Request;
  params: any;
}) {
  const method = request.method;
  const data = await request.formData();

  const tipAsigurare = data.get("tipAsigurare");

  const token = getAuthToken();

  const defaultOfferData = {
    nume: data.get("nume"),
    prenume: data.get("prenume"),
    data: data.get("date"),
    tipAsigurare: data.get("tipAsigurare"),
  };
  let completeOfferData;
  if (tipAsigurare === "0") {
    completeOfferData = {
      ...defaultOfferData,
      marcaMasina: data.get("marcaMasina"),
      anFabricatie: data.get("anFabricatie"),
      nrInmatriculare: data.get("nrInmatriculare"),
    };
  } else if (tipAsigurare === "1") {
    completeOfferData = {
      ...defaultOfferData,
      serieSasiu: data.get("serieSasiu"),
      nrKm: data.get("nrKm"),
    };
  } else {
    completeOfferData = { ...defaultOfferData };
  }

  let url = "http://localhost:8080/offers/";
  if (method === "PATCH") {
    url = "http://localhost:8080/offers/" + params.offerId;
  }
  console.log("asisi method ", method);
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(completeOfferData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save data in database" }, { status: 500 });
  }

  return redirect("/offers");
}
