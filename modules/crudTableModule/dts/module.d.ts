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
            connName: string

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

        import iTableField = crudTable.models.iTableField;
        import iTableRel = crudTable.models.iTableRel;
        interface iFilter {
            name: string
            title: string
            parent?: string
            formly: string
            options?: {
                props: string
            }[]
            fieldType: {
                type: string
            },
            value?: string
        }

        interface INewFilter{
            name: string,
            applied: boolean,
            field: crudTable.models.iTableField,
            schema : AngularFormly.IFieldGroup[]
        }

        interface IModel{
            [key:string]: any;
        }

        interface ISavedFilters {
            id:number
            filters:any[],
            name:string
            table:{}
            tableId:number
            user:{}
            userId:number
        }

        interface ISaveFilter {
            searchText: string
            selectedItem : ISavedFilters
        }

        interface iFilterClass {
            schema: AngularFormly.IFieldGroup[]
            applyedFilters: iFilter[]
            model: IModel
            savedFilters: ISavedFilters[]
            saveFilter: ISaveFilter;
            filters: INewFilter[]
            tableUrl:string
            getNewFilters(fields:iTableField[],rels:iTableRel[]):INewFilter[]
            apply(filter:INewFilter):void
            removeField(index:number, name:string):void
            getRestFilters():string
            unapply(name:string):void
            getParamsFilters(params: any):void
            exist():boolean
            resetFilter():void
            getFilterByName(name):INewFilter
            remove?(index:number, name:string):void
        }

    }



}

declare module ak {
    interface crudTableModule{
        name:string;
    }
    var crudTableModule:crudTableModule;
}