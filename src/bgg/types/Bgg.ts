export type BGG_LIST_GAMES = {
  name: string;
  id: string;
  yearpublished: string;
};

export type BGG_RES = {
  data: BGG_LIST_GAMES[];
};
