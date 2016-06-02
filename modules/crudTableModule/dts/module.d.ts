declare module crudTable {

    module models {

        interface iFieldType {
            type: string
            toSchema(): Object
        }

        interface iTableField {
            name: string
            title: string
            fieldType: iFieldType
            nullable: boolean
            editable: boolean
            formly: string
            parent?: string
            options?: any
        }

        type iTableRelType = "one" | "many"

        interface iTableRel {
            name: string
            field: string
            dao: string
            type: iTableRelType
            isInclude: boolean
            displayField: string
        }
    }

    interface iCrudTableConfig {

        fields: models.iTableField[]
        rels: models.iTableRel[]


    }

}