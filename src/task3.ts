type FilterFunc<T> = (data: T[keyof T]) => boolean;
type Filters<T> = Record<keyof T, FilterFunc<T>[]>;

type MapFunct<T> = (data: T[keyof T]) => T[keyof T];
type Maps<T> = Record<keyof T, MapFunct<T>[]>;
type PrcessedEvent<T> = {
  eventName: keyof T;
  data: T[keyof T];
};
// Record<keyof EventMap,Map<keyof EventMap>[]>;

class EventProcessor<EventMap> {
  private maps: Maps<EventMap> = {} as Maps<EventMap>;
  private filters: Filters<EventMap> = {} as Filters<EventMap>;
  private processed: PrcessedEvent<EventMap>[] = [];

  handleEvent<K extends keyof EventMap>(eventName: K, data: EventMap[K]): void {
    let allowEvent = true;
    for (const filter of this.filters[eventName] ?? []) {
      if (!filter(data)) {
        allowEvent = false;
        break;
      }
    }
    if (allowEvent) {
      let mappedData = { ...data };
      for (const map of this.maps[eventName] ?? []) {
        mappedData = <EventMap[K]>map(data);
      }
      this.processed.push({ eventName, data: mappedData });
    }
  }

  addFilter<K extends keyof EventMap>(
    eventName: K,
    filter: (data: EventMap[keyof EventMap]) => boolean
  ): void {
    this.filters[eventName] ||= [];
    this.filters[eventName].push(filter);
    console.log(this.filters)
  }

  addMap<K extends keyof EventMap>(
    eventName: K,
    map: (data: EventMap[K]) => EventMap[K]
  ): void {}

  getProcessedEvents() {
    return this.processed;
  }
}

interface EventMap {
  login: { user?: string | null; name?: string; hasSession?: boolean };
  logout: { user?: string };
}

class UserEventProcessor extends EventProcessor<EventMap> {}

const uep = new UserEventProcessor();

uep.addFilter("login", ({ user }) => Boolean(user));

uep.addMap("login", (data) => ({
  ...data,
  hasSession: Boolean(data.user && data.name),
}));

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
