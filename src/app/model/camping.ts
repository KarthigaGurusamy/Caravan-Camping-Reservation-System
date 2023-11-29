import { FileType } from "./FileType";

export interface Camping {
  id: number;
  campingName: String;
  description: String;
  photo?: FileType;
}
