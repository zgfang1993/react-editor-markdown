import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import Prism from 'prismjs';
import CM from 'codemirror';
import classNames from 'classnames';
import { getMixToolbars } from '../../config/index';
import BarIcon from '../BarIcon/index';
import { escape } from '../../util/index';
import './index.scss';

class Editor extends Component {
  static propTypes = {
    options:PropTypes.object,
    className: PropTypes.string,
  };

  static childContextTypes = {
    editor: PropTypes.object.isRequired,
  };

  getChildContext() {
    return { 
      editor: this
    };
  }

  constructor(props) {
    super(props);
    this.options = {
      isWatch: true,
      value: 'start editor now',
      cmoptions: {
        mode: 'markdown',
        lineNumbers: true,
        indentWithTabs: true,
        tabSize: '2',
        lineWrapping: true
      },
      toolbarIcons: [
        'bold', 'italic', 'separator', 
        'h1', 'h2', 'h3', 'h4', 'h5', 'separator',
        'quote', 'list', 'olist', 'separator',
        'link', 'image', 'separator',
        'watch', 'clear'
      ],
      markedoptions: {
        renderer: this.markedRenderer(),
        langPrefix: 'language-',
        breaks: true,
        highlight: function (code, lang) {
          if (lang) {
              let stdlang = lang.toLowerCase();
              if (Prism.languages[stdlang]) {
                  return Prism.highlight(code, Prism.languages[stdlang]);
              }
          }
        }
      },
      ...props.options
    }
    this.state = {
      value: this.options.value,
      isWatch: this.options.isWatch,
      mixToolbars: getMixToolbars(this.options),
    }
  }

  componentDidMount() {
    const { cmoptions, markedoptions } = this.options;
    this.codeMirror = CM.fromTextArea(this.cm, cmoptions);
    this.codeMirror.on('change', this.handleChange);

    this.setState({
      preview: marked(this.options.value, markedoptions)
    })
  }

  childSetState = (state) => {
    this.setState({
      ...state
    })
  }
  handleChange = (doc) => {
    const {markedoptions} = this.options;
    const { onChange } = this.props;
    const newValue = doc.getValue();
    const preview = marked(newValue, markedoptions)
    
    this.setState({
      preview,
    },()=>{
      onChange(newValue, this.state.preview);
    })
  }
  /**
   *重写render.code方法
   *
   * @memberof Editor
   */
  markedRenderer = (markdownToC, options) => {
    var markedRenderer  = new marked.Renderer();
    markedRenderer.code = function(code, infostring, escaped) {
      var lang = (infostring || '').match(/\S*/)[0];
      if (this.options.highlight) {
        var out = this.options.highlight(code, lang);
        console.table({
          code,
          out
        })
        if (out != null && out !== code) {
          escaped = true;
          code = out;
        }
      }
    
      if (!lang) {
        return '<pre><code>'
          + (escaped ? code : escape(code, true))
          + '</code></pre>';
      }

      const langText = this.options.langPrefix + escape(lang, true);
      return '<pre class="'+langText+'"><code class="'
        + this.options.langPrefix
        + escape(lang, true)
        + '">'
        + (escaped ? code : escape(code, true))
        + '</code></pre>\n';
    }
    return markedRenderer;
  }
  render() {
    const { className } = this.props;
    const { value } = this.options;
    const { preview, isWatch, mixToolbars } = this.state;
    const editorClass = classNames('mdEdiror', className);
    const codeClass = classNames('editor', {
      'editor-only': !isWatch
    })
    return (
      <div className={editorClass}>
        {
          <div className="toolbar">
          {
            mixToolbars.map((item, i) => {
              return <BarIcon item={item} key={i} setState={this.childSetState}/>
            })
          }
        </div>
        }
        <div className="editor-container">
          <div className={codeClass}>
            <textarea ref={(el)=> {this.cm = el}} onChange={this.handleChange} defaultValue={value} autoComplete="off" />
          </div>
          {
            isWatch && <div className="preview" dangerouslySetInnerHTML={{__html: preview}}></div>
          }
          
        </div>
      </div>
    );
  }
}

export default Editor;
