import { useEffect, useState } from "react";

import { SaleData } from "../sale.type";
import { NEW_SALE_CONTENT } from "./new-sale.content";

import styles from "./new-sale.module.scss";
import { replaceStockValues, replaceSubTitleValues } from "./new-sale.utils";

type Props = {
  data: SaleData;
};

const { title, subTitle, stockTitle } = NEW_SALE_CONTENT;

const NewSale = ({ data }: Props) => {
  const [displayNotification, setDisplayNotification] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDisplayNotification(false);
    }, 4000);

    return () => {
      clearTimeout();
      setDisplayNotification(true);
    };
  }, [data]);

  if (!data) return null;
  const { store, model, inventory } = data;

  if (!displayNotification) return null;

  const replacedSubTitle = replaceSubTitleValues({ store, model, subTitle });
  const replacedStockInfo = replaceStockValues({ inventory, stockTitle });
  return (
    <div className={styles.saleWrapper} data-testid="NewSale_wrapper">
      <div className={styles.header}>
        <p className={styles.title} data-testid="NewSale_title">
          {title}
        </p>
        {replacedSubTitle && (
          <p className={styles.subTitle} data-testid="NewSale_subTitle">
            {replacedSubTitle}
          </p>
        )}
      </div>
      {replacedStockInfo && (
        <p className={styles.inventory} data-testid="NewSale_stock">
          {replacedStockInfo}
        </p>
      )}
    </div>
  );
};
export default NewSale;
