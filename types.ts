export interface Card {
  id: number;
  img: string;
  isGuessed: boolean;
  isShowing: boolean;
}

export type Level = "easy" | "medium" | "hard";

export interface CardsLevelInfo {
  level: Level;
  rows: number;
  columns: number;
}
