import { Button as AriaButton } from "react-aria-components";

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
  ...other
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
} & React.ComponentProps<typeof AriaButton>) {
  const { bgColor, textColor } = variants[variant];

  return (
    <AriaButton className={`${bgColor} ${textColor} rounded-md p-2`} {...other}>
      {children}
    </AriaButton>
  );
}
