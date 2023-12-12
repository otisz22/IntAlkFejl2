import { JSONPreset } from "lowdb/node";

const defaultData = { users: [] };
const db = await JSONPreset("db.json", defaultData);

await db.write();

export default db;

const initDatabaseData = async () => {
  if (db.data.users.length > 0) {
    return;
  }

  db.data.users.push({ id: 1, name: "John", age: 25 });
  db.data.users.push({ id: 2, name: "Jane", age: 24 });
  db.data.users.push({ id: 3, name: "Tom", age: 4 });
  db.data.users.push({ id: 4, name: "Liam", age: 49 });
  db.data.users.push({ id: 5, name: "Feri", age: 17 });
  db.write();
};

initDatabaseData();
