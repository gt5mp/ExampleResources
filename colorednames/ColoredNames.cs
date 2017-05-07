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

namespace colorednames
{
	public class ColoredNames : Script
	{
		private static Random Rnd = new Random();

		public event ExportedEvent onGotColoredName;

		public ColoredNames()
		{
			API.onResourceStart += API_onResourceStart;
			if (API.isResourceRunning("profiles")) {
				API.exported.profiles.onProfileLoaded += new ExportedEvent(Profiles_onProfileLoaded);
			} else {
				API.onPlayerConnected += API_onPlayerConnected;
			}
			API.onChatMessage += API_onChatMessage;
		}

		private void InitializePlayer(Client player)
		{
			if (!player.hasData("PROFILE_color")) {
				var hsl = new ColorHSL(Rnd.NextDouble(), 0.5, 0.5);
				var rgb = hsl.ToColorRGB();
				var color = rgb.red.ToString("X2") + rgb.green.ToString("X2") + rgb.blue.ToString("X2");
				player.setData("PROFILE_color", color);
			}

			onGotColoredName(player);
		}

		private void API_onResourceStart()
		{
			var players = API.getAllPlayers();
			foreach(var player in players) {
				InitializePlayer(player);
			}
		}

		private void Profiles_onProfileLoaded(object[] args)
		{
			InitializePlayer((Client)args[0]);
		}

		private void API_onPlayerConnected(Client player)
		{
			InitializePlayer(player);
		}

		private void API_onChatMessage(Client sender, string message, CancelEventArgs cancel)
		{
			string color = sender.getData("PROFILE_color");
			if (color == null) {
				color = "FFFFFF";
			}

			API.sendChatMessageToAll("~#" + color + "~", sender.name + "~w~: " + message);
			API.consoleOutput("{0}: {1}", sender.name, message);

			cancel.Cancel = true;
		}
	}

	public class ColorHSL
	{
		public double Hue = 0;
		public double Saturation = 0;
		public double Lightness = 0;

		public ColorHSL() { }
		public ColorHSL(double h, double s, double l)
		{
			Hue = h;
			Saturation = s;
			Lightness = l;
		}
		public ColorHSL(Color rgb)
		{
			double r = rgb.red / 255.0;
			double g = rgb.green / 255.0;
			double b = rgb.blue / 255.0;
			double v;
			double m;
			double vm;
			double r2, g2, b2;

			v = Math.Max(r, g);
			v = Math.Max(v, b);
			m = Math.Min(r, g);
			m = Math.Min(m, b);
			Lightness = (m + v) / 2.0;
			if (Lightness <= 0.0) {
				return;
			}

			vm = v - m;
			Saturation = vm;
			if (Saturation > 0.0) {
				Saturation /= (Lightness <= 0.5) ? (v + m) : (2.0 - v - m);
			} else {
				return;
			}

			r2 = (v - r) / vm;
			g2 = (v - g) / vm;
			b2 = (v - b) / vm;

			if (r == v) {
				Hue = (g == m ? 5.0 + b2 : 1.0 - g2);
			} else if (g == v) {
				Hue = (b == m ? 1.0 + r2 : 3.0 - b2);
			} else {
				Hue = (r == m ? 3.0 + g2 : 5.0 - r2);
			}

			Hue /= 6.0;
		}

		public Color ToColorRGB()
		{
			double v;
			double r, g, b;

			double h = Hue;
			double sl = Saturation;
			double l = Lightness;

			r = l; g = l; b = l;
			v = (l <= 0.5) ? (l * (1.0 + sl)) : (l + sl - l * sl);

			if (v > 0) {
				double m;
				double sv;
				int sextant;
				double fract, vsf, mid1, mid2;

				m = l + l - v;
				sv = (v - m) / v;
				h *= 5.0;
				sextant = (int)h;
				fract = h - sextant;
				vsf = v * sv * fract;
				mid1 = m + vsf;
				mid2 = v - vsf;

				switch (sextant) {
					case 0: r = v; g = mid1; b = m; break;
					case 1: r = mid2; g = v; b = m; break;
					case 2: r = m; g = v; b = mid1; break;
					case 3: r = m; g = mid2; b = v; break;
					case 4: r = mid1; g = m; b = v; break;
					case 5: r = v; g = m; b = mid2; break;
				}
			}

			return new Color(
				Convert.ToInt32(Math.Min(1.0f, r) * 255.0f),
				Convert.ToInt32(Math.Min(1.0f, g) * 255.0f),
				Convert.ToInt32(Math.Min(1.0f, b) * 255.0f)
			);
		}
	}
}
