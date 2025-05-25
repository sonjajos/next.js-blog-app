import { signOut } from '@/actions/sign-out';
import SignOutBttn from './SignOutBttn';

interface SignOutFormProps {
  className?: string;
  textStyle?: string;
}

export default function SignOutForm(props: SignOutFormProps) {
  return (
    <form action={signOut}>
      <SignOutBttn {...props} />
    </form>
  );
}
