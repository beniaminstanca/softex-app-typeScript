import { Link } from "react-router-dom";
import "./Table.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const MuiTable: React.FC<{ offers: any[]; counter: number }> = ({ offers }) => {
  const tipAsigurare = useSelector((state: { oferta: { tipAsigurare: [] } }) => state.oferta.tipAsigurare);

  return (
    <div className="mui-table">
      <table>
        <tr>
          <th>Nume</th>
          <th>Prenume</th>
          <th>Tip Asigurare</th>
          <th>Data Nasterii</th>
          <th>Prima</th>
          <th>Edit</th>
        </tr>
        {offers.map((row) => (
          <tr key={row.id}>
            <td>{row.nume}</td>
            <td>{row.prenume}</td>
            <td align="center">{tipAsigurare[row.tipAsigurare]}</td>
            <td>{row.data}</td>
            <td>{row.prima}</td>
            <td>
              <Link to={row.id}>
                <FontAwesomeIcon
                  icon={faEdit}
                  color="#4d4d4e"
                ></FontAwesomeIcon>
              </Link>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default MuiTable;
