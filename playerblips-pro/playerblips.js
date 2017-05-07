"use strict";
/// <reference path="types-gtanetwork/index.d.ts" />
var g_tanks = [API.getHashKey("rhino")];
var g_technical = [API.getHashKey("insurgent"), API.getHashKey("technical")];
var g_jets = [API.getHashKey("hydra"), API.getHashKey("lazer")];
function updatePlayerBlip(blip, player) {
    if (blip == null || blip.IsNull) {
        return;
    }
    var playerPosition = API.getEntityPosition(player);
    API.setBlipPosition(blip, playerPosition);
    var playerVehicle = API.getPlayerVehicle(player);
    if (!playerVehicle.IsNull) {
        var vehicleRotation = API.getEntityRotation(playerVehicle);
        if (API.getBlipSprite(blip) > 1) {
            API.callNative("SET_BLIP_ROTATION", blip, Math.round(vehicleRotation.Z));
        }
    }
}
API.onUpdate.connect(function () {
    var players = API.getStreamedPlayers();
    for (var i = 0; i < players.Length; i++) {
        var player = players[i];
        // WORKAROUND: Ignore if position is reported to be at 0,0,0 exactly.
        // Bug reported here: https://bt.gtanet.work/view.php?id=10
        var zeroCheck = API.getEntityPosition(player);
        if (zeroCheck.X == 0 && zeroCheck.Y == 0 && zeroCheck.Z == 0) {
            continue;
        }
        var blip = API.getEntitySyncedData(player, "playerblip");
        if (blip == null || blip.IsNull) {
            continue;
        }
        updatePlayerBlip(blip, player);
    }
    var localPlayer = API.getLocalPlayer();
    var localVehicle = API.getPlayerVehicle(localPlayer);
    var localBlip = API.getEntitySyncedData(localPlayer, "playerblip");
    if (localBlip == null) {
        return;
    }
    API.setBlipTransparency(localBlip, 0);
    //var localBlipColor = API.getBlipColor(localBlip); // For testing
    var localBlipSprite = API.getBlipSprite(localBlip);
    var newBlipSprite = localBlipSprite;
    updatePlayerBlip(localBlip, localPlayer);
    if (localVehicle.IsNull) {
        newBlipSprite = 1;
    }
    else {
        var vehicleHash = API.getEntityModel(localVehicle);
        var vehicleClass = API.getVehicleClass(vehicleHash);
        if (g_tanks.indexOf(vehicleHash) != -1) {
            // Tank
            newBlipSprite = 421;
        }
        else if (g_technical.indexOf(vehicleHash) != -1) {
            // Technical
            newBlipSprite = 460;
        }
        else if (g_jets.indexOf(vehicleHash) != -1) {
            // Jet
            newBlipSprite = 16;
        }
        else if (vehicleClass == 14) {
            // Boat
            newBlipSprite = 427;
        }
        else if (vehicleClass == 15) {
            // Helicopter
            newBlipSprite = 422;
        }
        else if (vehicleClass == 16) {
            // Plane
            newBlipSprite = 307;
        }
        else {
            // Normal
            newBlipSprite = 1;
        }
    }
    if (localBlipSprite != newBlipSprite) {
        API.setBlipSprite(localBlip, newBlipSprite);
        //API.setBlipColor(localBlip, localBlipColor); // For testing
        API.triggerServerEvent("playerblip_sprite", newBlipSprite);
    }
});
