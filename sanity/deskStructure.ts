// /sanity/deskStructure.ts
import S from 'sanity/desk'

export const deskStructure = () =>
  S.list()
    .title('Content')
    .items([
      // Post document list
      S.listItem()
        .title('Posts')
        .schemaType('post')
        .child(
          S.documentTypeList('post').title('Posts')
        ),
    ])