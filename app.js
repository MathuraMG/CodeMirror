var App = (function() {

  var App = function() {
    this.fontSizeSelector = document.getElementById('fontSize');
    this.themeSelector = document.getElementById('ideTheme');
    this.lintCheckButton = document.getElementById('lintCheck');
    this.codeMirror = CodeMirror(document.getElementById('cmContainer'), {
      value: 'console.log(\'potato\')\;\n',
      mode:  'javascript',
      lineNumbers: true,
      gutters: ['CodeMirror-lint-markers'],
      theme: 'cobalt',
      autoCloseBrackets: true,
      inputStyle: 'contenteditable' //,
      // lint: true
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
        document.getElementById('noOfLines').innerHTML = 'no of lines - ' + self.codeMirror.lineCount();
      }
    });

    self.bindHandlers();

    console.log(self.codeMirror.options.lintWith);
  };

  App.prototype.bindHandlers = function() {
    var self = this;

    // The functions below are being bound to
    // DOM elements, so in their scope 'this' will 
    // refer to the element itself; within
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

    var lintCheck = function() {
      app.codeMirror.setOption('lint', true);
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