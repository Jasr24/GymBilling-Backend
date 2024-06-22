const crypto = require('crypto');

class EncryptionService {

    secretKey = 'reyV9ZL1tMolVfiX4zT0+psNNeOsP686';
    algorithm = 'aes-256-cbc';
    iv = Buffer.from('0123456789abcdef0123456789abcdef', 'hex'); //este sera fijo

    constructor() {
        //this.secretKey = crypto.createHash('sha256').update(String('miClaveSecreta')).digest('base64').substr(0, 32); // de esta manera podemos crear la key si no la tenemos aún.
        //console.log(this.secretKey)
    }

    encrypt(data: any) {
        const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.secretKey), this.iv);
        let encrypted = cipher.update(data);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return `${this.iv.toString('hex')}:${encrypted.toString('hex')}`;
    }

    decrypt(encryptedData: any) {
        const [iv, encryptedText] = encryptedData.split(':');
        const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.secretKey), Buffer.from(iv, 'hex'));
        let decrypted = decipher.update(Buffer.from(encryptedText, 'hex'));
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

}
const encryptionService = new EncryptionService();
export default encryptionService;