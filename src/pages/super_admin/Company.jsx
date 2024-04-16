import { SearchBar } from "../../components";
import { ViewCompany } from "../super_admin";

export const Company = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-stretch">
        <SearchBar />
      </div>
      <ViewCompany />
    </>
  );
};
