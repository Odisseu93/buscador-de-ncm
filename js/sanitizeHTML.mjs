export const sanitizeHTML = (dirtyHTML) => {
  const element = document.createElement('div')
  element.innerHTML = dirtyHTML

  const sanitizedHTML = element.textContent || element.innerText;
  return sanitizedHTML
}
