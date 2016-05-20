import {Pager} from "../../dao/Pager";
import {Source} from "../../dao/Source";
import {CrudStructConfig} from "./CrudStructConfig";
import {Page} from "../../dao/Page";
import {fieldType} from "../../crudTableModule/src/TableField";

export class CrudStructCtrl {

    static $inject = ["$injector", "$mdEditDialog", "$mdDialog", "$http", "$scope","$stateParams", "$q"];

    config: CrudStructConfig;

    source: Source;
    pager: Pager;
    fieldsName;

    constructor(
        public inj: ng.auto.IInjectorService,
        public $editDialog: mdTable.EditDialogService,
        public $mdDialog: ng.material.IDialogService,
        private $http:ng.IHttpService,
        public $scope,
        public stateParams,
        public $q: ng.IQService
    ){

    }

    init(config) {
        this.config = config;
        this.source = new Source(this.config.dbName, this.config.url, this.inj);
        this.pager = new Pager(1, 15, this.$q);
        this.refreshPage();
    }

    refreshPage() {
        this.source.getStructView()
            .then((res) => {
                this.pager.data = res.data;
                this.pager.deffered.resolve(res.data)
            })
            .catch(err => this.pager.deffered.reject(err))
    }

    getTableNumb(){
        var res;
        this.pager.data.forEach((table,index)=>{
            if(table.tableName == this.stateParams.name){
                res = index;
            }
        });
        return res;
    }

    //edit(item) {
    //    let field;
    //    let rels;
    //    this.$mdDialog.show(editDialog(this.config,item,this.source)).then((res)=>this.refreshPage())
    //};


    fieldsNames = ["id", "tableId", "name", "fieldName", "fieldType", "nullable", "hasDefault"]

}