export async function getSitePage(pageId) {
  const byDocId = await client.fetch(
    `*[_type == "sitePage" && _id == $docId][0]`,
    { docId: `${pageId}-page` }
  );
  if (byDocId) return byDocId;
  return client.fetch(
    `*[_type == "sitePage" && pageId == $pageId][0]`,
    { pageId }
  );
}