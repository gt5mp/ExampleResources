using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server;
using GrandTheftMultiplayer.Server.Elements;
using GrandTheftMultiplayer.Shared;
using GrandTheftMultiplayer.Server.Constant;
using GrandTheftMultiplayer.Shared.Math;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace playerlist_pro
{
	public class Playerlist : Script
	{
		private DateTime m_lastTick = DateTime.Now;

		public Playerlist()
		{
			if (API.isResourceRunning("colorednames")) {
				API.exported.colorednames.onGotColoredName += new ExportedEvent(ColoredNames_onGotColoredName);
			} else {
				API.onPlayerConnected += API_onPlayerConnected;
			}
			API.onPlayerDisconnected += API_onPlayerDisconnected;
			API.onPlayerFinishedDownload += API_onPlayerFinishedDownload;

			API.onClientEventTrigger += API_onClientEventTrigger;

			API.onUpdate += API_onUpdate;
		}

		private void API_onPlayerConnected(Client player)
		{
			API.triggerClientEventForAll("playerlist_join", player.socialClubName, player.name, ColorForPlayer(player));
		}

		private void API_onPlayerDisconnected(Client player, string reason)
		{
			API.triggerClientEventForAll("playerlist_leave", player.socialClubName);
		}

		private string ColorForPlayer(Client player)
		{
			if (!API.isResourceRunning("colorednames")) {
				return "FFFFFF";
			}
			string ret = player.getData("PROFILE_color");
			if (ret == null) {
				return "FFFFFF";
			}
			return ret;
		}

		private void API_onPlayerFinishedDownload(Client player)
		{
			var players = API.getAllPlayers();
			var list = new List<string>();
			foreach (var ply in players) {
				var dic = new Dictionary<string, object>();
				dic["socialClubName"] = ply.socialClubName;
				dic["name"] = ply.name;
				dic["ping"] = ply.ping;
				dic["color"] = ColorForPlayer(ply);
				list.Add(API.toJson(dic));
			}

			API.triggerClientEvent(player, "playerlist", list);
		}

		private void ColoredNames_onGotColoredName(object[] args)
		{
			var client = (Client)args[0];
			API.triggerClientEventForAll("playerlist_join", client.socialClubName, client.name, ColorForPlayer(client));
		}

		private void API_onClientEventTrigger(Client sender, string eventName, params object[] arguments)
		{
			if (eventName == "playerlist_pings") {
				var players = API.getAllPlayers();
				var list = new List<string>();
				foreach (var ply in players) {
					var dic = new Dictionary<string, object>();
					dic["socialClubName"] = ply.socialClubName;
					dic["ping"] = ply.ping;
					list.Add(API.toJson(dic));
				}
				API.triggerClientEvent(sender, "playerlist_pings", list);
			}
		}

		private void API_onUpdate()
		{
			if ((DateTime.Now - m_lastTick).TotalMilliseconds >= 1000) {
				m_lastTick = DateTime.Now;

				var changedNames = new List<string>();
				var players = API.getAllPlayers();
				foreach (var player in players) {
					string lastName = player.getData("playerlist_lastname");

					if (lastName == null) {
						player.setData("playerlist_lastname", player.name);
						continue;
					}

					if (lastName != player.name) {
						player.setData("playerlist_lastname", player.name);

						var dic = new Dictionary<string, object>();
						dic["socialClubName"] = player.socialClubName;
						dic["newName"] = player.name;
						changedNames.Add(API.toJson(dic));
					}
				}

				if (changedNames.Count > 0) {
					API.triggerClientEventForAll("playerlist_changednames", changedNames);
				}
			}
		}
	}
}
