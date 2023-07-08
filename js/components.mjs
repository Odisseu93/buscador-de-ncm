import { sanitizeHTML } from "./sanitizeHTML.mjs"

const paginationContainer = document.getElementById('pagination')

const Tr = (name, NCMcode) => {
  const tr = document.createElementNS('http://www.w3.org/1999/xhtml', 'tr')
  const description = document.createElementNS('http://www.w3.org/1999/xhtml', 'td')
  const code = document.createElementNS('http://www.w3.org/1999/xhtml','td')

  tr.classList.add('table-row')

  description.classList.add('description')
  description.textContent = sanitizeHTML(name)

  code.classList.add('code')
  code.textContent = sanitizeHTML(NCMcode)

  tr.appendChild(description)
  tr.appendChild(code)

  return tr
}

export const Tbody = (data, start, end) => data.length > 0 && data.slice(start, end).map(({ name, code }) => {
  const fragment = document.createDocumentFragment()

  const slicedData = data.slice(start, end)

  for (const { name, code } of slicedData) {
    fragment.appendChild(Tr(name, code));
  }

  NCMTbody.appendChild(fragment)
})

export const  Pagination = (totalPages, currentPage, callback) => {
  paginationContainer.textContent = sanitizeHTML('')

  const maxVisiblePages = 5 // Número máximo de páginas visíveis
  const halfVisiblePages = Math.floor(maxVisiblePages / 2)

  let startPage = currentPage - halfVisiblePages
  if (startPage < 1) {
    startPage = 1
  }

  let endPage = startPage + maxVisiblePages - 1
  if (endPage > totalPages) {
    endPage = totalPages
  }

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElementNS('https://www.w3.org/1999/xhtml', 'button')

    button.textContent = sanitizeHTML(i)
    button.title = `Ir para a página ${i}`

    if (i === currentPage) {
      button.classList.add('active')
    }

    button.addEventListener('click', () => {
      callback(i)
    })

    paginationContainer.appendChild(button)
  }

  // Botão 'Anterior'
  if (startPage > 1) {
    const previousButton = document.createElementNS('https://www.w3.org/1999/xhtml', 'button')
    previousButton.textContent = sanitizeHTML('Anterior')
    previousButton.setAttribute('aria-disabled', 'false')

    previousButton.addEventListener('click', () => {
      callback(currentPage - 1)
    })

    paginationContainer.insertBefore(previousButton, paginationContainer.firstChild)
  }

  // Botão 'Próximo'
  if (endPage < totalPages) {
    const nextButton = document.createElementNS('https://www.w3.org/1999/xhtml', 'button')
    nextButton.textContent = sanitizeHTML('Próximo')
    nextButton.setAttribute('aria-disabled', 'false')

    nextButton.addEventListener('click', () => {
      callback(currentPage + 1)
    })

    paginationContainer.appendChild(nextButton)
  }
}
