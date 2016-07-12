import {Const} from "../const/const";

export function getDbId(localStorage: ng.local.storage.ILocalStorageService):number{
   return JSON.parse(localStorage.get<string>("connName")).dbId
}