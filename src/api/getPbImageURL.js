export default function getPbImageURL(
  item,
  breakpoint = 'mobile',
  fileName = 'photo'
) {
  if (breakpoint === 'mobile')
    return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${item.id}/${item[fileName][0]}`;
  if (breakpoint === 'tablet')
    return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${item.id}/${item[fileName][1]}`;
  if (breakpoint === 'desktop')
    return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${item.id}/${item[fileName][2]}`;
}
