import { memo, useState, useCallback } from "react";
import Link from "next/link";
import {
  Form,
  Title,
  SubmitButton,
  PasswordRecoveryLink,
  P,
  AuthLink,
} from "../style";
import { Input } from "../../Input/style";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/actions/authActions";
import translations from "../../../translations/strings/login";
import useTranslation from "../../../hooks/useTranslation";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const credentials = { email, password };
      dispatch(logIn(credentials));
    },
    [email, password]
  );

  // translations
  const { t } = useTranslation();

  return (
    <Form onSubmit={handleSubmit}>
      <Title>{t(translations, "login")}</Title>

      <Input
        type="email"
        aria-label={t(translations, "email")}
        placeholder={t(translations, "email")}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <Input
        type="password"
        aria-label={t(translations, "pass")}
        placeholder={t(translations, "pass")}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      <Link passHref href="/password-recovery">
        <PasswordRecoveryLink>
          {t(translations, "forgotPass")}
        </PasswordRecoveryLink>
      </Link>

      <SubmitButton type="submit">{t(translations, "login")}</SubmitButton>

      <P>
        {t(translations, "noAccount")}{" "}
        <Link passHref href="/signup">
          <AuthLink>{t(translations, "createAccount")}</AuthLink>
        </Link>
      </P>
    </Form>
  );
};

export default memo(LoginForm);
