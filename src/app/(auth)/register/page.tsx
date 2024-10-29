import Link from "next/link";
import SignUpForm from "../../../components/auth/SignUpForm";

function RegisterPage() {
  return (
    <div className="flex flex-col items-center text-white sm:w-[300px] max-sm:w-full max-sm:px-6">
      <h1 className="text-3xl font-semibold mb-2">Create Account</h1>
      <div className="sm:w-[300px] w-full">
        <SignUpForm />
      </div>
      <div className="flex items-center justify-center gap-2 pt-6">
        <span className="text-sm">Already have an account?</span>
        <Link
          href="/login"
          className="text-regular text-primary hover:text-primaryHover"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
