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

		self.output = self.context.createGain();
		self.output.gain.setValueAtTime(0, self.context.currentTime);
		self.output.connect(self.context.destination);

		self.oscillator = self.context.createOscillator();
		self.oscillator.type = 'square';
		self.oscillator.frequency.setValueAtTime(50, self.context.currentTime);
		self.oscillator.connect(self.output);
		self.oscillator.start();
	};

	AudioManager.prototype.alert = function(level, interval) {
		var self = this,
			t = self.context.currentTime;

		self.output.gain.cancelScheduledValues(t);
		self.output.gain.setValueAtTime(level, t);
		t += interval;
		self.output.gain.setValueAtTime(0, t);
		t += interval;
		self.output.gain.setValueAtTime(level, t);
		t += interval;
		self.output.gain.setValueAtTime(0, t);
	}

	return AudioManager;
})();