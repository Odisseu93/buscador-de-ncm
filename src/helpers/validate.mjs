const isHTML = (htmlString) => {
  let regexForHTML = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
  let isValid = regexForHTML.test(htmlString);

  return isValid
}

export { isHTML }