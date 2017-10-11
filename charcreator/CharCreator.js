var creatorMenus = [];

var creatorMainMenu = null;
var creatorParentsMenu = null;
var creatorFeaturesMenu = null;
var creatorAppearanceMenu = null;
var creatorHairMenu = null;

var genderItem = null;
var currentGender = 0;

var fathers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 42, 43, 44];
var mothers = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 45];
var fatherNames = ["Benjamin", "Daniel", "Joshua", "Noah", "Andrew", "Juan", "Alex", "Isaac", "Evan", "Ethan", "Vincent", "Angel", "Diego", "Adrian", "Gabriel", "Michael", "Santiago", "Kevin", "Louis", "Samuel", "Anthony", "Claude", "Niko", "John"];
var motherNames = ["Hannah", "Aubrey", "Jasmine", "Gisele", "Amelia", "Isabella", "Zoe", "Ava", "Camila", "Violet", "Sophia", "Evelyn", "Nicole", "Ashley", "Gracie", "Brianna", "Natalie", "Olivia", "Elizabeth", "Charlotte", "Emma", "Misty"];
var fatherItem = null;
var motherItem = null;
var similarityItem = null;
var skinSimilarityItem = null;
var angleItem = null;

var featureNames = ["Nose Width", "Nose Bottom Height", "Nose Tip Length", "Nose Bridge Depth", "Nose Tip Height", "Nose Broken", "Brow Height", "Brow Depth", "Cheekbone Height", "Cheekbone Width", "Cheek Depth", "Eye Size", "Lip Thickness", "Jaw Width", "Jaw Shape", "Chin Height", "Chin Depth", "Chin Width", "Chin Indent", "Neck Width"];
var creatorFeaturesItems = [];

var appearanceNames = ["Blemishes", "Facial Hair", "Eyebrows", "Ageing", "Makeup", "Blush", "Complexion", "Sun Damage", "Lipstick", "Moles & Freckles", "Chest Hair"];
var creatorAppearanceItems = [];
var creatorAppearanceOpacityItems = [];

var appearanceItemNames = [
    // blemishes
    ["None", "Measles", "Pimples", "Spots", "Break Out", "Blackheads", "Build Up", "Pustules", "Zits", "Full Acne", "Acne", "Cheek Rash", "Face Rash", "Picker", "Puberty", "Eyesore", "Chin Rash", "Two Face", "T Zone", "Greasy", "Marked", "Acne Scarring", "Full Acne Scarring", "Cold Sores", "Impetigo"],
    // facial hair
    ["None", "Light Stubble", "Balbo", "Circle Beard", "Goatee", "Chin", "Chin Fuzz", "Pencil Chin Strap", "Scruffy", "Musketeer", "Mustache", "Trimmed Beard", "Stubble", "Thin Circle Beard", "Horseshoe", "Pencil and 'Chops", "Chin Strap Beard", "Balbo and Sideburns", "Mutton Chops", "Scruffy Beard", "Curly", "Curly & Deep Stranger", "Handlebar", "Faustic", "Otto & Patch", "Otto & Full Stranger", "Light Franz", "The Hampstead", "The Ambrose", "Lincoln Curtain"],
    // eyebrows
    ["None", "Balanced", "Fashion", "Cleopatra", "Quizzical", "Femme", "Seductive", "Pinched", "Chola", "Triomphe", "Carefree", "Curvaceous", "Rodent", "Double Tram", "Thin", "Penciled", "Mother Plucker", "Straight and Narrow", "Natural", "Fuzzy", "Unkempt", "Caterpillar", "Regular", "Mediterranean", "Groomed", "Bushels", "Feathered", "Prickly", "Monobrow", "Winged", "Triple Tram", "Arched Tram", "Cutouts", "Fade Away", "Solo Tram"],
    // ageing
    ["None", "Crow's Feet", "First Signs", "Middle Aged", "Worry Lines", "Depression", "Distinguished", "Aged", "Weathered", "Wrinkled", "Sagging", "Tough Life", "Vintage", "Retired", "Junkie", "Geriatric"],
    // makeup
    ["None", "Smoky Black", "Bronze", "Soft Gray", "Retro Glam", "Natural Look", "Cat Eyes", "Chola", "Vamp", "Vinewood Glamour", "Bubblegum", "Aqua Dream", "Pin Up", "Purple Passion", "Smoky Cat Eye", "Smoldering Ruby", "Pop Princess"],
    // blush
    ["None", "Full", "Angled", "Round", "Horizontal", "High", "Sweetheart", "Eighties"],
    // complexion
    ["None", "Rosy Cheeks", "Stubble Rash", "Hot Flush", "Sunburn", "Bruised", "Alchoholic", "Patchy", "Totem", "Blood Vessels", "Damaged", "Pale", "Ghostly"],
    // sun damage
    ["None", "Uneven", "Sandpaper", "Patchy", "Rough", "Leathery", "Textured", "Coarse", "Rugged", "Creased", "Cracked", "Gritty"],
    // lipstick
    ["None", "Color Matte", "Color Gloss", "Lined Matte", "Lined Gloss", "Heavy Lined Matte", "Heavy Lined Gloss", "Lined Nude Matte", "Liner Nude Gloss", "Smudged", "Geisha"],
    // freckles
    ["None", "Cherub", "All Over", "Irregular", "Dot Dash", "Over the Bridge", "Baby Doll", "Pixie", "Sun Kissed", "Beauty Marks", "Line Up", "Modelesque", "Occasional", "Speckled", "Rain Drops", "Double Dip", "One Sided", "Pairs", "Growth"],
    // chest hair
    ["None", "Natural", "The Strip", "The Tree", "Hairy", "Grisly", "Ape", "Groomed Ape", "Bikini", "Lightning Bolt", "Reverse Lightning", "Love Heart", "Chestache", "Happy Face", "Skull", "Snail Trail", "Slug and Nips", "Hairy Arms"]
];

