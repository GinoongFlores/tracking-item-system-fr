import { AdminUser } from "../../../components/cards/AdminUser";
import { useAdmin } from "../../../store";
import { FaUser } from "react-icons/fa";
import { debounce } from "lodash";
import { UsersCards } from "../../../components/cards";
import { Paginate } from "../../../components/navigation";
import { Loader } from "../../../utils";

export const ViewUsers = () => {
  const { users, loading, currentPage, totalPages, setCurrentPage } =
    useAdmin();
  const toggleActivation = useAdmin((state) => state.toggleActivation);

  return (
    <>
      <div className="flex items-center justify-center flex-wrap gap-4">
        <div>{loading && <Loader />}</div>
        {users.length > 0 ? (
          users.map((user) => (
            <UsersCards
              Image={true}
              key={user.id}
              defaultActions={true}
              user={user}
              email={user.email}
              isActivated={user.is_activated}
              name={`${user.first_name} ${user.last_name}`}
            />
          ))
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <div>
              <p>No Users yet</p>
            </div>
          </div>
        )}

        <Paginate
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChanges={setCurrentPage}
        />
      </div>
    </>
  );
};
