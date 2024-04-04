"use strict";

const { Logger } = require("metro-core");
class Cache {
  constructor(stores) {
    this._hits = new WeakMap();
    this._stores = stores;
  }
  async get(key) {
    const stores = this._stores;
    const length = stores.length;
    for (let i = 0; i < length; i++) {
      const store = stores[i];
      const name = store.constructor.name + "::" + key.toString("hex");
      let value = null;
      const logStart = Logger.log(
        Logger.createActionStartEntry({
          action_name: "Cache get",
          log_entry_label: name,
        })
      );
      try {
        const valueOrPromise = store.get(key);
        if (valueOrPromise && typeof valueOrPromise.then === "function") {
          value = await valueOrPromise;
        } else {
          value = valueOrPromise;
        }
      } finally {
        Logger.log(Logger.createActionEndEntry(logStart));
        Logger.log(
          Logger.createEntry({
            action_name: "Cache " + (value == null ? "miss" : "hit"),
            log_entry_label: name,
          })
        );
        if (value != null) {
          this._hits.set(key, store);
          return value;
        }
      }
    }
    return null;
  }
  async set(key, value) {
    const stores = this._stores;
    const stop = this._hits.get(key);
    const length = stores.length;
    const promises = [];
    for (let i = 0; i < length && stores[i] !== stop; i++) {
      const store = stores[i];
      const name = store.constructor.name + "::" + key.toString("hex");
      Logger.log(
        Logger.createEntry({
          action_name: "Cache set",
          log_entry_label: name,
        })
      );
      promises.push(stores[i].set(key, value));
    }
    await Promise.all(promises);
  }
  get isDisabled() {
    return this._stores.length === 0;
  }
}
module.exports = Cache;
