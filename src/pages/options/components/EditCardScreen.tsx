import { CARD_DOC } from "@src/shared/types";

const EditCardScreen = ({
  card,
  handleBack,
}: {
  card: CARD_DOC;
  handleBack: () => void;
}) => {
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
      ></div>
    </>
  );
};

export default EditCardScreen;
