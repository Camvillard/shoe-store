import { ReactNode, useState } from "react";
import SalesModule from "./SalesModule.component";

export type SalesModuleProps = {
  moduleTitle: string;
  children: ReactNode;
  switchViewsBtnLabel: string;
  switchViews: () => void;
};
const SalesModuleContainer = ({ children, ...rest }: SalesModuleProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDetails = () => setIsExpanded(!isExpanded);

  if (!children) return null;

  return (
    <SalesModule
      isExpanded={isExpanded}
      toggleDetails={toggleDetails}
      {...rest}
    >
      {children}
    </SalesModule>
  );
};
export default SalesModuleContainer;
