export const apiGetAllNCMs = async () => {
  try {
    const res = await fetch('https://brasilapi.com.br/api/ncm/v1')
    const json = await res.json()

    if(json) return json
    
    throw new Error(res)
  } catch (err) {
    throw new Error(err)
  }
}