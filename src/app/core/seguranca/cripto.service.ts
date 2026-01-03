import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CriptoService {
  valoresAleatorio(i: number = 10) {
    const array = new Uint8Array(i);
    crypto.getRandomValues(array);
    return Array.from(array)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  async hash256(texto: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(texto);
    const hash = await crypto.subtle.digest('SHA-256', data);

    return Array.from(new Uint8Array(hash))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  async criptografar(texto: string, senha: string) {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encodedPlaintext = new TextEncoder().encode(texto);

    const secretKey = await window.crypto.subtle.importKey(
      'raw',
      await this.getKeyFromPassword(senha, window.crypto),
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt']
    );

    const ciphertext = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      secretKey,
      encodedPlaintext
    );

    return {
      ciphertext: new Uint8Array(ciphertext, 0, 5),
      iv: new Uint8Array(iv),
    };
  }

  str2ab(str: string): ArrayBuffer {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  ab2Str(buff: ArrayBuffer) {
    return Array.from(new Uint8Array(buff))
      .map((byte) => String.fromCharCode(byte))
      .join('');
  }

  async getKeyFromPassword(senha: string, crypto: any) {
    const enc = new TextEncoder();

    return crypto.subtle.importKey('raw', new Uint8Array(this.str2ab(senha)), 'AES-GCM', true, [
      'encrypt',
      'decrypt',
    ]);
  }

  async importSecretKey(senha: string) {
    const enc = new TextEncoder();

    return window.crypto.subtle.importKey('raw', enc.encode(senha), 'AES-GCM', true, [
      'encrypt',
      'decrypt',
    ]);
  }

  async generateKey() {
    let key = await window.crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  async exemplo() {
    const key = await window.crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt']
    );

    console.log(key);

    this.exportCryptoKey(key).then((res) => {
      let x = Array.from(res)
        .map((byte) => String.fromCharCode(byte))
        .join('');

      localStorage.setItem('EXEMPLO', x);
    });
  }

  async exemplo2() {
    let dados = localStorage.getItem('EXEMPLO') || '';
    console.log(dados);

    let bytes = this.str2ab(dados);

    let x = new Uint8Array(bytes);

    console.log(x);

    const key = await window.crypto.subtle.importKey('raw', x, 'AES-GCM', true, [
      'encrypt',
      'decrypt',
    ]);
  }

  async exportCryptoKey(key: any): Promise<Uint8Array> {
    const exported = await window.crypto.subtle.exportKey('raw', key);
    const exportedKeyBuffer = new Uint8Array(exported);
    return exportedKeyBuffer;
  }
}
