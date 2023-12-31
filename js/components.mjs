import { sanitizeHTML } from "./sanitizeHTML.mjs"

const paginationContainer = document.getElementById('pagination')

const Tr = (name, NCMcode) => {
  const tr = document.createElement( 'tr')
  const description = document.createElement( 'td')
  const code = document.createElement('td')

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
    const button = document.createElement('button')

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
    const previousButton = document.createElement('button')
    previousButton.textContent = sanitizeHTML('Anterior')
    previousButton.setAttribute('aria-disabled', 'false')

    previousButton.addEventListener('click', () => {
      callback(currentPage - 1)
    })

    paginationContainer.insertBefore(previousButton, paginationContainer.firstChild)
  }

  // Botão 'Próximo'
  if (endPage < totalPages) {
    const nextButton = document.createElement('button')
    nextButton.textContent = sanitizeHTML('Próximo')
    nextButton.setAttribute('aria-disabled', 'false')

    nextButton.addEventListener('click', () => {
      callback(currentPage + 1)
    })

    paginationContainer.appendChild(nextButton)
  }
}


export const NCMNotFound = () => {
  const p = document.createElement('p')

  p.classList.add('NCM-not-found')
  p.textContent= 'NCM não encontrado!'

  return p
}

// LoadingSpinner
const spinnerContainer = document.createElement('div')
const loadingSpinner = document.createElement('div')

spinnerContainer.classList.add('spinner-container')
loadingSpinner.classList.add('loading-spinner')

spinnerContainer.appendChild(loadingSpinner)

export const LoadingSpinner = ({ isLoading } = {
  isLoading: false
}) =>  {
  isLoading ? 
  spinnerContainer.style.display = 'block' :
  spinnerContainer.style.display = 'none'

  return spinnerContainer
}
//
