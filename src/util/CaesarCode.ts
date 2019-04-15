export default class CaesarCode {
  static modulo (n: number, p: number): number {
    return ((n % p) + p) % p
  }

  static encrypt (message: string, key: number) {
    let encryptedMessage = ''

    for (let i = 0; i < message.length; i++) {
      let code = message.charCodeAt(i)

      // Encrypt only letters in 'A' ... 'Z' interval
      if (code >= 65 && code <= 65 + 26 - 1) {
        code -= 65
        code = CaesarCode.modulo(code + key, 26)
        code += 65
      }

      encryptedMessage += String.fromCharCode(code)
    }

    return encryptedMessage
  }
}
