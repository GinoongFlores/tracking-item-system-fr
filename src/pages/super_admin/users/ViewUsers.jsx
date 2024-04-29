import { useUser } from "../../../store";
import { UsersCards } from "../../../components/cards";
import { UsersToggleModal } from "../../../components/modal";
import { DefaultCard } from "../../../components/cards";

export const ViewUsers = () => {
  const { users } = useUser();

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {users.map((user) => (
          <UsersCards
            Image={true}
            key={user.id}
            defaultActions={true}
            user={user}
            email={user.email}
            isActivated={user.is_activated}
            name={`${user.first_name} ${user.last_name}`}
          />
        ))}
      </div>
    </>
  );
};
