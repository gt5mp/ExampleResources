var mood_menu = null;

API.onServerEventTrigger.connect(function(event_name, args) {
    switch (event_name)
    {
        case "ReceiveMoods":
            if (mood_menu == null)
            {
                var data = JSON.parse(args[0]);

                mood_menu = API.createMenu("Moods", "~b~Select a mood.", 0, 0, 6);
                for (var i = 0; i < data.length; i++) mood_menu.AddItem(API.createMenuItem(data[i], ""));
                mood_menu.MenuItems[0].SetLeftBadge(BadgeStyle.Tick);
                
                mood_menu.OnItemSelect.connect(function(menu, item, index) {
                    API.triggerServerEvent("SetMood", index);
                });

                mood_menu.RefreshIndex();
                mood_menu.Visible = true;
            }
        break;

        case "SetCurrentMoodIndex":
            if (mood_menu == null) return;

            for (var i = 0; i < mood_menu.MenuItems.Count; i++) mood_menu.MenuItems[i].SetLeftBadge(BadgeStyle.None);
            mood_menu.MenuItems[ args[0] ].SetLeftBadge(BadgeStyle.Tick);
        break;

        case "SetPlayerMood":
            API.setPlayerFacialIdleAnimOverride(args[0], args[1]);
        break;

        case "ResetPlayerMood":
            API.clearPlayerFacialIdleAnimOverride(args[0]);
        break;
    }
});

API.onKeyDown.connect(function(e, key) {
    if (key.KeyCode == Keys.F4)
    {
        if (API.isChatOpen()) return;

        if (mood_menu == null) {
            API.triggerServerEvent("RequestMoods");
        } else {
            mood_menu.Visible = !mood_menu.Visible;
        }
    }
});

API.onEntityStreamIn.connect(function(entity, entity_type) {
    if (entity_type == 6 && API.hasEntitySyncedData(entity, "PlayerMood")) API.setPlayerFacialIdleAnimOverride(entity, API.getEntitySyncedData(entity, "PlayerMood"));
});