import { FaBuilding } from "react-icons/fa";

export const CompanyCard = ({ company_name }) => {
  return (
    <>
      <div className="md:w-full max-w-sm px-8 py-4 mt-16 bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex justify-center -mt-16 md:justify-end">
          {/* <img
                className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400"
                alt="Testimonial avatar"
                src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
              /> */}

          <FaBuilding className="object-cover w-20 h-20 border-2 border-gray-800 rounded-full dark:gray-blue-400 bd-gray-800 text-gray-900" />
        </div>

        {/*
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores
              deserunt ea doloremque natus error, rerum quas odio quaerat nam ex
              commodi hic, suscipit in a veritatis pariatur minus consequuntur!
            </p> */}

        <div className="pt-4 flex flex-col md:flex-row flex-wrap justify-items-center items-center">
          <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
            {company_name}
          </h2>
          <div className="pt-4">
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Edit
            </button>
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
