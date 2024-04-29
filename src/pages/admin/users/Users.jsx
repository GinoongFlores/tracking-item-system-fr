import { ViewUsers } from "./ViewUsers";
import { Loader } from "../../../utils";
import { Paginate } from "../../../components/navigation";
import { useAdmin } from "../../../store";
import { SearchBar } from "../../../components";

export const CompanyUsers = () => {
  const { loading, filterUsers, currentPage, totalPages, setCurrentPage } =
    useAdmin();
  return (
    <>
      {loading && <Loader />}
      <section className="relative pb-20">
        <div className="flex flex-col items-center">
          <SearchBar onSearch={filterUsers} />
        </div>
        <ViewUsers />
        <Paginate currentPages={currentPage} totalPages={totalPages} onPageChanges={setCurrentPage}/>
      </section>
    </>
  );
};
