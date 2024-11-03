import { redirect } from "@/i18n/routing";
import { useLocale } from "next-intl";

function HomePage() {
  const locale = useLocale();
  redirect({ href: "/login", locale });
}

export default HomePage;
