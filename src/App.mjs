import * as S from './styles/appStyles.mjs'

import { Title } from './components/Title/index.mjs'
import { SearchInput } from './components/SearchInput/index.mjs'
import { Table } from './components/Table/index.mjs'
import { Thead } from './components/Table/Thead/index.mjs'
import { Tbody } from './components/Table/Tbody/index.mjs'
import { Tr } from './components/Table/Tr/index.mjs'
import { Td } from './components/Table/Td/index.mjs'
import { ApiRequestProblem } from './components/ApiRequestProblem/index.mjs'
import { NotFound } from './components/NotFound/index.mjs'
import { LoadingSpinner } from './components/LoadingSpinner/index.mjs'

import { apiGetNCMsByDescOrCode } from './services/getNCMsByDescOrCode.mjs'

import { fragment } from './helpers/fragment.mjs'
import { updateComponent } from "./helpers/updateComponent.mjs"
import { thisHTMLElementExists } from './helpers/validate.mjs'

export const App = () => {

  const tbodyLines = ({ liList = [] }) => {
    return liList.map((ncm) =>
      Tr([Td(ncm.descricao), Td(ncm.codigo)].join(''))
    )
  }

  const getAllNCMs = (key) => {

    if (!key) {
      return updateComponent(
        document.querySelector('#root table tbody'),
        fragment([Tbody(Tr(Td('')))])
      )
    }

    apiGetNCMsByDescOrCode(key).then((NCMList) => {
      let tbodyContent = ''

      if (NCMList.length > 0) {
        tbodyContent = fragment(tbodyLines({ liList: NCMList }))
      } else {
        updateComponent(
          document.querySelector('#root  table tbody'),
          fragment([Tbody(Tr(Td(NotFound())))])
        )
        return
      }

      updateComponent(document.querySelector('#root  table tbody'),
        fragment([Tbody(tbodyContent)])
      )
      return
    }
    ).catch(() => {
      updateComponent(document.querySelector('#root  table tbody'),
        fragment([Tbody(Tr(Td(ApiRequestProblem())))])
      )
    })
  }

  const handleSearchInput = (e) => {

    // prevent constant rendering
    if(!thisHTMLElementExists('#loadingSpiner')) {
      updateComponent(
        document.querySelector('#root table tbody'),
        fragment([Tbody(Tr(LoadingSpinner()))])
        )
    }

    if (e.target.value === '') getAllNCMs(null)
    else {     
      setTimeout(() => {
        getAllNCMs(e.target.value)
      }, 3000)
    }
  }

  const TableContent = `
  ${fragment([
    Thead(['Descrição', 'Código']), Tbody(Tr(Td('')))
  ])}
  `

  return `
    <main id="app"  style="${S.App}"> 
      ${fragment(
        [
          Title(),
          SearchInput({ onInput: handleSearchInput }),
          Table(TableContent),
        ]
      )
    }
    </main>
`
}