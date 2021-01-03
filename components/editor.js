import React from 'react';

//import SunEditor from 'suneditor-react';

class Editor extends React.PureComponent {

  constructor(props){
    super(props);
   
    this.state = {
             content : ""
       }

  }

  handleImageUploadBefore = (files, info, uploadHandler)=>{
   
} 
static getDerivedStateFromProps =(props ,state)=>{
  if(props.value != "" && props.edit !="" ){
    return {content : props.value};
  }
  return null;
}
handleImageUpload(targetImgElement, index, state, imageInfo, remainingFilesCount){
}

  onDroped = (e)=>{
  }

  onChange = (content)=>{
   // console.log(content);
   if(this.props.getContent){
    this.props.getContent(content);
   }
    this.setState({content :content});
  }

  onSave = (e)=>{
    console.log("saved clicked" ,e)
  }

  render() {
    return (
        <>
        <SunEditor
        onDrop={this.onDroped}
        onChange={this.onChange}
        setContents={this.state.content}
        imag
        onImageUpload={this.handleImageUpload}
        lang="en" setOptions={{
                    height: 1000,
                    colorList :  [
                      '#ff0000', '#ff5e00', '#ffe400', '#abf200', '#00d8ff', '#0055ff', '#6600ff', '#ff00dd', '#000000',
                      '#ffd8d8', '#fae0d4', '#faf4c0', '#e4f7ba', '#d4f4fa', '#d9e5ff', '#e8d9ff', '#ffd9fa', '#f1f1f1',
                      '#ffa7a7', '#ffc19e', '#faed7d', '#cef279', '#b2ebf4', '#b2ccff', '#d1b2ff', '#ffb2f5', '#bdbdbd',
                      '#f15f5f', '#f29661', '#e5d85c', '#bce55c', '#5cd1e5', '#6699ff', '#a366ff', '#f261df', '#8c8c8c',
                      '#980000', '#993800', '#998a00', '#6b9900', '#008299', '#003399', '#3d0099', '#990085', '#353535',
                      '#670000', '#662500', '#665c00', '#476600', '#005766', '#002266', '#290066', '#660058', '#222222'
                    ],
                    imageResizing : true,
                    imageMultipleFile : true,
                    imageGalleryUrl : true,
                    callBackSave : this.onSave,
                    youtubeQuery :'autoplay=0&mute=1&enablejsapi=1&controls=0&rel=0&modestbranding=1',
                    buttonList:[
                      ['undo', 'redo',
                      'font', 'fontSize', 'formatBlock',
                      'paragraphStyle', 'blockquote',
                      'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript',
                      'fontColor', 'hiliteColor', 'textStyle',
                      'removeFormat',
                      'outdent', 'indent',
                      'align', 'horizontalRule', 'list', 'lineHeight',
                      'table', 'link', 'image', 'video', 'audio', /** 'math', */ // You must add the 'katex' library at options to use the 'math' plugin.
                      /** 'imageGallery', */ // You must add the "imageGalleryUrl".
                      'fullScreen', 'showBlocks', 'codeView',
                      'preview', 'print', 'save', 'template']
                  ] // Or Array of button list, eg. [['font', 'align'], ['image']]
                    // Other option
            }} 
            showToolbar={true}/>
              
        </>
    );
  }
}

export default Editor;
