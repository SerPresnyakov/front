import {TableField} from "./TableField";
import {ObjField} from "./fieldTypes/ObjField";

export class Helper {

    static getSchema(fields: TableField[]): Object {
        var props = {};
        var required: string[] = [];

        angular.forEach(fields, (f: TableField) => {

            let res = {
                title: f.title
            };

            angular.extend(res, f.fieldType.toSchema());

            props[f.name] = res;

            if (!f.nullable) {
                required.push(f.name)
            }
        });

        return {
            type: "object",
            properties: props,
            required: required
        }


    }

}