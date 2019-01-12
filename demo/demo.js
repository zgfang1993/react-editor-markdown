import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Editor from '../src/index'
import './demo.css'

class App extends Component {
  constructor(props) {
    super(props);
  }

  onChange = (md, prehtml) => {

  }
  render() {
    const options = {
      value: `\`\`\`javascript 
  var name = 'hello editor';
\`\`\``,
      toolbarIcons: [
        'bold', 'italic', 'separator', 
        'h1', 'h2', 'h3', 'h4', 'h5', 'separator',
        'quote', 'list', 'olist', 'separator',
        'code', 'link', 'image', 'separator',
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
        <h1>React-edtor-markdown Example</h1>
        <Editor 
          className="myeditor"
          options={options}
          onChange={this.onChange}
        ></Editor>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));