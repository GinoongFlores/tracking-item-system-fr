import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { InputField } from "../..";
import { ItemSchema } from "../../../utils";
import { useItems } from "../../../store";
// import { Widget } from "@uploadcare/react-widget";
import { useState, useEffect } from "react";
import { ImageUploader } from "../../uploader/ImageUploader";

export const AddItem = () => {
  const addItem = useItems((state) => state.addItem);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <section className="relative">
        <div className="flex flex-col px-6 lg:py-0">
          <div className="space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-1xl font-bold leading-tight tracking-tighter text-gray-900 md:text-2xl dark:text-white">
              Add an Item
            </h1>
            <Formik
              initialValues={{
                image: "",
                name: "",
                description: "",
                quantity: "",
              }}
              validationSchema={ItemSchema}
              onSubmit={(values) => {
                addItem(values);
                navigate("/item");
              }}
            >
              {({ errors, touched, setFieldValue, isSubmitting }) => {
                return (
                  <Form action="#" className="space-y-4 md:space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Item Name
                      </label>
                      <InputField name={"name"} placeholder={"Item name"} />
                      {errors.name && touched.name ? (
                        <div className="text-red-400 text-sm">
                          {errors.name}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="quantity"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Quantity
                      </label>
                      <InputField name={"quantity"} placeholder={"2"} />
                      {errors.quantity && touched.quantity ? (
                        <div className="text-red-400 text-sm">
                          {errors.quantity}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <InputField
                        fieldType={"textarea"}
                        rows="4"
                        name="description"
                        placeholder="Write your thoughts here..."
                        // defaultValue={"An Item"}
                      />
                      {errors.description && touched.description ? (
                        <div className="text-red-400 text-sm">
                          {errors.description}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="image"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Upload image
                      </label>

                      <ImageUploader
                        onUpload={(uuids) => {
                          const uuidString = uuids.join(",");
                          setFieldValue("image", uuidString);
                          console.log(uuidString);
                        }}
                      />
                    </div>

                    <button
                      disabled={isSubmitting}
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