var hairIDList = [
    // male
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 72, 73],
    // female
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 76, 77]
];

var hairNameList = [
    // male
    ["None", "Buzzcut", "Faux Hawk", "Hipster", "Side Parting", "Shorter Cut", "Biker", "Ponytail", "Cornrows", "Slicked", "Short Brushed", "Spikey", "Caesar", "Chopped", "Dreads", "Long Hair", "Shaggy Curls", "Surfer Dude", "Short Side Part", "High Slicked Sides", "Long Slicked", "Hipster Youth", "Mullet", "Classic Cornrows", "Palm Cornrows", "Lightning Cornrows", "Whipped Cornrows", "Zig Zag Cornrows", "Snail Cornrows", "Hightop", "Loose Swept Back", "Undercut Swept Back", "Undercut Swept Side", "Spiked Mohawk", "Mod", "Layered Mod", "Flattop", "Military Buzzcut"],
    // female
    ["None", "Short", "Layered Bob", "Pigtails", "Ponytail", "Braided Mohawk", "Braids", "Bob", "Faux Hawk", "French Twist", "Long Bob", "Loose Tied", "Pixie", "Shaved Bangs", "Top Knot", "Wavy Bob", "Messy Bun", "Pin Up Girl", "Tight Bun", "Twisted Bob", "Flapper Bob", "Big Bangs", "Braided Top Knot", "Mullet", "Pinched Cornrows", "Leaf Cornrows", "Zig Zag Cornrows", "Pigtail Bangs", "Wave Braids", "Coil Braids", "Rolled Quiff", "Loose Swept Back", "Undercut Swept Back", "Undercut Swept Side", "Spiked Mohawk", "Bandana and Braid", "Layered Mod", "Skinbyrd", "Neat Bun", "Short Bob"]
];

var eyeColors = ["Green", "Emerald", "Light Blue", "Ocean Blue", "Light Brown", "Dark Brown", "Hazel", "Dark Gray", "Light Gray", "Pink", "Yellow", "Purple", "Blackout", "Shades of Gray", "Tequila Sunrise", "Atomic", "Warp", "ECola", "Space Ranger", "Ying Yang", "Bullseye", "Lizard", "Dragon", "Extra Terrestrial", "Goat", "Smiley", "Possessed", "Demon", "Infected", "Alien", "Undead", "Zombie"];
var hairItem = null;
var hairColorItem = null;
var hairHighlightItem = null;
var eyebrowColorItem = null;
var beardColorItem = null;
var eyeColorItem = null;
var blushColorItem = null;
var lipstickColorItem = null;
var chestHairColorItem = null;

