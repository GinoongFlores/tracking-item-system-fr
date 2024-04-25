import { useTransfer } from "../../../store";
import { Loader } from "../../../utils";
import { ViewTransaction } from "./ViewTransaction";
import { SearchBar } from "../../../components";
import { useState, useEffect } from "react";
import { debounce } from "lodash";

export const Transaction = () => {
  const loading = useTransfer((state) => state.loading);
  const filterUserTransferItems = useTransfer(
    (state) => state.filterUserTransferItems
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    const debounceFunc = debounce(filterUserTransferItems, 500);
    debounceFunc(search);
  }, [search, filterUserTransferItems]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="container mx-auto">
      <div className="w-full">
        <SearchBar
          onSearch={(search) => {
            setSearch(search);
          }}
        />
      </div>
      <ViewTransaction />
    </section>
  );
};
