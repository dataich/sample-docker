const http = require('http');
const {Client} = require('pg');
const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  const client = new Client({
    user: 'postgres',
    password: 'postgres',
    host: 'sample.db',
    database: 'sample'
  });
  try {
    await client.connect();
    const {rows} = await client.query('select now()');
    res.end(rows[0]['now'].toString());
  } catch (e) {
    res.end(e.stack);
  }
});

const port = 3000;
server.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}/`);
});