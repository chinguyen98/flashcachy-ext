import { CARD_DOC } from "@src/shared/types";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  username: string;
  front: string;
  back: string;
  imgUrl: string;
}

const EditCardScreen = ({
  card,
  handleBack,
}: {
  card: CARD_DOC;
  handleBack: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    defaultValues: { front: card.front, back: card.back, imgUrl: card.imgUrl },
  });

  const [alertMsg, setAlertMsg] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log({ data });
  };

  return (
    <>
      <div
        style={{ height: "100px" }}
        className="flex justify-center flex-col items-center w-full text-2xl text-white"
      >
        <div>Flashcachy Edit Cards</div>
        <div>
          <button
            onClick={handleBack}
            className="p-2 mt-1 w-full flex justify-center text-sm md:text-xl bg-[#ccc] py-2 rounded-md"
          >
            Back
          </button>
        </div>
      </div>
      <div
        style={{ height: "calc(100vh - 100px)" }}
        className="w-full p-1 grid grid-cols-8 gap-4 overflow-auto"
      >
        {/* <div className="bg-black before:animate-pulse before:bg-gradient-to-b before:from-gray-900 overflow-hidden before:via-[#00FF00] before:to-gray-900 before:absolute "> */}
        <div className="w-full px-3 sm:px-5 flex items-center justify-center absolute">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full sm:w-1/2 lg:2/3 px-6 bg-gray-500 bg-opacity-20 bg-clip-padding backdrop-filter backdrop-blur-sm text-white z-50 py-4  rounded-lg"
          >
            {alertMsg && !alertMsg?.isError && (
              <div className="text-green-300 text-center">{alertMsg.text}</div>
            )}
            {alertMsg && alertMsg?.isError && (
              <div className="text-red-300 text-center">{alertMsg.text}</div>
            )}
            <div className="mb-6">
              <label
                htmlFor="front"
                className="block mb-2 text-xs font-medium text-white"
              >
                Front of card
              </label>
              <textarea
                className="resize-none h-20 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="front"
                {...register("front", { required: true })}
              />
              {errors.front?.type === "required" && (
                <p role="alert" className="text-red-300">
                  Front card info is required!
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="back"
                className="block mb-2 text-xs font-medium text-white"
              >
                Back of card
              </label>
              <textarea
                className="resize-none h-20 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="back"
                {...register("back", { required: true })}
              />
              {errors.back?.type === "required" && (
                <p role="alert" className="text-red-300">
                  Front card info is required!
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="imgUrl"
                className="block mb-2 text-xs font-medium text-white"
              >
                Image Url
              </label>
              <input
                type="text"
                id="imgUrl"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("imgUrl")}
              />
              {/* {errors.username?.type === "required" && (
                  <p role="alert" className="text-red-300">
                    Username is required
                  </p>
                )} */}
            </div>
            <button
              type="submit"
              className="mt-4 md:mt-10 w-full flex justify-center text-sm md:text-xl bg-[#00FF00] py-2 rounded-md"
            >
              Edit
            </button>
          </form>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default EditCardScreen;
