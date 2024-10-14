/** DB access module **/

import sqlite3 from "sqlite3";

// Connection the database
const db = new sqlite3.Database('OfficeQueueManagement', (err) => {
    if (err) throw err;
});

export default db;