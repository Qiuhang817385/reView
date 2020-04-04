import React, { Component } from 'react'
import { CloseOutlined, HeartTwoTone, DownOutlined } from '@ant-design/icons'
import { Button, Menu, Dropdown, Row, Col } from 'antd'
import './TagsComp.scss';
import Show from './show.js';
export default class TagsComp extends Component {
  state = {
    loading: false,
    iconLoading: false,
  };
  handleMenuClick = (e) => {
    console.log('click', e);
  }
  enterLoading = () => {
    this.setState({ loading: true }, () => {
      setTimeout(() => {
        this.setState({ loading: false })
      }, 1000);
    });
  };

  render () {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
      </Menu>
    );
    return (
      <div>
        <CloseOutlined />
        <br />
        <Button type="primary">Primary</Button>
        <br />
        <Button><HeartTwoTone twoToneColor="#eb2f96" spin /></Button>
        <br />
        <Button type="dashed" icon={<HeartTwoTone twoToneColor="#eb2f96" spin />}>Dashed</Button>
        <br />
        <Button type="link">Link</Button>
        <br />
        <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
          Click me!
        </Button>
        <br />
        {/* 下拉菜单 */}
        <Dropdown overlay={menu}>
          <Button>
            Actions
            {/* 这玩意是一个图标 */}
            <DownOutlined />
          </Button>
        </Dropdown>
        <br />
        <Button shape="circle" type="dashed" disabled>
          不可用
        </Button>
        {/* 布局 */}
        <Row>
          <Col span={24}>col</Col>
        </Row>
        <Row style={{ border: "1px solid red" }}>
          <Col span={12}>col-12</Col>
          <Col span={12}>col-12</Col>
        </Row>
        <Row className="row3">
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
        </Row>
        {/* 通过使用 push 和 pull 类就可以很容易的改变列（column）的顺序。
        使用 offset 可以将列向右侧偏。例如，offset={4} 将元素向右侧偏移了 4 个列（column）的宽度。
         <Row justify="center">
         子元素根据不同的值 start,center,end,space-between,space-around，分别定义其在父节点里面的排版方式。
        //  改变顺序
         <Col span={6} order={4}>
      1 col-order-4

      </Col>
      <Col flex="1 1 200px">1 1 200px</Col>

      参照 Bootstrap 的 响应式设计，预设六个响应尺寸：xs sm md lg xl  xxl
      <Col xs={2} sm={4} md={6} lg={8} xl={10}>
      <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
         */}

        <Row >
          <Col style={{ border: "1px solid blue", width: "300px" }} span={8}>col-8</Col>
          <Col style={{ border: "1px solid #312322" }} flex="1" span={8}>col-8</Col>
          <Col style={{ border: "1px solid #9f2322", width: "300px" }} span={8}>col-8</Col>
        </Row>
        {/* 这样的话宽度的属性才起作用,左右固定中间自适应,当然上面的方法也挺好,是正规的栅格系统 */}
        <Row >
          <Col style={{ border: "1px solid blue", width: "300px" }} >col-8</Col>
          <Col style={{ border: "1px solid #312322" }} flex="1" >col-8</Col>
          <Col style={{ border: "1px solid #9f2322", width: "300px" }}>col-8</Col>
        </Row>
        <br />
        <hr />
        <Show />
      </div>
    )
  }
}
