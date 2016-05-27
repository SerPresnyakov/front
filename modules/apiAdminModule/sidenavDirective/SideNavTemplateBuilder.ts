export function SideNavTemplateBuilder(tables:apiAdmin.iTable[]):string {
    let result = getTemplate(tables);

    function getTemplate(tables): string {
        return `
            <div layout="row" flex style="height: 100%;">
                ${getSidenav(tables)}
                ${getContent()}
            </div>
            `
    }

    function getSidenav(tables): string {
            return '' +
                `<md-sidenav class="md-sidenav-left md-whiteframe-z3" md-component-id="leftNav" md-is-locked-open="$mdMedia('gt-sm')" layout="column">` +
                getToolbar() +
                getSidenavMenu(tables) +
                `</md-sidenav>`
    }

    function getToolbar(): string {
            return '' +
                `<md-toolbar>` +
                `<h3 ng-if="state.includes('index')"><md-button ui-sref="index">Index</md-button></h3>` +
                `<h3 ng-if="state.includes('admin')"><md-button ui-sref="Admin">Admin</md-button></h3>` +
                `</md-toolbar>`
    }

    function getSidenavMenu(tables): string {
            return '' +
                `<md-content role="navigation">` +
                `<md-list>` +
                getListItems(tables) +
                `</md-list>` +
                `</md-content>`
    }

    function getListItems(tables):string {
        let res = '';
        tables.forEach((t)=>{
            res = res  + `<md-list-item >` + `<a class="md-button" ui-sref="index.table({ name: '${t.url}' })">${t.tableName}</a>` + `</md-list-item>`;
        });
        return res;
    }

    function getContent(): string {
            return '' +
                `<div layout="column" style="height: 100%;" flex>` +
                `<md-toolbar layout="row">` +
                `<md-button ng-click="vm.toggleNav('leftNav')" hide-gt-sm>BTN</md-button>` +
                `<h3 ng-if="state.includes('index')"><md-button ui-sref="admin">Редактировать базу данных</md-button></h3>` +
                `<h3 ng-if="state.includes('admin')"><md-button ui-sref="index">Редактировать данныe</md-button></h3>` +
                `</md-toolbar>` +
                `<md-content ui-view></md-content>` +
                `</div>`
    }

    return result;
}