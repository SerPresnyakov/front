declare module apiAdmin {

    interface iTable {
        id: number
        tableName: string
        url: string
        fields?: iField[]
        relations?: iRelation[]
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