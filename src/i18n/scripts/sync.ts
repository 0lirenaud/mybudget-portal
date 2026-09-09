import fs from 'node:fs'
import path from 'node:path'

const enPath = path.resolve('src/i18n/en.json')
const frPath = path.resolve('src/i18n/fr.json')

const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'))
const fr = JSON.parse(fs.readFileSync(frPath, 'utf-8'))

let added = 0

function syncKeys(source: Record<string, any>, target: Record<string, any>, currentPath = '') {
  for (const key of Object.keys(source)) {
    const fullPath = currentPath ? `${currentPath}.${key}` : key

    // Clé absente du fichier français
    if (!(key in target)) {
      const value = source[key]

      // Si c'est un objet, on le copie récursivement
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        target[key] = {}
        syncKeys(value, target[key], fullPath)
      } else {
        // Ajoute un marqueur pour identifier la nouvelle traduction
        target[key] = `[TODO] ${value}`

        console.log(`🆕 ${fullPath} → [TODO] ${value}`)

        added++
      }

      continue
    }

    // Si la clé existe, on vérifie les enfants
    if (
      typeof source[key] === 'object' &&
      source[key] !== null &&
      !Array.isArray(source[key]) &&
      typeof target[key] === 'object' &&
      target[key] !== null &&
      !Array.isArray(target[key])
    ) {
      syncKeys(source[key], target[key], fullPath)
    }
  }
}

syncKeys(en, fr)

fs.writeFileSync(frPath, JSON.stringify(fr, null, 2) + '\n', 'utf-8')

console.log('\n--------------------------------')
console.log(`✅ ${added} key(s) added in fr.json`)
console.log('--------------------------------')
