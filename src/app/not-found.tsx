import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <main className="not-found">
      <h1>{t("Not found")}</h1>
      <p>
        {t("Unfortunately, we could not find the requested page or resource")}.
      </p>
    </main>
  );
}
