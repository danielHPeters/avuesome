<template>
  <div class="card">
    <div class="card-content">
      <div class="input-field">
        <input id="keyInput" type="number" v-model="currentKey" step="1" min="1" max="25" @input="updateCaesarCode"/>
        <label for="keyInput">Key</label>
      </div>
      <div class="input-field">
        <input id="userInput" type="text" v-model="text" @input="updateCaesarCode"/>
        <label for="userInput">Enter a text</label>
      </div>
      <div class="input-field">
        <label for="caesarCode">Encrypted message</label>
        <textarea id="caesarCode" class="materialize-textarea" readonly ref="caesarCode" v-model="caesarCode"></textarea>
      </div>
      <div class="btn waves-effect waves-light" @click="copyToClipBoard()">
        <i class="material-icons left">content_copy</i>Copy to clipboard
      </div>
    </div>
  </div>
</template>

<script>
import * as M from 'materialize-css'

export default {
  name: 'CaesarEncoder',
  data: () => {
    return {
      text: '',
      caesarCode: '',
      currentKey: 3
    }
  },
  mounted: () => {
    M.updateTextFields()
  },
  updated: () => {
    M.updateTextFields()
  },
  methods: {
    updateCaesarCode () {
      this.caesarCode = this.encrypt(this.text, this.currentKey)
    },
    modulo (n, p) {
      return ((n % p) + p) % p
    },
    encrypt (message, key) {
      const ranges = [[65, 90], [97, 122]] // A-Z & a-z
      let encryptedMessage = ''

      for (let i = 0; i < message.length; i++) {
        let code = message.charCodeAt(i)
        let isCodeFound = false

        for (let j = 0; j < ranges.length; j++) {
          const base = ranges[j][0]
          const max = ranges[j][1]

          if (code >= base && code <= max && !isCodeFound) {
            code = this.modulo((code - base + Number(key)), (max - base + 1)) + base
            isCodeFound = true
          }
        }

        encryptedMessage += String.fromCharCode(code)
      }

      return encryptedMessage
    },
    copyToClipBoard () {
      const codeElement = this.$refs['caesarCode']
      const selection = getSelection()
      const previousSelection = selection.rangeCount > 0 ? selection.getRangeAt(0) : false
      const errorMessage = 'Oops, unable to copy!'
      const successMessage = 'Code successfully copied to clipboard'
      let success = false

      codeElement.select()

      success = document.execCommand('copy')
      selection.removeAllRanges()

      M.toast({ html: success ? successMessage : errorMessage })

      if (previousSelection) {
        selection.addRange(previousSelection)
      }
    }
  }
}
</script>

<style scoped>
  textarea {
    resize: none;
  }
</style>
