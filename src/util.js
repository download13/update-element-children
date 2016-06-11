export function ensureArray(a) {
    if (Array.isArray(a))
        return a;
    if (a)
        return [a];
    return [];
}
export function clone(a) {
    var r = {};
    for (var key in a) {
        r[key] = a[key];
    }
    return r;
}
