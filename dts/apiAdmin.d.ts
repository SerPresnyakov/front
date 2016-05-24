declare module apiAdmin {

    interface iTable {
        id: number
        tableName: string
        url: string
        fields: iField[]
        relations: iRelation[]
    }

    interface iField {
        id: number
        tableId: number
        name: string
        fieldName: string
        fieldType: Object
        nullable: boolean
        hasDefault: boolean
    }

    interface iRelation {
        name: string
        leftTable: iTable
        rightTable: iTable
        onCondition: Object
        hasMany: boolean
    }

    interface iFilter {
        field: string
        op: string
        value: any
    }

}