var creatorCamera = null;
var baseAngle = 0.0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetParentsMenu(clear_idx) {
    clear_idx = clear_idx || false;

    fatherItem.Index = 0;
    motherItem.Index = 0;
    similarityItem.Index = (currentGender == 0) ? 100 : 0;
    skinSimilarityItem.Index = (currentGender == 0) ? 100 : 0;

    updateCharacterParents();
    if (clear_idx) creatorParentsMenu.RefreshIndex();
}

function resetFeaturesMenu(clear_idx) {
    clear_idx = clear_idx || false;

    for (var i = 0; i < featureNames.length; i++)
    {
        creatorFeaturesItems[i].Index = 100;
        updateCharacterFeature(i);
    }

    if (clear_idx) creatorFeaturesMenu.RefreshIndex();
}

function resetAppearanceMenu(clear_idx) {
    clear_idx = clear_idx || false;

    for (var i = 0; i < appearanceNames.length; i++)
    {
        creatorAppearanceItems[i].Index = 0;
        creatorAppearanceOpacityItems[i].Index = 100;
        updateCharacterAppearance(i);
    }

    if (clear_idx) creatorAppearanceMenu.RefreshIndex();
}

function resetHairColorsMenu(clear_idx) {
    clear_idx = clear_idx || false;

    hairItem.Index = 0;
    hairColorItem.Index = 0;
    hairHighlightItem.Index = 0;
    eyebrowColorItem.Index = 0;
    beardColorItem.Index = 0;
    eyeColorItem.Index = 0;
    blushColorItem.Index = 0;
    lipstickColorItem.Index = 0;
    chestHairColorItem.Index = 0;
    updateCharacterHairAndColors();

    if (clear_idx) creatorHairMenu.RefreshIndex();
}

function updateCharacterParents() {
    API.setPlayerHeadBlendData(
        API.getLocalPlayer(),
    
        mothers[ motherItem.Index ],
        fathers[ fatherItem.Index ],
        0,

        mothers[ motherItem.Index ],
        fathers[ fatherItem.Index ],
        0,

        similarityItem.Index * 0.01,
        skinSimilarityItem.Index * 0.01,
        0.0,

        false
    );
}

function updateCharacterFeature(index) {
    API.setPlayerFaceFeature(API.getLocalPlayer(), index, parseFloat( creatorFeaturesItems[index].IndexToItem( creatorFeaturesItems[index].Index ) ));
}

function updateCharacterAppearance(index) {
    var overlay_id = ((creatorAppearanceItems[index].Index == 0) ? 255 : creatorAppearanceItems[index].Index - 1);
    API.setPlayerHeadOverlay(API.getLocalPlayer(), index, overlay_id, creatorAppearanceOpacityItems[index].Index * 0.01);
}

function updateCharacterHairAndColors(idx) {
    // hair
    API.setPlayerClothes(API.getLocalPlayer(), 2, hairIDList[currentGender][hairItem.Index], 0);
    API.setPlayerHairColor(API.getLocalPlayer(), hairColorItem.Index, hairHighlightItem.Index);
    
    // appearance colors
    API.setPlayerHeadOverlayColor(API.getLocalPlayer(), 2, 1, eyebrowColorItem.Index, creatorAppearanceOpacityItems[2].Index * 0.01);
    API.setPlayerHeadOverlayColor(API.getLocalPlayer(), 1, 1, beardColorItem.Index, creatorAppearanceOpacityItems[1].Index * 0.01);
    API.setPlayerHeadOverlayColor(API.getLocalPlayer(), 5, 2, blushColorItem.Index, creatorAppearanceOpacityItems[5].Index * 0.01);
    API.setPlayerHeadOverlayColor(API.getLocalPlayer(), 8, 2, lipstickColorItem.Index, creatorAppearanceOpacityItems[8].Index * 0.01);
    API.setPlayerHeadOverlayColor(API.getLocalPlayer(), 10, 1, chestHairColorItem.Index, creatorAppearanceOpacityItems[10].Index * 0.01);
    
    // eye color
    API.setPlayerEyeColor(API.getLocalPlayer(), eyeColorItem.Index);
}

