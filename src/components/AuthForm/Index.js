import { memo } from "react";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

const AuthForm = ({ action }) => {
  return action === "login" ? <LoginForm /> : <SignupForm />;
};

export default memo(AuthForm);
