import * as crypto from 'crypto';

export const hashPassword = (plain_text: string): string[] => {
  // creating a unique salt for a particular user
  const salt: string = crypto.randomBytes(16).toString('hex');

  // hashing user's salt and password
  const hash: string = crypto.pbkdf2Sync(plain_text, salt, 1000, 64, 'sha512').toString('hex');

  return [hash, salt];
};

export const hashPasswordWithSalt = (plain_text: string, salt: string | null): string => {
  if (!salt) {
    salt = crypto.randomBytes(16).toString('hex');
    return crypto.pbkdf2Sync(plain_text, salt, 1000, 64, 'sha512').toString('hex');
  }
  return crypto.pbkdf2Sync(plain_text, salt, 1000, 64, 'sha512').toString('hex');
};

export const comparePassword = (pwd_req: string, pwd_hash: string, salt: string | null): boolean => {
  const pwd_req_hash = hashPasswordWithSalt(pwd_req, salt);
  return pwd_req_hash === pwd_hash;
};
