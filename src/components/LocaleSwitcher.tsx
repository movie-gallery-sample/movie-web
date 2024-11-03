"use client";

import { useLocale, useTranslations } from "next-intl";
import * as Select from "@radix-ui/react-select";

import { ChevronDownIcon } from "lucide-react";
import React, { useTransition } from "react";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/routing";
import { locales } from "@/lib/constants";

const SelectItem = React.forwardRef<
  React.ElementRef<typeof Select.Item>,
  React.ComponentPropsWithoutRef<typeof Select.Item>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={cn("SelectItem", className)}
      {...props}
      ref={forwardedRef}
    >
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
        className="SelectTrigger absolute z-10 right-0 top-0 mr-10 mt-6"
        aria-label="Language"
      >
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
                  {/* {cur.toUpperCase()} */}
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