function fillHairMenu() {
    // HAIR & COLORS - Hair
    var hair_list = new List(String);
    for (var i = 0; i < hairIDList[currentGender].length; i++) hair_list.Add(hairNameList[currentGender][i]);

    hairItem = API.createListItem("Hair", "Your character's hair.", hair_list, 0);
    creatorHairMenu.AddItem(hairItem);

    // HAIR & COLORS - Hair Color
    var hair_color_list = new List(String);
    for (var i = 0; i < API.getNumHairColors(); i++) hair_color_list.Add(i.toString());

    hairColorItem = API.createListItem("Hair Color", "Your character's hair color.", hair_color_list, 0);
    creatorHairMenu.AddItem(hairColorItem);

    hairHighlightItem = API.createListItem("Hair Highlight Color", "Your character's hair highlight color.", hair_color_list, 0);
    creatorHairMenu.AddItem(hairHighlightItem);

    // HAIR & COLORS - Eyebrow Color
    eyebrowColorItem = API.createListItem("Eyebrow Color", "Your character's eyebrow color.", hair_color_list, 0);
    creatorHairMenu.AddItem(eyebrowColorItem);

    // HAIR & COLORS - Facial Hair Color
    beardColorItem = API.createListItem("Facial Hair Color", "Your character's facial hair color.", hair_color_list, 0);
    creatorHairMenu.AddItem(beardColorItem);

    // HAIR & COLORS - Eyes
    var eye_list = new List(String);
    for (var i = 0; i < 32; i++) eye_list.Add(eyeColors[i]);

    eyeColorItem = API.createListItem("Eyes", "Your character's eyes.", eye_list, 0);
    creatorHairMenu.AddItem(eyeColorItem);

    // HAIR & COLORS - Blush
    var blush_color_list = new List(String);
    for (var i = 0; i < 27; i++) blush_color_list.Add(i.toString());

    blushColorItem = API.createListItem("Blush Color", "Your character's blush color.", blush_color_list, 0);
    creatorHairMenu.AddItem(blushColorItem);

    // HAIR & COLORS - Lipstick
    var lipstick_color_list = new List(String);
    for (var i = 0; i < 32; i++) lipstick_color_list.Add(i.toString());

    lipstickColorItem = API.createListItem("Lipstick Color", "Your character's lipstick color.", blush_color_list, 0);
    creatorHairMenu.AddItem(lipstickColorItem);

    // HAIR & COLORS - Chest Hair
    chestHairColorItem = API.createListItem("Chest Hair Color", "Your character's chest hair color.", hair_color_list, 0);
    creatorHairMenu.AddItem(chestHairColorItem);

    // HAIR & COLORS - Extra
    var extra_item = API.createMenuItem("Randomize", "~r~Randomizes your hair & colors.");
    creatorHairMenu.AddItem(extra_item);

    extra_item = API.createMenuItem("Reset", "~r~Resets your hair & colors.");
    creatorHairMenu.AddItem(extra_item);
}

