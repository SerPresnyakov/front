import {CrudStructConfig} from "./CrudStructConfig";
export class Templater {

    constructor(public config:CrudStructConfig,
                public ctrlAs:string) {
    }

    getTemplate():string {
        return "" +
        '<div layout="row" flex style="height: 100%;">' +
        this.getSidenav() +
        this.getHeader() +
        this.getTable() +
        '</div>'
    }

    getSidenav(): string{
        return '' +
        `<md-sidenav class="md-sidenav-left md-whiteframe-z3" md-component-id="leftNav" md-is-locked-open="$mdMedia('gt-sm')" layout="column">` +
        this.getToolbar() +
        this.getContent() +
        `</md-sidenav>`
    }

    getToolbar(): string {
        return '' +
            `<md-toolbar>` +
            `<h3><md-button ui-sref="dbAdmin">dbAdmin</md-button></h3>` +
            `</md-toolbar>`
    }

    getContent(): string {
        return '' +
            `<md-content role="navigation">` +
                `<md-list>` +
                    `<md-list-item ng-repeat="table in vm.pager.data">` +
                        `<a class="md-button" ui-sref="dbAdmin.table({ name: table.tableName })">{{table.tableName}}</a>` +
                    `</md-list-item>` +
                `</md-list>` +
            `</md-content>`
    }

    getHeader(): string {
        return ''
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
            "</thead>"
    }

    getTBody(): string {
        return "" +
            "<tbody md-body>" +
            `<tr md-row ng-repeat='o in ${this.ctrlAs}.pager.data'>` +
            "</tr>" +
            "</tbody>";
    }
}