"use strict";
// Record<keyof EventMap,Map<keyof EventMap>[]>;
class EventProcessor {
    constructor() {
        this.maps = {};
        this.filters = {};
        this.processed = [];
    }
    handleEvent(eventName, data) {
        var _a, _b;
        let allowEvent = true;
        for (const filter of (_a = this.filters[eventName]) !== null && _a !== void 0 ? _a : []) {
            if (!filter(data)) {
                allowEvent = false;
                break;
            }
        }
        if (allowEvent) {
            let mappedData = Object.assign({}, data);
            for (const map of (_b = this.maps[eventName]) !== null && _b !== void 0 ? _b : []) {
                mappedData = map(data);
            }
            this.processed.push({ eventName, data: mappedData });
        }
    }
    addFilter(eventName, filter) {
        var _a;
        (_a = this.filters)[eventName] || (_a[eventName] = []);
        this.filters[eventName].push(filter);
        console.log(this.filters);
    }
    addMap(eventName, map) { }
    getProcessedEvents() {
        return this.processed;
    }
}
class UserEventProcessor extends EventProcessor {
}
const uep = new UserEventProcessor();
uep.addFilter("login", ({ user }) => Boolean(user));
uep.addMap("login", (data) => (Object.assign(Object.assign({}, data), { hasSession: Boolean(data.user && data.name) })));
uep.handleEvent("login", {
    user: null,
    name: "jack",
});
uep.handleEvent("login", {
    user: "tom",
    name: "tomas",
});
uep.handleEvent("logout", {
    user: "tom",
});
console.log(uep.getProcessedEvents());
/*
  Result:
  [
    {
      eventName: 'login',
      data: { user: 'tom', name: 'tomas', hasSession: true }
    },
    { eventName: 'logout', data: { user: 'tom' } }
  ]
  */
