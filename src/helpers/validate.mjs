const isHTML = (htmlString) => {
  let regexForHTML = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
  let isValid = regexForHTML.test(htmlString);

  return isValid
}

/**
 * @param element pass the selector as a parameter example: '#id', '.className', 'input' ...
 */
const thisHTMLElementExists = (element) => document.contains(document.querySelector(`${element}`))


export { isHTML, thisHTMLElementExists }