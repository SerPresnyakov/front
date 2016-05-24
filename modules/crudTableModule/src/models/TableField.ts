export interface fieldType {
    type: string
    toSchema(): Object
}

export class TableField {

    constructor(
        public name: string,
        public title: string,
        public fieldType: fieldType,
        public nullable: boolean,
        public editable: boolean,
        public formly: string,
        public parent: string = null,
        public options: any = null
    ) {}



}