import {Const} from "../const/const";

export function getDbId($q:ng.IQService, daoFactory: ak.jsonDaoModule.iDAOFactoryService):ng.IPromise<number>{
    let dbId = $q.defer<number>();
    daoFactory
        .build<ak.apiAdminModule.iDbConn>("dbConn", ak.utils.ApiUrls.admin)
        .getOne([{field:"base.name", op:"eq", value:Const.connName}])
        .then((res:ak.apiAdminModule.iDbConn)=>{console.log("dbId: ",res.dbId);dbId.resolve(res.dbId)})
        .catch((err)=>dbId.reject({ msg:"Can't resolve tables", err: err }));
    return dbId.promise;
}