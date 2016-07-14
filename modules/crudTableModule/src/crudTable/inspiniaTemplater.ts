import iCrudTableConfig = ak.crudTableModule.CrudTableConfig;

export class inspiniaTemplater{
    constructor(
        public config: iCrudTableConfig,
        public ctrlAs: string
    ) {}

    getTemplate(): string {
        return "" +
            this.getTitle() +
            this.getContent()
    }

    getTitle(): string {
        return "" +
        `<div class="ibox-title">` +
        `<div class="ibox-tools">` +
        `<a class="btn btn-primary btn-xs" ng-if='${this.config.allowedMethods.create}' ng-click="vm.create()"><i class="fa fa-plus"></i> Добавить</a>` +
        `</div>` +
        `</div>`
    }

    getContent():string {
        return "" +
            `<div class="ibox-content">` +
            `<table class="table table-condensed table-bordered">` +
            this.getThead() +
            this.getTbody() +
            `</table>` +
            `</div>`
    }

    getThead(){
        return "" +
            `<thead>` +
            `<tr>` + this.getThs() +`</tr>` +
            `</thead>`
    }

    getTbody(){
        return "" +
            `<tbody>`+
            `<tr ng-repeat="o in ${this.ctrlAs}.pager.data">` +
            this.getTds("o") +
                `</tr>` +
            `</tbody>`
    }

    getThs(): string {
        let res = [];
        angular.forEach(this.config.fields, (f) => {
            if(f.parent==null){
                res.push(`<th >${f.title}</th>`)
            }
        });
        if(this.config.allowedMethods.patch||this.config.allowedMethods.delete) {
            res.push("<th>Действия</th>");
        }
        return res.join("\n")
    }

    getTds(obj: string): string{
        let res = [];
        angular.forEach(this.config.fields, (f) => {
            if (f.fieldType.type=="obj") {
                let childs = "";
                angular.forEach(this.config.fields, (n) => {
                    if(f.name == n.parent){
                        childs = childs + `${this.getObjCell(obj, n, f)}`;
                    }
                });
                res.push(`<td>${childs}</td>`);

            } else if (f.parent) {

            } else{
                res.push(`<td>${this.getCell(obj, f)}</td>`);
            }
        });



        if(this.config.allowedMethods.patch||this.config.allowedMethods.create) {
            let cell = "";
            if (this.config.allowedMethods.patch) {
                cell = cell + `<a class="btn btn-xs btn-info" ng-click='${this.ctrlAs}.patch(o)'><i class="fa fa-edit"></i></a>`;
            }
            if (this.config.allowedMethods.delete) {
                cell = cell + ` <a class="btn btn-xs btn-danger" ng-click='${this.ctrlAs}.remove(o)'><i class="fa fa-remove"></i></a>`;
            }
            res.push(`<td>`,`${cell}`,`</td>`);
        }
        return res.join("\n")
    }

    getCell(obj: string, f){
        var res:string;
        res = `{{${obj}.${f.name}}}`;
        return res
    }

    getObjCell(obj: string, n, f): string {
        var res: string;
        res = `${n.title}: {{${obj}.${f.name}.${n.name}}}<br>`;
        return res
    }
}