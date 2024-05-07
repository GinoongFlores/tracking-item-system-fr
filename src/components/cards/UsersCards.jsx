import { FaUser } from "react-icons/fa";
import { useUser } from "../../store";
import { useState, useRef } from "react";

import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { ButtonActions } from "../buttons";
import { SelectRoleModal } from "../modal/SelectRole";

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

  return (
    <>
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
        <SelectRoleModal user={user} />
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="/docs/images/people/profile-picture-3.jpg"
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

// export const TestCar = ({
//   name,
//   email,
//   isActivated,
//   id,
//   viewUser,
//   defaultActions,
//   Image,
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleActivation = useUser((state) => state.toggleActivation);

//   return (
//     <div className="shadow-xl max-w-3xl visible h-full px-4 w-full flex flex-col items-center bg-white border border-gray-200 rounded-lg md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
//       <div className="grid grid-cols-3 grid-flow-row-dense w-full relative">
//         <div className="flex gap-4 col-span-2">
//           <div className="flex flex-col place-self-center">
//             {Image && (
//               <FaUser
//                 className="object-cover w-full h-12 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
//                 alt="item image"
//               />
//             )}

//             {/* <span className="text-center text-sm text-black dark:text-white">
//               Date & time
//             </span> */}
//           </div>

//           <div className="flex flex-col py-4 leading-normal text-gray-900 dark:text-white">
//             <h5 className="mb-2.5 text-md md:text-lg lg:text-2xl font-bold tracking-tight ">
//               {name || "name"}
//             </h5>
//             <span className="mb-3 font-normal">{email || "email"}</span>
//           </div>
//         </div>

//         <div className="place-self-center">
//           <button onClick={() => setIsExpanded(!isExpanded)}>
//             {isExpanded ? (
//               <FaArrowAltCircleUp className="w-full object-cover h-6 text-gray-500 dark:text-gray-400" />
//             ) : (
//               <FaArrowAltCircleDown className="w-full object-cover h-6 text-gray-500 dark:text-gray-400" />
//             )}
//           </button>
//         </div>
//       </div>
//       {/* actions */}
//       {isExpanded && (
//         <div
//           className={`gap-2 flex w-full justify-end transition-all duration-300 ease-in-out ${
//             isExpanded ? "opacity-100 " : "opacity-0 "
//           }`}
//         >
//           {defaultActions && (
//             <>
//               <ButtonActions
//                 // action={() => deleteUserItem(id)}
//                 name={"Delete"}
//               />

//               <ButtonActions
//                 name={isActivated ? "Enable" : "Disable"}
//                 action={() => toggleActivation(id)}
//               />
//               <ButtonActions
//                 // action={() => restoreUserTrashedItem(id)}
//                 name={"View"}
//               />
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };
