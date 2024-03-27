// import ModalComp from "../../components/flowbite/Modal";
import { Tabs } from "../../components/Tabs";

const companyList = [
  {
    name: "All Company",
    link: "/company",
  },
  {
    name: "Add",
    link: "/company/add",
  },
  {
    name: "Archive",
    link: "/company/archive",
  },
];

export const Company = () => {
  return (
    <>
      <div className="flex flex-col">
        <Tabs tabsList={companyList} />
      </div>
    </>
  );
};
