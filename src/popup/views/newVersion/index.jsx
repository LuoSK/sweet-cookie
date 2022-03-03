import { h, Component } from 'preact'
import { useState } from 'preact/hooks'
import {
  Button,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  IconButton,
} from '@mui/material'
import { DeleteTwoTone, AddCircleOutlined } from '@mui/icons-material';
import jsYaml from 'js-yaml'
import { Toast } from '@/components'
import { TEXTAREA_PLACEHOLDER } from '../../../constants'
import styles from './index.scss'
import docCookies from '../utils/cookie'

const expireOptions = [
  { label: '1天', value: 1 },
  { label: '7天', value: 7 },
  { label: '15天', value: 15 },
  { label: '30天', value: 30 }
]

const columns = [
  { field: 'key', headerName: 'Key', width: '30%' },
  { field: 'value', headerName: 'Value', width: '30%' },
  { field: 'expire', headerName: '有效期', width: '20%' },
  { field: 'action', headerName: '操作', align: 'center' }
]

export default class NewVersion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      domain: ''
    }
  }
  render() {
    const [mode, setMode] = useState('YAML')
    const onModeChange = (e, value) => {
      if (value == null) return
      setMode(value)
      setPlaceholder(TEXTAREA_PLACEHOLDER[value])
    }

    const [placeholder, setPlaceholder] = useState(TEXTAREA_PLACEHOLDER[mode])

    const [cookieVal, setCookieVal] = useState('')

    const [cookieData, setCookieData] = useState([])

    const onFieldChange = (e, index, field) => {
      cookieData[index][field] = e.target.value
      setTimeout(() => {
        setCookieData([...cookieData])
      })
    }

    const onParseClick = () => {
      const newCookieData = []
      let cookies = {}
      switch (mode) {
        case 'KEY_VALUE':
          cookies = docCookies.parse(cookieVal)
          break
        case 'JSON':
          try {
            cookies = JSON.parse(cookieVal)
          } catch (error) {

          }
          break
        case 'YAML':
          try {
            cookies = jsYaml.load(cookieVal)
          } catch (error) {

          }
          break
        default:
          break
      }
      if (Object.keys(cookies).length > 0) {
        for (let key in cookies) {
          newCookieData.push({
            key,
            value: cookies[key],
            expire: 30
          })
        }
      }
      if (newCookieData.length > 0) {
        setCookieData([...newCookieData])
        setCookieBtnVisible(true)
        Toast.success('解析成功')
      } else {
        Toast.error('解析失败')
      }
    }

    const onAdd = () => {
      cookieData.push({
        key: '',
        value: '',
        expire: 30
      })
      if (!cookieBtnVisible) {
        setCookieBtnVisible(true)
      }
      setCookieData([...cookieData])
    }
    const onDelete = (index) => {
      cookieData.splice(index, 1)
      if (cookieData.length === 0) {
        setCookieBtnVisible(false)
      }
      setCookieData([...cookieData])
    }

    const [cookieBtnVisible, setCookieBtnVisible] = useState(false)

    const setCookie = async () => {
      try {
        const domains = this.state.domain.split('.')
        const setDomain = (domains.length > 2 ? domains.slice(1) : domains).join('.')
        let hasError = false
        for (const item of cookieData) {
          const expire = item.expire * 24 * 60 * 60 * 1000
          try {
            await chrome.cookies.set({
              domain: setDomain,
              name: item.key,
              value: item.value.toString(),
              url: `https://${this.state.domain}/`,
              secure: true,
              sameSite: 'no_restriction',
              expirationDate: Date.now() + expire
            })
          } catch (error) {
            hasError = true
            Toast.error(error.message)
          }
        }
        !hasError && (Toast.success('解析完成'))
      } catch (error) {
        Toast.error(error.message)
      }
    }

    return (
      <div className={styles.newVersion} >
        <ToggleButtonGroup
          exclusive
          color="primary"
          className={styles.toogleButtonGroup}
          value={mode}
          onChange={onModeChange}
        >
          <ToggleButton value="KEY_VALUE">键值对</ToggleButton>
          <ToggleButton value="YAML">YAML</ToggleButton>
          <ToggleButton value="JSON">JSON</ToggleButton>
        </ToggleButtonGroup>

        <textarea
          value={cookieVal}
          className={styles.textarea}
          placeholder={placeholder}
          onChange={(e) => setCookieVal(e.target.value)}
        />

        <Button variant='outlined' onClick={onParseClick}>解析</Button>

        <Table size="small" className={styles.table}>
          <TableHead>
            <TableRow>
              {
                columns.map(({ headerName, width, align }) => (
                  <TableCell sx={{ width }} align={align}>{headerName}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              cookieData.map(({ key, value, expire }, index) => (
                <TableRow>
                  <TableCell key={`key${index}`}>
                    <TextField variant="standard" value={key} onChange={(e) => { onFieldChange(e, index, 'key') }} />
                  </TableCell>
                  <TableCell key={`value${index}`}>
                    <TextField variant="standard" value={value} onChange={(e) => { onFieldChange(e, index, 'value') }} />
                  </TableCell>
                  <TableCell key={`expired${index}`}>
                    <TextField variant="standard" select value={expire} onChange={(e) => { onFieldChange(e, index, 'expired') }}>
                      {
                        expireOptions.map((options) => (
                          <MenuItem key={options.value} value={options.value}>{options.label}</MenuItem>
                        ))
                      }
                    </TextField>
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton color="secondary" onClick={onDelete.bind(this, index)}>
                      <DeleteTwoTone className={styles.deleteIcon} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))

            }
          </TableBody>
        </Table>
        <div class={styles.addBtnContainer}>
          <IconButton color='primary' className={styles.addIcon} onClick={onAdd}>
            <AddCircleOutlined />
          </IconButton>
        </div>
        {cookieBtnVisible ? <Button sx={{ '&.MuiButton-root': { marginTop: '10px', marginBottom: '10px' } }} variant='outlined' onClick={setCookie}>设置Cookie</Button> : null}
      </div >
    )
  }
  async componentWillMount() {
    try {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.url) {
        let url = new URL(tab.url);
        this.setState({ domain: url.hostname })
      }

    } catch { }
  }
}