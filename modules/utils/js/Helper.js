var Helper = (function () {
    function Helper() {
    }
    Helper.prototype.capitalize = function (v) {
        return v.charAt(0).toUpperCase() + v.slice(1);
    };
    Helper.prototype.withPrefix = function (prefix, v) {
        return prefix + this.capitalize(v);
    };
    Helper.prototype.applyMixins = function (derivedCtor, baseCtors) {
        baseCtors.forEach(function (baseCtor) {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    };
    Helper.prototype.nullObj = function (obj) {
        Object.getOwnPropertyNames(obj).forEach(function (name) {
            obj[name] = null;
        });
    };
    Helper.prototype.assignegValueOfObjElement = function (data, obj) {
        Object.getOwnPropertyNames(data).forEach(function (name) {
            obj[name] = data[name];
        });
    };
    Helper.prototype.handleNull = function (o) {
        try {
            return o();
        }
        catch (err) {
            return "";
        }
    };
    return Helper;
}());
