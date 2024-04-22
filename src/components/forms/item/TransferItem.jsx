import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { InputField } from "../..";
import { TransferItemSchema } from "../../../utils";
import { InputSearchUser, InputSearchItem } from "../../fields";
import { useTransfer } from "../../../store";
import { toast } from "react-hot-toast";

export const TransferItem = ({ item }) => {
  const transferItem = useTransfer((state) => state.transferItem);
  const navigate = useNavigate();

  const initialValues = {
    id: "",
    name: "",
    quantity: "",
    message: "",
    receiver_name: "",
    address_to: "",
    number: "",

    receiver_id: "",
    item_ids: [],
  };
  return (
    <>
      <section className="relative min-h-screen">
        <div className="flex flex-col px-6 py-8 lg:py-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-1xl font-bold leading-tight tracking-tighter text-gray-900 md:text-2xl dark:text-white">
              Transfer an Item
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={TransferItemSchema}
              onSubmit={(values, { setSubmitting }) => {
                const dataToSend = {
                  receiver_id: values.receiver_id,
                  item_ids: values.item_ids,
                  message: values.message,
                  address_to: values.address_to,
                };
                console.log(dataToSend);
                setSubmitting(true);
                transferItem(dataToSend)
                  .then(() => {
                    navigate("/items");
                  })
                  .catch((error) => {
                    toast.error(
                      "An error occurred while transferring the item. Please try again."
                    );
                  })
                  .finally(() => {
                    setSubmitting(false);
                  });
              }}
            >
              {({ errors, touched, setFieldValue, values }) => {
                return (
                  <Form action="#" className="space-y-4 md:space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Item Name
                      </label>
                      <InputSearchItem
                        name={"name"}
                        values={values}
                        setFieldValue={setFieldValue}
                      />
                      {errors.name && touched.name ? (
                        <div className="text-red-400 text-sm">
                          {errors.name}
                        </div>
                      ) : null}
                    </div>

                    {/* <div>
                      <label
                        htmlFor="quantity"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Quantity
                      </label>
                      <InputField
                        fieldType={"input"}
                        type={"text"}
                        name={"quantity"}
                        placeholder={"2"}
                      />
                      {errors.quantity && touched.quantity ? (
                        <div className="text-red-400 text-sm">
                          {errors.quantity}
                        </div>
                      ) : null}
                    </div> */}

                    <div>
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Message
                      </label>
                      <InputField
                        fieldType={"textarea"}
                        name="message"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-400 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                        placeholder="Write your thoughts here..."
                        // defaultValue={"An Item"}
                      />
                      {errors.message && touched.message ? (
                        <div className="text-red-400 text-sm">
                          {errors.message}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="receiver_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Receiver's Name
                      </label>
                      <InputSearchUser
                        name={"receiver_name"}
                        setFieldValue={setFieldValue}
                      />

                      {errors.receiver_name && touched.receiver_name ? (
                        <div className="text-red-400 text-sm">
                          {errors.receiver_name}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="address_to"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Receiver's Address
                      </label>
                      <InputField
                        fieldType={"input"}
                        type={"text"}
                        name={"address_to"}
                        placeholder={"We'll use the company receiver's address"}
                      />
                      {errors.address_to && touched.address_to ? (
                        <div className="text-red-400 text-sm">
                          {errors.address_to}
                        </div>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg px-5 me-2 mb-2 text-sm font-medium text-gray-900 dark:text-white focus:outline-none bg-white dark:bg-darker border border-gray-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-100"
                    >
                      Submit
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};
