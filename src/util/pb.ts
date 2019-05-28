import root from '../protobuf/protobuf';

export function Uint8ArryToString (uint8: Uint8Array) : string {
    let str = '';
    for (let i = 0, len = uint8.length; i < len; i++) {
        str += String.fromCharCode(uint8[i]);
    }
    return str;
}

export function StringToUint8Array (str: string) : Uint8Array {
    let bytes = [];
    for (let i = 0, len = str.length; i < len; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return new Uint8Array(bytes);
}

export function getUrlPath (url: string) : string {
    let regex = /(?:^|\w)(\/[\w/$]*)/;
    let result = regex.exec(url);
    if (result) {
        return result[1];
    } else {
        return '';
    }
}

export function pbEncode (pb: string, data: Object): any {
    let pbMsg: any = root.lookup(pb);
    let pbObj = pbMsg.create(data);
    return pbMsg.encode(pbObj).finish();
}

export function pbDecode (pb: string, data: Uint8Array): any {
    let pbMsg: any = root.lookup(pb);
    return pbMsg.decode(data);
}