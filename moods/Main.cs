using System;
using System.Linq;
using System.Collections.Generic;
using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server.Elements;

namespace MoodHelper
{
    public class Mood
    {
        public string Name;
        public string AnimName;

        public Mood(string name, string anim_name)
        {
            Name = name;
            AnimName = anim_name;
        }
    }

    public class Main : Script
    {
        // anim names taken from https://alexguirre.github.io/animations-list/
        List<Mood> PlayerMoods = new List<Mood>
        {
            new Mood("Normal", ""),
            new Mood("Aiming", "mood_aiming_1"),
            new Mood("Angry", "mood_angry_1"),
            new Mood("Drunk", "mood_drunk_1"),
            new Mood("Happy", "mood_happy_1"),
            new Mood("Injured", "mood_injured_1"),
            new Mood("Stressed", "mood_stressed_1"),
            new Mood("Sulking", "mood_sulk_1")
        };

        public Main()
        {
            API.onPlayerModelChange += Moods_ModelChange;
            API.onClientEventTrigger += Moods_EventTrigger;
        }

        public void Moods_ModelChange(Client player, int old_model)
        {
            if (player.hasSyncedData("PlayerMood")) API.triggerClientEventForAll("SetPlayerMood", player.handle, player.getSyncedData("PlayerMood"));
        }

        public void Moods_EventTrigger(Client player, string event_name, params object[] args)
        {
            switch (event_name)
            {
                case "RequestMoods":
                    player.triggerEvent("ReceiveMoods", API.toJson(PlayerMoods.Select(m => m.Name)));
                break;

                case "SetMood":
                    if (args.Length < 1) return;

                    int id = Convert.ToInt32(args[0]);
                    if (id < 0 || id >= PlayerMoods.Count) return;

                    if (id == 0) // reset
                    {
                        API.triggerClientEventForAll("ResetPlayerMood", player.handle);
                        player.resetSyncedData("PlayerMood");
                    }
                    else
                    {
                        API.triggerClientEventForAll("SetPlayerMood", player.handle, PlayerMoods[id].AnimName);
                        player.setSyncedData("PlayerMood", PlayerMoods[id].AnimName);
                    }

                    player.triggerEvent("SetCurrentMoodIndex", id);
                    player.sendChatMessage("Mood set to: ~y~" + PlayerMoods[id].Name + ".");
                break;
            }
        }
    }
}