import {TableField} from "../models/TableField";
import iCrudTableConfig = ak.crudTableModule.CrudTableConfig;
import iTableField = ak.crudTableModule.TableField;
import ObjField = ak.crudTableModule.fieldTypes.ObjField;
import {AdField} from "../fieldTypes/AdField";
import FieldType = ak.crudTableModule.fieldTypes.FieldType;

export class FieldTableTemplater {

    constructor(public config: iCrudTableConfig,
                public ctrlAs: string) {
    }

    //getTableNumb():number{
    //    angular.forEach(this.config.fields, (f) => {
    //    return
    //}

    getTemplate():string {
        return "" +
            this.getTabs() +
            this.getToolbar() +
            this.getTable() +
            this.getPagination()
    }

    getTabs():string {
        if (this.config.tab.tabs.length) {
            return "" +
                `<md-tabs md-dynamic-height md-border-bottom md-selected='${this.ctrlAs}.config.tab.selected'>` +
                `<md-tab ng-repeat="tab in ${this.ctrlAs}.config.tab.tabs" ui-sref='{{tab.url}}' label="{{tab.title}}"></md-tab>` +
                `</md-tabs><div>{{${this.ctrlAs}.config.getSelectedTab()}}</div>`
        }
        else {
            return "";
        }
    }

    getToolbar():string {
        return "" +
            '<md-toolbar class="md-table-toolbar md-default">' +
            '<div class="md-toolbar-tools">' +
            `<span>Таблица: {{${this.ctrlAs}.stateParams.name}}</span>` +
            '<span flex></span>' +
            `<filter-button filter="${this.ctrlAs}.filters" fields="${this.ctrlAs}.config.fields" refresh-page='${this.ctrlAs}.refreshPage()'></filter-button>` +
            `<md-button class="md-raised md-primary" ng-if='${this.config.allowedMethods.create}' ng-click="${this.ctrlAs}.create()">Создать</md-button>` +
            '</div>' +
            '</md-toolbar>' +
            `<md-content class="layout-padding flex" ng-show='${this.ctrlAs}.filters.filters.length>0'>` +
                `<filter-fields class="layout-padding flex" filter="${this.ctrlAs}.filters" refresh-page='${this.ctrlAs}.refreshPage()' fields="${this.ctrlAs}.config.fields" rels="${this.ctrlAs}.config.rels" rest="${this.ctrlAs}.config.rest"></filter-fields>`+
                `<md-button ng-if='${this.ctrlAs}.filters.length>0' ng-click="${this.ctrlAs}.refreshPage()">Применить</md-button>` +
            `</md-content>`
    }

    getTable():string {

        return '' +
            '<md-table-container>' +
            '<table md-table>' +
            this.getThead() +
            this.getTBody() +
            '</table>' +
            '</md-table-container>'

    }

    getPagination():string {
        return '' +
            '<md-table-pagination md-limit="vm.pager.per" md-page="vm.pager.page" md-total="{{vm.pager.total}}" md-page-select>' +
            '</md-table-pagination>'
    }

    getThs():string {
        let res = [];
        angular.forEach(this.config.fields, (f) => {
            if (f.parent == null) {
                res.push(`<th md-column>${f.title}</th>`)
            }
        });
        if (this.config.allowedMethods.patch || this.config.allowedMethods.delete) {
            res.push("<th md-column>Действия</th>");
        }
        return res.join("\n")
    }

    getThead():string {
        return "" +
            "<thead md-head>" +
            `<tr md-row>${this.getThs()}</tr>` +
            "</thead>"
    }

    getTBody():string {
        return "" +
            "<tbody md-body>" +
            `<tr md-row ng-repeat='o in ${this.ctrlAs}.pager.data[${this.ctrlAs}.getTableNumb()].fields'>` +
            this.getTds("o") +
            "</tr>" +
            "</tbody>";
    }

