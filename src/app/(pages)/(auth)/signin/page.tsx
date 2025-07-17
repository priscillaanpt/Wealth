import OauthButton from "./components/oauth-button";
import SignInForm from "./components/signinForm";

export default async function SignIn(props: {
  searchParams?: Promise<{
    error?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const error = searchParams?.error ?? "";

  return (
    <div className="w-1/2">
      <div className="mb-4">
        <h1 className="text-h1 text-blacknavy">WELCOME TO WEALTH</h1>
        <p className="text-b1 text-whitenavy">
          Sign in and start managing your wealth account.
        </p>
      </div>
      <div>
        <SignInForm error={error} />
      </div>
      <div className="mt-5 mb-3 flex w-full items-center">
        <p className="px-4 text-sm text-gray-500">or sign-in using</p>
        <hr className="flex-grow border-t border-gray-300" />
      </div>
      <div>
        <OauthButton
          provider="google"
          iconSrc="/images/auth/google.svg"
          text="Sign In with Google"
        />
      </div>
    </div>
  );
}