API.onResourceStart.connect(function() {
    creatorMainMenu = API.createMenu("Creator", " ", 0, 0, 6);
    creatorMainMenu.ResetKey(menuControl.Back);
    creatorMenus.push(creatorMainMenu);

    // GENDER
    var gender_list = new List(String);
    gender_list.Add("Male");
    gender_list.Add("Female");

    genderItem = API.createListItem("Gender", "~r~Changing gender will reset your customization.", gender_list, 0);
    creatorMainMenu.AddItem(genderItem);

    genderItem.OnListChanged.connect(function(item, new_index) {
        currentGender = new_index;

        API.triggerServerEvent("SetGender", new_index);

        API.setEntityRotation(API.getLocalPlayer(), new Vector3(0.0, 0.0, baseAngle));
        API.callNative("CLEAR_PED_TASKS_IMMEDIATELY", API.getLocalPlayer());

        angleItem.Index = 36;
        
        resetParentsMenu(true);
        resetFeaturesMenu(true);
        resetAppearanceMenu(true);

        creatorHairMenu.Clear();
        fillHairMenu();
        creatorHairMenu.RefreshIndex();
    });

    // PARENTS
    creatorParentsMenu = API.addSubMenu(creatorMainMenu, "Parents", "Your character's parents.", 0, 0, 6);
    creatorMenus.push(creatorParentsMenu);

    // PARENTS - Father
    var fathers_list = new List(String);
    for (var i = 0; i < fatherNames.length; i++) fathers_list.Add(fatherNames[i]);

    fatherItem = API.createListItem("Father", "Your character's father.", fathers_list, 0);
    creatorParentsMenu.AddItem(fatherItem);

    // PARENTS - Mother
    var mothers_list = new List(String);
    for (var i = 0; i < motherNames.length; i++) mothers_list.Add(motherNames[i]);

    motherItem = API.createListItem("Mother", "Your character's mother.", mothers_list, 0);
    creatorParentsMenu.AddItem(motherItem);

    // PARENTS - Similarity
    var similarity_list = new List(String);
    for (var i = 0; i <= 100; i++) similarity_list.Add(i + "%");

    similarityItem = API.createListItem("Resemblance", "Similarity to parents. (lower = feminine, higher = masculine)", similarity_list, 0);
    skinSimilarityItem = API.createListItem("Skin Tone", "Skin color similarity to parents. (lower = mother's side, higher = father's side)", similarity_list, 0);
    creatorParentsMenu.AddItem(similarityItem);
    creatorParentsMenu.AddItem(skinSimilarityItem);

    // PARENTS - Extra
    var extra_item = API.createMenuItem("Randomize", "~r~Randomizes your parents.");
    creatorParentsMenu.AddItem(extra_item);

    extra_item = API.createMenuItem("Reset", "~r~Resets your parents.");
    creatorParentsMenu.AddItem(extra_item);

    creatorParentsMenu.OnListChange.connect(function(menu, item, index) {
        updateCharacterParents();
    });

    creatorParentsMenu.OnItemSelect.connect(function(menu, item, index) {
        switch (item.Text)
        {
            case "Randomize":
                fatherItem.Index = getRandomInt(0, fathers.length - 1);
                motherItem.Index = getRandomInt(0, mothers.length - 1);
                similarityItem.Index = getRandomInt(0, 100);
                skinSimilarityItem.Index = getRandomInt(0, 100);

                updateCharacterParents();
            break;

            case "Reset":
                resetParentsMenu();
            break;
        }
    });

    // FACIAL FEATURES
    creatorFeaturesMenu = API.addSubMenu(creatorMainMenu, "Features", "Your character's facial features.", 0, 0, 6);
    creatorMenus.push(creatorFeaturesMenu);

    var feature_size_list = new List(String);
    for (var i = -1.0; i <= 1.01; i += 0.01) feature_size_list.Add(i.toFixed(2));

    var temp_feature_item = null;
    for (var i = 0; i < featureNames.length; i++)
    {
        temp_feature_item = API.createListItem(featureNames[i], "", feature_size_list, 100);
        creatorFeaturesMenu.AddItem(temp_feature_item);

        creatorFeaturesItems.push(temp_feature_item);
    }

    // FACIAL FEATURES - Extra
    extra_item = API.createMenuItem("Randomize", "~r~Randomizes your facial features.");
    creatorFeaturesMenu.AddItem(extra_item);

    extra_item = API.createMenuItem("Reset", "~r~Resets your facial features.");
    creatorFeaturesMenu.AddItem(extra_item);

    creatorFeaturesMenu.OnListChange.connect(function(menu, item, index) {
        updateCharacterFeature(menu.CurrentSelection);
    });

    creatorFeaturesMenu.OnItemSelect.connect(function(menu, item, index) {
        switch(item.Text)
        {
            case "Randomize":
                for (var i = 0; i < featureNames.length; i++)
                {
                    creatorFeaturesItems[i].Index = getRandomInt(0, 199);
                    updateCharacterFeature(i);
                }
            break;

            case "Reset":
                resetFeaturesMenu();
            break;
        }
    });

    // APPEARANCE
    creatorAppearanceMenu = API.addSubMenu(creatorMainMenu, "Appearance", "Your character's appearance.", 0, 0, 6);
    creatorMenus.push(creatorAppearanceMenu);

    var opacity_list = new List(String);
    for (var i = 0; i <= 100; i++) opacity_list.Add(i.toString() + "%");

    // APPEARANCE - Menu Items
    for (var i = 0; i < appearanceNames.length; i++)
    {
        // generate item list
        var items_list = new List(String);
        for (var j = 0; j <= API.getNumHeadOverlayValues(i); j++)
        {
            if (appearanceItemNames[i][j] === undefined) {
                items_list.Add(j.toString());
            } else {
                items_list.Add(appearanceItemNames[i][j]);
            }
        }

        // generate item
        var appearance_item = API.createListItem(appearanceNames[i], "", items_list, 0);
        creatorAppearanceMenu.AddItem(appearance_item);
        creatorAppearanceItems.push(appearance_item);

        // generate opacity item
        var appearance_opacity_item = API.createListItem(appearanceNames[i] + " Opacity", "", opacity_list, 100);
        creatorAppearanceMenu.AddItem(appearance_opacity_item);
        creatorAppearanceOpacityItems.push(appearance_opacity_item);
    }

    // APPEARANCE - Extra
    extra_item = API.createMenuItem("Randomize", "~r~Randomizes your apperance.");
    creatorAppearanceMenu.AddItem(extra_item);

    extra_item = API.createMenuItem("Reset", "~r~Resets your appearance.");
    creatorAppearanceMenu.AddItem(extra_item);

    creatorAppearanceMenu.OnListChange.connect(function(menu, item, index) {
        var overlayID = menu.CurrentSelection;

        if (menu.CurrentSelection % 2 == 0) {
            // feature
            overlayID = menu.CurrentSelection / 2;
            updateCharacterAppearance(overlayID);
        } else {
            // opacity
            var tempOverlayID = 0;

            switch (overlayID)
            {
                case 1:
                {
                    // blemishes
                    tempOverlayID = 0;
                    break;
                }

                case 3:
                {
                    // facial hair
                    tempOverlayID = 1;
                    break;
                }

                case 5:
                {
                    // eyebrows
                    tempOverlayID = 2;
                    break;
                }

                case 7:
                {
                    // ageing
                    tempOverlayID = 3;
                    break;
                }

                case 9:
                {
                    // makeup
                    tempOverlayID = 4;
                    break;
                }

                case 11:
                {
                    // blush
                    tempOverlayID = 5;
                    break;
                }

                case 13:
                {
                    // complexion
                    tempOverlayID = 6;
                    break;
                }

                case 15:
                {
                    // sun damage
                    tempOverlayID = 7;
                    break;
                }

                case 17:
                {
                    // lipstick
                    tempOverlayID = 8;
                    break;
                }

                case 19:
                {
                    // freckles
                    tempOverlayID = 9;
                    break;
                }

                case 21:
                {
                    // chest hair
                    tempOverlayID = 10;
                }
            }

            updateCharacterAppearance(tempOverlayID);
        }
    });

    creatorAppearanceMenu.OnItemSelect.connect(function(menu, item, index) {
        switch(item.Text)
        {
            case "Randomize":
                for (var i = 0; i < appearanceNames.length; i++)
                {
                    creatorAppearanceItems[i].Index = getRandomInt(0, API.getNumHeadOverlayValues(i) - 1);
                    creatorAppearanceOpacityItems[i].Index = getRandomInt(0, 100);
                    updateCharacterAppearance(i);
                }
            break;

            case "Reset":
                resetAppearanceMenu();
            break;
        }
    });

    // HAIR & COLORS
    creatorHairMenu = API.addSubMenu(creatorMainMenu, "Hair & Colors", "Your character's hair and hair colors.", 0, 0, 6);
    creatorMenus.push(creatorHairMenu);

    fillHairMenu();

    // ANGLE
    var angle_list = new List(String);
    for (var i = -180.0; i <= 180.0; i += 5) angle_list.Add(i.toFixed(1));

    angleItem = API.createListItem("Angle", "", angle_list, 36);
    creatorMainMenu.AddItem(angleItem);

    angleItem.OnListChanged.connect(function(item, new_index) {
        API.setEntityRotation(API.getLocalPlayer(), new Vector3(0.0, 0.0, baseAngle + parseFloat(item.IndexToItem(new_index))));
        API.callNative("CLEAR_PED_TASKS_IMMEDIATELY", API.getLocalPlayer());
    });

    // SAVE & CANCEL BUTTONS
    var save_button = API.createColoredItem("Save", "Save all changes and leave the character creator.", "#0d47a1", "#1976d2");
    creatorMainMenu.AddItem(save_button);

    save_button.Activated.connect(function(menu, item) {
        var feature_values = [];
        for (var i = 0; i < featureNames.length; i++) feature_values.push(parseFloat(creatorFeaturesItems[i].IndexToItem(creatorFeaturesItems[i].Index)));

        var appearance_values = [];
        for (var i = 0; i < appearanceNames.length; i++) appearance_values.push({ Value: ((creatorAppearanceItems[i].Index == 0) ? 255 : creatorAppearanceItems[i].Index - 1), Opacity: creatorAppearanceOpacityItems[i].Index * 0.01 });
    
        var hair_or_colors = [];
        hair_or_colors.push(hairIDList[currentGender][hairItem.Index]);
        hair_or_colors.push(hairColorItem.Index);
        hair_or_colors.push(hairHighlightItem.Index);
        hair_or_colors.push(eyebrowColorItem.Index);
        hair_or_colors.push(beardColorItem.Index);
        hair_or_colors.push(eyeColorItem.Index);
        hair_or_colors.push(blushColorItem.Index);
        hair_or_colors.push(lipstickColorItem.Index);
        hair_or_colors.push(chestHairColorItem.Index);
        
        API.triggerServerEvent("SaveCharacter", currentGender, fathers[ fatherItem.Index ], mothers[ motherItem.Index ], similarityItem.Index * 0.01, skinSimilarityItem.Index * 0.01, JSON.stringify(feature_values), JSON.stringify(appearance_values), JSON.stringify(hair_or_colors));
    });

    var cancel_button = API.createColoredItem("Cancel", "Discard all changes and leave the character creator.", "#d50000", "#e53935");
    creatorMainMenu.AddItem(cancel_button);

    cancel_button.Activated.connect(function(menu, item) {
        API.triggerServerEvent("LeaveCreator");
    });

    creatorHairMenu.OnListChange.connect(function(menu, item, index) {
        if (menu.CurrentSelection > 0) {
            switch (menu.CurrentSelection)
            {
                case 1:
                    API.setPlayerHairColor(API.getLocalPlayer(), index, hairHighlightItem.Index);
                break;

                case 2:
                    API.setPlayerHairColor(API.getLocalPlayer(), hairColorItem.Index, index);
                break;

                case 3:
                    API.setPlayerHeadOverlayColor(API.getLocalPlayer(), 2, 1, index, creatorAppearanceOpacityItems[2].Index * 0.01);
                break;

                case 4:
                    API.setPlayerHeadOverlayColor(API.getLocalPlayer(), 1, 1, index, creatorAppearanceOpacityItems[1].Index * 0.01);
                break;

                case 5:
                    API.setPlayerEyeColor(API.getLocalPlayer(), index);
                break;

                case 6:
                    API.setPlayerHeadOverlayColor(API.getLocalPlayer(), 5, 2, index, creatorAppearanceOpacityItems[5].Index * 0.01);
                break;

                case 7:
                    API.setPlayerHeadOverlayColor(API.getLocalPlayer(), 8, 2, index, creatorAppearanceOpacityItems[8].Index * 0.01);
                break;

                case 8:
                    API.setPlayerHeadOverlayColor(API.getLocalPlayer(), 10, 1, index, creatorAppearanceOpacityItems[10].Index * 0.01);
                break;
            }
        } else {
            API.setPlayerClothes(API.getLocalPlayer(), 2, hairIDList[currentGender][index], 0);
        }
    });

    creatorHairMenu.OnItemSelect.connect(function(menu, item, index) {
        switch(item.Text)
        {
            case "Randomize":
                var hair_colors = API.getNumHairColors() - 1;

                hairItem.Index = getRandomInt(0, hairIDList[currentGender].length);
                hairColorItem.Index = getRandomInt(0, hair_colors);
                hairHighlightItem.Index = getRandomInt(0, hair_colors);
                eyebrowColorItem.Index = getRandomInt(0, hair_colors);
                beardColorItem.Index = getRandomInt(0, hair_colors);
                eyeColorItem.Index = getRandomInt(0, 31);
                blushColorItem.Index = getRandomInt(0, 26);
                lipstickColorItem.Index = getRandomInt(0, 31);
                chestHairColorItem.Index = getRandomInt(0, hair_colors);

                updateCharacterHairAndColors();
            break;

            case "Reset":
                resetHairColorsMenu();
            break;
        }
    });

    for (var i = 0; i < creatorMenus.length; i++) creatorMenus[i].RefreshIndex();
});

