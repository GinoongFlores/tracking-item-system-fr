import { useTransfer } from "../../../store";
import { ViewTransaction } from "./ViewTransaction";
import { SearchBar } from "../../../components";
import { TabNavigation } from "../../../components/navigation";
import { Receive } from "../receives/Receive";
import { TransferItem } from "../../../components/forms";
import { ViewItems } from "../items/ViewItems";

export const Transaction = () => {
  const filterUserTransferItems = useTransfer(
    (state) => state.filterUserTransferItems
  );

  return (
    <section className="container mx-auto pb-20">
      <div className="w-full">
        <SearchBar onSearch={filterUserTransferItems} />
      </div>

      <TabNavigation
        tabs={[
          {
            title: "View Items",
            target: "#add-item",
            content: <ViewItems />,
          },
          {
            title: "Transfer Item",
            target: "#transfer",
            content: <TransferItem />,
          },
          {
            title: "All Transactions",
            target: "#receiving",
            content: <Receive />,
          },
        ]}
      />
    </section>
  );
};
