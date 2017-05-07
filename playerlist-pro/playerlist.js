"use strict";
/// <reference path="types-gtanetwork/index.d.ts" />
var PlayerInfo = (function () {
    function PlayerInfo() {
        this.socialClubName = "";
        this.name = "";
        this.ping = 0;
        this.color = [255, 255, 255];
    }
    return PlayerInfo;
}());
var g_currentState = 0;
var g_currentPage = 0;
var g_stateSet = 0;
var g_players = [];
function getPlayer(socialClubName) {
    for (var i = 0; i < g_players.length; i++) {
        if (g_players[i].socialClubName == socialClubName) {
            return g_players[i];
        }
    }
    return null;
}
function parseColor(color) {
    return [
        parseInt(color.substr(0, 2), 16),
        parseInt(color.substr(2, 2), 16),
        parseInt(color.substr(4, 2), 16)
    ];
}
API.onServerEventTrigger.connect(function (name, args) {
    if (name == "playerlist") {
        g_players = [];
        var list = args[0];
        for (var i = 0; i < list.Count; i++) {
            var obj = JSON.parse(list[i]);
            var newPlayer = new PlayerInfo();
            newPlayer.socialClubName = obj.socialClubName;
            newPlayer.name = obj.name;
            newPlayer.color = parseColor(obj.color);
            g_players.push(newPlayer);
        }
    }
    else if (name == "playerlist_join") {
        // This can happen in certain situations, so we handle this as an update
        var existingPlayer = getPlayer(args[0]);
        if (existingPlayer != null) {
            existingPlayer.socialClubName = args[0];
            existingPlayer.name = args[1];
            existingPlayer.color = parseColor(args[2]);
        }
        else {
            var newPlayer = new PlayerInfo();
            newPlayer.socialClubName = args[0];
            newPlayer.name = args[1];
            newPlayer.color = parseColor(args[2]);
            g_players.push(newPlayer);
        }
    }
    else if (name == "playerlist_leave") {
        for (var i = 0; i < g_players.length; i++) {
            if (g_players[i].socialClubName == args[0]) {
                g_players.splice(i, 1);
            }
        }
    }
    else if (name == "playerlist_pings") {
        var list = args[0];
        for (var i = 0; i < list.Count; i++) {
            var obj = JSON.parse(list[i]);
            var player = getPlayer(obj.socialClubName);
            if (player != null) {
                player.ping = obj.ping;
            }
        }
    }
    else if (name == "playerlist_changednames") {
        var list = args[0];
        for (var i = 0; i < list.Count; i++) {
            var obj = JSON.parse(list[i]);
            var player = getPlayer(obj.socialClubName);
            if (player != null) {
                player.name = obj.newName;
            }
        }
    }
});
API.onUpdate.connect(function () {
    // MultiplayerInfo
    if (!API.isChatOpen() && API.isControlJustPressed(20 /* MultiplayerInfo */)) {
        g_currentState++;
        g_stateSet = API.getGameTime();
        API.triggerServerEvent("playerlist_pings");
        if (g_currentState == 1) {
            g_currentPage = 0;
            return;
        }
        if (g_currentState == 2) {
            API.callNative("_SET_RADAR_BIGMAP_ENABLED", true, false);
        }
        if (g_currentState == 3) {
            g_currentState = 0;
            API.callNative("_SET_RADAR_BIGMAP_ENABLED", false, false);
        }
    }
    if (g_currentState > 0 && API.getGameTime() - g_stateSet > 3000) {
        g_currentState = 0;
        API.callNative("_SET_RADAR_BIGMAP_ENABLED", false, false);
    }
    if (g_currentState == 1) {
        // Get list data
        var resolution = API.getScreenResolutionMaintainRatio();
        var listPadding = 4;
        var listLine = 28;
        var listBorder = 2;
        var listItemsPerPage = Math.floor((resolution.Height * 0.8) / listLine);
        var listPages = Math.ceil(g_players.length / listItemsPerPage);
        // Page navigation is here for now because the onKeyDown method doesn't work
        if (listPages > 1) {
            if (API.isControlJustPressed(172 /* PhoneUp */)) {
                g_stateSet = API.getGameTime();
                if (--g_currentPage < 0) {
                    g_currentPage = listPages - 1;
                }
            }
            else if (API.isControlJustPressed(173 /* PhoneDown */)) {
                g_stateSet = API.getGameTime();
                if (++g_currentPage >= listPages) {
                    g_currentPage = 0;
                }
            }
        }
        var listPageStart = g_currentPage * listItemsPerPage;
        var listPageCount = Math.min(g_players.length - listPageStart, listItemsPerPage);
        var listWidth = resolution.Width * 0.4;
        var listHeight = (Math.min(g_players.length, listPageCount) + 1) * 28 + listPadding * 2;
        var listX = resolution.Width / 2 - listWidth / 2;
        var listY = Math.max(30, resolution.Height * 0.3 - listHeight / 2);
        // Fill
        API.drawRectangle(listX, listY, listWidth, listHeight, 0, 0, 0, 220);
        // Separator
        API.drawRectangle(listX, listY + listLine, listWidth, listBorder, 100, 100, 100, 220);
        // Left
        API.drawRectangle(listX - listBorder, listY - listBorder, listBorder, listHeight + listBorder * 2, 255, 255, 255, 220);
        // Right
        API.drawRectangle(listX + listWidth, listY - listBorder, listBorder, listHeight + listBorder * 2, 255, 255, 255, 220);
        // Top
        API.drawRectangle(listX, listY - listBorder, listWidth, listBorder, 255, 255, 255, 220);
        // Bottom
        API.drawRectangle(listX, listY + listHeight, listWidth, listBorder, 255, 255, 255, 220);
        // Page indicators
        if (g_currentPage > 0) {
            API.drawText("3", listX + listWidth / 2, listY + listLine, 0.5, 255, 255, 255, 255, 3, 1, true, true, 0);
        }
        if (g_currentPage < listPages - 1) {
            API.drawText("4", listX + listWidth / 2, listY + listHeight - listLine * 2, 0.5, 255, 255, 255, 255, 3, 1, true, true, 0);
        }
        // Header
        API.drawText("Name", listX + listPadding, listY - listPadding / 2, 0.4, 255, 255, 0, 255, 0, 0, true, true, 0);
        API.drawText("Ping", listX + listWidth - listPadding, listY - listPadding / 2, 0.4, 255, 255, 0, 255, 0, 2, true, true, 0);
        // Players
        for (var i = 0; i < listPageCount; i++) {
            var player = g_players[listPageStart + i];
            var color = player.color;
            API.drawText(player.name, listX + listPadding, listY + listPadding / 2 + listLine * (i + 1), 0.45, color[0], color[1], color[2], 255, 4, 0, true, true, 0);
            API.drawText("" + player.ping, listX + listWidth - listPadding, listY + listPadding / 2 + listLine * (i + 1), 0.45, 100, 100, 100, 255, 4, 2, true, true, 0);
        }
    }
});
