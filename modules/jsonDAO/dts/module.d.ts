declare module jsonDAO {

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

    interface iSource<M> {
        crudUrl: string
        tableName: string
        pager: iPager
        getPage(page: iPage, filters: apiAdmin.iFilter[]): ng.IPromise<iPageResponse<M>>
        getOne(filters: apiAdmin.iFilter[]): ng.IPromise<M>
        getById(id: number): ng.IPromise<M>
        create(doc: M): ng.IPromise<any>
        update(doc: Object): ng.IPromise<any>
        remove(doc: Object): ng.IPromise<any>
    }

    interface iDAOFactoryService<T> {
        build(tableName: string, crudUrl: string): iSource<T>
    }

}