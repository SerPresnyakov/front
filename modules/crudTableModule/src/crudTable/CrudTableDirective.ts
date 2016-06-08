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


import iFilterClass = crudTable.filters.iFilterClass;
import iTableRel = crudTable.models.iTableRel;
import {Deps} from "../../../jsonDAOModule/Deps";
import {Pager} from "../../../jsonDAOModule/src/Pager";
import {Page} from "../../../jsonDAOModule/src/Page";

class Ctrl {

    static $inject = ["$mdEditDialog", "$mdDialog", "$http", "$scope", "$q", Deps.daoFactoryService, "$state"];

    config: iCrudTableConfig;

    source: iSource<any>;
    pager: iPager;
    filters: iFilterClass;

    constructor(
        public $editDialog: mdTable.EditDialogService,
        public $mdDialog: ng.material.IDialogService,
        private $http: ng.IHttpService,
        public $scope: ng.IScope,
        public $q: ng.IQService,
        public daoFactory: jsonDAO.iDAOFactoryService,
        public $state : ng.ui.IStateProvider
    ) {
        this.pager = new Pager(1, 15, this.$q);
        //$scope.$watchCollection((scope) => { return scope["vm"].pager; } ,(newVal, oldVal, scope) => {
        //    if (newVal.page!=oldVal.page || newVal.per!=oldVal.per) {
        //        this.refreshPage();
        //    }
        //});
    }

    init(config: iCrudTableConfig):void {
        this.config = config;
        this.source = this.daoFactory.build(this.config.tableName, this.config.url);
        this.filters = new Filters(config.fields, config.rels, config.tableName);
        this.refreshPage();
    }

    editProp($event: ng.IAngularEvent, origin: any, fieldName: string):void {

        $event.stopPropagation();
        let field: iTableField  = this.config.getField(fieldName);

        let rel:iTableRel = this.config.getRel(fieldName);

        if (field) {
            if (field.formly == "autocomplete") {
                this.$mdDialog.show(autocompleteDialog($event, field, origin, rel, this.$mdDialog,this.source))
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
            } else {console.log('Unsupported field type', field.fieldType,StrField)}
        } else {console.error(`Field '${fieldName}' not configured`)}

    }

    onPaginate(page: any, limit: any):void {
        this.refreshPage();
    }

    onChange(item,id,name):void {
        console.log(item,id,name);
        let res = {};
        res[name] = item;
        this.source.update(res);
    }

    create($event: ng.IAngularEvent):void {
        this.$mdDialog.show(createDialog($event, this.config))
            .then((res)=>{
                console.log(res);
                this.source.create(res);
                this.refreshPage()
            })
    }

    edit(item):void {
        let field;
        let rels;
        this.$mdDialog.show(editDialog(this.config,item)).then((res)=>{
            console.log(res);
            this.source.update(res);
            this.refreshPage()}
        )
    };

    delete(item):void {
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

    refreshPage():void {
        let filter = this.setFilters();
        this.source.getPage(new Page().setPage(1,15),filter)
            .then((res) => {
                this.pager.data = res.data;
                this.pager.total = 1;
            })
    }

    setFilters():apiAdmin.iFilter[] {
        let res:apiAdmin.iFilter[] = [];
        if(this.filters.hasOwnProperty('model')){
            Object.getOwnPropertyNames(this.filters.model).forEach( (f)=> {
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

//class CrudTableDirective implements ng.IDirective {
//
//}

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