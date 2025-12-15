import { TextField, Label, Input } from "react-aria-components";

export default function TextInput({
  label,
  placeholder,
  type,
  ...other
}: {
  label: string;
  type?: "text" | "password" | "email" | "number" | "tel";
  placeholder?: string;
} & React.ComponentProps<typeof TextField>) {
  return (
    <TextField className="items-baseline grid gap-1" {...other}>
      <Label className="block font-medium">{label}</Label>
      <Input
        placeholder={placeholder}
        type={type}
        className="border-b-2 border-base-300 focus-visible:border-light-or p-2 w-full outline-none"
      />
    </TextField>
  );
}
