import { Modal } from "flowbite";
import { useEffect, useRef, useMemo } from "react";

export const useModal = (customOptions = {}) => {
  const modalRef = useRef(null);
  const modal = useRef(null);

  const options = useMemo(() => {
    const defaultOptions = {
      placement: "bottom-right",
      backdrop: "dynamic",
      backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
      closable: true,
    };
    return {
      ...defaultOptions,
      ...customOptions,
    };
  }, [customOptions]);

  useEffect(() => {
    modal.current = new Modal(modalRef.current, options);
  }, [options]);

  // const modal = new Modal(modalRef.current, options);
  return { modal, modalRef };
};
