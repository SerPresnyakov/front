declare namespace ak.jsonDaoModule {

    interface iPageResponse<T> {
        data: T[]
    }

    interface Deps {
        daoFactoryService: string;
        daoFactoryServiceProvide: string;
    }

    interface iPage {
        page: number
        per: number
        setPage?(page: number, per: number): iPage
    }

    interface iPager extends iPage {
        deffered: ng.IDeferred<any[]>
        data: any[]
        total: number
    }

    interface iFilter {
        fields: iFilterField[]
    }

    interface iFilterField {
        field: string
        op: string
        value: any
    }

    interface iRelation {
        name:string
        include?:iRelation[]
    }

    interface iSource<M> {
        crudUrl: string
        tableName: string
        pager: iPager
        getFullPage(filters: iFilter, rels:iRelation[]): ng.IPromise<iPageResponse<M>>
        getPage(page: iPage, filters: iFilter, rels:iRelation[]): ng.IPromise<iPageResponse<M>>
        getOne(filters: iFilter): ng.IPromise<M>
        getById(id: number): ng.IPromise<M>
        create(doc: M): ng.IPromise<any>
        upsert(doc: M): ng.IPromise<any>
        update(doc: Object): ng.IPromise<any>
        remove(doc: Object): ng.IPromise<any>
    }

    interface iDAOFactoryService {
        build<T>(tableName: string, crudUrl: string): iSource<T>
    }

}

declare module ak {
    import iSource = ak.jsonDaoModule.iSource;
    import Deps = ak.jsonDaoModule.Deps;
    import iPager = ak.jsonDaoModule.iPager;
    import iPage = ak.jsonDaoModule.iPage;
    import iFilter = ak.jsonDaoModule.iFilter;
    import iRelation = ak.jsonDaoModule.iRelation;
    interface JsonDaoModule {
        name:string;
        iSource: iSource<any>;
        Deps: Deps;
        iPager:(page: number, per: number, $q: ng.IQService)=>iPager
        iPage:()=>iPage
        iFilter: iFilter
        iRelation:iRelation
    }
    var jsonDaoModule:JsonDaoModule;
}