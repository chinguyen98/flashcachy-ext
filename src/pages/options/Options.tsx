import React from "react";
import "@pages/options/Options.css";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  username: string;
  front: string;
  back: string;
}

const Options: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log({ data });
  };

  return (
    <div className="w-screen h-screen bg-gray-700 text-white">
      <div className="bg-black before:animate-pulse before:bg-gradient-to-b before:from-gray-900 overflow-hidden before:via-[#00FF00] before:to-gray-900 before:absolute ">
        <div id="myDIV">
          <div className="w-[100vw] h-[100vh] px-3 sm:px-5 flex items-center justify-center absolute">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full sm:w-1/2 lg:2/3 px-6 bg-gray-500 bg-opacity-20 bg-clip-padding backdrop-filter backdrop-blur-sm text-white z-50 py-4  rounded-lg"
            >
              <div className="w-full flex justify-center text-[#00FF00] text-xl mb:2 md:mb-5">
                Flashcachy
              </div>
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block mb-2 text-xs font-medium text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="coliamai"
                  required
                  disabled
                  value={"coliamai"}
                  // {...register("username", { required: true })}
                />
                {errors.username?.type === "required" && (
                  <p role="alert" className="text-red-300">
                    Username is required
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="mt-4 md:mt-10 w-full flex justify-center text-sm md:text-xl bg-[#00FF00] py-2 rounded-md"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
