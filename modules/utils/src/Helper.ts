export class Helper {

    capitalize(v: string): string {
        return v.charAt(0).toUpperCase() + v.slice(1)
    }

    withPrefix(prefix: string, v: string) {
        return prefix + this.capitalize(v)
    }

    applyMixins(derivedCtor: any, baseCtors: any[]) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            })
        });
    }

    nullObj(obj: {}){
        Object.getOwnPropertyNames(obj).forEach(name =>{
            obj[name] = null;
        })
    }

    assignegValueOfObjElement(data, obj) {
        Object.getOwnPropertyNames(data).forEach(name => {
            obj[name] = data[name];
        })
    }

    handleNull(o: () => any): string {
        try {
            return o()
        } catch (err) {
            return ""
        }
    }

    getArrElementByKey(arr:any[], key:string, value:string):{}{
        let res;
        arr.forEach((element)=>{
            if(element[key] == value){
                res = element;
            }
        });
        return res;
    }

    getArrElementByName(arr:any[],name:string):{}{
        let res;
        arr.forEach((element)=>{
            if(element.name == name){
                res = element;
            }
        });
        return res;
    }

}
export default new Helper()