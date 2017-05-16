var vehiclesWindow = null;
var invincible = false;

API.onResourceStart.connect(function (sender, e) {
	vehiclesWindow = API.createMenu("VEHICLES", 0, 0, 6);

	var linkItem = API.createMenuItem("Vehicles", "");
	resource.trainer.mainWindow.AddItem(linkItem);
	resource.trainer.mainWindow.BindMenuToItem(vehiclesWindow, linkItem);
	resource.trainer.menuPool.Add(vehiclesWindow);

	vehiclesWindow.AddItem(addVehicleItem("T20", 1663218586));
	vehiclesWindow.AddItem(addVehicleItem("Futo", 2016857647));
    vehiclesWindow.AddItem(addVehicleItem("Burrito", -1346687836)); 
    vehiclesWindow.AddItem(addVehicleItem("Sanchez", 788045382));
	vehiclesWindow.AddItem(addVehicleItem("Maverick", -1660661558));
	vehiclesWindow.AddItem(addVehicleItem("Buzzard", 788747387));
	vehiclesWindow.AddItem(addVehicleItem("Hydra", 970385471));
	vehiclesWindow.AddItem(addVehicleItem("Seashark", -1030275036));

	vehiclesWindow.RefreshIndex();
});

function addVehicleItem(gun, hash) {
	var suicide = API.createMenuItem(gun, "");

	suicide.Activated.connect(function (menu, item) {
		API.triggerServerEvent("CREATE_VEHICLE", hash);
	});

	return suicide;
}


API.onUpdate.connect(function (s, e) {
	
})