    getTds(obj:string):string {
        let obj1 = obj;
        let res = [];
        angular.forEach(this.config.fields, (f:iTableField<FieldType>) => {
            if (f.editable) {
                switch (f.formly) {
                    case "switch" :
                        res.push(`<td md-cell ><md-switch ng-model="o.${f.name}" ng-change="${this.ctrlAs}.onChange(o.${f.name},o.id,'${f.name}')" aria-label="Switch 1"></md-switch></td>`);
                        break;

                    case "autocomplete" :
                        let relName = "";
                        let isInclude = false;
                        angular.forEach(this.config.rels, (r) => {
                            if (r.name == f.name) {
                                relName = r.field;
                                if (r.isInclude) isInclude = true;
                            }
                        });
                        if (isInclude) {
                            res.push(`<td md-cell><a ng-click='${this.ctrlAs}.editProp($event,o, "${f.name}")' class="editable-click" >{{o._relations.${relName}.name || 'Не указано'}}</a></td>`);
                        }
                        else {
                            res.push(`<td md-cell><a ng-click='${this.ctrlAs}.editProp($event,o, "${f.name}")' class="editable-click" >{{o.${f.name} || 'Не указано'}}</a></td>`);
                        }
                        break;

                    case "input" :
                        res.push(`<td md-cell ng-click='${this.ctrlAs}.editProp($event,o, "${f.name}")'><a class="editable-click">{{o.${f.name} || 'Не указано'}}</a></td>`);
                        break;
                }
            }
            else {
                if (f.fieldType.type == "obj") {
                    let childs = "";
                    angular.forEach(this.config.fields, (n:iTableField<ObjField>) => {
                        if (f.name == n.parent) {
                            childs = childs + `${this.getObjCell(obj, n, f)}`;
                        }
                    });
                    res.push(`<td md-cell>${childs}</td>`);

                } else if (f.parent) {

                }
                else {
                    res.push(`<td md-cell>${this.getCell(obj, f)}</td>`);
                }
            }

        });

        if (this.config.allowedMethods.patch || this.config.allowedMethods.create) {
            let cell = "";
            if (this.config.allowedMethods.patch) {
                cell = cell + `<md-button ng-click='${this.ctrlAs}.edit(o)' aria-label='edit' class='md-raised'><i class='fa fa-pencil'></i></md-button>`;
            }
            if (this.config.allowedMethods.delete) {
                cell = cell + `<md-button ng-click='${this.ctrlAs}.delete(o)' aria-label='delete' class='md-raised'><i class='fa fa-trash-o'></i></md-button>`;
            }
            res.push(`<td md-cell>`, `${cell}`, `</td>`);
        }

        return res.join("\n")
    }

    getCell(obj:string, f:iTableField<FieldType>):string {
        if (f.formly == "switch") {
            res = `<md-button ng-if="${obj}.${f.name}" class="md-raised md-primary md-button">Дa</md-button><md-button ng-if="!${obj}.${f.name}" class="md-raised md-accent md-button">Нет</md-button>`
        } else {
            let rel = this.config.getRel(f.name);
            var res:string;
            if (rel && rel.type == "one") {
                res = `{{${obj}._relations.${rel.field}.${rel.displayField ? rel.displayField : "name"}}}`
            } else {
                res = `{{${obj}.${f.name}}}`
            }
        }
        return res
    }

    getObjCell(obj:string, n, f:iTableField<ObjField>):string {
        let rel = this.config.getRel(f.name);
        var res:string;
        if (rel && rel.type == "one") {
            res = `{{${obj}._relations.${rel.name}.${rel.displayField ? rel.displayField : "name"}}}`
        } else {
            res = `${n.title}: {{${obj}.${f.name}.${n.name}}}<br>`
        }
        return res
    }

    getAdCell(obj:string, f:iTableField<AdField>):string{
        let res:string;
            res = `{{${obj}.${f.name}}}`;
        return res;
    }
}
