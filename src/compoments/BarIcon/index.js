import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.scss';

class BarIcon extends Component{
  static contextTypes = {
    editor: PropTypes.object.isRequired,
  }
  static propTypes = {
    item: PropTypes.object,
  };

  constructor(props, context){
    super(props, context);
  }
  
  componentDidMount(){

  }
  handleToolbarClick = (item) => {
    return () => {
      const { setState } = this.props;
      const { codeMirror: cm, options } = this.context.editor;
      const cursor = cm.getCursor();
      const selection = cm.getSelection();
      let {name, before, after} = item;

      if(item.handler){
        item.handler(cm, setState, options);

        return;
      }
      if(item.isCustom) return;
      
      // 代码块
      if(name === 'code' && selection.indexOf("\n") > -1){
        before = '```\n';
        after = '\n```';
      }
      if(name === 'clear'){
        cm.setValue('');
      }
      cm.replaceSelection(`${before}${selection}${after}`);
      if(selection === "") {
        cm.setCursor(cursor.line, cursor.ch + before.length);
      }
      cm.focus();
    }
  }
  render() {
    const { item } = this.props;
    const { name, title, isCustom, text } = item;
    const className = classNames('mdEdiror_toolbarbtn', name);
    const labelClass = 'mdEdiror_toolbarbtn_label';
    const iconName = `#icon-${name}`;
    const action = this.handleToolbarClick(item);
    
    return (
        name === 'separator' ? <span className="mdEdiror_toolbarbtn_separator"></span> : <button className={className} onClick={action} title={title}>
				{
          isCustom ? text : <Fragment>
            <svg className="icon mdEdiror_toolbarbtn_icon" aria-hidden="true">
            <use xlinkHref={iconName}></use>
            </svg><span className={labelClass}>{title}</span>
          </Fragment>
        }
        
			</button>

		);
  }
}

export default BarIcon;