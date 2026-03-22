import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import schemas from './schemas'
import { deskStructure } from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Blog',
  projectId: 'q5ebm0hv',
  dataset: 'production',
  plugins: [
    deskTool({
      structure: deskStructure, // <-- add this
    }),
  ],
  schema: { types: schemas },
})