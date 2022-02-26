import { h, Component } from 'preact'
import { useState } from 'preact/hooks'
import docCookies from '../utils/cookie'

import styles from './index.scss'

export default class OldVersion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      domain: '',
    }
  }
  render() {
    const [cookieVal, setCookieVal] = useState('')
    const [cookieBtnVisible, setCookieBtnVisible] = useState(false)
    const [cookieObj, setCookieObj] = useState({})


    const parseCookie = () => {
      const cookies = docCookies.parse(cookieVal)

      if (Object.keys(cookies).length > 0) {
        setCookieObj({
          ...cookies
        })
        setCookieBtnVisible(true)
      } else {
        alert('未解析到cookie')
      }
    }

    const setCookie = async () => {
      try {
        const domains = this.state.domain.split('.')
        const setDomain = (domains.length > 2 ? domains.slice(1) : domains).join('.')

        for (let key in cookieObj) {
          await chrome.cookies.set({
            domain: setDomain,
            name: key,
            value: cookieObj[key],
            url: `https://${this.state.domain}/`,
            secure: true,
            sameSite: 'no_restriction'
          })
        }
        alert('successed')
      } catch (error) {
        alert(error)
      }
    }

    return (
      <div className={styles.main}>
        <label for="cookie">cookie: </label>
        <input type="text" name="cookie" class={styles.cookieInput} value={cookieVal} onChange={(e) => setCookieVal(e.target.value)} />
        <br />
        <br />
        <button onClick={parseCookie}>解析Cookie</button>
        <div>
          {
            Object.keys(cookieObj).map(key => (
              <p>{key}: {cookieObj[key]}</p>
            ))
          }
        </div>
        {cookieBtnVisible ? <button onClick={setCookie}>设置Cookie</button> : null}
      </div >
    )
  }

  async componentWillMount() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log('%c [ tab ]-73', 'font-size:13px; background:pink; color:#bf2c9f;', tab)
    if (tab?.url) {
      try {
        let url = new URL(tab.url);
        console.log('%c [ url ]-77', 'font-size:13px; background:pink; color:#bf2c9f;', url)
        this.setState({ domain: url.hostname })
      } catch { }
    }
  }
} 