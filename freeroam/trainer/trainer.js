var mainWindow = API.createMenu("FREEROAM", 0, 0, 6);

API.onKeyDown.connect(function(sender, keyEventArgs) {
	if (keyEventArgs.KeyCode == Keys.F1) {
		mainWindow.Visible = !mainWindow.Visible;
	}
});
