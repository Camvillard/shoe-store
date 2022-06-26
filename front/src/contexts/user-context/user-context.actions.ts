export type ActionData<T, P> = {
  type: T;
  payload?: P;
};

export enum UserActionsType {
  Login = "Login",
  Logout = "Logout",
}
