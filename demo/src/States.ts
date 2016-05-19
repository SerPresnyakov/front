import {indexState} from "./index/State"
import {table as directAdGroup} from "./tableConfigs/major/direct/adGroups"
import {table as adWordsAdGroup} from "./tableConfigs/major/adWords/adGroups"
import {table as tables} from "./tableConfigs/tables"
import {table as struct} from "./tableConfigs/struct"
import {table as clients} from "./tableConfigs/leviafan/client"
import {table as shops} from "./tableConfigs/leviafan/shop"
import {CrudTableConfig} from "../../modules/crudTableModule/src/CrudTableConfig";
import {table as brands} from "./tableConfigs/major/brands";
import {table as regions} from "./tableConfigs/major/regions";
import {table as users} from "./tableConfigs/major/users";
import {table as directCampaign} from "./tableConfigs/major/direct/campaign";
import {table as adWordsCampaign} from "./tableConfigs/major/adWords/campaign";
import {CrudStructConfig} from "../../modules/crudStructModule/src/CrudStructConfig";
import {dbAdminState} from "./admin/State";

export const states: iRegisterMeta<ng.ui.IState>[] = [
    indexState,
    dbAdminState,
    {
        name: "dbAdmin.table",
        config: {
            url: "/table/:name",
            template: "<ak-crud-field config=\"config\" table-name='tableName' >",
            controller: ["config", "$scope", "$stateParams", (config, s, stateParams) => {
                s['config'] = config;
                s['stateParams'] = stateParams;
                s['tableName'] = stateParams.name;
            }],
            resolve: {
                config: (): CrudStructConfig => struct
            }
        }
    },
    {
        name: "index.adGroups",
        config: {
            url: "adGroups",
            template: "<ak-crud-table config=\"config\" tmpl=\"'adGroups'\">",
            controller: ["config", "$scope", (config, s) => {
                s['config'] = config
            }],
            resolve: {
                config: (): CrudTableConfig => directAdGroup
            }
        }
    },
    {
        name: "index.directAdGroups",
        config: {
            url: "adwords/adGroups?filters",
            template: "<ak-crud-table config=\"config\">",
            controller: ["config", "$scope", (config, s) => {
                s['config'] = config
            }],
            resolve: {
                config: (): CrudTableConfig => directAdGroup
            }
        }
    },
    {
        name: "index.adwordsAdGroups",
        config: {
            url: "direct/adGroups?filters",
            template: "<ak-crud-table config=\"config\">",
            controller: ["config", "$scope", (config, s) => {
                s['config'] = config
            }],
            resolve: {
                config: (): CrudTableConfig => adWordsAdGroup
            }
        }
    },
    {
        name: "index.clients",
        config: {
            url: "clients?filters",
            template: "<ak-crud-table config=\"config\">",
            controller: ["config", "$scope", (config, s) => {
                s['config'] = config
            }],
            resolve: {
                config: (): CrudTableConfig => clients
            }
        }
    },{
        name: "index.shops",
        config: {
            url: "shops?filters",
            template: "<ak-crud-table config=\"config\">",
            controller: ["config", "$scope", (config, s) => {
                s['config'] = config
            }],
            resolve: {
                config: (): CrudTableConfig => shops
            }
        }
    },{
        name: "index.brands",
        config: {
            url: "brands?filters",
            template: "<ak-crud-table config=\"config\">",
            controller: ["config", "$scope", (config, s) => {
                s['config'] = config
            }],
            resolve: {
                config: (): CrudTableConfig => brands
            }
        }
    },{
        name: "index.regions",
        config: {
            url: "regions?filters",
            template: "<ak-crud-table config=\"config\">",
            controller: ["config", "$scope", (config, s) => {
                s['config'] = config
            }],
            resolve: {
                config: (): CrudTableConfig => regions
            }
        }
    },{
        name: "index.users",
        config: {
            url: "users?filters",
            template: "<ak-crud-table config=\"config\">",
            controller: ["config", "$scope", (config, s) => {
                s['config'] = config
            }],
            resolve: {
                config: (): CrudTableConfig => users
            }
        }
    },{
        name: "index.adwordsCampaigs",
        config: {
            url: "adwords/campaigs?filters",
            template: "<ak-crud-table config=\"config\">",
            controller: ["config", "$scope", (config, s) => {
                s['config'] = config
            }],
            resolve: {
                config: (): CrudTableConfig => adWordsCampaign
            }
        }
    },{
        name: "index.directCampaigs",
        config: {
            url: "direct/campaigs?filters",
            template: "<ak-crud-table config=\"config\">",
            controller: ["config", "$scope", (config, s) => {
                s['config'] = config
            }],
            resolve: {
                config: (): CrudTableConfig => directCampaign
            }
        }
    },


];