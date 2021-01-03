import { memo, useState, useCallback, useContext } from "react";
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
import translations from "../../../translations/strings/login";
import useTranslation from "../../../hooks/useTranslation";
import { LocaleContext } from "../../../contexts/locale";
import { useRouter } from "next/router";
import { AuthContext } from "../../../contexts/auth";

const LoginForm = () => {
  // auth
  const { logIn } = useContext(AuthContext);

  // locale
  const { locale } = useContext(LocaleContext);

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const credentials = { email, password };
      logIn({ credentials, callback: () => router.push(`/${locale}`) });
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
        <Link passHref href={`/${locale}/signup`}>
          <AuthLink>{t(translations, "createAccount")}</AuthLink>
        </Link>
      </P>
    </Form>
  );
};

export default memo(LoginForm);
