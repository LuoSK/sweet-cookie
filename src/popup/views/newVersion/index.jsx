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
  MenuItem
} from '@mui/material'
import { DeleteTwoTone } from '@mui/icons-material';
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
    const [mode, setMode] = useState('KEY_VALUE')
    const onModeChange = (e, value) => {
      if (value == null) return
      setMode(value)
      setPlaceholder(TEXTAREA_PLACEHOLDER[value])
    }

    const [placeholder, setPlaceholder] = useState(TEXTAREA_PLACEHOLDER[mode])

    const [cookieVal, setCookieVal] = useState('erp=luoshaokang;token=123456789;')

    const [cookieData, setCookieData] = useState([])

    const onExpireChange = (e, index) => {
      cookieData[index].expire = e.target.value
      setCookieData([...cookieData])
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
        alert('解析成功')
      } else {
        alert('未解析到cookie')
      }
    }


    const [cookieBtnVisible, setCookieBtnVisible] = useState(false)

    const setCookie = async () => {
      try {
        const domains = this.state.domain.split('.')
        const setDomain = (domains.length > 2 ? domains.slice(1) : domains).join('.')
        for (const item of cookieData) {
          const expire = item.expire * 24 * 60 * 60 * 1000
          await chrome.cookies.set({
            domain: setDomain,
            name: item.key,
            value: item.value.toString(),
            url: `https://${this.state.domain}/`,
            secure: true,
            sameSite: 'no_restriction',
            expirationDate: Date.now() + expire
          })
        }
        alert('successed')
      } catch (error) {
        alert(error)
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
          <ToggleButton value="JSON">JSON</ToggleButton>
        </ToggleButtonGroup>

        <textarea
          value={cookieVal}
          className={styles.textarea}
          placeholder={placeholder}
          onChange={(e) => setCookieVal(e.target.value)}
        />

        <Button variant='text' onClick={onParseClick}>解析</Button>


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
                <TableRow key={key}>
                  <TableCell>
                    <TextField variant="standard" value={key} />
                  </TableCell>
                  <TableCell>
                    <TextField variant="standard" value={value} />
                  </TableCell>
                  <TableCell>
                    <TextField variant="standard" select defaultValue={30} value={expire} onChange={(e) => { onExpireChange(e, index) }}>
                      {
                        expireOptions.map((options) => (
                          <MenuItem key={options.value} value={options.value}>{options.label}</MenuItem>
                        ))
                      }
                    </TextField>
                  </TableCell>
                  <TableCell align='center'>
                    <DeleteTwoTone color="#524A4E" className={styles.deleteIcon} />
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>

        {cookieBtnVisible ? <Button variant='text' onClick={setCookie}>设置Cookie</Button> : null}

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