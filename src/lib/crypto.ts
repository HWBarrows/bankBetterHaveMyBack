import bcrypt from 'bcrypt';

function hash(password: string) {
  return bcrypt.hash(password, 3);
}

async function validHash(password: string, hash: string) {
  const result = await bcrypt.compare(password, hash);
  return result;
}

export { hash, validHash };
