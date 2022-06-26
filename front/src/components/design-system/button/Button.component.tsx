import React, { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./button.module.scss";
import { ButtonColor } from "./button.type";

type Props = {
  children: ReactNode;
  color?: ButtonColor;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, color = ButtonColor.Gray, ...rest }: Props) => {
  return (
    <button className={`${styles.btnWrapper} ${styles[color]}`} {...rest}>
      {children}
    </button>
  );
};
export default Button;
