import { h, render } from 'preact'
import App from './app'
const isDev = process.env.NODE_ENV === 'development'
if (!isDev) {
  require('preact/debug')
  require('preact/devtools')
}
render(<App />, document.getElementById('app'))