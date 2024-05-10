import { FaUser } from "react-icons/fa";
import { useUser } from "../../store";
import { useState, useRef } from "react";

import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { ButtonActions } from "../buttons";
import { SelectRoleModal } from "../modal/SelectRole";
import kyle from "../../assets/img/users/kyle.png";
import lore from "../../assets/img/users/lore.png";
import neil from "../../assets/img/users/neil.png";
import yen from "../../assets/img/users/yen.png";
import spence from "../../assets/img/users/spence.png";
import me from "../../assets/img/users/me.png";

export const UsersCards = ({
  name,
  email,
  isActivated,
  viewUser,
  defaultActions,
  Image,
  user,
}) => {
  const toggleActivation = useUser((state) => state.toggleActivation);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const images = shuffleArray([kyle, lore, neil, me, spence, yen]);

  const getNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const currentImage = images[currentImageIndex];

  const getRandomImage = () => {
    return images[Math.floor(Math.random() * images.length)];
  };
  const randomImage = useRef(getRandomImage());

  return (
    <>
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
        <SelectRoleModal user={user} />
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={currentImage}
            alt="Bonnie image"
          />
          <div className="w-80 flex flex-col items-start">
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {name || "name"}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {email || "email"}
            </span>
          </div>
          <div className="flex flex-col w-80 gap-4 mt-4 md:mt-6">
            <ButtonActions
              action={() => toggleActivation(user.id)}
              name={isActivated ? "Enable" : "Disable"}
            >
              Deactivate Account
            </ButtonActions>
            <button
              href="#"
              className="py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Message
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
