import * as React from "react";
import { Input } from "./input";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = React.ComponentProps<typeof Input> & {
  toggleAriaLabel?: string;
};

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className = "",
      toggleAriaLabel = "Toggle password visibility",
      ...props
    },
    ref
  ) => {
    const [show, setShow] = React.useState(false);

    return (
      <div className="relative">
        <Input
          ref={ref}
          // force type to password/text regardless of incoming props.type
          type={show ? "text" : "password"}
          className={`pr-10 ${className}`}
          autoComplete={props.autoComplete ?? "current-password"}
          {...props}
        />
        <button
          type="button"
          aria-label={toggleAriaLabel}
          aria-pressed={show}
          onPointerDown={(e) => e.preventDefault()} // keep input focused
          onClick={() => setShow((s) => !s)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground focus:outline-none"
        >
          {show ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
