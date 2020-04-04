import React from 'react'
import { Tag } from 'antd'
// import { } from '@ant-design/icons'
import Tags from './Tags'
export default function Show () {
  function log (e) {
    console.log(e);
  }
  return (
    <div>
      <hr />
      <Tag closable onClose={log}>
        Tag 2
    </Tag>
      <hr />
      <Tags></Tags>
    </div>
  )
}
