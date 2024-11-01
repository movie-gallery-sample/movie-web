import { useTranslations } from "next-intl";

import LoginForm from "../../../../components/auth/LoginForm";
import { Link } from "@/i18n/routing";

function LoginPage() {
  const t = useTranslations("Auth");

  return (
    <div className="flex flex-col items-center text-white sm:w-[300px] max-sm:w-full max-sm:px-6">
      <h1 className="text-4xl font-semibold mb-2">{t("Sign in")}</h1>
      <LoginForm />
      <div className="flex items-center justify-center gap-2 pt-6">
        <span className="text-sm">{t("Do not have an account?")}</span>
        <Link
          href="/register"
          className="text-regular text-primary hover:text-primaryHover"
        >
          {t("Sign up")}
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
