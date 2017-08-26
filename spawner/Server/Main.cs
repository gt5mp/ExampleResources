using System;
using System.Collections.Generic;
using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Shared;
using GrandTheftMultiplayer.Server.Elements;
using GrandTheftMultiplayer.Server.Managers;
using GrandTheftMultiplayer.Shared.Math;

public class Spawner : Script
{
    private Dictionary<Client, NetHandle> _vehicleHistory = new Dictionary<Client, NetHandle>();
    
    public Spawner()
    {
        API.onClientEventTrigger += onClientEventTrigger;
    }

    public void onClientEventTrigger(Client sender, string name, object[] args)
    {
        if (name != "CREATE_VEHICLE") return;

        var model = int.Parse(args[0].ToString());

        if (!Enum.IsDefined(typeof(VehicleHash), model)) return;

        var rot = API.getEntityRotation(sender.handle);
        var veh = API.createVehicle((VehicleHash)model, sender.position, new Vector3(0, 0, rot.Z), 0, 0);

        if (_vehicleHistory.ContainsKey(sender) && _vehicleHistory[sender] != null && API.doesEntityExist(_vehicleHistory[sender]))
        {
            API.deleteEntity(_vehicleHistory[sender]);
        }

        _vehicleHistory[sender] = veh;

        API.setPlayerIntoVehicle(sender, veh, -1);     
    }
}
