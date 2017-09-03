API.onServerEventTrigger.connect(function (eventName, args) {
	switch (eventName) {

		case 'showOldMessage':
			API.showOldMessage(args[0], args[1]);
			break;
		case 'showMissionPassedMessage':
			API.showMissionPassedMessage(args[0], args[1]);
			break;
		case 'showLoadingPrompt':
			API.showLoadingPrompt(args[0], args[1]);
			break;
		case 'hideLoadingPrompt':
			API.hideLoadingPrompt();
			break;
	}
});