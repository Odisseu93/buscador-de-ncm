import { Th } from '../Th/index.mjs'
import { Tr } from '../Tr/index.mjs'
import * as S from './styles.mjs'

export const Thead = (children) => {
 
  return `
<thead style="${S.Thead}">
${Tr(children.map(textcontent => Th(textcontent)))}
</thead>
`}