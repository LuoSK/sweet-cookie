import { h, Component } from 'preact'
import { useState } from 'preact/hooks'
import docCookies from '../utils/cookie'

import styles from './index.scss'
export default class OldVersion extends Component {
  render() {
    const [cookieVal, setCookieVal] = useState('')
    const [cookieBtnVisible, setCookieBtnVisible] = useState(false)
    const [cookieObj, setCookieObj] = useState({})

    function parseCookie() {
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

    function setCookie() {

    }

    return (
      <div class="main">
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
} 