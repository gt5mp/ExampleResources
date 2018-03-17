using System;
using System.Collections.Generic;
using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server.Elements;
using GrandTheftMultiplayer.Shared;
using GrandTheftMultiplayer.Shared.Math;

namespace ArmedBody
{
    public enum WeaponAttachmentType
    {
        RightLeg = 0,
        LeftLeg,
        RightBack,
        LeftBack
    }

    public class WeaponAttachmentInfo
    {
        public string Model;
        public WeaponAttachmentType Type;

        public WeaponAttachmentInfo(string model, WeaponAttachmentType type)
        {
            Model = model;
            Type = type;
        }
    }

    public class ArmedBody : Script
    {
        string[] WeaponKeys = { "WEAPON_OBJ_PISTOL", "WEAPON_OBJ_SMG", "WEAPON_OBJ_BACK_RIGHT", "WEAPON_OBJ_BACK_LEFT" };

        Dictionary<WeaponHash, WeaponAttachmentInfo> WeaponData = new Dictionary<WeaponHash, WeaponAttachmentInfo>
        {
            // pistols
            { WeaponHash.Pistol, new WeaponAttachmentInfo("w_pi_pistol", WeaponAttachmentType.RightLeg) },
            { WeaponHash.CombatPistol, new WeaponAttachmentInfo("w_pi_combatpistol", WeaponAttachmentType.RightLeg) },
            { WeaponHash.Pistol50, new WeaponAttachmentInfo("w_pi_pistol50", WeaponAttachmentType.RightLeg) },
            { WeaponHash.SNSPistol, new WeaponAttachmentInfo("w_pi_sns_pistol", WeaponAttachmentType.RightLeg) },
            { WeaponHash.HeavyPistol, new WeaponAttachmentInfo("w_pi_heavypistol", WeaponAttachmentType.RightLeg) },
            { WeaponHash.VintagePistol, new WeaponAttachmentInfo("w_pi_vintage_pistol", WeaponAttachmentType.RightLeg) },
            { WeaponHash.MarksmanPistol, new WeaponAttachmentInfo("w_pi_singleshot", WeaponAttachmentType.RightLeg) },
            { WeaponHash.Revolver, new WeaponAttachmentInfo("w_pi_revolver", WeaponAttachmentType.RightLeg) },
            { WeaponHash.APPistol, new WeaponAttachmentInfo("w_pi_appistol", WeaponAttachmentType.RightLeg) },
            { WeaponHash.StunGun, new WeaponAttachmentInfo("w_pi_stungun", WeaponAttachmentType.RightLeg) },
            { WeaponHash.FlareGun, new WeaponAttachmentInfo("w_pi_flaregun", WeaponAttachmentType.RightLeg) },

            // smgs
            { WeaponHash.MicroSMG, new WeaponAttachmentInfo("w_sb_microsmg", WeaponAttachmentType.LeftLeg) },
            { WeaponHash.MachinePistol, new WeaponAttachmentInfo("w_sb_compactsmg", WeaponAttachmentType.LeftLeg) },
            { WeaponHash.MiniSMG, new WeaponAttachmentInfo("w_sb_minismg", WeaponAttachmentType.LeftLeg) },

            // big smgs
            { WeaponHash.SMG, new WeaponAttachmentInfo("w_sb_smg", WeaponAttachmentType.RightBack) },
            { WeaponHash.AssaultSMG, new WeaponAttachmentInfo("w_sb_assaultsmg", WeaponAttachmentType.RightBack) },
            { WeaponHash.CombatPDW, new WeaponAttachmentInfo("w_sb_pdw", WeaponAttachmentType.RightBack) },
            { WeaponHash.Gusenberg, new WeaponAttachmentInfo("w_sb_gusenberg", WeaponAttachmentType.RightBack) },

            // shotguns
            { WeaponHash.PumpShotgun, new WeaponAttachmentInfo("w_sg_pumpshotgun", WeaponAttachmentType.LeftBack) },
            { WeaponHash.SawnoffShotgun, new WeaponAttachmentInfo("w_sg_sawnoff", WeaponAttachmentType.LeftBack) },
            { WeaponHash.BullpupShotgun, new WeaponAttachmentInfo("w_sg_bullpupshotgun", WeaponAttachmentType.LeftBack) },
            { WeaponHash.AssaultShotgun, new WeaponAttachmentInfo("w_sg_assaultshotgun", WeaponAttachmentType.LeftBack) },
            { WeaponHash.HeavyShotgun, new WeaponAttachmentInfo("w_sg_heavyshotgun", WeaponAttachmentType.LeftBack) },
            { WeaponHash.DoubleBarrelShotgun, new WeaponAttachmentInfo("w_sg_doublebarrel", WeaponAttachmentType.LeftBack) },

            // assault rifles
            { WeaponHash.AssaultRifle, new WeaponAttachmentInfo("w_ar_assaultrifle", WeaponAttachmentType.RightBack) },
            { WeaponHash.CarbineRifle, new WeaponAttachmentInfo("w_ar_carbinerifle", WeaponAttachmentType.RightBack) },
            { WeaponHash.AdvancedRifle, new WeaponAttachmentInfo("w_ar_advancedrifle", WeaponAttachmentType.RightBack) },
            { WeaponHash.SpecialCarbine, new WeaponAttachmentInfo("w_ar_specialcarbine", WeaponAttachmentType.RightBack) },
            { WeaponHash.BullpupRifle, new WeaponAttachmentInfo("w_ar_bullpuprifle", WeaponAttachmentType.RightBack) },
            { WeaponHash.CompactRifle, new WeaponAttachmentInfo("w_ar_assaultrifle_smg", WeaponAttachmentType.RightBack) },

            // sniper rifles
            { WeaponHash.MarksmanRifle, new WeaponAttachmentInfo("w_sr_marksmanrifle", WeaponAttachmentType.RightBack) },
            { WeaponHash.SniperRifle, new WeaponAttachmentInfo("w_sr_sniperrifle", WeaponAttachmentType.RightBack) },
            { WeaponHash.HeavySniper, new WeaponAttachmentInfo("w_sr_heavysniper", WeaponAttachmentType.RightBack) },

            // lmgs
            { WeaponHash.MG, new WeaponAttachmentInfo("w_mg_mg", WeaponAttachmentType.LeftBack) },
            { WeaponHash.CombatMG, new WeaponAttachmentInfo("w_mg_combatmg", WeaponAttachmentType.LeftBack) }
        };

