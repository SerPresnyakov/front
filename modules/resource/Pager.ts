import {Resource} from "./Resource";

export class Pager<T> {

    data: T[] = [];
    total: number = 0;

    resource: Resource;

    constructor(
        restUrl: string,
        inj: ng.auto.IInjectorService
    ) {
        this.resource = new Resource(restUrl, inj)
    }

    refreshPage(): void {
        this.resource.getList<T>().then((lst) => this.data = lst)
    }

}