var False = false;
var True = true;

function updateScroll() {
	var body = $("#chat-body");
	if (body.scrollTop() >= body[0].scrollHeight - 400) {
		body.scrollTop(body[0].scrollHeight);
	}		
}

String.prototype.replaceAll = function (strReplace, strWith) {
    var esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var reg = new RegExp(esc, 'ig');
    return this.replace(reg, strWith);
};

function formatMsg(input) {
	var start = '<span style="color: white;">';
	var output = start;
	
    var pass1 = input.replaceAll("~r~", '</span><span style="color: red;">');
    var pass2 = pass1.replaceAll("~b~", '</span><span style="color: blue;">');
    var pass3 = pass2.replaceAll("~g~", '</span><span style="color: green;">');
    var pass4 = pass3.replaceAll("~p~", '</span><span style="color: purple;">');
    var pass5 = pass4.replaceAll("~w~", '</span><span style="color: white;">');

    return output + pass5 + "</span>";
}

function addMessage(msg) {
	var child = $("<p>" + formatMsg(msg) + "</p>");
	child.hide();
	$("#chat-body").append(child);
	child.fadeIn();

	updateScroll();
}

function addColoredMessage(msg, r,g,b) {
	var child = $('<p style="color: rgb(' + r + ', ' + g + ', ' + b + ');">' + formatMsg(msg) + '</p>');
	child.hide();
	$("#chat-body").append(child);
	child.fadeIn();

	updateScroll();
}

function setFocus(focus) {
	var mainInput = $("#main-input");
	if (focus) {		
		mainInput.show();
		mainInput.val("");
		mainInput.focus();
	} else {
		mainInput.hide();
		mainInput.val("");
	}
}

function onKeyUp(event) {
	if (event.keyCode == 13) {
		var m = $("#main-input").val();
		if (m)		
		{
			try
			{
                resourceCall("commitMessage", m + "");
                setFocus(false);

			}
			catch(err) {
				$("body").text(err);
			}
		}
	}
}
/*
window.setInterval(function () {
	addMessage($("#chat-body").scrollTop() + " / " + $("#chat-body")[0].scrollHeight);
}, 500);
*/