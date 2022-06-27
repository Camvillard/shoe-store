import { ChevronDown, Settings, Bell, Star, Repeat } from "react-feather";
import { SALES_MODULE_CONTENT } from "./sales-module.content";

import styles from "./sales-module.module.scss";
import { SalesModuleProps } from "./SalesModule.container";

export type Props = SalesModuleProps & {
  isExpanded: boolean;
  toggleDetails: () => void;
};

const {
  ariaLabelSettings,
  ariaLabelNotifications,
  ariaLabelStar,
  ariaLabelToggleView,
} = SALES_MODULE_CONTENT;

const SalesModule = ({
  moduleTitle,
  children,
  switchViewsBtnLabel,
  switchViews,
  toggleDetails,
  isExpanded,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.header}
        onClick={toggleDetails}
        aria-label={ariaLabelToggleView}
      >
        <span>
          <p className={styles.title}>{moduleTitle}</p>
          <ChevronDown />
        </span>
      </button>
      {isExpanded && (
        <>
          <div className={styles.details} data-testid="SalesModule_details">
            {children}
          </div>
          <div
            className={styles.moduleActions}
            data-testid="SalesModule_actions-wrapper"
          >
            <button className={styles.switchBtn} onClick={switchViews}>
              <span>
                <Repeat size={16} />
                {switchViewsBtnLabel}
              </span>
            </button>
            <div className={styles.actions}>
              <button aria-label={ariaLabelSettings}>
                <Settings size={16} />
              </button>
              <button aria-label={ariaLabelNotifications}>
                <Bell size={16} />
              </button>
              <button aria-label={ariaLabelStar}>
                <Star size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default SalesModule;
