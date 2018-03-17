var blockedClasses = [13, 14, 15, 16, 21]; // https://wiki.gt-mp.net/index.php?title=Vehicle_Classes

function isVehicleClassBlocked(vehicle) {
    return (blockedClasses.indexOf(API.getVehicleClass(API.getEntityModel(vehicle))) > -1);
}

API.onKeyDown.connect(function (sender, e) {
    if (e.KeyCode == Keys.NumPad4 || e.KeyCode == Keys.NumPad6)
    {
        var localPlayer = API.getLocalPlayer();
        if (API.isPlayerInAnyVehicle(localPlayer) && API.getPlayerVehicleSeat(localPlayer) == -1 && !isVehicleClassBlocked(API.getPlayerVehicle(localPlayer))) API.triggerServerEvent("UpdateIndicator", ((e.KeyCode == Keys.NumPad4) ? 1 : 0));
    }
});

API.onServerEventTrigger.connect(function (eventName, args) {
    if (eventName == "IndicatorSubtitle") API.displaySubtitle(((args[0] == 1) ? "Left" : "Right") + " Indicator: " + ((args[1]) ? "~g~On" : "~r~Off"), 1000);
});

API.onEntityStreamIn.connect(function (ent, entType) {
    if (entType == 1)
    {
        for(var i = 0; i < 2; i++)
        {
            var indicatorName = "Indicator_" + i;
            if (API.hasEntitySyncedData(ent, indicatorName)) API.callNative("SET_VEHICLE_INDICATOR_LIGHTS", ent, i, API.getEntitySyncedData(ent, indicatorName));
        }
    }
});