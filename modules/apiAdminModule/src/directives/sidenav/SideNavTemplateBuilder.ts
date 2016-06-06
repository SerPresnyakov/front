export class SideNavTemplateBuilder {

    tables: apiAdmin.iTable[] = [];

    constructor(_tables: apiAdmin.iTable[]) {
        if (_tables != null) {
            this.tables = _tables;
        } else {
            throw {error: "tables is null"}
        }
    }

    getTemplate(): string {
        return `
            <div layout="row" flex style="height: 100%;">
                <md-sidenav class="md-sidenav-left md-whiteframe-z3" md-component-id="leftNav" md-is-locked-open="$mdMedia('gt-sm')" layout="column">
                    <md-toolbar>
                        <h3 ng-if="state.includes('index')"><md-button ui-sref="index">Index</md-button></h3>
                        <h3 ng-if="state.includes('dbAdmin')"><md-button ui-sref="dbAdmin">Admin</md-button></h3>
                    </md-toolbar>
                    <md-content role="navigation">
                        <md-list>
                            ${this.getListItems()}
                        </md-list>
                    </md-content>
                </md-sidenav>
                <div layout="column" style="height: 100%;" flex>
                    <md-toolbar layout="row">
                        <md-button ng-click="vm.toggleNav('leftNav')" hide-gt-sm>BTN</md-button>
                        <h3 ng-if="state.includes('index')"><md-button ui-sref="dbAdmin">Редактировать базу данных</md-button></h3>
                        <h3 ng-if="state.includes('dbAdmin')"><md-button ui-sref="index">Редактировать данныe</md-button></h3>
                    </md-toolbar>
                    <md-content ui-view></md-content>
                </div>
            </div>
            `
    }

    private getListItems():string {
        let res = '';
        this.tables.forEach((t)=>{
            res = res  + `<md-list-item ng-if="state.includes('index')">` + `<a class="md-button" ui-sref="index.table({ name: '${t.url}' })">${t.tableName}</a>` + `</md-list-item>`;
            res = res  + `<md-list-item ng-if="state.includes('dbAdmin')">` + `<a class="md-button" ui-sref="dbAdmin.table({ name: '${t.url}' })">${t.tableName}</a>` + `</md-list-item>`;
        });
        return res;
    }

}