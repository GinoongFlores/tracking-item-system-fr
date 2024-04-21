import { UserItems } from "../../pages/user";
import { Outlet } from "react-router-dom";

export const ItemsLayout = () => {
  return (
    <>
      <div className="text-dark dark:text-white">
        {/* <UserItems /> */}

        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
