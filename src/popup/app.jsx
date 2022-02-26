import { h, Component } from 'preact'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useState } from 'preact/hooks'
import { Button } from '@mui/material'
import OldVersion from './views/oldVersion'
import NewVersion from './views/newVersion'
import styles from './app.scss'
import { themeOptions } from '../theme'
import '../assets/styles/reset.scss'
import '../assets/styles/variables.scss'

const theme = createTheme(themeOptions)
export default class App extends Component {
  render() {
    const [isNew, setIsNew] = useState(true)

    function changeVersion() {
      setIsNew(!isNew)
    }

    return (
      <ThemeProvider theme={theme}>
        <div className={styles.app}>
          <div onClick={changeVersion}>
            <span className={styles.version}>
              <Button variant='text'>使用{isNew ? '旧版' : '新版'}</Button>
            </span>
          </div>
          <div className={styles.container}>
            {isNew ? <NewVersion /> : <OldVersion />}
          </div>
        </div>
      </ThemeProvider>
    )
  }
} 