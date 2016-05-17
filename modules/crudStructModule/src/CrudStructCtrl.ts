import {Pager} from "../../dao/Pager";
import {Source} from "../../dao/Source";
import {CrudStructConfig} from "./CrudStructConfig";
import {Page} from "../../dao/Page";

export class CrudStructCtrl {

    static $inject = ["$injector", "$mdEditDialog", "$mdDialog", "$http", "$scope"];

    config: CrudStructConfig;

    source: Source;
    pager: Pager;

    constructor(
        public inj: ng.auto.IInjectorService,
        public $editDialog: mdTable.EditDialogService,
        public $mdDialog: ng.material.IDialogService,
        private $http:ng.IHttpService,
        public $scope
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

}