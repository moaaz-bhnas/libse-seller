import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "./contexts/auth";
import { LocaleContext } from "./contexts/locale";
import useUpdateEffect from "./hooks/useUpdateEffect";

const Protected = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { locale } = useContext(LocaleContext);

  const router = useRouter();
  useUpdateEffect(() => {
    if (!user) {
      router.push(`/${locale}/login`);
    }
  }, [user]);

  return children;
};

export default Protected;
