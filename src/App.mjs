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

import { WrapperHTML } from './helpers/WrapperHTML.mjs'
import { updateComponent } from "./helpers/updateComponent.mjs"
import { filterNCMs } from './helpers/filters/filterNCMs.mjs'

export const App = () => {


  const tbodyLines = ({ liList = [] }) => {
    return liList.map((ncm) =>
      Tr({
        children: [
          Td({
            children: ncm.descricao,
          }),
          Td({
            children: ncm.codigo,
          }),
        ].join(''),
      })
    )
  }

  const getAllNCMs = ({ filter = null }) => {

    apiGetAllNCMs().then((allNCMs) => {
      let tbodyContent = ''

      if (allNCMs) {
        if (!filter) {
          tbodyContent = WrapperHTML({
            HTML: tbodyLines({ liList: allNCMs})
          })
        } else {
          if (filterNCMs(allNCMs, filter).length === 0) {

            updateComponent(
              document.querySelector('#root  table tbody'),
              WrapperHTML({
                HTML: [Tbody({ children: Tr({ children: Td({ children: NotFound() }) }) })]
              })
            )
            return
          }
          tbodyContent = WrapperHTML({ HTML: tbodyLines({ liList: filterNCMs(allNCMs, filter) }) })
        }

        updateComponent(document.querySelector('#root  table tbody'),
          WrapperHTML({
            HTML: [Tbody({ children: tbodyContent })]
          })
        )
        return
      }
    }).catch(() => {
      updateComponent(document.querySelector('#root  table tbody'),
        WrapperHTML({
          HTML: [Tbody({ children: Tr({ children: Td({ children: ApiRequestProblem() }) }) })]
        })
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
      ${WrapperHTML({
    HTML:
      [
        Title(),
        SearchInput({ onInput: handleSearchInput }),
        Table({
          children:
            WrapperHTML({
              HTML:
                [
                  Thead({ children: ['Descrição', 'Código'] }),
                  Tbody({ children: Tr({ children: Td({ children: LoadingSpinner() }) }) })
                ]
            })
        })
      ]
  })
    }
    </main>
`
}