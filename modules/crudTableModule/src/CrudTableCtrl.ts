import {CrudTableConfig} from "./CrudTableConfig";
import {Source} from "../../dao/Source";
import {Pager} from "../../dao/Pager";

import {getDialog as autocompleteDialog} from "./autocompleteDialog/Cmpn"
import {getDialog as createDialog} from "./createDialog/Cmpn"
import {getDialog as deleteDialog} from "./deleteDialog/Cmpn"
import {getDialog as editDialog} from "./editDialog/Cmpn"

import {StrField} from "./fieldTypes/StrField";
import {Page} from "../../dao/Page";
import {TableField} from "./TableField";
import {Filters} from "./filter/Filter";

export class CrudTableCtrl {

    static $inject = ["$injector", "$mdEditDialog", "$mdDialog", "$http", "$scope", "$q"];

    config: CrudTableConfig;

    source: Source<any>;
    pager: Pager;
    filters;

    constructor(
        public inj: ng.auto.IInjectorService,
        public $editDialog: mdTable.EditDialogService,
        public $mdDialog: ng.material.IDialogService,
        private $http:ng.IHttpService,
        public $scope,
        public $q: ng.IQService
    ) {
        $scope.$watchCollection(function(scope) { return scope["vm"].pager;} ,(newVal, oldVal, scope)=>{
            if(newVal.page!=oldVal.page || newVal.per!=oldVal.per){
                this.refreshPage();
            }
        });
        this.pager = new Pager(1, 15, this.$q);
    }

    init(config: CrudTableConfig) {
        this.config = config;
        this.source = new Source(this.config.url, this.config.tableName, this.inj);
        this.filters = new Filters(config.fields, config.rels);
        this.refreshPage();
    }

    editProp($event: ng.IAngularEvent, origin: any, fieldName: string) {

        $event.stopPropagation();
        let field: TableField  = this.config.getField(fieldName);

        let rel = this.config.getRel(fieldName);

        if (field) {

            if (field.formly=="autocomplete") {
                this.$mdDialog.show(autocompleteDialog($event, field, origin, rel, this.$mdDialog, this.source))
            } else if (field.formly=="input") {

                this.$editDialog.small({
                    modelValue: origin[fieldName],
                    type: "text",
                    targetEvent: $event,
                    save: (ctrl: ng.INgModelController) => {
                        origin[fieldName] = ctrl.$modelValue;
                        console.log(ctrl.$modelValue,fieldName);
                        let res = {};
                        res[fieldName] = ctrl.$modelValue;
                        this.source.update(res);
                    },
                    placeholder: field.title
                })

            } else {
                console.log('Unsupported field type', field.fieldType,StrField)
            }

        } else {
            console.error(`Field '${fieldName}' not configured`)
        }

    }

    onPaginate(page: any, limit: any) {
        this.refreshPage();
    }

    onChange(item,id,name){
        console.log(item,id,name);
        let res = {};
        res[name] = item;
        this.source.update(res);
    }

    create($event: ng.IAngularEvent) {
        this.$mdDialog.show(createDialog($event, this.config)).then((res)=>this.refreshPage())
    }

    edit(item) {
        let field;
        let rels;
        this.$mdDialog.show(editDialog(this.config,item,this.source)).then((res)=>this.refreshPage())
    };

    delete(item) {
        this.$mdDialog.show(deleteDialog(this.$mdDialog,item.name)).then((res)=> {
            this.source.remove(item)
                .then((res)=> {
                    if (res) {
                        this.$mdDialog.hide();
                        this.refreshPage()
                    }
                });
        });
    };

    refreshPage(): void {
        this.source.getPage(new Page().setPage(this.pager.page, this.pager.per), this.filters)
            .then((res) => {
                this.pager.data = res;
                this.pager.total = 1;
            })
    }

    refreshResource(origin: any) {
        this.source.getOne(origin.id).then((res) => angular.merge(origin, res))
    }

}