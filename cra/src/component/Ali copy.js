import React, { Component, Fragment } from 'react'
import { Row, Col, Tag, Input, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
export default class Ali extends Component {
  constructor(props) {
    super(props);
    this.inputTarget = React.createRef();
  }
  state = {
    tags: ['a=b', 'react=es', 'T=ms'],
    inputVisible: false,
    inputValue: '',
    inputArr: [false, false, false]
  };
  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    console.log('e.target.value :', e.target.value);
    // let reg = /(.+)=(.+)/;
    // console.log('reg.test(e.target.value) :', reg.test(e.target.value));
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let reg = /(.+)=(.+)/;
    let { tags } = this.state;
    if (reg.test(inputValue)) {
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      this.setState({
        tags,
        inputVisible: false,
        inputValue: '',
      });
    } else {
      this.setState({ inputVisible: true });
      this.input.input.style.border = "1px solid red"
    }
  };
  focusInput = () => {
    this.input.input.style.border = ""
  }
  focusTargetInput = () => {
    this.inputTarget.current.input.style.border = ""
    console.log('this.inputTarget', this.inputTarget)
  }
  saveInputRef = input => (this.input = input);
  handleClick = (index) => {
    console.log(index);
    let arr = this.state.inputArr;
    arr[index] = true;
    // 这一步就等同于设置了arr
    console.log('arr :', arr);
    this.setState({
      inputArr: arr
    }, () => {
      this.inputTarget.current.focus()
    })
  }
  handleInputChangeTarget = (e, index) => {
    console.log('e :', e.target.value);
    console.log('index :', index);
    let arrTag = this.state.tags;
    arrTag[index] = e.target.value;
    this.setState({
      tags: arrTag
    })
  }
  handleInputHidden = (index) => {
    let reg = /(.+)=(.+)/;
    let { tags } = this.state;
    if (reg.test(tags[index])) {
      // tags = [...tags, inputValue];
      let arr = this.state.inputArr;
      arr[index] = false;
      this.setState({
        inputArr: arr
      })
    } else {
      this.inputTarget.current.input.style.border = "1px solid red"
    }
  }
  // 查询
  handleQuery = () => {
    let tags = this.state.tags;
    const obj = {};
    for (const iterator of tags) {
      console.log('iterator :', iterator);
      let newK = iterator.split('=');
      obj[newK[0]] = newK[1];
    }
    console.table(obj);
  }
  handleClear = () => {
    this.setState({
      tags: []
    })
  }
  render () {
    const { tags, inputVisible, inputValue, inputArr } = this.state;
    return (
      <Fragment>

        <Row gutter={16} type="flex" justify="start">
          <Col span={4} style={{ border: '1px solid red' }}>
            <label >自定义搜索项:</label>
          </Col>
          <Col span={20}>
            {/* 正常校验 */}
            {tags.map((tag, index) => {
              return (
                <Fragment key={index}>
                  {!inputArr[index] &&
                    <Tag key={tag} closable={index !== 0} onClick={() => this.handleClick(index)} onClose={() => this.handleClose(tag)}>
                      {tag}
                    </Tag>
                  }
                  {inputArr[index] && <Input
                    ref={this.inputTarget}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={tag}
                    onFocus={this.focusTargetInput}
                    onChange={(e) => this.handleInputChangeTarget(e, index)}
                    onBlur={() => this.handleInputHidden(index)}
                  // onPressEnter={this.handleInputConfirm}
                  />}
                </Fragment>
              )
            })}
            {/* 添加按钮 */}
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                onFocus={this.focusInput}
                style={{ width: 78 }}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag className="site-tag-plus" onClick={this.showInput}>
                <PlusOutlined /> New Tag
              </Tag>
            )}
          </Col>
        </Row>
        <Row gutter={16} type="flex" justify="end">
          <Col span={4}>
            <Button type="primary" onClick={this.handleQuery}>查询</Button>
          </Col>
          <Col span={4}>
            <Button type="default" onClick={this.handleClear}>清空</Button>
          </Col>
        </Row>
      </Fragment>
    )
  }
}
