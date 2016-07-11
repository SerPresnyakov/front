import iTableField = ak.crudTableModule.TableField;
import iTableRel = ak.crudTableModule.filters.iTableRel;
import FieldType = ak.crudTableModule.fieldTypes.FieldType;
import {Const} from "../../const/const";

export class connNameCtrl {

    //static $inject = ["mdDialog", ak.jsonDaoModule.Deps.daoFactoryService, "$q"];

    selectedItem: any;
    searchText: string;
    connSource;
    data;

    constructor(
        public mdDialog: ng.material.IDialogService,
        public daoFactory: ak.jsonDaoModule.iDAOFactoryService,
        public $q:ng.IQService,
        public localStorage: ng.local.storage.ILocalStorageService
    ) {
        this.connSource = this.daoFactory.build("dbConn", Const.admin);
    }

    querySearch(value:string) {

            let defer = this.$q.defer();
            this.connSource.getFullPage([{field:"name",op:"like",value:value}])
                .then((res)=>{defer.resolve(res.data)})
                .catch((err)=>{defer.reject(err)});
            return defer.promise;

        //return this.source.getFullPage()

        //return this.$http.get(this.rel.dao, {
        //    params: {
        //        filter: `name_like_${text}`,
        //
        //    },
        //    headers: {token: this.source.getToken()}
        //}).then((res: any) => res.data.data);
    }

    save(){
        console.log(this.selectedItem);
        this.mdDialog.hide();
        //this.localStorage.set("connName", )
    }
    //
    //cancel(){
    //
    //}

    //finish($event) {
    //    this.origin[this.field.name] = this.selectedItem.id;
    //    let res = {"id":this.origin.id};
    //    res[this.field.name]=this.selectedItem.id;
    //    console.log(res);
    //    this.originSource.update(res);
    //
    //    //this.source.patch(this.origin.id,res);
    //    //this.source.getOne(this.origin.id)
    //    //    .then((res)=>{
    //    //        Helper.assignegValueOfObjElement(res, this.origin);
    //    //    });
    //    this.mdDialog.hide();
    //}
}
