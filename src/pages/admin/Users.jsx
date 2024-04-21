import { useAdmin } from "../../store";
import { useEffect } from "react";
import { AdminUser } from "../../components/cards/AdminUser";
import { FaUser } from "react-icons/fa";

export const ViewUsers = () => {
  const { users, handleToggleActivation, toggleActivation, fetchUsers } =
    useAdmin();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
