using System;
using System.Linq;
using System.Collections.Generic;
using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server.Elements;

namespace WalkingStyleHelper
{
    public class WalkingStyle
    {
        public string Name;
        public string AnimName;

        public WalkingStyle(string name, string anim_name)
        {
            Name = name;
            AnimName = anim_name;
        }
    }

    public class Main : Script
    {
        // names & style names taken from https://github.com/Guad/EnhancedInteractionMenu/blob/master/EnhancedInteractionMenu/pi_menu.cs
        List<WalkingStyle> WalkingStyles = new List<WalkingStyle>
        {
            new WalkingStyle("Normal", ""),
            new WalkingStyle("Brave", "move_m@brave"),
            new WalkingStyle("Confident", "move_m@confident"),
            new WalkingStyle("Drunk", "move_m@drunk@verydrunk"),
            new WalkingStyle("Fat", "move_m@fat@a"),
            new WalkingStyle("Gangster", "move_m@shadyped@a"),
            new WalkingStyle("Hurry", "move_m@hurry@a"),
            new WalkingStyle("Injured", "move_m@injured"),
            new WalkingStyle("Intimidated", "move_m@intimidation@1h"),
            new WalkingStyle("Quick", "move_m@quick"),
            new WalkingStyle("Sad", "move_m@sad@a"),
            new WalkingStyle("Tough Guy", "move_m@tool_belt@a")
        };

        public Main()
        {
            API.onPlayerModelChange += WalkingStyle_ModelChange;
            API.onClientEventTrigger += WalkingStyle_EventTrigger;
        }

        public void WalkingStyle_ModelChange(Client player, int old_model)
        {
            if (player.hasSyncedData("WalkingStyle")) API.triggerClientEventForAll("SetPlayerWalkingStyle", player.handle, player.getSyncedData("WalkingStyle"));
        }

        public void WalkingStyle_EventTrigger(Client player, string event_name, params object[] args)
        {
            switch (event_name)
            {
                case "RequestWalkingStyles":
                    player.triggerEvent("ReceiveWalkingStyles", API.toJson(WalkingStyles.Select(w => w.Name)));
                break;

                case "SetWalkingStyle":
                    if (args.Length < 1) return;

                    int id = Convert.ToInt32(args[0]);
                    if (id < 0 || id >= WalkingStyles.Count) return;

                    if (id == 0) // reset
                    {
                        API.triggerClientEventForAll("ResetPlayerWalkingStyle", player.handle);
                        player.resetSyncedData("WalkingStyle");
                    }
                    else
                    {
                        API.triggerClientEventForAll("SetPlayerWalkingStyle", player.handle, WalkingStyles[id].AnimName);
                        player.setSyncedData("WalkingStyle", WalkingStyles[id].AnimName);
                    }

                    player.triggerEvent("SetCurrentStyleIndex", id);
                    player.sendChatMessage("Walking style set to: ~y~" + WalkingStyles[id].Name + ".");
                break;
            }
        }
    }
}