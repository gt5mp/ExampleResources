using System;
using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server.Constant;
using GrandTheftMultiplayer.Server.Elements;

namespace VehicleIndicators
{
    public class VehicleIndicators : Script
    {
        public VehicleIndicators()
        {
            API.onClientEventTrigger += Indicators_EventTrigger;
        }

        public void Indicators_EventTrigger(Client player, string eventName, params object[] args)
        {
            if (eventName == "UpdateIndicator")
            {
                if (!player.isInVehicle || player.vehicleSeat != -1) return;
                int indicator = Convert.ToInt32(args[0]);
                string indicatorName = string.Format("Indicator_{0}", indicator);
                bool indicatorStatus = false;

                if (player.vehicle.hasSyncedData(indicatorName))
                {
                    indicatorStatus = player.vehicle.getSyncedData(indicatorName);
                    indicatorStatus = !indicatorStatus;
                }
                else
                {
                    indicatorStatus = true;
                }

                player.vehicle.setSyncedData(indicatorName, indicatorStatus);
                player.triggerEvent("IndicatorSubtitle", indicator, indicatorStatus);
                API.sendNativeToAllPlayers(Hash.SET_VEHICLE_INDICATOR_LIGHTS, player.vehicle.handle, indicator, indicatorStatus);
            }
        }
    }
}