import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import classes from "./OfferItem.module.scss";
import { useSelector } from "react-redux";
import DynamicFields from "../dynamicFields/DynamicFields";

const OfferItem: React.FC<{ offer: any }> = ({ offer }) => {
  const tipAsigurare = useSelector((state: { oferta: { tipAsigurare: [] } }) => state.oferta.tipAsigurare);
  const token = useRouteLoaderData("root") as any;
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "DELETE" });
    }
  }

  return (
    <div className={classes.detali}>
      <h1>Detali oferta</h1>
      <article className={classes.event}>
        <h1>Nume: {offer.nume}</h1>
        <h1>Prenume: {offer.prenume}</h1>
        <time>Data Nasterii:  {offer.data}</time>
        <p>TipAsigurare: {tipAsigurare[offer.tipAsigurare]}</p>
        <DynamicFields tipAsigurare={tipAsigurare[offer.tipAsigurare]} offer={offer} />
        {token && (
          <menu className={classes.actions}>
            <Link to="edit">Edit</Link>
            <button onClick={startDeleteHandler}>Delete</button>
          </menu>
        )}
      </article>
    </div>
  );
};

export default OfferItem;
