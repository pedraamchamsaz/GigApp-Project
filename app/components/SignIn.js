"use client";

import { Toaster, toast } from 'sonner'

const SignIn = ({setAuthProcess, submitHandler}) => {
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("Signing in user")
      await submitHandler(e);

    } catch (error) {
      console.error(error);
      toast.warning("Wrong username or password.")
      console.error("Failure signing in user");
    }
  };

  const handleSignUp = () => {
    setAuthProcess(true);
    console.log("Sign Up");
  };

  return (
    <div className="h-1/2 sm:w-[27%] rounded-md bg-gray-200 shadow-lg shadow-black">
      
      <form
        onSubmit={handleLogin}
        className="flex h-full w-full gap-6 justify-center items-center"
      >
        
        <div className="flex w-full flex-col justify-center items-center">
          {/* Username */}
          <div className="flex flex-col w-full h-1/2 items-center p-2">
            <p className="text-center mb-6 text-xl sm:text-2xl font-bold">Welcome back.</p>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="h-12 w-3/4 sm:w-[55%] text-center bg-white rounded-full border border-black shadow-md shadow-gray-600"
            />
          </div>
          {/* Passwords */}
          <div className=" flex flex-col w-full mb-6 items-center p-2">
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="h-12 w-3/4 sm:w-[55%] text-center bg-white rounded-full border border-black shadow-md shadow-gray-600"
            />
          </div>

          {/* Authorisation */}
          <div className="w-full flex items-center flex-col gap-4">
            <button className="bg-[#13C3B5] font-semibold text-white h-10 sm:w-1/2 w-1/2 rounded-full hover:text-white hover:bg-[#534A4A] focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 transition-all duration-300 ease-in-out">
              Login
            </button>
            
            <a className="font-semibold text-[#13C3B5] hover:text-black ml-2" onClick={handleSignUp}><p className="text-gray-800 sm:inline font-normal">No account? </p>Create Your Account</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
