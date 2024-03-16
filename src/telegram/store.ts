import EventEmitter from "events";

// change the storemangaement class as per requirements

export class StoreManagement {
  private data: Map<string, any> = new Map();
  public emitter: EventEmitter = new EventEmitter();

  constructor(_emitter: EventEmitter) {
    this.emitter = _emitter;
  }

  // Add data to the store
  addItem(key: string, item: any): void {
    //regular add item
    this.data.set(key, item);
  }

  // Get data by key
  getItem(key: string): any | undefined {
    return this.data.get(key);
  }

  // Remove data by key
  removeItem(key: string): void {
    if (this.data.has(key)) {
      this.data.delete(key);
      console.log(`Item with key ${key} removed.`);
    } else {
      console.log(`Item with key ${key} not found.`);
    }
  }

  // Display all items in the store
  displayItems(): void {
    console.log("Items in the store:");
    this.data.forEach((item, key) => {
      console.log(`Key: ${key}, Value: ${JSON.stringify(item)}`);
    });
  }
};
