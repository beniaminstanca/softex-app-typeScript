import { createPortal } from "react-dom";
import './Modal.scss'

export default function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: any;
}) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <dialog open className="modal">
        <header>
        <h2>{title}</h2>
        </header>     
        {children}
      </dialog>
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
}