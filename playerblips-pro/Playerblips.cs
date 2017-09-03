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

namespace playerblips_pro
{
	public class Playerblips : Script
	{
		public static readonly uint[] BlipColors =
		{
			// 0
			0xFFFFFF,

			// 1 - 23
			0x000000/*0xE03A3A*/, 0x000000/*0x78CD78*/, 0x000000/*0x65B9E7*/, 0xF0F0F0, 0x000000/*0xEFCA57*/, 0xC55758, 0xA175B4, 0xFF80C8, 0xF6A480, 0xB6968B, 0x91CFAA, 0x77ACB2, 0xD5D3E8, 0x94849E, 0x70C8C2, 0xD8C69E, 0xEC9359, 0x9ECDEB, 0xB6698D, 0x95927F, 0xAA7B67, 0xB4ABAC, 0xE993A0,
			// 24 - 46
			0xBFD863, 0x17815D, 0x80C7FF, 0xAF45E7, 0xCFAB17, 0x4F6AB1, 0x34A9BC, 0xBCA183, 0xCDE2FF, 0xF0F09A, 0xEE91A4, 0xF98E8E, 0xFDF0AA, 0xF1F1F1, 0x3776BD, 0x9F9F9F, 0x555555, 0xF29E9E, 0x6DB8D7, 0xAFEEAF, 0xFFA65F, 0xF0F0F0, 0xECF029,
			// 47 - 69
			0xFE9917, 0xF745A5, 0xE03A3A, 0x8A6DE3, 0xFF8B5C, 0x426D42, 0xB3DDF3, 0x396479, 0xA0A0A0, 0x847232, 0x64B9E6, 0x4C4276, 0xE03B3B, 0xF0CB58, 0xCD3E98, 0xCFCFCF, 0x286B9F, 0xD87A1B, 0x8E8393, 0xF0CB58, 0x65B9E7, 0x64B8E6, 0x78CD78,
			// 70 - 85
			0xEFCA57, 0xF0CB58, 0x000000, 0xEFCA57, 0x65B9E7, 0xE13B3B, 0x782424, 0x65B9E7, 0x396479, 0x000000/*0xE13B3B*/, 0x000000/*0x64B8E6*/, 0xF1A30B, 0xA4CBA9, 0xA753F1, 0x64B9E7, 0x000000
		};

		private DateTime m_tmLastSync = DateTime.Now;

		public Playerblips()
		{
			API.onResourceStart += API_onResourceStart;
			API.onResourceStop += API_onResourceStop;

			API.onPlayerConnected += API_onPlayerConnected;
			API.onPlayerDisconnected += API_onPlayerDisconnected;

			API.onClientEventTrigger += API_onClientEventTrigger;

			API.onUpdate += API_onUpdate;
			API.onPlayerEnterVehicle += API_onPlayerEnterVehicle;
			API.onPlayerExitVehicle += API_onPlayerExitVehicle;

			if (API.isResourceRunning("colorednames")) {
				API.exported.colorednames.onGotColoredName += new ExportedEvent(ColoredNames_onGotColoredName);
			}
		}

		private Vector3 ParseColor(string colorHex)
		{
			return new Vector3(
				int.Parse(colorHex.Substring(0, 2), System.Globalization.NumberStyles.HexNumber) / 255.0f,
				int.Parse(colorHex.Substring(2, 2), System.Globalization.NumberStyles.HexNumber) / 255.0f,
				int.Parse(colorHex.Substring(4, 2), System.Globalization.NumberStyles.HexNumber) / 255.0f
			);
		}

		private Vector3 ParseColor(uint color)
		{
			return new Vector3(
				((color & 0x00FF0000) >> 16) / 255.0f,
				((color & 0x0000FF00) >> 8) / 255.0f,
				(color & 0x000000FF) / 255.0f
			);
		}

		private int GetClosestBlipColor(Vector3 color)
		{
			float bestDiff = 255.0f * 3.0f;
			int ret = -1;

			for (var i = 0; i < BlipColors.Length; i++) {
				var col = ParseColor(BlipColors[i]);

				if (ret == -1) {
					ret = i;
					continue;
				}

				var diffR = Math.Abs(col.X - color.X);
				var diffG = Math.Abs(col.Y - color.Y);
				var diffB = Math.Abs(col.Z - color.Z);
				var diff = diffR + diffG + diffB;

				if (diff < bestDiff) {
					bestDiff = diff;
					ret = i;
				}
			}

			return ret;
		}

		private Blip GetBlipForPlayer(Client player)
		{
			return player.getData("playerblip");
		}

