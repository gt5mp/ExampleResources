using System;
using System.IO;
using System.Collections.Generic;
using GrandTheftMultiplayer.Server.API;
using GrandTheftMultiplayer.Server.Constant;
using GrandTheftMultiplayer.Server.Elements;
using GrandTheftMultiplayer.Server.Managers;
using GrandTheftMultiplayer.Shared;
using GrandTheftMultiplayer.Shared.Math;
using Newtonsoft.Json;

namespace CharCreator
{
    #region ParentData
    public class ParentData
    {
        public int Father;
        public int Mother;
        public float Similarity;
        public float SkinSimilarity;

        public ParentData(int father, int mother, float similarity, float skinsimilarity)
        {
            Father = father;
            Mother = mother;
            Similarity = similarity;
            SkinSimilarity = skinsimilarity;
        }
    }
    #endregion

    #region AppearanceItem
    public class AppearanceItem
    {
        public int Value;
        public float Opacity;

        public AppearanceItem(int value, float opacity)
        {
            Value = value;
            Opacity = opacity;
        }
    }
    #endregion

    #region HairData
    public class HairData
    {
        public int Hair;
        public int Color;
        public int HighlightColor;

        public HairData(int hair, int color, int highlightcolor)
        {
            Hair = hair;
            Color = color;
            HighlightColor = highlightcolor;
        }
    }
    #endregion

    #region PlayerCustomization Class
    public class PlayerCustomization
    {
        // Player
        public int Gender;

        // Parents
        public ParentData Parents;

        // Features
        public float[] Features = new float[20];

        // Appearance
        public AppearanceItem[] Appearance = new AppearanceItem[10];

        // Hair & Colors
        public HairData Hair;

        public int EyebrowColor;
        public int BeardColor;
        public int EyeColor;
        public int BlushColor;
        public int LipstickColor;
        public int ChestHairColor;

        public PlayerCustomization()
        {
            Gender = 0;
            Parents = new ParentData(0, 0, 1.0f, 1.0f);
            for (int i = 0; i < Features.Length; i++) Features[i] = 0f;
            for (int i = 0; i < Appearance.Length; i++) Appearance[i] = new AppearanceItem(255, 1.0f);
            Hair = new HairData(0, 0, 0);
        }
    }
    #endregion

    public class Main : Script
    {
        public string SAVE_DIRECTORY = "CustomCharacters";
        public Dictionary<NetHandle, PlayerCustomization> CustomPlayerData = new Dictionary<NetHandle, PlayerCustomization>();

        public Vector3 CreatorCharPos = new Vector3(402.8664, -996.4108, -99.00027);
        public Vector3 CreatorPos = new Vector3(402.8664, -997.5515, -98.5);
        public Vector3 CameraLookAtPos = new Vector3(402.8664, -996.4108, -98.5);
        public float FacingAngle = -185.0f;
        public int DimensionID = 1;

        public Main()
        {
            API.onResourceStart += CharCreator_Init;

            API.onPlayerFinishedDownload += CharCreator_PlayerJoin;
            API.onClientEventTrigger += CharCreator_EventTrigger;
            API.onPlayerDisconnected += CharCreator_PlayerLeave;

            API.onResourceStop += CharCreator_Exit;
        }

        #region Methods
        public void LoadCharacter(Client player)
        {
            if (CustomPlayerData.ContainsKey(player.handle)) return;
            string player_file = SAVE_DIRECTORY + Path.DirectorySeparatorChar + player.socialClubName + ".json";

            if (File.Exists(player_file))
            {
                CustomPlayerData.Add(player.handle, JsonConvert.DeserializeObject<PlayerCustomization>(File.ReadAllText(player_file)));
            }
            else
            {
                CustomPlayerData.Add(player.handle, new PlayerCustomization());
            }

            ApplyCharacter(player);
        }

