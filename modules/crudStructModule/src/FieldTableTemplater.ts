import {CrudStructConfig} from "./CrudStructConfig";
export class FieldTableTemplater {

    constructor(public config:CrudStructConfig,
                public ctrlAs:string) {
    }

    getTemplate(): string {
        return "" +
            //this.getTabs() +
            this.getToolbar() +
            this.getTable()
            //this.getPagination()
    }

    //getTabs(): string {
    //    if(this.config.tab.tabs.length){
    //        return "" +
    //            `<md-tabs md-dynamic-height md-border-bottom md-selected='${this.ctrlAs}.config.tab.selected'>` +
    //            `<md-tab ng-repeat="tab in ${this.ctrlAs}.config.tab.tabs" ui-sref='{{tab.url}}' label="{{tab.title}}"></md-tab>` +
    //            `</md-tabs><div>{{${this.ctrlAs}.config.getSelectedTab()}}</div>`
    //    }
    //    else{
    //        return "";
    //    }
    //}
    //
    getToolbar(): string {
        return "" +
            '<md-toolbar class="md-table-toolbar md-default">' +
                '<div class="md-toolbar-tools">' +
                    `<span>Таблица: {{${this.ctrlAs}.stateParams.name}}</span>` +
                    '<span flex></span>' +
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

    getThead(): string {
        return "" +
            "<thead md-head>" +
            `<tr md-row>${this.getThs()}</tr>` +
            "</thead>"
    }

    getThs(): string {
        return "" +
            `<th md-column ng-repeat='name in ${this.ctrlAs}.fieldsNames'>{{name}}</th>` +
            "<th md-column>Действия</th>"
    }

    getTBody(): string {
        return "" +
            `<tbody md-body ng-if='o.tableName==${this.ctrlAs}.stateParams.name' md-row ng-repeat='o in ${this.ctrlAs}.pager.data'>` +
                `<tr md-row ng-repeat='field in o.fields'>` +
                    this.getTds() +
                "</tr>" +
            "</tbody>";
    }

    getTds(): string {
            return "" +
                "<td md-cell ng-repeat='(key, value) in field'>{{value}}</td>" +
                `<td md-cell><md-button ng-click='${this.ctrlAs}.edit(o)' aria-label='edit' class='md-raised'><i class='fa fa-pencil'></i></md-button></td>`
    }

    //getPagination():string{
    //    return '' +
    //        '<md-table-pagination md-limit="vm.pager.per" md-page="vm.pager.page" md-total="{{vm.pager.total}}" md-page-select>' +
    //        '</md-table-pagination>'
    //}



    //
    //getCell(obj: string, f: TableField): string {
    //    if(f.formly=="switch"){
    //        res =`<md-button ng-if="${obj}.${f.name}" class="md-raised md-primary md-button">Дa</md-button><md-button ng-if="!${obj}.${f.name}" class="md-raised md-accent md-button">Нет</md-button>`
    //    } else {
    //        let rel = this.config.getRel(f.name);
    //        var res:string;
    //        if (rel && rel.type == "one") {
    //            res = `{{${obj}._relations.${rel.field}.${rel.displayField ? rel.displayField : "name"}}}`
    //        } else {
    //            res = `{{${obj}.${f.name}}}`
    //        }
    //    }
    //    return res
    //}
}