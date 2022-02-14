import { h, Component } from 'preact'
import { useState } from 'preact/hooks'
import OldVersion from './views/oldVersion'
import NewVersion from './views/newVersion'
import styles from './app.scss'
export default class App extends Component {
  render() {
    const [isNew, setIsNew] = useState(false)

    function changeVersion() {
      setIsNew(!isNew)
    }

    return (
      <div className={styles.app}>
        <div onClick={changeVersion}>
          <span className={styles.version}>
            使用{isNew ? '旧版' : '新版'}
          </span>
        </div>
        {isNew ? <NewVersion /> : <OldVersion />}
      </div>
    )
  }
} 