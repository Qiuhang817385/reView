import React, { Component, Fragment, useState, useRef } from 'react'
import { Row, Col, Tag, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
export default function Ali () {
  const [tags, setTags] = useState(['a=b', 'react=es', 'T=ms']);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputArr, setInputArr] = useState([false, false, false]);
  const saveInputRef = useRef();
  const inputTarget = useRef();
  // Input添加时-展示函数
  let showInput = () => {
    setInputVisible(true);
    console.log('saveInputRef :', saveInputRef);
    console.log('saveInputRef.current', saveInputRef.current);
    setTimeout(() => {
      saveInputRef.current.input.focus();
    }, 0);
  };
  // Input添加时-添加函数
  let handleInputChange = e => {
    setInputValue(e.target.value)
  };
  // Input失去焦点时-保存处理函数
  let handleInputConfirm = () => {
    let reg = /(.+)=(.+)/;
    let k = inputValue.split('=')[0];
    let reTag = tags.filter(tag => {
      return tag.split('=')[0] === k
    });
    if (reg.test(inputValue)
      && inputValue
      && tags.indexOf(inputValue) === -1
      && reTag.length === 0
    ) {
      let ntags = [...tags, inputValue];
      setInputArr([...inputArr, false])
      setTags([...ntags]);
      setInputVisible(false);
      setInputValue('');
    } else {
      setInputVisible(true);
      setTimeout(() => {
        saveInputRef.current.input.style.border = "1px solid red"
      }, 0);
    }
  };
  // Tag标签-Input改变函数
  let handleInputChangeTarget = (e, index) => {
    let arrTag = tags;
    arrTag[index] = e.target.value;
    setTags([...arrTag])
  }
  // Tag标签-隐藏Input函数
  let handleInputHidden = (index) => {
    let reg = /(.+)=(.+)/;
    if (reg.test(tags[index])) {
      let arr = inputArr;
      arr[index] = false;
      setInputArr([...arr])
    } else {
      setTimeout(() => {
        inputTarget.current.input.style.border = "1px solid red"
      }, 0);
    }
  }
  // Input-聚焦改变样式函数
  let focusInput = () => {
    setTimeout(() => {
      saveInputRef.current.input.style.border = ""
    }, 0);
  }
  // Tag-Input-聚焦改变样式函数
  let focusTargetInput = () => {
    setTimeout(() => {
      inputTarget.current.input.style.border = ""
    }, 0);
  }
  let handleClose = (removedTag, index) => {
    console.log('index :', index);
    console.log('removedTag :', removedTag);
    let ntags = tags.filter(tag => tag !== removedTag);
    console.log('ntags :', ntags);
    // 这个地方有Bug
    setTags([...ntags])
    let nI = inputArr;
    nI.splice(index, 1)
    setInputArr(nI)
  }
  // 清空函数
  let handleClear = () => {
    setTags([])
  }
  // Tag标签-显示Input函数
  let handleClick = (index) => {
    let arr = inputArr;
    for (let i = 0; i < arr.length; i++) {
      arr[i] = false
    }
    arr[index] = true;
    setInputArr([...arr]);
  }
  // 查询按钮
  let handleQuery = () => {
    const obj = {};
    for (const iterator of tags) {
      let newK = iterator.split('=');
      obj[newK[0]] = newK[1];
    }
    console.table(obj);
  }
  return (
    <Fragment>
      <Row gutter={16} type="flex" justify="start">
        <Col offset={4} span={4} >
          <label>自定义搜索项:</label>
        </Col>
        <Col span={16}>
          {tags.map((tag, index) => {
            return (
              <Fragment key={index}>
                {!inputArr[index] &&
                  <Tag key={tag}
                    closable={index !== 0}
                    onClick={() => handleClick(index)}
                    onClose={() => handleClose(tag, index)}>
                    {tag}
                  </Tag>
                }
                {inputArr[index] && <Input
                  ref={inputTarget}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={tag}
                  onFocus={focusTargetInput}
                  onChange={(e) => handleInputChangeTarget(e, index)}
                  onBlur={() => handleInputHidden(index)}
                />}
              </Fragment>
            )
          })}
          {/* 添加按钮 */}
          {inputVisible && (
            <Input
              ref={saveInputRef}
              type="text"
              size="small"
              onFocus={focusInput}
              style={{ width: 78 }}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag className="site-tag-plus" onClick={showInput}>
              <PlusOutlined /> New Tag
            </Tag>
          )}
        </Col>
      </Row>
      <Row gutter={16} type="flex" justify="end">
        <Col span={4}>
          <Button type="primary" onClick={() => handleQuery()}>查询</Button>
        </Col>
        <Col span={4}>
          <Button type="default" onClick={handleClear}>清空</Button>
        </Col>
      </Row>
      <div>
        <h1>123</h1>
        {inputArr.map((v, i) => {
          return (<div key={i}>
            {v ? 'true' : 'false'}
          </div>)
        })}
      </div>

    </Fragment>
  )
}
/*
function handleOrangeClick() {
    // 和 this.setState({ fruit: 'orange' }) 类似
    setFruit('orange');
  }
  你不必使用多个 state 变量。State 变量可以很好地存储对象和数组，因此，你仍然可以将相关数据分为一组。然而，不像 class 中的 this.setState，更新 state 变量总是替换它而不是合并它。
  只是更新他们
 */