export class Helper {

  static capitalize(v: string): string {
    return v.charAt(0).toUpperCase() + v.slice(1)
  }

  static withPrefix(prefix: string, v: string) {
    return prefix + Helper.capitalize(v)
  }

  static applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
        derivedCtor.prototype[name] = baseCtor.prototype[name];
      })
    });
  }

  static nullObj(obj: {}){
    Object.getOwnPropertyNames(obj).forEach(name =>{
      obj[name] = null;
    })
  }

  static assignegValueOfObjElement(data, obj) {
    Object.getOwnPropertyNames(data).forEach(name => {
      obj[name] = data[name];
    })
  }

  static handleNull(o: () => any): string {
    try {
      return o()
    } catch (err) {
      return ""
    }
  }

}
