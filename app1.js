var isLightTheme = 1;
var isTextArea = 1;

var myCodeMirror;

// let's save this as a globally accessible variable in case we need it for more custom style functions
var numberOfLines = 1;

// debugger;
window.onload = function(){
  var codearea = document.getElementById('text-area');
  codearea.addEventListener('keydown',function(e){
      addLineNum(e)
    }
  );
}

/******* UTILITIES *********/

function addLineNum(e) {
  if(e.keyCode) {
    console.log('this is Enter');
    var textTemp = document.getElementById('code-area');
    // textTemp.innerHTML='';
     var temp = document.getElementById('text-area').value;
     temp = temp.split('\n');
    //  textTemp.innerHTML = '';
    // numberOfLines = temp.length;
     tempLineNo = document.getElementById('test-list');
     tempLineNo.innerHTML = '';
     for(var i =0;i<temp.length;i++){

       var tempLineLi = document.createElement('li');
      //  tempLineNo.innerHTML = i+1;
      //  textTemp.appendChild(tempLineNo);
       tempLineLi.innerHTML = temp[i];
       tempLineNo.appendChild(tempLineLi);
     }
  }
}
