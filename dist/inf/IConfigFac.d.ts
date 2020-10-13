export default interface IConfigFac {
    add(key: string, json: any): any;
    get(key: string): any;
    init(jsonPath: string): any;
}
