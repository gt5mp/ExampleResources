﻿var vehicleClassNames = [
    "Compacts",
    "Sedans",
    "SUVs",
    "Coupes",
    "Muscle",
    "Sports Classics",
    "Sports",
    "Super",
    "Motorcylces",
    "Off-road",
    "Industrial",
    "Utility",
    "Vans",
    "Cycles",
    "Boats",
    "Helicopters",
    "Planes",
    "Service",
    "Emergency",
    "Military",
    "Commercial",
    "Trains"
];

var vehicleHashes = [
    11251904,
    16646064,
    37348240,
    48339065,
    55628203,
    65402552,
    75131841,
    758895617,
    80636076,
    92612664,
    108773431,
    117401876,
    121658888,
    142944341,
    165154707,
    184361638,
    223258115,
    231083307,
    234062309,
    237764926,
    240201337,
    276773164,
    290013743,
    296357396,
    301427732,
    321739290,
    330661258,
    338562499,
    349315417,
    349605904,
    353883353,
    356391690,
    368211810,
    384071873,
    390902130,
    400514754,
    408192225,
    410882957,
    418536135,
    437538602,
    444171386,
    444583674,
    448402357,
    456714581,
    464687292,
    469291905,
    470404958,
    475220373,
    486987393,
    499169875,
    509498602,
    516990260,
    523724515,
    524108981,
    525509695,
    534258863,
    544021352,
    569305213,
    586013744,
    621481054,
    627094268,
    630371791,
    633712403,
    634118882,
    640818791,
    642617954,
    666166960,
    699456151,
    704435172,
    710198397,
    712162987,
    723973206,
    728614474,
    729783779,
    734217681,
    736902334,
    741586030,
    743478836,
    744705981,
    745926877,
    767087018,
    771711535,
    782665360,
    784565758,
    788045382,
    788747387,
    833469436,
    837858166,
    841808271,
    850565707,
    850991848,
    861409633,
    867467158,
    873639469,
    884422927,
    886934177,
    887537515,
    893081117,
    904750859,
    906642318,
    908897389,
    914654722,
    920453016,
    941800958,
    943752001,
    970356638,
    970385471,
    970598228,
    972671128,
    989381445,
    1011753235,
    1019737494,
    1030400667,
    1032823388,
    1033245328,
    1039032026,
    1044954915,
    1051415893,
    1058115860,
    1069929536,
    1070967343,
    1074326203,
    1075432268,
    1077420264,
    1078682497,
    1102544804,
    1119641113,
    1123216662,
    1126868326,
    1127131465,
    1127861609,
    1131912276,
    1132262048,
    1147287684,
    1162065741,
    1171614426,
    1177543287,
    1203490606,
    1221512915,
    1233534620,
    1265391242,
    1269098716,
    1283517198,
    1337041428,
    1341619767,
    1348744438,
    1349725314,
    1353720154,
    1373123368,
    1394036463,
    1426219628,
    1445631933,
    1448677353,
    1475773103,
    1488164764,
    1489967196,
    1491375716,
    1507916787,
    1518533038,
    1531094468,
    1543134283,
    1545842587,
    1560980623,
    1581459400,
    1621617168,
    1641462412,
    1645267888,
    1663218586,
    1672195559,
    1682114128,
    1723137093,
    1737773231,
    1739845664,
    1747439474,
    1753414259,
    1762279763,
    1770332643,
    1777363799,
    1783355638,
    1784254509,
    1824333165,
    1830407356,
    1836027715,
    1876516712,
    1878062887,
    1886712733,
    1896491931,
    1909141499,
    1912215274,
    1917016601,
    1922255844,
    1922257928,
    1923400478,
    1933662059,
    1938952078,
    1941029835,
    1949211328,
    1951180813,
    1956216962,
    1981688531,
    1987142870,
    2006142190,
    2006667053,
    2006918058,
    2016027501,
    2016857647,
    2025593404,
    2046537925,
    2053223216,
    2068293287,
    2071877360,
    2072156101,
    2072687711,
    2078290630,
    2091594960,
    2112052861,
    2123327359,
    2132890591,
    2136773105,
    -2140431165,
    -2140210194,
    -2137348917,
    -2130482718,
    -2128233223,
    -2124201592,
    -2122757008,
    -2119578145,
    -2107990196,
    -2100640717,
    -2098947590,
    -2096818938,
    -2095439403,
    -2076478498,
    -2072933068,
    -2064372143,
    -2058878099,
    -2052737935,
    -2045594037,
    -2040426790,
    -2039755226,
    -2033222435,
    -2030171296,
    -2007026063,
    -1995326987,
    -1987130134,
    -1973172295,
    -1961627517,
    -1943285540,
    -1934452204,
    -1930048799,
    -1903012613,
    -1894894188,
    -1883869285,
    -1883002148,
    -1860900134,
    -1845487887,
    -1829802492,
    -1809822327,
    -1807623979,
    -1800170043,
    -1797613329,
    -1790546981,
    -1779120616,
    -1776615689,
    -1775728740,
    -1770643266,
    -1757836725,
    -1746576111,
    -1745203402,
    -1743316013,
    -1705304628,
    -1700801569,
    -1696146015,
    -1685021548,
    -1683328900,
    -1673356438,
    -1671539132,
    -1670998136,
    -1661854193,
    -1660945322,
    -1660661558,
    -1651067813,
    -1647941228,
    -1637149482,
    -1627000575,
    -1622444098,
    -1600252419,
    -1579533167,
    -1566741232,
    -1543762099,
    -1536924937,
    -1485523546,
    -1479664699,
    -1477580979,
    -1476447243,
    -1461482751,
    -1453280962,
    -1450650718,
    -1435919434,
    -1403128555,
    -1372848492,
    -1361687965,
    -1353081087,
    -1352468814,
    -1346687836,
    -1323100960,
    -1311240698,
    -1311154784,
    -1297672541,
    -1295027632,
    -1291952903,
    -1289722222,
    -1281684762,
    -1269889662,
    -1255698084,
    -1255452397,
    -1241712818,
    -1237253773,
    -1233807380,
    -1216765807,
    -1214505995,
    -1214293858,
    -1207771834,
    -1207431159,
    -1205801634,
    -1205689942,
    -1193103848,
    -1189015600,
    -1177863319,
    -1150599089,
    -1137532101,
    -1130810103,
    -1126264336,
    -1122289213,
    -1106353882,
    -1098802077,
    -1089039904,
    -1066334226,
    -1050465301,
    -1045541610,
    -1043459709,
    -1041692462,
    -1030275036,
    -1013450936,
    -1008861746,
    -1006919392,
    -960289747,
    -956048545,
    -947761570,
    1274868363,
    -915704871,
    -909201658,
    -907477130,
    -901163259,
    -899509638,
    -893578776,
    -891462355,
    -888242983,
    -884690486,
    -877478386,
    -845979911,
    -845961253,
    -836512833,
    -831834716,
    -825837129,
    -823509173,
    -810318068,
    -808831384,
    -808457413,
    -789894171,
    -784816453,
    -777275802,
    -748008636,
    -746882698,
    -730904777,
    -713569950,
    -685276541,
    -682211828,
    -667151410,
    -644710429,
    -634879114,
    -631760477,
    -624529134,
    -616331036,
    -613725916,
    -604842630,
    -602287871,
    -599568815,
    -591651781,
    -591610296,
    -589178377,
    -566387422,
    -537896628,
    -511601230,
    -498054846,
    -488123221,
    -442313018,
    -433375717,
    -432008408,
    -431692672,
    -401643538,
    -400295096,
    -399841706,
    -394074634,
    -391594584,
    -377465520,
    -349601129,
    -344943009,
    -339587598,
    -326143852,
    -311022263,
    -310465116,
    -305727417,
    -304802106,
    -295689028,
    -282946103,
    -233098306,
    -227741703,
    -214455498,
    -186537451,
    -159126838,
    -150975354,
    -142942670,
    -140902153,
    -120287622,
    -119658072,
    -114627507,
    -114291515,
    -89291282,
    -82626025,
    -50547061,
    -48031959,
    -34623805,
    -16948145,
    -14495224,
    -5153954,
    86520421,
    101905590,
    390201602,
    482197771,
    683047626,
    741090084,
    819197656,
    1549126457,
    1887331236,
    2067820283,
    -2103821244,
    -1232836011,
    -1071380347,
    -777172681,
    -663299102,
    -2115793025,
    -440768424,
    6774487,
    -1404136503,
    822018448,
    2035069708,
    -1842748181,
    -1289178744,
    -255678177,
    -1523428744,
    -1606187161,
    -674927303,
    1873600305,
    1491277511,
    -405626514,
    -1558399629,
    -609625092,
    -618617997,
    1026149675,
    -1009268949,
    -570033273,
    989294410,
    941494461,
    -827162039,
    -312295511,
    -1649536104,
    1180875963,
    682434785,
    -1912017790,
    -1590337689,
    -2022483795,
    -239841468,
    1790834270,
    196747873,
    627535535,
    -757735410,
    -2048333973,
    -482719877,
    1034187331,
    1093792632,
    -1758137366,
    1886268224,
    1074745671,
    272929391,
    1234311532,
    -1405937764,
    719660200,
    -982130927,
    562680400,
    159274291,
    -769147461,  
    223240013,   
    1897744184,  
    -32236122,   
    387748548,   
    -1924433270, 
    433954513,   
    884483972,   
    177270108,   
    -1210451983, 
    1356124575,  
    1504306544,  
    1502869817,  
    -1100548694, 
    -1881846085, 
    1939284556,   
    917809321,
    -1523619738,
    -32878452,   
    1392481335,  
    -1984275979, 
    -1007528109,
    -42959138, 
    -1763555241,
    -749299473,  
    1565978651,  
    1036591958, 
    -1386191424,
    2049897956, 
    1841130506,  
    -975345305,  
    -392675425,  
    -1700874274,
    1043222410, 
    -1242608589, 
    -998177792
];