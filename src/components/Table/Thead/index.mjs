import { Th } from '../Th/index.mjs'
import { Tr } from '../Tr/index.mjs'
import * as S from './styles.mjs'

export const Thead = ({ children = [] }) => {
  const thTextcontentList = children

  return `
<thead style="${S.Thead.split('').join('')}">
${Tr({
    children: thTextcontentList.map(thTextcontent => Th({ children: thTextcontent }))
  })}
</thead>
`}