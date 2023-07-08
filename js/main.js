import { Tbody, Pagination } from './components.mjs'
import { filterNCMs } from './filter.mjs'
import { sanitizeHTML } from './sanitizeHTML.mjs'

function main() {

  const NCMTbody = document.querySelector('#NCMTbody')
  const search = document.querySelector('#search')

  const apiGetNCMs = async () => {
    try {
      const res = await fetch('https://brasilapi.com.br/api/ncm/v1')
      const json = await res.json()

      return json
    } catch (err) {
      console.error(err)
    }
  }

  (async () => {

    const data = await apiGetNCMs()
    let NCMList = []
    let filteredNCMs = []


    if (data) {
      data.length > 0 && data.map((ncm) => {
        const NCMData = {
          name: ncm.descricao,
          code: ncm.codigo
        }

        NCMList.push(NCMData)
        filteredNCMs.push(NCMData)
      })
    }

    search.oninput = (e) => {
      let currentPage = 1
      const itemsPerPage = 10

      if (e.target.value !== '') {
        filteredNCMs = filterNCMs(NCMList, e.target.value)
      } else {
        filteredNCMs = NCMList
      }

      const totalPages = calcTotalPages(filteredNCMs, itemsPerPage)

      currentPage = 1

      NCMTbody.textContent = sanitizeHTML('')

      Pagination(totalPages, currentPage, goToPage)

      Tbody(filteredNCMs, 0, itemsPerPage)
    }

    const calcTotalPages = (data, itemsPerPage) => (
      data.length === 0 ? 0 : Math.ceil(data.length / itemsPerPage)
    )

    let currentPage = 1
    const itemsPerPage = 10
    const totalPages = calcTotalPages(NCMList, itemsPerPage)

    Pagination(totalPages, currentPage, goToPage)
    Tbody(filteredNCMs, 0, itemsPerPage)

    function goToPage(page) {
      currentPage = page

      const start = currentPage > 1 ? (currentPage - 1) * itemsPerPage : 0
      const end = start + itemsPerPage

      NCMTbody.textContent = sanitizeHTML('')

      Tbody(filteredNCMs, start, end)

      Pagination(totalPages, currentPage, goToPage)
    }

  })()

}


main() 