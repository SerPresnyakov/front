import apiUrls from "../../utils/apiUrls";
import {TableField} from "./../../crudTableModule/src/models/TableField";
import {Source} from "../../jsonDAO/src/Source";
import iPageResponse = jsonDAO.iPageResponse;

export class dbAdminConfigBuilder{

    fieldSource: Source<apiAdmin.iField>;
    $q : ng.IQService;

    constructor(inj:ng.auto.IInjectorService){
        this.fieldSource = new Source(apiUrls.admin, "fields", inj);
        this.$q = inj.get<ng.IQService>("$q");
    }

    build(tableName:string){
        let deferred = this.$q.defer<TableField[]>();
        if(typeof tableName != "string"){
            deferred.reject({msg:"tableName is required"})
        } else {
            this.fieldSource.getFullPage([{field:"base.table.url",op:"eq",value:tableName}])
                .then((fields:iPageResponse<apiAdmin.iField>)=>{
                    this.getConfig(fields.data);
                })
        }
        return deferred.promise;
    }

    getConfig(fields:apiAdmin.iField[]){
        fields.forEach((f)=>{
            Object.getOwnPropertyNames(f).forEach(name =>{
                console.log(f[name]);
            })
        })
    }


}