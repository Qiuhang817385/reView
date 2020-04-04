// 它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。
// useState 第一个API
import React, { useState, useEffect } from 'react';
export default function Hooks () {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);
  // 它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途
  // 在完成对 DOM 的更改后运行你的“副作用”函数
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <br />
      <button onClick={() => setCount(count - 1)}>
        减
      </button>
    </div>
  );
}
// 在这里，useState 就是一个 Hook （等下我们会讲到这是什么意思）。通过在函数组件里调用它来给组件添加一些内部 state。
// React 会在重复渲染时保留这个 state。
// useState 会返回一对值：当前状态和一个让你更新它的函数
// 它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并
// 它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并
// useState 和 this.state的区别
// useState 和 this.state的区别
// useState 和 this.state的区别
// Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数
// Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。


// USE effect
/*
useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。
它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API。
 */