		private void AddBlipForPlayer(Client player)
		{
			RemoveBlipForPlayer(player);

			var newBlip = API.createBlip(player.position);
			newBlip.scale = 0.9f;

			player.setData("playerblip", newBlip);
			player.setData("playerblip_rotation", player.rotation.Z);
			player.setSyncedData("playerblip", newBlip.handle);

			if (API.isResourceRunning("colorednames")) {
				UpdateBlipColorForPlayer(player);
			}

			if (player.isInVehicle) {
				UpdateBlipForVehicle(player.vehicle.handle);
			}
		}

		private void RemoveBlipForPlayer(Client player)
		{
			var blip = GetBlipForPlayer(player);
			if (blip == null) {
				return;
			}

			blip.delete();
			player.resetData("playerblip");
			player.resetSyncedData("playerblip");
		}

		private void UpdateBlipColorForPlayer(Client player)
		{
			if (!API.isResourceRunning("colorednames")) {
				return;
			}

			var blip = GetBlipForPlayer(player);
			if (blip == null) {
				return;
			}
			string colorHex = player.getData("PROFILE_color");
			if (colorHex != null) {
				blip.color = GetClosestBlipColor(ParseColor(colorHex));
			}
		}

		private void UpdateBlipForVehicle(NetHandle vehicle)
		{
			if (vehicle.IsNull) {
				return;
			}

			var clients = API.getVehicleOccupants(vehicle);

			Client driver = null;
			foreach (var client in clients) {
				if (API.getPlayerVehicleSeat(client) == -1) {
					driver = client;
					break;
				}
			}

			if (driver == null) {
				// As a fallback, just make everyone visible
				foreach (var client in clients) {
					var blip = GetBlipForPlayer(client);
					// WORKAROUND: Disconnected players are still returned by getVehicleOccupants.
					// Bug reported here: https://forum.gtanet.work/index.php?threads/getvehicleoccupants-returns-disconnected-players.1473/
					if (blip == null) {
						continue;
					}
					blip.transparency = 255;
				}
				return;
			}

			var driverBlip = GetBlipForPlayer(driver);
			if (driverBlip == null) {
				// This maybe happens rarely?
				return;
			}

			// Show number on blip for driver
			if (clients.Length > 1) {
				API.sendNativeToAllPlayers(Hash.SHOW_NUMBER_ON_BLIP, driverBlip.handle, clients.Length);
			} else {
				API.sendNativeToAllPlayers(Hash.HIDE_NUMBER_ON_BLIP, driverBlip.handle);
			}

			// Hide blips for occupants
			foreach (var client in clients) {
				if (client == driver) {
					continue;
				}
				var blip = GetBlipForPlayer(client);
				blip.transparency = 0;
			}
		}

		private void API_onResourceStart()
		{
			var players = API.getAllPlayers();
			foreach (var player in players) {
				AddBlipForPlayer(player);
			}
		}

		private void API_onResourceStop()
		{
			var players = API.getAllPlayers();
			foreach (var player in players) {
				RemoveBlipForPlayer(player);
			}
		}

		private void API_onPlayerConnected(Client player)
		{
			AddBlipForPlayer(player);
		}

		private void API_onPlayerDisconnected(Client player, string reason)
		{
			RemoveBlipForPlayer(player);
		}

		private void API_onClientEventTrigger(Client sender, string eventName, params object[] arguments)
		{
			if (eventName == "playerblip_sprite") {
				var blip = GetBlipForPlayer(sender);
				if (blip == null) {
					return;
				}

				blip.sprite = (int)arguments[0];

				if (blip.sprite == 1) {
					blip.scale = 0.9f;
				} else {
					blip.scale = 1.1f;
				}

				UpdateBlipColorForPlayer(sender);
			}
		}

		private void API_onUpdate()
		{
			if ((DateTime.Now - m_tmLastSync).TotalMilliseconds >= 100) {
				var players = API.getAllPlayers();
				foreach (var player in players) {
					var blip = GetBlipForPlayer(player);
					if (blip == null) {
						continue;
					}

					if (blip.position.DistanceTo(player.position) >= 2.0f) {
						blip.position = player.position;
					}
					if (Math.Abs(player.rotation.Z - (float)player.getData("playerblip_rotation")) > 10.0f) {
						if (blip.sprite > 1) {
							API.sendNativeToAllPlayers(Hash.SET_BLIP_ROTATION, blip.handle, (int)player.rotation.Z);
						}
						player.setData("playerblip_rotation", player.rotation.Z);
					}
				}
			}
		}

		private void API_onPlayerEnterVehicle(Client player, NetHandle vehicle, int targetSeat)
		{
			UpdateBlipForVehicle(vehicle);
		}

		private void API_onPlayerExitVehicle(Client player, NetHandle vehicle, int fromSeat)
		{
			UpdateBlipForVehicle(vehicle);

			var blip = GetBlipForPlayer(player);
			blip.transparency = 255;
		}

		private void ColoredNames_onGotColoredName(dynamic[] parameters)
		{
			UpdateBlipColorForPlayer(parameters[0]);
		}
	}
}
