function updateScroll() {
	let body = $("#chat-body");
	if (body.scrollTop() >= body[0].scrollHeight - 400) {
		body.scrollTop(body[0].scrollHeight);
	}		
}

String.prototype.replaceAll = function(strReplace, strWith) {
    let esc = strReplace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    let reg = new RegExp(esc, 'ig');
    return this.replace(reg, strWith);
};


const defaultColors = { // Based on https://wiki.gt-mp.net/index.php?title=Fonts
	"~r~": "#DE3232",
	"~b~": "#5CB4E3",
	"~g~": "#71CA71",
	"~y~": "#EEC650",
	"~p~": "#8365E0",
	"~q~": "#E24F80",
	"~o~": "#FD8455",
	"~c~": "#8B8B8B",
	"~m~": "#636363",
	"~w~": "#FFFFFF",
	"~s~": "#FFFFFF",
	"~u~": "#000000"
};

const htmlTags = { // Based on https://www.w3schools.com/html/html_formatting.asp
	"~h~": "strong",
	"~i~": "i",
	"~uline~": "u"
};

function formatMsg(input) { // You can use: default colors, hex color codes (like ~#ff0000~), HTML tags (from htmlTags dictionary)
	let output = input;
	let endOfBlock;
	
	for (let key in defaultColors) { // default colors
		let value = defaultColors[key];
		output = output.replaceAll(key, '</span><span style="color: '+value+';">');
	}
	output = output.replace(/~#([0-9A-F][0-9A-F])([0-9A-F][0-9A-F])([0-9A-F][0-9A-F])~/gi, '</span><span style="color: #$1$2$3;">'); // hex color codes
	
	for (let key in htmlTags) { // HTML tags
		let value = htmlTags[key];
		endOfBlock = false;
		while (output.includes(key)) {
			output = output.replace(key, "<"+(endOfBlock ? "/" : "")+value+">");
			endOfBlock = !endOfBlock;
		}
	}
	
    return '<span style="color: white;">' + output + '</span>';
}

function addMessage(msg) {
	let child = $("<p>" + formatMsg(msg) + "</p>");
	child.hide();
	$("#chat-body").append(child);
	child.fadeIn();

	updateScroll();
}

function setFocus(focus) {
	let mainInput = $("#main-input");
	if (focus) {
		mainInput.show();
		mainInput.val("");
		mainInput.focus();
	}
	else {
		mainInput.hide();
		mainInput.val("");
	}
}

function onKeyUp(event) {
	if (event.keyCode == 13) {
		let m = $("#main-input").val();
		if (m) {
			try {
                resourceCall("commitMessage", m + "");
                setFocus(false);

			}
			catch(err) {
				$("body").text(err);
			}
		}
	}
}
