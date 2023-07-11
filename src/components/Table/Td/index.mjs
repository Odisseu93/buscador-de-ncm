import * as S from './styles.mjs'

/**
 @param children element html
 */

export const Td = ({ children }) => `<td style="${S.Td.split('').join('')}">${children}</td>`
  