        public void ApplyCharacter(Client player)
        {
            if (!CustomPlayerData.ContainsKey(player.handle)) return;

            player.setSkin((CustomPlayerData[player.handle].Gender == 0) ? PedHash.FreemodeMale01 : PedHash.FreemodeFemale01);
            player.setDefaultClothes();
            player.setClothes(2, CustomPlayerData[player.handle].Hair.Hair, 0);

            API.sendNativeToAllPlayers(
                Hash.SET_PED_HEAD_BLEND_DATA,
                player.handle,

                CustomPlayerData[player.handle].Parents.Mother,
                CustomPlayerData[player.handle].Parents.Father,
                0,

                CustomPlayerData[player.handle].Parents.Mother,
                CustomPlayerData[player.handle].Parents.Father,
                0,

                CustomPlayerData[player.handle].Parents.Similarity,
                CustomPlayerData[player.handle].Parents.SkinSimilarity,
                0,

                false
            );

            for (int i = 0; i < CustomPlayerData[player.handle].Features.Length; i++) API.sendNativeToAllPlayers(Hash._SET_PED_FACE_FEATURE, player.handle, i, CustomPlayerData[player.handle].Features[i]);
            for (int i = 0; i < CustomPlayerData[player.handle].Appearance.Length; i++) API.sendNativeToAllPlayers(Hash.SET_PED_HEAD_OVERLAY, player.handle, i, CustomPlayerData[player.handle].Appearance[i].Value, CustomPlayerData[player.handle].Appearance[i].Opacity);

            // apply colors
            API.sendNativeToAllPlayers(Hash._SET_PED_HAIR_COLOR, player.handle, CustomPlayerData[player.handle].Hair.Color, CustomPlayerData[player.handle].Hair.HighlightColor);
            API.sendNativeToAllPlayers(Hash._SET_PED_EYE_COLOR, player.handle, CustomPlayerData[player.handle].EyeColor);

            API.sendNativeToAllPlayers(Hash._SET_PED_HEAD_OVERLAY_COLOR, player.handle, 1, 1, CustomPlayerData[player.handle].BeardColor, 0);
            API.sendNativeToAllPlayers(Hash._SET_PED_HEAD_OVERLAY_COLOR, player.handle, 2, 1, CustomPlayerData[player.handle].EyebrowColor, 0);
            API.sendNativeToAllPlayers(Hash._SET_PED_HEAD_OVERLAY_COLOR, player.handle, 5, 2, CustomPlayerData[player.handle].BlushColor, 0);
            API.sendNativeToAllPlayers(Hash._SET_PED_HEAD_OVERLAY_COLOR, player.handle, 8, 2, CustomPlayerData[player.handle].LipstickColor, 0);
            API.sendNativeToAllPlayers(Hash._SET_PED_HEAD_OVERLAY_COLOR, player.handle, 10, 1, CustomPlayerData[player.handle].ChestHairColor, 0);

            player.setSyncedData("CustomCharacter", API.toJson(CustomPlayerData[player.handle]));
        }

        public void SaveCharacter(Client player)
        {
            if (!CustomPlayerData.ContainsKey(player.handle)) return;

            string player_file = SAVE_DIRECTORY + Path.DirectorySeparatorChar + player.socialClubName + ".json";
            File.WriteAllText(player_file, JsonConvert.SerializeObject(CustomPlayerData[player.handle], Formatting.Indented));
        }

        public void SendToCreator(Client player)
        {
            player.setData("Creator_PrevPos", player.position);

            player.dimension = DimensionID;
            player.rotation = new Vector3(0f, 0f, FacingAngle);
            player.position = CreatorCharPos;

            if (CustomPlayerData.ContainsKey(player.handle))
            {
                SetCreatorClothes(player, CustomPlayerData[player.handle].Gender);
                player.triggerEvent("UpdateCreator", API.toJson(CustomPlayerData[player.handle]));
            }
            else
            {
                CustomPlayerData.Add(player.handle, new PlayerCustomization());
                SetDefaultFeatures(player, 0);
            }

            player.triggerEvent("CreatorCamera", CreatorPos, CameraLookAtPos, FacingAngle);
            DimensionID++;
        }

