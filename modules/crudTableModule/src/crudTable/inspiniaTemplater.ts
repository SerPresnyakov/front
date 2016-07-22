import iCrudTableConfig = ak.crudTableModule.CrudTableConfig;
import TableField = ak.crudTableModule.TableField;
import FieldType = ak.crudTableModule.fieldTypes.FieldType;

export class inspiniaTemplater{
    constructor(
        public config: iCrudTableConfig,
        public ctrlAs: string
    ) {}

    getTemplate(): string {
        if (this.config.tab.tabs.length){
            return"" +
                `<div class='ibox'>` +
                this.getTabs() +
                this.getTitle() +
                this.getContent() +
                `</div>` +
                this.getPager()


        } else {
            return "" +
                `<div class='ibox'>` +
                this.getTitle() +
                this.getContent() +
                `</div>` +
                this.getPager()
        }
    }

    getTabs():string{
        let tabs: string[] = [];
        angular.forEach(this.config.tab.tabs, (t) => {
            let tab = `<li`;
            if(t.selected){
                tab = tab + ` class="active">`;
            }else{
                tab = tab + `>`;
            }
            tab = tab + `<a data-toggle="tab" ui-sref="${t.url}" aria-expanded="true">${t.title}</a></li>`;
            tabs.push(tab);
        });
        return `<ul class="nav nav-tabs">` + tabs.join("\n") + `</ul>`;
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
        angular.forEach(this.config.fields, (f:TableField<FieldType>) => {
            if(f.showInTemplate){
                res.push(`<th >${f.title}</th>`);
            }
        });
        if(this.config.addFunc.length>0){
            angular.forEach(this.config.addFunc, (f) => {
                res.push(`<th>${f.ths}</th>`)
            });
        }
        if(this.config.allowedMethods.patch||this.config.allowedMethods.delete) {
            res.push("<th>Действия</th>");
        }
        return res.join("\n")
    }

    getObjChilds(field: TableField<FieldType>, obj:string){
        let childs = "";
        angular.forEach(field.childs, (f: TableField<FieldType>) => {
            if(f.showInTemplate) {
                if (f.fieldType.type == "obj") {
                    childs = childs + `<tr><td>${this.getObjCell(f, `</td><td>${this.getObjChilds(f, `${obj}.${field.name}`)}</td>`)}`;
                } else {
                    childs = childs + `${this.getObjCell(f, this.getObjCellValue(obj, f, field))}`;
                }
            }
        });
        return childs;
    }

    getTds(obj: string): string{
        let res = [];
        angular.forEach(this.config.fields, (f:TableField<FieldType>) => {
            if(f.showInTemplate) {
                if (f.fieldType.type == "obj") {
                    res.push(`<td><table class="table"><tbody>${this.getObjChilds(f, obj)}</tbody></table></td>`);
                    console.log(res[res.length - 1]);
                } else {
                    res.push(`<td>${this.getCell(obj, f)}</td>`);
                }
            }
        });

        if(this.config.addFunc.length>0){
            angular.forEach(this.config.addFunc, (prop) => {
                res.push(`<td>${prop.tds(obj)}</th>`)
            });
        }



        if(this.config.allowedMethods.patch||this.config.allowedMethods.create) {
            let cell = "";
            if (this.config.allowedMethods.patch) {
                cell = cell + `<a class="btn btn-xs btn-info" ng-click='${this.ctrlAs}.edit(o)'><i class="fa fa-edit"></i></a>`;
            }
            if (this.config.allowedMethods.delete) {
                cell = cell + ` <a class="btn btn-xs btn-danger" ng-click='${this.ctrlAs}.delete(o)'><i class="fa fa-remove"></i></a>`;
            }
            res.push(`<td>`,`${cell}`,`</td>`);
        }
        return res.join("\n")
    }

    getCell(obj: string, f){
        var res:string;
        if(f.formly=="switch"){
            res =`<button ng-if="${obj}.${f.name}" class="btn btn-sm btn-primary">Дa</button><button ng-if="!${obj}.${f.name}" class="btn btn-sm btn-danger">Нет</button>`
        } else {
            res = `{{${obj}.${f.name}}}`;
        }
        return res
    }

    getObjCell(n, value: string): string {
        var res: string;
        res = `${n.title}: ${value}<br>`;
        return res
    }

    getObjCellValue(obj: string, n, f){
        var res: string = `{{${obj}.${f.name}.${n.name}}}`;
        return res
    }

    getPager(){
        return `<a-pager pager="${this.ctrlAs}.pager"></a-pager>`
    }
}