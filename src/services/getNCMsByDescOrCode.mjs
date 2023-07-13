/**
 * @param  key the parameter for this function can be a string representing an NCM code or a keyword
 */
export const apiGetNCMsByDescOrCode = async (key) => {
  try {
    const res = await fetch(`https://brasilapi.com.br/api/ncm/v1?search=${key}`)
    const json = await res.json()

    if(json) return json
    
    throw new Error(res)
  } catch (err) {
    throw new Error(err)
  }
}