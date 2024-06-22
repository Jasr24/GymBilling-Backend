"use strict";
const crypto = require('crypto');
const mysql = require('mysql2/promise');
class EncryptionService {
    constructor() {
        this.secretKey = 'miClaveSecreta';
        this.algorithm = 'aes-256-cbc';
        this.iv = crypto.randomBytes(16);
    }
    encrypt(data) {
        const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.secretKey), this.iv);
        let encrypted = cipher.update(data);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return `${this.iv.toString('hex')}:${encrypted.toString('hex')}`;
    }
    decrypt(encryptedData) {
        const [iv, encryptedText] = encryptedData.split(':');
        const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.secretKey), Buffer.from(iv, 'hex'));
        let decrypted = decipher.update(Buffer.from(encryptedText, 'hex'));
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}
module.exports = EncryptionService;
