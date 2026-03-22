// /sanity/deskStructure.ts
import { ListItemBuilder } from 'sanity/desk'

export const deskStructure = (S: any) => {
  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Posts')
        .schemaType('post')
        .child(S.documentTypeList('post').title('Posts')),
    ])
}