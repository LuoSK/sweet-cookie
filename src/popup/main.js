import { h, render } from 'preact'
import App from './app'
import 'preact/debug'
import 'preact/devtools'
render(<App />, document.getElementById('app'))