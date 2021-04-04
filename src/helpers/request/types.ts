export interface IRequestApi {
    route: string; 
    body?: Object;
    method?: "GET" | "POST" | "PUT" | "DELETE"; 
    othersHeaders?: Object;
    authorization?: Boolean ;
};