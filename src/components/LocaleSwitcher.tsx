"use client";

import { useLocale, useTranslations } from "next-intl";
import * as Select from "@radix-ui/react-select";

import { ChevronDownIcon } from "lucide-react";
import React, { useTransition } from "react";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/routing";
import { locales } from "@/lib/constants";
import Image from "next/image";

const SelectItem = React.forwardRef<
  React.ElementRef<typeof Select.Item>,
  React.ComponentPropsWithoutRef<typeof Select.Item>
>(({ children, className, ...props }, forwardedRef) => {
  const t = useTranslations("LocaleSwitcher");

  return (
    <Select.Item
      className={cn("SelectItem gap-1 items-center", className)}
      {...props}
      ref={forwardedRef}
    >
      <Image
        src={`https://flagcdn.com/16x12/${t("flag", {
          locale: props.value,
        })}.png`}
        alt={props.value}
        width={16}
        height={12}
      />
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
});

SelectItem.displayName = "SelectItem";

export default function LocaleSwitcher() {
  const [, startTransition] = useTransition();
  const t = useTranslations("LocaleSwitcher");
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const locale = useLocale();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      router.replace({ pathname, params }, { locale: nextLocale });
    });
  }

  return (
    <Select.Root onValueChange={onSelectChange}>
      <Select.Trigger
        className="SelectTrigger absolute z-10 right-0 top-0 mr-6 mt-6 md:mr-10 md:mt-6"
        aria-label="Language"
      >
        <Image
          src={`https://flagcdn.com/16x12/${t("flag", {
            locale,
          })}.png`}
          alt={locale}
          width={16}
          height={12}
        />
        <Select.Value placeholder={t("locale", { locale })} />
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon size={14} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="SelectContent z-20">
          <Select.Viewport className="SelectViewport">
            <Select.Group>
              <Select.Label className="SelectLabel">
                {t("Language")}
              </Select.Label>

              {locales.map((cur) => (
                <SelectItem key={cur} value={cur}>
                  {t("locale", { locale: cur })}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
