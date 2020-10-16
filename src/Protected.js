import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/auth";
import { LocaleContext } from "./contexts/locale";

const Protected = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { locale } = useContext(LocaleContext);

  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push(`/${locale}/login`);
    }
  }, [user]);

  return children;
};

export default Protected;
