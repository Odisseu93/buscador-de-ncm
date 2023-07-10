import { isHTML } from './validate.mjs'

export const updateComponent = (
  element,
  HTMLInjection = '',
) => {

  let  target = element

  if(!document.contains(element)) {
    throw new Error(`the elemet ${element} don't exist in the DOM`)
  }

  if(!isHTML(HTMLInjection)) {
    throw new Error(`invalid HTML!
    '${HTMLInjection}'`)
  }

  let data = HTMLInjection;
    data = data
      .replace(/<script>[/s/S]*?<\/script>/, '')
  
  target.innerHTML = data;
}

