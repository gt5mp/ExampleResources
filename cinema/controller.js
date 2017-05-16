var mainBrowser = null;
var selectingPos = false;

var topLeft = new Vector3(-1419.58, -258.72, 22.91707);
var topRight = new Vector3(-1433.43, -258.70, 22.91268);
var bottomRight = new Vector3(-1433.43, -258.70, 17.59536);
var bottomLeft = new Vector3(-1419.58, -258.72, 17.56603);

API.onChatCommand.connect(function (msg) {
    if (msg.indexOf("/goto") == 0) {
        var page = msg.substring(6);

        API.sendNotification("Page: " + page);

        if (mainBrowser == null) {
            API.sendNotification("Creating new browser...");
            var res = API.getScreenResolution();
            var browserWidth = 800;
            var browserHeight = 600;
            mainBrowser = API.createCefBrowser(browserWidth, browserHeight, false);
            API.setCefBrowserPosition(mainBrowser, ((res.Width / 2) - (browserWidth / 2)), ((res.Height / 2) - (browserHeight / 2)));
            API.waitUntilCefBrowserInit(mainBrowser);
            API.sendNotification("Browser created!");
            API.showCursor(true);
        }

        API.loadPageCefBrowser(mainBrowser, page);
        return 1;
    }

    if (msg == "/stopbrowser") {
        if (mainBrowser != null) {
            API.destroyCefBrowser(mainBrowser);
            mainBrowser = null;
            API.showCursor(false);
        }
        return 1;
    }

    if (msg == "/mouseon") {
        API.showCursor(true);
    } 

    if (msg == "/mouseoff") {
        API.showCursor(false);
    }
});

API.onKeyDown.connect(function (sender, args) {
    if (args.KeyCode == Keys.F12) {
        selectingPos = !selectingPos;
        API.sendNotification("Setpos: " + selectingPos);
    }
});

API.onResourceStop.connect(function (e, ev) {
    if (mainBrowser != null) {
        API.destroyCefBrowser(mainBrowser);
    }
});

API.onUpdate.connect(function () {
    if (selectingPos) {
        var cursOp = API.getCursorPositionMaintainRatio();
        var s2w = API.screenToWorldMaintainRatio(cursOp);
        API.displaySubtitle(API.toString(s2w));
    }
});