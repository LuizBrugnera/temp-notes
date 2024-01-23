interface Item {
  id: string;
  text: string;
}

export const db = {
  data: [] as Item[],
  find: () => db.data,
  findById: (id: string) => db.data.find((item) => item.id === id),
  create: (item: Item) => db.data.push(item),
  delete: (id: string) => (db.data = db.data.filter((item) => item.id !== id)),
  update: (id: string, item: Item) => {
    const index = db.data.findIndex((item) => item.id === id);
    db.data[index] = item;
  },
  deleteAll: () => (db.data = []),
  upsert: (id: string, item: Item) => {
    const index = db.data.findIndex((item) => item.id === id);
    if (index === -1) {
      db.data.push(item);
    } else {
      db.data[index] = item;
    }
  },
};
