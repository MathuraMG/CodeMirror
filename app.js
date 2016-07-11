var App = (function() {

  var App = function() {
    this.isLightTheme = true;
    this.fontSizeSelector = document.getElementById('fontSize');
    this.themeSelector = document.getElementById('ideTheme');
    this.codeMirror = CodeMirror(document.getElementById('cmContainer'), {
      value: 'console.log(\'potato\')\;\n',
      mode:  "javascript",
      lineNumbers: true,
      theme: "3024-day",
      autoCloseBrackets: true,
      inputStyle: "contenteditable"
    });

    // these will be set in the init() function
    this.codeArea = null;
    this.cmWrapperElement = null;

    this.init();
  };

  App.prototype.constructor = App;

  App.prototype.init = function() {
    var self = this;

    self.codeArea = document.getElementsByClassName('CodeMirror')[0];
    self.cmWrapperElement = self.codeMirror.getWrapperElement();

    self.codeMirror.setOption("extraKeys", {
      'Ctrl-L': function(cm) {
        document.getElementById('noOfLines').innerHTML = 'no of lines - ' + myCodeMirror.lineCount();
      }
    });

    self.bindHandlers();
    self.codeMirror.setOption('theme', 'cobalt');
  };

  App.prototype.bindHandlers = function() {
    var self = this;

    // The functions below are being bound to
    // DOM elements, so in their scope 'this' will 
    // refer to the element itself, while 'self' 
    // refers to our instance of this App; within
    // the event handlers, we will refer to the 
    // global 'app' variable. A little weird
    // but it works ¯\_(ツ)_/¯

    var keyup = function() {
      var value = app.codeMirror.doc.getValue();
      eval(value);
    };

    var setFontSize = function() {
      var fontSize = this.value;
      app.cmWrapperElement.style['font-size'] = fontSize;
    };

    var setTheme = function() {
      var theme = this.value;
      app.codeMirror.setOption('theme', theme);
    };

    self.codeArea.addEventListener('keyup', keyup);
    self.fontSizeSelector.addEventListener('change', setFontSize);
    self.themeSelector.addEventListener('change', setTheme);
  };

  return App;
})();

var app;
window.onload = function() {
  app = new App();
};