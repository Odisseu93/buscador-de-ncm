import { fragment } from '../../../helpers/fragment.mjs'
import { Th } from '../Th/index.mjs'
import { Tr } from '../Tr/index.mjs'
import * as S from './styles.mjs'

export const Thead = (children) => (`
  <thead style="${S.Thead}">
    ${Tr(fragment(children.map(textcontent => Th(textcontent))))}
  </thead>
`)