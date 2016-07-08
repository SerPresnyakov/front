declare module ak.apiAdminModule {

    interface iTable {
        id: number
        tableName: string
        url: string
        fields?: iField[]
        relations?: iRelation[]
    }

    interface iDbConn {
        id: number,
        name: string,
        dbId: number,
        login: string,
        password: string

    }

    interface iField {
        id: number
        tableId: number
        name: string
        fieldName: string
        fieldType: IFieldType
        nullable: boolean
        hasDefault: boolean
        table?: iTable
    }

    interface IFieldType {
        variant: string
    }

    interface iRelation {
        name: string
        leftTableId: number
        rightTableId: number
        leftTable?: iTable
        rightTable?: iTable
        onCondition: Object
        hasMany: boolean
    }
}

declare module ak {
    import iRelation = ak.apiAdminModule.iRelation;
    import iTable = ak.apiAdminModule.iTable;
    import iField = ak.apiAdminModule.iField;
    interface apiAdminModule{
        name:string;
        iTable:iTable;
        iField:iField;
        iRelation:iRelation;
    }
    var apiAdminModule:apiAdminModule;

}