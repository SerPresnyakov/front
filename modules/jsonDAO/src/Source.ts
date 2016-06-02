
import {AbstractSource} from "./AbstractSource";
import iPager = jsonDAO.iPager;
import {Pager} from "./Pager";

export class Source<M> extends AbstractSource<M> implements jsonDAO.iSource<M> {

    $http: ng.IHttpService;
    $q: ng.IQService;
    pager: Pager;

    constructor(
        crudUrl: string,
        tableName: string,
        inj: ng.auto.IInjectorService
    ) {
        super(crudUrl, tableName, inj);
        this.pager = new Pager(1, 15, this.$q);
    }

}
