import {CrudStructConfig} from "./../../crudStructModule/src/CrudStructConfig";
import {CrudTableConfig} from "./CrudTableConfig";

export class SideNavTemplater {

    constructor(public config:CrudTableConfig,
                public ctrlAs:string) {
    }

    getTemplate():string {
        return "" +
        '<div layout="row" flex style="height: 100%;">' +
        this.getSidenav() +
        this.getContent() +
        '</div>'
    }

    getSidenav(): string{
        return '' +
        `<md-sidenav class="md-sidenav-left md-whiteframe-z3" md-component-id="leftNav" md-is-locked-open="$mdMedia('gt-sm')" layout="column">` +
        this.getToolbar() +
        this.getSidenavMenu() +
        `</md-sidenav>`
    }

    getToolbar(): string {
        return '' +
            `<md-toolbar>` +
            `<h3><md-button ui-sref="dbAdmin">dbAdmin</md-button></h3>` +
            `</md-toolbar>`
    }

    getSidenavMenu(): string {
        return '' +
            `<md-content role="navigation">` +
                `<md-list>` +
                    `<md-list-item ng-repeat="table in vm.pager.data">` +
                        `<a class="md-button" ui-sref="dbAdmin.table({ name: table.tableName })">{{table.tableName}}</a>` +
                    `</md-list-item>` +
                `</md-list>` +
            `</md-content>`
    }

    getContent(): string {
        return '' +
            `<div layout="column" style="height: 100%;" flex>` +
                `<md-toolbar layout="row">` +
                    `<md-button ng-click="vm.toggleNav('leftNav')" hide-gt-sm>BTN</md-button>` +
                    `<h3><md-button ui-sref="index">Вернуться к редактированию данных <i class="fa fa-arrow-left" aria-hidden="true"></i></md-button></h3>` +
                `</md-toolbar>` +
                `<md-content ui-view></md-content>` +
            `</div>`
    }
}