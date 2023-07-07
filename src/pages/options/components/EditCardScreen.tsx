import { CARD_DOC } from "@src/shared/types";

const EditCardScreen = ({
  card,
  handleBack
}: {
  card: CARD_DOC;
  handleBack: () => void;
}) => {
  return (
    <>
      <div
        style={{ height: "50px" }}
        className="flex justify-center items-center w-full text-2xl text-white"
      >
        Flashcachy Card Edit
      </div>
      <div
        style={{ height: "calc(100vh - 50px)" }}
        className="w-full p-1 grid grid-cols-8 gap-4 overflow-auto"
      ></div>
    </>
  );
};

export default EditCardScreen;
