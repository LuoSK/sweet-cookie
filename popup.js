import docCookies from './cookies.js'
let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
let domain = ''
if (tab?.url) {
  try {
    let url = new URL(tab.url);
    domain = url.hostname;
  } catch { }
}
let cookiesGlobal = {}

parseBtn.addEventListener('click', () => {
  const value = cookieInput.value
  updateResult(docCookies.parse(value))
})

setCookieBtn.addEventListener('click', async function() {
  try {
    const setDomain = domain.split('.').slice(1).join('.')

    for (let key in cookiesGlobal) {
      await chrome.cookies.set({
        domain: setDomain,
        name: key,
        value: cookiesGlobal[key],
        url: `https://${domain}/`,
        secure: true,
        sameSite: 'no_restriction'
      })
    }
    alert('successed')
  } catch (error) {
    alert(error)
  }
})

const updateResult = function(cookies) {
  let template = ''
  for (const key in cookies) {
    template += `<p>${key}: ${cookies[key]}</p>`
  }
  if (template) {
    cookiesGlobal = cookies
    resultView.innerHTML = template
    setCookieBtn.style.display = 'block'
  } else {
    alert('未解析到cookie')
  }
}
