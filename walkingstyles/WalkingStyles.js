var walking_style_menu = null;

API.onServerEventTrigger.connect(function(event_name, args) {
    switch (event_name)
    {
        case "ReceiveWalkingStyles":
            if (walking_style_menu == null)
            {
                var data = JSON.parse(args[0]);

                walking_style_menu = API.createMenu("Walking Styles", "~b~Select a walking style.", 0, 0, 6);
                for (var i = 0; i < data.length; i++) walking_style_menu.AddItem(API.createMenuItem(data[i], ""));
                walking_style_menu.MenuItems[0].SetLeftBadge(BadgeStyle.Tick);
                
                walking_style_menu.OnItemSelect.connect(function(menu, item, index) {
                    API.triggerServerEvent("SetWalkingStyle", index);
                });

                walking_style_menu.RefreshIndex();
                walking_style_menu.Visible = true;
            }
        break;

        case "SetCurrentStyleIndex":
            if (walking_style_menu == null) return;

            for (var i = 0; i < walking_style_menu.MenuItems.Count; i++) walking_style_menu.MenuItems[i].SetLeftBadge(BadgeStyle.None);
            walking_style_menu.MenuItems[ args[0] ].SetLeftBadge(BadgeStyle.Tick);
        break;

        case "SetPlayerWalkingStyle":
            API.setPlayerMovementClipset(args[0], args[1], 0.1);
        break;

        case "ResetPlayerWalkingStyle":
            API.resetPlayerMovementClipset(args[0]);
        break;
    }
});

API.onKeyDown.connect(function(e, key) {
    if (key.KeyCode == Keys.F3)
    {
        if (API.isChatOpen()) return;

        if (walking_style_menu == null) {
            API.triggerServerEvent("RequestWalkingStyles");
        } else {
            walking_style_menu.Visible = !walking_style_menu.Visible;
        }
    }
});

API.onEntityStreamIn.connect(function(entity, entity_type) {
    if (entity_type == 6 && API.hasEntitySyncedData(entity, "WalkingStyle")) API.setPlayerMovementClipset(entity, API.getEntitySyncedData(entity, "WalkingStyle"), 0.1);
});