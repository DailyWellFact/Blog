// /sanity/deskStructure.ts
export const deskStructure = (S: any) => 
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Posts')
        .schemaType('post')
        .child(S.documentTypeList('post').title('Posts')),
    ])