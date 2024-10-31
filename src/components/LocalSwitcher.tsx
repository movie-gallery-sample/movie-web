"use client";

import { cn } from "@/lib/utils";

import { useTransition } from "react";
// import { useTranslation } from "react-i18next";

export default function LocalSwitcher() {
  // const { i18n, t } = useTranslation();
  const [isPending] = useTransition();

  // const currentLanguage = locales[i18n.language as keyof typeof locales];

  const onSelectChange = () => {};

  return (
    <label
      className={cn(
        "relative text-gray-400",
        isPending && "transition-opacity [&:disabled]:opacity-30"
      )}
    >
      <p className="sr-only">label</p>
      <select
        // defaultValue={currentLanguage}
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        onChange={onSelectChange}
        disabled={isPending}
      >
        {/* {locales.map((locale) => (
          <option key={locale} value={locale}>
            {t("locale", { locale })}
          </option>
        ))} */}
      </select>
    </label>
  );
}
