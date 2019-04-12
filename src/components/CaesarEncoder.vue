<template>
  <div class="card">
    <div class="card-content">
      <div class="input-field">
        <input id="keyInput" type="number" v-model="currentKey" step="1" min="1" max="25"/>
        <label for="keyInput">Key</label>
      </div>
      <div class="input-field">
        <input id="userInput" type="text" v-model="text"/>
        <label for="userInput">Enter a text</label>
      </div>
      <p>Encrypted message: {{ text.length > 0 ? encrypt(text, currentKey) : ''}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CaesarEncoder',
  data: () => {
    return {
      text: '',
      currentKey: 3
    }
  },
  methods: {
    modulo (n, p) {
      if (n < 0) {
        n = p - Math.abs(n) % p
      }

      return n % p
    },
    encrypt (message, key) {
      const ranges = [[65, 90], [97, 122]] // A-Z & a-z
      let encryptedMessage = ''

      for (let i = 0; i < message.length; i++) {
        let code = message.charCodeAt(i)
        let foundCode = false

        for (let j = 0; j < ranges.length; j++) {
          if (code >= ranges[j][0] && code <= ranges[j][1] && !foundCode) {
            code = this.modulo((code - ranges[j][0] + Number(key)), (ranges[j][1] - ranges[j][0] + 1)) + ranges[j][0]
            foundCode = true
          }
        }

        encryptedMessage += String.fromCharCode(code)
      }

      return encryptedMessage
    }
  }
}
</script>

<style scoped>
</style>
