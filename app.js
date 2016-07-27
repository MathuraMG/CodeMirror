var isLightTheme = 1;
var isTextArea = 1;

var myCodeMirror;

// let's save this as a globally accessible variable in case we need it for more custom style functions
var cmWrapperElement;

// debugger;
window.onload = function(){

  myCodeMirror = CodeMirror.fromTextArea(document.getElementById('codemirror-test'), {
    mode:  "javascript",
    lineNumbers: true,
    theme: "3024-day",
    autoCloseBrackets: true,
    inputStyle: "contenteditable"
    // lineNumberFormatter: function(line){return('ln' + line);}
  });

  isTextArea = 0;
  document.getElementsByClassName('lines')[0].style.display = 'none';
  cmWrapperElement = myCodeMirror.getWrapperElement();

  codeArea =document.getElementsByClassName('CodeMirror')[0];
  codeArea.addEventListener("keyup", function() {
    eval(myCodeMirror.doc.getValue());
  })

  setIDETheme();
  var textarea = document.getElementById('codemirror-test');
}

// /******* ADDED EDITOR FUNCTIONALITES *********/
//
// myCodeMirror.setOption("extraKeys", {
//   'Ctrl-L': function(cm) {
//     document.getElementById('noOfLines').innerHTML = 'no of lines - ' + myCodeMirror.lineCount();
//   }
// });

/******* UTILITIES *********/

function toggleTheme() {
  if(isLightTheme == 1) {
    myCodeMirror.setOption('theme','3024-night');
    isLightTheme = 0;
  }
  else {
    myCodeMirror.setOption('theme','3024-day');
    isLightTheme = 1;
  }
}

function setFontSize() {
  var fontSize = document.getElementById('fontSize').value;
  cmWrapperElement.style['font-size'] = fontSize;
}

function setIDETheme() {
  var selTheme = document.getElementById('ideTheme').value;
  myCodeMirror.setOption('theme',selTheme);
}

function switchToText() {
  if(isTextArea === 0 ){
    console.log('switch to text area');
    myCodeMirror.toTextArea();
    isTextArea = 1;
    document.getElementsByClassName('lines')[0].style.display = 'block';
    document.getElementsByClassName('lines')[0].tabindex = -1;
    document.getElementsByClassName('line')[0].tabindex = -1;
  }
  else {
    console.log('switch to codemirror area');
    myCodeMirror = CodeMirror.fromTextArea(document.getElementById('codemirror-test'), {
      mode:  "javascript",
      lineNumbers: true,
      theme: document.getElementById('ideTheme').value,
      autoCloseBrackets: true,
      inputStyle: "contenteditable",
      // tabMode: "indent",
      // lineNumberFormatter: function(line){return('ln' + line);}
    });
    isTextArea = 0;
    document.getElementsByClassName('lines')[0].style.display = 'none';
  }
}
