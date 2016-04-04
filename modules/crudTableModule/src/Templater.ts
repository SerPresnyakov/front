import {CrudTableConfig} from "./CrudTableConfig";
import {TableField} from "./TableField";

export class Templater {

    constructor(
        public config: CrudTableConfig,
        public ctrlAs: string
    ) {}

    getTemplate(): string {
        return "" +
            this.getToolbar() +
            this.getTable()
    }

    getToolbar(): string {
        return "" +
            '<md-toolbar class="md-table-toolbar md-default">' +
                '<div class="md-toolbar-tools">' +
                    `<span>${this.config.sourceName}</span>` +
                    '<span flex></span>' +
                    `<filter-button filters="${this.ctrlAs}.filters" fields="${this.ctrlAs}.config.fields"></filter-button>` +
                    `<md-button class="md-raised md-primary" ng-click="${this.ctrlAs}.create()">Создать</md-button>` +
                '</div>' +
            '</md-toolbar>' +
            `<md-content class="layout-padding flex">` +
                `<filter-fields class="layout-padding flex" filters="${this.ctrlAs}.filters" refresh-page='${this.ctrlAs}.refreshPage()' fields="${this.ctrlAs}.config.fields" rels="${this.ctrlAs}.config.rels" rest="${this.ctrlAs}.config.rest"></filter-fields>`+
                //`<md-button ng-if='${this.ctrlAs}.filters.length>0' ng-click="${this.ctrlAs}.refreshPage()">Применить</md-button>` +
            `</md-content>`
    }

    getTable(): string {

        return '' +
            '<md-table-container>' +
                '<table md-table>' +
                    this.getThead() +
                    this.getTBody() +
                '</table>' +
            '</md-table-container>'

    }

    getThs(): string {
        let res = [];
        angular.forEach(this.config.fields, (f) => {
            if(f.parent==null){
                res.push(`<th md-column>${f.title}</th>`)
            }
        });
        res.push("<th md-column>Действия</th>");
        return res.join("\n")
    }

    getThead(): string {
        return "" +
            "<thead md-head>" +
                `<tr md-row>${this.getThs()}</tr>` +
            "</thead>"
    }

    getTBody(): string {
        return "" +
            "<tbody md-body>" +
                `<tr md-row ng-repeat='o in ${this.ctrlAs}.pager.data'>` +
                    this.getTds("o") +
                    `<td md-cell><md-button ng-click='${this.ctrlAs}.edit(o)' aria-label='edit' class='md-raised'><i class='fa fa-pencil'></i></md-button><md-button ng-click='${this.ctrlAs}.delete(o)' aria-label='delete' class='md-raised'><i class='fa fa-trash-o'></i></md-button></td>` +
                "</tr>" +
            "</tbody>";
    }

    getTds(obj: string): string {
        let obj1= obj;
        let res = [];
        angular.forEach(this.config.fields, (f) => {
            if(f.formly=="autocomplete"){
                let relName = "";
                let isInclude = false;
                angular.forEach(this.config.rels, (r) => {
                    if(r.name == f.name){
                        relName = r.field;
                        if(r.isInclude)isInclude=true;
                    }
                });
                if (isInclude) {
                    res.push(`<td md-cell ng-click='vm.editProp($event,o, "${f.name}")'>{{o._relations.${relName}.name || 'Не указано'}}</td>`);
                }
                else {
                    res.push(`<td md-cell ng-click='vm.editProp($event,o, "${f.name}")'>{{o.${f.name} || 'Не указано'}}</td>`);
                }

            } else if (f.fieldType.type=="obj") {
                let childs = "";
                angular.forEach(this.config.fields, (n) => {
                    if(f.name == n.parent){
                        childs = childs + `${this.getObjCell(obj, n, f)}`;
                    }
                });
                res.push(`<td md-cell>${childs}</td>`);

            } else if (f.parent) {

            }
             else{
                res.push(`<td md-cell>${this.getCell(obj, f)}</td>`);
            }
        });
        return res.join("\n")
    }

    getCell(obj: string, f: TableField): string {
        let rel = this.config.getRel(f.name);
        var res: string;
        if (rel && rel.type == "one") {
            res = `{{${obj}._relations.${rel.name}.${rel.displayField ? rel.displayField : "name"}}}`
        } else {

            res = `{{${obj}.${f.name}}}`
        }
        return res
    }

    getObjCell(obj: string, n, f: TableField): string {
        let rel = this.config.getRel(f.name);
        var res: string;
        if (rel && rel.type == "one") {
            res = `{{${obj}._relations.${rel.name}.${rel.displayField ? rel.displayField : "name"}}}`
        } else {

            res = `${n.title}: {{${obj}.${f.name}.${n.name}}}<br>`
        }
        return res
    }

}