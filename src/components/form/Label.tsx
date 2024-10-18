import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

const labelVariants =
  "text-xs font-medium leading-none text-primaryGray peer-disabled:cursor-not-allowed peer-disabled:opacity-70 lg:text-xs";

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={`${labelVariants} ${className}`}
    {...props}
  />
));

Label.displayName = LabelPrimitive.Root.displayName;
