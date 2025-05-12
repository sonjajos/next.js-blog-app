import { signInWithGitHub, signInWithGoogle } from "@/actions/sign-in";
import GitHubSignInBttn from "@/components/auth-buttons/GitHubSignInBttn";
import GoogleSignInBttn from "@/components/auth-buttons/GoogleSignInBttn";

export default function AuthForm() {
  return (
    <div className="flex flex-col items-center justify-center p-[2px] w-full min-w-[300px]">
      <div className="flex flex-col gap-4 bg-background p-8 w-full items-center justify-center flex-1">
        <form action={signInWithGitHub} className="w-full flex items-center justify-center">
          <GitHubSignInBttn />
        </form>

        <form action={signInWithGoogle} className="w-full flex items-center justify-center">
          <GoogleSignInBttn />
        </form>
      </div>
    </div>
  );
}
