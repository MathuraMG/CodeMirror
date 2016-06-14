var isLightTheme = 1;

var myCodeMirror = CodeMirror(document.body, {
  value: "console.log('potato')\n",
  mode:  "javascript",
  lineNumbers: true,
  theme: "3024-day",
  autoCloseBrackets: true,
  inputStyle: "contenteditable"
});
var cm = myCodeMirror;
// let's save this as a globally accessible variable in case we need it for more custom style functions
var cmWrapperElement = myCodeMirror.getWrapperElement();

// debugger;

codeArea =document.getElementsByClassName('CodeMirror')[0];
codeArea.addEventListener("keyup", function() {
  // console.log('changing the value');
  eval(myCodeMirror.doc.getValue());
})
window.onload = function(){

  setIDETheme();

  //add content editable to the parent class - 'CodeMirror-lines'
  // document.getElementsByClassName('CodeMirror-lines')[0].contentEditable = true;

}

/******* ADDED EDITOR FUNCTIONALITES *********/

myCodeMirror.setOption("extraKeys", {
  'Ctrl-L': function(cm) {
    document.getElementById('noOfLines').innerHTML = 'no of lines - ' + myCodeMirror.lineCount();
  }
});

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


function shout(content){
    shouter = $('#shouter')[0]
    $(shouter).val(content)
    console.log(content)
}
function shout_current_content(cm)
{
    setTimeout(function () {
        content = get_current_content(cm)
        console.log('the content is -- ');
        console.log(content);
        shout(content)
    }, 1)
}
function get_current_content(cm)
{
    editor = cm.getInputField()
    content = $(editor).val()
    console.log(content)
    return content
}
function init_Code() {
    if($('.CodeMirror').length > 0){     //Check if codemirror is loaded or not
        $('.CodeMirror').keydown(function(e) {

            cm = myCodeMirror
            content = get_current_content(cm)
            if((e.keyCode >= 48 && e.keyCode <= 90) || content != "") {
                shout_current_content(cm)
                console.log('typing in codemirror');
            }
            else{
                cursor = cm.getCursor()
                content = cm.getLine(cursor['line'])
                switch (e.keyCode) {
                    case 37:
                    case 39:
                        content = content.substring(0, cursor['ch'])
                        shout(content)
                        break
                    case 38:
                    case 40:
                        if (content == "") {
                            content = "Empty Line"
                        }
                        shout(content)
                        break
                    default:
                        shout_current_content(cm)
                }
            }
        }
        )
    }
    else{
        setTimeout(init_Code, 100)
    }
}
init_Code()
