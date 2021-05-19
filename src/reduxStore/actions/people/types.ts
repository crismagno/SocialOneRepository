import { IPeopleItem } from "../../../types";
import { IPeopleStore } from "../../reducers/people/types";

export interface IActionsPeople {
    peopleState: IPeopleStore;
    setPeopleOnState: (people: IPeopleItem[]) => void;
    addPeopleOnState: (people: IPeopleItem[]) => void;
    setSearchValue: (searchValue: string) => void;
    updateStatusOnlineOfPerson: (userId: string, status: boolean) => void;
    updateStatusOnlineOfAllPerson: (status: boolean) => void;
};