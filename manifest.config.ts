import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: 'AI Work Companion',
  version: pkg.version,
  description: 'A pet that grows from your own ChatGPT activity.',
  permissions: ['storage'],
  host_permissions: ['https://chatgpt.com/*', 'https://chat.openai.com/*'],
  content_scripts: [
    {
      matches: ['https://chatgpt.com/*', 'https://chat.openai.com/*'],
      js: ['src/content/main.tsx'],
      run_at: 'document_idle',
    },
  ],
})
