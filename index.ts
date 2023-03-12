import postgres from 'postgres';

const sql = postgres({ host: '127.0.0.1' });

console.log(await sql`SELECT * FROM customers`);

await sql.end();
