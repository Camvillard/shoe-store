import React, { InputHTMLAttributes } from "react";

import styles from "./input.module.scss";

type Props = { labelContent: string } & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ labelContent, ...rest }: Props) => {
  return (
    <label className={styles.labelWrapper}>
      <span>{labelContent}:</span>
      <input className={styles.inputWrapper} {...rest} />
    </label>
  );
};
export default Input;
