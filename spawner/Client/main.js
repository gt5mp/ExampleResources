var menus = [];

// Main menu
var mainMenu = API.createMenu("SPAWNER", 50, 50, 2)
menus.push(mainMenu);

API.onResourceStart.connect(function (sender, e) {
    var groupedVehicles = [];

    for (var i = 0; i < resource.vehicles.vehicleHashes.length; i++) {
        var vehicleHash = resource.vehicles.vehicleHashes[i];
        var vehicleClass = resource.vehicles.vehicleClassNames[API.getVehicleClass(vehicleHash)];

        if (groupedVehicles[vehicleClass] == undefined) {
            groupedVehicles[vehicleClass] = [];
        }

        groupedVehicles[vehicleClass].push({ hash: vehicleHash, name: API.getVehicleDisplayName(vehicleHash) });
    }

    for (var group in groupedVehicles) {
        if (!groupedVehicles.hasOwnProperty(group)) continue;

        var groupName = group;
        var vehicles = groupedVehicles[group];
        var categoryMenu = createVehicleCategory(groupName);

        for (var i = 0; i < vehicles.length; i++) {
            var vehicle = vehicles[i];
            createSpawnVehicleItem(vehicle.name, vehicle.hash, categoryMenu);
        }
    }
});

// Menu creation
function createVehicleCategory(name) {
    var vehicleCategoryMenu = API.createMenu(name, 50, 50, 2)
    menus.push(vehicleCategoryMenu);

    var vehicleCategoryItem = API.createMenuItem(name, "");

    mainMenu.AddItem(vehicleCategoryItem);
    mainMenu.BindMenuToItem(vehicleCategoryMenu, vehicleCategoryItem);

    return vehicleCategoryMenu;
}

function createSpawnVehicleItem(name, hash, parentMenu) {
    var menuItem = API.createMenuItem(name, "");
    menuItem.Activated.connect(function (menu, item) {
		API.triggerServerEvent("CREATE_VEHICLE", hash);
    });
    parentMenu.AddItem(menuItem);
}

// Menu handling
API.onKeyDown.connect(function(sender, keyEventArgs) {
	if (keyEventArgs.KeyCode == Keys.F2) {
        // If any menus open, close them.
        var anyOpen = false;
        for (var i = 0; i < menus.length; i++) {
            if (menus[i].Visible) {
                anyOpen = true;
                menus[i].Visible = false;
            }
        }

        if (anyOpen) return;
        // Otherwise, open main menu.

		mainMenu.Visible = true;
	}
});
