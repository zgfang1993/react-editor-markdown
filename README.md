## react-editor-markdown

一款简洁易用的React Markdown编辑器，基于 [Marked.js](https://github.com/markedjs/marked)、[CodeMirror](https://codemirror.net/)、[Prism](https://github.com/PrismJS/prism)。

![image-20190113000102183](https://ws3.sinaimg.cn/large/006tNc79ly1fz48v06cnaj31p00u044o.jpg)



## Installation

```shell
npm install react-editor-markdown --save
```



## Example

本地运行项目示例：

```shell
npm install
npm run dev
```

在浏览器中打开 [`localhost:3000`](http://localhost:3000/) 。



## Usage

```html
<script src="//at.alicdn.com/t/font_979167_zrlpqrk8y0o.js"></script><!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>Title</title>
    <!-- 需引用ali icon svg -->
    <script src="//at.alicdn.com/t/font_979167_zrlpqrk8y0o.js"></script>
</head>
<body>
<div id="root"></div>
</body>
</html>
```



```javascript
import React, { Component } from 'react';
import Editor from 'react-editor-markdown';
import 'react-editor-markdown/editor.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  onChange = ((newValue, newPreHtml) => {
    console.table({
      newValue,
      newPreHtml
    })
  }
  render() {
    const options = {
      value: 'hello editor markdown',
      toolbarIcons: [
        'bold', 'italic', 'separator', 
        'h1', 'h2', 'h3', 'h4', 'h5', 'separator',
        'quote', 'list', 'olist', 'separator',
        'link', 'image', 'separator',
        'watch', 'clear', 'save'
      ],
      isWatch: true,
      customToolbar: {
        save: {
          text: '保存',
          handler: function(){
            console.log('保存')
          }
        }
      },
    }

    return (
      <div className="app">
        <Editor 
          options={options}
          onChange={this.onChange}
        ></Editor>
      </div>
    );
  }
}

export default App;

```



### Properties

#### className

编辑器类名



#### onChange

编辑器change事件，

用法：

```javascript
onChange = (newValue, newPreHtml) => {

}
```



#### Options

- Value `string`: markdown value
- isWatch `boolean`: 是否实时预览
- toolbarIcons `array`: 工具栏
- customToolbar `object`: 自定义工具栏
- onChange `Function (newValue, newPreHtml)`: 编辑器change事件



##### value

初始化md的值

默认值： `start editor now`



##### isWatch

是否实时预览

默认值：`true`



##### toolbarIcons

工具栏设置，可按icon名称顺序排序，`separator`为分隔符|。

默认值：

```javascript
[
  'bold', 'italic', 'separator', 
  'h1', 'h2', 'h3', 'h4', 'h5', 'separator',
  'quote', 'list', 'olist', 'separator',
  'link', 'image', 'separator',
  'watch', 'clear'
]
```

##### customToolbar

自定义toolbar

用法：

```javascript
customToolbar: {
  save: {
    text: '保存',
    handler: function(){
      console.log('保存')
    }
  }
},
```