API.onEntityStreamIn.connect(function(ent, entType) {
    if (entType == 6 && (API.getEntityModel(ent) == 1885233650 || API.getEntityModel(ent) == -1667301416) && API.hasEntitySyncedData(ent, "CustomCharacter"))
    {
        var data = JSON.parse(API.getEntitySyncedData(ent, "CustomCharacter"));
        API.setPlayerHeadBlendData(
            ent,

            data.Parents.Mother,
            data.Parents.Father,
            0,
        
            data.Parents.Mother,
            data.Parents.Father,
            0,
            
            data.Parents.Similarity,
            data.Parents.SkinSimilarity,
            0.0,

            false
        );
        
        for (var i = 0; i < data.Features.length; i++) API.setPlayerFaceFeature(ent, i, data.Features[i]);
        for (var i = 0; i < data.Appearance.length; i++) API.setPlayerHeadOverlay(ent, i, data.Appearance[i].Value, data.Appearance[i].Opacity);
        
        API.setPlayerHairColor(ent, data.Hair.Color, data.Hair.HighlightColor);

        API.setPlayerHeadOverlayColor(ent, 1, 1, data.BeardColor, data.Appearance[1].Opacity);
        API.setPlayerHeadOverlayColor(ent, 2, 1, data.EyebrowColor, data.Appearance[2].Opacity);
        API.setPlayerHeadOverlayColor(ent, 5, 2, data.BlushColor, data.Appearance[5].Opacity);
        API.setPlayerHeadOverlayColor(ent, 8, 2, data.LipstickColor, data.Appearance[8].Opacity);
        API.setPlayerHeadOverlayColor(ent, 10, 1, data.ChestHairColor, data.Appearance[10].Opacity);

        API.setPlayerEyeColor(ent, data.EyeColor);
    }
});

