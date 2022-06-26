import { FormEvent, FocusEvent, useState, useContext } from "react";

import { loginUser } from "../../contexts/user-context/user-context.reducer";
import { UserData } from "../../contexts/user-context/user-context.type";
import { UserContext } from "../../contexts/user-context/UserContextProvider.component";
import Button from "../design-system/button/Button.component";
import { ButtonColor } from "../design-system/button/button.type";
import Input from "../design-system/input/Input.component";

import { LOGIN_FORM_CONTENT } from "./login-form.content";

import styles from "./login-form.module.scss";

const {
  userNameInput,
  keepConnectedInput,
  keepConnectedYes,
  keepConnectedNo,
  loginBtn,
} = LOGIN_FORM_CONTENT;

const LoginForm = () => {
  const [userInformations, setUserInformation] = useState<UserData>({
    userName: "",
    firstName: "",
    keepConnected: false,
  });
  const { dispatch } = useContext(UserContext);

  const submitLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userInformations && dispatch?.(loginUser(userInformations));
  };

  const updateUserInformations = (e: FocusEvent<HTMLInputElement>) => {
    const { target } = e;
    let value: string | boolean = target.value;

    if (target.name === "keepConnected") {
      value = target.value === "yes";
    }

    setUserInformation({
      ...userInformations,
      [target.name]: value,
    });
  };

  return (
    <form onSubmit={submitLogin} className={styles.formWrapper}>
      <Input
        labelContent={userNameInput}
        name="userName"
        type="text"
        placeholder="hermione granger"
        onBlur={updateUserInformations}
      />

      <fieldset>
        <legend>{keepConnectedInput}</legend>
        <div>
          <input
            type="radio"
            name="keepConnected"
            onBlur={updateUserInformations}
            id="yes"
            value="yes"
          />
          <label htmlFor="yes">{keepConnectedYes}</label>
        </div>
        <div>
          <input
            type="radio"
            name="keepConnected"
            onBlur={updateUserInformations}
            id="no"
            value="no"
          />
          <label htmlFor="no">{keepConnectedNo}</label>
        </div>
      </fieldset>
      <Button color={ButtonColor.Green}>{loginBtn}</Button>
    </form>
  );
};
export default LoginForm;
