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

import { apiGetAllNCMs } from './services/getAllNCMs.mjs'

import { fragment } from './helpers/fragment.mjs'
import { updateComponent } from "./helpers/updateComponent.mjs"
import { filterNCMs } from './helpers/filters/filterNCMs.mjs'

export const App = () => {

  const tbodyLines = ({ liList = [] }) => {
    return liList.map((ncm) =>
      Tr([Td(ncm.descricao), Td(ncm.codigo)].join(''))
    )
  }

  const getAllNCMs = ({ filter = null }) => {

    apiGetAllNCMs().then((allNCMs) => {
      let tbodyContent = ''

      if (allNCMs) {
        if (!filter) {
          tbodyContent = fragment(tbodyLines({ liList: allNCMs }))
        } else {
          if (filterNCMs(allNCMs, filter).length === 0) {

            updateComponent(
              document.querySelector('#root  table tbody'),
              fragment([Tbody(Tr(Td(NotFound())))])
            )
            return
          }
          tbodyContent = fragment({ HTML: tbodyLines({ liList: filterNCMs(allNCMs, filter) }) })
        }

        updateComponent(document.querySelector('#root  table tbody'),
          fragment([Tbody(tbodyContent)])
        )
        return
      }
    }).catch(() => {
      updateComponent(document.querySelector('#root  table tbody'),
        fragment([Tbody(Tr(Td(ApiRequestProblem())))])
      )
    })
  }

  // first API request
  getAllNCMs({ filter: null })

  const handleSearchInput = (e) => {
    if (e.target.value === '') getAllNCMs({ filter: null })
    else {
      setTimeout(() => {
        getAllNCMs({ filter: e.target.value })
      }, 2000)
    }
  }

  return `
    <main id="app"  style="${S.App.split('').join('')}"> 
      ${fragment(
        [
          Title(),
          SearchInput({ onInput: handleSearchInput }),
          Table(
            fragment(
                [
                  Thead(['Descrição', 'Código']),
                  Tbody(Tr(Td(LoadingSpinner())))
                ]
            )
          )
        ]
      )
    }
    </main>
`
}