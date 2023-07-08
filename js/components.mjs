import { sanitizeHTML } from "./sanitizeHTML.mjs"

const Tr = (name, NCMcode) => {
  const tr = document.createElement('tr')
  const description = document.createElement('td')
  const code = document.createElement('td')

  description.textContent = sanitizeHTML(name)
  code.textContent = sanitizeHTML(NCMcode)

  tr.appendChild(description)
  tr.appendChild(code)

  return tr
}

export const Tbody = (data, start, end) => data.length > 0 && [...data].slice(start, end).map(({ name, code }) => {
  NCMTbody.appendChild(Tr(name, code))
})

export const  Pagination = (totalPages, currentPage, callback) => {
  const paginationContainer = document.getElementById('pagination')
  paginationContainer.innerHTML = ''

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
    const button = document.createElement('button')

    button.innerText = sanitizeHTML(i)
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
    const previousButton = document.createElement('button')
    previousButton.innerText = sanitizeHTML('Anterior')
    previousButton.setAttribute('aria-disabled', 'false')

    previousButton.addEventListener('click', () => {
      callback(currentPage - 1)
    })

    paginationContainer.insertBefore(previousButton, paginationContainer.firstChild)
  }

  // Botão 'Próximo'
  if (endPage < totalPages) {
    const nextButton = document.createElement('button')
    nextButton.innerText = sanitizeHTML('Próximo')
    nextButton.setAttribute('aria-disabled', 'false')

    nextButton.addEventListener('click', () => {
      callback(currentPage + 1)
    })

    paginationContainer.appendChild(nextButton)
  }
}
