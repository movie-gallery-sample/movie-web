"use client";

import { useTranslations } from "next-intl";

type VariantType = "contained-primary";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "contained" | "outlined";
  color?: "primary" | "white";
  isLoading?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = (props: ButtonProps) => {
  const t = useTranslations("Button");
  const {
    children,
    className,
    variant = "contained",
    color = "primary",
    isLoading,
    type = "button",
    disabled,
    onClick,
  } = props;
  const btnStyles = {
    "contained-primary": "bg-primary text-white hover:bg-primaryHover",
    "outlined-primary":
      "bg-transparent border border-primary text-white hover:bg-primaryHover",
    "outlined-white":
      "bg-transparent border border-white text-white hover:bg-inputColor",
  };

  const variantType = (variant + "-" + color) as VariantType;

  return (
    <button
      className={`flex items-center justify-center gap-1.5 rounded-xl px-5 py-3.5 text-sm font-semibold tracking-[0.006rem] transition-all disabled:cursor-not-allowed disabled:opacity-70 md:px-10 ${btnStyles[variantType]} ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick && onClick}
    >
      {isLoading ? (
        <div className="pl-2">
          <span className="text-regular pl-2">{t("Loading")}...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
