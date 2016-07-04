import crud = ak.crudTableModule;

declare namespace ak.crudTableModule {

    import FieldType = ak.crudTableModule.fieldTypes.FieldType;
    interface TableField<T> {
        name: string
        title: string
        fieldType: T
        nullable: boolean
        editable: boolean
        formly: string
        parent?: string
        options?: any
    }

    interface CrudTableConfig {

        tab: any

        fields: ak.crudTableModule.TableField<any>[]
        rels: ak.crudTableModule.filters.iTableRel[]

        sourceName: string
        url: string
        tableName: string
        connName: string

        allowedMethods: {
            create: boolean
            patch: boolean
            delete: boolean
        }

        getRel(fieldName: string): ak.crudTableModule.filters.iTableRel
        getField(fieldName: string): ak.crudTableModule.TableField<FieldType>
        getRelsName():ak.jsonDaoModule.iRelation[]

        setTabs(tabs: any): CrudTableConfig

    }

    interface filters {
        iFilter:ak.crudTableModule.filters.iFilter
        INewFilter:ak.crudTableModule.filters.INewFilter
        IModel:ak.crudTableModule.filters.IModel
        ISavedFilters:ak.crudTableModule.filters.ISavedFilters;
        ISaveFilter:ak.crudTableModule.filters.ISaveFilter
        iFilterClass:ak.crudTableModule.filters.iFilterClass
        iTableRel:ak.crudTableModule.filters.iTableRel
    }

    interface fieldTypes {
        FieldType?():ak.crudTableModule.fieldTypes.FieldType,
        ObjField():ak.crudTableModule.fieldTypes.ObjField,
        StrField():ak.crudTableModule.fieldTypes.StrField,
        IntField():ak.crudTableModule.fieldTypes.IntField,
        BoolField():ak.crudTableModule.fieldTypes.BoolField
    }

    module fieldTypes {
        interface FieldType {
            type: string
            toSchema(): Object
        }

        interface StrField extends FieldType {
            pattern: string
            minLength: string
            maxLength: string
        }

        interface BoolField extends FieldType {}

        interface AdField extends FieldType {
            fields:{
                title:{[name:string]:string},
                url:{[name:string]:string}
                desc:{[name:string]:string}

            }
        }

        interface IntField extends FieldType {
            min?: number
            max?: number
        }

        interface ObjField extends FieldType {}

    }

    module filters {
        import FieldType = ak.crudTableModule.fieldTypes.FieldType;
        type iTableRelType = "one" | "many"

        interface iTableRel {
            name: string
            field: string
            dao: string
            type: iTableRelType
            isInclude: boolean
            displayField: string
        }


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
            field: TableField<FieldType>,
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
            getNewFilters(fields:TableField<FieldType>[],rels:iTableRel[]):INewFilter[]
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

    import FieldType = ak.crudTableModule.fieldTypes.FieldType;
    interface crudTableModule {
        name:string
        CrudTableConfig:(sourceName: string, url: string, tableName: string, connName: string) => ak.crudTableModule.CrudTableConfig,
        fieldTypes: ak.crudTableModule.fieldTypes
        TableField:(name: string,
                    title: string,
                    fieldType: ak.crudTableModule.fieldTypes.FieldType,
                    nullable: boolean,
                    editable: boolean,
                    formly: string,
                    parent: string,
                    options: any) => ak.crudTableModule.TableField<FieldType>
    }
    let crudTableModule:crudTableModule;
}