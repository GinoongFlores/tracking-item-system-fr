import { useAdmin } from "../../../store";
import { useEffect } from "react";
import { Paginate } from "../../../components/navigation";
import { SearchBar } from "../../../components";
import { Loader } from "../../../utils";

import { ViewUsers } from "./ViewUsers";

export const AdminUsers = () => {
  const {
    loading,
    fetchUsers,
    filterUsers,
    totalPages,
    currentPage,
    setCurrentPage,
  } = useAdmin();

  useEffect(() => {
    fetchUsers(currentPage);
  }, [fetchUsers, currentPage]);

  return (
    <section className="pb-20">
      {loading && <Loader />}
      <div className="flex flex-col items-center justify-stretch">
        <SearchBar onSearch={filterUsers} />
      </div>
      <ViewUsers />
      <Paginate
        currentPages={currentPage}
        totalPages={totalPages}
        onPageChanges={setCurrentPage}
      />
    </section>
  );
};