        public void SendBackToWorld(Client player)
        {
            player.dimension = 0;
            player.position = (Vector3)player.getData("Creator_PrevPos");

            player.triggerEvent("DestroyCamera");
            player.resetData("Creator_PrevPos");
        }

        public void SetDefaultFeatures(Client player, int gender, bool reset = false)
        {
            if (reset)
            {
                CustomPlayerData[player.handle] = new PlayerCustomization();
                CustomPlayerData[player.handle].Gender = gender;

                CustomPlayerData[player.handle].Parents.Father = 0;
                CustomPlayerData[player.handle].Parents.Mother = 21;
                CustomPlayerData[player.handle].Parents.Similarity = (gender == 0) ? 1.0f : 0.0f;
                CustomPlayerData[player.handle].Parents.SkinSimilarity = (gender == 0) ? 1.0f : 0.0f;
            }

            // will apply the resetted data
            ApplyCharacter(player);

            // clothes
            SetCreatorClothes(player, gender);
        }

        public void SetCreatorClothes(Client player, int gender)
        {
            if (!CustomPlayerData.ContainsKey(player.handle)) return;

            // clothes
            player.setDefaultClothes();
            for (int i = 0; i < 10; i++) player.clearAccessory(i);

            if (gender == 0)
            {
                player.setClothes(3, 15, 0);
                player.setClothes(4, 21, 0);
                player.setClothes(6, 34, 0);
                player.setClothes(8, 15, 0);
                player.setClothes(11, 15, 0);
            }
            else
            {
                player.setClothes(3, 15, 0);
                player.setClothes(4, 10, 0);
                player.setClothes(6, 35, 0);
                player.setClothes(8, 15, 0);
                player.setClothes(11, 15, 0);
            }

            player.setClothes(2, CustomPlayerData[player.handle].Hair.Hair, 0);
        }
        #endregion

        #region Events
        public void CharCreator_Init()
        {
            SAVE_DIRECTORY = API.getResourceFolder() + Path.DirectorySeparatorChar + SAVE_DIRECTORY;
            if (!Directory.Exists(SAVE_DIRECTORY)) Directory.CreateDirectory(SAVE_DIRECTORY);
        }

        public void CharCreator_PlayerJoin(Client player)
        {
            LoadCharacter(player);
        }

