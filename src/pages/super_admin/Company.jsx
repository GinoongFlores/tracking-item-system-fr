import { SearchBar } from "../../components";
import { ViewCompany } from "../super_admin";
import { useCompany } from "../../store";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { Loader } from "../../utils";

export const Company = () => {
  const { filterCompany, loading, companies } = useCompany();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const debouncedFilterCompany = debounce(filterCompany, 500);
    debouncedFilterCompany(search);
  }, [search, filterCompany]);

  return (
    <>
      {loading && <Loader />}
      <div className="flex flex-col items-center justify-stretch">
        <SearchBar
          onSearch={(search) => {
            setSearch(search);
          }}
        />
      </div>
      {companies.length === 0 && <p>No item found</p>}
      <ViewCompany />
    </>
  );
};
