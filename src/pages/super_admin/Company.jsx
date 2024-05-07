import { SearchBar } from "../../components";
import { ViewCompany } from "../super_admin";
import { useCompany } from "../../store";
import { TabNavigation } from "../../components/navigation";
// import { AddCompanyPage } from "../../company/AddCompanyPage";

export const Company = () => {
  const filterCompany = useCompany((state) => state.filterCompany);

  return (
    <>
      <section className="relative pb-20">
        <div className="flex flex-col items-center justify-stretch">
          <SearchBar onSearch={filterCompany} />
        </div>
        {/* <ViewCompany /> */}
        <TabNavigation
          tabs={[
            {
              title: "Companies",
              target: "#companies",
              content: <ViewCompany />,
            },
            {
              title: "Add Company",
              target: "#add-company",
              content: "Test add",
            },
            {
              title: "Trashed",
              target: "#trashed",
              content: "Trashed",
            },
          ]}
        />
      </section>
    </>
  );
};
