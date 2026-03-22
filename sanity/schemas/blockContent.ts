import { defineType } from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  type: 'array',
  title: 'Block Content',
  of: [{ type: 'block' }, { type: 'image' }],
})