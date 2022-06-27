import NewSale from "../sales/new-sale/NewSale.component";
import { SaleData } from "../sales/sale.type";
import SalesByStore from "../sales/sales-by-store/SalesByStore.component";

import styles from "./dashboard.module.scss";

type Props = {
  allSales: SaleData[];
  connectionStatus: string;
  lastSale: SaleData;
  salesByModel: Record<string, SaleData[]>;
  salesByStore: Record<string, SaleData[]>;
};

const Dashboard = ({ salesByStore, lastSale, connectionStatus }: Props) => {
  return (
    <div className={styles.dashboardWrapper}>
      <p className={styles.status} data-testid="Dashboard_status">
        {connectionStatus}
      </p>
      <div className={styles.salesWrapper}>
        {Object.keys(salesByStore).map((store) => {
          if (!store || store === "undefined") return null;
          return (
            <SalesByStore
              key={store}
              storeName={store}
              data={salesByStore[store]}
            />
          );
        })}
      </div>
      {lastSale && <NewSale data={lastSale} />}
    </div>
  );
};
export default Dashboard;
