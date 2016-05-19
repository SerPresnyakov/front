import {Pager} from "../../dao/Pager";
import {CrudTableConfig} from "../../crudTableModule/src/CrudTableConfig";
import {CrudStructConfig} from "./CrudStructConfig";

export class getConfig {

    static get(pager: Pager, tableName): ng.IPromise<any> {


        pager.deffered.promise.then((data) => {

            //code
            return "val"
        })

    }

}