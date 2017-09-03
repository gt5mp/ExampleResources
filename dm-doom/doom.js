var restartMusic = true;

API.onUpdate.connect(function(sender, e) {
	if (restartMusic && !API.isMusicPlaying()) {
		API.startMusic("e1m1.mp3");
	}
});

API.onChatCommand.connect(function (msg) {
   if (msg == "/imapussy") {
   		restartMusic = false;
       API.stopMusic();
   }
});

API.onResourceStop.connect(function(s,e) {
	API.stopMusic();
});

API.onResourceStart.connect(function(s,e) {
	API.stopMusic();
	API.startMusic("e1m1.mp3");
});
