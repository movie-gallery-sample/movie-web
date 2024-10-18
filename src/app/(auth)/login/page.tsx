import LoginForm from "./LoginForm";

function LoginPage() {
  return (
    <div className="flex flex-col items-center text-white h-[360px] sm:w-[300px] w-[88%]">
      <h1 className="text-4xl font-semibold mb-2">Sign in</h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
