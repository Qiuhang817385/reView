import React, { Component } from 'react'
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
export default class Tags extends Component {
  /* 
  afterClose	关闭动画完成后的回调，请使用 onClose, 我们将在下个版本删除此项	() => void

  onClose	关闭时的回调	(e) => void
  

  closable	标签是否可以关闭	boolean

  visible	是否显示标签	boolean

  icon	设置图标	ReactNode

  checked	设置标签的选中状态	boolean	false
onChange	点击标签时触发的回调	(checked) => void
   */
  constructor(props) {
    super(props);
    this.saveInputRef = React.createRef();
  }
  state = {
    // 这里是显示的标签组
    tags: ['Unremovable', 'Tag 2', 'Tag 3'],
    // 是否显示input
    inputVisible: false,
    // input初始值
    inputValue: '',
  };
  // 关闭的回调,移除掉tag
  handleClose = removedTag => {
    // 在删除元素的操作时候
    // 这个就相当于find相反的用法
    // 使用filter函数,过滤掉不是现在这个的--->看
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };
  // 显示input并且自动聚焦
  // 什么时候触发?
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };
  showInputof = (index) => {
    console.log('index :', index);
    // this.setState({ inputVisible: true }, () => this.input.focus());

  };
  // 正常的增删改
  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };
  // 这是什么
  // 增加确认
  handleInputConfirm = () => {
    // 结构出当前的inputValue的值
    const { inputValue } = this.state;
    // 当前tags的值
    let { tags } = this.state;
    // 这一步是去重啊
    // 可以在这步里面进行校验
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log('tags', tags)
    // 增加完之后input视觉消失
    // value的值清空
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };
  // 获取当前refs
  // saveInputRef = input => {
  //   console.log('input :', input);
  //   return (this.input = input)
  // };
  render () {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div>
        {/* 遍历tags结构 */}
        {tags.map((tag, index) => {
          // false,是否是长tag  超过20只显示20个
          const isLongTag = tag.length > 10;
          const tagElem = (
            // key 有了, index不是0就可以关闭
            <Tag key={tag} closable={index !== 0} onClick={() => { this.showInputof(index) }} onClose={() => this.handleClose(tag)}>
              {
                isLongTag ? `${tag.slice(0, 10)}...` : tag
              }
            </Tag>
          );
          // return   把tagElem填充进去
          return isLongTag ? (
            // 第一个给一个文字提示,也就是tag当中的第一个,不可以移除
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
              tagElem
            );
        })}
        {/* input是否可见??? */}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 300 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {/* 当不可见的时候,触发showInput之后,之前的tag标签被替换掉 */}
        {/* {!inputVisible && (
          <Tag className="site-tag-plus" onClick={this.showInput}>
            <PlusOutlined /> New Tag
          </Tag>
        )} */}
        {
          <Tag className="site-tag-plus" onClick={this.showInput}>
            <PlusOutlined /> 添加
          </Tag>
        }
      </div>
    )
  }
}
