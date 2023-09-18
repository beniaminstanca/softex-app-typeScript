import { Offer } from "../../models/types";

const DynamicFields: React.FC<{
  tipAsigurare: string;
  offer?: Offer;
}> = ({ tipAsigurare, offer }) => {

  if (tipAsigurare === "0") {
    return (
      <>
        <p>
          <label htmlFor="marcaMasina">Marca Masinii</label>
          <input
            type="text"
            name="marcaMasina"
            id="marcaMasina"
            defaultValue={offer?.marcaMasina}
          />
        </p>
        <p>
          <label htmlFor="anFabricatie">An Fabricatie</label>
          <input
            type="year"
            name="anFabricatie"
            id="anFabricatie"
            defaultValue={offer?.anFabricatie}
          />
        </p>
        <p>
          <label htmlFor="nrInmatriculare">Nr Inmatriculare</label>
          <input
            type="text"
            name="nrInmatriculare"
            id="nrInmatriculare"
            defaultValue={offer?.nrInmatriculare}
          />
        </p>
        {offer && <input type="hidden" name="tipAsigurare" value={tipAsigurare}/>}
      </>
    );
  } else if(tipAsigurare === "1"){
    return (
      <>
        <p>
          <label htmlFor="serieSasiu">Serie Sasiu</label>
          <input
            type="text"
            name="serieSasiu"
            id="serieSasiu"
            defaultValue={offer?.serieSasiu}
          />
        </p>
        <p>
          <label htmlFor="nrKm">Nr Kilometri</label>
          <input
            type="number"
            name="nrKm"
            id="nrKm"
            defaultValue={offer?.nrKm}
          />
        </p>
        {offer && <input type="hidden" name="tipAsigurare" value={tipAsigurare}/>}
      </>
    );
  }else
  return<></>
};

export default DynamicFields;
