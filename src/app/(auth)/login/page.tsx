import Link from "next/link";
import LoginForm from "../../../components/auth/LoginForm";

function LoginPage() {
  return (
    <div className="flex flex-col items-center text-white sm:w-[300px] w-[88%]">
      <h1 className="text-4xl font-semibold mb-2">Sign in</h1>
      <LoginForm />
      <div className="flex items-center justify-center gap-2 pt-6">
        <span className="text-sm">Do not have an account?</span>
        <Link
          href="/register"
          className="text-regular text-primary hover:text-primaryHover"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
