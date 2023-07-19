import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Fetcher } from "../../lib/Fetcher";
import DogFinder from "../dog-finder/DogFinder";
import TextInput from "../form/TextInput";
import Logo from "../Logo";
import SecondaryButton from "../SecondaryButton";

interface Inputs {
  name: string;
  email: string;
}
// This is the auth page, returns a login form when not logged in, and the dog finder page when logged in
// I would normally do this as a wrapper with children and manage the login state with a state management library, or an HTTPS cookie
// for this assignment, I'm just going to do it as a component so that I can manage the auth state without a state management library like redux or recoil
function AuthLayout() {
  //state
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const login: SubmitHandler<Inputs> = async (data) => {
    setLoginLoading(true);
    setLoginError(null);
    const payload = {
      name: data.name,
      email: data.email,
    };
    await Fetcher.post("/auth/login", payload)
      .then((res) => {
        if (res.status === 200) {
          setLoggedIn(true);
        } else {
          setLoginError("We couldn't log you in. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
        setLoginError("We couldn't log you in. Please try again.");
      })
      .finally(() => {
        setLoginLoading(false);
        reset();
      });
  };

  if (!loggedIn) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <section className="bg-orange-500 text-white flex flex-col items-center justify-center p-8 rounded-xl shadow-2xl space-y-2">
          <Logo light />
          <form className="w-full space-y-4" onSubmit={handleSubmit(login)}>
            <TextInput
              id={"name"}
              label={"Name"}
              register={register}
              registerOptions={{
                required: "Name is required",
              }}
              placeholder={"John Doe"}
              errors={errors}
              light
              className="w-full"
            />
            <TextInput
              id={"email"}
              label={"Email"}
              register={register}
              registerOptions={{
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email.",
                },
              }}
              placeholder={"johndoe@gmail.com"}
              errors={errors}
              light
              className="w-full"
            />
            <div className="w-full md:w-1/2 mx-auto pt-4">
              <SecondaryButton type="submit" loading={loginLoading}>
                Log In
              </SecondaryButton>
            </div>
            {loginError && (
              <p className="text-red-100 text-sm text-center">{loginError}</p>
            )}
          </form>
        </section>
      </div>
    );
  } else {
    return (
      <>
        <DogFinder setLoggedIn={setLoggedIn} />
      </>
    );
  }
}

export default AuthLayout;
