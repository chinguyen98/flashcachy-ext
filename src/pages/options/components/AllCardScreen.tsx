import { CARD_DOC } from "@src/shared/types";
import { useRef } from "react";

const AllCardScreen = ({
  cards,
  handleClickCard,
  findCardByStr,
}: {
  cards: CARD_DOC[];
  handleClickCard: (card: CARD_DOC) => void;
  findCardByStr: (text: string) => void;
}) => {
  const timeRef = useRef<ReturnType<null | typeof setTimeout>>();

  const handleChange = (val: string) => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }

    timeRef.current = setTimeout(() => {
      findCardByStr(val);
    }, 300);
  };

  return (
    <>
      <div
        style={{ height: "100px" }}
        className="flex justify-center flex-col items-center w-full text-2xl text-white"
      >
        <div>Flashcachy All Cards</div>
        <div>
          <input
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            type="text"
            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            // {...register("username", { required: true })}
          />
        </div>
      </div>
      <div
        style={{ height: "calc(100vh - 100px)" }}
        className="w-full p-1 grid grid-cols-8 gap-4 overflow-auto"
      >
        {cards.map((card) => {
          return (
            <div
              onClick={() => {
                handleClickCard(card);
              }}
              key={card.id}
              className="cursor-pointer h-max block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {card.front}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 break-words whitespace-pre-line">
                {card.back}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllCardScreen;
