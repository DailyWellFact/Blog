// /sanity/sanity.config.ts
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import schemas from './schemas'
import { deskStructure } from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'DailyWellFact CMS',
  projectId: 'q5ebm0hv', // replace with your Sanity project ID
  dataset: 'production',
  plugins: [
    deskTool({
      structure: (S) => deskStructure(S),
    }),
  ],
  schema: { types: schemas },
})
