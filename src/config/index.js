export const toolbars = {
  bold: {name: 'bold', before: '**', after: '**', title: '加粗字体'},
  italic: {name: 'italic', before: '_', after: '_', title: '斜体'},
  h1: {name: 'h1', before: '# ', after:'', title: '标题一'},
  h2: {name: 'h2', before: '## ', after:'', title: '标题二'},
  h3: {name: 'h3', before: '### ', after:'', title: '标题三'},
  h4: {name: 'h4', before: '#### ', after:'', title: '标题四'},
  h5: {name: 'h5', before: '##### ', after:'', title: '标题五'},
  quote: {name: 'quote', before: '> ', after:'', title: '引用'},
  list: {name: 'list', before: '- ', after:'', title: '无序列表'},
  olist: {name: 'olist', before: '1. ', after:'', title: '有序列表'},
  code: {name: 'code', before: '`', after:'`', title: '代码'},
  link: {name: 'link', before: '[]()', after:'', title: '链接'},
  image: {name: 'image', before: '![]()', after:'', title: '图片'},
  separator: {name: 'separator'},
  watch: {name: 'watch', before: '', after:'', title: '开启实时预览', handler: function(cm, setState){
    setState({
      isWatch: this.name === 'watch'
    })
    if(this.name === 'eye-slash'){
      this.name = 'watch';
      this.title = '开启实时预览';
    }else {
      this.name = 'eye-slash';
      this.title = '关闭实时预览';
    }
  }},
  clear: {name: 'clear', before: '', after:'', title: '清空'},
};

export const getMixToolbars = (options) => {
  const bars = [];
  const { toolbarIcons: icons, isWatch, customToolbar } = options;
  icons.forEach(icon => {
    let bar = toolbars[icon];
    if(icon === 'watch' && isWatch){
      bar.name = 'eye-slash';
      bar.title = '关闭实时预览';
    }
    // 自定义按钮 {name:'', text: '', handler:function(){},isCustom:true}
    if(!bar){
      bar = {
        name: icon,
        ...customToolbar[icon],
        isCustom: true,
      }
    }

    bars.push(bar)
  })
  return bars;
}