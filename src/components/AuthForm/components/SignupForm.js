import { memo, useState, useCallback, useContext } from "react";
import Link from "next/link";
import { Form, Title, SubmitButton, P, AuthLink } from "../style";
import { Input } from "../../Input/style";
import translations from "../../../translations/strings/signup";
import useTranslation from "../../../hooks/useTranslation";
import { LocaleContext } from "../../../contexts/locale";
import { useRouter } from "next/router";
import { AuthContext } from "../../../contexts/auth";

const SignupForm = () => {
  // auth
  const { signUp } = useContext(AuthContext);

  // locale
  const { locale } = useContext(LocaleContext);

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const credentials = { username, email, password };
      signUp({
        credentials,
        callback: () => router.push(`/${locale}/register`),
      });
    },
    [username, email, password]
  );

  // translations
  const { t } = useTranslation();

  return (
    <Form onSubmit={handleSubmit}>
      <Title>{t(translations, "createAccount")}</Title>

      <Input
        type="text"
        aria-label={t(translations, "name")}
        placeholder={t(translations, "name")}
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        required
      />

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

      <SubmitButton type="submit">{t(translations, "create")}</SubmitButton>

      <P>
        {t(translations, "haveAccount")}{" "}
        <Link passHref href={`/${locale}/login`}>
          <AuthLink>{t(translations, "login")}</AuthLink>
        </Link>
      </P>
    </Form>
  );
};

export default memo(SignupForm);
