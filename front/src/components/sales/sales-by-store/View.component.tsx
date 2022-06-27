import { SalesByStoreProps } from "./SalesByStore.component";
import { SALES_BY_STORE_CONTENT } from "./sales-by-store.content";

import styles from "./sales-by-store.module.scss";

type Props = Pick<SalesByStoreProps, "data"> & { isInventory: boolean };

const { lastUpdate } = SALES_BY_STORE_CONTENT;

const View = ({ data, isInventory }: Props) => {
  return (
    <>
      {data.map((d, idx) => (
        <div
          className={styles.detailLine}
          key={`${d.model}-${d.inventory}-${idx}`}
          data-testid="View_detailLine"
        >
          <p className={styles.model}>{d.model}</p>
          <p className={styles.inventory} data-testid="View_inventory">
            {/* sales are calculated on a fake inventory of 100 */}
            {isInventory ? d.inventory : 100 - d.inventory}
          </p>
          <p className={styles.date}>
            {lastUpdate} {d.date}
          </p>
        </div>
      ))}
    </>
  );
};

export default View;
