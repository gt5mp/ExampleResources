using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server.Elements;
using GrandTheftMultiplayer.Server.Managers;
using GrandTheftMultiplayer.Shared;

namespace RPGResource
{
    public class Debug : Script
    {
        [Command]
        public void givegun(Client sender, WeaponHash gun)
        {
            API.givePlayerWeapon(sender, gun, 500, true, true);
            
        }
    }
}