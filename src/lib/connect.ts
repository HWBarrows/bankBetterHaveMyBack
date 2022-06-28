import mongoose from 'mongoose';

function connect() {
  const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
  const connStr = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;

  const { connection } = mongoose;
  connection.on('connecting', () => console.log('[M] connecting'));
  connection.on('connected', () => console.log('[M] connected'));
  connection.on('disconnecting', () => console.log('[M] disconnecting'));
  connection.on('disconnected', () => console.log('[M] disconnected'));
  connection.on('error', () => console.log('[M] error', Error));

  mongoose.connect(connStr);
}

export default connect;