        public void CharCreator_EventTrigger(Client player, string event_name, params object[] args)
        {
            switch (event_name)
            {
                case "SetGender":
                {
                    if (args.Length < 1 || !CustomPlayerData.ContainsKey(player.handle)) return;

                    int gender = Convert.ToInt32(args[0]);
                    player.setSkin((gender == 0) ? PedHash.FreemodeMale01 : PedHash.FreemodeFemale01);
                    player.setData("ChangedGender", true);
                    SetDefaultFeatures(player, gender, true);
                    break;
                }

                case "SaveCharacter":
                {
                    if (args.Length < 8 || !CustomPlayerData.ContainsKey(player.handle)) return;

                    player.setDefaultClothes();

                    // gender
                    CustomPlayerData[player.handle].Gender = Convert.ToInt32(args[0]);

                    // parents
                    CustomPlayerData[player.handle].Parents.Father = Convert.ToInt32(args[1]);
                    CustomPlayerData[player.handle].Parents.Mother = Convert.ToInt32(args[2]);
                    CustomPlayerData[player.handle].Parents.Similarity = (float)Convert.ToDouble(args[3]);
                    CustomPlayerData[player.handle].Parents.SkinSimilarity = (float)Convert.ToDouble(args[4]);

                    // features
                    float[] feature_data = JsonConvert.DeserializeObject<float[]>(args[5].ToString());
                    CustomPlayerData[player.handle].Features = feature_data;

                    // appearance
                    AppearanceItem[] appearance_data = JsonConvert.DeserializeObject<AppearanceItem[]>(args[6].ToString());
                    CustomPlayerData[player.handle].Appearance = appearance_data;

                    // hair & colors
                    int[] hair_and_color_data = JsonConvert.DeserializeObject<int[]>(args[7].ToString());
                    for (int i = 0; i < hair_and_color_data.Length; i++)
                    {
                        switch (i)
                        {
                            // Hair
                            case 0:
                            {
                                CustomPlayerData[player.handle].Hair.Hair = hair_and_color_data[i];
                                break;
                            }

                            // Hair Color
                            case 1:
                            {
                                CustomPlayerData[player.handle].Hair.Color = hair_and_color_data[i];
                                break;
                            }

                            // Hair Highlight Color
                            case 2:
                            {
                                CustomPlayerData[player.handle].Hair.HighlightColor = hair_and_color_data[i];
                                break;
                            }

                            // Eyebrow Color
                            case 3:
                            {
                                CustomPlayerData[player.handle].EyebrowColor = hair_and_color_data[i];
                                break;
                            }

                            // Beard Color
                            case 4:
                            {
                                CustomPlayerData[player.handle].BeardColor = hair_and_color_data[i];
                                break;
                            }

                            // Eye Color
                            case 5:
                            {
                                CustomPlayerData[player.handle].EyeColor = hair_and_color_data[i];
                                break;
                            }

                            // Blush Color
                            case 6:
                            {
                                CustomPlayerData[player.handle].BlushColor = hair_and_color_data[i];
                                break;
                            }

                            // Lipstick Color
                            case 7:
                            {
                                CustomPlayerData[player.handle].LipstickColor = hair_and_color_data[i];
                                break;
                            }

                            // Chest Hair Color
                            case 8:
                            {
                                CustomPlayerData[player.handle].ChestHairColor = hair_and_color_data[i];
                                break;
                            }
                        }
                    }

                    if (player.hasData("ChangedGender")) player.resetData("ChangedGender");
                    ApplyCharacter(player);
                    SaveCharacter(player);
                    SendBackToWorld(player);
                    break;
                }

                case "LeaveCreator":
                {
                    if (!CustomPlayerData.ContainsKey(player.handle)) return;

                    // revert back to last save data
                    if (player.hasData("ChangedGender"))
                    {
                        string player_file = SAVE_DIRECTORY + Path.DirectorySeparatorChar + player.socialClubName + ".json";
                        if (File.Exists(player_file)) CustomPlayerData[player.handle] = JsonConvert.DeserializeObject<PlayerCustomization>(File.ReadAllText(player_file));
                        player.resetData("ChangedGender");
                    }

                    ApplyCharacter(player);

                    // bye
                    SendBackToWorld(player);
                    break;
                }
            }
        }

        public void CharCreator_PlayerLeave(Client player, string reason)
        {
            if (CustomPlayerData.ContainsKey(player.handle)) CustomPlayerData.Remove(player.handle);
        }

        public void CharCreator_Exit()
        {
            foreach (Client player in API.getAllPlayers())
            {
                if (player.hasData("Creator_PrevPos"))
                {
                    player.dimension = 0;
                    player.position = (Vector3)player.getData("Creator_PrevPos");

                    player.triggerEvent("DestroyCamera");
                    player.resetData("Creator_PrevPos");
                }
            }

            CustomPlayerData.Clear();
        }
        #endregion

        #region Commands
        [Command("creator")]
        public void CMD_EnableCreator(Client player)
        {
            if (!(player.model == (int)PedHash.FreemodeMale01 || player.model == (int)PedHash.FreemodeFemale01))
            {
                player.sendChatMessage("You need to have a freemode character skin.");
                return;
            }

            SendToCreator(player);
        }
        #endregion
    }
}