import { useItems } from "../../../store";
import { ButtonLink } from "../../buttons";
import { ItemCard } from "../../cards";
import { EditItem } from "../../modal";
import { useEffect } from "react";
import { Loader } from "../../../utils";
import { Paginate } from "../../navigation";
import { UserRole } from "../../../hooks";

export const ViewItems = () => {
  const userRole = UserRole();
  const user = userRole === "user";
  const {
    fetchUserItem,
    itemData,
    loading,
    setCurrentPage,
    totalPages,
    currentPage,
  } = useItems();

  useEffect(() => {
    if (itemData.length === 0) {
      fetchUserItem(currentPage);
    }
  }, [fetchUserItem, itemData.length, currentPage]);

  return (
    <div className="flex flex-col gap-4">
      {itemData.length > 0 ? (
        <>
          {loading && <Loader />}
          {itemData.map((item) => (
            <ItemCard key={item.id} {...item} isEdit={true} isDelete={true} />
          ))}
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChanges={setCurrentPage}
          />
        </>
      ) : (
        <div
          className={`gap-4 flex flex-col items-center justify-center text-black dark:text-white min-h-screen
        }`}
        >
          <div className="flex flex-col items-center justify-center">
            <span className="mb-4">No items yet...</span>
            {/* <div>
                <ButtonLink name={"Add Item"} redirect={"/item/add"} />
              </div> */}
          </div>
        </div>
      )}
    </div>
  );
};