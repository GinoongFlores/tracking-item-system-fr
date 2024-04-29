import { AdminUser } from "../../../components/cards/AdminUser";
import { useAdmin } from "../../../store";
import { FaUser } from "react-icons/fa";

export const ViewUsers = () => {
  const users = useAdmin((state) => state.users);
  const toggleActivation = useAdmin((state) => state.toggleActivation);

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
