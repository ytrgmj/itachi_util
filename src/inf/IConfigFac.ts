export default interface IConfigFac{
    add(key: string, json: any);
    get(key: string);
    init(jsonPath: string);
}