
import {AbstractSource} from "./AbstractSource";
import {Page} from "./Page";

export class Source extends AbstractSource {

    $http: ng.IHttpService;
    $q: ng.IQService;

    constructor(
        crudUrl: string,
        tableName: string,
        inj: ng.auto.IInjectorService
    ) {
        super(crudUrl, tableName, inj)
    }

}
