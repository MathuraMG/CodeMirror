var AudioManager = (function() {

	var AudioManager = function() {
		this.context = undefined;
		this.oscillator = undefined;
		this.output = undefined;

		this.init();
	};

	AudioManager.prototype.constructor = AudioManager;

	AudioManager.prototype.init = function() {
		var self = this,
			contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);

		if (!contextClass) {
			console.error('Could not initiate audio context');
			return false;
		}

		self.context = new contextClass();

		self.output = self.context.createGainNode();
		self.output.connect(self.context.destination);

		self.oscillator = self.context.createOscillator();
		self.oscillator.type = 'square';
		self.oscillator.frequency = 300;
		self.oscillator.connect(self.output);
	};

	return AudioManager;
})();