import { CARD_DOC, MSG_DTO } from "@src/shared/types";
import { useEffect, useState } from "react";
import AllCardScreen from "./components/AllCardScreen";
import EditCardScreen from "./components/EditCardScreen";

const Options = () => {
  const [cards, setCards] = useState<CARD_DOC[]>([]);
  const [card, setCard] = useState<CARD_DOC | null>(null);

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
          console.log("cards", response.data);
          setCards(response.data);
        }
      }
    });
  };

  const findCardByStr = (text: string) => {
    const message: MSG_DTO = { type: "findCard", data: text };
    chrome.runtime.sendMessage(message, (response: MSG_DTO) => {
      console.log(response.data);
    });
  };

  return (
    <div className="h-screen bg-slate-500 w-full">
      {card ? (
        <EditCardScreen
          card={card}
          handleBack={() => {
            setCard(null);
          }}
        />
      ) : (
        <AllCardScreen
          findCardByStr={findCardByStr}
          cards={cards}
          handleClickCard={(card) => {
            setCard(card);
          }}
        />
      )}
    </div>
  );
};

export default Options;
