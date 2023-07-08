export const sanitizeHTML = (dirtyHTML) => {
  const element = document.createElementNS('https://www.w3.org/1999/xhtml', 'div')
  element.innerHTML = dirtyHTML

  const sanitizedHTML = element.textContent || element.innerText;
  return sanitizedHTML
}