API.onServerEventTrigger.connect(function(event, args) {
    switch (event)
    {
        case "CreatorCamera":
            if (creatorCamera == null)
            {
                creatorCamera = API.createCamera(args[0], new Vector3(0, 0, 0));
                API.pointCameraAtPosition(creatorCamera, args[1]);

                API.setActiveCamera(creatorCamera);
                API.setCanOpenChat(false);
                API.setHudVisible(false);
                API.setChatVisible(false);

                baseAngle = args[2];
                creatorMainMenu.Visible = true;
            }
        break;

        case "DestroyCamera":
            API.setActiveCamera(null);
            API.setCanOpenChat(true);
            API.setHudVisible(true);
            API.setChatVisible(true);

            for (var i = 0; i < creatorMenus.length; i++) creatorMenus[i].Visible = false;
            creatorCamera = null;
        break;

        case "UpdateCreator":
            var data = JSON.parse(args[0]);

            currentGender = data.Gender;
            genderItem.Index = data.Gender;

            creatorHairMenu.Clear();
            fillHairMenu();

            fatherItem.Index = fathers.indexOf(data.Parents.Father);
            motherItem.Index = mothers.indexOf(data.Parents.Mother);
            similarityItem.Index = parseInt(data.Parents.Similarity * 100);
            skinSimilarityItem.Index = parseInt(data.Parents.SkinSimilarity * 100);

            // probably sucks lul
            var float_values = [];
            for (var i = -1.0; i <= 1.01; i += 0.01) float_values.push(i.toFixed(2));
            for (var i = 0; i < data.Features.length; i++) creatorFeaturesItems[i].Index = float_values.indexOf(data.Features[i].toFixed(2));

            float_values = [];
            for (var i = 0; i <= 100; i++) float_values.push((i * 0.01).toFixed(2));
            for (var i = 0; i < data.Appearance.length; i++)
            {
                creatorAppearanceItems[i].Index = (data.Appearance[i].Value == 255) ? 0 : data.Appearance[i].Value + 1;
                creatorAppearanceOpacityItems[i].Index = float_values.indexOf(data.Appearance[i].Opacity.toFixed(2));
            }

            hairItem.Index = hairIDList[currentGender].indexOf(data.Hair.Hair);
            hairColorItem.Index = data.Hair.Color;
            hairHighlightItem.Index = data.Hair.HighlightColor;
            eyebrowColorItem.Index = data.EyebrowColor;
            beardColorItem.Index = data.BeardColor;
            eyeColorItem.Index = data.EyeColor;
            blushColorItem.Index = data.BlushColor;
            lipstickColorItem.Index = data.LipstickColor;
            chestHairColorItem.Index = data.ChestHairColor;
        break;
    }
});

API.onResourceStop.connect(function() {
    API.setActiveCamera(null);
    API.setCanOpenChat(true);
    API.setHudVisible(true);
    API.setChatVisible(true);

    creatorCamera = null;
});

API.onUpdate.connect(function() {
    if (creatorCamera != null) API.disableAllControlsThisFrame();
});