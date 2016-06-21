declare module ak.json_dao {

    interface iPageResponse<T> {
        data: T[]
    }

    interface iPage {
        page: number
        per: number
    }

    interface iPager extends iPage {
        deffered: ng.IDeferred<any[]>
        data: any[]
        total: number
    }

    interface iFilter {
        field: string
        op: string
        value: any
    }

    interface iSource<M> {
        crudUrl: string
        tableName: string
        pager: iPager
        getFullPage(filters: iFilter[]): ng.IPromise<iPageResponse<M>>
        getPage(page: iPage, filters: iFilter[]): ng.IPromise<iPageResponse<M>>
        getOne(filters: iFilter[]): ng.IPromise<M>
        getById(id: number): ng.IPromise<M>
        create(doc: M): ng.IPromise<any>
        update(doc: Object): ng.IPromise<any>
        remove(doc: Object): ng.IPromise<any>
    }

    interface iDAOFactoryService {
        build<T>(tableName: string, crudUrl: string): iSource<T>
    }

}

declare module ak {
    interface jsonDaoModule{
        name:string;
    }
    var jsonDaoModule:jsonDaoModule;
}