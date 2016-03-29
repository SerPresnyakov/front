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
                    `<md-button class="md-raised md-primary" ng-click="${this.ctrlAs}.create()">Создать</md-button>` +
                '</div>' +
            '</md-toolbar>'
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
            res.push(`<th md-column>${f.title}</th>`)
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
                    `<td md-cell><md-button ng-click='${this.ctrlAs}.edit(o)' class='md-raised'><i class='fa fa-pencil'></i></md-button><md-button ng-click='${this.ctrlAs}.delete(o)' class='md-raised'><i class='fa fa-trash-o'></i></md-button></td>` +
                "</tr>" +
            "</tbody>";
    }

    getTds(obj: string): string {
        let obj1= obj;
        let res = [];
        angular.forEach(this.config.fields, (f) => {
            if(f.formly=="autocomplete"){
                let relName = "";
                angular.forEach(this.config.rels, (r) => {
                    if(r.name == f.name) relName = r.field;
                });
                res.push(`<td md-cell ng-click='vm.editProp($event,o, "${f.name}")'>{{o._relations.${relName}.name || 'Не указано'}}</td>`);
            }else{
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

}