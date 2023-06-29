import SignupForm from '@/features/auth/SignupForm';
const Signup: React.FC = () => {
  return (
    <div
      className="w-full max-w-xl box-border h-screen my-0 mx-auto flex justify-center
    items-center"
    >
      <SignupForm />
    </div>
  );
};

export default Signup;
