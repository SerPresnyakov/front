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
        fieldType: Object
        nullable: boolean
        hasDefault: boolean
        table?: iTable
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

    interface iFilter {
        field: string
        op: string
        value: any
    }

}