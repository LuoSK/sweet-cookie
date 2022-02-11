import { h, Component } from 'preact'
import { useState } from 'preact/hooks'
import OldVersion from './views/oldVersion'
import NewVersion from './views/newVersion'
export default class App extends Component {
  render() {
    const [isNew, setIsNew] = useState(true)

    function changeVersion() {
      setIsNew(!isNew)
    }

    return (
      <div>
        <div onClick={changeVersion}>使用{isNew ? '旧版' : '新版'}</div>
        {isNew ? <NewVersion /> : <OldVersion />}
      </div>
    )
  }
} 