import { UserItems } from "../../pages/user";
import { Outlet } from "react-router-dom";

export const ItemsLayout = () => {
  return (
    <>
      <div>
        {/* <UserItems /> */}

        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
