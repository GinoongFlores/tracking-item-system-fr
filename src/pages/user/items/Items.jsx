import { SearchBar } from "../../../components";
import { ButtonLink } from "../../../components/buttons";
import { ViewItems } from "./ViewItems";
import { useItems } from "../../../store";
import { Loader } from "../../../utils";
import { Paginate } from "../../../components/navigation";

export const UserItems = () => {
  const { filterUserItem, loading, setCurrentPage, totalPages, currentPage } =
    useItems();

  return (
    <>
      {loading && <Loader />}
      <section className="container max-w-[800px] px-4 mx-auto text-darker dark:text-white pb-20">
        <div className="flex items-center justify-end">
          <ButtonLink name={"Archive"} redirect={"/item/trashed"} />
          <ButtonLink name={"Add Item"} redirect={"/item/add"} />
          <ButtonLink name={"Transfer Item"} redirect={"/item/transfer"} />
        </div>
        <div className="w-full">
          <SearchBar onSearch={filterUserItem} />
        </div>
        {/* card items */}
        <ViewItems />
        <Paginate
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChanges={setCurrentPage}
        />
      </section>
    </>
  );
};
