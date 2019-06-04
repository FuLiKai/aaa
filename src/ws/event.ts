interface EventBus {
    [propName: string]: any
}
const eventBus: EventBus = {
    _events: {},
    on (eventName: string, callback: () => any) {
        if (this._events[eventName]) {
            this._events[eventName].push(callback);
        } else {
            this._events[eventName] = [callback];
        }
    },
    emit (eventName: string, e: any) {
        if (this._events[eventName]) {
            this._events[eventName].forEach((event: any) => {
                event(e);
            });
        }
    }
};

export default eventBus;