export class TableRel {

    constructor(
        public name: string,
        public field: string,
        public dao: string,
        public type: "one" | "many",
        public isInclude: boolean,
        public displayField: string = "name"
    ) {}

}