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
};

export default function Button({
  children,
  variant = "primary",
  to,
  ...other
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  to?: string;
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
      className={`${bgColor} ${textColor} rounded-md p-2`}
      {...other}
    >
      {children}
    </AriaButton>
  );
}
