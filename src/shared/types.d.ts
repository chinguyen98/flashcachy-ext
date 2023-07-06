export type CARD_DOC = {
  id?: string;
  username: string;
  imgUrl?: string;
  front: string;
  back: string;
  created_at: number;
  updated_at: number;
};

export type MSG_DTO = {
  type: "addCard" | "getAllCard";
  data?: any;
  errorCode?: 1 | 0;
};
