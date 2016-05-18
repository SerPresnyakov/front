import {Pager} from "../../dao/Pager";
import {Source} from "../../dao/Source";
import {CrudStructConfig} from "./CrudStructConfig";
import {Page} from "../../dao/Page";
import {fieldType} from "../../crudTableModule/src/TableField";

export class CrudStructCtrl {

    static $inject = ["$injector", "$mdEditDialog", "$mdDialog", "$http", "$scope","$stateParams"];

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
        public stateParams
    ){

    }

    init(config) {
        this.config = config;
        this.source = new Source(this.config.dbName, this.config.url, this.inj);
        this.pager = new Pager(1, 15);
        this.refreshPage();
    }

    refreshPage(): void {
        this.source.getStructView()
            .then((res) => {
                this.pager.data = res.data;
            })
    }

    //edit(item) {
    //    let field;
    //    let rels;
    //    this.$mdDialog.show(editDialog(this.config,item,this.source)).then((res)=>this.refreshPage())
    //};


    fieldsNames = ["id", "tableId", "name", "fieldName", "fieldType", "nullable", "hasDefault"]

}