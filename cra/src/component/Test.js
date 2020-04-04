import React, { Component } from 'react'
import { Input, Button } from 'antd'
export default class Test extends Component {
  constructor(props) {
    super(props);
    // 设置一个空的input节点
    this.textInput = null;
    this.setTextInputRef = ele => {
      this.textInput = ele;
    }

    this.focusTextInput = () => {
      // 使用原生DOM API使得text输入框获取焦点
      if (this.textInput) this.textInput.focus();
    }
    this.state = {
      CustomTextInputValue: '213123'
    }
  }
  componentDidMount () {
    // 组件挂载自动获取焦点
    // this.focusTextInput()
  }

  render () {
    // 使用`ref`的回调函数将text输入框DOM节点的引用存储到React
    return (
      <div>
        <h1>Refs</h1>
        使用 ref 回调函数，在实例的属性中存储对 DOM 节点的引用。
        <br />
        <h1>Input1</h1>
        <Input
          style={{ width: '200px' }}
          type="text"
          value='这里是1号'
          ref={(input) => {
            console.log('input', input)
            console.log('this.input', this.input)
            // 这里的this是最外层this,也就是说  自动传递进来的input参数被挂载到this上面,这样就可以使用它了
            // 但是这个时候我该怎么使用这个数组呢  也就是一一对应的方式,抽出来一个单独的组件???
            console.log('this', this)
          }}
        />
        <br />
        <h1>Input2</h1>
        <Input
          style={{ width: '200px' }}
          type="text"
          ref={this.setTextInputRef}
        />
        <Input
          style={{ width: '200px' }}
          type="button"
          value="聚焦"
          onClick={this.focusTextInput}
        />
        <br />
        <h2>自定义组件</h2>
        <div>
          <CustomTextInput
            value={this.state.CustomTextInputValue}
            inputRef={el => {
              console.log('el', el)
              this.inputElement = el;
              console.log('this.inputElement', this.inputElement)
              // this.inputElement.props.value = '2132312'
            }}
          />
          <Button onClick={() => {
            // 挂载的这个节点没有什么用啊  对于value的显示来说
            this.inputElement.focus();
            console.log(' this.inputElement2', this.inputElement);
            this.setState({
              CustomTextInputValue: 'nihao1'
            })
          }}>聚焦了</Button>
        </div>
      </div>
    )
  }
}
function CustomTextInput (props) {
  console.log('Customprops :', props);

  return (
    <div>
      <Input value={props.value} ref={props.inputRef}></Input>
    </div>
  )
}

// <CustomTextInput ref={this.textInput} />
// 请注意，这仅在 CustomTextInput 声明为 class 时才有效
// ref没有办法被执行,在函数组件当中,因为没有实例也就是this
/*
 // 这里必须声明 textInput，这样 ref 才可以引用它
  const textInput = useRef(null);

  <input
        type="text"
        ref={textInput} />
        在函数组件当中这样使用
 */