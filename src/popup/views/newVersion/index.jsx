import { h, Component } from 'preact'
import { Button } from '@mui/material'
import styles from './index.scss'
export default class NewVersion extends Component {
  render() {
    return (
      <div className={styles.newVersion}>
        <h1 className='title'>New Version</h1>
        <div className='version'>123123</div>
        <div className='test'>test</div>
        <p>This is a simple example of a popup.</p>
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </div >
    )
  }
}