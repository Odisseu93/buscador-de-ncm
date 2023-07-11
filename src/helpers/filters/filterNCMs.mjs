
export const filterNCMs = (NCMList, targetWord) => NCMList.filter((ncm) => {
  return ncm.name.toLowerCase().includes(targetWord.toLowerCase())
})