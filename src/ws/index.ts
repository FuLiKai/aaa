import { pbEncode, pbDecode } from '../util';
import eventBus from './event';

function createWebSocket (url: string) {
    let ws = new WebSocket(url);

    ws.onmessage = function (this: WebSocket, ev: MessageEvent) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(ev.data);
        reader.onloadend = () => {
            console.log(reader.result);
            let msg = pbDecode('wpb.BaseRequest', new Uint8Array(reader.result as any));
            console.log(msg);
            eventBus.emit('message', pbDecode('wpb.ReportNewMsg', msg.data));
        };
    };

    ws.onclose = function (this: WebSocket, ev: CloseEvent): any {
        console.log(this, ev);
        createWebSocket(url);
    };

    ws.onerror = function (this: WebSocket, ev: Event):any {
        console.log(this, ev);
    };

    return {
        send (data: any) {
            data = pbEncode('wpb.BaseRequest', data);
            ws.onopen = function (this: WebSocket, ev: Event):any {
                ws.send(data);
            };
        },
        onMessage (cb: (data: any) => any) {
            eventBus.on('message', cb);
        }
    };
}

export default createWebSocket;
