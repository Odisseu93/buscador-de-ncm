import { App } from "./App.mjs"
import { Footer } from "./components/Footer/index.mjs"
import { WrapperHTML } from "./helpers/WrapperHTML.mjs"
import { updateComponent } from "./helpers/updateComponent.mjs"
import * as S from './styles/mainStyles.mjs'

updateComponent(document.querySelector('#root'),
  WrapperHTML(
    {
      HTML: [
        `<style>${S.Main.split('').join('')}</style>`,
        App(),
        Footer(),
      ]
    })
)