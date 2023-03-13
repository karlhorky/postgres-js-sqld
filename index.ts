import postgres from 'postgres';

const sql = postgres({ host: '127.0.0.1' });

await sql`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    expiry_timestamp TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '+14 days'))
  )
`;

const newRecords = [
  {
    message: `Hello at ${new Date().toISOString()}`,
  },
];

for (const newRecord of newRecords) {
  await sql`
    INSERT INTO messages (message)
    VALUES (${newRecord.message})
  `;
}

console.log(await sql`SELECT * FROM messages`);

await sql.end();
