import {getDialog as autocompleteDialog} from "../dialogs/autocompleteDialog/Cmpn"
import {getDialog as createDialog} from "../dialogs/createDialog/Cmpn"
import {getDialog as deleteDialog} from "../dialogs/deleteDialog/Cmpn"
import {getDialog as editDialog} from "../dialogs/editDialog/Cmpn"

import {StrField} from "../fieldTypes/StrField";
import {Filters} from "../filter/Filter";
import {Templater} from "./Templater";

import iCrudTableConfig = crudTable.models.iCrudTableConfig;
import iTableField = crudTable.models.iTableField;
import iSource = jsonDAO.iSource;
import iPager = jsonDAO.iPager;

import {Deps} from "../../../jsonDAO/Deps";
import {Page} from "../../../jsonDAO/src/Page";
import {Pager} from "../../../jsonDAO/src/Pager";

class Ctrl {

    static $inject = ["$mdEditDialog", "$mdDialog", "$http", "$scope", "$q", Deps.daoFactoryService, "$state"];

    config: iCrudTableConfig;

    source: iSource<any>;
    pager: iPager;
    filters;

    constructor(
        public $editDialog: mdTable.EditDialogService,
        public $mdDialog: ng.material.IDialogService,
        private $http: ng.IHttpService,
        public $scope,
        public $q: ng.IQService,
        public daoFactory: jsonDAO.iDAOFactoryService<any>,
        public $state
    ) {
        this.pager = new Pager(1, 15, this.$q);
        //$scope.$watchCollection((scope) => { return scope["vm"].pager; } ,(newVal, oldVal, scope) => {
        //    if (newVal.page!=oldVal.page || newVal.per!=oldVal.per) {
        //        this.refreshPage();
        //    }
        //});
    }

    init(config: iCrudTableConfig) {
        this.config = config;
        this.source = this.daoFactory.build(this.config.tableName, this.config.url);
        this.filters = new Filters(config.fields, config.rels);
        this.refreshPage();
    }

    editProp($event: ng.IAngularEvent, origin: any, fieldName: string) {

        $event.stopPropagation();
        let field: iTableField  = this.config.getField(fieldName);

        let rel = this.config.getRel(fieldName);

        if (field) {

            if (field.formly == "autocomplete") {
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
        console.log(this.filters);
        let filter = this.setFilters();
        this.source.getPage(new Page().setPage(1,15),filter)
            .then((res) => {
                this.pager.data = res.data;
                this.pager.total = 1;
            })
    }

    setFilters():apiAdmin.iFilter[]{
        let res:apiAdmin.iFilter[] = [];
        if(this.filters.hasOwnProperty('model')){
            Object.getOwnPropertyNames(this.filters.model).forEach((f)=>{
                res.push({field:f,op:"eq",value:this.filters.model[f]})
            });

        } else {
            res = [];
        }
        return res;
    }

    refreshResource(origin: any) {
        this.source.getOne(origin.id).then((res) => angular.merge(origin, res))
    }

}

interface CtrlScope extends ng.IScope {
    config: iCrudTableConfig
}

export function CrudTableDirective($compile: ng.ICompileService): ng.IDirective {
    return {
        scope: {
            config:"=",
        },
        controller: Ctrl,
        controllerAs: "vm",
        restrict: "E",
        link: (scope: CtrlScope, elem: ng.IAugmentedJQuery, attrs: any, ctrl: Ctrl) => {
            let templ = new Templater(scope.config, "vm").getTemplate();
            ctrl.init(scope.config);
            elem.html(templ);
            $compile(elem.contents())(scope);
        }
    }
}