import { CARD_DOC, MSG_DTO } from "@src/shared/types";
import { useEffect, useState } from "react";

const Options = () => {
  const [cards, setCards] = useState<CARD_DOC[]>([]);

  useEffect(() => {
    getAllCards();
  }, []);

  const getAllCards = () => {
    const getAllCardMessage: MSG_DTO = {
      type: "getAllCard",
    };

    chrome.runtime.sendMessage(getAllCardMessage, (response: MSG_DTO) => {
      if (response) {
        if (response.errorCode === 0 && response.type === "getAllCard") {
          setCards(response.data);
        }
      }
    });
  };

  console.log({ cards });

  return (
    <div className="h-screen bg-slate-500 w-full">
      <div
        style={{ height: "50px" }}
        className="flex justify-center items-center w-full text-2xl text-white"
      >
        Flashcachy Cards
      </div>
      <div
        style={{ height: "calc(100vh - 50px)" }}
        className="w-full p-1 grid grid-cols-8 gap-4 overflow-auto"
      >
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              className="h-max block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
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
    </div>
  );
};

export default Options;
