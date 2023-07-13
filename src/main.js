import * as S from './styles/mainStyles.mjs'

import { App } from "./App.mjs"
import { Footer } from "./components/Footer/index.mjs"

import { updateComponent } from "./helpers/updateComponent.mjs"
import { fragment } from "./helpers/fragment.mjs"

updateComponent(document.querySelector('#root'),
  fragment(
    [
      `<style>${S.Main}</style>`,
      App(),
      Footer(),
    ]
  )
)