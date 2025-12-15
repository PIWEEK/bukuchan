import TextInput from "~/ui/text-input";
import Button from "~/ui/button";

export default function LoginForm() {
  return (
    <section className="max-w-md mx-auto grid place-content-center h-full">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <form className="pt-4 grid gap-6 w-md">
        <TextInput label="E-mail" placeholder="jane@example.com" />
        <TextInput label="Password" placeholder="1234pass" type="password" />
        <Button>Login</Button>
      </form>
    </section>
  );
}
