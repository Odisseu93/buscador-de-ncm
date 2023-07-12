
export const filterNCMs = (NCMList, keyword) => NCMList.filter((ncm) => {
  return ncm.descricao.toLowerCase().includes(keyword.toLowerCase())
})