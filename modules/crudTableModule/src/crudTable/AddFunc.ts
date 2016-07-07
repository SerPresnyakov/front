export class AddFunc implements ak.crudTableModule.AddFunc{

    constructor(public type:string, public ths:string, public getTds:(obj:string)=>string){}

    tds(obj:string):string{
        return this.getTds(obj)
    }
}