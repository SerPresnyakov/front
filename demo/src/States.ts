import {indexState} from "./index/State"
import {table as adGroupTable} from "./tableConfigs/adGroups"
import {table as tables} from "./tableConfigs/tables"
import {table as clients} from "./tableConfigs/leviafan/client"
import {table as shops} from "./tableConfigs/leviafan/shop"
import {CrudTableConfig} from "../../modules/crudTableModule/src/CrudTableConfig";
import {table as brands} from "./tableConfigs/major/brands";
import {table as regions} from "./tableConfigs/major/regions";
import {table as users} from "./tableConfigs/major/users";
import {table as campaign} from "./tableConfigs/major/campaign";

export const states: iRegisterMeta<ng.ui.IState>[] = [
    indexState,
    {
        name: "index.adGroups",
        config: {
            url: "adGroups",
            template: "<ak-crud-table config=\"config\" tmpl=\"'adGroups'\">",
            controller: ["config", "$scope", (config, s) => {
                s['config'] = config
            }],
            resolve: {
                config: (): CrudTableConfig => adGroupTable
            }
        }
    },
    {
        name: "index.adGroups2",
        config: {
            url: "adGroups2?filters",
            template: "<ak-crud-table config=\"config\">",
            controller: ["config", "$scope", (config, s) => {
                s['config'] = config
            }],
            resolve: {
                config: (): CrudTableConfig => adGroupTable
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
        name: "index.campaigs",
        config: {
            url: "campaigs?filters",
            template: "<ak-crud-table config=\"config\">",
            controller: ["config", "$scope", (config, s) => {
                s['config'] = config
            }],
            resolve: {
                config: (): CrudTableConfig => campaign
            }
        }
    },


];