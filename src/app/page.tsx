import { redirect } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function RootPage() {
  const locale = useLocale();
  redirect({ href: "/login", locale });
}
