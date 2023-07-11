import * as S from './styles.mjs'

export const SearchInput = ({ onInput }) => {

  document.querySelector('body > #root').oninput = (e) => e.target.type === 'search' && onInput(e)

  return `
     <div  style='${S.searchContainer.split('').join('')}'>
      <input 
        type="search" 
        id="search" 
        placeholder="Digite uma nomenclatura..."  
        style='${S.searchInput.split('').join('')}'
      >
    </div>
`
}