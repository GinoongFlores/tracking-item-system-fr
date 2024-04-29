import { useAdmin } from "../../../store";
import { useEffect, useCallback } from "react";
import { AdminUser } from "../../../components/cards/AdminUser";
import { FaUser } from "react-icons/fa";
import { debounce } from "lodash";

export const ViewUsers = () => {
  const { users, toggleActivation, fetchUsers } = useAdmin();

  const debouncedFetchUsers = useCallback(() => {
    const debounced = debounce(fetchUsers, 500);
    debounced();
  }, [fetchUsers]);

  useEffect(() => {
    debouncedFetchUsers();
  }, [debouncedFetchUsers]);

  return (
    <div className="flex flex-wrap gap-4">
      {users.map((user) => (
        <AdminUser
          Image={FaUser}
          key={user.id}
          email={user.email}
          name={`${user.first_name} ${user.last_name}`}
          isDisable={true}
          disableFun={() => toggleActivation(user.id)}
          isActivated={user.is_activated}
        />
      ))}
    </div>
  );
};
