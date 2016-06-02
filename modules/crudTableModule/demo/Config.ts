import {table as directAdGroup} from "./tableConfigs/major/direct/adGroups"
import {table as adWordsAdGroup} from "./tableConfigs/major/adWords/adGroups"
import {ConfigsService} from "./ConfigsService";

export class Config {

    static $inject = [
        `${ConfigsService.angularName}Provider`,
        "$urlRouterProvider"
    ];

    constructor(
        configs: crudTable.demo.iConfigsServiceProvider,
        $url: ng.ui.IUrlRouterProvider
    ) {
        $url.when("", "/");
        configs.addConfig(directAdGroup);
        configs.addConfig(adWordsAdGroup);
    }

}