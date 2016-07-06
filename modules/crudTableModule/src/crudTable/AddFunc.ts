export class AddFunc implements ak.crudTableModule.AddFunc{

    constructor(public type:string, public ths:string, public field:ak.crudTableModule.TableField<any>, public getTds:(obj:string, f:ak.crudTableModule.TableField<any>)=>string){}

    tds(obj:string, f:ak.crudTableModule.TableField<any>):string{
        return this.getTds(obj, f)
    }
}