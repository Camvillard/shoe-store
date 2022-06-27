import { useState } from "react";

import { SaleData, SaleModuleView } from "../sale.type";
import SalesModule from "../sales-module/SalesModule.container";

import View from "./View.component";
import { SALES_BY_STORE_CONTENT } from "./sales-by-store.content";

import styles from "./sales-by-store.module.scss";

export type SalesByStoreProps = {
  storeName: string;
  data: SaleData[];
};

const {
  labelViewSales,
  labelViewInventory,
  switchLabelSales,
  switchLabelInventory,
} = SALES_BY_STORE_CONTENT;

const SalesByStore = ({ data, storeName }: SalesByStoreProps) => {
  const [currentView, setCurrentView] = useState(SaleModuleView.Inventory);
  const [switchViewsBtnLabel, setSwitchViewsBtnLabel] =
    useState(switchLabelInventory);
  const [titleDetail, setTitleDetail] = useState(labelViewInventory);
  if (!data) return null;

  const switchViews = () => {
    setCurrentView((prev) => {
      if (prev === SaleModuleView.Inventory) {
        setSwitchViewsBtnLabel(switchLabelInventory);
        setTitleDetail(labelViewSales);
        return SaleModuleView.Sales;
      }
      setSwitchViewsBtnLabel(switchLabelSales);
      setTitleDetail(labelViewInventory);
      return SaleModuleView.Inventory;
    });
  };

  return (
    <SalesModule
      moduleTitle={`${storeName.replace("ALDO", "")} - ${titleDetail}`}
      switchViews={switchViews}
      switchViewsBtnLabel={switchViewsBtnLabel}
    >
      <div className={styles.details}>
        {currentView === SaleModuleView.Inventory ? (
          <View data={data} isInventory />
        ) : (
          <View data={data} isInventory={false} />
        )}
      </div>
    </SalesModule>
  );
};
export default SalesByStore;
