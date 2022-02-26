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

const cookieData = [{
  id: 1,
  key: 'name',
  value: 'John Doe',
  expire: 1
}]
export default class NewVersion extends Component {
  render() {
    const [mode, setMode] = useState('KEY_VALUE')
    const [placeholder, setPlaceholder] = useState(TEXTAREA_PLACEHOLDER[mode])
    const onModeChange = (e, value) => {
      if (value == null) return
      setMode(value)
      setPlaceholder(TEXTAREA_PLACEHOLDER[value])
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
          <ToggleButton value="KEY_VALUE">键值对</ToggleButton>
          <ToggleButton value="JSON">JSON</ToggleButton>
        </ToggleButtonGroup>

        <textarea
          className={styles.textarea}
          placeholder={placeholder}
        />
        <Button variant='text'>解析</Button>
        <Table size="small" className={styles.table}>
          <TableHead>
            <TableRow>
              {
                columns.map(({ field, headerName, width, align }) => (
                  <TableCell sx={{ width }} align={align}>{headerName}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              cookieData.map(({ key, value, expire }) => (
                <TableRow key={key}>
                  <TableCell>
                    <TextField variant="standard" value={key} />
                  </TableCell>
                  <TableCell>
                    <TextField variant="standard" value={value} />
                  </TableCell>
                  <TableCell>
                    <TextField variant="standard" select defaultValue={30} value={expire} >
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
        {/* <Box
          autoComplete="off"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '29%' },
            '& .MuiInputBase-root': { padding: '0px 4px', color: '#524A4E' }
          }}>

          <TextField variant="standard">          </TextField>
          <TextField variant="standard">

          </TextField>
          <TextField variant="standard" select>
            {
              expireOptions.map((options) => (
                <MenuItem key={options.value} value={options.value}>{options.label}</MenuItem>
              ))
            }
          </TextField>
        </Box> */}
      </div >
    )
  }
}