import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Button as AriaButton, type PressEvent } from "react-aria-components";

const variants = {
  primary: {
    bgColor: "bg-light-or dark:bg-dark-or",
    textColor: "text-paper dark:text-dark-bg",
  },
  secondary: {
    bgColor: "bg-base-100 dark:bg-base-900",
    textColor: "text-base-900 dark:text-base-200",
  },
  ghost: {
    bgColor:
      "bg-transparent dark:bg-transparent hover:bg-base-100 dark:hover:bg-base-900 disabled:bg-transparent dark:disabled:bg-transparent",
    textColor:
      "text-current dark:text-current disabled:text-base-300 dark:disabled:text-base-700",
  },
};

export default function Button({
  children,
  icon: Icon,
  variant = "primary",
  to,
  className = "",
  ...other
}: {
  children?: React.ReactNode;
  variant?: keyof typeof variants;
  icon?: React.ElementType;
  to?: string;
  className?: string;
} & React.ComponentProps<typeof AriaButton>) {
  const { bgColor, textColor } = variants[variant];
  const navigate = useNavigate();

  const onPress = useCallback(
    (event: PressEvent) => {
      if (to) {
        navigate(to);
      }
      other.onPress?.(event);
    },
    [to, navigate, other]
  );

  return (
    <AriaButton
      onPress={onPress}
      className={`${bgColor} ${textColor} rounded-md p-2 flex gap-1 flex-row items-center ${className}`}
      {...other}
    >
      {Icon ? <Icon className="w-4 h-4" /> : null}
      {children}
    </AriaButton>
  );
}
