declare module crudTable.demo {

    interface iConfigsService {
        configs: ak.crudTableModule.CrudTableConfig[]
    }

    interface iConfigsServiceProvider {
        addConfig(config: ak.crudTableModule.CrudTableConfig)
    }

}