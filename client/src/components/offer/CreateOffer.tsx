import Modal from "../modal/Modal";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../util/auth";
import OfferForm from "../offers/OfferForm";

const CreateOffer = () => {
  const token = getAuthToken();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (token) {
      setShowModal(false);
    }
  }, [token, showModal]);

  const cancelHandler = () => {
    setShowModal(false);
    navigate("/");
  };
  const loginRedirectHandler = () => {
    navigate("/auth?mode=login");
  };
  const onDone = () => {
    setShowModal(false);
    navigate("/");
  };

  let createOfferSwowRoutes;
  if (!token) {
    createOfferSwowRoutes = (
      <Modal title="Not Authenticated!" onClose={onDone}>
        <h3>Poti creea o oferta doar din contul de utilizator</h3>
        <div className="actions">
        <button onClick={cancelHandler}>Cancel</button>
        <button onClick={loginRedirectHandler}>Login</button>
        </div>
      </Modal>
    );
  } else {
    createOfferSwowRoutes =
    <OfferForm  method={"POST"} />
  }

  return <>{createOfferSwowRoutes}</>;
};

export default CreateOffer;
