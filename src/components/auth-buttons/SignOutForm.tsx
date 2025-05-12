import { signOut } from "@/actions/sign-out";
import SignOutBttn from "./SignOutBttn";

export default function SignOutForm() {
  return (
    <form action={signOut}>
      <SignOutBttn />
    </form>
  );
}
