import * as S from './styles.mjs'

export const Table = ({ children }) => `<table style='${S.Table.split('').join('')}'>${children}</table>`