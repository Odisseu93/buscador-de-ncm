import * as S from './styles.mjs'

export const SearchInput = ({ onInput }) => {

  document.querySelector('body > #root').oninput = (e) => e.target.type === 'search' && onInput(e)

  return `
     <div style="${S.searchContainer}">
      <input 
        type="search" 
        id="search" 
        placeholder="Digite uma nomenclatura..."  
        style="${S.searchInput}"
      >
    </div>
`
}