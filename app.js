var App = (function() {

  var App = function() {
    this.fontSizeSelector = document.getElementById('fontSize');
    this.themeSelector = document.getElementById('ideTheme');
    this.runButton = document.getElementById('runCode');
    this.codeMirror = CodeMirror(document.getElementById('cmContainer'), {
      value: 'console.log(\'potato\')\;\n',
      mode:  'javascript',
      lineNumbers: true,
      gutters: ['CodeMirror-lint-markers'],
      theme: 'cobalt',
      autoCloseBrackets: true,
      inputStyle: 'contenteditable',
      lint: true
    });
    this.audioManager = new AudioManager();

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
  };

  App.prototype.bindHandlers = function() {
    var self = this;

    // The functions below are being bound to
    // DOM elements, so in their scope 'this' will 
    // refer to the element itself; within
    // the event handlers, we will refer to the 
    // global 'app' variable. A little weird
    // but it works ¯\_(ツ)_/¯

    var setFontSize = function() {
      var fontSize = this.value;
      app.cmWrapperElement.style['font-size'] = fontSize;
    };

    var setTheme = function() {
      var theme = this.value;
      app.codeMirror.setOption('theme', theme);
    };

    var checkAndRun = function() {
      var _value = app.codeMirror.doc.getValue(), 
        success = JSHINT(_value),
        output = '';

      if (!success) {
        output = 'Check format error:\n\n';

        var errors = JSHINT.errors;
        for (var i in errors) {
          var err = errors[i];

          if (err != null) {
            output += err.line + '[' + err.character + ']: ' + err.reason + '\n';
          } else {
            output += 'Check format unknown error:\n';
          }
        }

        alert(output);
      } else {
        eval(_value);
      }

      return success;
    };

    self.fontSizeSelector.addEventListener('change', setFontSize);
    self.themeSelector.addEventListener('change', setTheme);
    self.runButton.addEventListener('click', checkAndRun);
  };

  return App;
})();

var app;
window.onload = function() {
  app = new App();
};