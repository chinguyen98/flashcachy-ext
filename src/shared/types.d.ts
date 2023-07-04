export type CARD_DOC = {
  username: string;
  imgUrl?: string;
  front: string;
  back: string;
  created_at: number;
  updated_at: number;
};

export type RES_DATA = {
  errorCode: 1 | 0;
  message?: string;
};
