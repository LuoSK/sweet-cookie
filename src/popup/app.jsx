import { h, Component } from 'preact'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useState } from 'preact/hooks'
import { Button, IconButton, Menu, MenuItem, MenuList, ListItemIcon, Dialog, DialogTitle, DialogContent } from '@mui/material'
import { styled } from '@mui/material/styles'
import { SettingsOutlined, InfoOutlined, MenuBookRounded, GitHub, BugReport, Close } from '@mui/icons-material'
import OldVersion from './views/oldVersion'
import NewVersion from './views/newVersion'
import styles from './app.scss'
import { themeOptions } from '../theme'
import '../assets/styles/global.scss'
import '../assets/styles/variables.scss'
import IconUrl from '../assets/icons/icon_32.png'
const theme = createTheme(themeOptions)
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  fontFamily: 'monospace',
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialogTitle-root': {
    fontFamily: 'monospace',
    padding: '8px 16px',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center'
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1rem'
  }
}))

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props
  return (
    <DialogTitle {...other}>
      {children}
      {onClose ? (
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close fontSize="small" />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

export default class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {

    const [isNew, setIsNew] = useState(true)
    const [open, setOpen] = useState(false)
    const [openAboutDialog, setAboutDialog] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    function changeVersion() {
      setIsNew(!isNew)
    }

    const onSettingClick = (e) => {
      setAnchorEl(e.currentTarget)
      setOpen(true)
    }

    const closeMenu = () => {
      setAnchorEl(null)
      setOpen(false)
    }

    const onMenuItemClick = (type) => {
      switch (type) {
        case 'help':
          window.open('https://github.com/LuoSK/sweet-cookie/blob/preact/README.md')
          break
        case 'feedback':
          window.open('https://github.com/LuoSK/sweet-cookie/issues/new')
          break
        case 'about':
          setAboutDialog(true)
          break
        default:
          break
      }
      closeMenu()
    }

    return (
      <ThemeProvider theme={theme}>
        <div className={styles.app}>
          <div className={styles.version}>
            <div className={styles.left}>
              <IconButton>
                <img src={IconUrl} alt="icon" width={24} hegiht={24} />
              </IconButton>
              <span>
                SWEET COOKIE
              </span>
            </div>
            <div className='right'>
              <Button variant='text' color="light" onClick={changeVersion}>使用{isNew ? '旧版' : '新版'}</Button>
              <IconButton color="light" onClick={onSettingClick}>
                <SettingsOutlined />
              </IconButton>
            </div>

            <Menu anchorEl={anchorEl} open={open} onClose={closeMenu} sx={{
              '.MuiList-padding': { padding: 0 }
            }}>
              <MenuList dense sx={{
                '.MuiMenuItem-root': {
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  minWidth: '120px'
                },
                '.MuiListItemIcon-root': {
                  minWidth: '30px'
                }
              }}>
                <MenuItem onClick={() => { onMenuItemClick('help') }}>
                  <ListItemIcon>
                    <MenuBookRounded fontSize="small" />
                  </ListItemIcon>
                  帮助
                </MenuItem>
                <MenuItem onClick={() => { onMenuItemClick('feedback') }}>
                  <ListItemIcon>
                    <BugReport fontSize="small" />
                  </ListItemIcon>
                  报告问题
                </MenuItem>
                <MenuItem onClick={() => { onMenuItemClick('about') }}>
                  <ListItemIcon>
                    <InfoOutlined fontSize="small" />
                  </ListItemIcon>
                  关于
                </MenuItem>
              </MenuList>
            </Menu>

            <BootstrapDialog open={openAboutDialog} onClose={() => { setAboutDialog(false) }}>
              <BootstrapDialogTitle onClose={() => { setAboutDialog(false) }}>
                About Sweet Cookie
              </BootstrapDialogTitle>
              <DialogContent className='about-dialog-content'>
                <p className='version'>Version: 1.0.0<span class="tag">Beta</span></p>
                <div className='info'>
                  <p>Author: kylin</p>
                  <p>Github: <a class="link" target="view_window" href='https://github.com/LuoSK/sweet-cookie'>github.com/LuoSK/sweet-cookie</a></p>
                  <p class="give-a-star">
                    <a target="view_window" href="https://chrome.google.com/webstore/detail/sweet-cookie/ljoobagfjndhnpgcgcfcioecilnnmfid">⭐️ Give me a star ⭐️</a>
                  </p>

                </div>
              </DialogContent>
            </BootstrapDialog>
          </div>
          <div className={styles.container}>
            {isNew ? <NewVersion /> : <OldVersion />}
          </div>
        </div>
      </ThemeProvider>
    )
  }
} 