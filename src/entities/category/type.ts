
export type CategoryType =
  | "GAME"
  | "TRAVEL"
  | "EATING_SHOW"
  | "VIRTUAL"
  | "SPORTS"
  | "MUSIC"
  | "DRAWING"
  | "TALK"
  | "COOKING"
  | "CURRENT_AFFAIRS"
  | "STUDY"
  | "OTHERS";

export interface Category {
  id: number;
  name: string;
  chip: string[];
  type: CategoryType;
  postImage: string;
  streamCount: number;
}



