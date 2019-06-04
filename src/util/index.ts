export { Uint8ArryToString, StringToUint8Array, pbEncode, pbDecode, getUrlPath } from './pb';

export function getParamValue(param: string) {
    let search = window.location.href;
    if (search !== '') {
        const index = search.indexOf('?');
        search = search.slice(index + 1);
        let paramArr = search.split('&');
        let params: any = {};
        paramArr.forEach(item => {
            let itemArr = item.split('=');
            if (itemArr.length > 1) {
                params[itemArr[0]] = itemArr[1];
            }
        });
        return params[param];
    } else {
        return '';
    }
}

export function random(n: number, m: number) {
    return Math.floor(Math.random() * (m - n + 1) + n);
}