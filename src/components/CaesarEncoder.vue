<template>
  <div class="card">
    <div class="card-content">
      <div class="input-field">
        <input id="keyInput" type="number" v-model.number="currentKey" step="1" min="1" max="25"
               @input="updateCaesarCode"/>
        <label for="keyInput">Key</label>
      </div>
      <div class="input-field">
        <input id="userInput" type="text" v-model="text" @input="updateCaesarCode"/>
        <label for="userInput">Enter a text</label>
      </div>
      <div class="input-field">
        <label for="caesarCode">Encrypted message</label>
        <textarea id="caesarCode" class="materialize-textarea" readonly ref="caesarCode"
                  v-model="caesarCode"></textarea>
      </div>
      <div class="btn waves-effect waves-light" @click="copyToClipBoard()">
        <i class="material-icons left">content_copy</i>Copy to clipboard
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as M from 'materialize-css'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CaesarEncoder extends Vue {
  private text = ''
  private caesarCode = ''
  private currentKey = 3

  mounted (): void {
    M.updateTextFields()
  }

  updated (): void {
    M.updateTextFields()
  }

  updateCaesarCode (): void {
    this.caesarCode = this.encrypt(this.text, this.currentKey)
  }

  modulo (n: number, p: number): number {
    return ((n % p) + p) % p
  }

  encrypt (message: string, key: number): string {
    const ranges = [[65, 90], [97, 122]] // A-Z & a-z
    let encryptedMessage = ''

    for (let i = 0; i < message.length; i++) {
      let code = message.charCodeAt(i)
      let isCodeFound = false

      for (let j = 0; j < ranges.length; j++) {
        const base = ranges[j][0]
        const max = ranges[j][1]

        if (code >= base && code <= max && !isCodeFound) {
          code = this.modulo((code - base + key), (max - base + 1)) + base
          isCodeFound = true
        }
      }

      encryptedMessage += String.fromCharCode(code)
    }

    return encryptedMessage
  }

  copyToClipBoard (): void {
    const codeElement = this.$refs['caesarCode'] as HTMLFormElement
    const selection = getSelection()

    if (selection) {
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
