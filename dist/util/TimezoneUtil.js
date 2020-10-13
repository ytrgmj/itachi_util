"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUtcOffset = void 0;
const timezone_json_1 = __importDefault(require("../data/timezone.json"));
function loadTimezoneData() {
    function charCodeToInt(charCode) {
        if (charCode > 96) {
            return charCode - 87;
        }
        else if (charCode > 64) {
            return charCode - 29;
        }
        return charCode - 48;
    }
    function unpackBase60(string) {
        let i = 0, parts = string.split('.'), whole = parts[0], fractional = parts[1] || '', multiplier = 1, num, out = 0, sign = 1;
        // handle negative numbers
        if (string.charCodeAt(0) === 45) {
            i = 1;
            sign = -1;
        }
        // handle digits before the decimal
        for (i; i < whole.length; i++) {
            num = charCodeToInt(whole.charCodeAt(i));
            out = 60 * out + num;
        }
        // handle digits after the decimal
        for (i = 0; i < fractional.length; i++) {
            multiplier /= 60;
            num = charCodeToInt(fractional.charCodeAt(i));
            out += num * multiplier;
        }
        return out * sign;
    }
    function mapIndices(source, indices) {
        let out = [], i;
        for (i = 0; i < indices.length; i++) {
            out[i] = source[indices[i]];
        }
        return out;
    }
    function intToUntil(array, length) {
        for (let i = 0; i < length; i++) {
            array[i] = Math.round((array[i - 1] || 0) + array[i] * 60000); // minutes to milliseconds
        }
        array[length - 1] = Infinity;
    }
    function arrayToInt(array) {
        for (let i = 0; i < array.length; i++) {
            array[i] = unpackBase60(array[i]);
        }
    }
    function unpack(string) {
        const data = string.split('|'), offsets = data[2].split(' '), indices = data[3].split(''), untils = data[4].split(' ');
        arrayToInt(offsets);
        arrayToInt(indices);
        arrayToInt(untils);
        intToUntil(untils, indices.length);
        return {
            name: data[0],
            offsets: mapIndices(offsets, indices),
            untils,
        };
    }
    ;
    const zones = timezone_json_1.default.zones;
    const links = timezone_json_1.default.links;
    const dataMap = new Map();
    for (const zone of zones) {
        const obj = unpack(zone);
        dataMap.set(obj.name, obj);
    }
    for (const link of links) {
        const all = link.split('|');
        if (dataMap.has(all[0])) {
            for (let i = 1, allLength = all.length; i < allLength - 1; i++) {
                dataMap.set(all[i], dataMap.get(all[0]));
            }
        }
    }
    return dataMap;
}
const timezoneDataMap = loadTimezoneData();
function getUtcOffset(timezone, timestamp) {
    const data = timezoneDataMap.get(timezone);
    if (data) {
        let target = +timestamp, untils = data.untils, i;
        for (i = 0; i < untils.length; i++) {
            if (target < untils[i]) {
                break;
            }
        }
        return data.offsets[i] * -1;
    }
    return 0;
}
exports.getUtcOffset = getUtcOffset;
