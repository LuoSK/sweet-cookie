import { h, Component } from 'preact'
import ReactDOM from 'react-dom'
import { Alert, Fade } from '@mui/material'
class Toast extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true
    }
  }
  close() {
    this.setState({
      visible: false
    })
  }
  render() {
    const opts = this.state
    return (
      <Fade in={opts.visible}>
        <Alert severity={this.props.type} sx={{
          '.MuiAlert-message': {
            padding: '1px 0px'
          },
          '.MuiAlert-icon': {
            padding: '0px',
            'marginRight': '8px'
          }
        }}>
          {this.props.children}
        </Alert >
      </Fade>
    )
  }
}

function createEle() {
  const element = document.createElement('div')
  element.style.marginBottom = '4px'
  return element
}
function setStyle(ele, style) {
  Object.keys(style).forEach(key => {
    ele.style[key] = style[key]
  })
}
function createContainer() {
  const element = document.createElement('div')
  setStyle(element, {
    position: 'absolute',
    top: '15px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: '99',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  })
  document.body.appendChild(element)
  return element
}

class _Toast {
  static container = null

  static factory(type, content) {
    if (this.container === null) {
      this.container = createContainer()
    }
    const element = createEle()
    this.container.appendChild(element)
    ReactDOM.render(<Toast type={type}>{content}</Toast>, element)
    setTimeout(() => {
      this.container.removeChild(element)
    }, 2000)
  }

  static success(title) {
    this.factory('success', title)
  }

  static warning(title) {
    this.factory('warning', title)
  }

  static error(title) {
    this.factory('error', title)
  }

  static info(title) {
    this.factory('info', title)
  }
}

export default _Toast