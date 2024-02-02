const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync(path.join(__dirname, '../config/private.key'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, '../config/public.key'), 'utf8');
const tokenExpiry = process.env.TOKEN_EXPIRY || '1h';

const security = {
  hashPassword: (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { salt, hash };
  },

  verifyPassword: (password, salt, originalHash) => {
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === originalHash;
  },

  generateToken: (payload) => {
    return jwt.sign(payload, privateKey, { expiresIn: tokenExpiry, algorithm: 'RS256' });
  },

  verifyToken: (token) => {
    try {
      return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    } catch (error) {
      return null;
    }
  },

  encryptData: (data) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(process.env.ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  },

  decryptData: (data) => {
    const textParts = data.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(process.env.ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
};

module.exports = security;