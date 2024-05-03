import { Modal } from "flowbite";
import { ButtonModal } from "../buttons";
import { useEffect, useRef, useState } from "react";

export const Confirmation = () => {
    const modalRef = useRef(null);
    const modal = useRef(null);

    useEffect(() => {
        modal.current = new Modal(modalRef.current) ;
    },[])

    const toggleModal = () => {
        if (modal.current.isVisible()) {
          modal.current.hide();
        } else {
          modal.current.show();
        }
      };

    return (
        <>
        Test
        </>
    )
}