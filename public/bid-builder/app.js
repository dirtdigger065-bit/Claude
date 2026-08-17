const DEFAULT_CATALOG = [
  {d:"1\" Limestone Pipe Bedding (Earlham)",u:"TON",p:38.55,c:"Rock"},
  {d:"1\" River Rock (Legacy)",u:"TON",p:35.93,c:"Rock"},
  {d:"1\" Road Stone (Earlham)",u:"TON",p:22.05,c:"Rock"},
  {d:"1000 Gal Grease Trap W/Castings and Test",u:"Ea",p:5720.0,c:"Tank"},
  {d:"12-2 w/Ground Underground Wire",u:"LF",p:1.52,c:"Electrical"},
  {d:"14-2 W/Ground Underground Wire",u:"LF",p:1.39,c:"Electrical"},
  {d:"1500 Gal Grease Trap W/Castings and Test",u:"Ea",p:7090.0,c:"Tank"},
  {d:"2 Compartment 1250",u:"Ea",p:2147.0,c:"Tank"},
  {d:"2 Compartment 1500",u:"Ea",p:2265.0,c:"Tank"},
  {d:"2 Compartment 1750",u:"Ea",p:2535.0,c:"Tank"},
  {d:"2 Compartment 2000",u:"Ea",p:2715.0,c:"Tank"},
  {d:"2 Compartment 2500",u:"Ea",p:3609.0,c:"Tank"},
  {d:"2\" River Rock (Legacy)",u:"TON",p:63.43,c:"Rock"},
  {d:"2\" SW SCH40 22 1/2 BEND",u:"Ea",p:4.38,c:"2\" Fitting"},
  {d:"2\" SW SCH40 45 BEND",u:"Ea",p:2.97,c:"2\" Fitting"},
  {d:"2\" SW SCH40 90 BEND",u:"Ea",p:2.6,c:"2\" Fitting"},
  {d:"2\" SW SCH40 TEE",u:"Ea",p:3.25,c:"2\" Fitting"},
  {d:"2\" SW SCH40 WYE",u:"Ea",p:19.85,c:"2\" Fitting"},
  {d:"2\" X 10\' SCH40 BE PVC PIPE",u:"LF",p:1.25,c:"Pipe"},
  {d:"2\" X 20\' SCH40 BE PVC PIPE",u:"LF",p:1.25,c:"Pipe"},
  {d:"2000 Gal Grease Trap W/Castings and Test",u:"Ea",p:8150.0,c:"Tank"},
  {d:"3 Compartment 1250/500",u:"Ea",p:2830.0,c:"Tank"},
  {d:"3 Compartment 1500/500",u:"Ea",p:3155.0,c:"Tank"},
  {d:"3 Compartment 1750/500",u:"Ea",p:3395.0,c:"Tank"},
  {d:"3 Compartment 2000/500",u:"Ea",p:3830.0,c:"Tank"},
  {d:"3/4\" Road Stone (Earlham)",u:"TON",p:22.05,c:"Rock"},
  {d:"4\" SW DWV 22 1/2 BEND",u:"Ea",p:15.75,c:"4\" Fitting"},
  {d:"4\" SW DWV 45 BEND",u:"Ea",p:15.66,c:"4\" Fitting"},
  {d:"4\" SW DWV 90 BEND",u:"Ea",p:19.65,c:"4\" Fitting"},
  {d:"4\" SW DWV CLEAN OUT CAP",u:"EA",p:27.47,c:"4\" Fitting"},
  {d:"4\" SW DWV SANITARY TEE",u:"Ea",p:37.15,c:"4\" Fitting"},
  {d:"4\" SW DWV ST 45 BEND",u:"Ea",p:14.2,c:"4\" Fitting"},
  {d:"4\" SW DWV STREET 90 BEND",u:"Ea",p:18.4,c:"4\" Fitting"},
  {d:"4\" SW DWV WYE",u:"Ea",p:34.8,c:"4\" Fitting"},
  {d:"4\" X 10\' SCH40 BE PVC PIPE",u:"LF",p:2.95,c:"Pipe"},
  {d:"4\" X 20\' SCH40 BE PVC PIPE",u:"LF",p:2.95,c:"Pipe"},
  {d:"American Underground - 2\" DWV 22.5 SW",u:"EA",p:3.733,c:"2\" Fitting"},
  {d:"American Underground - 2\" DWV 45 SW",u:"EA",p:2.606,c:"2\" Fitting"},
  {d:"American Underground - 2\" DWV 90 SW",u:"EA",p:2.219,c:"2\" Fitting"},
  {d:"American Underground - 2\" SCH40 Tee SW",u:"EA",p:2.744,c:"2\" Fitting"},
  {d:"American Underground - 2\" SCH40 Wye SW",u:"EA",p:20.704,c:"2\" Fitting"},
  {d:"American Underground - 2\" x 20\' SCH40 Bell End Pipe",u:"LF",p:1.047,c:"Pipe"},
  {d:"American Underground - 4\" DWV 22.5 SW",u:"EA",p:12.075,c:"4\" Fitting"},
  {d:"American Underground - 4\" DWV 45 SW",u:"EA",p:10.938,c:"4\" Fitting"},
  {d:"American Underground - 4\" DWV 90 SW",u:"EA",p:23.495,c:"4\" Fitting"},
  {d:"American Underground - 4\" DWV Sanitary Tee SW",u:"EA",p:25.6,c:"4\" Fitting"},
  {d:"American Underground - 4\" DWV Wye SW",u:"EA",p:29.788,c:"4\" Fitting"},
  {d:"American Underground - 4\" x 10\' SCH40 DWV Solid PVC Pipe",u:"LF",p:1.85,c:"Pipe"},
  {d:"American Underground - Heavy Body Clear Cement Quart",u:"EA",p:11.0,c:"Cement"},
  {d:"American Underground - Purple Primer Quart",u:"EA",p:14.015,c:"Primer"},
  {d:"Ames Mine - 1 1/2\" Clean",u:"TON",p:32.95,c:"Rock"},
  {d:"Ames Mine - 1 1/2\" Roadstone",u:"TON",p:23.5,c:"Rock"},
  {d:"Ames Mine - 1\" Clean",u:"TON",p:33.95,c:"Rock"},
  {d:"Ames Mine - 1\" Commercial",u:"TON",p:38.65,c:"Rock"},
  {d:"Ames Mine - 1\" Pipe Bedding",u:"TON",p:33.95,c:"Rock"},
  {d:"Ames Mine - 1\" Roadstone",u:"TON",p:23.5,c:"Rock"},
  {d:"Ames Mine - 1/2\" Washed Chips",u:"TON",p:47.15,c:"Rock"},
  {d:"Ames Mine - 1/4\" Washed Chips",u:"TON",p:44.95,c:"Rock"},
  {d:"Ames Mine - 3\" Clean",u:"TON",p:32.95,c:"Rock"},
  {d:"Ames Mine - 3\" Roadstone",u:"TON",p:23.5,c:"Rock"},
  {d:"Ames Mine - 3/4\" Clean",u:"TON",p:41.15,c:"Rock"},
  {d:"Ames Mine - 3/8\" Asphalt Stone",u:"TON",p:32.75,c:"Rock"},
  {d:"Ames Mine - 3/8\" Washed Chips",u:"TON",p:39.95,c:"Rock"},
  {d:"Ames Mine - Aglime",u:"TON",p:18.5,c:"Rock"},
  {d:"Ames Mine - Class A",u:"TON",p:22.5,c:"Rock"},
  {d:"Ames Mine - Class D Rip Rap",u:"TON",p:45.45,c:"Rock"},
  {d:"Ames Mine - Class E Rip Rap",u:"TON",p:45.45,c:"Rock"},
  {d:"Ames Mine - Crusher Run",u:"TON",p:23.5,c:"Rock"},
  {d:"Ames Mine - D-57 Conc",u:"TON",p:40.15,c:"Rock"},
  {d:"Ames Mine - D-67 Conc",u:"TON",p:41.15,c:"Rock"},
  {d:"Ames Mine - Gabion Stone",u:"TON",p:34.45,c:"Rock"},
  {d:"Ames Mine - Granular Backfill",u:"TON",p:17.5,c:"Rock"},
  {d:"Ames Mine - Granular Subbase",u:"TON",p:27.75,c:"Rock"},
  {d:"Ames Mine - Modified Subbase",u:"TON",p:23.5,c:"Rock"},
  {d:"Ames Mine - Porous Backfill",u:"TON",p:35.85,c:"Rock"},
  {d:"Ames Mine - Screenings",u:"TON",p:13.45,c:"Rock"},
  {d:"Ames Mine - Special Backfill",u:"TON",p:23.5,c:"Rock"},
  {d:"Ames Mine - Stone Sand",u:"TON",p:17.1,c:"Rock"},
  {d:"Concrete Sand (Legacy)",u:"TON",p:15.43,c:"Rock"},
  {d:"Crest - 1000 Gal H20 Grease Interceptor/Sand Separator",u:"EA",p:7200.0,c:"Grease Interceptor"},
  {d:"Crest - 1500 Gal H20 Grease Interceptor/Sand Separator",u:"EA",p:7650.0,c:"Grease Interceptor"},
  {d:"Crest - 2000 Gal H20 Grease Interceptor/Sand Separator",u:"EA",p:8100.0,c:"Grease Interceptor"},
  {d:"Crest - 2500 Gal H20 Grease Interceptor/Sand Separator",u:"EA",p:8900.0,c:"Grease Interceptor"},
  {d:"Crest - 3000 Gal H20 Grease Interceptor/Sand Separator",u:"EA",p:9350.0,c:"Grease Interceptor"},
  {d:"Crest - 4000 Gal H20 Grease Interceptor/Sand Separator",u:"EA",p:11350.0,c:"Grease Interceptor"},
  {d:"Crest - 5000 Gal H20 Grease Interceptor/Sand Separator",u:"EA",p:12975.0,c:"Grease Interceptor"},
  {d:"Crest - 800 Gal H20 Grease Interceptor/Sand Separator",u:"EA",p:6300.0,c:"Grease Interceptor"},
  {d:"Earlham Quarry - 1 1/2\" Clean",u:"TON",p:30.95,c:"Rock"},
  {d:"Earlham Quarry - 1 1/2\" Roadstone",u:"TON",p:22.05,c:"Rock"},
  {d:"Earlham Quarry - 1\" Clean",u:"TON",p:38.55,c:"Rock"},
  {d:"Earlham Quarry - 1\" Pipe Bedding",u:"TON",p:38.55,c:"Rock"},
  {d:"Earlham Quarry - 1\" Roadstone",u:"TON",p:22.05,c:"Rock"},
  {d:"Earlham Quarry - 3\" Clean",u:"TON",p:30.95,c:"Rock"},
  {d:"Earlham Quarry - 3\" Roadstone",u:"TON",p:22.05,c:"Rock"},
  {d:"Earlham Quarry - 3/4\" Roadstone",u:"TON",p:22.05,c:"Rock"},
  {d:"Earlham Quarry - Class A",u:"TON",p:22.8,c:"Rock"},
  {d:"Earlham Quarry - Class D Rip Rap",u:"TON",p:45.45,c:"Rock"},
  {d:"Earlham Quarry - Class E Rip Rap",u:"TON",p:45.45,c:"Rock"},
  {d:"Earlham Quarry - Crusher Run",u:"TON",p:22.05,c:"Rock"},
  {d:"Earlham Quarry - Graded Rip Rap",u:"TON",p:55.45,c:"Rock"},
  {d:"Earlham Quarry - Macadam",u:"TON",p:30.95,c:"Rock"},
  {d:"Earlham Quarry - Modified Subbase",u:"TON",p:22.8,c:"Rock"},
  {d:"Earlham Quarry - Pit Run",u:"TON",p:23.0,c:"Rock"},
  {d:"Earlham Quarry - Screenings",u:"TON",p:12.75,c:"Rock"},
  {d:"Earlham Quarry - Special Backfill",u:"TON",p:22.8,c:"Rock"},
  {d:"Indianola - 1000 Gal H20 Grease Interceptor/Sand Trap",u:"EA",p:5720.0,c:"Grease Interceptor"},
  {d:"Indianola - 1000 Gal Single Compartment Tank",u:"EA",p:1798.0,c:"Tank"},
  {d:"Indianola - 1250 Gal 2 Compartment Tank",u:"EA",p:2147.0,c:"Tank"},
  {d:"Indianola - 1250/500 3 Compartment 308 Siphon",u:"EA",p:3220.0,c:"Tank"},
  {d:"Indianola - 1250/500 3 Compartment 313 Siphon",u:"EA",p:3270.0,c:"Tank"},
  {d:"Indianola - 1250/500 3 Compartment 417 Siphon",u:"EA",p:3325.0,c:"Tank"},
  {d:"Indianola - 1250/500 3 Compartment Pump Tank",u:"EA",p:2830.0,c:"Tank"},
  {d:"Indianola - 1500 Gal 2 Compartment Tank",u:"EA",p:2265.0,c:"Tank"},
  {d:"Indianola - 1500 Gal Advantex Tank",u:"EA",p:2410.0,c:"Tank"},
  {d:"Indianola - 1500 Gal H20 Grease Interceptor/Sand Trap",u:"EA",p:7090.0,c:"Grease Interceptor"},
  {d:"Indianola - 1500/500 3 Compartment 1 Advantex Riser",u:"EA",p:3030.0,c:"Tank"},
  {d:"Indianola - 1500/500 3 Compartment 3 Advantex Risers",u:"EA",p:3155.0,c:"Tank"},
  {d:"Indianola - 1500/500 3 Compartment 308 Siphon",u:"EA",p:3355.0,c:"Tank"},
  {d:"Indianola - 1500/500 3 Compartment 313 Siphon",u:"EA",p:3406.0,c:"Tank"},
  {d:"Indianola - 1500/500 3 Compartment 417 Siphon",u:"EA",p:3461.0,c:"Tank"},
  {d:"Indianola - 1500/500 3 Compartment Pump Tank",u:"EA",p:2966.0,c:"Tank"},
  {d:"Indianola - 1750 Gal 2 Compartment Tank",u:"EA",p:2535.0,c:"Tank"},
  {d:"Indianola - 1750/500 3 Compartment 1 Advantex Riser",u:"EA",p:3275.0,c:"Tank"},
  {d:"Indianola - 1750/500 3 Compartment 3 Advantex Risers",u:"EA",p:3395.0,c:"Tank"},
  {d:"Indianola - 1750/500 3 Compartment 308 Siphon",u:"EA",p:3660.0,c:"Tank"},
  {d:"Indianola - 1750/500 3 Compartment 313 Siphon",u:"EA",p:3715.0,c:"Tank"},
  {d:"Indianola - 1750/500 3 Compartment Pump Tank",u:"EA",p:3220.0,c:"Tank"},
  {d:"Indianola - 20\" Lid",u:"EA",p:31.0,c:"Lid"},
  {d:"Indianola - 20\" x 12\" Riser",u:"EA",p:57.0,c:"Riser"},
  {d:"Indianola - 20\" x 6\" Riser",u:"EA",p:44.0,c:"Riser"},
  {d:"Indianola - 2000 Gal 2 Compartment Tank",u:"EA",p:2715.0,c:"Tank"},
  {d:"Indianola - 2000 Gal H20 Grease Interceptor/Sand Trap",u:"EA",p:8150.0,c:"Grease Interceptor"},
  {d:"Indianola - 2000/500 3 Compartment 1 Advantex Riser",u:"EA",p:3705.0,c:"Tank"},
  {d:"Indianola - 2000/500 3 Compartment 3 Advantex Risers",u:"EA",p:3830.0,c:"Tank"},
  {d:"Indianola - 2000/500 3 Compartment 308 Siphon",u:"EA",p:4085.0,c:"Tank"},
  {d:"Indianola - 2000/500 3 Compartment 313 Siphon",u:"EA",p:4140.0,c:"Tank"},
  {d:"Indianola - 2000/500 3 Compartment Pump Tank",u:"EA",p:3645.0,c:"Tank"},
  {d:"Indianola - 24\" Concrete Well Lid",u:"EA",p:120.0,c:"Well Lid"},
  {d:"Indianola - 24\" Flat Lid",u:"EA",p:64.0,c:"Lid"},
  {d:"Indianola - 24\" Gasket",u:"EA",p:3.85,c:"Seal"},
  {d:"Indianola - 24\" HD&W Lid",u:"EA",p:71.0,c:"Lid"},
  {d:"Indianola - 24\" Lid",u:"EA",p:49.0,c:"Lid"},
  {d:"Indianola - 24\" x 12\" Riser",u:"EA",p:58.0,c:"Riser"},
  {d:"Indianola - 24\" x 6\" Riser",u:"EA",p:47.0,c:"Riser"},
  {d:"Indianola - 2500 Gal 2 Compartment Tank",u:"EA",p:3609.0,c:"Tank"},
  {d:"Indianola - 27\" Concrete Well Lid",u:"EA",p:135.0,c:"Well Lid"},
  {d:"Indianola - 32\" Concrete Well Lid",u:"EA",p:160.0,c:"Well Lid"},
  {d:"Indianola - 36\" Concrete Well Lid",u:"EA",p:180.0,c:"Well Lid"},
  {d:"Indianola - 42\" Concrete Well Lid",u:"EA",p:225.0,c:"Well Lid"},
  {d:"Indianola - 48\" Concrete Well Lid",u:"EA",p:260.0,c:"Well Lid"},
  {d:"Indianola - 500 Gal Single Compartment Tank",u:"EA",p:1555.0,c:"Tank"},
  {d:"Indianola - 500 Gal Tank w/313 Siphon",u:"EA",p:1945.0,c:"Tank"},
  {d:"Indianola - 500 Gal Tank w/417 Siphon",u:"EA",p:2050.0,c:"Tank"},
  {d:"Indianola - 54\" Concrete Well Lid",u:"EA",p:285.0,c:"Well Lid"},
  {d:"Indianola - 6\' Parking Curb",u:"EA",p:75.0,c:"Curb"},
  {d:"Indianola - 7 & 9 Hole D-Box",u:"EA",p:67.0,c:"Distribution Box"},
  {d:"Indianola - 8\' Parking Curb",u:"EA",p:85.0,c:"Curb"},
  {d:"Indianola - D-Box Riser 12\"",u:"EA",p:34.0,c:"Distribution Box"},
  {d:"Indianola - D-Box Riser 6\"",u:"EA",p:18.0,c:"Distribution Box"},
  {d:"Indianola - H Bunk",u:"EA",p:660.0,c:"Feed Bunk"},
  {d:"Indianola - J Bunk LG",u:"EA",p:344.0,c:"Feed Bunk"},
  {d:"Indianola - J Bunk SM",u:"EA",p:328.0,c:"Feed Bunk"},
  {d:"Indianola - Large Truck Wheel Stop",u:"EA",p:395.0,c:"Wheel Stop"},
  {d:"Indianola - PL-122 Filter",u:"EA",p:58.0,c:"Filter"},
  {d:"Indianola - PL-68 Filter",u:"EA",p:44.0,c:"Filter"},
  {d:"Indianola - PL-68 Filter Only",u:"EA",p:31.0,c:"Filter"},
  {d:"Indianola - PL-68 Housing Only",u:"EA",p:19.0,c:"Filter"},
  {d:"Indianola - Planet Care Biofilter 3BR 450 Gravity",u:"EA",p:7476.0,c:"Alternative System"},
  {d:"Indianola - Planet Care Biofilter 3BR 450 Pump",u:"EA",p:7980.0,c:"Alternative System"},
  {d:"Indianola - Planet Care Biofilter 4BR 600 Gravity",u:"EA",p:7998.0,c:"Alternative System"},
  {d:"Indianola - Planet Care Biofilter 4BR 600 Pump",u:"EA",p:8500.0,c:"Alternative System"},
  {d:"Indianola - Planet Care Biofilter 5BR 750 Gravity",u:"EA",p:8938.0,c:"Alternative System"},
  {d:"Indianola - Planet Care Biofilter 5BR 750 Pump",u:"EA",p:9360.0,c:"Alternative System"},
  {d:"Indianola - Planet Care Biofilter 6BR 900 Gravity",u:"EA",p:9618.0,c:"Alternative System"},
  {d:"Indianola - Planet Care Biofilter 6BR 900 Pump",u:"EA",p:10360.0,c:"Alternative System"},
  {d:"Indianola - Premier Tech EcoFlo 3BR 500 Gravity",u:"EA",p:7590.0,c:"Alternative System"},
  {d:"Indianola - Premier Tech EcoFlo 3BR 500 Pump",u:"EA",p:8100.0,c:"Alternative System"},
  {d:"Indianola - Premier Tech EcoFlo 4BR 600 Gravity",u:"EA",p:8140.0,c:"Alternative System"},
  {d:"Indianola - Premier Tech EcoFlo 4BR 600 Pump",u:"EA",p:8550.0,c:"Alternative System"},
  {d:"Indianola - Premier Tech EcoFlo 5BR 750 Gravity",u:"EA",p:9110.0,c:"Alternative System"},
  {d:"Indianola - Premier Tech EcoFlo 5BR 750 Pump",u:"EA",p:9410.0,c:"Alternative System"},
  {d:"Indianola - Riser Adaptor Ring 3009 AR",u:"EA",p:70.0,c:"Distribution Box"},
  {d:"Indianola - RTR Adapter 3009-RTR",u:"EA",p:38.0,c:"Distribution Box"},
  {d:"Indianola - Safety Screen",u:"EA",p:20.0,c:"Distribution Box"},
  {d:"Indianola - Sealant Kit 3009KIT",u:"EA",p:49.0,c:"Distribution Box"},
  {d:"Indianola - Storm Shelter",u:"EA",p:5650.0,c:"Storm Shelter"},
  {d:"Liberty 280 with Controls",u:"Ea",p:784.0,c:"Pump"},
  {d:"Lids 24\"",u:"Ea",p:75.0,c:"Misc"},
  {d:"Municipal Supply - 2 oz Fabric 420 sq yd Roll",u:"ROLL",p:405.0,c:"Fabric"},
  {d:"Municipal Supply - 2\" x 10\' SCH40 BE PVC Pipe",u:"LF",p:1.06,c:"Pipe"},
  {d:"Municipal Supply - 3\' x 360\' 3 oz Fabric Roll",u:"ROLL",p:140.0,c:"Fabric"},
  {d:"Municipal Supply - 4\" x 10\' SCH40 BE PVC Pipe",u:"LF",p:2.66,c:"Pipe"},
  {d:"Municipal Supply - 4\' x 1500\' 2 oz Fabric Roll",u:"ROLL",p:210.0,c:"Fabric"},
  {d:"Municipal Supply - 4\' x 360\' 3 oz Fabric Roll",u:"ROLL",p:215.0,c:"Fabric"},
  {d:"Municipal Supply - CSMMP Post Alarm w/Seal",u:"EA",p:361.8,c:"Alarm"},
  {d:"Municipal Supply - CSMMP Post Alarm w/Seal L/Ped",u:"EA",p:266.9,c:"Alarm"},
  {d:"Municipal Supply - Liberty 1/2 HP 115V 10\' Cord LE51A",u:"EA",p:448.0,c:"Pump"},
  {d:"Municipal Supply - Liberty 1/2 HP 115V 10\' Cord Pump",u:"EA",p:328.0,c:"Pump"},
  {d:"Municipal Supply - Liberty 1/3 HP 115V 10\' Cord Pump",u:"EA",p:226.0,c:"Pump"},
  {d:"Municipal Supply - Liberty 3/4 HP 115V 10\' Cord w/Float Pump",u:"EA",p:421.5,c:"Pump"},
  {d:"Municipal Supply - Liberty 4/10 HP 115V 10\' Cord Pump",u:"EA",p:406.0,c:"Pump"},
  {d:"Municipal Supply - Multi DPLX CP w/Heater & Counter",u:"EA",p:1130.0,c:"Control Panel"},
  {d:"Municipal Supply - Multiv Simplx Control Panel w/Heater",u:"EA",p:712.0,c:"Control Panel"},
  {d:"Municipal Supply - Polylok PL-122 Filter w/Pipe Adapter",u:"EA",p:56.0,c:"Filter"},
  {d:"Municipal Supply - Polylok PL-68 Filter",u:"EA",p:30.0,c:"Filter"},
  {d:"Municipal Supply - PSP Patrol",u:"EA",p:248.25,c:"Alarm"},
  {d:"Municipal Supply - Time Dose Panel",u:"EA",p:916.0,c:"Control Panel"},
  {d:"Pella - 1000 Gal Dual Compartment Tank",u:"EA",p:1775.0,c:"Tank"},
  {d:"Pella - 1000 Gal Pump Tank",u:"EA",p:1740.0,c:"Tank"},
  {d:"Pella - 12\" Riser",u:"EA",p:295.0,c:"Riser"},
  {d:"Pella - 1250 Gal Dual Compartment Tank",u:"EA",p:1960.0,c:"Tank"},
  {d:"Pella - 1500 Gal Dual Compartment Tank",u:"EA",p:2140.0,c:"Tank"},
  {d:"Pella - 1750 Gal 3 Comp Pump Chamber",u:"EA",p:2650.0,c:"Tank"},
  {d:"Pella - 1750 Gal 3 Comp w/313 Siphon",u:"EA",p:3015.0,c:"Tank"},
  {d:"Pella - 1750 Gal 3 Comp w/417 Siphon",u:"EA",p:3100.0,c:"Tank"},
  {d:"Pella - 1750 Gal Dual Compartment Tank",u:"EA",p:2450.0,c:"Tank"},
  {d:"Pella - 2\" Bulkhead Fitting",u:"EA",p:50.0,c:"Fitting"},
  {d:"Pella - 2\" x 20\' w/hub SCH40 Pipe",u:"LF",p:1.85,c:"Pipe"},
  {d:"Pella - 20\" Access Cover",u:"EA",p:47.0,c:"Lid"},
  {d:"Pella - 20\" x 12\" Riser",u:"EA",p:45.5,c:"Riser"},
  {d:"Pella - 20\" x 6\" Riser",u:"EA",p:31.5,c:"Riser"},
  {d:"Pella - 2000 Gal 3 Comp Pump Chamber",u:"EA",p:2860.0,c:"Tank"},
  {d:"Pella - 2000 Gal 3 Comp w/417 Siphon",u:"EA",p:3280.0,c:"Tank"},
  {d:"Pella - 2000 Gal Dual Compartment Tank",u:"EA",p:2700.0,c:"Tank"},
  {d:"Pella - 24\" Access Cover",u:"EA",p:67.0,c:"Lid"},
  {d:"Pella - 24\" Adaptor Ring",u:"EA",p:28.5,c:"Riser"},
  {d:"Pella - 24\" Locking Ring",u:"EA",p:27.0,c:"Lid"},
  {d:"Pella - 24\" x 12\" Riser",u:"EA",p:64.5,c:"Riser"},
  {d:"Pella - 24\" x 18\" Riser",u:"EA",p:77.5,c:"Riser"},
  {d:"Pella - 24\" x 6\" Riser",u:"EA",p:40.5,c:"Riser"},
  {d:"Pella - 36 Chamber",u:"LF",p:10.25,c:"Chamber"},
  {d:"Pella - 36 End Cap",u:"EA",p:25.0,c:"Chamber"},
  {d:"Pella - 36 Low Profile Chamber",u:"LF",p:9.25,c:"Chamber"},
  {d:"Pella - 36 Low Profile End Cap",u:"EA",p:17.75,c:"Chamber"},
  {d:"Pella - 4\" x 10\' w/hub SDR35 Pipe",u:"EA",p:3.25,c:"Pipe"},
  {d:"Pella - 4\" x 20\' w/hub SCH40 Pipe",u:"LF",p:3.95,c:"Pipe"},
  {d:"Pella - 500 Gal Pump Tank",u:"EA",p:1300.0,c:"Tank"},
  {d:"Pella - 500 Gal Single Compartment Tank",u:"EA",p:1390.0,c:"Tank"},
  {d:"Pella - 500 Gal Siphon Dose Tank w/417 Siphon",u:"EA",p:1715.0,c:"Tank"},
  {d:"Pella - 6\" Riser",u:"EA",p:170.0,c:"Riser"},
  {d:"Pella - Plant Care Biofilter 3BR Gravity",u:"EA",p:7476.0,c:"Alternative System"},
  {d:"Pella - Plant Care Biofilter 3BR Pump",u:"EA",p:7980.0,c:"Alternative System"},
  {d:"Pella - Plant Care Biofilter 4BR Gravity",u:"EA",p:7998.0,c:"Alternative System"},
  {d:"Pella - Plant Care Biofilter 4BR Pump",u:"EA",p:8500.0,c:"Alternative System"},
  {d:"Pella - Plant Care Biofilter 5BR Gravity",u:"EA",p:8938.0,c:"Alternative System"},
  {d:"Pella - Plant Care Biofilter 5BR Pump",u:"EA",p:9360.0,c:"Alternative System"},
  {d:"Pella - Plant Care Biofilter 6BR Gravity",u:"EA",p:9618.0,c:"Alternative System"},
  {d:"Pella - Plant Care Biofilter 6BR Pump",u:"EA",p:10360.0,c:"Alternative System"},
  {d:"Pella - Polylok PL-122 Filter",u:"EA",p:79.5,c:"Filter"},
  {d:"Pella - Silicone Sealant / Tube",u:"EA",p:15.5,c:"Sealant"},
  {d:"Pella - Well Water Pump Pit",u:"EA",p:2015.0,c:"Tank"},
  {d:"Pella - Zabel A1801 Filter",u:"EA",p:57.5,c:"Filter"},
  {d:"Pella - Zabel Handle Extension Kit",u:"EA",p:14.95,c:"Filter"},
  {d:"Riser 24x12",u:"Ea",p:75.0,c:"Misc"},
  {d:"Riser 24x6",u:"Ea",p:50.0,c:"Misc"},
  {d:"Screened Black Dirt (Legacy)",u:"TON",p:52.83,c:"Rock"},
  {d:"Single Compartment 1000",u:"Ea",p:1798.0,c:"Tank"},
  {d:"Single Compartment 1500",u:"Ea",p:2470.0,c:"Tank"},
  {d:"Single Compartment 2000",u:"Ea",p:2970.0,c:"Tank"},
  {d:"Single Compartment 2500",u:"Ea",p:3915.0,c:"Tank"},
  {d:"Single Compartment 500",u:"Ea",p:1555.0,c:"Tank"},
  {d:"Top Soil (Legacy)",u:"TON",p:22.03,c:"Rock"},
  {d:"Trucking per hour",u:"TON",p:175.0,c:"Rock"},
  {d:"Tucker Trucking - 1\" Gravel (Delivered)",u:"TON",p:45.94,c:"Rock",v:"Tucker Trucking"},
  {d:"Tucker Trucking - Pea Gravel (Delivered)",u:"TON",p:45.94,c:"Rock",v:"Tucker Trucking"},
  {d:"Tucker Trucking - Fill Sand (Delivered)",u:"TON",p:17.58,c:"Rock",v:"Tucker Trucking"},
  {d:"Tucker Trucking - Pipe Bedding (Delivered)",u:"TON",p:49.99,c:"Rock",v:"Tucker Trucking"},
  {d:"Tucker Trucking - Special Backfill (Delivered)",u:"TON",p:22.93,c:"Rock",v:"Tucker Trucking"},
  {d:"Tucker Trucking - Roadstone (Delivered)",u:"TON",p:31.48,c:"Rock",v:"Tucker Trucking"},
  {d:"Tucker Trucking - Hourly Rate",u:"HR",p:160.00,c:"Trucking",v:"Tucker Trucking"}
];

let CATALOG = [...DEFAULT_CATALOG];

// ===== WATER / STORM CATALOG ITEMS (American Underground Supply) =====
const WATER_STORM_CATALOG = [
  // WATER MAIN
  {d:"12\"x8\" Tapping Sleeve w/ Carbon Steel MJ Adapter",u:"EA",p:1101.14,c:"Fitting",pt:"Water",v:"American Underground Supply"},
  {d:"8\" AVK Resilient Seated Gate Valve C509",u:"EA",p:1615.22,c:"Fitting",pt:"Water",v:"American Underground Supply"},
  {d:"4-8\" Valve Box Adaptor II (Clow/Kennedy)",u:"EA",p:57.43,c:"Fitting",pt:"Water",v:"American Underground Supply"},
  {d:"664-S Valve Box Screw 39\"-60\" w/ Water Lid",u:"EA",p:164.44,c:"Fitting",pt:"Water",v:"American Underground Supply"},
  {d:"8\" Bolt and Gasket Pack (Less Gland)",u:"EA",p:50.09,c:"Fitting",pt:"Water",v:"American Underground Supply"},
  {d:"8\" Red PVC MJ Grip Restraint Gland",u:"EA",p:70.36,c:"Fitting",pt:"Water",v:"American Underground Supply"},
  {d:"8\" x 20' C900 DR18 IB Certa-Lok PVC Pipe",u:"LF",p:28.30,c:"Pipe",pt:"Water",v:"American Underground Supply"},
  {d:"8\" x 20' C900 DR18 PVC Pipe",u:"LF",p:18.30,c:"Pipe",pt:"Water",v:"American Underground Supply"},
  {d:"8\" DI MJ 45° Bend C153",u:"EA",p:190.48,c:"Fitting",pt:"Water",v:"American Underground Supply"},
  {d:"8\"x2\" DI MJ Tapped Cap C153",u:"EA",p:146.32,c:"Fitting",pt:"Water",v:"American Underground Supply"},
  {d:"Tapping Service",u:"EA",p:1000.00,c:"Misc",pt:"Water",v:"American Underground Supply"},
  // HYDRANT ASSEMBLY
  {d:"8\"x6\" DI MJ Swivel Tee C153",u:"EA",p:332.84,c:"Fitting",pt:"Water",v:"American Underground Supply"},
  {d:"AVK Hydrant 2780 6'-0\" w/ 6\" MJ Shoe 3-Way",u:"EA",p:3549.68,c:"Misc",pt:"Water",v:"American Underground Supply"},
  // WATER SERVICE
  {d:"2\" CTS QJ x MIPT Adapter",u:"EA",p:101.16,c:"Fitting",pt:"Water",v:"American Underground Supply"},
  {d:"2\" CTS QJ x FIPT Adapter",u:"EA",p:100.72,c:"Fitting",pt:"Water",v:"American Underground Supply"},
  {d:"2\" CTS QJ Comp x Comp BS Curb Stop",u:"EA",p:464.79,c:"Fitting",pt:"Water",v:"American Underground Supply"},
  {d:"5' Curb Box Less Rod (Erie Pattern)",u:"EA",p:91.99,c:"Fitting",pt:"Water",v:"American Underground Supply"},
  {d:"2\" CTS SS Poly Stiffener Insert",u:"EA",p:4.86,c:"Fitting",pt:"Water",v:"American Underground Supply"},
  {d:"2\" x 300' CTS Poly Pipe 250# Blue",u:"LF",p:2.02,c:"Pipe",pt:"Water",v:"American Underground Supply"},
  {d:"2\" Tandem Meter Pit (Ford PTMBH)",u:"EA",p:3899.00,c:"Misc",pt:"Water",v:"American Underground Supply"},
  {d:"Ford Monitor Lid MC-36-MB",u:"EA",p:912.85,c:"Misc",pt:"Water",v:"American Underground Supply"},
  {d:"36\"x4\" Closed Cell Meter Pit Insulating Disc",u:"EA",p:385.43,c:"Misc",pt:"Water",v:"American Underground Supply"},
  // STORM SEWER
  {d:"6\" x 20' ADS DW IB WT AASHTO Highway Pipe",u:"LF",p:3.36,c:"Pipe",pt:"Storm",v:"American Underground Supply"},
  {d:"6\" External Rodent Guard Cap",u:"EA",p:26.80,c:"Fitting",pt:"Storm",v:"American Underground Supply"},
  {d:"6\" ADS 45° Fitting",u:"EA",p:46.34,c:"Fitting",pt:"Storm",v:"American Underground Supply"},
  {d:"6\" Nyloplast Clean Out",u:"EA",p:106.41,c:"Fitting",pt:"Storm",v:"American Underground Supply"}
];

// Merge Water/Storm items into DEFAULT_CATALOG
WATER_STORM_CATALOG.forEach(item => {
  if (!DEFAULT_CATALOG.some(di => di.d === item.d)) {
    DEFAULT_CATALOG.push(item);
  }
});

// ===== CATEGORY MAPPING =====
const PROJECT_TYPES = ['Septic','Storm','Water','Sanitary','General'];

const CAT_MAP = {
  'Tanks': ['Tank','Grease Interceptor','Storm Shelter','Feed Bunk'],
  'Pipe': ['Pipe'],
  'Fittings': ['2" Fitting','4" Fitting','Fitting'],
  'Rock': ['Rock'],
  'Pumps/Electrical': ['Pump','Electrical','Control Panel','Alarm','Alternative System'],
  'Misc': ['Cement','Chamber','Curb','Distribution Box','Fabric','Filter','Lid','Misc','Primer','Riser','Seal','Sealant','Well Lid','Wheel Stop']
};

function catTabFor(itemCat) {
  for (const [tab, cats] of Object.entries(CAT_MAP)) {
    if (cats.includes(itemCat)) return tab;
  }
  return 'Misc';
}

// ===== EXCLUSION & TERM DEFAULTS =====
const RESIDENTIAL_EXCLUSIONS = [
  "Grass, sod, or landscaping beyond rough grading",
  "Driveway, sidewalk, or pavement replacement unless listed",
  "Rock excavation or dewatering (extra if required)",
  "Permit or inspection fees unless noted",
  "Private utilities (sprinklers, dog fences, etc.) must be located by homeowner",
  "No seeding, sodding, or fine grading unless included",
  "Weather delays may affect schedule",
  "Material price and availability subject to change"
];

const RESIDENTIAL_TERMS = [
  "Proposal valid for 30 days",
  "Work scheduled after signed approval and any required deposit",
  "RD McKinney will contact Iowa One Call (811) for public locates",
  "Customer responsible for identifying all private utilities",
  "Contractor not liable for damage to unmarked private utilities",
  "Payment due upon completion unless otherwise stated",
  "Late payments subject to interest and possible lien filing",
  "Workmanship warranted for 1 year from completion",
  "Schedule may vary due to weather or unforeseen site conditions",
  "Acceptance of this proposal confirms agreement to these terms"
];

const COMMERCIAL_EXCLUSIONS = [
  "Landscape or sod restoration beyond rough grade",
  "Asphalt, concrete, or pavement replacement, saw cutting, or curb repair unless noted",
  "Adjustment of intakes, fixtures, or existing utilities",
  "Traffic control, signage, or barricades unless specified",
  "Permit fees, engineering, layout, staking, or testing unless listed",
  "Bonds, insurance beyond standard limits, or inspection costs by others",
  "Rock excavation, dewatering, unsuitable soils, or unforeseen subsurface conditions",
  "Import/export of fill, granular material, or topsoil",
  "Frost removal, winter conditions, or work performed below 25\u00b0F",
  "Soil stabilization, chemical treatment, or over-excavation/under-cutting",
  "Erosion control, SWPPP preparation, implementation, or maintenance",
  "Private utility locating (sprinklers, dog fences, fiber lines, etc.)",
  "Contaminated soil handling, asbestos abatement, or hazardous materials",
  "Temporary access roads, fine/finish grading, or site restoration beyond rough grade",
  "Work by others, delays by others, or additional mobilizations",
  "Backcharges not accepted without 48-hour written notice to cure",
  "No as-built drawings, surveying, or record documentation included",
  "Hard materials (rock, concrete, reinforced slabs, etc.) will be billed as extra",
  "Winter conditions, frost removal, or heating/thawing operations excluded unless noted"
];

const COMMERCIAL_TERMS = [
  "Proposal valid for 30 days; may be withdrawn if not accepted within 10 days",
  "Work scheduled upon receipt of signed acceptance and deposit (if applicable)",
  "Due to supply chain conditions, pricing and material availability cannot be guaranteed until purchase",
  "RD McKinney will contact Iowa One Call (811) for public locates",
  "Customer responsible for locating private utilities. Contractor not liable for unmarked or inaccurately marked lines",
  "Site grades and access to be verified by others before mobilization",
  "Contractor not responsible for existing pavement, curb, or surface breakage unless proven negligent",
  "All labor and materials warranted for one year under normal use",
  "Change Orders: Any deviation or additional work must be approved in writing before proceeding",
  "Delays: RD McKinney not responsible for delays caused by weather, material shortages, acts of God, or others",
  "Payment: Invoices issued bi-weekly for completed work/materials. Owner has 7 days to dispute; otherwise invoice is deemed accepted. Payment due 14 days from invoice date. Late payments accrue prime + 5% interest (minimum $50 fee). Nonpayment may result in work stoppage and lien filing",
  "Insurance: Standard coverage maintained; additional coverage billed as extra if required",
  "Governing Law: Subject to Iowa law; venue Dallas County",
  "Acceptance: Commencement of work or payment of deposit constitutes acceptance of these terms and conditions"
];

// ===== DEFAULT SETTINGS =====
const DEFAULT_SETTINGS = {
  defaultMarkupPct: 20,
  defaultOverheadPct: 10,
  defaultBondPct: 2.5,
  defaultConsumables: 100,
  defaultTaxRate: 7,
  standardExclusions: [...RESIDENTIAL_EXCLUSIONS],
  residentialExclusions: [...RESIDENTIAL_EXCLUSIONS],
  residentialTerms: [...RESIDENTIAL_TERMS],
  commercialExclusions: [...COMMERCIAL_EXCLUSIONS],
  commercialTerms: [...COMMERCIAL_TERMS],
  laborRates: [],
  equipmentRates: [],
  crewCompositions: [],
  bidTemplates: [],
  pendingCatalogItems: [],
  estimatorControls: {
    defaultMode: 'simple',
    defaultShowPrices: false,
    lockShowPrices: false,
    defaultShowQty: false,
    lockShowQty: false,
    defaultOverhead: true,
    canToggleOverhead: true,
    defaultBond: true,
    canToggleBond: true,
    defaultLumpSum: true,
    lockLumpSum: false,
    canSwitchMode: true,
    defaultConsumables: 100,
    approvalLocks: true
  }
};

// ===== USERS =====
const USERS = {
  '8232': { name: 'Bob', role: 'estimator' },
  '5390': { name: 'Cody', role: 'estimator' },
  '1638': { name: 'Ryan', role: 'admin' }
};

// ===== STATE =====
let currentUser = null;
let currentBid = null;
let allBids = [];
let appSettings = null;
let catalogSelectedItem = null;
let qbCustomers = [];
let currentAdvTab = 'items';

// ===== AUTO-SAVE =====
let autoSaveTimer = null;
function scheduleAutoSave() {
  if (autoSaveTimer) clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(async () => {
    if (!currentBid) return;
    try {
      await saveBid(true);
      const ind = document.getElementById('autoSaveIndicator');
      if (ind) {
        ind.textContent = '✓ Auto-saved';
        ind.style.opacity = '1';
        setTimeout(() => { ind.style.opacity = '0'; }, 2000);
      }
    } catch(e) { /* silent fail */ }
  }, 3000);
}

// ===== HELPERS =====
function $(id) { return document.getElementById(id); }
function $$(sel, ctx) { return (ctx || document).querySelectorAll(sel); }
function uid(pre) { return pre + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5); }
function money(n) {
  if (n == null || isNaN(n)) return '$0.00';
  return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function escHtml(s) {
  const d = document.createElement('div');
  d.textContent = s || '';
  return d.innerHTML;
}

// ===== TOAST =====
let toastTimer = null;
function showToast(msg, isError) {
  const t = $('toast');
  t.textContent = msg;
  t.className = 'toast show' + (isError ? ' error' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.className = 'toast', 2500);
}

// ===== SCREENS =====
function showScreen(id) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
  window.scrollTo(0, 0);
}

// ===== SUPABASE SHARED STORAGE =====
// Uses the Supabase *anon* key (safe to ship in client code — access is
// controlled by Row Level Security policies on the 'bids' storage bucket, see
// SUPABASE_SETUP.md). Filled in at build/deploy time via config.js — never
// put a service_role key here, it bypasses RLS entirely.
const SUPA_URL = (window.__RDMPE_CONFIG__ && window.__RDMPE_CONFIG__.supabaseUrl) || 'https://vjhhhmgzvwdxrxkthrpx.supabase.co';
const SUPA_KEY = (window.__RDMPE_CONFIG__ && window.__RDMPE_CONFIG__.supabaseAnonKey) || '';

// In-memory cache to reduce API calls
let _bidsCache = null;
let _bidsCacheTime = 0;
const CACHE_TTL = 3000; // 3 second cache

async function supaRead(bucket, file) {
  try {
    const resp = await fetch(SUPA_URL + '/storage/v1/object/public/' + bucket + '/' + file + '?_=' + Date.now());
    if (!resp.ok) return null;
    const text = await resp.text();
    if (!text || text.startsWith('{"statusCode')) return null;
    return JSON.parse(text);
  } catch(e) { return null; }
}

async function supaWrite(bucket, file, data) {
  const resp = await fetch(SUPA_URL + '/storage/v1/object/' + bucket + '/' + file, {
    method: 'POST',
    headers: {
      'apikey': SUPA_KEY,
      'Authorization': 'Bearer ' + SUPA_KEY,
      'Content-Type': 'application/json',
      'x-upsert': 'true'
    },
    body: JSON.stringify(data)
  });
  if (!resp.ok) throw new Error('Storage write failed');
}

async function getBids(forceRefresh) {
  if (!forceRefresh && _bidsCache && (Date.now() - _bidsCacheTime < CACHE_TTL)) return _bidsCache;
  const bids = await supaRead('bids', 'all-bids.json');
  _bidsCache = bids || [];
  _bidsCacheTime = Date.now();
  return _bidsCache;
}

async function saveBidsArray(bids) {
  _bidsCache = bids;
  _bidsCacheTime = Date.now();
  await supaWrite('bids', 'all-bids.json', bids);
}

async function api(action, opts = {}) {
  if (action === 'list') {
    const bids = await getBids(true);
    return bids.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  if (action === 'get') {
    const bids = await getBids();
    return bids.find(b => b.id === opts.id) || null;
  }
  if (action === 'save') {
    let bids = await getBids(true);
    const idx = bids.findIndex(b => b.id === opts.body.id);
    if (idx >= 0) bids[idx] = opts.body; else bids.push(opts.body);
    await saveBidsArray(bids);
    return opts.body;
  }
  if (action === 'delete') {
    let bids = await getBids(true);
    bids = bids.filter(b => b.id !== opts.id);
    await saveBidsArray(bids);
    return { success: true };
  }
  if (action === 'getSettings') {
    return await supaRead('settings', 'app-settings.json');
  }
  if (action === 'saveSettings') {
    await supaWrite('settings', 'app-settings.json', opts.body);
    return opts.body;
  }
  return null;
}

// ===== SETTINGS =====
async function loadSettings() {
  appSettings = await api('getSettings');
  if (!appSettings) appSettings = { ...DEFAULT_SETTINGS };
  // Load catalog from shared storage — merge any new DEFAULT_CATALOG items
  try {
    const savedCatalog = await api('getCatalog');
    if (savedCatalog && savedCatalog.length > 0) {
      CATALOG = savedCatalog;
      // Merge any new items from DEFAULT_CATALOG that aren't in saved catalog
      const existingDescs = new Set(CATALOG.map(it => it.d));
      let added = 0;
      DEFAULT_CATALOG.forEach(di => {
        if (!existingDescs.has(di.d)) {
          CATALOG.push(di);
          added++;
        }
      });
      if (added > 0) {
        console.log('Merged ' + added + ' new catalog items from defaults');
        api('saveCatalog', { body: CATALOG }).catch(() => {});
      }
    } else {
      CATALOG = [...DEFAULT_CATALOG];
      await api('saveCatalog', { body: DEFAULT_CATALOG });
    }
  } catch(e) {
    CATALOG = [...DEFAULT_CATALOG];
  }
}

// ===== LOGIN =====
let pinBuffer = '';
function initLogin() {
  pinBuffer = '';
  updatePinDots();
  $('pinError').classList.remove('show');

  // Keypad clicks
  $('pinPad').addEventListener('click', e => {
    const btn = e.target.closest('.pin-btn');
    if (!btn) return;
    if (btn.dataset.digit !== undefined) {
      if (pinBuffer.length < 4) {
        pinBuffer += btn.dataset.digit;
        updatePinDots();
        if (pinBuffer.length === 4) attemptLogin();
      }
    } else if (btn.dataset.action === 'backspace') {
      pinBuffer = pinBuffer.slice(0, -1);
      updatePinDots();
      $('pinError').classList.remove('show');
    } else if (btn.dataset.action === 'enter') {
      if (pinBuffer.length === 4) attemptLogin();
    }
  });

  // Physical keyboard
  document.addEventListener('keydown', e => {
    if (!$('loginScreen').classList.contains('active')) return;
    if (e.key >= '0' && e.key <= '9') {
      if (pinBuffer.length < 4) {
        pinBuffer += e.key;
        updatePinDots();
        if (pinBuffer.length === 4) attemptLogin();
      }
    } else if (e.key === 'Backspace') {
      pinBuffer = pinBuffer.slice(0, -1);
      updatePinDots();
      $('pinError').classList.remove('show');
    } else if (e.key === 'Enter') {
      if (pinBuffer.length === 4) attemptLogin();
    }
  });
}

function updatePinDots() {
  const dots = $$('#pinDots .dot');
  dots.forEach((d, i) => d.classList.toggle('filled', i < pinBuffer.length));
}

async function attemptLogin() {
  const user = USERS[pinBuffer];
  if (user) {
    currentUser = user;
    $('pinError').classList.remove('show');
    try {
      await showDashboard();
    } catch(e) {
      console.error('Dashboard load error:', e);
      showDashboard().catch(() => {});
    }
  } else {
    $('pinError').classList.add('show');
    $('pinDots').classList.add('shake');
    setTimeout(() => {
      $('pinDots').classList.remove('shake');
      pinBuffer = '';
      updatePinDots();
    }, 500);
  }
}

// ===== DASHBOARD =====
async function showDashboard() {
  showScreen('dashboardScreen');
  // Hide floating submit bar when returning to dashboard
  const fb = document.getElementById('estimatorFloatBar');
  if (fb) fb.style.display = 'none';
  $('welcomeUser').textContent = 'Welcome, ' + currentUser.name;
  if ($('hubBtn')) $('hubBtn').style.display = embeddedMode ? '' : 'none';
  if ($('logoutBtn')) $('logoutBtn').style.display = embeddedMode ? 'none' : '';
  $('settingsBtn').style.display = currentUser.role === 'admin' ? '' : 'none';
  const suggestSection = $('suggestItemSection');
  if (suggestSection) suggestSection.style.display = currentUser.role === 'estimator' ? 'block' : 'none';
  // Hide import button for estimators
  if ($('importBidBtn')) $('importBidBtn').style.display = currentUser.role === 'admin' ? '' : 'none';
  // Show pending catalog badge
  const pendingCount = (appSettings?.pendingCatalogItems || []).length;
  const settingsBtn = $('settingsBtn');
  if (settingsBtn && currentUser.role === 'admin') {
    settingsBtn.textContent = pendingCount > 0 ? `Settings (${pendingCount})` : 'Settings';
  }
  await loadBids();
  renderBids();
}

async function loadBids() {
  try { allBids = await api('list'); } catch (e) { allBids = []; showToast('Failed to load bids', true); }
}

function renderBids(filter) {
  if (!filter) filter = document.querySelector('.filter-tab.active')?.dataset.filter || 'all';
  const list = $('bidsList');
  
  // Update badge counts on filter tabs
  updateFilterBadges();
  
  // Show alert banner for Ryan if there are submitted/returned bids
  updateDashboardAlert();
  
  let bids = allBids;
  if (filter !== 'all') bids = bids.filter(b => b.status === filter);
  // Search filter
  const searchTerm = ($('bidSearch')?.value || '').trim().toLowerCase();
  if (searchTerm) {
    bids = bids.filter(b => {
      const hay = [b.bidNumber, b.clientName, b.projectAddress, b.projectDescription, b.clientContact].filter(Boolean).join(' ').toLowerCase();
      return hay.includes(searchTerm);
    });
  }
  if (bids.length === 0) {
    list.innerHTML = '<div class="empty-msg">' + (allBids.length === 0 ? 'No bids yet. Create your first bid!' : (searchTerm ? 'No bids match your search.' : 'No bids match this filter.')) + '</div>';
    return;
  }
  try {
    const isEstimatorUser = currentUser.role === 'estimator';
    list.innerHTML = bids.map(b => {
      const returnedNote = (b.status === 'returned' && b.sendBackNotes) ? 
        `<span class="bid-card-returned">↩️ ${escHtml(b.sendBackNotes.substring(0,50))}${b.sendBackNotes.length > 50 ? '...' : ''}</span>` : '';
      const total = calcBidTotal(b);
      // Action hints for estimators
      let hintHtml = '';
      if (isEstimatorUser) {
        if (b.status === 'submitted') hintHtml = '<span class="bid-card-hint">Awaiting Ryan\'s review</span>';
        else if (b.status === 'returned') hintHtml = '<span class="bid-card-hint">Tap to edit &amp; resubmit</span>';
        else if (b.status === 'approved') hintHtml = '<span class="bid-card-hint">Ready to send!</span>';
      }
      return `
      <div class="bid-card" data-id="${b.id}">
        <div class="bid-card-left">
          <span class="bid-card-num">${escHtml(b.bidNumber || 'Draft')}</span>
          <span class="bid-card-client">${escHtml(b.clientName || 'Untitled')}</span>
          <span class="bid-card-date">${b.createdAt ? new Date(b.createdAt).toLocaleDateString() : ''}</span>
          ${returnedNote}
        </div>
        <div class="bid-card-right">
          <span class="bid-card-total">${money(total)}</span>
          <span class="status-badge status-${b.status}">${b.status}</span>
          ${b.won ? '<span class="status-badge status-won">🏆 WON</span>' : ''}
          ${hintHtml}
          ${b.status === 'approved' && currentUser.role === 'admin' ? `<button class="btn-share" onclick="event.stopPropagation();toggleWon('${b.id}')" title="${b.won ? 'Un-mark as won' : 'Mark as won — we got the job!'}">${b.won ? '❌' : '🏆'}</button>` : ''}
          <button class="btn-share" onclick="event.stopPropagation();duplicateBidFromDashboard('${b.id}')" title="Duplicate bid">📋</button>
          ${currentUser.role === 'admin' ? `<button class="btn-share" onclick="event.stopPropagation();showShareModal(allBids.find(x=>x.id==='${b.id}'))" title="Share">📤</button>` : ''}
          ${currentUser.role === 'admin' ? `<button class="btn-card-delete" onclick="event.stopPropagation();deleteBidFromDashboard('${b.id}')" title="Delete bid">🗑️</button>` : ''}
        </div>
      </div>`;
    }).join('');
  } catch(err) {
    console.error('renderBids error:', err);
    list.innerHTML = '<div class="empty-msg">Error loading bids. Please refresh.</div>';
  }
}

async function duplicateBidFromDashboard(id) {
  const src = allBids.find(b => b.id === id);
  if (!src) return;
  if (!confirm(`Duplicate ${src.bidNumber || 'this bid'} (${src.clientName || 'Untitled'})?\n\nA new draft copy will be created.`)) return;
  const copy = JSON.parse(JSON.stringify(src));
  copy.id = uid('bid');
  copy.bidNumber = generateBidNumber();
  copy.status = 'draft';
  copy.createdBy = currentUser.name.toLowerCase();
  copy.clientName = (src.clientName || 'Untitled') + ' (Copy)';
  copy.createdAt = new Date().toISOString();
  copy.updatedAt = new Date().toISOString();
  copy.approvedAt = null;
  copy.won = false;
  copy.wonAt = null;
  delete copy.sendBackNotes;
  delete copy.sentBackAt;
  delete copy.approvalLockedDisplay;
  try {
    await api('save', { body: copy });
    allBids.unshift(copy);
    renderBids();
    showToast(`📋 Duplicated as ${copy.bidNumber} — it's in your Drafts.`);
  } catch (e) {
    showToast('Duplicate failed: ' + e.message, true);
  }
}

async function toggleWon(id) {
  const b = allBids.find(x => x.id === id);
  if (!b) return;
  b.won = !b.won;
  b.wonAt = b.won ? new Date().toISOString() : null;
  try {
    await api('save', { body: b });
    renderBids();
    showToast(b.won ? '🏆 Marked as WON! Open the bid to print a Field Work Order.' : 'Un-marked as won.');
  } catch (e) {
    b.won = !b.won;
    showToast('Failed: ' + e.message, true);
  }
}

function updateFilterBadges() {
  const counts = { all: allBids.length, draft: 0, submitted: 0, returned: 0, approved: 0 };
  allBids.forEach(b => { if (counts[b.status] !== undefined) counts[b.status]++; });
  document.querySelectorAll('.filter-tab').forEach(tab => {
    const f = tab.dataset.filter;
    const count = counts[f] || 0;
    // Remove existing badge
    const existing = tab.querySelector('.filter-badge');
    if (existing) existing.remove();
    // Add badge
    const badge = document.createElement('span');
    badge.className = 'filter-badge' + (count === 0 ? ' zero' : '');
    badge.textContent = count;
    tab.appendChild(badge);
  });
}

function updateDashboardAlert() {
  const alert = $('dashboardAlert');
  if (!alert || !currentUser) return;
  
  const submittedCount = allBids.filter(b => b.status === 'submitted').length;
  const returnedCount = allBids.filter(b => b.status === 'returned').length;
  const isAdminUser = currentUser.role === 'admin';
  const isEstimatorUser = currentUser.role === 'estimator';
  
  if (isAdminUser && submittedCount > 0) {
    alert.style.display = 'flex';
    alert.innerHTML = `
      <span class="dashboard-alert-icon">🔔</span>
      <div class="dashboard-alert-text">
        <strong>${submittedCount} bid${submittedCount > 1 ? 's' : ''} awaiting your review</strong>
        Click to see bids that need your approval
      </div>
      <button class="dashboard-alert-btn" onclick="event.stopPropagation();document.querySelector('.filter-tab[data-filter=submitted]').click()">Review Now</button>
    `;
    alert.onclick = () => document.querySelector('.filter-tab[data-filter="submitted"]').click();
  } else if (isEstimatorUser && returnedCount > 0) {
    alert.style.display = 'flex';
    alert.innerHTML = `
      <span class="dashboard-alert-icon">↩️</span>
      <div class="dashboard-alert-text">
        <strong>${returnedCount} bid${returnedCount > 1 ? 's' : ''} sent back for changes</strong>
        Ryan sent ${returnedCount > 1 ? 'these bids' : 'this bid'} back with notes
      </div>
      <button class="dashboard-alert-btn" onclick="event.stopPropagation();document.querySelector('.filter-tab[data-filter=returned]').click()">View Now</button>
    `;
    alert.onclick = () => document.querySelector('.filter-tab[data-filter="returned"]').click();
  } else {
    alert.style.display = 'none';
  }
}

function calcBidTotal(bid) {
  let t = 0;
  // Simple mode items
  (bid.items || []).forEach(it => { t += calcItemTotal(it); });
  (bid.laborItems || []).forEach(it => { t += calcLaborTotal(it); });
  // Advanced mode items
  let advSubtotal = 0;
  (bid.advancedItems || []).forEach(item => { advSubtotal += calcAdvItemExtension(item); });
  t += advSubtotal;
  // Project-level bond (% of items bid price) — Advanced mode only
  if (bid.bondEnabled !== false && (bid.advancedItems || []).length > 0) {
    const bondPct = (appSettings || DEFAULT_SETTINGS).defaultBondPct || 2.5;
    t += advSubtotal * bondPct / 100;
  }
  // Consumables
  t += parseFloat(bid.consumables) || 0;
  // Sales tax
  t += calcSalesTax(bid);
  return t;
}

function calcItemTotal(it) {
  const base = (it.qty || 0) * (it.unitCost || 0);
  if (it.noMarkup) return base;
  const mu = base * (it.markupPct || 0) / 100;
  const oh = (currentBid && currentBid.overheadEnabled !== false) ? base * (it.overheadPct || 0) / 100 : 0;
  // Bond on contract amount (base + markup + overhead)
  const bo = (currentBid && currentBid.bondEnabled !== false) ? (base + mu + oh) * (it.bondPct || 0) / 100 : 0;
  return base + mu + oh + bo;
}

function calcLaborTotal(it) {
  const base = (it.hours || 0) * (it.rate || 0);
  if (it.noMarkup) return base;
  const mu = base * (it.markupPct || 0) / 100;
  const oh = (currentBid && currentBid.overheadEnabled !== false) ? base * (it.overheadPct || 0) / 100 : 0;
  // Bond on contract amount (base + markup + overhead)
  const bo = (currentBid && currentBid.bondEnabled !== false) ? (base + mu + oh) * (it.bondPct || 0) / 100 : 0;
  return base + mu + oh + bo;
}

function calcSalesTax(bid) {
  if (!bid || bid.taxEnabled === false) return 0;
  const rate = (bid.taxRate != null ? bid.taxRate : (appSettings || DEFAULT_SETTINGS).defaultTaxRate || 7) / 100;
  let taxableBase = 0;

  // Always include simple items
  (bid.items || []).forEach(it => {
    if (it.taxable !== false) {
      taxableBase += (it.qty || 0) * (it.unitCost || 0);
    }
  });

  // Also include advanced items if any exist (base bid only — alternates taxed separately)
  (bid.advancedItems || []).forEach(item => {
    if (item.isAlternate) return;
    (item.costs || []).forEach(c => {
      if ((c.type === 'material' || c.type === 'subcontractor') && c.taxable !== false) {
        taxableBase += (c.qty || 0) * (c.unitCost || 0);
      }
    });
  });

  return taxableBase * rate;
}

// Sales tax attributable to one advanced item (used for alternates on the proposal)
function calcAdvItemSalesTax(bid, item) {
  if (!bid || bid.taxEnabled === false) return 0;
  const rate = (bid.taxRate != null ? bid.taxRate : (appSettings || DEFAULT_SETTINGS).defaultTaxRate || 7) / 100;
  let base = 0;
  (item.costs || []).forEach(c => {
    if ((c.type === 'material' || c.type === 'subcontractor') && c.taxable !== false) {
      base += (c.qty || 0) * (c.unitCost || 0);
    }
  });
  return base * rate;
}


// ===== SMART DEFAULTS FOR SIMPLE MODE =====
function getSmartDefaults(itemType) {
  const s = appSettings || DEFAULT_SETTINGS;
  if (!currentBid || currentBid.estimateMode !== 'simple') {
    return { markupPct: s.defaultMarkupPct, overheadPct: s.defaultOverheadPct, bondPct: s.defaultBondPct };
  }
  // Simple mode: materials get markup only, labor/equip get markup + overhead
  if (itemType === 'material' || itemType === 'catalog') {
    return { markupPct: s.defaultMarkupPct, overheadPct: 0, bondPct: 0 };
  }
  // Labor and Equipment get markup + overhead
  return { markupPct: s.defaultMarkupPct, overheadPct: s.defaultOverheadPct, bondPct: 0 };
}

// ===== BID NUMBER GENERATION =====
function generateBidNumber() {
  const year = new Date().getFullYear();
  let maxNum = 0;
  allBids.forEach(b => {
    if (b.bidNumber && b.bidNumber.startsWith(year + '-')) {
      const n = parseInt(b.bidNumber.split('-')[1], 10);
      if (n > maxNum) maxNum = n;
    }
  });
  return year + '-' + String(maxNum + 1).padStart(3, '0');
}

// ===== NEW BID =====
function getDefaultExclusions(jobType) {
  const s = appSettings || DEFAULT_SETTINGS;
  if (jobType === 'commercial') {
    return (s.commercialExclusions || COMMERCIAL_EXCLUSIONS).map(t => ({ text: t, checked: true }));
  }
  return (s.residentialExclusions || RESIDENTIAL_EXCLUSIONS).map(t => ({ text: t, checked: true }));
}

function getDefaultTerms(jobType) {
  const s = appSettings || DEFAULT_SETTINGS;
  if (jobType === 'commercial') {
    return (s.commercialTerms || COMMERCIAL_TERMS).map(t => ({ text: t, checked: true }));
  }
  return (s.residentialTerms || RESIDENTIAL_TERMS).map(t => ({ text: t, checked: true }));
}

function createNewBid() {
  const s = appSettings || DEFAULT_SETTINGS;
  const ec = s.estimatorControls || {};
  currentBid = {
    id: uid('bid'),
    bidNumber: generateBidNumber(),
    status: 'draft',
    createdBy: currentUser.name.toLowerCase(),
    clientName: '',
    clientContact: '',
    clientEmail: '',
    clientPhone: '',
    qbCustomerId: '',
    projectAddress: '',
    projectDescription: '',
    items: [],
    laborItems: [],
    jobType: 'residential',
    exclusions: getDefaultExclusions('residential'),
    terms: getDefaultTerms('residential'),
    customExclusions: '',
    customerNotes: '',
    showUnitPrices: currentUser.role === 'admin' ? true : (ec.defaultShowPrices || false),
    showQty: currentUser.role === 'admin' ? true : (ec.defaultShowQty || false),
    overheadEnabled: currentUser.role === 'admin' ? true : (ec.defaultOverhead !== false),
    bondEnabled: currentUser.role === 'admin' ? true : (ec.defaultBond !== false),
    consumables: currentUser.role === 'admin' ? (s.defaultConsumables || 100) : (ec.defaultConsumables || s.defaultConsumables || 100),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    approvedAt: null,
    estimateMode: ec.defaultMode || 'simple',
    advancedItems: [],
    taxRate: s.defaultTaxRate || 7,
    taxEnabled: true
  };
  openBuilder();
}

// ===== COLLAPSIBLE SECTIONS =====
function makeCollapsible(sectionEl, headerEl, defaultOpen) {
  if (defaultOpen === undefined) defaultOpen = true;
  if (!sectionEl || !headerEl) return;
  headerEl.style.cursor = 'pointer';
  headerEl.style.userSelect = 'none';
  headerEl.style.display = 'flex';
  headerEl.style.justifyContent = 'space-between';
  headerEl.style.alignItems = 'center';

  // Add toggle icon if not present
  if (!headerEl.querySelector('.collapse-icon')) {
    var icon = document.createElement('span');
    icon.className = 'collapse-icon';
    icon.textContent = defaultOpen ? '▼' : '▶';
    icon.style.fontSize = '12px';
    icon.style.transition = 'transform 0.2s';
    headerEl.appendChild(icon);
  }

  // Get the content (everything after the header in the section)
  var contentEls = [];
  var sibling = headerEl.nextElementSibling;
  while (sibling) {
    contentEls.push(sibling);
    sibling = sibling.nextElementSibling;
  }

  // Wrap content in a div if not already
  var contentWrapper = sectionEl.querySelector('.collapsible-content');
  if (!contentWrapper) {
    contentWrapper = document.createElement('div');
    contentWrapper.className = 'collapsible-content';
    contentEls.forEach(function(el) { contentWrapper.appendChild(el); });
    sectionEl.appendChild(contentWrapper);
  }

  if (!defaultOpen) {
    contentWrapper.style.display = 'none';
  }

  headerEl.addEventListener('click', function() {
    var isOpen = contentWrapper.style.display !== 'none';
    contentWrapper.style.display = isOpen ? 'none' : '';
    var ic = headerEl.querySelector('.collapse-icon');
    if (ic) ic.textContent = isOpen ? '▶' : '▼';
  });
}

// ===== ADVANCED MODE TABS (B2W-style) =====
function switchAdvTab(tab) {
  currentAdvTab = tab;
  // Update tab buttons
  document.querySelectorAll('#advTabBar .adv-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  
  // References to sections
  const custSection = $('customerProjectSection');
  const advBuilder = $('advancedBuilder');
  const pricingPanel = $('pricingTabPanel');
  const summPanel = $('advBidSummary');
  const exclSection = document.querySelector('.exclusions-section');
  const bidCtrl = document.querySelector('.bid-controls-section');
  const notesSection = $('customerNotes')?.closest('.builder-section');
  const propOpts = document.querySelector('.proposal-options-section');
  const catalogPanel = $('catalogPanel');
  const simpleBuilder = $('simpleBuilder');
  const simpleSummary = $('simpleSummarySection');
  
  const hide = el => { if (el) el.style.display = 'none'; };
  const show = el => { if (el) el.style.display = ''; };
  
  // Always hide simple mode elements in Advanced
  hide(simpleBuilder);
  hide(simpleSummary);
  
  // Hide everything first
  hide(custSection);
  hide(advBuilder);
  hide(pricingPanel);
  hide(summPanel);
  hide(exclSection);
  hide(bidCtrl);
  hide(notesSection);
  hide(propOpts);
  hide(catalogPanel);
  
  // Remove tab-mode from summary
  if (summPanel) summPanel.classList.remove('tab-mode');
  
  switch(tab) {
    case 'items':
      show(custSection);
      show(advBuilder);
      // Don't show catalog by default — user clicks "+ From Catalog" or "+ Add Item"
      break;
    case 'pricing':
      show(pricingPanel);
      renderPricingTab();
      break;
    case 'summary':
      show(summPanel);
      if (summPanel) summPanel.classList.add('tab-mode');
      updateAdvBidSummary(currentBid);
      break;
    case 'settings': {
      show(exclSection);
      var isEstUser = currentUser && currentUser.role === 'estimator';
      if (!isEstUser) {
        show(bidCtrl);
        show(propOpts);
      }
      show(notesSection);
      // Force-expand all collapsible sections in Settings tab (deferred for DOM)
      setTimeout(function() {
        [exclSection, bidCtrl, notesSection, propOpts].forEach(function(s) {
          if (!s) return;
          var cc = s.querySelector('.collapsible-content');
          if (cc) cc.style.display = '';
          var ic = s.querySelector('.collapse-icon');
          if (ic) ic.textContent = '\u25bc';
        });
      }, 10);
      break;
    }
  }
  
  // Update item count badge
  const itemCount = (currentBid?.advancedItems || []).length;
  if ($('tabItemCount')) $('tabItemCount').textContent = itemCount;
}

function getItemEffectivePcts(item) {
  // Get effective markup% and OH% for an item (weighted average across costs)
  let totalBase = 0, weightedMU = 0, weightedOH = 0;
  (item.costs || []).forEach(c => {
    const base = (c.qty || 0) * (c.unitCost || 0);
    if (base > 0) {
      totalBase += base;
      weightedMU += base * (c.markupPct || 0);
      weightedOH += base * (c.overheadPct || 0);
    }
  });
  return {
    markupPct: totalBase > 0 ? weightedMU / totalBase : (appSettings || DEFAULT_SETTINGS).defaultMarkupPct,
    overheadPct: totalBase > 0 ? weightedOH / totalBase : (appSettings || DEFAULT_SETTINGS).defaultOverheadPct
  };
}

function applyItemMarkupPct(item, newMU) {
  (item.costs || []).forEach(c => { c.markupPct = newMU; });
}

function applyItemOverheadPct(item, newOH) {
  (item.costs || []).forEach(c => { c.overheadPct = newOH; });
}

function setItemBidUnit(item, newBidUnit) {
  // Proportionally adjust markup% and overhead% to achieve new bid unit price.
  // Keeps the ratio between MU% and OH% intact so both scale together.
  if (item.noMarkup) {
    item.bidUnitOverride = Math.round(newBidUnit * 100) / 100;
    return;
  }
  let itemDirect = 0;
  (item.costs || []).forEach(c => { itemDirect += (c.qty || 0) * (c.unitCost || 0); });
  const qty = item.qty || 0;
  if (qty <= 0 || itemDirect <= 0) {
    item.bidUnitOverride = Math.round(newBidUnit * 100) / 100;
    return;
  }
  const newTotal = newBidUnit * qty;
  const adder = newTotal - itemDirect;
  if (adder <= 0) {
    // Below cost — zero out percentages, use override for exact price
    applyItemMarkupPct(item, 0);
    applyItemOverheadPct(item, 0);
    item.bidUnitOverride = Math.round(newBidUnit * 100) / 100;
    return;
  }
  const totalPctNeeded = (adder / itemDirect) * 100;
  const pcts = getItemEffectivePcts(item);
  const currentTotal = pcts.markupPct + pcts.overheadPct;
  let newMU, newOH;
  if (currentTotal > 0) {
    newMU = totalPctNeeded * (pcts.markupPct / currentTotal);
    newOH = totalPctNeeded * (pcts.overheadPct / currentTotal);
  } else {
    // Both were zero — put adder into markup
    newMU = totalPctNeeded;
    newOH = 0;
  }
  newMU = Math.round(newMU * 10) / 10;
  newOH = Math.round(newOH * 10) / 10;
  applyItemMarkupPct(item, newMU);
  applyItemOverheadPct(item, newOH);
  // Keep override so the exact typed price displays (avoids rounding from MU%/OH%)
  item.bidUnitOverride = Math.round(newBidUnit * 100) / 100;
}

function setItemTargetMargin(item, targetPct) {
  // Back-calculate bid unit to achieve target margin, then proportionally adjust MU%/OH%
  let itemDirect = 0;
  (item.costs || []).forEach(c => { itemDirect += (c.qty || 0) * (c.unitCost || 0); });
  const qty = item.qty || 0;
  if (qty <= 0 || targetPct >= 100 || itemDirect <= 0) return;
  const targetExt = itemDirect / (1 - targetPct / 100);
  const newBidUnit = targetExt / qty;
  setItemBidUnit(item, newBidUnit);
}

// Format percentage for display: "25" if whole, "25.7" if fractional
function fmtPctVal(n) {
  const r = Math.round(n * 10) / 10;
  return r % 1 === 0 ? String(Math.round(r)) : r.toFixed(1);
}

function renderPricingTab() {
  const body = $('pricingBody');
  const cards = $('pricingCards');
  if (!body && !cards) return;
  if (!currentBid || !currentBid.advancedItems || !currentBid.advancedItems.length) {
    if (body) body.innerHTML = '<tr><td colspan="12" style="text-align:center;padding:40px;color:#a0aec0;font-size:0.95rem;">No items yet. Add items on the <strong>Items</strong> tab first.</td></tr>';
    if (cards) cards.innerHTML = '<div style="text-align:center;padding:40px;color:#a0aec0;">No items yet. Add items on the <strong>Items</strong> tab first.</div>';
    return;
  }
  
  const items = currentBid.advancedItems;
  const sorted = items.map((it, i) => ({...it, _origIdx: i})).sort((a, b) => (a.itemNumber || 0) - (b.itemNumber || 0));
  let totalDirect = 0, totalMarkup = 0, totalOH = 0, totalBid = 0;
  
  const tableRows = [];
  const cardHtml = [];
  
  sorted.forEach(item => {
    let itemDirect = 0, itemMU = 0, itemOH = 0;
    (item.costs || []).forEach(c => {
      const base = (c.qty || 0) * (c.unitCost || 0);
      const mu = item.noMarkup ? 0 : base * (c.markupPct || 0) / 100;
      const oh = item.noMarkup ? 0 : base * (c.overheadPct || 0) / 100;
      itemDirect += base;
      itemMU += mu;
      itemOH += oh;
    });
    
    const qty = item.qty || 0;
    const unit = item.unit || 'EA';
    const directPerUnit = qty > 0 ? itemDirect / qty : 0;
    const calcTotal = itemDirect + itemMU + itemOH;
    const calcUnit = qty > 0 ? calcTotal / qty : 0;
    const actualBidUnit = calcAdvItemBidUnit(item);
    const actualExt = calcAdvItemExtension(item);
    const hasOverride = item.bidUnitOverride != null && item.bidUnitOverride !== '';
    const marginDollar = actualExt - itemDirect;
    const marginPct = actualExt > 0 ? (marginDollar / actualExt * 100) : 0;
    const pcts = getItemEffectivePcts(item);
    
    totalDirect += itemDirect;
    totalMarkup += itemMU;
    totalOH += itemOH;
    totalBid += actualExt;
    
    const mc = marginPct >= 30 ? 'margin-good' : (marginPct >= 15 ? 'margin-ok' : 'margin-low');
    const mcColor = marginPct >= 30 ? '#276749' : (marginPct >= 15 ? '#b7791f' : '#c53030');
    const idx = item._origIdx;
    
    // Desktop table row
    tableRows.push(`<tr>
      <td>${item.itemNumber || ''}</td>
      <td>${escHtml(item.description || '')}</td>
      <td>${fmtNum(qty)}</td>
      <td>${escHtml(unit)}</td>
      <td>${money(directPerUnit)}</td>
      <td><input type="number" class="pricing-input" data-field="mu" data-idx="${idx}" value="${fmtPctVal(pcts.markupPct)}" step="0.1" min="0"></td>
      <td><input type="number" class="pricing-input" data-field="oh" data-idx="${idx}" value="${fmtPctVal(pcts.overheadPct)}" step="0.1" min="0"></td>
      <td>${money(calcUnit)}</td>
      <td><input type="number" class="pricing-bid-input" data-field="bid" data-idx="${idx}" value="${actualBidUnit.toFixed(2)}" step="0.01" min="0"></td>
      <td><strong>${money(actualExt)}</strong></td>
      <td><input type="number" class="pricing-margin-input" data-field="margin" data-idx="${idx}" value="${fmtPctVal(marginPct)}" step="0.1" min="0" max="99"></td>
      <td class="margin-cell ${mc}">${money(marginDollar)}</td>
    </tr>`);
    
    // Mobile card
    cardHtml.push(`<div class="pricing-card">
      <div class="pricing-card-header">
        <div class="pricing-card-num">${item.itemNumber || ''}</div>
        <div class="pricing-card-desc">${escHtml(item.description || '')}</div>
        <div class="pricing-card-info">${fmtNum(qty)} ${escHtml(unit)}<br>Direct: ${money(directPerUnit)}/unit</div>
      </div>
      <div class="pricing-card-fields">
        <div class="pricing-card-field">
          <label>Markup %</label>
          <input type="number" data-field="mu" data-idx="${idx}" value="${fmtPctVal(pcts.markupPct)}" step="0.1" min="0">
        </div>
        <div class="pricing-card-field">
          <label>Overhead %</label>
          <input type="number" data-field="oh" data-idx="${idx}" value="${fmtPctVal(pcts.overheadPct)}" step="0.1" min="0">
        </div>
        <div class="pricing-card-field">
          <label>Target Margin %</label>
          <input type="number" class="margin-input" data-field="margin" data-idx="${idx}" value="${fmtPctVal(marginPct)}" step="0.1" min="0" max="99">
        </div>
        <div class="pricing-card-field" style="grid-column: 1 / -1;">
          <label>Bid Unit Price ($)</label>
          <input type="number" class="bid-input" data-field="bid" data-idx="${idx}" value="${actualBidUnit.toFixed(2)}" step="0.01" min="0">
        </div>
      </div>
      <div class="pricing-card-result">
        <div class="pricing-card-ext">Extension: ${money(actualExt)}</div>
        <div class="pricing-card-margin" style="color:${mcColor}">Margin: ${fmtPctVal(marginPct)}% (${money(marginDollar)})</div>
      </div>
    </div>`);
  });
  
  // Totals footer
  const totalMarginDollar = totalBid - totalDirect;
  const totalMarginPct = totalBid > 0 ? (totalMarginDollar / totalBid * 100) : 0;
  const tmc = totalMarginPct >= 30 ? 'margin-good' : (totalMarginPct >= 15 ? 'margin-ok' : 'margin-low');
  
  tableRows.push(`<tr style="background:#edf2f7;border-top:2px solid #1a365d;">
    <td colspan="4" style="text-align:left;font-weight:700;font-size:0.88rem;">TOTALS</td>
    <td style="font-weight:700">${money(totalDirect)}</td>
    <td></td><td></td><td></td><td></td>
    <td style="font-weight:700;font-size:0.95rem;">${money(totalBid)}</td>
    <td class="margin-cell ${tmc}" style="font-weight:700">${Math.round(totalMarginPct)}%</td>
    <td class="margin-cell ${tmc}" style="font-weight:700">${money(totalMarginDollar)}</td>
  </tr>`);
  
  if (body) body.innerHTML = tableRows.join('');
  if (cards) cards.innerHTML = cardHtml.join('');
  
  // Calculate project-level adds: Bond, Consumables, Sales Tax
  const bid = currentBid;
  const consumables = parseFloat(bid.consumables) || 0;
  const bondPct = (appSettings || DEFAULT_SETTINGS).defaultBondPct || 2.5;
  const bondOn = bid.bondEnabled !== false;
  const projectBond = bondOn ? totalBid * bondPct / 100 : 0;
  const salesTax = calcSalesTax(bid);
  const totalBidPrice = totalBid + projectBond + consumables + salesTax;
  
  const trueMarginDollars = totalBidPrice - totalDirect - projectBond - salesTax;
  const trueMarginPct = totalBidPrice > 0 ? (trueMarginDollars / totalBidPrice * 100) : 0;
  const tmc2 = trueMarginPct >= 30 ? 'margin-good' : (trueMarginPct >= 15 ? 'margin-ok' : 'margin-low');
  
  // Update KPI bar
  if ($('pricingKpiDirect')) $('pricingKpiDirect').textContent = money(totalDirect);
  if ($('pricingKpiBid')) $('pricingKpiBid').textContent = money(totalBid);
  if ($('pricingKpiTotal')) $('pricingKpiTotal').textContent = money(totalBidPrice);
  if ($('pricingKpiMargin')) { $('pricingKpiMargin').textContent = trueMarginPct.toFixed(1) + '%'; $('pricingKpiMargin').className = 'pricing-kpi-value ' + tmc2; }
  if ($('pricingKpiProfit')) { $('pricingKpiProfit').textContent = money(trueMarginDollars); $('pricingKpiProfit').className = 'pricing-kpi-value ' + tmc2; }
  
  // Update cascade section
  if ($('cascadeItemsSub')) $('cascadeItemsSub').textContent = money(totalBid);
  if ($('cascadeBondPct')) $('cascadeBondPct').textContent = bondPct;
  if ($('cascadeBond')) $('cascadeBond').textContent = money(projectBond);
  if ($('cascadeBondRow')) $('cascadeBondRow').style.display = bondOn ? '' : 'none';
  if ($('cascadeConsum')) $('cascadeConsum').textContent = money(consumables);
  if ($('cascadeConsumRow')) $('cascadeConsumRow').style.display = consumables > 0 ? '' : 'none';
  if ($('cascadeTaxPct')) $('cascadeTaxPct').textContent = bid.taxRate != null ? bid.taxRate : 7;
  if ($('cascadeTax')) $('cascadeTax').textContent = money(salesTax);
  if ($('cascadeTaxRow')) $('cascadeTaxRow').style.display = bid.taxEnabled !== false ? '' : 'none';
  if ($('cascadeTotal')) $('cascadeTotal').textContent = money(totalBidPrice);
  if ($('cascadeMargin')) {
    $('cascadeMargin').textContent = trueMarginPct.toFixed(1) + '% (' + money(trueMarginDollars) + ')';
    $('cascadeMargin').style.color = trueMarginPct >= 30 ? '#276749' : (trueMarginPct >= 15 ? '#b7791f' : '#c53030');
    $('cascadeMargin').closest('.cascade-row').querySelector('.cascade-label').style.color = trueMarginPct >= 30 ? '#276749' : (trueMarginPct >= 15 ? '#b7791f' : '#c53030');
  }
  
  // Update global adjuster defaults from first item
  if (sorted.length > 0 && $('globalMarkup') && !$('globalMarkup')._userSet) {
    const fp = getItemEffectivePcts(sorted[0]);
    $('globalMarkup').value = fp.markupPct.toFixed(0);
    $('globalOH').value = fp.overheadPct.toFixed(0);
  }
  
  // Detect horizontal scroll and show indicator
  const wrap = document.querySelector('.pricing-table-wrap');
  if (wrap) {
    if (wrap.scrollWidth > wrap.clientWidth + 2) {
      wrap.classList.add('has-scroll');
    } else {
      wrap.classList.remove('has-scroll');
    }
    wrap.addEventListener('scroll', function() {
      if (this.scrollLeft + this.clientWidth >= this.scrollWidth - 5) {
        this.classList.remove('has-scroll');
      }
    }, { passive: true });
  }
}

function handlePricingFieldChange(field, idx, value) {
  if (!currentBid || !currentBid.advancedItems) return;
  const item = currentBid.advancedItems[idx];
  if (!item) return;
  
  switch(field) {
    case 'mu':
      applyItemMarkupPct(item, parseFloat(value) || 0);
      // Clear bid override so price recalculates from new markup
      delete item.bidUnitOverride;
      break;
    case 'oh':
      applyItemOverheadPct(item, parseFloat(value) || 0);
      delete item.bidUnitOverride;
      break;
    case 'bid':
      setItemBidUnit(item, parseFloat(value) || 0);
      break;
    case 'margin':
      setItemTargetMargin(item, parseFloat(value) || 0);
      break;
  }
  
  renderPricingTab();
  scheduleAutoSave();
}

// ===== QUICK ADD CATALOG =====
function quickAddCatalog(idx) {
  var it = CATALOG[idx];
  if (!it) return;
  var item = {
    id: uid('item'),
    description: it.d,
    qty: 1,
    unit: it.u,
    unitCost: it.p,
    category: 'catalog',
    markupPct: getSmartDefaults('catalog').markupPct,
    overheadPct: getSmartDefaults('catalog').overheadPct,
    bondPct: getSmartDefaults('catalog').bondPct,
    noMarkup: false,
    taxable: true
  };
  currentBid.items.push(item);
  renderItems();
  recalcSummary();
  showToast('Added: ' + it.d);
  scheduleAutoSave();

  // Briefly flash the add button green
  var btn = document.querySelector('.cat-quick-add[data-idx="' + idx + '"]');
  if (btn) {
    btn.textContent = '✓';
    btn.style.background = '#16a34a';
    btn.style.color = 'white';
    setTimeout(function() { btn.textContent = '+'; btn.style.background = ''; btn.style.color = ''; }, 800);
  }
}

// ===== OPEN BUILDER =====
function openBuilder() {
  showScreen('builderScreen');
  const b = currentBid;
  $('builderTitle').textContent = 'Bid ' + (b.bidNumber || 'New');
  $('builderStatus').textContent = b.status;
  $('builderStatus').className = 'status-badge status-' + b.status;

  $('clientName').value = b.clientName || '';
  if ($('clientContact')) $('clientContact').value = b.clientContact || '';
  if ($('clientEmail')) $('clientEmail').value = b.clientEmail || '';
  if ($('clientPhone')) $('clientPhone').value = b.clientPhone || '';
  if ($('customerSearch')) $('customerSearch').value = '';
  $('projectAddress').value = b.projectAddress || '';
  $('projectDesc').value = b.projectDescription || '';
  initCustomerPicker();

  // Populate bid-level controls
  $('bidOverheadToggle').checked = b.overheadEnabled !== false;
  $('bidBondToggle').checked = b.bondEnabled !== false;
  $('bidConsumables').value = b.consumables != null ? b.consumables : 100;
  if ($('consumablesDisplay')) {
    $('consumablesDisplay').value = b.consumablesDisplay || 'show';
    updateConsumablesFoldTargets();
    if ($('consumablesFoldTarget') && b.consumablesFoldTarget) $('consumablesFoldTarget').value = b.consumablesFoldTarget;
    $('consumablesFoldTarget').style.display = (b.consumablesDisplay === 'foldInto') ? 'inline-block' : 'none';
  }
  // Migrate existing bids: ensure tax fields exist
  if (b.taxRate == null) b.taxRate = (appSettings || DEFAULT_SETTINGS).defaultTaxRate || 7;
  if (b.taxEnabled == null) b.taxEnabled = true;
  // Migrate existing items: ensure taxable field exists on materials
  (b.items || []).forEach(it => { if (it.taxable == null) it.taxable = true; });
  (b.advancedItems || []).forEach(item => {
    (item.costs || []).forEach(c => { if (c.type === 'material' && c.taxable == null) c.taxable = true; });
  });
  $('bidTaxToggle').checked = b.taxEnabled !== false;
  $('bidTaxRate').value = b.taxRate != null ? b.taxRate : 7;
  $('customerNotes').value = b.customerNotes || '';
  $('showUnitPrices').checked = b.showUnitPrices !== false;
  $('showQty').checked = b.showQty !== false;

  // Enforce estimator control locks
  const ec = (appSettings || DEFAULT_SETTINGS).estimatorControls || {};
  const isEstimator = currentUser.role === 'estimator';
  if (isEstimator) {
    if (ec.lockShowPrices) $('showUnitPrices').disabled = true; else $('showUnitPrices').disabled = false;
    if (ec.lockShowQty) $('showQty').disabled = true; else $('showQty').disabled = false;
    if (!ec.canToggleOverhead) $('bidOverheadToggle').disabled = true; else $('bidOverheadToggle').disabled = false;
    if (!ec.canToggleBond) $('bidBondToggle').disabled = true; else $('bidBondToggle').disabled = false;
    $('modeToggle').style.display = ''; // All users can toggle Simple/Advanced
    $('bidTaxRate').readOnly = true;
    $('bidTaxRate').classList.add('readonly-field');
  } else {
    $('showUnitPrices').disabled = false;
    $('showQty').disabled = false;
    $('bidOverheadToggle').disabled = false;
    $('bidBondToggle').disabled = false;
    $('modeToggle').style.display = '';
    $('bidTaxRate').readOnly = false;
    $('bidTaxRate').classList.remove('readonly-field');
  }

  // If bid was approved with locked display, restore those settings
  if (isEstimator && b.approvalLockedDisplay) {
    $('showUnitPrices').checked = b.approvalLockedDisplay.showUnitPrices;
    $('showQty').checked = b.approvalLockedDisplay.showQty;
    $('showUnitPrices').disabled = true;
    $('showQty').disabled = true;
  }

  // Set estimate mode
  const mode = currentBid.estimateMode || 'simple';
  $('modeToggle').textContent = mode === 'advanced' ? '⚙️ Advanced' : '📋 Simple';
  $('modeToggle').className = 'btn btn-sm ' + (mode === 'advanced' ? 'btn-accent' : 'btn-outline');
  applyEstimateMode(mode);

  // Auto-detect catalog project type from scope
  const scopeText = (b.projectDescription || '').toLowerCase() + ' ' + (b.clientName || '').toLowerCase();
  const ptSelect = $('catalogProjectType');
  if (ptSelect) {
    if (scopeText.includes('water') || scopeText.includes('hydrant') || scopeText.includes('watermain')) {
      ptSelect.value = 'Water';
    } else if (scopeText.includes('storm') || scopeText.includes('drainage') || scopeText.includes('storm sewer')) {
      ptSelect.value = 'Storm';
    } else if (scopeText.includes('sanitary') || scopeText.includes('sewer')) {
      ptSelect.value = 'Sanitary';
    } else if (scopeText.includes('septic') || scopeText.includes('sand filter') || scopeText.includes('at-grade') || scopeText.includes('lateral')) {
      ptSelect.value = 'Septic';
    }
  }

  updateBuilderButtons();
  renderCatalog();
  renderItems();
  renderLaborItems();
  renderAdvancedItems();
  updateAdvBidSummary(currentBid);
  renderExclusions();
  recalcSummary();

  // Make sections collapsible for ALL users
  {
    // Exclusions — collapsed by default with count badge
    const exclSection = document.querySelector('.exclusions-section');
    const exclHeader = exclSection?.querySelector('h3');
    if (exclHeader) {
      const updateExclBadge = () => {
        const checked = exclSection.querySelectorAll('input[type=checkbox]:checked').length;
        const total = exclSection.querySelectorAll('input[type=checkbox]').length;
        let badge = exclHeader.querySelector('.section-badge');
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'section-badge';
          exclHeader.appendChild(badge);
        }
        badge.textContent = checked + '/' + total + ' selected';
      };
      makeCollapsible(exclSection, exclHeader, false);
      updateExclBadge();
      exclSection.addEventListener('change', updateExclBadge);
    }

    // Customer & Project section — collapsed by default (shows filled badge)
    const custSection = $('customerProjectSection') || document.querySelector('#builderScreen .card:first-of-type');
    const custHeader = custSection?.querySelector('h3');
    if (custHeader && custHeader.textContent.includes('Customer')) {
      const custName = b.clientName || b.client || '';
      if (custName) {
        let badge = custHeader.querySelector('.section-badge');
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'section-badge';
          custHeader.appendChild(badge);
        }
        badge.textContent = custName;
      }
      makeCollapsible(custSection, custHeader, false);
    }

    // Bid Controls — collapsed by default for admin, HIDDEN for estimators
    const bidControlsSection = document.querySelector('.bid-controls-section');
    const bidControlsHeader = bidControlsSection?.querySelector('h3');
    if (isEstimator) {
      if (bidControlsSection) bidControlsSection.style.display = 'none';
    } else if (bidControlsHeader) {
      makeCollapsible(bidControlsSection, bidControlsHeader, false);
    }

    // Proposal Display Options — hidden for estimators, collapsible for admin
    const proposalOptsSection = document.querySelector('.proposal-options-section');
    const proposalOptsHeader = proposalOptsSection?.querySelector('h3');
    if (isEstimator) {
      if (proposalOptsSection) proposalOptsSection.style.display = 'none';
    } else if (proposalOptsHeader) {
      makeCollapsible(proposalOptsSection, proposalOptsHeader, false);
    }

    // Customer Notes — collapsible, starts open
    const notesSection = document.querySelector('#customerNotes')?.closest('.builder-section');
    const notesHeader = notesSection?.querySelector('h3');
    if (notesHeader) makeCollapsible(notesSection, notesHeader, false);
  }

  // Add floating bottom bar for estimators
  if (isEstimator) {
    let floatBar = document.getElementById('estimatorFloatBar');
    if (!floatBar) {
      floatBar = document.createElement('div');
      floatBar.id = 'estimatorFloatBar';
      floatBar.className = 'estimator-float-bar';
      floatBar.innerHTML = '<div class="float-bar-total"><span class="float-bar-label">Bid Total</span><span class="float-bar-amount" id="floatBarTotal">$0.00</span></div><button class="btn btn-accent btn-lg float-bar-submit" id="floatBarSubmit">🚀 Submit to Ryan</button>';
      document.body.appendChild(floatBar);
      $('floatBarSubmit').addEventListener('click', () => $('builderSubmit').click());
    }

    // Show/hide based on bid status
    const canSubmit = b.status === 'draft' || b.status === 'returned';
    floatBar.style.display = canSubmit ? '' : 'none';
    // Update float bar total now that element exists
    recalcSummary();
  }

  // Hide float bar when navigating back to dashboard
  if (!currentUser || currentUser.role !== 'estimator') {
    const fb = document.getElementById('estimatorFloatBar');
    if (fb) fb.style.display = 'none';
  }
}


// ===== ESTIMATE MODE (Simple vs Advanced) =====
function toggleEstimateMode() {
  const newMode = currentBid.estimateMode === 'advanced' ? 'simple' : 'advanced';
  currentBid.estimateMode = newMode;
  $('modeToggle').textContent = newMode === 'advanced' ? '⚙️ Advanced' : '📋 Simple';
  $('modeToggle').className = 'btn btn-sm ' + (newMode === 'advanced' ? 'btn-accent' : 'btn-outline');
  applyEstimateMode(newMode);
  renderItems();
  renderLaborItems();
  renderAdvancedItems();
  updateAdvBidSummary(currentBid);
  recalcSummary();
}

function applyEstimateMode(mode) {
  const adv = mode === 'advanced';
  const isAdmin = currentUser && currentUser.role === 'admin';
  // Show/hide per-item markup columns
  $$('.adv-only').forEach(el => el.style.display = adv ? '' : 'none');
  $$('.simple-only').forEach(el => el.style.display = adv ? 'none' : '');
  $$('.line-num-col').forEach(el => el.style.display = adv ? '' : 'none');
  // Hide TX checkbox and gear icon in Simple mode
  $$('.simple-hide').forEach(el => el.style.display = adv ? '' : 'none');
  
  const advTabBar = $('advTabBar');
  
  if (adv && isAdmin) {
    // ADVANCED MODE — tabbed interface (B2W-style)
    if (advTabBar) advTabBar.style.display = '';
    switchAdvTab(currentAdvTab || 'items');
  } else {
    // SIMPLE MODE — classic layout, no tabs
    if (advTabBar) advTabBar.style.display = 'none';
    if ($('pricingTabPanel')) $('pricingTabPanel').style.display = 'none';
    if ($('simpleBuilder')) $('simpleBuilder').style.display = '';
    if ($('advancedBuilder')) $('advancedBuilder').style.display = 'none';
    if ($('simpleSummarySection')) $('simpleSummarySection').style.display = '';
    if ($('advBidSummary')) { $('advBidSummary').style.display = 'none'; $('advBidSummary').classList.remove('tab-mode'); }
    // Show all sections normally
    const custSection = $('customerProjectSection');
    if (custSection) custSection.style.display = '';
    const catalogPanel = $('catalogPanel');
    if (catalogPanel) catalogPanel.style.display = '';
    const exclSection = document.querySelector('.exclusions-section');
    if (exclSection) exclSection.style.display = '';
    const bidCtrl = document.querySelector('.bid-controls-section');
    const notesSection = $('customerNotes')?.closest('.builder-section');
    const propOpts = document.querySelector('.proposal-options-section');
    if (notesSection) notesSection.style.display = '';
    if (isAdmin) {
      if (bidCtrl) bidCtrl.style.display = '';
      if (propOpts) propOpts.style.display = '';
    }
  }
}

function updateBuilderButtons() {
  const b = currentBid;
  const isAdmin = currentUser.role === 'admin';
  const isEstimator = currentUser.role === 'estimator';

  const isDraft = b.status === 'draft';
  const isSubmitted = b.status === 'submitted';
  const isReturned = b.status === 'returned';
  const isApproved = b.status === 'approved';
  
  $('builderSave').style.display = (isDraft || isReturned) ? '' : 'none';
  $('builderSubmit').style.display = (isEstimator && (isDraft || isReturned)) ? '' : 'none';
  // Admin can approve submitted bids AND self-approve their own drafts/returned bids
  $('builderApprove').style.display = (isAdmin && (isSubmitted || isDraft || isReturned)) ? '' : 'none';
  $('builderSendBack').style.display = (isAdmin && isSubmitted) ? '' : 'none';
  $('builderProposal').style.display = isApproved ? '' : 'none';
  if ($('builderFieldOrder')) $('builderFieldOrder').style.display = (isAdmin && isApproved) ? '' : 'none';

  // Ryan can also save in submitted state and view proposal
  if (isAdmin && isSubmitted) $('builderSave').style.display = '';
  if (isAdmin && isDraft) $('builderSave').style.display = '';
  if (isAdmin) $('builderProposal').style.display = ''; // Admin can always preview
  
  // Hide unnecessary buttons for estimators
  if (isEstimator) {
    $('costSummaryBtn').style.display = 'none';
    $('saveAsTemplateBtn').style.display = 'none';
    $('builderDelete').style.display = 'none';
    // Make Submit button bigger for estimators
    $('builderSubmit').className = 'btn btn-accent btn-lg';
    $('builderSubmit').innerHTML = '🚀 Submit to Ryan';
  } else {
    $('costSummaryBtn').style.display = '';
    $('saveAsTemplateBtn').style.display = '';
    $('builderSubmit').className = 'btn btn-sm btn-accent';
    $('builderSubmit').textContent = 'Submit to Ryan';
  }

  // Show returned banner if bid was sent back
  let returnedBanner = document.getElementById('returnedBanner');
  if (isReturned && b.sendBackNotes) {
    if (!returnedBanner) {
      returnedBanner = document.createElement('div');
      returnedBanner.id = 'returnedBanner';
      returnedBanner.className = 'returned-banner';
      const builderContent = document.querySelector('#builderScreen .builder-body') || document.querySelector('#builderScreen main');
      if (builderContent) builderContent.insertBefore(returnedBanner, builderContent.firstChild);
    }
    returnedBanner.innerHTML = `<strong>↩️ Ryan sent this back:</strong><p>${escHtml(b.sendBackNotes)}</p>`;
    returnedBanner.style.display = '';
  } else if (returnedBanner) {
    returnedBanner.style.display = 'none';
  }
}

function gatherBidData() {
  currentBid.clientName = $('clientName').value.trim();
  currentBid.clientContact = $('clientContact') ? $('clientContact').value.trim() : '';
  currentBid.clientEmail = $('clientEmail') ? $('clientEmail').value.trim() : '';
  currentBid.clientPhone = $('clientPhone') ? $('clientPhone').value.trim() : '';
  currentBid.projectAddress = $('projectAddress').value.trim();
  currentBid.projectDescription = $('projectDesc').value.trim();
  currentBid.customExclusions = $('customExclusions').value.trim();

  // Gather exclusion check states
  $$('#exclusionChecks input[type="checkbox"]').forEach(ch => {
    const idx = parseInt(ch.dataset.exclIdx);
    if (!isNaN(idx) && currentBid.exclusions && currentBid.exclusions[idx]) {
      currentBid.exclusions[idx].checked = ch.checked;
    }
  });
  // Gather terms check states
  $$('#termsChecks input[type="checkbox"]').forEach(ch => {
    const idx = parseInt(ch.dataset.termIdx);
    if (!isNaN(idx) && currentBid.terms && currentBid.terms[idx]) {
      currentBid.terms[idx].checked = ch.checked;
    }
  });
  // Keep backward compat: also store standardExclusions as flat array
  currentBid.standardExclusions = (currentBid.exclusions || []).filter(e => e.checked).map(e => e.text);

  currentBid.customerNotes = $('customerNotes').value.trim();
  currentBid.showUnitPrices = $('showUnitPrices').checked;
  currentBid.showQty = $('showQty').checked;
  currentBid.overheadEnabled = $('bidOverheadToggle').checked;
  currentBid.bondEnabled = $('bidBondToggle').checked;
  currentBid.consumables = parseFloat($('bidConsumables').value) || 0;
  currentBid.consumablesDisplay = $('consumablesDisplay') ? $('consumablesDisplay').value : 'show';
  currentBid.consumablesFoldTarget = $('consumablesFoldTarget') ? $('consumablesFoldTarget').value : '';
  currentBid.taxEnabled = $('bidTaxToggle').checked;
  currentBid.taxRate = parseFloat($('bidTaxRate').value) || 0;
  currentBid.updatedAt = new Date().toISOString();
}

async function saveBid(silent) {
  gatherBidData();
  try {
    await api('save', { body: currentBid });
    if (!silent) showToast('Bid saved!');
  } catch (e) {
    showToast('Save failed: ' + e.message, true);
  }
}

async function submitBid() {
  const bidNum = currentBid.bidNumber || 'this bid';
  const clientName = currentBid.clientName || 'Untitled';
  if (!confirm(`Submit ${bidNum} (${clientName}) to Ryan for review?\n\nRyan will be notified and can approve or send it back.`)) return;
  
  gatherBidData();
  // Clear any old send-back notes when resubmitting
  currentBid.sendBackNotes = '';
  currentBid.sentBackAt = null;
  currentBid.status = 'submitted';
  currentBid.submittedAt = new Date().toISOString();
  try {
    await api('save', { body: currentBid });
    showToast('Bid submitted to Ryan! He\'ll be notified.');
    updateBuilderButtons();
    $('builderStatus').textContent = 'submitted';
    $('builderStatus').className = 'status-badge status-submitted';
    
    // Send webhook notification to Ryan
    notifyRyan(currentBid);
    // Kick off background AI review so Ryan sees it during approval
    if (typeof autoAiReview === 'function') autoAiReview();
    const pb = $('attachPlansBtn');
    if (pb) pb.innerHTML = (currentBid && ((currentBid.planFiles || []).length || currentBid.aiAnalysis)) ? '📄 Files ✓' : '📎 Files';
  } catch (e) {
    currentBid.status = 'draft';
    showToast('Submit failed: ' + e.message, true);
  }
}

async function notifyRyan(bid) {
  try {
    const WEBHOOK_URL = 'https://webhooks.tasklet.ai/v1/public/webhook/a_k7y547vmdxxrrwbr44xx?token=d6e80140b011b3089a08dc7e94c3da34';
    if (!WEBHOOK_URL || WEBHOOK_URL.includes('__WEBHOOK')) return;
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'bid_submitted',
        bidNumber: bid.bidNumber,
        clientName: bid.clientName,
        projectAddress: bid.projectAddress,
        total: calcBidTotal(bid),
        submittedBy: currentUser.name,
        submittedAt: bid.submittedAt
      })
    });
  } catch (e) { /* notification is best-effort */ }
}

async function approveBid() {
  const bidNum = currentBid.bidNumber || 'this bid';
  const clientName = currentBid.clientName || 'Untitled';
  const total = money(calcBidTotal(currentBid));
  const isOwnBid = (currentBid.createdBy || '').toLowerCase() === currentUser.name.toLowerCase();
  const msg = isOwnBid
    ? `✅ Approve ${bidNum} (${clientName})?\n\nTotal: ${total}\n\nThe proposal will be ready to print and send to the customer.`
    : `✅ Approve ${bidNum} (${clientName})?\n\nTotal: ${total}\n\nThe estimator will be able to print and send the proposal to the customer.`;
  if (!confirm(msg)) return;
  
  gatherBidData();
  const prevStatus = currentBid.status;
  currentBid.status = 'approved';
  currentBid.approvedAt = new Date().toISOString();
  // Lock proposal display settings on approval
  const ecLock = (appSettings || DEFAULT_SETTINGS).estimatorControls || {};
  if (ecLock.approvalLocks) {
    currentBid.approvalLockedDisplay = {
      showUnitPrices: currentBid.showUnitPrices,
      showQty: currentBid.showQty,
      lumpSumStates: (currentBid.laborItems || []).map(li => li.lumpSum)
    };
  }
  try {
    await api('save', { body: currentBid });
    showToast('✅ Bid approved! Proposal is ready.');
    updateBuilderButtons();
    $('builderStatus').textContent = 'approved';
    $('builderStatus').className = 'status-badge status-approved';
  } catch (e) {
    currentBid.status = prevStatus;
    currentBid.approvedAt = null;
    showToast('Approve failed: ' + e.message, true);
  }
}

function sendBackBid() {
  $('sendBackNotes').value = '';
  $('sendBackModal').style.display = 'flex';
}

async function confirmSendBack() {
  const notes = $('sendBackNotes').value.trim();
  const creatorName = currentBid.createdBy ? currentBid.createdBy.charAt(0).toUpperCase() + currentBid.createdBy.slice(1) : 'the estimator';
  if (!notes) {
    alert(`Please enter a reason so ${creatorName} knows what to fix.`);
    return;
  }
  $('sendBackModal').style.display = 'none';
  
  gatherBidData();
  currentBid.status = 'returned';
  currentBid.approvedAt = null;
  currentBid.sendBackNotes = notes;
  currentBid.sentBackAt = new Date().toISOString();
  try {
    await api('save', { body: currentBid });
    showToast(`Bid sent back to ${creatorName} with notes.`);
    updateBuilderButtons();
    $('builderStatus').textContent = 'returned';
    $('builderStatus').className = 'status-badge status-returned';
  } catch (e) {
    currentBid.status = 'submitted';
    currentBid.sendBackNotes = '';
    showToast('Failed: ' + e.message, true);
  }
}

async function deleteBid() {
  if (!confirm('Delete this bid permanently?')) return;
  try {
    await api('delete', { id: currentBid.id, del: true });
    showToast('Bid deleted.');
    currentBid = null;
    await showDashboard();
  } catch (e) {
    showToast('Delete failed: ' + e.message, true);
  }
}

async function deleteBidFromDashboard(bidId) {
  const bid = allBids.find(b => b.id === bidId);
  const label = bid ? (bid.bidNumber || bid.clientName || bidId) : bidId;
  if (!confirm('Delete bid "' + label + '" permanently?')) return;
  try {
    await api('delete', { id: bidId, del: true });
    showToast('Bid deleted.');
    await showDashboard();
  } catch (e) {
    showToast('Delete failed: ' + e.message, true);
  }
}

// ===== CATALOG =====
let catalogFilter = 'All';
let catalogSearchTerm = '';

function renderCatalog() {
  const list = $('catalogList');
  let items = CATALOG;

  // Hide hidden items from non-admin users (Bob/Cody can't see them)
  if (!currentUser || currentUser.role !== 'admin') {
    items = items.filter(it => !it.hidden);
  }

  // Project type filter
  const ptFilter = $('catalogProjectType') ? $('catalogProjectType').value : '';
  if (ptFilter) {
    items = items.filter(it => (it.pt || 'Septic') === ptFilter);
  }

  if (catalogFilter !== 'All') {
    const cats = CAT_MAP[catalogFilter] || [];
    items = items.filter(it => cats.includes(it.c));
  }
  if (catalogSearchTerm) {
    const q = catalogSearchTerm.toLowerCase();
    items = items.filter(it => it.d.toLowerCase().includes(q));
  }

  if (items.length === 0) {
    list.innerHTML = '<div class="empty-msg" style="padding:16px;">No items found.</div>';
    return;
  }

  list.innerHTML = items.map((it, i) => {
    const idx = CATALOG.indexOf(it);
    return `
    <div class="catalog-item" data-idx="${idx}">
      <div class="catalog-item-main">
        <div class="catalog-item-info">
          <span class="catalog-item-desc" title="${escHtml(it.d)}">${escHtml(it.d)}</span>
          <span class="catalog-item-meta">${escHtml(it.u)} · ${money(it.p)}${it.v ? ' · ' + escHtml(it.v) : ''} · ${escHtml(it.c || '')}</span>
        </div>
        <button class="cat-quick-add" data-idx="${idx}" onclick="event.stopPropagation();quickAddCatalog(${idx})" title="Quick add">+</button>
      </div>
      <div class="catalog-item-detail" id="catDetail_${idx}" style="display:none;">
        <div class="cat-detail-name">${escHtml(it.d)}</div>
        <div class="cat-detail-tags">
          <span class="cat-tag">${escHtml(it.u)}</span>
          <span class="cat-tag">${escHtml(it.c || 'N/A')}</span>
          <span class="cat-tag">${escHtml(it.pt || 'Septic')}</span>
          ${it.v ? `<span class="cat-tag cat-tag-vendor">\u{1F3EA} ${escHtml(it.v)}</span>` : ''}
        </div>
        <div class="cat-detail-price">${money(it.p)}</div>
        <div class="cat-detail-actions">
          <div class="cat-detail-qty">
            <label>Qty:</label>
            <input type="number" class="cat-detail-qty-input" value="1" min="0.01" step="any" onclick="event.stopPropagation()">
          </div>
          <button class="btn btn-sm btn-primary cat-detail-add-btn" data-idx="${idx}">Add to Bid</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function showCatalogModal(catItem) {
  catalogSelectedItem = catItem;
  $('catalogModalTitle').textContent = 'Add Item';
  $('catalogModalDesc').textContent = catItem.d;
  $('catalogModalPrice').textContent = money(catItem.p) + ' / ' + catItem.u;
  $('catalogModalQty').value = 1;
  $('catalogModal').style.display = 'flex';
  $('catalogModalQty').focus();
  $('catalogModalQty').select();
}

function addCatalogItem() {
  const qty = parseFloat($('catalogModalQty').value) || 0;
  if (qty <= 0) { showToast('Enter a valid quantity', true); return; }
  const s = appSettings || DEFAULT_SETTINGS;
  const item = {
    id: uid('item'),
    description: catalogSelectedItem.d,
    qty: qty,
    unit: catalogSelectedItem.u,
    unitCost: catalogSelectedItem.p,
    category: 'catalog',
    markupPct: getSmartDefaults('catalog').markupPct,
    overheadPct: getSmartDefaults('catalog').overheadPct,
    bondPct: getSmartDefaults('catalog').bondPct,
    noMarkup: false,
    taxable: true
  };
  currentBid.items.push(item);
  $('catalogModal').style.display = 'none';
  renderItems();
  recalcSummary();
  showToast('Added: ' + catalogSelectedItem.d);
  scheduleAutoSave();
}

// ===== CUSTOM ITEM =====
function showCustomModal() {
  $('customDesc').value = '';
  $('customQty').value = 1;
  $('customUnit').value = 'EA';
  $('customCost').value = '';
  $('customModal').style.display = 'flex';
  $('customDesc').focus();
}

function addCustomItem() {
  const desc = $('customDesc').value.trim();
  if (!desc) { showToast('Enter a description', true); return; }
  const qty = parseFloat($('customQty').value) || 0;
  if (qty <= 0) { showToast('Enter a valid quantity', true); return; }
  const cost = parseFloat($('customCost').value) || 0;
  const s = appSettings || DEFAULT_SETTINGS;
  currentBid.items.push({
    id: uid('item'),
    description: desc,
    qty: qty,
    unit: $('customUnit').value.trim() || 'EA',
    unitCost: cost,
    category: 'custom',
    markupPct: getSmartDefaults('catalog').markupPct,
    overheadPct: getSmartDefaults('catalog').overheadPct,
    bondPct: getSmartDefaults('catalog').bondPct,
    noMarkup: false,
    taxable: true
  });
  $('customModal').style.display = 'none';
  renderItems();
  recalcSummary();
  showToast('Custom item added');
  scheduleAutoSave();
}

// ===== LABOR =====
function showLaborModal() {
  populateCrewSelect();
  $('laborDesc').value = 'Equipment and Labor';
  $('laborHours').value = 8;
  $('laborRate').value = 500;
  $('laborRate').readOnly = false;
  const preview = $('laborBreakdownPreview');
  if (preview) { preview.style.display = 'none'; preview.innerHTML = ''; }
  if ($('laborCrewSelect')) $('laborCrewSelect').value = '';
  // Default lump sum based on estimator controls
  const ecLS = (appSettings || DEFAULT_SETTINGS).estimatorControls || {};
  $('laborLumpSum').checked = currentUser.role === 'estimator' ? (ecLS.defaultLumpSum !== false) : false;
  if (currentUser.role === 'estimator' && ecLS.lockLumpSum) $('laborLumpSum').disabled = true; else $('laborLumpSum').disabled = false;
  $('laborModal').style.display = 'flex';
  $('laborDesc').focus();
}

function addLaborItem() {
  const desc = $('laborDesc').value.trim();
  if (!desc) { showToast('Enter a description', true); return; }
  const hours = parseFloat($('laborHours').value) || 0;
  const rate = parseFloat($('laborRate').value) || 0;
  if (hours <= 0) { showToast('Enter valid hours', true); return; }
  const s = appSettings || DEFAULT_SETTINGS;
  currentBid.laborItems.push({
    id: uid('lab'),
    description: desc,
    hours: hours,
    rate: rate,
    markupPct: getSmartDefaults('labor').markupPct,
    overheadPct: getSmartDefaults('labor').overheadPct,
    bondPct: getSmartDefaults('labor').bondPct,
    noMarkup: false,
    lumpSum: $('laborLumpSum').checked
  });
  $('laborModal').style.display = 'none';
  renderLaborItems();
  recalcSummary();
  showToast('Labor item added');
  scheduleAutoSave();
}

// ===== RENDER ITEMS TABLE =====
function renderItems() {
  const body = $('itemsBody');
  const items = currentBid.items;
  if ($('noItems')) {
    if (items.length === 0) {
      $('noItems').style.display = '';
      $('noItems').innerHTML = currentUser.role === 'estimator'
        ? '<div style="text-align:center;padding:24px;"><div style="font-size:2rem;margin-bottom:8px;">👆</div><div style="font-size:1.1rem;color:#475569;">Tap <strong>+ From Catalog</strong> above to start adding items</div></div>'
        : 'No items yet. Add from catalog or create a custom item.';
    } else {
      $('noItems').style.display = 'none';
    }
  }
  $('itemsTable').style.display = items.length ? '' : 'none';

  const isAdmin = currentUser.role === 'admin';

  const adv = currentBid.estimateMode === 'advanced';
  body.innerHTML = items.map((it, i) => {
    // Simple mode: show base cost only (qty × unitCost). Advanced: show full marked-up total.
    const total = adv ? calcItemTotal(it) : ((it.qty || 0) * (it.unitCost || 0));
    const ro = ''; // All users can edit markup in Advanced mode
    return `<tr data-id="${it.id}">
      <td class="text-right line-num-col" style="display:${adv?'':'none'}">${i + 1}</td>
      <td>${escHtml(it.description)}${it.proposalGroup ? '<span class="proposal-group-badge">' + escHtml(it.proposalGroup) + '</span>' : ''}${it.showOnProposal === false ? '<span class="proposal-hidden-badge">hidden</span>' : ''}${it.proposalShowUnit ? '<span class="proposal-unit-badge">unit $</span>' : ''}${it.proposalPriceOverride != null ? '<span class="proposal-override-badge">⇢$' + Number(it.proposalPriceOverride).toLocaleString() + '</span>' : ''}</td>
      <td><input type="number" value="${it.qty}" min="0.01" step="any" data-field="qty" data-idx="${i}"></td>
      <td>${escHtml(it.unit)}</td>
      <td class="text-right">${money(it.unitCost)}</td>
      <td class="simple-hide" style="text-align:center;display:${adv?'':'none'}"><input type="checkbox" ${it.taxable !== false ? 'checked' : ''} data-field="taxable" data-idx="${i}" title="Taxable"></td>
      <td class="adv-only" style="display:${adv?'':'none'}"><input type="number" value="${it.markupPct}" step="0.1" data-field="markupPct" data-idx="${i}" ${ro}></td>
      <td class="adv-only" style="display:${adv?'':'none'}"><input type="number" value="${it.overheadPct}" step="0.1" data-field="overheadPct" data-idx="${i}" ${ro}></td>
      <td class="adv-only" style="display:${adv?'':'none'}"><input type="number" value="${it.bondPct}" step="0.1" data-field="bondPct" data-idx="${i}" ${ro}></td>
      <td class="adv-only" style="display:${adv?'':'none'}" style="text-align:center"><input type="checkbox" ${it.noMarkup ? 'checked' : ''} data-field="noMarkup" data-idx="${i}" ></td>
      <td class="text-right">${money(total)}</td>
      <td>
        ${adv ? '<button class="proposal-gear-btn' + (it.proposalGroup || it.showOnProposal === false || it.proposalShowUnit || it.proposalPriceOverride != null ? ' has-config' : '') + '" data-pidx="' + i + '" data-ptype="item" title="Proposal display">⚙️</button>' : ''}
        ${adv ? '<button class="save-catalog-btn" data-idx="'+i+'" data-type="item" title="Save to catalog">💾</button>' : ''}
        <button class="delete-item-btn" data-idx="${i}" data-type="item">&times;</button>
      </td>
    </tr>`;
  }).join('');
}

function renderLaborItems() {
  const body = $('laborBody');
  const items = currentBid.laborItems;
  $('laborTable').style.display = items.length ? '' : 'none';
  $('laborTitle').style.display = items.length ? '' : 'none';

  const isAdmin = currentUser.role === 'admin';

  const adv = currentBid.estimateMode === 'advanced';
  body.innerHTML = items.map((it, i) => {
    // Simple mode: show base cost only (hours × rate). Advanced: show full marked-up total.
    const total = adv ? calcLaborTotal(it) : ((it.hours || 0) * (it.rate || 0));
    const ro = ''; // All users can edit markup in Advanced mode
    return `<tr data-id="${it.id}">
      <td class="text-right line-num-col" style="display:${adv?'':'none'}">${i + 1}</td>
      <td>${escHtml(it.description)}${it.proposalGroup ? '<span class="proposal-group-badge">' + escHtml(it.proposalGroup) + '</span>' : ''}${it.showOnProposal === false ? '<span class="proposal-hidden-badge">hidden</span>' : ''}${it.proposalShowUnit ? '<span class="proposal-unit-badge">unit $</span>' : ''}${it.proposalPriceOverride != null ? '<span class="proposal-override-badge">⇢$' + Number(it.proposalPriceOverride).toLocaleString() + '</span>' : ''}</td>
      <td><input type="number" value="${it.hours}" min="0.01" step="any" data-field="hours" data-lidx="${i}"></td>
      <td class="text-right"><input type="number" value="${it.rate}" min="0" step="0.01" data-field="rate" data-lidx="${i}" style="width:85px"></td>
      <td class="adv-only" style="display:${adv?'':'none'}"><input type="number" value="${it.markupPct}" step="0.1" data-field="markupPct" data-lidx="${i}" ${ro}></td>
      <td class="adv-only" style="display:${adv?'':'none'}"><input type="number" value="${it.overheadPct}" step="0.1" data-field="overheadPct" data-lidx="${i}" ${ro}></td>
      <td class="adv-only" style="display:${adv?'':'none'}"><input type="number" value="${it.bondPct}" step="0.1" data-field="bondPct" data-lidx="${i}" ${ro}></td>
      <td class="adv-only" style="display:${adv?'':'none'}" style="text-align:center"><input type="checkbox" ${it.noMarkup ? 'checked' : ''} data-field="noMarkup" data-lidx="${i}" ></td>
      <td style="text-align:center"><input type="checkbox" ${it.lumpSum ? 'checked' : ''} data-field="lumpSum" data-lidx="${i}" title="Show as lump sum on proposal"></td>
      <td class="text-right">${money(total)}</td>
      <td>
        ${adv ? '<button class="proposal-gear-btn' + (it.proposalGroup || it.showOnProposal === false || it.proposalShowUnit || it.proposalPriceOverride != null ? ' has-config' : '') + '" data-pidx="' + i + '" data-ptype="labor" title="Proposal display">⚙️</button>' : ''}
        ${adv ? '<button class="save-catalog-btn" data-lidx="'+i+'" data-type="labor" title="Save to catalog">💾</button>' : ''}
        <button class="delete-item-btn" data-lidx="${i}" data-type="labor">&times;</button>
      </td>
    </tr>`;
  }).join('');
}

// ===== RECALCULATE SUMMARY =====
function recalcSummary() {
  const consum = parseFloat(currentBid.consumables) || 0;
  const isAdv = currentBid.estimateMode === 'advanced';
  const salesTax = calcSalesTax(currentBid);

  if (isAdv) {
    // Advanced mode: compute total from advancedItems + project-level bond (base items only)
    let advTotal = 0;
    (currentBid.advancedItems || []).forEach(item => { if (!item.isAlternate) advTotal += calcAdvItemExtension(item); });
    // Project-level bond (% of items bid price)
    const bondPct = (appSettings || DEFAULT_SETTINGS).defaultBondPct || 2.5;
    const projectBond = (currentBid.bondEnabled !== false) ? advTotal * bondPct / 100 : 0;
    const grandTotal = advTotal + projectBond + consum + salesTax;
    // Update floating bar total (the only visible element in advanced mode)
    var floatTotal = document.getElementById('floatBarTotal');
    if (floatTotal) floatTotal.textContent = money(grandTotal);
    return;
  }

  // Simple mode: original logic
  $('sumMaterials').parentElement.querySelector('span:first-child').textContent = 'Materials (base cost)';
  $('sumLabor').parentElement.style.display = '';
  let matBase = 0, labBase = 0, muTotal = 0, ohTotal = 0, boTotal = 0;
  const ohOn = currentBid.overheadEnabled !== false;
  const boOn = currentBid.bondEnabled !== false;

  currentBid.items.forEach(it => {
    const base = (it.qty || 0) * (it.unitCost || 0);
    matBase += base;
    if (!it.noMarkup) {
      const mu = base * (it.markupPct || 0) / 100;
      const oh = ohOn ? base * (it.overheadPct || 0) / 100 : 0;
      muTotal += mu;
      ohTotal += oh;
      if (boOn) boTotal += (base + mu + oh) * (it.bondPct || 0) / 100;
    }
  });

  currentBid.laborItems.forEach(it => {
    const base = (it.hours || 0) * (it.rate || 0);
    labBase += base;
    if (!it.noMarkup) {
      const mu = base * (it.markupPct || 0) / 100;
      const oh = ohOn ? base * (it.overheadPct || 0) / 100 : 0;
      muTotal += mu;
      ohTotal += oh;
      if (boOn) boTotal += (base + mu + oh) * (it.bondPct || 0) / 100;
    }
  });

  $('sumMaterials').textContent = money(matBase);
  $('sumLabor').textContent = money(labBase);
  $('sumMarkup').textContent = money(muTotal);
  $('sumOverhead').textContent = money(ohTotal);
  $('sumOverheadRow').style.opacity = ohOn ? '1' : '0.4';
  $('sumBond').textContent = money(boTotal);
  $('sumBondRow').style.opacity = boOn ? '1' : '0.4';
  $('sumConsumables').textContent = money(consum);
  if ($('sumSalesTax')) $('sumSalesTax').textContent = money(salesTax);
  if ($('sumSalesTaxRow')) $('sumSalesTaxRow').style.display = currentBid.taxEnabled !== false ? '' : 'none';
  const itemsSubtotal = matBase + labBase + muTotal + ohTotal + boTotal;
  if ($('sumItemsSubtotal')) $('sumItemsSubtotal').textContent = money(itemsSubtotal);
  $('sumGrand').textContent = money(itemsSubtotal + consum + salesTax);
  var floatTotal2 = document.getElementById('floatBarTotal');
  if (floatTotal2) floatTotal2.textContent = money(itemsSubtotal + consum + salesTax);
}

// ===== PROPOSAL ITEM DISPLAY =====
let proposalItemEditType = 'item'; // 'item' or 'labor'
let proposalItemEditIdx = -1;

function getExistingProposalGroups() {
  const groups = new Set();
  (currentBid.items || []).forEach(it => { if (it.proposalGroup) groups.add(it.proposalGroup); });
  (currentBid.laborItems || []).forEach(it => { if (it.proposalGroup) groups.add(it.proposalGroup); });
  return [...groups].sort();
}

function showProposalItemModal(type, idx) {
  proposalItemEditType = type;
  proposalItemEditIdx = idx;
  const item = type === 'labor' ? currentBid.laborItems[idx] : currentBid.items[idx];
  if (!item) return;

  $('piShowOnProposal').checked = item.showOnProposal !== false;
  $('piShowUnitPrice').checked = !!item.proposalShowUnit;
  $('piShowUnitPrice').disabled = !!item.proposalGroup;
  $('piNewGroup').style.display = 'none';
  $('piNewGroup').value = '';

  // Price override
  $('piPriceOverride').value = item.proposalPriceOverride != null ? item.proposalPriceOverride : '';

  // Populate group dropdown
  const sel = $('piGroupSelect');
  const groups = getExistingProposalGroups();
  sel.innerHTML = '<option value="">(No group — show individually)</option>';
  groups.forEach(g => {
    sel.innerHTML += '<option value="' + escHtml(g) + '">' + escHtml(g) + '</option>';
  });
  sel.innerHTML += '<option value="__new__">+ New Group...</option>';
  sel.value = item.proposalGroup || '';
  if (item.proposalGroup && !groups.includes(item.proposalGroup)) {
    // Group exists on this item but not in list (shouldn't happen, but handle it)
    const opt = document.createElement('option');
    opt.value = item.proposalGroup;
    opt.textContent = item.proposalGroup;
    sel.insertBefore(opt, sel.lastChild);
    sel.value = item.proposalGroup;
  }

  $('proposalItemModal').style.display = 'flex';
}

function saveProposalItemSettings() {
  const item = proposalItemEditType === 'labor'
    ? currentBid.laborItems[proposalItemEditIdx]
    : currentBid.items[proposalItemEditIdx];
  if (!item) return;

  item.showOnProposal = $('piShowOnProposal').checked;
  item.proposalShowUnit = $('piShowUnitPrice').checked;

  // Price override
  const ovVal = $('piPriceOverride').value.trim();
  if (ovVal === '') {
    delete item.proposalPriceOverride;
  } else {
    item.proposalPriceOverride = parseFloat(ovVal) || null;
  }

  const selVal = $('piGroupSelect').value;
  if (selVal === '__new__') {
    const newName = $('piNewGroup').value.trim();
    item.proposalGroup = newName || '';
  } else {
    item.proposalGroup = selVal || '';
  }

  // If item is in a group, unit price doesn't apply (groups are always lump sum)
  if (item.proposalGroup) {
    item.proposalShowUnit = false;
  }

  $('proposalItemModal').style.display = 'none';
  renderItems();
  renderLaborItems();
  recalcSummary();
  scheduleAutoSave();
  showToast('Proposal display updated');
}

// ===== EXCLUSIONS =====

// Migrate old bids that used standardExclusions to new format
function migrateExclusionsIfNeeded(bid) {
  if (bid.exclusions && Array.isArray(bid.exclusions) && bid.exclusions.length > 0 && typeof bid.exclusions[0] === 'object') {
    return; // Already migrated
  }
  // Old format: standardExclusions was an array of strings (checked ones only)
  if (bid.standardExclusions && !bid.exclusions) {
    const jt = bid.jobType || 'residential';
    const s = appSettings || DEFAULT_SETTINGS;
    const defaults = jt === 'commercial'
      ? (s.commercialExclusions || COMMERCIAL_EXCLUSIONS)
      : (s.residentialExclusions || RESIDENTIAL_EXCLUSIONS);
    bid.exclusions = defaults.map(t => ({ text: t, checked: bid.standardExclusions.includes(t) }));
    // Add any old exclusions not in defaults
    bid.standardExclusions.forEach(ex => {
      if (!defaults.includes(ex)) {
        bid.exclusions.push({ text: ex, checked: true });
      }
    });
    bid.terms = getDefaultTerms(jt);
    if (!bid.jobType) bid.jobType = 'residential';
  }
  // If still nothing, init fresh
  if (!bid.exclusions || !Array.isArray(bid.exclusions)) {
    bid.jobType = bid.jobType || 'residential';
    bid.exclusions = getDefaultExclusions(bid.jobType);
  }
  if (!bid.terms || !Array.isArray(bid.terms)) {
    bid.terms = getDefaultTerms(bid.jobType || 'residential');
  }
}

function renderExclusions() {
  migrateExclusionsIfNeeded(currentBid);

  // Update job type buttons
  const jt = currentBid.jobType || 'residential';
  $$('.job-type-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.jobType === jt);
  });

  // Render exclusions checklist
  const exclContainer = $('exclusionChecks');
  exclContainer.innerHTML = (currentBid.exclusions || []).map((ex, i) => `
    <label class="exclusion-check">
      <input type="checkbox" data-excl-idx="${i}" ${ex.checked ? 'checked' : ''}>
      <span>${escHtml(ex.text)}</span>
    </label>
  `).join('');

  // Render terms checklist
  const termsContainer = $('termsChecks');
  termsContainer.innerHTML = (currentBid.terms || []).map((t, i) => `
    <label class="exclusion-check">
      <input type="checkbox" data-term-idx="${i}" ${t.checked ? 'checked' : ''}>
      <span>${escHtml(t.text)}</span>
    </label>
  `).join('');

  $('customExclusions').value = currentBid.customExclusions || '';
}

function switchJobType(newType) {
  if (currentBid.jobType === newType) return;
  // Check if user has modified exclusions
  const hasModified = (currentBid.exclusions || []).some(e => !e.checked) ||
    (currentBid.terms || []).some(t => !t.checked) ||
    (currentBid.customExclusions && currentBid.customExclusions.trim());
  if (hasModified) {
    if (!confirm('Switching job type will reload default exclusions and terms. Any changes you made will be lost. Continue?')) return;
  }
  currentBid.jobType = newType;
  currentBid.exclusions = getDefaultExclusions(newType);
  currentBid.terms = getDefaultTerms(newType);
  currentBid.customExclusions = '';
  renderExclusions();
  scheduleAutoSave();
}

// ===== PROPOSAL =====
function updateConsumablesFoldTargets() {
  const sel = $('consumablesFoldTarget');
  if (!sel) return;
  sel.innerHTML = '';
  const items = (currentBid.items || []).concat(currentBid.laborItems || []).concat(currentBid.advancedItems || []);
  items.forEach((it, i) => {
    const desc = it.description || ('Item ' + (i + 1));
    const opt = document.createElement('option');
    opt.value = desc;
    opt.textContent = desc.length > 30 ? desc.substring(0, 30) + '…' : desc;
    sel.appendChild(opt);
  });
}

function proposalPriceInput(value, cssClass) {
  const formatted = typeof value === 'number' ? value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : value;
  return '<input type="text" class="proposal-price-input ' + (cssClass || '') + '" value="' + formatted + '" data-original="' + (typeof value === 'number' ? value : 0) + '" onfocus="this.select()" />';
}

function recalcProposalTotal() {
  const rows = document.querySelectorAll('#proposalPage .proposal-price-input.prop-ext');
  let total = 0;
  rows.forEach(inp => {
    const val = parseFloat(inp.value.replace(/[^0-9.-]/g, '')) || 0;
    total += val;
    // Format the value
    inp.value = val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  });
  // Update visible items Subtotal line if present
  const subEl = document.getElementById('proposalItemsSubtotal');
  if (subEl) subEl.textContent = '$' + total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // Add baked-in sales tax if applicable
  const taxEl = document.getElementById('proposalBakedTax');
  if (taxEl) total += parseFloat(taxEl.value) || 0;
  const totalEl = document.getElementById('proposalGrandTotal');
  if (totalEl) totalEl.textContent = '$' + total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function setupProposalPriceListeners() {
  document.querySelectorAll('#proposalPage .proposal-price-input').forEach(inp => {
    inp.addEventListener('change', function() {
      // If it's a unit price input, update the corresponding extension
      const row = this.closest('tr');
      if (row && this.classList.contains('prop-unit')) {
        const extInput = row.querySelector('.prop-ext');
        const qtyCell = row.querySelector('.prop-qty');
        if (extInput && qtyCell) {
          const qty = parseFloat(qtyCell.textContent) || 1;
          const unitVal = parseFloat(this.value.replace(/[^0-9.-]/g, '')) || 0;
          extInput.value = (unitVal * qty).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
      }
      // If it's an extension input, update the unit price
      if (this.classList.contains('prop-ext')) {
        const row2 = this.closest('tr');
        const unitInput = row2 ? row2.querySelector('.prop-unit') : null;
        const qtyCell2 = row2 ? row2.querySelector('.prop-qty') : null;
        if (unitInput && qtyCell2) {
          const qty = parseFloat(qtyCell2.textContent) || 1;
          const extVal = parseFloat(this.value.replace(/[^0-9.-]/g, '')) || 0;
          unitInput.value = (extVal / qty).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
      }
      recalcProposalTotal();
    });
    inp.addEventListener('blur', function() {
      const val = parseFloat(this.value.replace(/[^0-9.-]/g, '')) || 0;
      this.value = val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });
  });
}

function showProposal() {
  gatherBidData();
  showScreen('proposalScreen');
  const b = currentBid;
  const showPrices = b.showUnitPrices !== false;
  const showQty = b.showQty !== false;
  const isAdv = b.estimateMode === 'advanced';
  const consum = parseFloat(b.consumables) || 0;
  const consumDisplay = b.consumablesDisplay || 'show';
  const consumFoldTarget = b.consumablesFoldTarget || '';

  let rowsHtml = '';
  let subtotal = 0;

  // Header columns — Advanced uses "Item" instead of "#", and "Bid Unit" / "Extension"
  let thHtml, colSpan;
  if (isAdv) {
    thHtml = '<th>Item</th><th>Description</th>';
    if (showQty) thHtml += '<th style="text-align:right">Qty</th><th>Unit</th>';
    if (showPrices) thHtml += '<th style="text-align:right">Bid Unit</th><th style="text-align:right">Extension</th>';
    colSpan = 2 + (showQty ? 2 : 0) + (showPrices ? 2 : 0);
  } else {
    thHtml = '<th>#</th><th>Description</th>';
    if (showQty) thHtml += '<th style="text-align:right">Qty</th><th>Unit</th>';
    if (showPrices) thHtml += '<th style="text-align:right">Unit Price</th><th style="text-align:right">Amount</th>';
    colSpan = 2 + (showQty ? 2 : 0) + (showPrices ? 2 : 0);
  }

  let altItems = [];
  if (isAdv && (b.advancedItems || []).length > 0) {
    // ADVANCED MODE PROPOSAL — matches Pella PDF format
    // Sort by item number
    const sorted = [...b.advancedItems].sort((a, b) => (a.itemNumber || 0) - (b.itemNumber || 0));
    altItems = sorted.filter(it => it.isAlternate);
    sorted.forEach(item => {
      if (item.isAlternate) return; // alternates rendered in their own section below
      const ext = calcAdvItemExtension(item);
      const bidUnit = calcAdvItemBidUnit(item);
      let row = '<tr>';
      row += '<td>' + (item.itemNumber || '') + '</td>';
      row += '<td>' + escHtml(item.description || '') + '</td>';
      if (showQty) row += '<td class="text-right">' + fmtNum(item.qty) + '</td><td>' + escHtml(item.unit || '') + '</td>';
      // Check if consumables should fold into this item
      let itemExt = ext;
      let itemBidUnit = bidUnit;
      if (consumDisplay === 'foldInto' && consum > 0 && (escHtml(item.description || '') === consumFoldTarget || (!consumFoldTarget && sorted.indexOf(item) === 0))) {
        itemExt += consum;
        itemBidUnit = item.qty ? itemExt / item.qty : itemExt;
      }
      if (showPrices) row += '<td class="text-right">' + proposalPriceInput(itemBidUnit, 'prop-unit') + '</td><td class="text-right">' + proposalPriceInput(itemExt, 'prop-ext') + '</td>';
      row += '</tr>';
      rowsHtml += row;
      subtotal += itemExt;
    });

    // Add consumables (only if not folded into an item)
    if (consum > 0 && consumDisplay === 'show') {
      let row = '<tr>';
      row += '<td></td>';
      row += '<td>Consumables &amp; Misc Supplies</td>';
      if (showQty) row += '<td class="text-right prop-qty">1</td><td>LS</td>';
      if (showPrices) row += '<td class="text-right">' + proposalPriceInput(consum, 'prop-unit') + '</td><td class="text-right">' + proposalPriceInput(consum, 'prop-ext') + '</td>';
      row += '</tr>';
      rowsHtml += row;
      subtotal += consum;
    } else if (consum > 0 && consumDisplay === 'totalOnly') {
      subtotal += consum;
    } else if (consum > 0 && consumDisplay === 'foldInto') {
      // already folded into item extension above
    }
  } else {
    // SIMPLE MODE PROPOSAL — with proposal display controls
    const hasProposalConfig = (b.items || []).some(it => it.proposalGroup || it.showOnProposal === false || it.proposalShowUnit || it.proposalPriceOverride != null) ||
      (b.laborItems || []).some(it => it.proposalGroup || it.showOnProposal === false || it.proposalShowUnit || it.proposalPriceOverride != null);

    if (hasProposalConfig) {
      // Collect all items with totals
      const allProposalItems = [];
      (b.items || []).forEach(it => {
        const calcTotal = calcItemTotal(it);
        allProposalItems.push({
          desc: it.description,
          qty: it.qty,
          unit: it.unit,
          total: calcTotal,
          proposalPrice: it.proposalPriceOverride != null ? it.proposalPriceOverride : calcTotal,
          group: it.proposalGroup || '',
          show: it.showOnProposal !== false,
          showUnit: !!it.proposalShowUnit,
          type: 'material'
        });
      });
      (b.laborItems || []).forEach(it => {
        const calcTotal = calcLaborTotal(it);
        allProposalItems.push({
          desc: it.description,
          qty: it.lumpSum ? 1 : it.hours,
          unit: it.lumpSum ? 'LS' : 'HRS',
          total: calcTotal,
          proposalPrice: it.proposalPriceOverride != null ? it.proposalPriceOverride : calcTotal,
          group: it.proposalGroup || '',
          show: it.showOnProposal !== false,
          showUnit: !!it.proposalShowUnit,
          type: 'labor'
        });
      });

      // Build groups
      const groupOrder = [];
      const groupMap = {};
      allProposalItems.forEach(pi => {
        if (pi.group) {
          if (!groupMap[pi.group]) { groupMap[pi.group] = []; groupOrder.push(pi.group); }
          groupMap[pi.group].push(pi);
        }
      });

      let lineNum = 0;

      // Render groups first
      groupOrder.forEach(gName => {
        lineNum++;
        const gItems = groupMap[gName];
        const gTotal = gItems.reduce((s, pi) => s + pi.proposalPrice, 0);
        subtotal += gTotal;
        let row = '<tr>';
        row += '<td>' + lineNum + '</td>';
        row += '<td>' + escHtml(gName) + '</td>';
        if (showQty) row += '<td class="text-right">1</td><td>LS</td>';
        if (showPrices) row += '<td class="text-right">' + proposalPriceInput(gTotal, 'prop-unit') + '</td><td class="text-right">' + proposalPriceInput(gTotal, 'prop-ext') + '</td>';
        row += '</tr>';
        rowsHtml += row;
      });

      // Render ungrouped items
      allProposalItems.filter(pi => !pi.group).forEach(pi => {
        const displayPrice = pi.proposalPrice;
        subtotal += displayPrice;
        if (!pi.show) return; // hidden but cost is in subtotal
        lineNum++;
        let row = '<tr>';
        row += '<td>' + lineNum + '</td>';
        row += '<td>' + escHtml(pi.desc) + '</td>';
        if (pi.showUnit) {
          const unitPrice = pi.qty ? displayPrice / pi.qty : 0;
          if (showQty) row += '<td class="text-right prop-qty">' + pi.qty + '</td><td>' + escHtml(pi.unit) + '</td>';
          if (showPrices) row += '<td class="text-right">' + proposalPriceInput(unitPrice, 'prop-unit') + '</td><td class="text-right">' + proposalPriceInput(displayPrice, 'prop-ext') + '</td>';
        } else {
          if (showQty) row += '<td class="text-right prop-qty">1</td><td>LS</td>';
          if (showPrices) row += '<td class="text-right">' + proposalPriceInput(displayPrice, 'prop-unit') + '</td><td class="text-right">' + proposalPriceInput(displayPrice, 'prop-ext') + '</td>';
        }
        row += '</tr>';
        rowsHtml += row;
      });

      // Consumables - respect display mode
      if (consum > 0 && consumDisplay === 'show') {
        lineNum++;
        let row = '<tr>';
        row += '<td>' + lineNum + '</td>';
        row += '<td>Consumables &amp; Misc Supplies</td>';
        if (showQty) row += '<td class="text-right prop-qty">1</td><td>LS</td>';
        if (showPrices) row += '<td class="text-right">' + proposalPriceInput(consum, 'prop-unit') + '</td><td class="text-right">' + proposalPriceInput(consum, 'prop-ext') + '</td>';
        row += '</tr>';
        rowsHtml += row;
        subtotal += consum;
      } else if (consum > 0 && consumDisplay === 'totalOnly') {
        subtotal += consum;
      }
      // foldInto for simple mode: handled below when no proposalConfig
    } else {
      // No proposal config — original format
      let lineNum = 0;
      b.items.forEach(it => {
        lineNum++;
        const itemTotal = calcItemTotal(it);
        const unitPrice = it.qty ? itemTotal / it.qty : 0;
        subtotal += itemTotal;
        let row = '<tr>';
        row += '<td>' + lineNum + '</td>';
        row += '<td>' + escHtml(it.description) + '</td>';
        if (showQty) row += '<td class="text-right prop-qty">' + it.qty + '</td><td>' + escHtml(it.unit) + '</td>';
        if (showPrices) row += '<td class="text-right">' + proposalPriceInput(unitPrice, 'prop-unit') + '</td><td class="text-right">' + proposalPriceInput(itemTotal, 'prop-ext') + '</td>';
        row += '</tr>';
        rowsHtml += row;
      });

      b.laborItems.forEach(it => {
        lineNum++;
        const itemTotal = calcLaborTotal(it);
        subtotal += itemTotal;
        let row = '<tr>';
        row += '<td>' + lineNum + '</td>';
        row += '<td>' + escHtml(it.description) + '</td>';
        if (it.lumpSum) {
          if (showQty) row += '<td class="text-right prop-qty">1</td><td>LS</td>';
          if (showPrices) row += '<td class="text-right">' + proposalPriceInput(itemTotal, 'prop-unit') + '</td><td class="text-right">' + proposalPriceInput(itemTotal, 'prop-ext') + '</td>';
        } else {
          if (showQty) row += '<td class="text-right prop-qty">' + it.hours + '</td><td>HRS</td>';
          if (showPrices) row += '<td class="text-right">' + proposalPriceInput(it.hours ? itemTotal / it.hours : 0, 'prop-unit') + '</td><td class="text-right">' + proposalPriceInput(itemTotal, 'prop-ext') + '</td>';
        }
        row += '</tr>';
        rowsHtml += row;
      });

      if (consum > 0 && consumDisplay === 'show') {
        lineNum++;
        let row = '<tr>';
        row += '<td>' + lineNum + '</td>';
        row += '<td>Consumables &amp; Misc Supplies</td>';
        if (showQty) row += '<td class="text-right prop-qty">1</td><td>LS</td>';
        if (showPrices) row += '<td class="text-right">' + proposalPriceInput(consum, 'prop-unit') + '</td><td class="text-right">' + proposalPriceInput(consum, 'prop-ext') + '</td>';
        row += '</tr>';
        rowsHtml += row;
        subtotal += consum;
      } else if (consum > 0 && consumDisplay === 'totalOnly') {
        subtotal += consum;
      } else if (consum > 0 && consumDisplay === 'foldInto') {
        // For simple mode fold-into: add to subtotal (it shows in the target item's editable price)
        subtotal += consum;
      }
    }
  }

  // Exclusions - new format
  migrateExclusionsIfNeeded(b);
  const checkedExcl = (b.exclusions || []).filter(e => e.checked).map(e => e.text);
  if (b.customExclusions) {
    b.customExclusions.split('\n').forEach(line => {
      const t = line.trim();
      if (t) checkedExcl.push(t);
    });
  }
  const exclHtml = checkedExcl.length
    ? '<ul>' + checkedExcl.map(e => '<li>' + escHtml(e) + '</li>').join('') + '</ul>'
    : '<p>None</p>';

  // Terms
  const checkedTerms = (b.terms || []).filter(t => t.checked).map(t => t.text);
  const termsHtml = checkedTerms.length
    ? '<ul>' + checkedTerms.map(t => '<li>' + escHtml(t) + '</li>').join('') + '</ul>' +
      '<p class="prop-terms-accept">Acceptance of this proposal confirms agreement to all listed terms and conditions.</p>'
    : '';

  const dateStr = b.approvedAt ? new Date(b.approvedAt).toLocaleDateString() : new Date().toLocaleDateString();

  // Customer notes
  const notesHtml = b.customerNotes ? '<div class="prop-notes"><h4>Notes</h4><p>' + escHtml(b.customerNotes).replace(/\n/g, '<br>') + '</p></div>' : '';

  // Sales tax — shown as its own line so the columns add up for the customer
  const propSalesTax = calcSalesTax(b);
  let taxRowHtml = '';
  let bakedTaxHtml = '';
  if (b.taxEnabled !== false && propSalesTax > 0) {
    const itemsOnlySubtotal = subtotal;
    subtotal += propSalesTax;
    bakedTaxHtml = '<input type="hidden" id="proposalBakedTax" value="' + propSalesTax.toFixed(2) + '">';
    if (showPrices) {
      taxRowHtml = '<tr class="prop-subtotal-row"><td colspan="' + (colSpan - 1) + '" style="text-align:right">Subtotal</td><td class="text-right" id="proposalItemsSubtotal">' + money(itemsOnlySubtotal) + '</td></tr>' +
        '<tr class="prop-tax-row"><td colspan="' + (colSpan - 1) + '" style="text-align:right">Sales Tax</td><td class="text-right">' + money(propSalesTax) + '</td></tr>';
    }
  }

  // Total row — id for live recalculation
  const baseLabel = altItems.length ? 'TOTAL BASE BID' : 'TOTAL';
  const totalHtml = showPrices ? 
    taxRowHtml + '<tr class="prop-total-row"><td colspan="' + (colSpan - 1) + '" style="text-align:right"><strong>' + baseLabel + '</strong></td><td class="text-right"><strong id="proposalGrandTotal">' + money(subtotal) + '</strong></td></tr>' :
    '<tr class="prop-total-row"><td colspan="' + colSpan + '" style="text-align:right"><strong>' + baseLabel + ': <span id="proposalGrandTotal">' + money(subtotal) + '</span></strong></td></tr>';

  // Alternates section — priced separately, tax baked into each ADD price
  let altSectionHtml = '';
  if (altItems.length) {
    let altRows = '';
    let altTotal = 0;
    altItems.forEach(item => {
      const ext = calcAdvItemExtension(item) + calcAdvItemSalesTax(b, item);
      altTotal += ext;
      altRows += '<tr>' +
        '<td>ALT ' + (item.itemNumber || '') + '</td>' +
        '<td>' + escHtml(item.description || '') + '</td>' +
        (showQty ? '<td class="text-right">' + fmtNum(item.qty) + '</td><td>' + escHtml(item.unit || '') + '</td>' : '') +
        (showPrices ? '<td class="text-right" colspan="2"><strong>ADD ' + money(ext) + '</strong></td>' : '') +
        '</tr>';
    });
    altSectionHtml = '<div class="prop-alternates"><h4>ALTERNATES <span style="font-weight:normal;font-size:0.85em;">(add to base bid if accepted)</span></h4>' +
      '<table><thead><tr>' + thHtml.replace('<th>Item</th>', '<th>Alt</th>') + '</tr></thead><tbody>' + altRows +
      (showPrices ? '<tr class="prop-total-row"><td colspan="' + (colSpan - 1) + '" style="text-align:right"><strong>TOTAL WITH ALL ALTERNATES</strong></td><td class="text-right"><strong>' + money(subtotal + altTotal) + '</strong></td></tr>' : '') +
      '</tbody></table></div>';
  }

  $('proposalPage').innerHTML = 
    '<div class="prop-header">' +
      '<img src="img/logo.jpg" alt="RD McKinney Plumbing and Excavating" class="prop-logo">' +
    '</div>' +
    '<div class="prop-title">PROPOSAL</div>' +
    '<div class="prop-info-grid">' +
      '<div class="prop-info-left">' +
        '<div><strong>Prepared For:</strong></div>' +
        '<div>' + escHtml(b.clientName || '') + '</div>' +
        (b.clientContact && b.clientContact !== b.clientName ? '<div>' + escHtml(b.clientContact) + '</div>' : '') +
        '<div>' + escHtml(b.projectAddress || '') + '</div>' +
        (b.clientEmail ? '<div>' + escHtml(b.clientEmail) + '</div>' : '') +
        (b.clientPhone ? '<div>' + escHtml(b.clientPhone) + '</div>' : '') +
      '</div>' +
      '<div class="prop-info-right">' +
        '<div><strong>Proposal #:</strong> ' + escHtml(b.bidNumber) + '</div>' +
        '<div><strong>Date:</strong> ' + dateStr + '</div>' +
      '</div>' +
    '</div>' +
    (b.projectDescription ? '<div class="prop-scope"><h4>Scope of Work</h4><p>' + escHtml(b.projectDescription) + '</p></div>' : '') +
    bakedTaxHtml +
    '<table>' +
      '<thead><tr>' + thHtml + '</tr></thead>' +
      '<tbody>' + rowsHtml + totalHtml + '</tbody>' +
    '</table>' +
    altSectionHtml +
    notesHtml +
    '<div class="prop-exclusions"><h4>EXCLUSIONS / CLARIFICATIONS</h4>' + exclHtml + '</div>' +
    (termsHtml ? '<div class="prop-terms"><h4>TERMS AND CONDITIONS</h4>' + termsHtml + '</div>' : '') +
    '<div class="prop-footer">' +
      '<div class="prop-sig-line">' +
        '<div class="prop-sig-block">' +
          '<div class="prop-sig-field">&nbsp;</div>' +
          '<div class="prop-sig-label">Accepted By (Signature)</div>' +
        '</div>' +
        '<div class="prop-sig-block">' +
          '<div class="prop-sig-field">&nbsp;</div>' +
          '<div class="prop-sig-label">Date</div>' +
        '</div>' +
      '</div>' +
      '<div class="prop-bottom-right">' +
        '<div>Ryan McKinney, President</div>' +
        '<div>515-993-7802 ryan@rdmpe.com</div>' +
      '</div>' +
    '</div>';
  setupProposalPriceListeners();
}


// ===== FIELD WORK ORDER =====
function printFieldWorkOrder() {
  const b = currentBid;
  if (!b) return;
  gatherBidData();

  const isAdv = b.estimateMode === 'advanced' && (b.advancedItems || []).length > 0;
  let scopeRows = '';
  let n = 0;
  if (isAdv) {
    (b.advancedItems || []).forEach(it => {
      n++;
      scopeRows += `<tr><td>${n}</td><td>${escHtml(it.description || '')}${it.isAlternate ? ' <strong>(ALTERNATE — confirm before doing)</strong>' : ''}</td><td class="tr">${fmtNum(it.qty || 0)}</td><td>${escHtml(it.unit || '')}</td><td class="chk">☐</td></tr>`;
    });
  } else {
    (b.items || []).forEach(it => {
      n++;
      scopeRows += `<tr><td>${n}</td><td>${escHtml(it.description || '')}</td><td class="tr">${fmtNum(it.qty || 0)}</td><td>${escHtml(it.unit || '')}</td><td class="chk">☐</td></tr>`;
    });
    (b.laborItems || []).forEach(it => {
      n++;
      scopeRows += `<tr><td>${n}</td><td>${escHtml(it.description || '')}</td><td class="tr">${it.lumpSum ? '1' : fmtNum(it.hours || 0)}</td><td>${it.lumpSum ? 'LS' : 'HRS'}</td><td class="chk">☐</td></tr>`;
    });
  }
  if (!scopeRows) scopeRows = '<tr><td colspan="5" style="text-align:center;color:#888;">No line items</td></tr>';

  // Exclusions (what we are NOT doing — useful for crew)
  migrateExclusionsIfNeeded(b);
  const excl = (b.exclusions || []).filter(e => e.checked).map(e => e.text);
  if (b.customExclusions) b.customExclusions.split('\n').forEach(l => { if (l.trim()) excl.push(l.trim()); });
  const exclHtml = excl.length ? '<ul>' + excl.map(e => `<li>${escHtml(e)}</li>`).join('') + '</ul>' : '<p>None listed</p>';

  const w = window.open('', '_blank');
  if (!w) { showToast('Pop-up blocked — allow pop-ups to print the work order.', true); return; }
  w.document.write(`<!DOCTYPE html><html><head><title>Field Work Order — ${escHtml(b.bidNumber || '')}</title>
<style>
  body { font-family: Arial, Helvetica, sans-serif; margin: 30px; color: #111; font-size: 13px; }
  .fwo-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #1a5632; padding-bottom: 12px; margin-bottom: 16px; }
  .fwo-header img { height: 60px; }
  .fwo-title { text-align: right; }
  .fwo-title h1 { margin: 0; font-size: 22px; color: #1a5632; }
  .fwo-title .num { font-size: 14px; color: #555; }
  .fwo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 24px; margin-bottom: 14px; }
  .fwo-grid .lbl { font-weight: bold; color: #1a5632; font-size: 11px; text-transform: uppercase; }
  .fwo-grid .val { border-bottom: 1px solid #ccc; padding: 2px 0 4px; min-height: 18px; }
  h2 { font-size: 15px; color: #1a5632; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin: 18px 0 8px; }
  table { width: 100%; border-collapse: collapse; }
  th { background: #1a5632; color: #fff; text-align: left; padding: 6px 8px; font-size: 12px; }
  td { border: 1px solid #ccc; padding: 6px 8px; }
  .tr { text-align: right; }
  .chk { text-align: center; font-size: 16px; width: 50px; }
  ul { margin: 4px 0; padding-left: 20px; }
  .notes-box { border: 1px solid #ccc; min-height: 90px; padding: 8px; margin-top: 4px; }
  .fwo-sig { display: flex; gap: 40px; margin-top: 36px; }
  .fwo-sig div { flex: 1; border-top: 1px solid #333; padding-top: 4px; font-size: 12px; }
  @media print { body { margin: 12px; } }
</style></head><body>
<div class="fwo-header">
  <img src="img/logo.jpg" alt="RD McKinney">
  <div class="fwo-title"><h1>FIELD WORK ORDER</h1><div class="num">Bid ${escHtml(b.bidNumber || '')} &nbsp;•&nbsp; ${new Date().toLocaleDateString()}</div></div>
</div>
<div class="fwo-grid">
  <div><div class="lbl">Customer</div><div class="val">${escHtml(b.clientName || '')}</div></div>
  <div><div class="lbl">Contact</div><div class="val">${escHtml(b.clientContact || '')} ${escHtml(b.clientPhone || '')}</div></div>
  <div><div class="lbl">Job Address</div><div class="val">${escHtml(b.projectAddress || '')}</div></div>
  <div><div class="lbl">Job Type</div><div class="val">${escHtml(b.jobType || '')}</div></div>
  <div style="grid-column:1/-1"><div class="lbl">Project Description</div><div class="val">${escHtml(b.projectDescription || '')}</div></div>
  <div><div class="lbl">Scheduled Start</div><div class="val">&nbsp;</div></div>
  <div><div class="lbl">Crew / Foreman</div><div class="val">&nbsp;</div></div>
</div>
<h2>Scope of Work</h2>
<table>
  <thead><tr><th>#</th><th>Work Item</th><th class="tr">Qty</th><th>Unit</th><th class="chk">Done</th></tr></thead>
  <tbody>${scopeRows}</tbody>
</table>
<h2>Not Included (Exclusions)</h2>
${exclHtml}
${b.customerNotes ? `<h2>Notes from Estimate</h2><p>${escHtml(b.customerNotes)}</p>` : ''}
<h2>Field Notes</h2>
<div class="notes-box">&nbsp;</div>
<div class="fwo-sig">
  <div>Foreman Signature</div>
  <div>Date Completed</div>
</div>
<script>window.onload = () => setTimeout(() => window.print(), 400);<\/script>
</body></html>`);
  w.document.close();
}

// ===== ADVANCED BUILDER FUNCTIONS =====
let editingAdvItemIdx = -1; // -1 = new item
let editingCosts = []; // temporary costs array while editing

function calcCostTotal(c) {
  const base = (c.qty || 0) * (c.unitCost || 0);
  const mu = base * (c.markupPct || 0) / 100;
  const oh = base * (c.overheadPct || 0) / 100;
  // Bond is now project-level (% of bid price), not per-cost-row
  return base + mu + oh;
}

function calcCostTotalNoMarkup(c) {
  return (c.qty || 0) * (c.unitCost || 0);
}

function calcAdvItemTotal(item) {
  return (item.costs || []).reduce((sum, c) => {
    return sum + (item.noMarkup ? calcCostTotalNoMarkup(c) : calcCostTotal(c));
  }, 0);
}

function calcAdvItemBidUnit(item) {
  if (item.bidUnitOverride != null && item.bidUnitOverride !== '') return parseFloat(item.bidUnitOverride) || 0;
  const total = calcAdvItemTotal(item);
  return item.qty > 0 ? total / item.qty : 0;
}

function calcAdvItemExtension(item) {
  return calcAdvItemBidUnit(item) * (item.qty || 0);
}

function fmtNum(n) {
  if (n == null) return '';
  // Format with commas, remove trailing zeros after decimal
  const s = parseFloat(n);
  if (Number.isInteger(s)) return s.toLocaleString();
  return s.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 4 });
}

function renderAdvancedItems() {
  if (!currentBid) return;
  const items = currentBid.advancedItems || [];
  const show = items.length > 0;
  if ($('noAdvItems')) $('noAdvItems').style.display = show ? 'none' : '';
  if ($('advItemsTable')) $('advItemsTable').style.display = show ? '' : 'none';
  if (!$('advItemsBody')) return;

  // Sort by item number for display
  const sorted = items.map((it, i) => ({...it, _origIdx: i})).sort((a, b) => (a.itemNumber || 0) - (b.itemNumber || 0));

  const WORK_DAY = 8;
  $('advItemsBody').innerHTML = sorted.map(item => {
    const bidUnit = calcAdvItemBidUnit(item);
    const ext = calcAdvItemExtension(item);
    const costCount = (item.costs || []).length;
    const qty = item.qty || 0;
    const unit = item.unit || 'EA';

    // Production metrics for this item
    let labHrs = 0, eqHrs = 0;
    (item.costs || []).forEach(c => {
      if (c.type === 'labor') labHrs += (c.qty || 0);
      else if (c.type === 'equipment') eqHrs += (c.qty || 0);
    });
    const maxHrs = Math.max(labHrs, eqHrs);
    const days = maxHrs > 0 ? maxHrs / WORK_DAY : 0;
    const unitsPerDay = days > 0 ? qty / days : 0;
    const hrsPerUnit = qty > 0 ? maxHrs / qty : 0;
    const hasProd = maxHrs > 0 && qty > 0;

    const prodRow = hasProd ? `<tr class="prod-table-row">
      <td></td>
      <td colspan="5">
        <div class="prod-bar">
          <span><span class="prod-label">Rate</span> <input type="number" class="prod-edit prod-table-edit" data-item-idx="${item._origIdx}" data-field="unitsPerDay" value="${unitsPerDay.toFixed(1)}" step="0.1" min="0.1"> <span class="prod-value">${unit}/day</span></span>
          <span class="prod-sep">|</span>
          <span><span class="prod-label">Days</span> <input type="number" class="prod-edit prod-table-edit" data-item-idx="${item._origIdx}" data-field="days" value="${days.toFixed(1)}" step="0.1" min="0.1"></span>
          <span class="prod-sep">|</span>
          <span><span class="prod-label">Hrs/${unit}</span> <span class="prod-value">${hrsPerUnit.toFixed(2)}</span></span>
          <span class="prod-sep">|</span>
          <span><span class="prod-label">Labor</span> <span class="prod-value">${labHrs.toFixed(1)} hrs</span></span>
          <span class="prod-sep">|</span>
          <span><span class="prod-label">Equip</span> <span class="prod-value">${eqHrs.toFixed(1)} hrs</span></span>
        </div>
      </td>
      <td></td>
    </tr>` : '';

    return `<tr data-adv-idx="${item._origIdx}" title="Click to edit (${costCount} cost component${costCount !== 1 ? 's' : ''})"${item.isAlternate ? ' style="background:#fefce8"' : ''}>
      <td class="text-center"><strong>${item.itemNumber || ''}</strong></td>
      <td>${escHtml(item.description || '')}${item.isAlternate ? ' <span class="alt-badge">ALT</span>' : ''}</td>
      <td class="text-right">${fmtNum(item.qty)}</td>
      <td>${escHtml(item.unit || '')}</td>
      <td class="text-right">${money(bidUnit)}</td>
      <td class="text-right"><strong>${money(ext)}</strong></td>
      <td>
        <button class="delete-item-btn adv-del-btn" data-adv-idx="${item._origIdx}" title="Delete">&times;</button>
      </td>
    </tr>${prodRow}`;
  }).join('');

  // Update subtotal (base items only — alternates priced separately)
  const total = items.reduce((s, it) => s + (it.isAlternate ? 0 : calcAdvItemExtension(it)), 0);
  if ($('advSubtotal')) $('advSubtotal').textContent = money(total);
}

function getNextItemNumber() {
  const items = currentBid.advancedItems || [];
  if (items.length === 0) return 1;
  return Math.max(...items.map(it => it.itemNumber || 0)) + 1;
}

function showAdvItemEditor(idx) {
  editingAdvItemIdx = idx;
  const isNew = idx < 0;
  const s = appSettings || DEFAULT_SETTINGS;

  if (isNew) {
    $('advItemModalTitle').textContent = 'Add Bid Item';
    $('advItemNum').value = getNextItemNumber();
    $('advItemDesc').value = '';
    $('advItemQty').value = 1;
    $('advItemUnit').value = 'EA';
    $('advItemBidOverride').value = '';
    $('advItemNoMarkup').checked = false;
    if ($('advItemAlternate')) $('advItemAlternate').checked = false;
    editingCosts = [];
  } else {
    const item = currentBid.advancedItems[idx];
    $('advItemModalTitle').textContent = 'Edit Bid Item #' + (item.itemNumber || '');
    $('advItemNum').value = item.itemNumber || '';
    $('advItemDesc').value = item.description || '';
    $('advItemQty').value = item.qty || 1;
    $('advItemUnit').value = item.unit || 'EA';
    $('advItemBidOverride').value = item.bidUnitOverride != null ? item.bidUnitOverride : '';
    $('advItemNoMarkup').checked = !!item.noMarkup;
    if ($('advItemAlternate')) $('advItemAlternate').checked = !!item.isAlternate;
    editingCosts = JSON.parse(JSON.stringify(item.costs || []));
  }

  renderCostRows();
  recalcAdvItemTotals();
  $('advCatSearchPanel').style.display = 'none';
  $('advItemModal').style.display = 'flex';
  $('advItemDesc').focus();
}

function renderCostRows() {
  const hasCosts = editingCosts.length > 0;
  $('noCosts').style.display = hasCosts ? 'none' : '';
  $('costsTable').style.display = hasCosts ? '' : 'none';
  if (!hasCosts) return;

  const s = appSettings || DEFAULT_SETTINGS;
  $('costsBody').innerHTML = editingCosts.map((c, i) => {
    const total = $('advItemNoMarkup').checked ? calcCostTotalNoMarkup(c) : calcCostTotal(c);
    const typeClass = 'cost-type-' + c.type;
    const typeLabel = c.type === 'equipment' ? 'Equip' : (c.type === 'subcontractor' ? 'Sub' : c.type.charAt(0).toUpperCase() + c.type.slice(1));
    return `<tr>
      <td><span class="cost-type-badge ${typeClass}">${typeLabel}</span></td>
      <td><input type="text" value="${escHtml(c.description || '')}" data-cidx="${i}" data-cf="description"></td>
      <td><input type="number" value="${c.qty || ''}" data-cidx="${i}" data-cf="qty" step="any" min="0"></td>
      <td><input type="text" value="${escHtml(c.unit || '')}" data-cidx="${i}" data-cf="unit" style="width:40px"></td>
      <td><input type="number" value="${c.unitCost || ''}" data-cidx="${i}" data-cf="unitCost" step="0.01" min="0"></td>
      <td><input type="number" value="${c.markupPct || 0}" data-cidx="${i}" data-cf="markupPct" step="0.1"></td>
      <td><input type="number" value="${c.overheadPct || 0}" data-cidx="${i}" data-cf="overheadPct" step="0.1"></td>
      <td style="text-align:center">${(c.type === 'material' || c.type === 'subcontractor') ? '<input type="checkbox" ' + (c.taxable !== false ? 'checked' : '') + ' data-cidx="' + i + '" data-cf="taxable" title="Taxable">' : '-'}</td>
      <td class="text-right"><strong>${money(total)}</strong></td>
      <td><button class="cost-delete-btn" data-cidx="${i}">&times;</button></td>
    </tr>`;
  }).join('');
}

function addCostRow(type) {
  const s = appSettings || DEFAULT_SETTINGS;
  const defMU = s.defaultMarkupPct || 20;
  const defOH = s.defaultOverheadPct || 10;
  const defBond = s.defaultBondPct || 2.5;

  const cost = {
    id: uid('cost'),
    type: type, // material, labor, equipment, subcontractor
    description: '',
    qty: type === 'material' ? 1 : (type === 'subcontractor' ? 1 : 8),
    unit: type === 'material' ? 'EA' : (type === 'subcontractor' ? 'LS' : 'HRS'),
    unitCost: 0,
    markupPct: defMU,
    overheadPct: (type === 'material' || type === 'subcontractor') ? 0 : defOH,
    bondPct: (type === 'material') ? 0 : defBond
  };

  if (type === 'material') { cost.taxable = true; }
  if (type === 'labor') { cost.description = 'Labor'; cost.unitCost = 85; }
  if (type === 'equipment') { cost.description = 'Equipment'; cost.unitCost = 150; }
  if (type === 'subcontractor') { cost.description = 'Subcontractor'; cost.taxable = false; }

  editingCosts.push(cost);
  renderCostRows();
  recalcAdvItemTotals();
}

// ── Crew Picker for Advanced Items ──
function openAdvCrewPicker() {
  const s = appSettings || DEFAULT_SETTINGS;
  const crews = s.crewCompositions || [];
  const panel = $('advCrewPickerPanel');
  const list = $('advCrewPickerList');
  
  if (crews.length === 0) {
    list.innerHTML = '<p style="color:#888;font-style:italic;padding:8px;">No crews defined yet. Go to Settings → Crew Compositions to create one.</p>';
  } else {
    list.innerHTML = crews.map((c, i) => {
      const laborRate = calcCrewLaborRate(c);
      const equipRate = calcCrewEquipRate(c);
      const totalRate = laborRate + equipRate;
      const memberList = (c.members || []).map(m => `${m.qty || 1}x ${escHtml(m.title)}`).join(', ');
      const equipList = (c.equipment || []).map(e => escHtml(e.title)).join(', ');
      return `<div class="adv-crew-option" data-crew-idx="${i}" style="padding:10px 12px;border:1px solid #e0e0e0;border-radius:6px;margin-bottom:6px;cursor:pointer;transition:background 0.15s;">
        <div style="font-weight:600;color:#1a237e;">${escHtml(c.name)} <span style="float:right;color:#2e7d32;">${money(totalRate)}/hr</span></div>
        <div style="font-size:0.85em;color:#666;margin-top:2px;">Labor: ${memberList || 'None'} — ${money(laborRate)}/hr</div>
        ${equipList ? `<div style="font-size:0.85em;color:#666;">Equipment: ${equipList} — ${money(equipRate)}/hr</div>` : ''}
      </div>`;
    }).join('');
  }
  
  panel.style.display = 'block';
}

function addCrewAsCostRows(crewIdx) {
  const s = appSettings || DEFAULT_SETTINGS;
  const crew = (s.crewCompositions || [])[crewIdx];
  if (!crew) return;
  
  const defMU = s.defaultMarkupPct || 20;
  const defOH = s.defaultOverheadPct || 10;
  const defBond = s.defaultBondPct || 2.5;
  
  // Add each labor member as a cost row
  (crew.members || []).forEach(m => {
    editingCosts.push({
      id: uid('cost'),
      type: 'labor',
      description: `${escHtml(m.title)} (${escHtml(crew.name)})`,
      qty: m.qty || 1,
      unit: 'HRS',
      unitCost: m.rate || 0,
      markupPct: defMU,
      overheadPct: defOH,
      bondPct: defBond,
      taxable: false
    });
  });
  
  // Add each equipment item as a cost row
  (crew.equipment || []).forEach(e => {
    editingCosts.push({
      id: uid('cost'),
      type: 'equipment',
      description: `${escHtml(e.title)} (${escHtml(crew.name)})`,
      qty: 1,
      unit: 'HRS',
      unitCost: e.rate || 0,
      markupPct: defMU,
      overheadPct: 0,
      bondPct: defBond,
      taxable: false
    });
  });
  
  renderCostRows();
  recalcAdvItemTotals();
  $('advCrewPickerPanel').style.display = 'none';
  showToast(`Added crew "${crew.name}" — ${(crew.members || []).length} labor + ${(crew.equipment || []).length} equipment rows`);
  scheduleAutoSave();
}

function addCatalogItemAsCost(catItem) {
  const s = appSettings || DEFAULT_SETTINGS;
  editingCosts.push({
    id: uid('cost'),
    type: 'material',
    description: catItem.d,
    qty: 1,
    unit: catItem.u,
    unitCost: catItem.p,
    markupPct: s.defaultMarkupPct || 20,
    overheadPct: 0,
    bondPct: 0,
    taxable: true
  });
  renderCostRows();
  recalcAdvItemTotals();
  $('advCatSearchPanel').style.display = 'none';
  showToast('Added: ' + catItem.d);
  scheduleAutoSave();
}

function recalcAdvItemTotals() {
  const noMU = $('advItemNoMarkup').checked;
  const totalCost = editingCosts.reduce((s, c) => s + (noMU ? calcCostTotalNoMarkup(c) : calcCostTotal(c)), 0);
  const qty = parseFloat($('advItemQty').value) || 0;
  const calcBU = qty > 0 ? totalCost / qty : 0;
  const override = $('advItemBidOverride').value;

  $('advItemTotalCost').textContent = money(totalCost);
  $('advItemCalcBU').textContent = money(calcBU);

  // Update all cost row totals
  editingCosts.forEach((c, i) => {
    const total = noMU ? calcCostTotalNoMarkup(c) : calcCostTotal(c);
    const cell = document.querySelector(`#costsBody tr:nth-child(${i+1}) td:nth-last-child(2) strong`);
    if (cell) cell.textContent = money(total);
  });
}

function saveAdvItem() {
  const num = parseInt($('advItemNum').value) || 0;
  const desc = $('advItemDesc').value.trim();
  if (!desc) { showToast('Description is required', true); return; }
  const qty = parseFloat($('advItemQty').value) || 0;
  if (qty <= 0) { showToast('Quantity must be > 0', true); return; }

  const overrideVal = $('advItemBidOverride').value.trim();
  const item = {
    id: editingAdvItemIdx >= 0 ? currentBid.advancedItems[editingAdvItemIdx].id : uid('adv'),
    itemNumber: num,
    description: desc,
    qty: qty,
    unit: $('advItemUnit').value.trim() || 'EA',
    noMarkup: $('advItemNoMarkup').checked,
    isAlternate: $('advItemAlternate') ? $('advItemAlternate').checked : false,
    bidUnitOverride: overrideVal !== '' ? parseFloat(overrideVal) : null,
    costs: JSON.parse(JSON.stringify(editingCosts))
  };

  if (!currentBid.advancedItems) currentBid.advancedItems = [];

  if (editingAdvItemIdx >= 0) {
    currentBid.advancedItems[editingAdvItemIdx] = item;
    showToast('Item #' + num + ' updated');
  } else {
    currentBid.advancedItems.push(item);
    showToast('Item #' + num + ' added');
  }

  $('advItemModal').style.display = 'none';
  renderAdvancedItems();
  updateAdvBidSummary(currentBid);
  recalcSummary();
}

function deleteAdvItem(idx) {
  const item = currentBid.advancedItems[idx];
  if (!confirm('Delete Item #' + (item.itemNumber || '') + ' "' + (item.description || '') + '"?')) return;
  currentBid.advancedItems.splice(idx, 1);
  renderAdvancedItems();
  updateAdvBidSummary(currentBid);
  recalcSummary();
  showToast('Item deleted');
  scheduleAutoSave();
}

function showAdvCatalogSearch() {
  $('advCatSearchPanel').style.display = '';
  $('advCatSearchInput').value = '';
  renderAdvCatResults();
  $('advCatSearchInput').focus();
}

function renderAdvCatResults() {
  const q = ($('advCatSearchInput').value || '').toLowerCase();
  const pt = $('advCatSearchPT').value;
  let items = CATALOG;
  if (pt) items = items.filter(it => (it.pt || 'Septic') === pt);
  if (q) items = items.filter(it => it.d.toLowerCase().includes(q));
  items = items.slice(0, 50); // limit results

  if (items.length === 0) {
    $('advCatResults').innerHTML = '<div style="padding:8px;color:#999;text-align:center">No items found</div>';
    return;
  }

  $('advCatResults').innerHTML = items.map((it, i) => {
    const realIdx = CATALOG.indexOf(it);
    return `<div class="adv-cat-result-item" data-cat-real-idx="${realIdx}">
      <span class="cat-r-desc">${escHtml(it.d)}</span>
      <span style="color:#666;margin:0 6px">${escHtml(it.u)}</span>
      <span class="cat-r-price">${money(it.p)}</span>
    </div>`;
  }).join('');
}


// ===== SETTINGS SCREEN =====
function showSettings() {
  // Reset to first tab
  document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.settings-tab-panel').forEach(p => p.classList.remove('active'));
  const firstTab = document.querySelector('.settings-tab');
  const firstPanel = document.querySelector('.settings-tab-panel');
  if (firstTab) firstTab.classList.add('active');
  if (firstPanel) firstPanel.classList.add('active');

  showScreen('settingsScreen');
  const s = appSettings || DEFAULT_SETTINGS;
  $('setMarkup').value = s.defaultMarkupPct;
  $('setOverhead').value = s.defaultOverheadPct;
  $('setBond').value = s.defaultBondPct;
  $('setConsumables').value = s.defaultConsumables != null ? s.defaultConsumables : 100;
  $('setTaxRate').value = s.defaultTaxRate != null ? s.defaultTaxRate : 7;
  renderSettingsExclusions();
  renderSettingsCatalog();
  renderSettingsLaborRates();
  renderSettingsEquipmentRates();
  renderSettingsCrewComps();
  renderSettingsTemplates();
  renderPendingCatalogItems();

  // Load estimator controls
  const ec = s.estimatorControls || DEFAULT_SETTINGS.estimatorControls;
  $('estDefaultMode').value = ec.defaultMode || 'simple';
  $('estDefaultShowPrices').checked = !!ec.defaultShowPrices;
  $('estLockShowPrices').checked = !!ec.lockShowPrices;
  $('estDefaultShowQty').checked = !!ec.defaultShowQty;
  $('estLockShowQty').checked = !!ec.lockShowQty;
  $('estDefaultOverhead').checked = ec.defaultOverhead !== false;
  $('estCanToggleOverhead').checked = ec.canToggleOverhead !== false;
  $('estDefaultBond').checked = ec.defaultBond !== false;
  $('estCanToggleBond').checked = ec.canToggleBond !== false;
  $('estDefaultLumpSum').checked = ec.defaultLumpSum !== false;
  $('estLockLumpSum').checked = !!ec.lockLumpSum;
  $('estCanSwitchMode').checked = ec.canSwitchMode !== false;
  $('estDefaultConsumables').value = ec.defaultConsumables != null ? ec.defaultConsumables : 100;
  $('estApprovalLocks').checked = ec.approvalLocks !== false;
}

function renderSettingsExclusions() {
  const s = appSettings || DEFAULT_SETTINGS;

  // Residential exclusions
  const resExcl = s.residentialExclusions || RESIDENTIAL_EXCLUSIONS;
  $('settingsResExclusions').innerHTML = resExcl.map((ex, i) => `
    <div class="excl-setting-row">
      <span>${escHtml(ex)}</span>
      <button data-res-excl-idx="${i}">Remove</button>
    </div>
  `).join('');

  // Residential terms
  const resTerms = s.residentialTerms || RESIDENTIAL_TERMS;
  $('settingsResTerms').innerHTML = resTerms.map((t, i) => `
    <div class="excl-setting-row">
      <span>${escHtml(t)}</span>
      <button data-res-term-idx="${i}">Remove</button>
    </div>
  `).join('');

  // Commercial exclusions
  const comExcl = s.commercialExclusions || COMMERCIAL_EXCLUSIONS;
  $('settingsComExclusions').innerHTML = comExcl.map((ex, i) => `
    <div class="excl-setting-row">
      <span>${escHtml(ex)}</span>
      <button data-com-excl-idx="${i}">Remove</button>
    </div>
  `).join('');

  // Commercial terms
  const comTerms = s.commercialTerms || COMMERCIAL_TERMS;
  $('settingsComTerms').innerHTML = comTerms.map((t, i) => `
    <div class="excl-setting-row">
      <span>${escHtml(t)}</span>
      <button data-com-term-idx="${i}">Remove</button>
    </div>
  `).join('');
}

async function saveSettings() {
  appSettings.defaultMarkupPct = parseFloat($('setMarkup').value) || 20;
  appSettings.defaultOverheadPct = parseFloat($('setOverhead').value) || 10;
  appSettings.defaultBondPct = parseFloat($('setBond').value) || 2.5;
  appSettings.defaultConsumables = parseFloat($('setConsumables').value) || 100;
  appSettings.defaultTaxRate = parseFloat($('setTaxRate').value) || 7;
  // Labor/Equipment/Crew are already updated in-memory via their add/edit/delete handlers
  // Just make sure the arrays exist
  if (!appSettings.laborRates) appSettings.laborRates = [];
  if (!appSettings.equipmentRates) appSettings.equipmentRates = [];
  if (!appSettings.crewCompositions) appSettings.crewCompositions = [];
  if (!appSettings.residentialExclusions) appSettings.residentialExclusions = [...RESIDENTIAL_EXCLUSIONS];
  if (!appSettings.residentialTerms) appSettings.residentialTerms = [...RESIDENTIAL_TERMS];
  if (!appSettings.commercialExclusions) appSettings.commercialExclusions = [...COMMERCIAL_EXCLUSIONS];
  if (!appSettings.commercialTerms) appSettings.commercialTerms = [...COMMERCIAL_TERMS];
  appSettings.estimatorControls = {
    defaultMode: $('estDefaultMode').value,
    defaultShowPrices: $('estDefaultShowPrices').checked,
    lockShowPrices: $('estLockShowPrices').checked,
    defaultShowQty: $('estDefaultShowQty').checked,
    lockShowQty: $('estLockShowQty').checked,
    defaultOverhead: $('estDefaultOverhead').checked,
    canToggleOverhead: $('estCanToggleOverhead').checked,
    defaultBond: $('estDefaultBond').checked,
    canToggleBond: $('estCanToggleBond').checked,
    defaultLumpSum: $('estDefaultLumpSum').checked,
    lockLumpSum: $('estLockLumpSum').checked,
    canSwitchMode: $('estCanSwitchMode').checked,
    defaultConsumables: parseFloat($('estDefaultConsumables').value) || 100,
    approvalLocks: $('estApprovalLocks').checked
  };
  try {
    await api('saveSettings', { body: appSettings });
    showToast('Settings saved!');
  } catch (e) {
    showToast('Failed to save settings: ' + e.message, true);
  }
}


// ===== SAVE CUSTOM ITEM TO CATALOG =====
function showSaveCustomModal(item) {
  $('saveCustomDesc').value = item.description || '';
  $('saveCustomUnit').value = item.unit || 'EA';
  $('saveCustomPrice').value = item.unitCost || item.rate || 0;
  $('saveCustomCategory').value = '';
  $('saveCustomProjectType').value = 'General';
  $('saveCustomModal').style.display = 'flex';
}

async function saveCustomToCatalog() {
  const desc = $('saveCustomDesc').value.trim();
  if (!desc) { showToast('Description required', true); return; }
  const newItem = {
    d: desc,
    u: $('saveCustomUnit').value.trim() || 'EA',
    p: parseFloat($('saveCustomPrice').value) || 0,
    v: $('saveCustomVendor') ? $('saveCustomVendor').value.trim() : '',
    c: $('saveCustomCategory').value.trim() || 'Custom',
    pt: $('saveCustomProjectType').value || 'General'
  };
  CATALOG.push(newItem);
  try {
    await api('saveCatalog', { body: CATALOG });
    showToast('Saved to catalog: ' + desc);
  } catch(e) {
    showToast('Save failed: ' + e.message, true);
  }
  $('saveCustomModal').style.display = 'none';
  renderCatalog();
}

// ===== CATALOG MANAGEMENT (Settings) =====
let catMgmtFilter = '';
let catMgmtEditIdx = -1;

// ===== SETTINGS: LABOR RATES =====
function renderSettingsLaborRates() {
  const s = appSettings || DEFAULT_SETTINGS;
  const rates = s.laborRates || [];
  const container = $('settingsLaborRates');
  if (!container) return;
  if (rates.length === 0) {
    container.innerHTML = '<p style="color:#888;font-style:italic;">No labor rates defined yet. Add worker types below.</p>';
    return;
  }
  container.innerHTML = rates.map((r, i) => `
    <div class="rate-setting-row">
      <span class="rate-title">${escHtml(r.title)}</span>
      <span class="rate-value">${money(r.rate)}/hr</span>
      <button class="btn btn-sm btn-outline" data-edit-labor="${i}">Edit</button>
      <button class="btn btn-sm btn-danger-outline" data-del-labor="${i}">×</button>
    </div>
  `).join('');
}

function addLaborRate() {
  const title = $('newLaborTitle').value.trim();
  const rate = parseFloat($('newLaborRate').value);
  if (!title) { showToast('Enter a title', true); return; }
  if (!rate || rate <= 0) { showToast('Enter a valid rate', true); return; }
  if (!appSettings.laborRates) appSettings.laborRates = [];
  appSettings.laborRates.push({ id: uid('lr'), title, rate });
  $('newLaborTitle').value = '';
  $('newLaborRate').value = '';
  renderSettingsLaborRates();
  showToast('Labor rate added — click Save Settings to keep');
}

function editLaborRate(idx) {
  const r = appSettings.laborRates[idx];
  if (!r) return;
  const newTitle = prompt('Labor title:', r.title);
  if (newTitle === null) return;
  const newRate = prompt('Hourly rate ($):', r.rate);
  if (newRate === null) return;
  r.title = newTitle.trim() || r.title;
  r.rate = parseFloat(newRate) || r.rate;
  renderSettingsLaborRates();
  showToast('Updated — click Save Settings to keep');
}

function deleteLaborRate(idx) {
  if (!confirm('Remove this labor rate?')) return;
  appSettings.laborRates.splice(idx, 1);
  renderSettingsLaborRates();
  showToast('Removed — click Save Settings to keep');
}

// ===== SETTINGS: EQUIPMENT RATES =====
function renderSettingsEquipmentRates() {
  const s = appSettings || DEFAULT_SETTINGS;
  const rates = s.equipmentRates || [];
  const container = $('settingsEquipmentRates');
  if (!container) return;
  if (rates.length === 0) {
    container.innerHTML = '<p style="color:#888;font-style:italic;">No equipment rates defined yet. Add equipment below.</p>';
    return;
  }
  container.innerHTML = rates.map((r, i) => `
    <div class="rate-setting-row">
      <span class="rate-title">${escHtml(r.title)}</span>
      <span class="rate-value">${money(r.rate)}/hr</span>
      <span class="rate-badge ${r.owned ? 'badge-owned' : 'badge-rental'}">${r.owned ? 'Owned' : 'Rental'}</span>
      <button class="btn btn-sm btn-outline" data-edit-equip="${i}">Edit</button>
      <button class="btn btn-sm btn-danger-outline" data-del-equip="${i}">×</button>
    </div>
  `).join('');
}

function addEquipmentRate() {
  const title = $('newEquipTitle').value.trim();
  const rate = parseFloat($('newEquipRate').value);
  const owned = $('newEquipOwned').checked;
  if (!title) { showToast('Enter equipment name', true); return; }
  if (!rate || rate <= 0) { showToast('Enter a valid rate', true); return; }
  if (!appSettings.equipmentRates) appSettings.equipmentRates = [];
  appSettings.equipmentRates.push({ id: uid('eq'), title, rate, owned });
  $('newEquipTitle').value = '';
  $('newEquipRate').value = '';
  $('newEquipOwned').checked = true;
  renderSettingsEquipmentRates();
  showToast('Equipment rate added — click Save Settings to keep');
}

function editEquipmentRate(idx) {
  const r = appSettings.equipmentRates[idx];
  if (!r) return;
  const newTitle = prompt('Equipment name:', r.title);
  if (newTitle === null) return;
  const newRate = prompt('Hourly rate ($):', r.rate);
  if (newRate === null) return;
  const newOwned = confirm('Is this equipment OWNED? (Cancel = Rental)');
  r.title = newTitle.trim() || r.title;
  r.rate = parseFloat(newRate) || r.rate;
  r.owned = newOwned;
  renderSettingsEquipmentRates();
  showToast('Updated — click Save Settings to keep');
}

function deleteEquipmentRate(idx) {
  if (!confirm('Remove this equipment rate?')) return;
  appSettings.equipmentRates.splice(idx, 1);
  renderSettingsEquipmentRates();
  showToast('Removed — click Save Settings to keep');
}

// ===== SETTINGS: CREW COMPOSITIONS =====
let editingCrewIdx = -1;

function renderSettingsCrewComps() {
  const s = appSettings || DEFAULT_SETTINGS;
  const crews = s.crewCompositions || [];
  const container = $('settingsCrewComps');
  if (!container) return;
  if (crews.length === 0) {
    container.innerHTML = '<p style="color:#888;font-style:italic;">No crews defined yet. Create crew compositions below.</p>';
    return;
  }
  container.innerHTML = crews.map((c, i) => {
    const laborRate = calcCrewLaborRate(c);
    const equipRate = calcCrewEquipRate(c);
    const totalRate = laborRate + equipRate;
    const memberList = (c.members || []).map(m => `${m.qty}x ${escHtml(m.title)}`).join(', ');
    const equipList = (c.equipment || []).map(e => escHtml(e.title)).join(', ');
    return `
      <div class="crew-setting-row">
        <div class="crew-info">
          <strong>${escHtml(c.name)}</strong>
          <div class="crew-detail">Labor: ${memberList || 'None'} — ${money(laborRate)}/hr</div>
          ${equipList ? `<div class="crew-detail">Equipment: ${equipList} — ${money(equipRate)}/hr</div>` : ''}
          <div class="crew-total">Total: ${money(totalRate)}/hr</div>
        </div>
        <div class="crew-actions">
          <button class="btn btn-sm btn-outline" data-edit-crew="${i}">Edit</button>
          <button class="btn btn-sm btn-danger-outline" data-del-crew="${i}">×</button>
        </div>
      </div>
    `;
  }).join('');
}

function calcCrewLaborRate(crew) {
  return (crew.members || []).reduce((sum, m) => sum + (m.rate || 0) * (m.qty || 1), 0);
}

function calcCrewEquipRate(crew) {
  return (crew.equipment || []).reduce((sum, e) => sum + (e.rate || 0), 0);
}

function openCrewCompModal(idx) {
  editingCrewIdx = idx;
  const s = appSettings || DEFAULT_SETTINGS;
  const isEdit = idx >= 0 && (s.crewCompositions || [])[idx];
  const crew = isEdit ? JSON.parse(JSON.stringify(s.crewCompositions[idx])) : { name: '', members: [], equipment: [] };
  
  $('crewCompModalTitle').textContent = isEdit ? 'Edit Crew Composition' : 'Add Crew Composition';
  $('crewCompName').value = crew.name;
  
  // Store temp crew data on the modal element
  $('crewCompModal')._crew = crew;
  
  renderCrewCompMembers();
  renderCrewCompEquipment();
  updateCrewCompRates();
  $('crewCompModal').style.display = 'flex';
  $('crewCompName').focus();
}

function renderCrewCompMembers() {
  const crew = $('crewCompModal')._crew;
  const container = $('crewCompMembers');
  const laborRates = (appSettings || DEFAULT_SETTINGS).laborRates || [];
  
  if (crew.members.length === 0) {
    container.innerHTML = '<p style="color:#888;font-size:0.9em;">No members added yet.</p>';
    return;
  }
  
  container.innerHTML = crew.members.map((m, i) => `
    <div class="crew-member-row">
      <select data-crew-member-idx="${i}" class="crew-member-select">
        <option value="">Select worker...</option>
        ${laborRates.map(lr => `<option value="${lr.id}" data-rate="${lr.rate}" ${m.laborRateId === lr.id ? 'selected' : ''}>${escHtml(lr.title)} — ${money(lr.rate)}/hr</option>`).join('')}
        <option value="custom" ${m.laborRateId === 'custom' ? 'selected' : ''}>Custom...</option>
      </select>
      <input type="number" class="crew-member-qty" data-crew-member-qty="${i}" value="${m.qty || 1}" min="1" step="1" style="width:60px;" title="Quantity">
      ${m.laborRateId === 'custom' ? `<input type="text" class="crew-member-custom-title" data-crew-member-custom-title="${i}" value="${escHtml(m.title || '')}" placeholder="Title" style="width:100px;">
      <input type="number" class="crew-member-custom-rate" data-crew-member-custom-rate="${i}" value="${m.rate || 0}" step="0.01" min="0" style="width:80px;" placeholder="$/hr">` : ''}
      <span class="crew-member-subtotal">${money((m.rate || 0) * (m.qty || 1))}/hr</span>
      <button class="btn btn-sm btn-danger-outline" data-del-crew-member="${i}">×</button>
    </div>
  `).join('');
}

function renderCrewCompEquipment() {
  const crew = $('crewCompModal')._crew;
  const container = $('crewCompEquipment');
  const equipRates = (appSettings || DEFAULT_SETTINGS).equipmentRates || [];
  
  if ((crew.equipment || []).length === 0) {
    container.innerHTML = '<p style="color:#888;font-size:0.9em;">No equipment added.</p>';
    return;
  }
  
  container.innerHTML = (crew.equipment || []).map((e, i) => `
    <div class="crew-member-row">
      <select data-crew-equip-idx="${i}" class="crew-equip-select">
        <option value="">Select equipment...</option>
        ${equipRates.map(er => `<option value="${er.id}" data-rate="${er.rate}" ${e.equipRateId === er.id ? 'selected' : ''}>${escHtml(er.title)} — ${money(er.rate)}/hr${er.owned ? '' : ' (Rental)'}</option>`).join('')}
        <option value="custom" ${e.equipRateId === 'custom' ? 'selected' : ''}>Custom...</option>
      </select>
      ${e.equipRateId === 'custom' ? `<input type="text" data-crew-equip-custom-title="${i}" value="${escHtml(e.title || '')}" placeholder="Name" style="width:100px;">
      <input type="number" data-crew-equip-custom-rate="${i}" value="${e.rate || 0}" step="0.01" min="0" style="width:80px;" placeholder="$/hr">` : ''}
      <span class="crew-member-subtotal">${money(e.rate || 0)}/hr</span>
      <button class="btn btn-sm btn-danger-outline" data-del-crew-equip="${i}">×</button>
    </div>
  `).join('');
}

function updateCrewCompRates() {
  const crew = $('crewCompModal')._crew;
  const laborRate = calcCrewLaborRate(crew);
  const equipRate = calcCrewEquipRate(crew);
  $('crewCompTotalRate').textContent = money(laborRate) + '/hr';
  $('crewCompGrandRate').textContent = money(laborRate + equipRate) + '/hr';
}

function addCrewMember() {
  const crew = $('crewCompModal')._crew;
  const laborRates = (appSettings || DEFAULT_SETTINGS).laborRates || [];
  if (laborRates.length === 0) {
    showToast('Add labor rates first in Settings above', true);
    return;
  }
  crew.members.push({ laborRateId: '', title: '', rate: 0, qty: 1 });
  renderCrewCompMembers();
  updateCrewCompRates();
}

function addCrewEquipment() {
  const crew = $('crewCompModal')._crew;
  const equipRates = (appSettings || DEFAULT_SETTINGS).equipmentRates || [];
  if (equipRates.length === 0) {
    showToast('Add equipment rates first in Settings above', true);
    return;
  }
  if (!crew.equipment) crew.equipment = [];
  crew.equipment.push({ equipRateId: '', title: '', rate: 0 });
  renderCrewCompEquipment();
  updateCrewCompRates();
}

function handleCrewMemberChange(e) {
  const crew = $('crewCompModal')._crew;
  const laborRates = (appSettings || DEFAULT_SETTINGS).laborRates || [];
  
  // Handle member select change
  const selIdx = e.target.dataset?.crewMemberIdx;
  if (selIdx !== undefined) {
    const idx = parseInt(selIdx);
    const val = e.target.value;
    if (val === 'custom') {
      crew.members[idx].laborRateId = 'custom';
      crew.members[idx].title = '';
      crew.members[idx].rate = 0;
    } else if (val) {
      const lr = laborRates.find(l => l.id === val);
      if (lr) {
        crew.members[idx].laborRateId = lr.id;
        crew.members[idx].title = lr.title;
        crew.members[idx].rate = lr.rate;
      }
    }
    renderCrewCompMembers();
    updateCrewCompRates();
    return;
  }
  
  // Handle qty change
  const qtyIdx = e.target.dataset?.crewMemberQty;
  if (qtyIdx !== undefined) {
    crew.members[parseInt(qtyIdx)].qty = parseInt(e.target.value) || 1;
    renderCrewCompMembers();
    updateCrewCompRates();
    return;
  }
  
  // Handle custom title
  const ctIdx = e.target.dataset?.crewMemberCustomTitle;
  if (ctIdx !== undefined) {
    crew.members[parseInt(ctIdx)].title = e.target.value;
    return;
  }
  
  // Handle custom rate
  const crIdx = e.target.dataset?.crewMemberCustomRate;
  if (crIdx !== undefined) {
    crew.members[parseInt(crIdx)].rate = parseFloat(e.target.value) || 0;
    renderCrewCompMembers();
    updateCrewCompRates();
    return;
  }
  
  // Handle delete member
  const delIdx = e.target.dataset?.delCrewMember;
  if (delIdx !== undefined) {
    crew.members.splice(parseInt(delIdx), 1);
    renderCrewCompMembers();
    updateCrewCompRates();
    return;
  }
}

function handleCrewEquipChange(e) {
  const crew = $('crewCompModal')._crew;
  const equipRates = (appSettings || DEFAULT_SETTINGS).equipmentRates || [];
  
  const selIdx = e.target.dataset?.crewEquipIdx;
  if (selIdx !== undefined) {
    const idx = parseInt(selIdx);
    const val = e.target.value;
    if (val === 'custom') {
      crew.equipment[idx].equipRateId = 'custom';
      crew.equipment[idx].title = '';
      crew.equipment[idx].rate = 0;
    } else if (val) {
      const er = equipRates.find(eq => eq.id === val);
      if (er) {
        crew.equipment[idx].equipRateId = er.id;
        crew.equipment[idx].title = er.title;
        crew.equipment[idx].rate = er.rate;
      }
    }
    renderCrewCompEquipment();
    updateCrewCompRates();
    return;
  }
  
  const ctIdx = e.target.dataset?.crewEquipCustomTitle;
  if (ctIdx !== undefined) {
    crew.equipment[parseInt(ctIdx)].title = e.target.value;
    return;
  }
  
  const crIdx = e.target.dataset?.crewEquipCustomRate;
  if (crIdx !== undefined) {
    crew.equipment[parseInt(crIdx)].rate = parseFloat(e.target.value) || 0;
    renderCrewCompEquipment();
    updateCrewCompRates();
    return;
  }
  
  const delIdx = e.target.dataset?.delCrewEquip;
  if (delIdx !== undefined) {
    crew.equipment.splice(parseInt(delIdx), 1);
    renderCrewCompEquipment();
    updateCrewCompRates();
    return;
  }
}

function saveCrewComp() {
  const crew = $('crewCompModal')._crew;
  crew.name = $('crewCompName').value.trim();
  if (!crew.name) { showToast('Enter a crew name', true); return; }
  if (crew.members.length === 0) { showToast('Add at least one member', true); return; }
  
  // Validate all members have selections
  for (const m of crew.members) {
    if (!m.laborRateId || (!m.title && m.laborRateId !== 'custom')) {
      showToast('Select a worker type for all members', true);
      return;
    }
  }
  
  if (!appSettings.crewCompositions) appSettings.crewCompositions = [];
  
  if (editingCrewIdx >= 0) {
    crew.id = appSettings.crewCompositions[editingCrewIdx].id;
    appSettings.crewCompositions[editingCrewIdx] = crew;
  } else {
    crew.id = uid('crew');
    appSettings.crewCompositions.push(crew);
  }
  
  $('crewCompModal').style.display = 'none';
  renderSettingsCrewComps();
  showToast('Crew saved — click Save Settings to keep');
}

function deleteCrewComp(idx) {
  if (!confirm('Remove this crew composition?')) return;
  appSettings.crewCompositions.splice(idx, 1);
  renderSettingsCrewComps();
  showToast('Removed — click Save Settings to keep');
}

// ===== LABOR MODAL: CREW PICKER =====
function populateCrewSelect() {
  const sel = $('laborCrewSelect');
  if (!sel) return;
  const s = appSettings || DEFAULT_SETTINGS;
  const crews = s.crewCompositions || [];
  
  sel.innerHTML = '<option value="">— Custom (enter manually) —</option>';
  
  if (crews.length > 0) {
    const grp = document.createElement('optgroup');
    grp.label = 'Saved Crews';
    crews.forEach((c, i) => {
      const totalRate = calcCrewLaborRate(c) + calcCrewEquipRate(c);
      const opt = document.createElement('option');
      opt.value = 'crew_' + i;
      opt.textContent = `${c.name} — ${money(totalRate)}/hr`;
      grp.appendChild(opt);
    });
    sel.appendChild(grp);
  }
  
  // Add individual labor roles
  const laborRates = s.laborRates || [];
  if (laborRates.length > 0) {
    const grpL = document.createElement('optgroup');
    grpL.label = 'Labor Only';
    laborRates.forEach((l, i) => {
      const opt = document.createElement('option');
      opt.value = 'labor_' + i;
      opt.textContent = `${l.title} — ${money(l.rate)}/hr`;
      grpL.appendChild(opt);
    });
    sel.appendChild(grpL);
  }

  // Also add individual equipment items
  const equipRates = s.equipmentRates || [];
  if (equipRates.length > 0) {
    const grp2 = document.createElement('optgroup');
    grp2.label = 'Equipment Only';
    equipRates.forEach((e, i) => {
      const opt = document.createElement('option');
      opt.value = 'equip_' + i;
      opt.textContent = `${e.title} — ${money(e.rate)}/hr${e.owned ? '' : ' (Rental)'}`;
      grp2.appendChild(opt);
    });
    sel.appendChild(grp2);
  }
}

function onCrewSelectChange() {
  const val = $('laborCrewSelect').value;
  const s = appSettings || DEFAULT_SETTINGS;
  const preview = $('laborBreakdownPreview');
  
  if (!val) {
    // Custom mode
    $('laborDesc').value = 'Equipment and Labor';
    $('laborRate').value = '';
    $('laborRate').readOnly = false;
    if (preview) { preview.style.display = 'none'; preview.innerHTML = ''; }
    return;
  }
  
  if (val.startsWith('crew_')) {
    const idx = parseInt(val.split('_')[1]);
    const crew = (s.crewCompositions || [])[idx];
    if (!crew) return;
    const laborRate = calcCrewLaborRate(crew);
    const equipRate = calcCrewEquipRate(crew);
    const totalRate = laborRate + equipRate;
    
    $('laborDesc').value = crew.name;
    $('laborRate').value = totalRate.toFixed(2);
    $('laborRate').readOnly = true;
    
    // Show breakdown
    if (preview) {
      let html = '<div class="breakdown-title">Rate Breakdown:</div>';
      (crew.members || []).forEach(m => {
        html += `<div class="breakdown-line">${m.qty}x ${escHtml(m.title)} @ ${money(m.rate)}/hr = ${money(m.rate * m.qty)}/hr</div>`;
      });
      (crew.equipment || []).forEach(e => {
        html += `<div class="breakdown-line">${escHtml(e.title)} @ ${money(e.rate)}/hr</div>`;
      });
      html += `<div class="breakdown-total">Total: ${money(totalRate)}/hr</div>`;
      preview.innerHTML = html;
      preview.style.display = 'block';
    }
  } else if (val.startsWith('labor_')) {
    const idx = parseInt(val.split('_')[1]);
    const labor = (s.laborRates || [])[idx];
    if (!labor) return;
    $('laborDesc').value = labor.title;
    $('laborRate').value = labor.rate.toFixed(2);
    $('laborRate').readOnly = true;
    if (preview) { preview.style.display = 'none'; }
  } else if (val.startsWith('equip_')) {
    const idx = parseInt(val.split('_')[1]);
    const equip = (s.equipmentRates || [])[idx];
    if (!equip) return;
    $('laborDesc').value = equip.title;
    $('laborRate').value = equip.rate.toFixed(2);
    $('laborRate').readOnly = true;
    if (preview) { preview.style.display = 'none'; }
  }
}

// ===== ADVANCED BID COST SUMMARY =====

// ===== COST SUMMARY MODAL =====
function showCostSummary() {
  if (!currentBid) return;
  const bid = currentBid;
  const isAdv = bid.estimateMode === 'advanced';
  const ohOn = bid.overheadEnabled !== false;
  const boOn = bid.bondEnabled !== false;
  const consumables = parseFloat(bid.consumables) || 0;
  let html = '';

  if (isAdv) {
    // ADVANCED MODE — PER-ITEM PRODUCTION SUMMARY
    const WORK_DAY = 8;
    const s = appSettings || DEFAULT_SETTINGS;
    const bondPct = s.defaultBondPct || 2.5;
    let grandLabHrs = 0, grandEqHrs = 0;
    let gDirect = 0, gMU = 0, gOH = 0;
    let gBidPrice = 0; // sum of actual entered bid prices (respects overrides)

    // Build per-item cards
    html += '<div class="cs-section"><h4>📋 Per-Item Production Breakdown</h4>';
    
    (bid.advancedItems || []).forEach((item, idx) => {
      let iMatCost = 0, iLabCost = 0, iEqCost = 0, iSubCost = 0;
      let iLabHrs = 0, iEqHrs = 0;
      let iMU = 0, iOH = 0;
      
      (item.costs || []).forEach(c => {
        const base = (c.qty || 0) * (c.unitCost || 0);
        const mu = item.noMarkup ? 0 : base * (c.markupPct || 0) / 100;
        const oh = item.noMarkup ? 0 : base * (c.overheadPct || 0) / 100;
        iMU += mu; iOH += oh;
        
        gDirect += base; gMU += mu; gOH += oh;
        if (c.type === 'material') {
          iMatCost += base;
        } else if (c.type === 'labor') {
          iLabCost += base; iLabHrs += (c.qty || 0);
        } else if (c.type === 'equipment') {
          iEqCost += base; iEqHrs += (c.qty || 0);
        } else if (c.type === 'subcontractor') {
          iSubCost += base;
        }
      });
      
      grandLabHrs += iLabHrs; grandEqHrs += iEqHrs;
      const iDirect = iMatCost + iLabCost + iEqCost + iSubCost;
      const iCalcTotal = iDirect + iMU + iOH; // no bond (project-level)
      const qty = item.qty || 0;
      const unit = item.unit || 'EA';
      const calcUnitPrice = qty > 0 ? iCalcTotal / qty : 0;
      const actualBidUnit = calcAdvItemBidUnit(item);
      const actualExtension = calcAdvItemExtension(item);
      const hasOverride = item.bidUnitOverride != null && item.bidUnitOverride !== '';
      gBidPrice += actualExtension;
      
      // Margin per item
      const iMarginPct = actualExtension > 0 ? ((actualExtension - iDirect) / actualExtension * 100) : 0;
      const iMarginDollars = actualExtension - iDirect;
      
      const maxHrs = Math.max(iLabHrs, iEqHrs);
      const daysNeeded = maxHrs > 0 ? maxHrs / WORK_DAY : 0;
      const unitsPerDay = (daysNeeded > 0 && qty > 0) ? qty / daysNeeded : 0;
      const hrsPerUnit = (qty > 0 && maxHrs > 0) ? maxHrs / qty : 0;
      
      html += `<div style="background:#f8f9fa;border:1px solid #dee2e6;border-radius:6px;padding:10px 12px;margin-bottom:8px;">
        <div style="font-weight:700;color:#1a237e;margin-bottom:6px;font-size:1.05em;">${item.itemNumber ? '#' + item.itemNumber + ' — ' : ''}${escHtml(item.description)} <span style="color:#555;font-weight:400;">(${qty} ${escHtml(unit)})</span></div>
        <table style="width:100%;font-size:0.9em;margin-bottom:6px;"><tbody>
          <tr><td style="color:#666;">Direct Cost</td><td style="text-align:right;">${money(iDirect)}</td></tr>
          <tr><td style="color:#666;">+ Markup</td><td style="text-align:right;">${money(iMU)}</td></tr>
          <tr><td style="color:#666;">+ Overhead</td><td style="text-align:right;">${money(iOH)}</td></tr>
          <tr style="border-top:1px solid #ccc;"><td>Calc'd Unit</td><td style="text-align:right;">${money(calcUnitPrice)}/${escHtml(unit)}</td></tr>
          ${hasOverride ? `<tr style="color:#e65100;font-weight:600;"><td>✏️ Bid Unit</td><td style="text-align:right;">${money(actualBidUnit)}/${escHtml(unit)}</td></tr>` : ''}
          <tr style="font-weight:700;color:#1a237e;border-top:2px solid #1a237e;"><td>Extension</td><td style="text-align:right;">${money(actualExtension)}</td></tr>
          <tr><td style="color:${iMarginPct >= 0 ? '#2e7d32' : '#c62828'};font-weight:600;">📊 Margin</td><td style="text-align:right;color:${iMarginPct >= 0 ? '#2e7d32' : '#c62828'};font-weight:600;">${iMarginPct.toFixed(1)}% (${money(iMarginDollars)})</td></tr>
        </tbody></table>
        <div style="font-size:0.82em;color:#666;display:flex;flex-wrap:wrap;gap:4px 14px;">
          <span>🧱 Mat: ${money(iMatCost)}</span>
          <span>👷 Lab: ${iLabHrs} hrs (${money(iLabCost)})</span>
          <span>🚜 Eq: ${iEqHrs} hrs (${money(iEqCost)})</span>
          ${iSubCost > 0 ? `<span>🤝 Sub: ${money(iSubCost)}</span>` : ''}
        </div>
        ${qty > 0 && maxHrs > 0 ? `<div style="background:#e8f5e9;padding:6px 8px;border-radius:4px;font-size:0.88em;display:flex;flex-wrap:wrap;gap:8px 16px;margin-top:6px;">
          <span>📏 <strong>${hrsPerUnit.toFixed(2)}</strong> hrs/${escHtml(unit)}</span>
          <span>📅 <strong>${unitsPerDay.toFixed(1)}</strong> ${escHtml(unit)}/day</span>
          <span>⏱️ <strong>${daysNeeded.toFixed(1)}</strong> days</span>
          <span>💲 <strong>${money(actualBidUnit)}</strong>/${escHtml(unit)}</span>
        </div>` : ''}
      </div>`;
    });
    html += '</div>';

    // Aggregate hours
    html += `<div class="cs-section" style="margin-top:8px;">
      <div style="display:flex;gap:16px;margin-bottom:8px;">
        <div style="flex:1;background:#e3f2fd;padding:8px 12px;border-radius:6px;text-align:center;">
          <div style="font-size:0.85em;color:#1565c0;">⏱️ Total Labor</div>
          <div style="font-size:1.3em;font-weight:700;">${grandLabHrs.toFixed(1)} hrs</div>
          <div style="font-size:0.85em;color:#666;">${(grandLabHrs / WORK_DAY).toFixed(1)} days</div>
        </div>
        <div style="flex:1;background:#fff3e0;padding:8px 12px;border-radius:6px;text-align:center;">
          <div style="font-size:0.85em;color:#e65100;">🚜 Total Equipment</div>
          <div style="font-size:1.3em;font-weight:700;">${grandEqHrs.toFixed(1)} hrs</div>
          <div style="font-size:0.85em;color:#666;">${(grandEqHrs / WORK_DAY).toFixed(1)} days</div>
        </div>
      </div>
    </div>`;

    // Totals — bond is project-level (% of bid price)
    const advCsSalesTax = calcSalesTax(bid);
    const calcTotal = gDirect + gMU + gOH;
    const overrideDiff = gBidPrice - calcTotal;
    const projectBond = boOn ? gBidPrice * bondPct / 100 : 0;
    const grandTotal = gBidPrice + projectBond + consumables + advCsSalesTax;
    const marginDollars = grandTotal - gDirect - projectBond - advCsSalesTax;
    const margin = grandTotal > 0 ? (marginDollars / grandTotal * 100) : 0;

    html += '<div class="cs-totals">';
    html += `<div class="cs-row"><span>📦 Direct Cost</span><span>${money(gDirect)}</span></div>`;
    html += `<div class="cs-row"><span>📈 Markup</span><span>${money(gMU)}</span></div>`;
    html += `<div class="cs-row"><span>🏢 Overhead</span><span>${money(gOH)}</span></div>`;
    if (Math.abs(overrideDiff) > 0.01) {
      html += `<div class="cs-row" style="background:#fff3e0;padding:4px 8px;border-radius:4px;"><span>✏️ Bid Price Adj</span><span style="font-weight:700;color:${overrideDiff >= 0 ? '#2e7d32' : '#c62828'};">${overrideDiff >= 0 ? '+' : ''}${money(overrideDiff)}</span></div>`;
    }
    html += `<div class="cs-row" style="border-top:2px solid #ddd;padding-top:8px;margin-top:4px;font-weight:600;"><span>📋 Items Subtotal</span><span>${money(gBidPrice)}</span></div>`;
    if (boOn) html += `<div class="cs-row"><span>📋 Bond <small>(${bondPct}% on bid price)</small></span><span>${money(projectBond)}</span></div>`;
    if (consumables > 0) html += `<div class="cs-row"><span>🔧 Consumables</span><span>${money(consumables)}</span></div>`;
    if (bid.taxEnabled !== false && advCsSalesTax > 0) {
      html += `<div class="cs-row" style="background:#fce4ec;padding:4px 8px;border-radius:4px;"><span>🧾 Sales Tax (${bid.taxRate || 7}%)</span><span style="font-weight:700;">${money(advCsSalesTax)}</span></div>`;
    }
    html += `<div class="cs-row cs-grand"><span>💰 GRAND TOTAL</span><span>${money(grandTotal)}</span></div>`;
    html += `<div class="cs-row cs-margin"><span>📊 True Margin</span><span>${margin.toFixed(1)}% (${money(marginDollars)})</span></div>`;
    html += '</div>';

  } else {
    // SIMPLE MODE SUMMARY
    let totalMatCost = 0, totalMatMU = 0, totalMatOH = 0, totalMatBond = 0;
    let totalLabCost = 0, totalLabMU = 0, totalLabOH = 0, totalLabBond = 0;
    const matRows = [], labRows = [];

    (bid.items || []).forEach(it => {
      const base = (it.qty || 0) * (it.unitCost || 0);
      const mu = it.noMarkup ? 0 : base * (it.markupPct || 0) / 100;
      const oh = (it.noMarkup || !ohOn) ? 0 : base * (it.overheadPct || 0) / 100;
      // Bond on contract amount (base + MU + OH)
      const bond = (it.noMarkup || !boOn) ? 0 : (base + mu + oh) * (it.bondPct || 0) / 100;
      totalMatCost += base; totalMatMU += mu; totalMatOH += oh; totalMatBond += bond;
      matRows.push({ desc: it.description || 'Material', qty: it.qty, unit: it.unit || 'EA', cost: it.unitCost, base, muPct: it.markupPct || 0, mu, noMU: it.noMarkup });
    });

    (bid.laborItems || []).forEach(it => {
      const base = (it.hours || 0) * (it.rate || 0);
      const mu = it.noMarkup ? 0 : base * (it.markupPct || 0) / 100;
      const oh = (it.noMarkup || !ohOn) ? 0 : base * (it.overheadPct || 0) / 100;
      // Bond on contract amount (base + MU + OH)
      const bond = (it.noMarkup || !boOn) ? 0 : (base + mu + oh) * (it.bondPct || 0) / 100;
      totalLabCost += base; totalLabMU += mu; totalLabOH += oh; totalLabBond += bond;
      labRows.push({ desc: it.description || 'Labor/Equipment', hrs: it.hours, rate: it.rate, base, muPct: it.markupPct || 0, mu, ohPct: it.overheadPct || 0, oh, bondPct: it.bondPct || 0, bond, noMU: it.noMarkup });
    });

    // Materials table
    html += '<div class="cs-section"><h4>🧱 Materials</h4>';
    if (matRows.length) {
      html += '<table><thead><tr><th>Description</th><th>Qty</th><th>Unit Cost</th><th>Base</th><th>MU%</th><th>Markup $</th></tr></thead><tbody>';
      matRows.forEach(r => {
        html += `<tr><td>${escHtml(r.desc)}</td><td>${r.qty}</td><td>${money(r.cost)}</td><td>${money(r.base)}</td><td>${r.noMU ? 'None' : r.muPct + '%'}</td><td>${money(r.mu)}</td></tr>`;
      });
      html += `</tbody><tfoot><tr class="cs-subtotal"><td>Subtotal</td><td></td><td></td><td>${money(totalMatCost)}</td><td></td><td>${money(totalMatMU)}</td></tr></tfoot></table>`;
    } else { html += '<p style="color:var(--text-muted);font-style:italic">No materials yet</p>'; }
    html += '</div>';

    // Labor/Equipment table
    html += '<div class="cs-section"><h4>👷 Labor / Equipment</h4>';
    if (labRows.length) {
      html += '<table><thead><tr><th>Description</th><th>Hrs</th><th>Rate</th><th>Base</th><th>MU%</th><th>OH%</th><th>Bond%</th></tr></thead><tbody>';
      labRows.forEach(r => {
        html += `<tr><td>${escHtml(r.desc)}</td><td>${r.hrs}</td><td>${money(r.rate)}/hr</td><td>${money(r.base)}</td><td>${r.noMU ? 'None' : r.muPct + '%'}</td><td>${r.noMU ? '-' : (ohOn ? r.ohPct + '%' : 'OFF')}</td><td>${r.noMU ? '-' : (boOn ? r.bondPct + '%' : 'OFF')}</td></tr>`;
      });
      html += `</tbody><tfoot><tr class="cs-subtotal"><td>Subtotal</td><td></td><td></td><td>${money(totalLabCost)}</td><td>${money(totalLabMU)}</td><td>${money(totalLabOH)}</td><td>${money(totalLabBond)}</td></tr></tfoot></table>`;
    } else { html += '<p style="color:var(--text-muted);font-style:italic">No labor/equipment yet</p>'; }
    html += '</div>';

    // Totals
    const directCost = totalMatCost + totalLabCost;
    const totalMU = totalMatMU + totalLabMU;
    const totalOH = totalMatOH + totalLabOH;
    const totalBond = totalMatBond + totalLabBond;
    const simpleCsSalesTax = calcSalesTax(bid);
    const grandTotal = directCost + totalMU + totalOH + totalBond + consumables + simpleCsSalesTax;
    const margin = grandTotal > 0 ? ((grandTotal - directCost - consumables - simpleCsSalesTax) / grandTotal * 100) : 0;

    html += '<div class="cs-totals">';
    html += `<div class="cs-row"><span>📦 Direct Cost (Materials + Labor/Equipment)</span><span>${money(directCost)}</span></div>`;
    html += `<div class="cs-row"><span>📈 Total Markup</span><span>${money(totalMU)}</span></div>`;
    html += `<div class="cs-row"><span>🏢 Total Overhead ${ohOn ? '' : '(OFF)'}</span><span>${money(totalOH)}</span></div>`;
    html += `<div class="cs-row"><span>📋 Total Bond ${boOn ? '' : '(OFF)'}</span><span>${money(totalBond)}</span></div>`;
    const itemsSubtotal = directCost + totalMU + totalOH + totalBond;
    html += `<div class="cs-row" style="border-top:2px solid #ddd;padding-top:8px;margin-top:4px;font-weight:600;"><span>📋 Items Subtotal</span><span>${money(itemsSubtotal)}</span></div>`;
    if (consumables > 0) html += `<div class="cs-row"><span>🔧 Consumables</span><span>${money(consumables)}</span></div>`;
    if (bid.taxEnabled !== false && simpleCsSalesTax > 0) {
      html += `<div class="cs-row"><span>🧾 Sales Tax (${bid.taxRate || 7}%)</span><span>${money(simpleCsSalesTax)}</span></div>`;
    }
    html += `<div class="cs-row cs-grand"><span>💰 GRAND TOTAL (Bid Price)</span><span>${money(grandTotal)}</span></div>`;
    html += `<div class="cs-row cs-margin"><span>📊 True Margin</span><span>${margin.toFixed(1)}%</span></div>`;
    html += '</div>';
  }

  $('costSummaryContent').innerHTML = html;
  $('costSummaryModal').style.display = 'flex';
}

// ── Production Rate Adjuster ──
// When user edits units/day or days in the summary, scale all labor & equipment hours proportionally
function handleProductionEdit(e) {
  const inp = e.target;
  const idx = parseInt(inp.dataset.itemIdx);
  const field = inp.dataset.field;
  const newVal = parseFloat(inp.value);
  if (!currentBid || !currentBid.advancedItems || !currentBid.advancedItems[idx] || !newVal || newVal <= 0) return;
  
  const item = currentBid.advancedItems[idx];
  const qty = item.qty || 0;
  const WORK_DAY = 8;
  if (qty <= 0) return;
  
  // Calculate current hours
  let curLabHrs = 0, curEqHrs = 0;
  (item.costs || []).forEach(c => {
    if (c.type === 'labor') curLabHrs += (c.qty || 0);
    else if (c.type === 'equipment') curEqHrs += (c.qty || 0);
  });
  const curMaxHrs = Math.max(curLabHrs, curEqHrs);
  if (curMaxHrs <= 0) return;
  
  const curDays = curMaxHrs / WORK_DAY;
  
  // Calculate target days based on which field was edited
  let targetDays;
  if (field === 'unitsPerDay') {
    targetDays = qty / newVal;  // 500 LF / 100 LF/day = 5 days
  } else if (field === 'days') {
    targetDays = newVal;
  } else { return; }
  
  if (targetDays <= 0) return;
  
  // Scale factor: new hours / current hours
  const targetMaxHrs = targetDays * WORK_DAY;
  const scaleFactor = targetMaxHrs / curMaxHrs;
  
  // Scale all labor & equipment hours proportionally
  (item.costs || []).forEach(c => {
    if (c.type === 'labor' || c.type === 'equipment') {
      c.qty = parseFloat((c.qty * scaleFactor).toFixed(2));
    }
  });
  
  // Recalculate & save — update ALL views
  renderAdvancedItems();     // refresh Bid Items table (prices + production row)
  updateAdvBidSummary(currentBid); // refresh Cost Summary sidebar
  recalcSummary();           // refresh bid totals
  gatherBidData();
  saveBid();
}

function updateAdvBidSummary(bid) {
  const panel = $('advBidSummary');
  if (!panel) return;
  if (!bid || bid.estimateMode !== 'advanced' || !(bid.advancedItems || []).length) {
    panel.style.display = 'none';
    return;
  }
  panel.style.display = 'block';
  
  // Per-item breakdown with production metrics
  let grandLaborHrs = 0, grandEquipHrs = 0;
  let grandDirectCost = 0, grandMarkup = 0, grandOH = 0;
  let grandBidPrice = 0; // sum of actual entered bid prices (respects overrides)
  let grandAltTotal = 0; // alternates priced separately
  let grandMatCost = 0, grandLabCost = 0, grandEqCost = 0, grandSubCost = 0;
  
  const consumables = parseFloat(bid.consumables) || 0;
  const WORK_DAY = 8; // hours per day
  const s = appSettings || DEFAULT_SETTINGS;
  const bondPct = s.defaultBondPct || 2.5;
  const bondOn = bid.bondEnabled !== false;
  
  let itemsHtml = '';
  (bid.advancedItems || []).forEach((item, idx) => {
    let itemMatCost = 0, itemLabCost = 0, itemEqCost = 0, itemSubCost = 0;
    let itemLabHrs = 0, itemEqHrs = 0;
    let itemMU = 0, itemOH = 0;
    
    (item.costs || []).forEach(c => {
      const base = (c.qty || 0) * (c.unitCost || 0);
      const mu = item.noMarkup ? 0 : base * (c.markupPct || 0) / 100;
      const oh = item.noMarkup ? 0 : base * (c.overheadPct || 0) / 100;
      itemMU += mu; itemOH += oh;
      
      if (!item.isAlternate) { grandDirectCost += base; grandMarkup += mu; grandOH += oh; }
      
      if (c.type === 'material') {
        itemMatCost += base;
      } else if (c.type === 'labor') {
        itemLabCost += base; itemLabHrs += (c.qty || 0);
      } else if (c.type === 'equipment') {
        itemEqCost += base; itemEqHrs += (c.qty || 0);
      } else if (c.type === 'subcontractor') {
        itemSubCost += base;
      }
    });
    
    if (!item.isAlternate) {
      grandLaborHrs += itemLabHrs;
      grandEquipHrs += itemEqHrs;
      grandMatCost += itemMatCost;
      grandLabCost += itemLabCost;
      grandEqCost += itemEqCost;
      grandSubCost += itemSubCost;
    }
    
    const itemDirectCost = itemMatCost + itemLabCost + itemEqCost + itemSubCost;
    const calcTotal = itemDirectCost + itemMU + itemOH; // no bond (project-level now)
    const qty = item.qty || 0;
    const unit = item.unit || 'EA';
    const calcUnitPrice = qty > 0 ? calcTotal / qty : 0;
    
    // Actual bid price (respects manual override)
    const actualBidUnit = calcAdvItemBidUnit(item);
    const actualExtension = calcAdvItemExtension(item);
    const hasOverride = item.bidUnitOverride != null && item.bidUnitOverride !== '';
    if (!item.isAlternate) grandBidPrice += actualExtension; else grandAltTotal += actualExtension;
    
    // Margin: (extension - directCost) / extension
    const itemMarginPct = actualExtension > 0 ? ((actualExtension - itemDirectCost) / actualExtension * 100) : 0;
    const itemMarginDollars = actualExtension - itemDirectCost;
    
    // Production metrics
    const maxHrs = Math.max(itemLabHrs, itemEqHrs);
    const daysNeeded = maxHrs > 0 ? (maxHrs / WORK_DAY) : 0;
    const unitsPerDay = (daysNeeded > 0 && qty > 0) ? (qty / daysNeeded) : 0;
    const hrsPerUnit = (qty > 0 && maxHrs > 0) ? (maxHrs / qty) : 0;
    
    const marginClass = itemMarginPct >= 0 ? 'positive' : 'negative';
    const itemLabel = item.itemNumber ? '#' + item.itemNumber : '#' + (idx + 1);
    
    itemsHtml += `<div class="summary-item-compact" data-summ-idx="${idx}">
      <span class="item-name">${itemLabel} ${escHtml(item.description)}${item.isAlternate ? ' <span class="alt-badge">ALT</span>' : ''}</span>
      <span class="item-ext">${money(actualExtension)}</span>
      <span class="item-margin ${marginClass}">${itemMarginPct.toFixed(1)}%</span>
    </div>
    <div class="summary-item-detail" id="summDetail${idx}">
      <div class="detail-row"><span>Direct Cost</span><span>${money(itemDirectCost)}</span></div>
      <div class="detail-row"><span>+ Markup</span><span>${money(itemMU)}</span></div>
      <div class="detail-row"><span>+ Overhead</span><span>${money(itemOH)}</span></div>
      <div class="detail-row" style="border-top:1px solid #e2e8f0;"><span>Calc'd Unit</span><span>${money(calcUnitPrice)}/${escHtml(unit)}</span></div>
      ${hasOverride ? `<div class="detail-row" style="color:#e65100;font-weight:600;"><span>Entered Bid Unit</span><span>${money(actualBidUnit)}/${escHtml(unit)}</span></div>` : ''}
      <div class="detail-row" style="font-weight:700;color:#1a365d;border-top:2px solid #1a365d;"><span>Extension (${qty} ${escHtml(unit)})</span><span>${money(actualExtension)}</span></div>
      <div class="detail-row" style="color:${itemMarginPct >= 0 ? '#276749' : '#c53030'};font-weight:600;">
        <span>Margin</span><span>${itemMarginPct.toFixed(1)}% (${money(itemMarginDollars)})</span>
      </div>
      <div class="detail-label" style="margin-top:6px;padding-top:6px;border-top:1px solid #edf2f7;">Cost Breakdown</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px 12px;font-size:0.84em;color:#4a5568;">
        <div>Materials: ${money(itemMatCost)}</div>
        <div>Labor: ${itemLabHrs.toFixed(1)} hrs (${money(itemLabCost)})</div>
        <div>Equipment: ${itemEqHrs.toFixed(1)} hrs (${money(itemEqCost)})</div>
        ${itemSubCost > 0 ? `<div>Subcontractor: ${money(itemSubCost)}</div>` : ''}
      </div>
      ${qty > 0 && maxHrs > 0 ? `<div class="prod-metrics">
        <span class="prod-metric"><strong>${unitsPerDay.toFixed(1)}</strong> ${escHtml(unit)}/day</span>
        <span class="prod-metric"><strong>${daysNeeded.toFixed(1)}</strong> days</span>
        <span class="prod-metric"><strong>${hrsPerUnit.toFixed(2)}</strong> hrs/${escHtml(unit)}</span>
      </div>` : ''}
    </div>`;
  });
  
  if ($('summaryItemBreakdown')) {
    $('summaryItemBreakdown').innerHTML = itemsHtml;
    // Wire up click-to-expand on compact cards
    $('summaryItemBreakdown').querySelectorAll('.summary-item-compact').forEach(card => {
      card.addEventListener('click', () => {
        const detail = document.getElementById('summDetail' + card.dataset.summIdx);
        if (detail) detail.classList.toggle('open');
      });
    });
  }
  
  // Aggregate hours
  if ($('summaryTotalLaborHrs')) $('summaryTotalLaborHrs').textContent = grandLaborHrs.toFixed(1) + ' hrs (' + (grandLaborHrs / WORK_DAY).toFixed(1) + ' days)';
  if ($('summaryTotalEquipHrs')) $('summaryTotalEquipHrs').textContent = grandEquipHrs.toFixed(1) + ' hrs (' + (grandEquipHrs / WORK_DAY).toFixed(1) + ' days)';
  
  // Totals — bond is project-level (% of bid price), not per-cost-row
  const calcTotal = grandDirectCost + grandMarkup + grandOH; // no bond in per-item calc
  const overrideDiff = grandBidPrice - calcTotal;
  const projectBond = bondOn ? grandBidPrice * bondPct / 100 : 0;
  const summSalesTax = calcSalesTax(bid);
  
  // Cost category breakdown
  if ($('summaryCatMaterials')) $('summaryCatMaterials').textContent = money(grandMatCost);
  if ($('summaryCatLabor')) $('summaryCatLabor').textContent = money(grandLabCost);
  if ($('summaryCatEquipment')) $('summaryCatEquipment').textContent = money(grandEqCost);
  if ($('summaryCatSubs')) $('summaryCatSubs').textContent = money(grandSubCost);
  if ($('summaryCatSubsRow')) $('summaryCatSubsRow').style.display = grandSubCost > 0 ? '' : 'none';
  if ($('summaryCatTotal')) $('summaryCatTotal').textContent = money(grandDirectCost);

  $('summaryDirectCost').textContent = money(grandDirectCost);
  $('summaryMarkup').textContent = money(grandMarkup);
  $('summaryOverhead').textContent = money(grandOH);
  // Show override adjustment if any items have manual bid unit prices
  if ($('summaryOverrideRow')) {
    if (Math.abs(overrideDiff) > 0.01) {
      $('summaryOverrideRow').style.display = '';
      $('summaryOverrideAdj').textContent = (overrideDiff >= 0 ? '+' : '') + money(overrideDiff);
      $('summaryOverrideAdj').style.color = overrideDiff >= 0 ? '#2e7d32' : '#c62828';
    } else {
      $('summaryOverrideRow').style.display = 'none';
    }
  }
  // Items Subtotal = sum of actual extensions
  if ($('summaryItemsSubtotal')) $('summaryItemsSubtotal').textContent = money(grandBidPrice);
  // Bond = bondPct × Items Subtotal
  $('summaryBond').textContent = money(projectBond);
  if ($('summaryBondPct')) $('summaryBondPct').textContent = bondPct;
  if ($('summaryBondRow')) $('summaryBondRow').style.display = bondOn ? '' : 'none';
  $('summaryConsumables').textContent = money(consumables);
  if ($('summarySalesTax')) $('summarySalesTax').textContent = money(summSalesTax);
  if ($('summaryTaxRatePct')) $('summaryTaxRatePct').textContent = bid.taxRate != null ? bid.taxRate : 7;
  if ($('summarySalesTaxRow')) $('summarySalesTaxRow').style.display = bid.taxEnabled !== false ? '' : 'none';
  const totalBidPrice = grandBidPrice + projectBond + consumables + summSalesTax;
  $('summaryBidPrice').textContent = money(totalBidPrice);
  // True margin: (total - directCost - bond - tax) / total
  const marginDollars = totalBidPrice - grandDirectCost - projectBond - summSalesTax;
  const marginPct = totalBidPrice > 0 ? (marginDollars / totalBidPrice * 100) : 0;
  $('summaryMargin').textContent = `${marginPct.toFixed(1)}% (${money(marginDollars)})`;
  // Alternates line (priced separately, not in base total)
  if ($('summaryAltRow')) {
    $('summaryAltRow').style.display = grandAltTotal > 0 ? '' : 'none';
    if ($('summaryAltTotal')) $('summaryAltTotal').textContent = '+' + money(grandAltTotal);
  }
  // Quick total shown on collapsed header
  if ($('summaryQuickTotal')) {
    $('summaryQuickTotal').textContent = money(totalBidPrice) + ' · ' + marginPct.toFixed(1) + '% margin';
  }
}

function renderSettingsCatalog() {
  const container = $('settingsCatalogList');
  const search = ($('catMgmtSearch') ? $('catMgmtSearch').value : '').toLowerCase();
  let items = CATALOG;
  if (search) items = items.filter(it => it.d.toLowerCase().includes(search) || (it.c||'').toLowerCase().includes(search));

  // Get unique categories
  const cats = [...new Set(CATALOG.map(it => it.c))].sort();
  const catSelect = $('catMgmtCategoryFilter');
  if (catSelect && catSelect.options.length <= 1) {
    cats.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c; opt.textContent = c;
      catSelect.appendChild(opt);
    });
  }
  const catFilter = catSelect ? catSelect.value : '';
  if (catFilter) items = items.filter(it => it.c === catFilter);

  $('catMgmtCount').textContent = items.length + ' items';

  if (items.length === 0) {
    container.innerHTML = '<div style="padding:16px;color:#999;text-align:center">No items found</div>';
    return;
  }

  container.innerHTML = '<table class="cat-mgmt-table"><thead><tr><th>Description</th><th>Unit</th><th>Price</th><th>Vendor</th><th>Category</th><th style="width:130px">Actions</th></tr></thead><tbody>' +
    items.map((it, dispIdx) => {
      const realIdx = CATALOG.indexOf(it);
      const isHidden = it.hidden === true;
      return `<tr style="${isHidden ? 'opacity:0.45;' : ''}">
        <td>${escHtml(it.d)}${isHidden ? ' <span style="color:#e74c3c;font-size:11px;">(hidden)</span>' : ''}</td>
        <td>${escHtml(it.u)}</td>
        <td>${money(it.p)}</td>
        <td>${escHtml(it.v || '')}</td>
        <td><span class="cat-badge">${escHtml(it.c)}</span></td>
        <td>
          <button class="btn-icon cat-vis-btn" data-cat-idx="${realIdx}" title="${isHidden ? 'Show to estimators' : 'Hide from estimators'}" style="font-size:16px;">${isHidden ? '👁️‍🗨️' : '👁️'}</button>
          <button class="btn-icon cat-edit-btn" data-cat-idx="${realIdx}" title="Edit">&#9998;</button>
          <button class="btn-icon cat-del-btn" data-cat-idx="${realIdx}" title="Delete">&times;</button>
        </td>
      </tr>`;
    }).join('') + '</tbody></table>';
}

function showCatalogEditModal(idx) {
  const it = idx >= 0 ? CATALOG[idx] : null;
  catMgmtEditIdx = idx;
  $('catEditTitle').textContent = it ? 'Edit Catalog Item' : 'Add Catalog Item';
  $('catEditDesc').value = it ? it.d : '';
  $('catEditUnit').value = it ? it.u : 'EA';
  $('catEditPrice').value = it ? it.p : '';
  $('catEditVendor').value = it ? (it.v || '') : '';
  $('catEditCategory').value = it ? it.c : '';
  $('catEditModal').style.display = 'flex';
}

async function saveCatalogItem() {
  if ($('catEditModal').dataset.suggestMode === 'true') {
    await submitCatalogSuggestion();
    return;
  }
  const desc = $('catEditDesc').value.trim();
  const unit = $('catEditUnit').value.trim() || 'EA';
  const price = parseFloat($('catEditPrice').value) || 0;
  const cat = $('catEditCategory').value.trim() || 'Misc';

  if (!desc) { showToast('Description is required', true); return; }
  if (price <= 0) { showToast('Price must be greater than 0', true); return; }

  const vendor = $('catEditVendor').value.trim();
  const item = { d: desc, u: unit, p: price, c: cat, v: vendor || '' };

  if (catMgmtEditIdx >= 0) {
    // Preserve hidden flag when editing
    if (CATALOG[catMgmtEditIdx].hidden) item.hidden = true;
    CATALOG[catMgmtEditIdx] = item;
    showToast('Item updated!');
  } else {
    CATALOG.push(item);
    showToast('Item added!');
  }

  $('catEditModal').style.display = 'none';
  renderSettingsCatalog();

  try {
    await api('saveCatalog', { body: CATALOG });
  } catch(e) {
    showToast('Failed to save catalog: ' + e.message, true);
  }
}

async function deleteCatalogItem(idx) {
  if (!confirm('Delete "' + CATALOG[idx].d + '" from catalog?')) return;
  CATALOG.splice(idx, 1);
  renderSettingsCatalog();
  showToast('Item removed');
  try {
    await api('saveCatalog', { body: CATALOG });
  } catch(e) {
    showToast('Failed to save catalog: ' + e.message, true);
  }
}

async function toggleCatalogItemVisibility(idx) {
  const it = CATALOG[idx];
  if (!it) return;
  it.hidden = !it.hidden;
  renderSettingsCatalog();
  showToast(it.hidden ? '"' + it.d + '" hidden from estimators' : '"' + it.d + '" now visible to estimators');
  try {
    await api('saveCatalog', { body: CATALOG });
  } catch(e) {
    showToast('Failed to save catalog: ' + e.message, true);
  }
}

// ===== BID TEMPLATES =====
function showNewBidModal() {
  const s = appSettings || DEFAULT_SETTINGS;
  const templates = s.bidTemplates || [];
  const section = $('templateListSection');
  const list = $('templatePickList');
  
  if (templates.length > 0) {
    section.style.display = 'block';
    list.innerHTML = templates.map((t, i) => `
      <div class="template-pick-item" data-tidx="${i}">
        <div class="template-pick-name">${escHtml(t.name)}</div>
        <div class="template-pick-desc">${escHtml(t.description || '')} · ${(t.items || []).length + (t.laborItems || []).length} items</div>
      </div>
    `).join('');
  } else {
    section.style.display = 'none';
  }
  $('newBidModal').style.display = 'flex';
}

function createBidFromTemplate(template) {
  const s = appSettings || DEFAULT_SETTINGS;
  const ec = (appSettings || DEFAULT_SETTINGS).estimatorControls || {};
  currentBid = {
    id: uid('bid'),
    bidNumber: generateBidNumber(),
    status: 'draft',
    createdBy: currentUser.name.toLowerCase(),
    clientName: '',
    clientContact: '',
    clientEmail: '',
    clientPhone: '',
    qbCustomerId: '',
    projectAddress: '',
    projectDescription: template.description || '',
    items: JSON.parse(JSON.stringify(template.items || [])).map(it => ({ ...it, id: uid('item') })),
    laborItems: JSON.parse(JSON.stringify(template.laborItems || [])).map(it => ({ ...it, id: uid('labor') })),
    jobType: template.jobType || 'residential',
    exclusions: template.exclusions ? JSON.parse(JSON.stringify(template.exclusions)) : getDefaultExclusions(template.jobType || 'residential'),
    terms: template.terms ? JSON.parse(JSON.stringify(template.terms)) : getDefaultTerms(template.jobType || 'residential'),
    customExclusions: template.customExclusions || '',
    customerNotes: '',
    showUnitPrices: currentUser.role === 'admin' ? true : (ec.defaultShowPrices || false),
    showQty: currentUser.role === 'admin' ? true : (ec.defaultShowQty || false),
    overheadEnabled: currentUser.role === 'admin' ? true : (ec.defaultOverhead !== false),
    bondEnabled: currentUser.role === 'admin' ? true : (ec.defaultBond !== false),
    consumables: currentUser.role === 'admin' ? (s.defaultConsumables || 100) : (ec.defaultConsumables || s.defaultConsumables || 100),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    approvedAt: null,
    estimateMode: ec.defaultMode || 'simple',
    advancedItems: JSON.parse(JSON.stringify(template.advancedItems || [])).map(it => ({ ...it, id: uid('adv') }))
  };
  $('newBidModal').style.display = 'none';
  openBuilder();
  showToast('Started from template: ' + template.name);
}

function showSaveAsTemplate() {
  if (!currentBid) return;
  $('templateName').value = '';
  $('templateDesc').value = currentBid.projectDescription || '';
  $('saveTemplateModal').style.display = 'flex';
  $('templateName').focus();
}

async function saveAsTemplate() {
  const name = $('templateName').value.trim();
  if (!name) { showToast('Enter a template name', true); return; }
  
  const template = {
    id: uid('tmpl'),
    name: name,
    description: $('templateDesc').value.trim(),
    items: JSON.parse(JSON.stringify(currentBid.items || [])),
    laborItems: JSON.parse(JSON.stringify(currentBid.laborItems || [])),
    advancedItems: JSON.parse(JSON.stringify(currentBid.advancedItems || [])),
    jobType: currentBid.jobType || 'residential',
    exclusions: JSON.parse(JSON.stringify(currentBid.exclusions || [])),
    terms: JSON.parse(JSON.stringify(currentBid.terms || [])),
    customExclusions: currentBid.customExclusions || '',
    createdAt: new Date().toISOString(),
    createdBy: currentUser.name
  };
  
  const s = appSettings || DEFAULT_SETTINGS;
  if (!s.bidTemplates) s.bidTemplates = [];
  s.bidTemplates.push(template);
  await api('saveSettings', { body: s });
  $('saveTemplateModal').style.display = 'none';
  showToast('Template saved: ' + name);
}

function renderSettingsTemplates() {
  const s = appSettings || DEFAULT_SETTINGS;
  const templates = s.bidTemplates || [];
  const container = $('settingsTemplatesList');
  const noMsg = $('noTemplatesMsg');
  if (!container) return;
  
  if (templates.length === 0) {
    container.innerHTML = '';
    if (noMsg) noMsg.style.display = '';
    return;
  }
  if (noMsg) noMsg.style.display = 'none';
  
  container.innerHTML = templates.map((t, i) => `
    <div class="settings-template-row">
      <div class="settings-template-info">
        <strong>${escHtml(t.name)}</strong>
        <span class="settings-template-meta">${escHtml(t.description || '')} · ${(t.items || []).length + (t.laborItems || []).length + (t.advancedItems || []).length} items · by ${escHtml(t.createdBy || '?')}</span>
      </div>
      <button class="btn btn-sm btn-danger-outline delete-template-btn" data-tidx="${i}">Delete</button>
    </div>
  `).join('');
  
  container.querySelectorAll('.delete-template-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const idx = parseInt(btn.dataset.tidx);
      if (!confirm('Delete template "' + templates[idx].name + '"?')) return;
      s.bidTemplates.splice(idx, 1);
      await api('saveSettings', { body: s });
      renderSettingsTemplates();
      showToast('Template deleted');
    });
  });
}

// ===== PENDING CATALOG ITEMS =====
function showSuggestCatalogModal() {
  $('catEditTitle').textContent = '📥 Suggest New Catalog Item';
  $('catEditDesc').value = '';
  $('catEditUnit').value = 'EA';
  $('catEditPrice').value = '';
  $('catEditCategory').value = '';
  $('catEditModal').style.display = 'flex';
  $('catEditModal').dataset.suggestMode = 'true';
}

async function submitCatalogSuggestion() {
  const desc = $('catEditDesc').value.trim();
  const unit = $('catEditUnit').value.trim() || 'EA';
  const price = parseFloat($('catEditPrice').value) || 0;
  const cat = $('catEditCategory').value.trim();
  
  if (!desc) { showToast('Enter a description', true); return; }
  
  const suggestion = {
    id: uid('sug'),
    d: desc,
    u: unit,
    p: price,
    c: cat,
    suggestedBy: currentUser.name,
    suggestedAt: new Date().toISOString()
  };
  
  const s = appSettings || DEFAULT_SETTINGS;
  if (!s.pendingCatalogItems) s.pendingCatalogItems = [];
  s.pendingCatalogItems.push(suggestion);
  await api('saveSettings', { body: s });
  $('catEditModal').style.display = 'none';
  $('catEditModal').dataset.suggestMode = '';
  showToast('Item suggested! Ryan will review it.');
}

function renderPendingCatalogItems() {
  const s = appSettings || DEFAULT_SETTINGS;
  const pending = s.pendingCatalogItems || [];
  const container = $('pendingCatalogList');
  const noMsg = $('noPendingMsg');
  if (!container) return;
  
  if (pending.length === 0) {
    container.innerHTML = '';
    if (noMsg) noMsg.style.display = '';
    return;
  }
  if (noMsg) noMsg.style.display = 'none';
  
  container.innerHTML = pending.map((item, i) => `
    <div class="pending-catalog-row">
      <div class="pending-catalog-info">
        <strong>${escHtml(item.d)}</strong>
        <span class="pending-catalog-meta">${escHtml(item.u)} · ${money(item.p)} · ${escHtml(item.c || 'No category')} · Suggested by ${escHtml(item.suggestedBy || '?')}</span>
      </div>
      <div class="pending-catalog-actions">
        <button class="btn btn-sm btn-primary approve-pending-btn" data-pidx="${i}">✓ Approve</button>
        <button class="btn btn-sm btn-danger-outline reject-pending-btn" data-pidx="${i}">✕ Reject</button>
      </div>
    </div>
  `).join('');
  
  container.querySelectorAll('.approve-pending-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const idx = parseInt(btn.dataset.pidx);
      const item = pending[idx];
      CATALOG.push({ d: item.d, u: item.u, p: item.p, c: item.c, pt: item.pt || 'General' });
      await api('saveCatalog', { body: CATALOG });
      s.pendingCatalogItems.splice(idx, 1);
      await api('saveSettings', { body: s });
      renderPendingCatalogItems();
      renderSettingsCatalog();
      showToast('Approved: ' + item.d);
    });
  });
  
  container.querySelectorAll('.reject-pending-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const idx = parseInt(btn.dataset.pidx);
      const name = pending[idx].d;
      if (!confirm('Reject "' + name + '"?')) return;
      s.pendingCatalogItems.splice(idx, 1);
      await api('saveSettings', { body: s });
      renderPendingCatalogItems();
      showToast('Rejected: ' + name);
    });
  });
}

// ===== EVENT BINDINGS =====
function initEvents() {
  // Dashboard
  $('logoutBtn').addEventListener('click', () => {
    currentUser = null;
    pinBuffer = '';
    updatePinDots();
    showScreen('loginScreen');
  });

  if ($('hubBtn')) {
    $('hubBtn').addEventListener('click', () => {
      try {
        window.parent.postMessage({ source: 'rdmpe-bid-builder', type: 'navigate-hub' }, window.location.origin);
      } catch (e) { /* ignore */ }
    });
  }

  $('newBidBtn').addEventListener('click', showNewBidModal);

  if ($('bidSearch')) $('bidSearch').addEventListener('input', () => renderBids());

  $('bidsList').addEventListener('click', async (e) => {
    const card = e.target.closest('.bid-card');
    if (!card) return;
    const id = card.dataset.id;
    try {
      currentBid = await api('get', { id });
      if (!currentBid) { showToast('Bid not found', true); return; }
      openBuilder();
    } catch (err) {
      showToast('Failed to load bid', true);
    }
  });

  $('filterTabs').addEventListener('click', e => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;
    $$('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderBids(tab.dataset.filter);
  });

  $('settingsBtn').addEventListener('click', showSettings);

  // New Bid Modal
  $('newBidBlank').addEventListener('click', () => {
    $('newBidModal').style.display = 'none';
    createNewBid();
  });
  $('newBidModalCancel').addEventListener('click', () => $('newBidModal').style.display = 'none');
  $('templatePickList')?.addEventListener('click', e => {
    const item = e.target.closest('.template-pick-item');
    if (!item) return;
    const idx = parseInt(item.dataset.tidx);
    const s = appSettings || DEFAULT_SETTINGS;
    const template = (s.bidTemplates || [])[idx];
    if (template) createBidFromTemplate(template);
  });
  
  // Save as Template
  $('saveAsTemplateBtn')?.addEventListener('click', showSaveAsTemplate);
  $('saveTemplateSaveBtn')?.addEventListener('click', saveAsTemplate);
  $('saveTemplateCancelBtn')?.addEventListener('click', () => $('saveTemplateModal').style.display = 'none');
  
  // Suggest catalog item
  $('suggestCatalogBtn')?.addEventListener('click', showSuggestCatalogModal);

  // Bid-level controls
  $('bidOverheadToggle').addEventListener('change', () => {
    currentBid.overheadEnabled = $('bidOverheadToggle').checked;
    recalcSummary();
    scheduleAutoSave();
  });
  $('bidBondToggle').addEventListener('change', () => {
    currentBid.bondEnabled = $('bidBondToggle').checked;
    recalcSummary();
    scheduleAutoSave();
  });
  // Consumables display toggle
  if ($('consumablesDisplay')) {
    $('consumablesDisplay').addEventListener('change', () => {
      const mode = $('consumablesDisplay').value;
      $('consumablesFoldTarget').style.display = mode === 'foldInto' ? 'inline-block' : 'none';
      if (mode === 'foldInto') updateConsumablesFoldTargets();
      autoSave();
    });
    $('consumablesFoldTarget').addEventListener('change', () => { autoSave(); });
  }

  $('bidConsumables').addEventListener('input', () => {
    currentBid.consumables = parseFloat($('bidConsumables').value) || 0;
    recalcSummary();
    scheduleAutoSave();
  });
  $('bidTaxToggle').addEventListener('change', () => {
    currentBid.taxEnabled = $('bidTaxToggle').checked;
    recalcSummary();
    scheduleAutoSave();
  });
  $('bidTaxRate').addEventListener('input', () => {
    currentBid.taxRate = parseFloat($('bidTaxRate').value) || 0;
    recalcSummary();
    scheduleAutoSave();
  });

  // Builder buttons
  $('backToDash').addEventListener('click', async () => {
    if (currentBid && currentBid.status === 'draft') {
      gatherBidData();
      try { await api('save', { body: currentBid }); } catch (e) { /* silent */ }
    }
    await showDashboard();
  });
  $('builderSave').addEventListener('click', () => saveBid());
  $('costSummaryBtn').addEventListener('click', () => {
    // In Advanced mode, switch to Summary tab instead of popup
    if (currentBid && currentBid.estimateMode === 'advanced' && currentUser && currentUser.role === 'admin') {
      switchAdvTab('summary');
      return;
    }
    showCostSummary();
  });
  $('costSummaryClose').addEventListener('click', () => $('costSummaryModal').style.display = 'none');
  $('costSummaryModal').addEventListener('click', e => { if (e.target.id === 'costSummaryModal') $('costSummaryModal').style.display = 'none'; });
  $('builderSubmit').addEventListener('click', submitBid);
  $('builderApprove').addEventListener('click', approveBid);
  $('builderSendBack').addEventListener('click', sendBackBid);
  $('modeToggle').addEventListener('click', toggleEstimateMode);
  $('builderProposal').addEventListener('click', showProposal);
  $('builderDelete').addEventListener('click', deleteBid);

  // Catalog panel
  $('catalogSearch').addEventListener('input', e => {
    catalogSearchTerm = e.target.value;
    renderCatalog();
  });

  $('catalogTabs').addEventListener('click', e => {
    const tab = e.target.closest('.cat-tab');
    if (!tab) return;
    $$('.cat-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    catalogFilter = tab.dataset.cat;
    renderCatalog();
  });

  $('catalogList').addEventListener('click', e => {
    const addBtn = e.target.closest('.cat-detail-add-btn');
    if (addBtn) {
      const idx = parseInt(addBtn.dataset.idx);
      const item = CATALOG[idx];
      if (!item) return;
      const qtyInput = addBtn.closest('.catalog-item-detail').querySelector('.cat-detail-qty-input');
      const qty = parseFloat(qtyInput?.value) || 1;
      if (qty <= 0) { showToast('Enter a valid quantity', true); return; }
      
      const newItem = {
        id: uid('item'),
        description: item.d,
        qty: qty,
        unit: item.u,
        unitCost: item.p,
        category: 'catalog',
        markupPct: getSmartDefaults('catalog').markupPct,
        overheadPct: getSmartDefaults('catalog').overheadPct,
        bondPct: getSmartDefaults('catalog').bondPct,
        noMarkup: false,
        taxable: true
      };
      currentBid.items.push(newItem);
      renderItems();
      recalcSummary();
      showToast('Added: ' + item.d);
      scheduleAutoSave();
      return;
    }
    
    const catItem = e.target.closest('.catalog-item');
    if (!catItem) return;
    const idx = catItem.dataset.idx;
    const detail = $('catDetail_' + idx);
    if (!detail) return;
    
    // Close all other open details
    document.querySelectorAll('.catalog-item-detail').forEach(d => {
      if (d.id !== 'catDetail_' + idx) d.style.display = 'none';
    });
    document.querySelectorAll('.catalog-item').forEach(ci => {
      if (ci !== catItem) ci.classList.remove('expanded');
    });
    
    // Toggle this one
    if (detail.style.display === 'none') {
      detail.style.display = 'block';
      catItem.classList.add('expanded');
    } else {
      detail.style.display = 'none';
      catItem.classList.remove('expanded');
    }
  });

  $('showCatalogBtn').addEventListener('click', () => {
    const panel = $('catalogPanel');
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
      $('showCatalogBtn').textContent = '✕ Hide Catalog';
      $('showCatalogBtn').className = 'btn btn-sm btn-outline';
    } else {
      $('showCatalogBtn').textContent = '+ From Catalog';
      $('showCatalogBtn').className = 'btn btn-sm btn-primary';
    }
  });

  $('catalogToggle').addEventListener('click', () => {
    $('catalogPanel').classList.remove('open');
    $('showCatalogBtn').textContent = '+ From Catalog';
    $('showCatalogBtn').className = 'btn btn-sm btn-primary';
  });

  // Catalog modal
  $('catalogModalAdd').addEventListener('click', addCatalogItem);
  $('catalogModalCancel').addEventListener('click', () => { $('catalogModal').style.display = 'none'; });
  $('catalogModalQty').addEventListener('keydown', e => { if (e.key === 'Enter') addCatalogItem(); });

  // Custom modal
  $('addCustomBtn').addEventListener('click', showCustomModal);
  $('customModalAdd').addEventListener('click', addCustomItem);
  $('customModalCancel').addEventListener('click', () => { $('customModal').style.display = 'none'; });

  // Labor modal
  $('addLaborBtn').addEventListener('click', showLaborModal);
  $('laborModalAdd').addEventListener('click', addLaborItem);
  $('laborModalCancel').addEventListener('click', () => { $('laborModal').style.display = 'none'; });

  // Save custom item to catalog
  if ($('saveCustomSave')) $('saveCustomSave').addEventListener('click', saveCustomToCatalog);
  if ($('saveCustomCancel')) $('saveCustomCancel').addEventListener('click', () => { $('saveCustomModal').style.display = 'none'; });

  // Project type filter in catalog
  if ($('catalogProjectType')) $('catalogProjectType').addEventListener('change', renderCatalog);

  // Items table inline editing
  $('itemsBody').addEventListener('input', e => {
    const inp = e.target;
    const idx = parseInt(inp.dataset.idx, 10);
    if (isNaN(idx)) return;
    const field = inp.dataset.field;
    if (!field) return;
    const item = currentBid.items[idx];
    if (field === 'noMarkup') {
      item.noMarkup = inp.checked;
    } else if (field === 'taxable') {
      item.taxable = inp.checked;
      recalcSummary();
      scheduleAutoSave();
      return;
    } else {
      item[field] = parseFloat(inp.value) || 0;
    }
    // Update the total cell in-place instead of re-rendering the whole table (which kills focus)
    const row = inp.closest('tr');
    if (row) {
      const adv = currentBid.estimateMode === 'advanced';
      const total = adv ? calcItemTotal(item) : ((item.qty || 0) * (item.unitCost || 0));
      const cells = row.querySelectorAll('td');
      // Total is in the second-to-last cell
      const totalCell = cells[cells.length - 2];
      if (totalCell) totalCell.textContent = money(total);
    }
    recalcSummary();
    scheduleAutoSave();
  });

  $('itemsBody').addEventListener('change', e => {
    if (e.target.type === 'checkbox') {
      const idx = parseInt(e.target.dataset.idx, 10);
      if (isNaN(idx)) return;
      const field = e.target.dataset.field;
      if (field === 'taxable') {
        currentBid.items[idx].taxable = e.target.checked;
        recalcSummary();
        scheduleAutoSave();
        return;
      }
      currentBid.items[idx].noMarkup = e.target.checked;
      renderItems();
      recalcSummary();
    }
  });

  // Save to catalog buttons
  document.addEventListener('click', e => {
    const saveBtn = e.target.closest('.save-catalog-btn');
    if (!saveBtn) return;
    const type = saveBtn.dataset.type;
    if (type === 'item') {
      const idx = parseInt(saveBtn.dataset.idx);
      showSaveCustomModal(currentBid.items[idx]);
    } else if (type === 'labor') {
      const idx = parseInt(saveBtn.dataset.lidx);
      const it = currentBid.laborItems[idx];
      showSaveCustomModal({ description: it.description, unit: 'HRS', unitCost: it.rate });
    }
  });

  $('itemsBody').addEventListener('click', e => {
    const btn = e.target.closest('.delete-item-btn');
    if (!btn) return;
    const idx = parseInt(btn.dataset.idx, 10);
    currentBid.items.splice(idx, 1);
    renderItems();
    recalcSummary();
    scheduleAutoSave();
  });

  // Labor table inline editing
  $('laborBody').addEventListener('input', e => {
    const inp = e.target;
    if (inp.type === 'checkbox') return; // checkboxes handled by change event
    const idx = parseInt(inp.dataset.lidx, 10);
    if (isNaN(idx)) return;
    const field = inp.dataset.field;
    if (!field) return;
    const item = currentBid.laborItems[idx];
    if (field === 'noMarkup') {
      item.noMarkup = inp.checked;
    } else {
      item[field] = parseFloat(inp.value) || 0;
    }
    // Update the total cell in-place instead of re-rendering the whole table (which kills focus)
    const row = inp.closest('tr');
    if (row) {
      const adv = currentBid.estimateMode === 'advanced';
      const total = adv ? calcLaborTotal(item) : ((item.hours || 0) * (item.rate || 0));
      const cells = row.querySelectorAll('td');
      // Total is in the second-to-last cell
      const totalCell = cells[cells.length - 2];
      if (totalCell) totalCell.textContent = money(total);
    }
    recalcSummary();
    scheduleAutoSave();
  });

  $('laborBody').addEventListener('change', e => {
    if (e.target.type === 'checkbox') {
      const idx = parseInt(e.target.dataset.lidx, 10);
      if (isNaN(idx)) return;
      const field = e.target.dataset.field;
      if (field === 'lumpSum') {
        currentBid.laborItems[idx].lumpSum = e.target.checked;
      } else {
        currentBid.laborItems[idx].noMarkup = e.target.checked;
        renderLaborItems();
        recalcSummary();
      }
    }
  });

  $('laborBody').addEventListener('click', e => {
    const btn = e.target.closest('.delete-item-btn');
    if (!btn) return;
    const idx = parseInt(btn.dataset.lidx, 10);
    currentBid.laborItems.splice(idx, 1);
    renderLaborItems();
    recalcSummary();
    scheduleAutoSave();
  });

  // Proposal
  // Proposal item display gear buttons
  document.addEventListener('click', e => {
    const gear = e.target.closest('.proposal-gear-btn');
    if (!gear) return;
    const idx = parseInt(gear.dataset.pidx);
    const type = gear.dataset.ptype;
    if (!isNaN(idx) && type) showProposalItemModal(type, idx);
  });

  // Proposal item modal
  $('piSave').addEventListener('click', saveProposalItemSettings);
  $('piCancel').addEventListener('click', () => { $('proposalItemModal').style.display = 'none'; });
  $('piGroupSelect').addEventListener('change', e => {
    $('piNewGroup').style.display = e.target.value === '__new__' ? '' : 'none';
    if (e.target.value === '__new__') $('piNewGroup').focus();
    // Disable unit price if in a group
    $('piShowUnitPrice').disabled = !!e.target.value && e.target.value !== '__new__';
    if ($('piShowUnitPrice').disabled) $('piShowUnitPrice').checked = false;
  });

  $('proposalBack').addEventListener('click', () => openBuilder());
  $('proposalPrint').addEventListener('click', () => window.print());

  // Settings
  $('settingsBack').addEventListener('click', showDashboard);
  $('settingsSave').addEventListener('click', saveSettings);

  // Catalog management
  if ($('catMgmtSearch')) {
    $('catMgmtSearch').addEventListener('input', renderSettingsCatalog);
  }
  if ($('catMgmtCategoryFilter')) {
    $('catMgmtCategoryFilter').addEventListener('change', renderSettingsCatalog);
  }
  if ($('catMgmtAddBtn')) {
    $('catMgmtAddBtn').addEventListener('click', () => showCatalogEditModal(-1));
  }
  if ($('catEditSave')) {
    $('catEditSave').addEventListener('click', saveCatalogItem);
  }
  if ($('catEditCancel')) {
    $('catEditCancel').addEventListener('click', () => $('catEditModal').style.display = 'none');
  }
  // Catalog import/export buttons
  if ($('importCatalogBtn')) {
    $('importCatalogBtn').addEventListener('click', () => $('catalogFileInput').click());
  }
  if ($('catalogFileInput')) {
    $('catalogFileInput').addEventListener('change', handleCatalogFileSelect);
  }
  if ($('exportCatalogBtn')) {
    $('exportCatalogBtn').addEventListener('click', exportCatalogToExcel);
  }
  if ($('downloadTemplateBtn')) {
    $('downloadTemplateBtn').addEventListener('click', downloadCatalogTemplate);
  }
  if ($('catalogImportCancel')) {
    $('catalogImportCancel').addEventListener('click', () => $('catalogImportModal').style.display = 'none');
  }
  if ($('catalogImportConfirm')) {
    $('catalogImportConfirm').addEventListener('click', confirmCatalogImport);
  }

  // Delegate clicks on catalog management table
  if ($('settingsCatalogList')) {
    $('settingsCatalogList').addEventListener('click', (e) => {
      const editBtn = e.target.closest('.cat-edit-btn');
      const delBtn = e.target.closest('.cat-del-btn');
      const visBtn = e.target.closest('.cat-vis-btn');
      if (editBtn) showCatalogEditModal(parseInt(editBtn.dataset.catIdx));
      if (delBtn) deleteCatalogItem(parseInt(delBtn.dataset.catIdx));
      if (visBtn) toggleCatalogItemVisibility(parseInt(visBtn.dataset.catIdx));
    });
  }

  // Labor rates
  $('addLaborRateBtn')?.addEventListener('click', addLaborRate);
  $('settingsLaborRates')?.addEventListener('click', e => {
    const editIdx = e.target.dataset?.editLabor;
    if (editIdx !== undefined) editLaborRate(parseInt(editIdx));
    const delIdx = e.target.dataset?.delLabor;
    if (delIdx !== undefined) deleteLaborRate(parseInt(delIdx));
  });

  // Equipment rates
  $('addEquipRateBtn')?.addEventListener('click', addEquipmentRate);
  $('settingsEquipmentRates')?.addEventListener('click', e => {
    const editIdx = e.target.dataset?.editEquip;
    if (editIdx !== undefined) editEquipmentRate(parseInt(editIdx));
    const delIdx = e.target.dataset?.delEquip;
    if (delIdx !== undefined) deleteEquipmentRate(parseInt(delIdx));
  });

  // Crew compositions
  $('addCrewCompBtn')?.addEventListener('click', () => openCrewCompModal(-1));
  $('settingsCrewComps')?.addEventListener('click', e => {
    const editIdx = e.target.dataset?.editCrew;
    if (editIdx !== undefined) openCrewCompModal(parseInt(editIdx));
    const delIdx = e.target.dataset?.delCrew;
    if (delIdx !== undefined) deleteCrewComp(parseInt(delIdx));
  });

  // Crew modal
  $('crewCompCancel')?.addEventListener('click', () => $('crewCompModal').style.display = 'none');
  $('crewCompSave')?.addEventListener('click', saveCrewComp);
  $('crewCompAddMember')?.addEventListener('click', addCrewMember);
  $('crewCompAddEquip')?.addEventListener('click', addCrewEquipment);
  $('crewCompMembers')?.addEventListener('change', handleCrewMemberChange);
  $('crewCompMembers')?.addEventListener('click', handleCrewMemberChange);
  $('crewCompEquipment')?.addEventListener('change', handleCrewEquipChange);
  $('crewCompEquipment')?.addEventListener('click', handleCrewEquipChange);

  // Labor modal crew select
  $('laborCrewSelect')?.addEventListener('change', onCrewSelectChange);

  // Advanced bid summary toggle
  $('advSummaryToggle')?.addEventListener('click', (e) => {
    // Don't toggle if clicking inside a detail card
    if (e.target.closest('.summary-item-compact') || e.target.closest('.summary-item-detail')) return;
    const body = $('advSummaryBody');
    const icon = $('advSummaryToggle')?.querySelector('.summary-toggle-icon');
    if (body.classList.contains('hidden')) {
      body.classList.remove('hidden');
      if (icon) icon.textContent = '▼';
    } else {
      body.classList.add('hidden');
      if (icon) icon.textContent = '▶';
    }
  });

  // Job type selector in builder
  if ($('jobTypeSelector')) {
    $('jobTypeSelector').addEventListener('click', e => {
      const btn = e.target.closest('.job-type-btn');
      if (!btn) return;
      switchJobType(btn.dataset.jobType);
    });
  }

  // Exclusion/terms checkbox changes trigger auto-save
  if ($('exclusionChecks')) {
    $('exclusionChecks').addEventListener('change', () => scheduleAutoSave());
  }
  if ($('termsChecks')) {
    $('termsChecks').addEventListener('change', () => scheduleAutoSave());
  }

  // Settings exclusions type tab switching
  $$('.settings-excl-type-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.exclCat;
      $$('.settings-excl-type-tab').forEach(t => t.classList.toggle('active', t === tab));
      const isRes = cat === 'residential';
      if ($('settingsExclResidentialSection')) $('settingsExclResidentialSection').style.display = isRes ? '' : 'none';
      if ($('settingsResTermsSection')) $('settingsResTermsSection').style.display = isRes ? '' : 'none';
      if ($('settingsExclCommercialSection')) $('settingsExclCommercialSection').style.display = isRes ? 'none' : '';
      if ($('settingsComTermsSection')) $('settingsComTermsSection').style.display = isRes ? 'none' : '';
    });
  });

  // Residential exclusions add/remove
  $('addResExclusionBtn').addEventListener('click', () => {
    const val = $('newResExclusion').value.trim();
    if (!val) return;
    if (!appSettings.residentialExclusions) appSettings.residentialExclusions = [...RESIDENTIAL_EXCLUSIONS];
    appSettings.residentialExclusions.push(val);
    $('newResExclusion').value = '';
    renderSettingsExclusions();
  });
  $('settingsResExclusions').addEventListener('click', e => {
    const btn = e.target.closest('button[data-res-excl-idx]');
    if (!btn) return;
    appSettings.residentialExclusions.splice(parseInt(btn.dataset.resExclIdx, 10), 1);
    renderSettingsExclusions();
  });

  // Residential terms add/remove
  $('addResTermBtn').addEventListener('click', () => {
    const val = $('newResTerm').value.trim();
    if (!val) return;
    if (!appSettings.residentialTerms) appSettings.residentialTerms = [...RESIDENTIAL_TERMS];
    appSettings.residentialTerms.push(val);
    $('newResTerm').value = '';
    renderSettingsExclusions();
  });
  $('settingsResTerms').addEventListener('click', e => {
    const btn = e.target.closest('button[data-res-term-idx]');
    if (!btn) return;
    appSettings.residentialTerms.splice(parseInt(btn.dataset.resTermIdx, 10), 1);
    renderSettingsExclusions();
  });

  // Commercial exclusions add/remove
  $('addComExclusionBtn').addEventListener('click', () => {
    const val = $('newComExclusion').value.trim();
    if (!val) return;
    if (!appSettings.commercialExclusions) appSettings.commercialExclusions = [...COMMERCIAL_EXCLUSIONS];
    appSettings.commercialExclusions.push(val);
    $('newComExclusion').value = '';
    renderSettingsExclusions();
  });
  $('settingsComExclusions').addEventListener('click', e => {
    const btn = e.target.closest('button[data-com-excl-idx]');
    if (!btn) return;
    appSettings.commercialExclusions.splice(parseInt(btn.dataset.comExclIdx, 10), 1);
    renderSettingsExclusions();
  });

  // Commercial terms add/remove
  $('addComTermBtn').addEventListener('click', () => {
    const val = $('newComTerm').value.trim();
    if (!val) return;
    if (!appSettings.commercialTerms) appSettings.commercialTerms = [...COMMERCIAL_TERMS];
    appSettings.commercialTerms.push(val);
    $('newComTerm').value = '';
    renderSettingsExclusions();
  });
  $('settingsComTerms').addEventListener('click', e => {
    const btn = e.target.closest('button[data-com-term-idx]');
    if (!btn) return;
    appSettings.commercialTerms.splice(parseInt(btn.dataset.comTermIdx, 10), 1);
    renderSettingsExclusions();
  });

  // Advanced tab bar events
  if ($('advTabBar')) {
    $('advTabBar').addEventListener('click', e => {
      const tab = e.target.closest('.adv-tab');
      if (tab && tab.dataset.tab) {
        switchAdvTab(tab.dataset.tab);
      }
    });
  }
  
  // Pricing tab — all editable field changes (MU%, OH%, Bid Unit, Target Margin)
  document.addEventListener('change', e => {
    const field = e.target.dataset.field;
    const idx = parseInt(e.target.dataset.idx);
    if (!field || isNaN(idx)) return;
    // Only handle pricing inputs (table or card)
    const inPricing = e.target.closest('#pricingTabPanel');
    if (!inPricing) return;
    handlePricingFieldChange(field, idx, e.target.value);
    renderAdvancedItems();
    updateAdvBidSummary(currentBid);
  });
  
  // Global adjuster buttons
  if ($('applyGlobalMarkup')) {
    $('applyGlobalMarkup').addEventListener('click', () => {
      const val = parseFloat($('globalMarkup').value);
      if (isNaN(val) || !currentBid || !currentBid.advancedItems) return;
      $('globalMarkup')._userSet = true;
      currentBid.advancedItems.forEach(item => {
        applyItemMarkupPct(item, val);
        delete item.bidUnitOverride; // Recalculate from new markup
      });
      renderPricingTab();
      renderAdvancedItems();
      updateAdvBidSummary(currentBid);
      scheduleAutoSave();
      showToast('Markup set to ' + val + '% on all items');
    });
  }
  if ($('applyGlobalOH')) {
    $('applyGlobalOH').addEventListener('click', () => {
      const val = parseFloat($('globalOH').value);
      if (isNaN(val) || !currentBid || !currentBid.advancedItems) return;
      currentBid.advancedItems.forEach(item => {
        applyItemOverheadPct(item, val);
        delete item.bidUnitOverride;
      });
      renderPricingTab();
      renderAdvancedItems();
      updateAdvBidSummary(currentBid);
      scheduleAutoSave();
      showToast('Overhead set to ' + val + '% on all items');
    });
  }
  if ($('applyGlobalMargin')) {
    $('applyGlobalMargin').addEventListener('click', () => {
      const val = parseFloat($('globalMargin').value);
      if (isNaN(val) || val >= 100 || !currentBid || !currentBid.advancedItems) return;
      currentBid.advancedItems.forEach(item => {
        setItemTargetMargin(item, val);
      });
      renderPricingTab();
      renderAdvancedItems();
      updateAdvBidSummary(currentBid);
      scheduleAutoSave();
      showToast('All prices set to ' + val + '% target margin');
    });
  }

  // Advanced builder events
  if ($('addAdvItemBtn')) {
    $('addAdvItemBtn').addEventListener('click', () => showAdvItemEditor(-1));
  }
  if ($('advItemSave')) {
    $('advItemSave').addEventListener('click', saveAdvItem);
  }
  if ($('advItemCancel')) {
    $('advItemCancel').addEventListener('click', () => { $('advItemModal').style.display = 'none'; });
  }

  // Advanced items table - click to edit, delete button
  if ($('advItemsBody')) {
    $('advItemsBody').addEventListener('click', e => {
      // Ignore clicks on production row or its inputs
      if (e.target.closest('.prod-table-row') || e.target.classList.contains('prod-table-edit')) return;
      const delBtn = e.target.closest('.adv-del-btn');
      if (delBtn) {
        e.stopPropagation();
        deleteAdvItem(parseInt(delBtn.dataset.advIdx));
        return;
      }
      const row = e.target.closest('tr[data-adv-idx]');
      if (row) showAdvItemEditor(parseInt(row.dataset.advIdx));
    });
    // Production edit inputs in the Bid Items table
    $('advItemsBody').addEventListener('change', e => {
      if (!e.target.classList.contains('prod-table-edit')) return;
      handleProductionEdit(e);
    });
  }

  // Cost component events in item editor
  document.addEventListener('click', e => {
    const addCostBtn = e.target.closest('.add-cost-btn');
    if (addCostBtn) {
      if (addCostBtn.id === 'addCrewToCostBtn') {
        openAdvCrewPicker();
        return;
      }
      const type = addCostBtn.dataset.costType;
      if (type === 'catalog') {
        showAdvCatalogSearch();
      } else {
        addCostRow(type);
      }
      return;
    }
    // Crew picker item click
    const crewOpt = e.target.closest('.adv-crew-option');
    if (crewOpt) {
      const cidx = parseInt(crewOpt.dataset.crewIdx);
      if (!isNaN(cidx)) addCrewAsCostRows(cidx);
      return;
    }
    const costDelBtn = e.target.closest('.cost-delete-btn');
    if (costDelBtn && $('advItemModal').style.display !== 'none') {
      const cidx = parseInt(costDelBtn.dataset.cidx);
      editingCosts.splice(cidx, 1);
      renderCostRows();
      recalcAdvItemTotals();
      return;
    }
  });

  // Cost table inline editing
  if ($('costsBody')) {
    $('costsBody').addEventListener('input', e => {
      const inp = e.target;
      const cidx = parseInt(inp.dataset.cidx);
      if (isNaN(cidx)) return;
      const field = inp.dataset.cf;
      if (!field) return;
      if (field === 'description' || field === 'unit') {
        editingCosts[cidx][field] = inp.value;
      } else if (field === 'taxable') {
        editingCosts[cidx].taxable = inp.checked;
      } else {
        editingCosts[cidx][field] = parseFloat(inp.value) || 0;
      }
      recalcAdvItemTotals();
    });
    $('costsBody').addEventListener('change', e => {
      const inp = e.target;
      if (inp.type !== 'checkbox') return;
      const cidx = parseInt(inp.dataset.cidx);
      if (isNaN(cidx)) return;
      const field = inp.dataset.cf;
      if (field === 'taxable') {
        editingCosts[cidx].taxable = inp.checked;
      }
    });
  }

  // No markup checkbox recalc
  if ($('advItemNoMarkup')) {
    $('advItemNoMarkup').addEventListener('change', () => {
      renderCostRows();
      recalcAdvItemTotals();
    });
  }

  // Qty change recalculates bid unit
  if ($('advItemQty')) {
    $('advItemQty').addEventListener('input', recalcAdvItemTotals);
  }
  if ($('advItemBidOverride')) {
    $('advItemBidOverride').addEventListener('input', recalcAdvItemTotals);
  }

  // Catalog search in editor
  if ($('advCatSearchInput')) {
    $('advCatSearchInput').addEventListener('input', renderAdvCatResults);
  }
  if ($('advCatSearchPT')) {
    $('advCatSearchPT').addEventListener('change', renderAdvCatResults);
  }
  if ($('advCatSearchClose')) {
    $('advCatSearchClose').addEventListener('click', () => { $('advCatSearchPanel').style.display = 'none'; });
  }
  if ($('advCrewPickerClose')) {
    $('advCrewPickerClose').addEventListener('click', () => { $('advCrewPickerPanel').style.display = 'none'; });
  }
  if ($('advCatResults')) {
    document.addEventListener('click', e => {
      const item = e.target.closest('.adv-cat-result-item');
      if (!item) return;
      const idx = parseInt(item.dataset.catRealIdx);
      if (!isNaN(idx) && CATALOG[idx]) {
        addCatalogItemAsCost(CATALOG[idx]);
      }
    });
  }

  // Close modals on overlay click
  $$('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.style.display = 'none';
    });
  });

  // Close modals on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      $$('.modal-overlay').forEach(m => m.style.display = 'none');
      if ($('catalogPanel').classList.contains('open')) {
        $('catalogPanel').classList.remove('open');
        $('showCatalogBtn').textContent = '+ From Catalog';
        $('showCatalogBtn').className = 'btn btn-sm btn-primary';
      }
    }
  });

  // Settings tab switching
  document.querySelectorAll('.settings-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.settings-tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.querySelector(`[data-settings-panel="${tab.dataset.settingsTab}"]`);
      if (panel) panel.classList.add('active');
    });
  });

  // Auto-save on any input change in the builder
  document.getElementById('builderScreen')?.addEventListener('change', scheduleAutoSave);
  document.getElementById('builderScreen')?.addEventListener('input', (e) => {
    if (e.target.matches('input[type="text"], input[type="number"], textarea, select')) {
      scheduleAutoSave();
    }
  });
}

// ===== INIT =====
// ===== BID SHARING =====
function exportBid(bid) {
  try {
    const data = JSON.stringify(bid);
    const encoded = btoa(unescape(encodeURIComponent(data)));
    return encoded;
  } catch(e) { showToast('Error exporting bid', true); return null; }
}

function importBidFromCode(code) {
  try {
    const data = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
    if (!data.id || !data.bidNumber) throw new Error('Invalid bid data');
    // Give it a new ID to avoid conflicts
    data.id = uid('bid');
    data.status = ['approved','submitted','returned'].includes(data.status) ? data.status : 'draft';
    data.importedAt = new Date().toISOString();
    // Save via shared storage (async, fire and forget)
    api('save', { body: data });
    return data;
  } catch(e) { showToast('Invalid bid code. Please check and try again.', true); return null; }
}

function showShareModal(bid) {
  const code = exportBid(bid);
  if (!code) return;
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'shareModal';
  modal.innerHTML = `
    <div class="modal" style="max-width:500px">
      <h3>Share Bid: ${escHtml(bid.bidNumber)}</h3>
      <p style="margin-bottom:12px;color:#666">Copy this code and text/email it to the other user. They can import it on their device.</p>
      <textarea id="shareCode" readonly style="width:100%;height:120px;font-family:monospace;font-size:11px;padding:8px;border:1px solid #ccc;border-radius:6px;resize:none">${code}</textarea>
      <div style="display:flex;gap:8px;margin-top:12px">
        <button onclick="navigator.clipboard.writeText(document.getElementById('shareCode').value).then(()=>showToast('Code copied to clipboard!')).catch(()=>showToast('Copy failed',true))" class="btn btn-primary" style="flex:1">📋 Copy Code</button>
        <button onclick="document.getElementById('shareModal').remove()" class="btn btn-secondary" style="flex:1">Close</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
}

function showImportModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'importModal';
  modal.innerHTML = `
    <div class="modal" style="max-width:500px">
      <h3>Import a Bid</h3>
      <p style="margin-bottom:12px;color:#666">Paste the bid code you received from the other user.</p>
      <textarea id="importCode" placeholder="Paste bid code here..." style="width:100%;height:120px;font-family:monospace;font-size:11px;padding:8px;border:1px solid #ccc;border-radius:6px;resize:none"></textarea>
      <div style="display:flex;gap:8px;margin-top:12px">
        <button onclick="doImport()" class="btn btn-primary" style="flex:1">📥 Import Bid</button>
        <button onclick="document.getElementById('importModal').remove()" class="btn btn-secondary" style="flex:1">Cancel</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
}

function doImport() {
  const code = document.getElementById('importCode').value;
  if (!code.trim()) { showToast('Please paste a bid code', true); return; }
  const bid = importBidFromCode(code);
  if (bid) {
    document.getElementById('importModal').remove();
    showToast('Bid ' + bid.bidNumber + ' imported successfully!');
    showDashboard();
  }
}


// ===== CATALOG IMPORT / EXPORT (SheetJS) =====

let pendingImportItems = [];

function autoSizeColumns(ws, data) {
  const colWidths = [];
  data.forEach(row => {
    row.forEach((cell, i) => {
      const len = cell != null ? String(cell).length : 0;
      colWidths[i] = Math.max(colWidths[i] || 0, len);
    });
  });
  ws['!cols'] = colWidths.map(w => ({ wch: Math.min(w + 2, 50) }));
}

function exportCatalogToExcel() {
  if (!CATALOG || CATALOG.length === 0) {
    showToast('Catalog is empty — nothing to export', true);
    return;
  }
  const headers = ['Description', 'Unit', 'Price', 'Vendor', 'Category', 'Project Type'];
  const rows = CATALOG.map(it => [
    it.d || '',
    it.u || '',
    it.p || 0,
    it.v || '',
    it.c || '',
    it.pt || 'Septic'
  ]);
  const data = [headers, ...rows];
  const ws = XLSX.utils.aoa_to_sheet(data);
  autoSizeColumns(ws, data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Catalog');
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  XLSX.writeFile(wb, 'RD_McKinney_Catalog_' + today + '.xlsx');
  showToast('Catalog exported (' + CATALOG.length + ' items)');
}

function downloadCatalogTemplate() {
  const headers = ['Description', 'Unit', 'Price', 'Vendor', 'Category', 'Project Type'];
  const examples = [
    ['4" PVC Pipe SDR35', 'LF', 3.50, 'Ferguson', 'Pipe', 'Septic'],
    ['1000 Gal Septic Tank', 'EA', 2500.00, 'Oldcastle', 'Tank', 'Septic'],
    ['Crushed Limestone', 'TON', 38.00, 'Hallett Materials', 'Rock', 'Storm']
  ];
  const data = [headers, ...examples];
  const ws = XLSX.utils.aoa_to_sheet(data);
  autoSizeColumns(ws, data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Catalog');
  XLSX.writeFile(wb, 'RD_McKinney_Catalog_Template.xlsx');
  showToast('Template downloaded');
}

function handleCatalogFileSelect(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const data = new Uint8Array(evt.target.result);
      const wb = XLSX.read(data, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(ws, { defval: '' });
      if (!json || json.length === 0) {
        showToast('No data found in file', true);
        return;
      }
      // Map headers flexibly (case-insensitive, trimmed)
      const items = json.map(row => {
        const mapped = {};
        Object.keys(row).forEach(key => {
          const k = key.trim().toLowerCase();
          if (k === 'description' || k === 'desc') mapped.d = String(row[key]).trim();
          else if (k === 'unit') mapped.u = String(row[key]).trim();
          else if (k === 'price' || k === 'cost') mapped.p = parseFloat(row[key]) || 0;
          else if (k === 'vendor' || k === 'supplier') mapped.v = String(row[key]).trim();
          else if (k === 'category' || k === 'cat') mapped.c = String(row[key]).trim();
          else if (k === 'project type' || k === 'projecttype' || k === 'project_type' || k === 'type') mapped.pt = String(row[key]).trim();
        });
        return mapped;
      }).filter(it => it.d && it.d.length > 0);

      if (items.length === 0) {
        showToast('No valid items found. Check that the file has a "Description" column.', true);
        return;
      }

      pendingImportItems = items;
      showCatalogImportModal(items);
    } catch (err) {
      showToast('Error reading file: ' + err.message, true);
    }
  };
  reader.readAsArrayBuffer(file);
  // Reset so same file can be re-selected
  e.target.value = '';
}

function showCatalogImportModal(items) {
  $('catalogImportCount').textContent = items.length + ' item' + (items.length !== 1 ? 's' : '') + ' found in file';
  // Reset radio to "add"
  const radios = document.querySelectorAll('input[name="importMode"]');
  radios.forEach(r => { r.checked = r.value === 'add'; });

  // Build preview table (first 5 items)
  const preview = items.slice(0, 5);
  let html = '<table><thead><tr><th>Description</th><th>Unit</th><th>Price</th><th>Vendor</th><th>Category</th><th>Type</th></tr></thead><tbody>';
  preview.forEach(it => {
    html += '<tr><td>' + escHtml(it.d || '') + '</td><td>' + escHtml(it.u || '') + '</td><td>' + money(it.p || 0) + '</td><td>' + escHtml(it.v || '') + '</td><td>' + escHtml(it.c || '') + '</td><td>' + escHtml(it.pt || 'Septic') + '</td></tr>';
  });
  if (items.length > 5) {
    html += '<tr><td colspan="6" style="text-align:center;color:#999;font-style:italic;">...and ' + (items.length - 5) + ' more</td></tr>';
  }
  html += '</tbody></table>';
  $('catalogImportPreview').innerHTML = html;
  $('catalogImportModal').style.display = 'flex';
}

async function confirmCatalogImport() {
  const mode = document.querySelector('input[name="importMode"]:checked')?.value || 'add';
  const items = pendingImportItems;
  if (!items || items.length === 0) return;

  if (mode === 'replace') {
    CATALOG.length = 0;
    items.forEach(it => CATALOG.push(it));
  } else if (mode === 'update') {
    let updated = 0, added = 0;
    items.forEach(it => {
      const match = CATALOG.find(c => c.d && it.d && c.d.trim().toLowerCase() === it.d.trim().toLowerCase());
      if (match) {
        match.u = it.u || match.u;
        match.p = it.p !== undefined ? it.p : match.p;
        match.v = it.v !== undefined ? it.v : match.v;
        match.c = it.c || match.c;
        match.pt = it.pt || match.pt;
        updated++;
      } else {
        CATALOG.push(it);
        added++;
      }
    });
  } else {
    items.forEach(it => CATALOG.push(it));
  }

  try {
    await api('saveCatalog', { body: CATALOG });
  } catch (e) {
    showToast('Import saved locally but failed to sync: ' + e.message, true);
  }

  renderSettingsCatalog();
  $('catalogImportModal').style.display = 'none';
  pendingImportItems = [];
  let msg;
  if (mode === 'replace') msg = 'Replaced catalog with ' + items.length + ' item' + (items.length !== 1 ? 's' : '');
  else if (mode === 'update') msg = 'Updated ' + items.length + ' item' + (items.length !== 1 ? 's' : '') + ' (matched by description)';
  else msg = 'Added ' + items.length + ' item' + (items.length !== 1 ? 's' : '');
  showToast(msg);
}

// ===== END CATALOG IMPORT / EXPORT =====

// ===== QB CUSTOMER PICKER =====
async function loadQBCustomers() {
  try {
    const data = await supaRead('settings', 'qb-customers.json');
    if (Array.isArray(data)) { qbCustomers = data; console.log('Loaded ' + data.length + ' QB customers'); }
  } catch(e) { console.warn('Could not load QB customers', e); }
}

function initCustomerPicker() {
  const input = $('customerSearch');
  const dropdown = $('customerDropdown');
  if (!input || !dropdown) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 1) { dropdown.style.display = 'none'; return; }
    const matches = qbCustomers.filter(c => {
      return (c.display_name || '').toLowerCase().includes(q) ||
             (c.company_name || '').toLowerCase().includes(q) ||
             (c.contact_name || '').toLowerCase().includes(q) ||
             (c.email || '').toLowerCase().includes(q) ||
             (c.phone || '').includes(q);
    }).slice(0, 15);
    let html = '';
    if (matches.length === 0) {
      html = '<div class="cust-no-results">No customers found for "' + escHtml(input.value) + '"</div>';
    } else {
      matches.forEach((c, i) => {
        const details = [c.company_name, c.phone, c.email].filter(Boolean).join(' · ');
        html += '<div class="cust-item" data-idx="' + i + '">' +
          '<div class="cust-name">' + escHtml(c.display_name || c.company_name || c.contact_name) + '</div>' +
          (details ? '<div class="cust-detail">' + escHtml(details) + '</div>' : '') +
          '</div>';
      });
    }
    html += '<div class="cust-add-new">+ Add New Customer</div>';
    dropdown.innerHTML = html;
    dropdown.style.display = '';

    dropdown.querySelectorAll('.cust-item').forEach((el, i) => {
      el.addEventListener('click', () => {
        const c = matches[i];
        fillCustomerFields(c);
        dropdown.style.display = 'none';
        input.value = '';
      });
    });
    const addBtn = dropdown.querySelector('.cust-add-new');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        $('clientName').value = input.value.trim();
        $('clientName').focus();
        dropdown.style.display = 'none';
        input.value = '';
      });
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#customerSearch') && !e.target.closest('#customerDropdown')) {
      dropdown.style.display = 'none';
    }
  });
}

function fillCustomerFields(c) {
  $('clientName').value = c.display_name || c.company_name || '';
  if ($('clientContact')) $('clientContact').value = c.contact_name || '';
  if ($('clientEmail')) $('clientEmail').value = c.email || '';
  if ($('clientPhone')) $('clientPhone').value = c.phone || '';
  // Fill project address from QB billing address if project address is empty
  if ($('projectAddress') && !$('projectAddress').value.trim()) {
    const parts = [c.address, c.city, c.state, c.zip].filter(Boolean);
    if (parts.length) $('projectAddress').value = parts.join(', ');
  }
  if (currentBid) {
    currentBid.qbCustomerId = c.qb_id;
    scheduleAutoSave();
  }
}

// ===== HUB EMBEDDING (single sign-on from the RDMPE Ops shell) =====
// When Bid Builder is opened inside the unified dashboard's iframe, the parent
// window hands us the already-logged-in user via postMessage instead of
// showing our own PIN screen. Opened standalone (not in an iframe), it falls
// back to the normal PIN login below — unchanged.
let embeddedMode = false;

window.addEventListener('message', (e) => {
  if (e.origin !== window.location.origin) return;
  const data = e.data;
  if (!data || data.source !== 'rdmpe-hub') return;
  if (data.type === 'rdmpe-auth' && data.user) {
    currentUser = { name: data.user.name, role: data.user.role === 'admin' ? 'admin' : 'estimator' };
    pinBuffer = '';
    showDashboard()
      .then(() => {
        if (data.action && data.action.type === 'new-bid') {
          createNewBidWithMode(data.action.mode);
        }
      })
      .catch(err => console.error('Dashboard load error:', err));
  }
});

// Jump straight into a new bid in the requested mode — used by the Hub's
// "New Bid — Simple/Advanced" quick actions.
function createNewBidWithMode(mode) {
  createNewBid();
  currentBid.estimateMode = mode === 'advanced' ? 'advanced' : 'simple';
  openBuilder();
}

async function init() {
  await loadSettings();
  await loadQBCustomers();
  initLogin();
  initEvents();

  if (window.self !== window.top) {
    embeddedMode = true;
    try {
      window.parent.postMessage({ source: 'rdmpe-bid-builder', type: 'ready' }, window.location.origin);
    } catch (e) { /* ignore */ }
    // If the parent hasn't sent auth shortly (e.g. this page was opened
    // directly, not through the Hub), fall back to the normal PIN login.
    setTimeout(() => { if (!currentUser) showScreen('loginScreen'); }, 1500);
  } else {
    showScreen('loginScreen');
  }
}

init();

// ============================================================
// ===== SEPTIC WIZARD =====
// ============================================================
const DEFAULT_WIZARD = {
  laborRatePerHr: 500,
  laborDays: { conventional: 2, sandfilter: 3, atgrade: 3, peat: 2, other: 2 },
  tanks: {
    '3': 'Pella - 1250 Gal Dual Compartment Tank',
    '4': 'Pella - 1500 Gal Dual Compartment Tank',
    '5': 'Pella - 1750 Gal Dual Compartment Tank',
    '6': 'Pella - 2000 Gal Dual Compartment Tank'
  },
  pumpPackage: [
    { d: 'Pella - 1000 Gal Pump Tank', qty: 1, per: 'fixed' },
    { d: 'Liberty 280 with Controls', qty: 1, per: 'fixed' },
    { d: 'Municipal Supply - PSP Patrol', qty: 1, per: 'fixed' }
  ],
  baseItems: [
    { d: 'Pella - 24" x 12" Riser', qty: 2, per: 'fixed' },
    { d: 'Pella - 24" Access Cover', qty: 2, per: 'fixed' },
    { d: 'Pella - Polylok PL-122 Filter', qty: 1, per: 'fixed' }
  ],
  housePipe: '4" X 20\' SCH40 BE PVC PIPE',
  transferPipeGravity: '4" X 20\' SCH40 BE PVC PIPE',
  transferPipePump: '2" X 20\' SCH40 BE PVC PIPE',
  treatment: {
    conventional: { label: 'Conventional (Chambers)', items: [
      { d: 'Pella - 36 Chamber', qty: 100, per: 'br' },
      { d: 'Pella - 36 End Cap', qty: 8, per: 'fixed' },
      { d: 'Indianola - 7 & 9 Hole D-Box', qty: 1, per: 'fixed' }
    ]},
    sandfilter: { label: 'Sand Filter', items: [
      { d: 'Concrete Sand (Legacy)', qty: 15, per: 'br' },
      { d: '1" River Rock (Legacy)', qty: 10, per: 'br' },
      { d: "Municipal Supply - 4' x 360' 3 oz Fabric Roll", qty: 1, per: 'fixed' },
      { d: '4" X 20\' SCH40 BE PVC PIPE', qty: 60, per: 'br' },
      { d: 'Indianola - 7 & 9 Hole D-Box', qty: 1, per: 'fixed' }
    ]},
    atgrade: { label: 'At-Grade', items: [
      { d: 'Pella - 36 Chamber', qty: 75, per: 'br' },
      { d: 'Pella - 36 End Cap', qty: 8, per: 'fixed' },
      { d: 'Tucker Trucking - Fill Sand (Delivered)', qty: 12, per: 'br' },
      { d: 'Indianola - 7 & 9 Hole D-Box', qty: 1, per: 'fixed' }
    ]},
    peat: { label: 'Peat Biofilter', biofilter: 'Pella - Plant Care Biofilter {BR}BR {FLOW}' },
    other: { label: 'Other / Custom', items: [] }
  },
  waterline: { '3/4"': 3.50, '1"': 4.25, '1-1/2"': 5.75, '2"': 7.00 }
};

function wizConfig() {
  const saved = (appSettings || {}).septicWizard;
  if (!saved) return JSON.parse(JSON.stringify(DEFAULT_WIZARD));
  // Deep merge saved over defaults so new keys appear automatically
  const base = JSON.parse(JSON.stringify(DEFAULT_WIZARD));
  return Object.assign(base, saved, {
    tanks: Object.assign({}, base.tanks, saved.tanks || {}),
    laborDays: Object.assign({}, base.laborDays, saved.laborDays || {}),
    waterline: Object.assign({}, base.waterline, saved.waterline || {}),
    treatment: Object.assign({}, base.treatment, saved.treatment || {})
  });
}

function wizFindCat(desc) {
  const t = (desc || '').trim().toLowerCase();
  return CATALOG.find(i => i.d.trim().toLowerCase() === t) || null;
}

function wizMakeItem(desc, qty, opts) {
  opts = opts || {};
  const cat = wizFindCat(desc);
  const sd = getSmartDefaults('catalog');
  return {
    id: uid('item'),
    description: desc,
    qty: Math.max(1, Math.round(qty * 100) / 100),
    unit: cat ? cat.u : (opts.unit || 'EA'),
    unitCost: cat ? cat.p : (opts.price || 0),
    category: cat ? 'catalog' : 'custom',
    markupPct: sd.markupPct, overheadPct: sd.overheadPct, bondPct: sd.bondPct,
    noMarkup: false, taxable: true,
    _missing: !cat && !opts.price
  };
}

// ----- Wizard state machine -----
let wizAnswers = {};
let wizStep = 0;
const WIZ_STEPS = ['bedrooms', 'flow', 'treatment', 'distTank', 'distTreat', 'waterline', 'review'];

function startWizard(preset) {
  wizAnswers = { bedrooms: null, flow: null, treatment: null, distTank: 50, distTreat: 50, waterline: 'no', wlSize: '1"', wlLF: 150 };
  wizStep = 0;
  if (preset) {
    wizAnswers.bedrooms = 4;
    wizAnswers.flow = 'gravity';
    wizAnswers.treatment = preset;
    wizStep = 3; // jump straight to distances
  }
  $('newBidModal').style.display = 'none';
  $('wizardModal').style.display = 'flex';
  renderWizardStep();
}

function wizSet(key, val) { wizAnswers[key] = val; wizNext(); }
function wizNext() { if (wizStep < WIZ_STEPS.length - 1) { wizStep++; renderWizardStep(); } }
function wizBack() {
  if (wizStep === 0) { closeWizard(); return; }
  wizStep--;
  renderWizardStep();
}
function closeWizard() { $('wizardModal').style.display = 'none'; }

function wizReadNum(id, key, def) {
  const v = parseFloat(($(id) || {}).value);
  wizAnswers[key] = (isNaN(v) || v <= 0) ? def : v;
}

function renderWizardStep() {
  const body = $('wizardStepBody');
  const step = WIZ_STEPS[wizStep];
  $('wizardProgressBar').style.width = Math.round((wizStep / (WIZ_STEPS.length - 1)) * 100) + '%';
  const btn = (label, on, sel) => `<button class="wizard-choice ${sel ? 'selected' : ''}" onclick="${on}">${label}</button>`;

  if (step === 'bedrooms') {
    body.innerHTML = `<h3 class="wizard-q">🛏️ How many bedrooms?</h3><div class="wizard-choice-grid">` +
      [3,4,5,6].map(n => btn(n + ' BR', `wizSet('bedrooms',${n})`, wizAnswers.bedrooms === n)).join('') + `</div>`;
  } else if (step === 'flow') {
    body.innerHTML = `<h3 class="wizard-q">⚙️ Pump or gravity?</h3><div class="wizard-choice-grid two">` +
      btn('🌊 Gravity', `wizSet('flow','gravity')`, wizAnswers.flow === 'gravity') +
      btn('⚡ Pump', `wizSet('flow','pump')`, wizAnswers.flow === 'pump') + `</div>`;
  } else if (step === 'treatment') {
    const t = wizConfig().treatment;
    body.innerHTML = `<h3 class="wizard-q">🌱 Treatment system type?</h3><div class="wizard-choice-grid">` +
      Object.keys(t).map(k => btn(t[k].label, `wizSet('treatment','${k}')`, wizAnswers.treatment === k)).join('') + `</div>`;
  } else if (step === 'distTank') {
    body.innerHTML = `<h3 class="wizard-q">📏 House/building to tank — how many feet?</h3>
      <input type="number" id="wizDistTank" class="wizard-num" value="${wizAnswers.distTank}" min="1">
      <button class="btn btn-primary wizard-next" onclick="wizReadNum('wizDistTank','distTank',50); wizNext();">Next →</button>`;
    setTimeout(() => { const el = $('wizDistTank'); if (el) { el.focus(); el.select(); } }, 50);
  } else if (step === 'distTreat') {
    body.innerHTML = `<h3 class="wizard-q">📏 Tank to treatment system — how many feet?</h3>
      <input type="number" id="wizDistTreat" class="wizard-num" value="${wizAnswers.distTreat}" min="1">
      <button class="btn btn-primary wizard-next" onclick="wizReadNum('wizDistTreat','distTreat',50); wizNext();">Next →</button>`;
    setTimeout(() => { const el = $('wizDistTreat'); if (el) { el.focus(); el.select(); } }, 50);
  } else if (step === 'waterline') {
    const wl = wizAnswers.waterline === 'yes';
    const sizes = Object.keys(wizConfig().waterline);
    body.innerHTML = `<h3 class="wizard-q">💧 Include a waterline?</h3><div class="wizard-choice-grid two">` +
      btn('No', `wizAnswers.waterline='no'; wizNext();`, !wl) +
      btn('Yes', `wizAnswers.waterline='yes'; renderWizardStep();`, wl) + `</div>` +
      (wl ? `<div class="wizard-sub">
        <label class="wizard-label">Pipe size</label>
        <div class="wizard-choice-row">` +
          sizes.map(s => btn(s, `wizAnswers.wlSize='${s.replace(/"/g, '\\"')}'; renderWizardStep();`, wizAnswers.wlSize === s)).join('') +
        `</div>
        <label class="wizard-label">Meter pit / well / curb stop to house (feet)</label>
        <input type="number" id="wizWlLF" class="wizard-num" value="${wizAnswers.wlLF}" min="1">
        <button class="btn btn-primary wizard-next" onclick="wizReadNum('wizWlLF','wlLF',150); wizNext();">Next →</button>
      </div>` : '');
  } else if (step === 'review') {
    const built = buildWizardItems(wizAnswers);
    const rows = built.items.map(it =>
      `<tr><td>${escHtml(it.description)}${it._missing ? ' <span class="wiz-warn">⚠ price needed</span>' : ''}</td>
       <td style="text-align:right">${it.qty} ${it.unit}</td>
       <td style="text-align:right">$${(it.qty * it.unitCost).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td></tr>`).join('');
    const matTotal = built.items.reduce((s, it) => s + it.qty * it.unitCost, 0);
    const labTotal = built.laborItems.reduce((s, it) => s + it.hours * it.rate, 0);
    body.innerHTML = `<h3 class="wizard-q">✅ Review your bid</h3>
      <div class="wizard-review-summary">${escHtml(built.summary)}</div>
      <div class="wizard-review-scroll"><table class="wizard-review-table"><tbody>${rows}</tbody></table></div>
      <div class="wizard-review-totals">Materials: <strong>$${matTotal.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}</strong>
        &nbsp;•&nbsp; Labor allowance: <strong>$${labTotal.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2})}</strong>
        <div class="wizard-review-note">Markup &amp; overhead get added per your bid settings. Adjust anything after it builds.</div></div>` +
      (built.warnings.length ? `<div class="wiz-warn-box">${built.warnings.map(w => '⚠ ' + escHtml(w)).join('<br>')}</div>` : '') +
      `<button class="btn btn-primary wizard-build" onclick="finishWizard()">🔨 Build My Bid</button>`;
  }
}

function buildWizardItems(a) {
  const cfg = wizConfig();
  const items = [];
  const warnings = [];
  const br = String(a.bedrooms || 4);
  const addRow = (d, qty, opts) => {
    const it = wizMakeItem(d, qty, opts);
    if (it._missing) warnings.push(`"${d}" not found in catalog — added at $0, set the price.`);
    items.push(it);
  };

  // Tank
  if (cfg.tanks[br]) addRow(cfg.tanks[br], 1);
  // Pump package (peat pump systems use the biofilter's own pump version)
  if (a.flow === 'pump' && a.treatment !== 'peat') cfg.pumpPackage.forEach(r => addRow(r.d, r.qty));
  // Risers / lids / filter
  cfg.baseItems.forEach(r => addRow(r.d, r.per === 'br' ? r.qty * a.bedrooms : r.qty));
  // Pipe runs
  addRow(cfg.housePipe, a.distTank);
  addRow(a.flow === 'pump' ? cfg.transferPipePump : cfg.transferPipeGravity, a.distTreat);
  // Treatment system
  const t = cfg.treatment[a.treatment] || {};
  if (t.biofilter) {
    const d = t.biofilter.replace('{BR}', br).replace('{FLOW}', a.flow === 'pump' ? 'Pump' : 'Gravity');
    addRow(d, 1);
  }
  (t.items || []).forEach(r => addRow(r.d, r.per === 'br' ? r.qty * a.bedrooms : r.qty));
  if (a.treatment === 'other') warnings.push('Treatment type "Other" — add the treatment system items yourself.');
  // Waterline
  if (a.waterline === 'yes') {
    const plf = cfg.waterline[a.wlSize] || 0;
    addRow(`Waterline ${a.wlSize} poly service w/ tracer wire & fittings`, a.wlLF, { unit: 'LF', price: plf });
    warnings.push(`Waterline priced at $${plf}/LF from Wizard Settings — verify before submitting.`);
  }

  // Labor allowance
  const sd = getSmartDefaults('labor');
  const days = (cfg.laborDays[a.treatment] || 2);
  const laborItems = [{
    id: uid('lab'),
    description: `Equipment and Labor — septic install (~${days} day${days > 1 ? 's' : ''})`,
    hours: days * 8,
    rate: cfg.laborRatePerHr || 500,
    markupPct: sd.markupPct, overheadPct: sd.overheadPct, bondPct: sd.bondPct,
    noMarkup: false, lumpSum: true
  }];

  const tLabel = (cfg.treatment[a.treatment] || {}).label || a.treatment;
  let summary = `${br}BR ${tLabel} septic system, ${a.flow}. House→tank ${a.distTank}', tank→treatment ${a.distTreat}'.`;
  if (a.waterline === 'yes') summary += ` Includes ${a.wlLF}' of ${a.wlSize} waterline.`;

  return { items, laborItems, warnings, summary };
}

function finishWizard() {
  const built = buildWizardItems(wizAnswers);
  closeWizard();
  createBidFromTemplate({
    name: 'Septic Wizard',
    description: built.summary,
    items: built.items,
    laborItems: built.laborItems,
    jobType: 'residential'
  });
}

// ----- Waterline add-on (inside builder) -----
function showWaterlineModal() {
  if (!currentBid) return;
  $('waterlineLF').value = '';
  $('waterlineModal').style.display = 'flex';
  setTimeout(() => $('waterlineLF').focus(), 50);
}

function addWaterlineToBid() {
  const lf = parseFloat($('waterlineLF').value);
  if (!lf || lf <= 0) { showToast('Enter the distance in feet', true); return; }
  const sizeBtn = document.querySelector('#waterlineSizeRow .wl-size.selected');
  const size = sizeBtn ? sizeBtn.dataset.size : '1"';
  const plf = wizConfig().waterline[size] || 0;
  const it = wizMakeItem(`Waterline ${size} poly service w/ tracer wire & fittings`, lf, { unit: 'LF', price: plf });
  currentBid.items.push(it);
  $('waterlineModal').style.display = 'none';
  renderItems();
  recalcSummary();
  showToast(`Added ${lf}' of ${size} waterline`);
  scheduleAutoSave();
}

// ----- Wizard Settings panel (admin) -----
function wizRowsHtml(rows, listId) {
  return `<table class="wiz-cfg-table" data-list="${listId}"><thead><tr><th>Item (catalog description)</th><th>Qty</th><th>Per</th><th></th></tr></thead><tbody>` +
    rows.map((r, i) => `<tr>
      <td><input type="text" class="wiz-cfg-d" list="catalogDescList" value="${escHtml(r.d)}"></td>
      <td><input type="number" class="wiz-cfg-q" value="${r.qty}" step="0.1" style="width:70px"></td>
      <td><select class="wiz-cfg-per"><option value="fixed" ${r.per !== 'br' ? 'selected' : ''}>Fixed</option><option value="br" ${r.per === 'br' ? 'selected' : ''}>Per BR</option></select></td>
      <td><button class="btn btn-sm btn-outline" onclick="this.closest('tr').remove()">✕</button></td>
    </tr>`).join('') +
    `</tbody></table><button class="btn btn-sm btn-outline" onclick="wizAddCfgRow('${listId}')">+ Add Row</button>`;
}

function wizAddCfgRow(listId) {
  const tbody = document.querySelector(`.wiz-cfg-table[data-list="${listId}"] tbody`);
  if (!tbody) return;
  const tr = document.createElement('tr');
  tr.innerHTML = `<td><input type="text" class="wiz-cfg-d" list="catalogDescList" value=""></td>
    <td><input type="number" class="wiz-cfg-q" value="1" step="0.1" style="width:70px"></td>
    <td><select class="wiz-cfg-per"><option value="fixed">Fixed</option><option value="br">Per BR</option></select></td>
    <td><button class="btn btn-sm btn-outline" onclick="this.closest('tr').remove()">✕</button></td>`;
  tbody.appendChild(tr);
}

function wizReadRows(listId) {
  return [...document.querySelectorAll(`.wiz-cfg-table[data-list="${listId}"] tbody tr`)].map(tr => ({
    d: tr.querySelector('.wiz-cfg-d').value.trim(),
    qty: parseFloat(tr.querySelector('.wiz-cfg-q').value) || 1,
    per: tr.querySelector('.wiz-cfg-per').value
  })).filter(r => r.d);
}

function renderWizardConfig() {
  const body = $('wizardConfigBody');
  if (!body) return;
  const cfg = wizConfig();
  // Datalist of catalog descriptions for autocomplete
  if (!$('catalogDescList')) {
    const dl = document.createElement('datalist');
    dl.id = 'catalogDescList';
    document.body.appendChild(dl);
  }
  $('catalogDescList').innerHTML = CATALOG.map(i => `<option value="${escHtml(i.d)}">`).join('');

  const tankRow = br => `<div class="form-group"><label>${br} Bedroom tank</label>
    <input type="text" class="wiz-tank" data-br="${br}" list="catalogDescList" value="${escHtml(cfg.tanks[br] || '')}"></div>`;
  const wlRow = s => `<div class="form-group" style="max-width:130px"><label>${escHtml(s)} $/LF</label>
    <input type="number" class="wiz-wl" data-size="${escHtml(s)}" step="0.05" value="${cfg.waterline[s]}"></div>`;
  const dayRow = k => `<div class="form-group" style="max-width:150px"><label>${escHtml((cfg.treatment[k] || {}).label || k)} days</label>
    <input type="number" class="wiz-days" data-sys="${k}" step="0.5" value="${cfg.laborDays[k]}"></div>`;

  body.innerHTML = `
    <h4>Tank by bedroom count</h4><div class="form-row">${['3','4','5','6'].map(tankRow).join('')}</div>
    <h4>Pipes</h4><div class="form-row">
      <div class="form-group"><label>House → tank pipe</label><input type="text" id="wizCfgHousePipe" list="catalogDescList" value="${escHtml(cfg.housePipe)}"></div>
      <div class="form-group"><label>Tank → treatment (gravity)</label><input type="text" id="wizCfgTPG" list="catalogDescList" value="${escHtml(cfg.transferPipeGravity)}"></div>
      <div class="form-group"><label>Tank → treatment (pump)</label><input type="text" id="wizCfgTPP" list="catalogDescList" value="${escHtml(cfg.transferPipePump)}"></div>
    </div>
    <h4>Always included (risers, lids, filter)</h4>${wizRowsHtml(cfg.baseItems, 'baseItems')}
    <h4>Pump package (added when "Pump" chosen, except peat)</h4>${wizRowsHtml(cfg.pumpPackage, 'pumpPackage')}
    <h4>Conventional (Chambers)</h4>${wizRowsHtml(cfg.treatment.conventional.items, 'tConventional')}
    <h4>Sand Filter</h4>${wizRowsHtml(cfg.treatment.sandfilter.items, 'tSandfilter')}
    <h4>At-Grade</h4>${wizRowsHtml(cfg.treatment.atgrade.items, 'tAtgrade')}
    <h4>Peat Biofilter item pattern</h4>
    <div class="form-group"><input type="text" id="wizCfgPeat" value="${escHtml(cfg.treatment.peat.biofilter)}">
    <p class="settings-help">{BR} = bedrooms, {FLOW} = Gravity or Pump. Must match catalog names like "Pella - Plant Care Biofilter 4BR Gravity".</p></div>
    <h4>Waterline price per foot (installed material allowance)</h4><div class="form-row">${Object.keys(cfg.waterline).map(wlRow).join('')}</div>
    <h4>Labor allowance</h4>
    <div class="form-row"><div class="form-group" style="max-width:150px"><label>Crew rate $/hr</label>
      <input type="number" id="wizCfgLaborRate" value="${cfg.laborRatePerHr}" step="5"></div>
      ${Object.keys(cfg.laborDays).map(dayRow).join('')}</div>`;
}

async function saveWizardConfig() {
  const cfg = wizConfig();
  document.querySelectorAll('.wiz-tank').forEach(el => { cfg.tanks[el.dataset.br] = el.value.trim(); });
  cfg.housePipe = $('wizCfgHousePipe').value.trim();
  cfg.transferPipeGravity = $('wizCfgTPG').value.trim();
  cfg.transferPipePump = $('wizCfgTPP').value.trim();
  cfg.baseItems = wizReadRows('baseItems');
  cfg.pumpPackage = wizReadRows('pumpPackage');
  cfg.treatment.conventional.items = wizReadRows('tConventional');
  cfg.treatment.sandfilter.items = wizReadRows('tSandfilter');
  cfg.treatment.atgrade.items = wizReadRows('tAtgrade');
  cfg.treatment.peat.biofilter = $('wizCfgPeat').value.trim();
  document.querySelectorAll('.wiz-wl').forEach(el => { cfg.waterline[el.dataset.size] = parseFloat(el.value) || 0; });
  cfg.laborRatePerHr = parseFloat($('wizCfgLaborRate').value) || 500;
  document.querySelectorAll('.wiz-days').forEach(el => { cfg.laborDays[el.dataset.sys] = parseFloat(el.value) || 2; });
  // Warn on unmatched catalog names
  const unmatched = [];
  Object.values(cfg.tanks).concat([cfg.housePipe, cfg.transferPipeGravity, cfg.transferPipePump]).forEach(d => { if (d && !wizFindCat(d)) unmatched.push(d); });
  cfg.baseItems.concat(cfg.pumpPackage, cfg.treatment.conventional.items, cfg.treatment.sandfilter.items, cfg.treatment.atgrade.items).forEach(r => { if (!wizFindCat(r.d)) unmatched.push(r.d); });
  appSettings.septicWizard = cfg;
  try {
    await api('saveSettings', { body: appSettings });
    showToast(unmatched.length ? `Saved — but ${unmatched.length} item(s) don't match the catalog: ${unmatched.slice(0,2).join(', ')}${unmatched.length > 2 ? '…' : ''}` : 'Wizard settings saved ✓', unmatched.length > 0);
  } catch (e) { showToast('Save failed — try again', true); }
}

function resetWizardConfig() {
  if (!confirm('Reset all wizard settings to defaults?')) return;
  delete appSettings.septicWizard;
  api('saveSettings', { body: appSettings }).catch(() => {});
  renderWizardConfig();
  showToast('Wizard settings reset to defaults');
}

// ----- Wizard event bindings -----
(function initWizardEvents() {
  $('newBidWizard')?.addEventListener('click', () => startWizard(null));
  document.querySelectorAll('.wizard-preset').forEach(b => b.addEventListener('click', () => startWizard(b.dataset.preset)));
  $('wizardBack')?.addEventListener('click', wizBack);
  $('wizardCancel')?.addEventListener('click', closeWizard);
  $('addWaterlineBtn')?.addEventListener('click', showWaterlineModal);
  $('waterlineCancel')?.addEventListener('click', () => { $('waterlineModal').style.display = 'none'; });
  $('waterlineAdd')?.addEventListener('click', addWaterlineToBid);
  document.querySelectorAll('#waterlineSizeRow .wl-size').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('#waterlineSizeRow .wl-size').forEach(x => x.classList.remove('selected'));
    b.classList.add('selected');
  }));
  $('wizardConfigSave')?.addEventListener('click', saveWizardConfig);
  $('wizardConfigReset')?.addEventListener('click', resetWizardConfig);
  document.querySelector('[data-settings-tab="wizard"]')?.addEventListener('click', renderWizardConfig);
})();

// ===== AI BID COPILOT (Tasklet) =====
const COPILOT_WEBHOOK = 'https://webhooks.tasklet.ai/v1/public/webhook/a_k7y547vmdxxrrwbr44xx?token=d6e80140b011b3089a08dc7e94c3da34';
let copilotResult = null, copilotPlanPath = null, copilotFileName = null;

async function copilotUploadFile(file, requestId) {
  const ext = ((file.name || '').split('.').pop() || 'pdf').toLowerCase().replace(/[^a-z0-9]/g, '') || 'pdf';
  const path = 'plans/' + requestId + '.' + ext;
  const resp = await fetch(SUPA_URL + '/storage/v1/object/bids/' + path, {
    method: 'POST',
    headers: { 'apikey': SUPA_KEY, 'Authorization': 'Bearer ' + SUPA_KEY, 'Content-Type': file.type || 'application/pdf', 'x-upsert': 'true' },
    body: file
  });
  if (!resp.ok) throw new Error('Plan upload failed');
  return path;
}

async function copilotSend(payload) {
  await fetch(COPILOT_WEBHOOK, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.assign({ event: 'copilot_request' }, payload))
  });
}

async function copilotPoll(requestId, timeoutMs, intervalMs) {
  timeoutMs = timeoutMs || 360000; intervalMs = intervalMs || 6000;
  const url = SUPA_URL + '/storage/v1/object/public/bids/ai/res-' + requestId + '.json';
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    await new Promise(r => setTimeout(r, intervalMs));
    try {
      const resp = await fetch(url + '?_=' + Date.now());
      if (resp.ok) {
        const t = await resp.text();
        if (t && !t.startsWith('{"statusCode')) return JSON.parse(t);
      }
    } catch (e) { /* keep polling */ }
  }
  return null;
}

function copilotSpinner(msg, sub) {
  return '<div class="copilot-spin-wrap"><div class="copilot-spinner"></div><div class="copilot-spin-msg">' + escHtml(msg) + '</div>' +
    (sub ? '<div class="copilot-spin-sub">' + escHtml(sub) + '</div>' : '') + '</div>';
}

async function copilotAnalyzePlan(file, mode) {
  if (file.size > 25 * 1024 * 1024) { showToast('File too big — keep plans under 25 MB', true); return; }
  const requestId = uid('ai');
  copilotResult = null;
  $('copilotModal').style.display = 'flex';
  $('copilotBody').innerHTML = copilotSpinner('Uploading ' + (file.name || 'plans') + '…');
  try {
    const path = await copilotUploadFile(file, requestId);
    copilotPlanPath = path; copilotFileName = file.name || 'plans.pdf';
    await copilotSend({
      type: 'plan_analysis', requestId: requestId, planFile: path, fileName: copilotFileName,
      user: currentUser ? currentUser.name : '', bidId: (mode === 'attach' && currentBid) ? currentBid.id : null
    });
    $('copilotBody').innerHTML = copilotSpinner('AI is reading your file…', 'Usually takes 1–2 minutes. Grab a coffee ☕');
    const res = await copilotPoll(requestId);
    if (!res) { $('copilotBody').innerHTML = '<div class="wiz-warn-box">⚠ The AI didn\'t answer in time. Your file was saved — try again in a minute.</div>'; return; }
    if (res.status === 'error') { $('copilotBody').innerHTML = '<div class="wiz-warn-box">⚠ ' + escHtml(res.message || 'The AI couldn\'t read that file.') + '</div>'; return; }
    copilotResult = res;
    if (mode === 'attach' && currentBid) {
      currentBid.planFiles = currentBid.planFiles || [];
      currentBid.planFiles.push({ name: copilotFileName, path: path, url: SUPA_URL + '/storage/v1/object/public/bids/' + path, uploadedAt: new Date().toISOString(), analysis: res });
      currentBid.aiAnalysis = res;
      const pb = $('attachPlansBtn'); if (pb) pb.innerHTML = '📄 Files ✓';
      scheduleAutoSave();
    }
    renderCopilotResult(res, mode);
  } catch (e) {
    $('copilotBody').innerHTML = '<div class="wiz-warn-box">⚠ ' + escHtml(e.message || 'Something went wrong.') + '</div>';
  }
}

function renderCopilotResult(res, mode) {
  const ex = res.extracted || {};
  const factLabels = {
    customerName: 'Customer', address: 'Address', county: 'County', parcel: 'Parcel',
    reportNumber: 'Report #', permitNumber: 'Permit #', engineer: 'Engineer',
    systemType: 'System type', bedrooms: 'Bedrooms', designFlowGpd: 'Design flow (GPD)',
    tankSizeGal: 'Septic tank (gal)', pumpTankGal: 'Pump tank (gal)', pumpOrGravity: 'Pump / gravity',
    wellDistanceFt: 'Well distance (ft)', restrictions: 'Restrictions'
  };
  const facts = Object.keys(factLabels)
    .filter(k => ex[k] !== null && ex[k] !== undefined && ex[k] !== '')
    .map(k => '<tr><td class="copilot-fact-k">' + factLabels[k] + '</td><td>' + escHtml(String(ex[k])) + '</td></tr>').join('');
  const list = (arr, cls, icon) => (arr && arr.length)
    ? '<ul class="copilot-list ' + cls + '">' + arr.map(x => '<li>' + icon + ' ' + escHtml(x) + '</li>').join('') + '</ul>' : '';
  $('copilotBody').innerHTML =
    '<div class="wizard-review-summary">📄 ' + escHtml(copilotFileName) + (res.summary ? ' — ' + escHtml(res.summary) : '') + '</div>' +
    (facts ? '<div class="wizard-review-scroll"><table class="copilot-fact-table"><tbody>' + facts + '</tbody></table></div>' : '') +
    list(res.notes, 'copilot-notes', '📌') +
    list(res.questions, 'copilot-questions', '❓') +
    (mode === 'new'
      ? '<button class="btn btn-primary wizard-build" onclick="copilotBuildBid()">✨ Build Bid from These Plans</button>' +
        '<div class="wizard-review-note" style="text-align:center;margin-top:6px;">Builds the items — you review and tweak everything before submitting.</div>'
      : '<div class="copilot-attached">📎 Plans + AI analysis saved with this bid — they follow the job to Field Ops.</div>');
}

function copilotBuildBid() {
  const res = copilotResult; if (!res) return;
  const wa = res.wizardAnswers || {};
  const a = {
    bedrooms: wa.bedrooms || 4,
    flow: wa.flow === 'pump' ? 'pump' : 'gravity',
    treatment: ['atgrade', 'sandfilter', 'conventional', 'peat', 'other'].includes(wa.treatment) ? wa.treatment : 'conventional',
    distTank: wa.distTank || 50, distTreat: wa.distTreat || 50,
    waterline: wa.waterline === 'yes' ? 'yes' : 'no', wlSize: wa.wlSize || '1"', wlLF: wa.wlLF || 150
  };
  const built = buildWizardItems(a);
  $('copilotModal').style.display = 'none';
  createBidFromTemplate({
    name: 'AI Copilot', description: built.summary, items: built.items, laborItems: built.laborItems, jobType: 'residential'
  });
  const ex = res.extracted || {};
  if (ex.customerName) currentBid.clientName = ex.customerName;
  if (ex.address) currentBid.projectAddress = ex.address + (ex.county && !String(ex.address).toLowerCase().includes(String(ex.county).toLowerCase()) ? ' (' + ex.county + ' County)' : '');
  currentBid.planFiles = [{ name: copilotFileName, path: copilotPlanPath, url: SUPA_URL + '/storage/v1/object/public/bids/' + copilotPlanPath, uploadedAt: new Date().toISOString() }];
  currentBid.aiAnalysis = res;
  if (!wa.distTank || !wa.distTreat) currentBid.projectDescription += ' NOTE: pipe distances estimated at 50\' — verify on site.';
  openBuilder();
  scheduleAutoSave();
  showToast('Bid built from plans ✨ Check quantities & distances');
}

// ----- Ask AI (Q&A that stays with the bid) -----
function openAskAi() {
  if (!currentBid) return;
  $('askAiModal').style.display = 'flex';
  renderAskAiLog();
  setTimeout(() => $('askAiInput').focus(), 50);
}

function renderAskAiLog() {
  const log = (currentBid && currentBid.aiLog) || [];
  const el = $('askAiLog');
  el.innerHTML = log.length
    ? log.map(m => '<div class="askai-msg ' + (m.role === 'user' ? 'user' : 'ai') + '">' +
        (m.role === 'user' ? '<strong>' + escHtml(m.name || 'You') + ':</strong> ' : '🤖 ') +
        escHtml(m.text || '').replace(/\n/g, '<br>') + '</div>').join('')
    : '<div class="askai-empty">Ask anything about this bid — quantities, missing items, what the plans say…</div>';
  el.scrollTop = el.scrollHeight;
}

async function sendAskAi() {
  if (!currentBid) return;
  const q = $('askAiInput').value.trim();
  if (!q) return;
  const requestId = uid('ai');
  currentBid.aiLog = currentBid.aiLog || [];
  currentBid.aiLog.push({ role: 'user', name: currentUser.name, text: q, at: new Date().toISOString() });
  $('askAiInput').value = '';
  renderAskAiLog();
  $('askAiLog').insertAdjacentHTML('beforeend', '<div class="askai-msg ai" id="askAiThinking">🤖 <em>Thinking…</em></div>');
  $('askAiLog').scrollTop = $('askAiLog').scrollHeight;
  $('askAiSend').disabled = true;
  try {
    const bidSnap = {
      bidNumber: currentBid.bidNumber, clientName: currentBid.clientName, projectAddress: currentBid.projectAddress,
      projectDescription: currentBid.projectDescription, jobType: currentBid.jobType, estimateMode: currentBid.estimateMode,
      items: (currentBid.items || []).map(i => ({ d: i.description, qty: i.qty, unit: i.unit, unitCost: i.unitCost })),
      laborItems: (currentBid.laborItems || []).map(i => ({ d: i.description, hours: i.hours, rate: i.rate })),
      advancedItems: (currentBid.advancedItems || []).map(i => ({ d: i.description, qty: i.qty })),
      exclusions: currentBid.exclusions, planFiles: currentBid.planFiles || []
    };
    await copilotSend({
      type: 'question', requestId: requestId, question: q, user: currentUser.name,
      bid: bidSnap, analysis: currentBid.aiAnalysis || null, aiLog: currentBid.aiLog.slice(-8)
    });
    const res = await copilotPoll(requestId, 300000, 5000);
    const thinking = $('askAiThinking'); if (thinking) thinking.remove();
    const answer = (res && res.status === 'done' && res.answer) ? res.answer
      : (res && res.message) ? res.message : 'Sorry — no answer came back. Try again in a minute.';
    currentBid.aiLog.push({ role: 'ai', text: answer, at: new Date().toISOString() });
    renderAskAiLog();
    scheduleAutoSave();
  } catch (e) {
    const thinking = $('askAiThinking'); if (thinking) thinking.remove();
    showToast('Ask AI failed — try again', true);
  }
  $('askAiSend').disabled = false;
}

// ----- Copilot event bindings -----
(function initCopilotEvents() {
  $('uploadPlansBtn')?.addEventListener('click', () => $('planFileInput').click());
  $('planFileInput')?.addEventListener('change', e => { const f = e.target.files[0]; if (f) { $('newBidModal').style.display = 'none'; copilotAnalyzePlan(f, 'new'); } e.target.value = ''; });
  $('attachPlansBtn')?.addEventListener('click', openPlansHub);
  $('planFileInput2')?.addEventListener('change', e => { const f = e.target.files[0]; if (f) attachProjectFile(f); e.target.value = ''; });
  $('copilotClose')?.addEventListener('click', () => { $('copilotModal').style.display = 'none'; });
  $('askAiBtn')?.addEventListener('click', openAskAi);
  $('askAiClose')?.addEventListener('click', () => { $('askAiModal').style.display = 'none'; });
  $('askAiSend')?.addEventListener('click', sendAskAi);
  $('askAiInput')?.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAskAi(); } });
})();

// ===== AI BID REVIEW (suggestions + questions on every bid) =====
function aiReviewSnapshot() {
  try { gatherBidData(); } catch (e) { /* read-only view is fine */ }
  const b = currentBid;
  return {
    bidNumber: b.bidNumber, clientName: b.clientName, projectAddress: b.projectAddress,
    projectDescription: b.projectDescription, jobType: b.jobType, estimateMode: b.estimateMode,
    items: (b.items || []).map(i => ({ d: i.description, qty: i.qty, unit: i.unit, unitCost: i.unitCost })),
    laborItems: (b.laborItems || []).map(i => ({ d: i.description, hours: i.hours, rate: i.rate })),
    advancedItems: (b.advancedItems || []).map(i => ({ d: i.description, qty: i.qty, unit: i.unit, alternate: !!i.isAlternate })),
    exclusions: b.exclusions || '', notes: b.customerNotes || '',
    total: (typeof calcBidTotal === 'function') ? calcBidTotal(b) : null,
    planFiles: (b.planFiles || []).map(p => ({ name: p.name, path: p.path }))
  };
}

function aiReviewCatalogList() {
  try { return (CATALOG || []).map(c => ({ n: c.d, u: c.u, p: c.p })); } catch (e) { return []; }
}

function updateAiReviewBadge() {
  const el = $('aiReviewBadge'); if (!el) return;
  const b = currentBid;
  if (b && b.aiReview) {
    const r = b.aiReview;
    const n = ((r.suggestions || []).length) + ((r.questions || []).length) + ((r.flags || []).length);
    el.textContent = n > 0 ? String(n) : '✓';
    el.style.display = 'inline-flex';
    el.className = 'ai-review-badge' + (r.verdict === 'ready' && n === 0 ? ' ok' : '');
  } else if (b && b.aiReviewRequestId) {
    el.textContent = '…'; el.style.display = 'inline-flex'; el.className = 'ai-review-badge';
  } else { el.style.display = 'none'; }
}

async function maybeLoadAiReview() {
  const b = currentBid;
  updateAiReviewBadge();
  if (!b || !b.aiReviewRequestId || b.aiReview) return;
  try {
    const resp = await fetch(SUPA_URL + '/storage/v1/object/public/bids/ai/res-' + b.aiReviewRequestId + '.json?_=' + Date.now());
    if (resp.ok) {
      const t = await resp.text();
      if (t && !t.startsWith('{"statusCode')) {
        const res = JSON.parse(t);
        if (res && res.status === 'done') {
          b.aiReview = res; b.aiReviewRequestId = null;
          api('save', { body: b }).catch(() => {});
          updateAiReviewBadge();
        }
      }
    }
  } catch (e) { /* not ready yet — badge stays "…" */ }
}

async function runAiReview() {
  if (!currentBid) return;
  const requestId = uid('ai');
  $('copilotModal').style.display = 'flex';
  $('copilotBody').innerHTML = copilotSpinner('AI is reviewing your bid…', 'Checking for missing items, quantities, and open questions. Usually 1–2 minutes.');
  try {
    await copilotSend({
      type: 'bid_review', requestId: requestId, user: currentUser ? currentUser.name : '',
      bid: aiReviewSnapshot(), catalog: aiReviewCatalogList(), analysis: currentBid.aiAnalysis || null
    });
    const res = await copilotPoll(requestId, 300000, 5000);
    if (!res) { $('copilotBody').innerHTML = '<div class="wiz-warn-box">⚠ The AI didn\'t answer in time — try again in a minute.</div>'; return; }
    if (res.status === 'error') { $('copilotBody').innerHTML = '<div class="wiz-warn-box">⚠ ' + escHtml(res.message || 'Review failed.') + '</div>'; return; }
    currentBid.aiReview = res; currentBid.aiReviewRequestId = null;
    scheduleAutoSave(); updateAiReviewBadge();
    renderAiReview(res);
  } catch (e) {
    $('copilotBody').innerHTML = '<div class="wiz-warn-box">⚠ ' + escHtml(e.message || 'Something went wrong.') + '</div>';
  }
}

function renderAiReview(res) {
  const canAdd = currentBid && currentBid.estimateMode !== 'advanced';
  const catNames = {}; try { (CATALOG || []).forEach((c, i) => { catNames[String(c.d).toLowerCase().trim()] = i; }); } catch (e) {}
  const verdictHtml = res.verdict === 'ready'
    ? '<div class="ai-verdict ok">✅ ' + escHtml(res.summary || 'This bid looks ready to go.') + '</div>'
    : '<div class="ai-verdict warn">🧐 ' + escHtml(res.summary || 'A few things worth a look before this goes out.') + '</div>';
  let sugHtml = '';
  (res.suggestions || []).forEach((s, i) => {
    const ci = s.catalogItem ? catNames[String(s.catalogItem).toLowerCase().trim()] : undefined;
    const addBtn = (canAdd && ci !== undefined)
      ? '<button class="btn btn-sm btn-primary ai-add-btn" id="aiAdd' + i + '" onclick="aiReviewAddItem(' + i + ',' + ci + ')">+ Add</button>' : '';
    sugHtml += '<div class="ai-sug-row"><span>💡 ' + escHtml(s.text || '') + '</span>' + addBtn + '</div>';
  });
  const list = (arr, icon) => (arr && arr.length)
    ? arr.map(x => '<div class="ai-sug-row"><span>' + icon + ' ' + escHtml(x) + '</span></div>').join('') : '';
  $('copilotBody').innerHTML =
    verdictHtml +
    (sugHtml ? '<div class="ai-review-h">Suggestions</div>' + sugHtml : '') +
    (res.questions && res.questions.length ? '<div class="ai-review-h">Questions to nail down</div>' + list(res.questions, '❓') : '') +
    (res.flags && res.flags.length ? '<div class="ai-review-h">Flags</div>' + list(res.flags, '🚩') : '') +
    '<div class="ai-review-foot"><button class="btn btn-sm btn-outline" onclick="runAiReview()">🔄 Re-run Review</button>' +
    '<span class="ai-review-note">Saved with the bid — Ryan and Field Ops see this too.</span></div>';
  $('copilotModal').style.display = 'flex';
}

function aiReviewAddItem(si, catIdx) {
  const it = (CATALOG || [])[catIdx]; if (!it || !currentBid) return;
  const s = ((currentBid.aiReview || {}).suggestions || [])[si] || {};
  const item = {
    id: uid('item'), description: it.d, qty: Number(s.qty) > 0 ? Number(s.qty) : 1, unit: it.u, unitCost: it.p,
    category: 'catalog',
    markupPct: getSmartDefaults('catalog').markupPct,
    overheadPct: getSmartDefaults('catalog').overheadPct,
    bondPct: getSmartDefaults('catalog').bondPct,
    noMarkup: false, taxable: true
  };
  currentBid.items.push(item);
  renderItems(); recalcSummary(); scheduleAutoSave();
  const btn = $('aiAdd' + si);
  if (btn) { btn.textContent = '✓ Added'; btn.disabled = true; btn.classList.remove('btn-primary'); btn.classList.add('btn-outline'); }
  showToast('Added: ' + it.d);
}

function autoAiReview() {
  const bid = currentBid; if (!bid) return;
  const requestId = uid('ai');
  bid.aiReviewRequestId = requestId; bid.aiReview = null;
  copilotSend({
    type: 'bid_review', requestId: requestId, user: currentUser ? currentUser.name : '',
    bid: aiReviewSnapshot(), catalog: aiReviewCatalogList(), analysis: bid.aiAnalysis || null
  }).then(() => api('save', { body: bid })).catch(() => {});
  updateAiReviewBadge();
  // Attach result in the background if the app stays open
  copilotPoll(requestId, 480000, 10000).then(res => {
    if (res && res.status === 'done' && bid.aiReviewRequestId === requestId) {
      bid.aiReview = res; bid.aiReviewRequestId = null;
      api('save', { body: bid }).catch(() => {});
      if (currentBid && currentBid.id === bid.id) updateAiReviewBadge();
    }
  }).catch(() => {});
}

(function initAiReviewEvents() {
  $('aiReviewBtn')?.addEventListener('click', () => {
    if (currentBid && currentBid.aiReview) renderAiReview(currentBid.aiReview);
    else runAiReview();
  });
})();

// ===== Project Files & AI Notes hub =====
function fileEmoji(name) {
  const n = (name || '').toLowerCase();
  if (/\.(jpg|jpeg|png|gif|heic|webp)$/.test(n)) return '🖼';
  if (/\.(xls|xlsx|csv)$/.test(n)) return '📊';
  if (/\.(doc|docx|txt)$/.test(n)) return '📃';
  return '📄';
}
function renderAnalysisBlock(res) {
  if (!res) return '';
  const ex = res.extracted || {};
  const factRows = Object.keys(ex)
    .filter(k => ex[k] !== null && ex[k] !== undefined && ex[k] !== '' && typeof ex[k] !== 'object')
    .map(k => '<tr><td class="copilot-fact-k">' + escHtml(k.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase())) + '</td><td>' + escHtml(String(ex[k])) + '</td></tr>').join('');
  const list = (arr, cls, icon) => (arr && arr.length)
    ? '<ul class="copilot-list ' + cls + '">' + arr.map(x => '<li>' + icon + ' ' + escHtml(x) + '</li>').join('') + '</ul>' : '';
  return (res.summary ? '<div class="wizard-review-summary">' + escHtml(res.summary) + '</div>' : '') +
    (factRows ? '<div class="wizard-review-scroll"><table class="copilot-fact-table"><tbody>' + factRows + '</tbody></table></div>' : '') +
    list(res.notes, 'copilot-notes', '📌') +
    list(res.questions, 'copilot-questions', '❓');
}
function openPlansHub() {
  const b = currentBid; if (!b) return;
  const files = b.planFiles || [];
  if (!files.length && !b.aiAnalysis) { $('planFileInput2').click(); return; }
  $('copilotModal').style.display = 'flex';
  const anyPerFile = files.some(f => f.analysis);
  const fileRows = files.map(f => {
    const head = '<div class="plans-file-row">' + fileEmoji(f.name) + ' <a href="' + escHtml(f.url) + '" target="_blank" rel="noopener">' + escHtml(f.name || 'File') + '</a>' +
      (f.uploadedAt ? ' <span class="plans-file-date">' + new Date(f.uploadedAt).toLocaleDateString() + '</span>' : '') + '</div>';
    if (!f.analysis) return head;
    return head + '<details class="plans-file-notes"><summary>🤖 AI notes for this file</summary>' + renderAnalysisBlock(f.analysis) + '</details>';
  }).join('');
  // Legacy: old bids stored one analysis on the bid, not per-file
  const legacyHtml = (!anyPerFile && b.aiAnalysis) ? renderAnalysisBlock(b.aiAnalysis) : '';
  $('copilotBody').innerHTML =
    '<div class="plans-hub-head">Saved with this bid — no need to upload again. Everything follows the job to Field Ops.</div>' +
    fileRows + legacyHtml +
    '<button class="btn btn-sm btn-outline" style="margin-top:10px;" onclick="$(\'planFileInput2\').click()">📎 Add Another File</button>';
}

// ----- Attach chooser: AI reads it, or just attach -----
let pendingAttachFile = null;
function attachProjectFile(file) {
  if (file.size > 25 * 1024 * 1024) { showToast('File too big — keep files under 25 MB', true); return; }
  pendingAttachFile = file;
  $('copilotModal').style.display = 'flex';
  $('copilotBody').innerHTML =
    '<div class="wizard-review-summary">' + fileEmoji(file.name) + ' ' + escHtml(file.name || 'File') + '</div>' +
    '<div class="plans-hub-head">What should I do with it?</div>' +
    '<button class="btn btn-primary wizard-build" onclick="attachAndAnalyze()">🤖 AI reads it &amp; saves notes</button>' +
    '<div class="wizard-review-note" style="text-align:center;margin:4px 0 10px;">Plans, specs, addenda, soil reports — takes 1–2 minutes</div>' +
    '<button class="btn btn-outline wizard-build" onclick="attachFileOnly()">📎 Just attach it to the bid</button>';
}
function attachAndAnalyze() {
  const f = pendingAttachFile; pendingAttachFile = null;
  if (f) copilotAnalyzePlan(f, 'attach');
}
async function attachFileOnly() {
  const f = pendingAttachFile; pendingAttachFile = null;
  if (!f || !currentBid) return;
  $('copilotBody').innerHTML = copilotSpinner('Attaching ' + (f.name || 'file') + '…');
  try {
    const requestId = uid('doc');
    const path = await copilotUploadFile(f, requestId);
    currentBid.planFiles = currentBid.planFiles || [];
    currentBid.planFiles.push({ name: f.name || 'file', path: path, url: SUPA_URL + '/storage/v1/object/public/bids/' + path, uploadedAt: new Date().toISOString() });
    const pb = $('attachPlansBtn'); if (pb) pb.innerHTML = '📄 Files ✓';
    scheduleAutoSave();
    showToast('File attached 📎');
    openPlansHub();
  } catch (e) {
    $('copilotBody').innerHTML = '<div class="wiz-warn-box">⚠ ' + escHtml(e.message || 'Upload failed — try again.') + '</div>';
  }
}
