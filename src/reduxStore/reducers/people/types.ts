import { IPeopleItem } from "../../../types";

export interface IPeopleStore {
    people: IPeopleItem[];
    searchValue: string;
} 