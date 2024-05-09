import { useUser } from "../../../store";
import { SearchBar } from "../../../components";
import { TabNavigation } from "../../../components/navigation";
import { ViewUsers } from "./ViewUsers";
import { AddUser } from "../../../components/forms";

export const Users = () => {
  // destructure
  const filterUsers = useUser((state) => state.filterUsers);

  return (
    <>
      <section className="relative">
        <div className="flex flex-col items-center justify-stretch">
          <SearchBar onSearch={filterUsers} />
        </div>

        <TabNavigation
          tabs={[
            {
              title: "All Users",
              target: "#add-users",
              content: <ViewUsers />,
            },
            // {
            //   title: "Admin",
            //   target: "#admin",
            //   content: "admin",
            // },
            // {
            //   title: "Users",
            //   target: "#users",
            //   content: "users",
            // },
            // {
            //   title: "Add",
            //   target: "#add",
            //   content: <AddUser />,
            // },
          ]}
        />
      </section>
    </>
  );
};
