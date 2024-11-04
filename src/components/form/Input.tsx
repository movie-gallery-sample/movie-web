import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          maxLength={type === "password" ? 20 : undefined}
          minLength={type === "password" ? 8 : undefined}
          color={props.color}
          className={cn(
            "flex h-11 w-full rounded-[10px] bg-inputColor px-3 py-1 text-sm text-white text-truncate shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            "focus-visible:ring-1 focus-visible:ring-ring",
            className
          )}
          ref={ref}
          {...props}
        />

        {type === "password" && (
          <button
            className="absolute top-0 right-0 translate-y-3/4 px-3"
            onClick={(event) => {
              event.preventDefault();
              setShowPassword((prevState) => !prevState);
            }}
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
