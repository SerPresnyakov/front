import apiUrls from "../../utils/apiUrls";

import iPageResponse = jsonDAO.iPageResponse;
import iSource = jsonDAO.iSource;
import {Deps} from "../../../jsonDAO/Deps"
import iTableField = crudTable.models.iTableField;

export class dbAdminConfigBuilder{

    fieldSource: iSource<apiAdmin.iField>;
    $q : ng.IQService;

    constructor(inj:ng.auto.IInjectorService){
        this.fieldSource = inj.get<jsonDAO.iDAOFactoryService<apiAdmin.iField>>(Deps.daoFactoryService)
            .build("fields", apiUrls.admin);
        this.$q = inj.get<ng.IQService>("$q");
    }

    build(tableName:string) {
        let deferred = this.$q.defer<iTableField[]>();
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

    getConfig(fields:apiAdmin.iField[]) {
        fields.forEach((f) => {
            Object.getOwnPropertyNames(f).forEach(name =>{
                console.log(f[name]);
            })
        })
    }


}