import { useUser } from "../../../store";
import { UsersCards } from "../../../components/cards";
import { UsersToggleModal } from "../../../components/modal";

export const ViewUsers = () => {
  const { users } = useUser();
  return (
    <>
      <div className="flex flex-wrap gap-4">
        {users.map((user) => (
          <UsersCards
            key={user.id}
            id={user.id}
            // user={
            email={user.email}
            viewUser={
              <UsersToggleModal
                key={user.id}
                id={user.id}
                userRole={user.role_name}
                fullName={`${user.first_name} ${user.last_name}`}
                email={user.email}
                number={user.phone_number}
                company={user.company_name}
              />
            }
            isActivated={user.is_activated}
            name={`${user.first_name} ${user.last_name}`}
          />
        ))}
      </div>
    </>
  );
};
