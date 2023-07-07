import { CARD_DOC } from "@src/shared/types";

const AllCardScreen = ({
  cards,
  handleClickCard,
}: {
  cards: CARD_DOC[];
  handleClickCard: (card: CARD_DOC) => void;
}) => {
  return (
    <>
      <div
        style={{ height: "50px" }}
        className="flex justify-center items-center w-full text-2xl text-white"
      >
        Flashcachy All Cards
      </div>
      <div
        style={{ height: "calc(100vh - 50px)" }}
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
