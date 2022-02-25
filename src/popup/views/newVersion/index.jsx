import { h, Component } from 'preact'
import { useState } from 'preact/hooks'

import { ToggleButtonGroup, ToggleButton } from '@mui/material'
import styles from './index.scss'
export default class NewVersion extends Component {
  render() {
    const [mode, setMode] = useState('JSON')
    const onModeChange = (e, value) => {
      setMode(value)
    }
    return (
      <div className={styles.newVersion}>
        <ToggleButtonGroup
          exclusive
          color="primary"
          className={styles.toogleButtonGroup}
          value={mode}
          onChange={onModeChange}
        >
          <ToggleButton value="KEY-VALUE">键值对</ToggleButton>
          <ToggleButton value="JSON">JSON</ToggleButton>
        </ToggleButtonGroup>
        <div>
          <ToggleButtonGroup
            exclusive
            color="primary"
            value={mode}
            onChange={onModeChange}
          >
            <ToggleButton value="KEY-VALUE">键值对</ToggleButton>
            <ToggleButton value="JSON">JSON</ToggleButton>
          </ToggleButtonGroup>
        </div>

      </div >
    )
  }
}