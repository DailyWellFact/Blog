import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import schemas from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Blog',
  projectId: 'q5ebm0hv', // get from sanity.io/manage
  dataset: 'production',        // or your dataset
  plugins: [deskTool()],
  schema: { types: schemas },
})