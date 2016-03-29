export class AngularModule {

  private module: ng.IModule;

  constructor(public moduleName: string, deps: string[]) {
    this.module = angular.module(moduleName, deps)
  }

  getModuleName(): string { return this.module.name }

  registerStates(states: IRegisterMeta<ng.ui.IState>[]) {
    this.module.config(["$stateProvider", (stateProvider: ng.ui.IStateProvider) => {
        states.forEach(state => {
          console.debug(`Регистрируем состояние '${state.name}' в модуле ${this.getModuleName()}`);
          stateProvider.state(state.name, state.config)
        })
      }])
  }

  registerComponent(components: IRegisterMeta<ng.IComponentOptions>[]) {
    components.forEach(component => {
      console.debug(`Регистрируем компонент '${component.name}' в модуле ${this.getModuleName()}`);
      this.module.component(component.name, component.config)
    });
  }

  registerDirective(directive: IRegisterMeta<() => ng.IDirective>) {
    console.debug(`Регистрируем директиву '${directive.name}' в модуле ${this.getModuleName()}`);
    this.module.directive(directive.name, directive.config)
  }

  registerFilter(filter: IRegisterMeta<() => (input: string) => string>) {
    console.debug(`Регистрируем фильтр '${filter.name}' в модуле ${this.getModuleName()}`);
    this.module.filter(filter.name, filter.config)
  }

  registerServices(services: IRegisterMeta<Function>[]) {
    services.forEach(service => {
      console.debug(`Регистрируем сервис '${service.name}' в модуле ${this.getModuleName()}`);
      this.module.service(service.name, service.config)
    })
  }

  config(initializationFunction: Function) { this.module.config(initializationFunction) }
  run(initializationFunction: Function) { this.module.run(initializationFunction) }

}
