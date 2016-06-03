declare module crudTable {

    module models {

        module fields {

            interface iFieldType {
                type: string
                toSchema(): Object
            }

            interface iStrField extends iFieldType {
                pattern: string
                minLength: string
                maxLength: string
            }

            interface iBoolField extends iFieldType {}

            interface iIntField extends iFieldType {
                min?: number
                max?: number
            }

            interface iObjField extends iFieldType {}

        }

        interface iTableField {
            name: string
            title: string
            fieldType: fields.iFieldType
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

        interface iCrudTableConfig {

            tab: any

            fields: models.iTableField[]
            rels: models.iTableRel[]

            sourceName: string
            url: string
            tableName: string

            allowedMethods: {
                create: boolean
                patch: boolean
                delete: boolean
            }

            getRel(fieldName: string): models.iTableRel
            getField(fieldName: string): models.iTableField

            setTabs(tabs: any): iCrudTableConfig

        }
    }

    module filters {

        interface iFilter {
            name: string
            title: string
            parent: string
            formly: string
            options: {
                props: string
            }[]
            fieldType: {
                type: string
            },
            value: string
        }

    }



}