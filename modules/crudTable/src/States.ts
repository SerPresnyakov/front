import {indexState} from "./index/State"

import {table as adGroupTable} from "./tables/adGroups"
import {table as tables} from "./tables/tables"
import {CrudTableConfig} from "./crud/table/CrudTableConfig";

export const states: iRegister<ng.ui.IState>[] = [
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
            url: "adGroups2",
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
        name: "index.tables",
        config: {
            url: "tables",
            template: "<ak-crud-table config=\"config\">",
            controller: ["config", "$scope", (config, s) => {
                s['config'] = config
            }],
            resolve: {
                config: (): CrudTableConfig => tables
            }
        }
    },
];