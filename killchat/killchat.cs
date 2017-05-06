using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server.Elements;
using GrandTheftMultiplayer.Shared;

public class KillchatUtility : Script
{
	public KillchatUtility()
	{
		API.onPlayerDeath += onPlayerDeath;
	}

	public void onPlayerDeath(Client player, NetHandle reason, int weapon)
	{
		var killer = "";
	    API.consoleOutput("killed: " + player.name + " reason: " + reason.Value + " weapon: " + weapon);

	    if (!reason.IsNull)	    
	    {
	        var players = API.getAllPlayers();
	        for (var i = 0; i < players.Count; i++)
	        {
	            if (players[i].handle == reason) {
	                killer = players[i].name;
	                break;
	            }            
	        }        
	    }
	    
	    API.triggerClientEventForAll("addKillToKillchat", player.name, killer, weapon);
	}	    
}