        public ArmedBody()
        {
            API.onPlayerWeaponSwitch += ArmedBody_WeaponChange;
            API.onPlayerDeath += ArmedBody_PlayerDeath;
            API.onPlayerDisconnected += ArmedBody_PlayerLeave;
            API.onResourceStop += ArmedBody_Exit;
        }

        #region Methods
        public void CreateWeaponProp(Client player, WeaponHash weapon)
        {
            if (!WeaponData.ContainsKey(weapon)) return;
            RemoveWeaponProp(player, WeaponData[weapon].Type);

            // make sure player has the weapon
            if (Array.IndexOf(player.weapons, weapon) == -1) return;

            string bone = "";
            Vector3 offset = new Vector3(0.0, 0.0, 0.0);
            Vector3 rotation = new Vector3(0.0, 0.0, 0.0);

            switch (WeaponData[weapon].Type)
            {
                case WeaponAttachmentType.RightLeg:
                    bone = "SKEL_R_Thigh";
                    offset = new Vector3(0.02, 0.06, 0.1);
                    rotation = new Vector3(-100.0, 0.0, 0.0);
                break;

                case WeaponAttachmentType.LeftLeg:
                    bone = "SKEL_L_Thigh";
                    offset = new Vector3(0.08, 0.03, -0.1);
                    rotation = new Vector3(-80.77, 0.0, 0.0);
                break;

                case WeaponAttachmentType.RightBack:
                    bone = "SKEL_Spine3";
                    offset = new Vector3(-0.1, -0.15, -0.13); 
                    rotation = new Vector3(0.0, 0.0, 3.5); 
                break;

                case WeaponAttachmentType.LeftBack:
                    bone = "SKEL_Spine3";
                    offset = new Vector3(-0.1, -0.15, 0.11);
                    rotation = new Vector3(-180.0, 0.0, 0.0);
                break;
            }

            GrandTheftMultiplayer.Server.Elements.Object temp_handle = API.createObject(API.getHashKey(WeaponData[weapon].Model), player.position, new Vector3());
            temp_handle.attachTo(player.handle, bone, offset, rotation);

            player.setData(WeaponKeys[ (int)WeaponData[weapon].Type ], temp_handle);
        }

        public void RemoveWeaponProp(Client player, WeaponAttachmentType type)
        {
            int type_int = (int)type;
            if (!player.hasData(WeaponKeys[type_int])) return;

            GrandTheftMultiplayer.Server.Elements.Object obj = player.getData(WeaponKeys[type_int]);
            obj.delete();

            player.resetData(WeaponKeys[type_int]);
        }

        public void RemoveWeaponProps(Client player)
        {
            foreach (string key in WeaponKeys)
            {
                if (!player.hasData(key)) continue;

                GrandTheftMultiplayer.Server.Elements.Object obj = player.getData(key);
                obj.delete();

                player.resetData(key);
            }
        }
        #endregion

        #region Exported Methods
        public void RemovePlayerWeapon(Client player, WeaponHash weapon)
        {
            if (WeaponData.ContainsKey(weapon))
            {
                string key = WeaponKeys[ (int)WeaponData[weapon].Type ];

                if (player.hasData(key))
                {
                    GrandTheftMultiplayer.Server.Elements.Object obj = player.getData(key);

                    if (obj.model == API.getHashKey(WeaponData[weapon].Model))
                    {
                        obj.delete();
                        player.resetData(key);
                    }
                }
            }

            player.removeWeapon(weapon);
        }

        public void RemoveAllPlayerWeapons(Client player)
        {
            RemoveWeaponProps(player);
            player.removeAllWeapons();
        }
        #endregion

        #region Events
        public void ArmedBody_WeaponChange(Client player, WeaponHash old_weapon)
        {
            if (WeaponData.ContainsKey(old_weapon)) CreateWeaponProp(player, old_weapon);

            WeaponHash current_weapon = player.currentWeapon;
            if (WeaponData.ContainsKey(current_weapon))
            {
                int type = (int)WeaponData[current_weapon].Type;

                if (player.hasData(WeaponKeys[type]))
                {
                    GrandTheftMultiplayer.Server.Elements.Object obj = player.getData(WeaponKeys[type]);
                    
                    if (obj.model == API.getHashKey(WeaponData[current_weapon].Model))
                    {
                        obj.delete();
                        player.resetData(WeaponKeys[type]);
                    }
                }
            }
        }

        public void ArmedBody_PlayerDeath(Client player, NetHandle killer, int weapon)
        {
            RemoveWeaponProps(player);
        }

        public void ArmedBody_PlayerLeave(Client player, string reason)
        {
            RemoveWeaponProps(player);
        }

        public void ArmedBody_Exit()
        {
            foreach (Client player in API.getAllPlayers()) RemoveWeaponProps(player);
        }
        #endregion
    }
}