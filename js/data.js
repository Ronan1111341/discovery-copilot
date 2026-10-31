/* The shared sample world. Every name, address, price and figure here is invented. */
(()=>{
const W=window.W={};
W.agency="Harbourline Property";
W.agents=[
 {id:"sam",name:"Sam Whitlock",role:"Director, Sales",patch:"Spring Hill · New Farm · Teneriffe",tiles:[["Pipeline","$7.4m"],["Active clients","5"],["Open homes this week","2"]]},
 {id:"maya",name:"Maya Okafor",role:"Senior Sales Agent",patch:"Kangaroo Point · East Brisbane",tiles:[["Pipeline","$6.1m"],["Active clients","5"],["Open homes this week","2"]]},
 {id:"harriet",name:"Harriet Lowe",role:"Luxury and Auctions",patch:"Ascot · Hamilton · Clayfield",tiles:[["Pipeline","$18.0m"],["Active clients","5"],["Open homes this week","2"]]},
 {id:"luca",name:"Luca Ferretti",role:"Head of Property Management",patch:"Rentals across the portfolio",tiles:[["Rent roll","$2.9m"],["Managed homes","64"],["Inspections this week","3"]]}
];
W.properties=[
 {id:"p1",agent:"sam",addr:"14 Wickham Terrace",sub:"Spring Hill",spec:"3 bed · 2 bath · 1 car",price:"Offers over $1,050,000",value:1050000,status:"For sale",art:"tower",seed:11},
 {id:"p2",agent:"sam",addr:"7 Banks Street",sub:"Teneriffe",spec:"2 bed · 2 bath · 1 car",price:"Auction, Saturday",value:1300000,status:"Auction",art:"tower",seed:23},
 {id:"p3",agent:"maya",addr:"31 Cairns Street",sub:"Kangaroo Point",spec:"4 bed · 3 bath · 2 car",price:"Guide $1,650,000",value:1650000,status:"For sale",art:"house",seed:37},
 {id:"p4",agent:"maya",addr:"9 Lytton Road",sub:"East Brisbane",spec:"3 bed · 2 bath · 1 car",price:"Under offer",value:1480000,status:"Under offer",art:"terrace",seed:41},
 {id:"p5",agent:"harriet",addr:"52 Hargreaves Avenue",sub:"Ascot",spec:"5 bed · 4 bath · 3 car",price:"$6,200,000",value:6200000,status:"For sale",art:"house",seed:53},
 {id:"p6",agent:"harriet",addr:"18 Windermere Road",sub:"Hamilton",spec:"6 bed · 5 bath · 4 car",price:"By negotiation, $8.5m",value:8500000,status:"For sale",art:"house",seed:67},
 {id:"p7",agent:"harriet",addr:"3 Eldon Place",sub:"Clayfield",spec:"4 bed · 3 bath · 2 car",price:"Auction, Sunday",value:3250000,status:"Auction",art:"terrace",seed:71},
 {id:"p8",agent:"sam",addr:"22 Dunmore Terrace",sub:"Auchenflower",spec:"4 bed · 2 bath · 2 car",price:"Appraisal pending",value:1900000,status:"Appraisal",art:"terrace",seed:83}
];
W.openHomes=[
 {id:"o1",prop:"p1",agent:"sam",when:"Saturday",time:"10:00 am",rsvps:6},
 {id:"o2",prop:"p2",agent:"sam",when:"Saturday",time:"11:30 am",rsvps:9},
 {id:"o3",prop:"p3",agent:"maya",when:"Saturday",time:"10:00 am",rsvps:7},
 {id:"o4",prop:"p4",agent:"maya",when:"Sunday",time:"1:00 pm",rsvps:4},
 {id:"o5",prop:"p5",agent:"harriet",when:"Saturday",time:"12:00 pm",rsvps:5},
 {id:"o6",prop:"p7",agent:"harriet",when:"Sunday",time:"11:00 am",rsvps:11}
];
W.tasks=[
 {id:"t1",agent:"sam",text:"Confirm Saturday inspection with the Nguyens",who:"Jess & Tom Nguyen",kind:"email",mins:15,value:1050000},
 {id:"t2",agent:"sam",text:"Counter-offer call, 7 Banks Street buyer",who:"Banks St buyer",kind:"call",mins:20,value:1300000},
 {id:"t3",agent:"sam",text:"Book the appraisal at 22 Dunmore Terrace",who:"Priya Raman",kind:"call",mins:15,value:1900000},
 {id:"t4",agent:"sam",text:"Send the strata report to Dev Patel",who:"Dev Patel",kind:"email",mins:10,value:780000},
 {id:"t5",agent:"sam",text:"Approve the twilight photo set, Wickham Terrace",who:"Pixel & Frame",kind:"paperwork",mins:15,value:0},
 {id:"t6",agent:"sam",text:"Update notes from Tuesday’s inspections",who:"CRM",kind:"paperwork",mins:30,value:0},
 {id:"t7",agent:"maya",text:"Present the offer to the vendor, 9 Lytton Road",who:"Tess Williams",kind:"call",mins:30,value:1480000},
 {id:"t8",agent:"maya",text:"Follow up four open-home attendees, Cairns St",who:"Attendees",kind:"email",mins:25,value:1650000},
 {id:"t9",agent:"maya",text:"Price review call, Mowbray Terrace unit",who:"Greg O’Neill",kind:"call",mins:20,value:890000},
 {id:"t10",agent:"maya",text:"Prepare the vendor report, 31 Cairns Street",who:"Report",kind:"paperwork",mins:30,value:0},
 {id:"t11",agent:"harriet",text:"Meet the Whitmores to set the Hamilton strategy",who:"Charles & Beatrice Whitmore",kind:"inspection",mins:60,value:8500000},
 {id:"t12",agent:"harriet",text:"Private inspection, Ascot, with the Haddads",who:"The Haddad family",kind:"inspection",mins:60,value:6200000},
 {id:"t13",agent:"harriet",text:"Check auction registrations, Clayfield (3 bidders)",who:"Registrations",kind:"paperwork",mins:20,value:3250000},
 {id:"t14",agent:"harriet",text:"Reply to Olivia Grant about the Eldon Place guide",who:"Olivia Grant",kind:"email",mins:15,value:3250000},
 {id:"t15",agent:"luca",text:"Hot water failure, 12/45 Oxlade Drive: arrange a plumber",who:"Tenant request",kind:"call",mins:20,value:40000},
 {id:"t16",agent:"luca",text:"Approve the lease renewal, 6/18 Merthyr Road",who:"Harold Davies",kind:"paperwork",mins:15,value:41000},
 {id:"t17",agent:"luca",text:"Rent arrears call, 7/9 Moray Street",who:"Tenant",kind:"call",mins:20,value:30000},
 {id:"t18",agent:"luca",text:"Routine inspection, 2/31 Vulture Street",who:"Inspection",kind:"inspection",mins:45,value:35000}
].map(t=>({...t,done:false}));
W.clients=[
 {id:"c1",agent:"sam",name:"Jess & Tom Nguyen",kind:"Buyer",status:"Active buyer",next:"Inspect Wickham Terrace",last:"Today"},
 {id:"c2",agent:"sam",name:"Priya Raman",kind:"Seller",status:"Appraisal",next:"Book appraisal",last:"Today"},
 {id:"c3",agent:"sam",name:"Dev Patel",kind:"Buyer",status:"Researching",next:"Send strata report",last:"Sat"},
 {id:"c4",agent:"sam",name:"Chloe Martin",kind:"Investor",status:"Warm",next:"Send yield summary",last:"Mon"},
 {id:"c5",agent:"sam",name:"Anh Tran",kind:"Past client",status:"Nurture",next:"Catch-up call",last:"Last week"},
 {id:"c6",agent:"maya",name:"Ben & Alice Cho",kind:"Buyer",status:"Active buyer",next:"Cairns St follow-up",last:"Yesterday"},
 {id:"c7",agent:"maya",name:"Tess Williams",kind:"Vendor",status:"Under offer",next:"Present offer",last:"Today"},
 {id:"c8",agent:"maya",name:"Rohan Mehta",kind:"Investor",status:"Warm",next:"Send yields",last:"Tue"},
 {id:"c9",agent:"maya",name:"Greg O’Neill",kind:"Vendor",status:"Price review",next:"Review call",last:"Mon"},
 {id:"c10",agent:"maya",name:"Mia Rossi",kind:"Buyer",status:"First home",next:"Pre-approval check",last:"Last week"},
 {id:"c11",agent:"harriet",name:"The Haddad family",kind:"Buyer",status:"Active buyer",next:"Private inspection",last:"Today"},
 {id:"c12",agent:"harriet",name:"Charles & Beatrice Whitmore",kind:"Vendor",status:"Strategy",next:"Strategy meeting",last:"Yesterday"},
 {id:"c13",agent:"harriet",name:"Olivia Grant",kind:"Buyer",status:"Warm",next:"Eldon Place guide",last:"Today"},
 {id:"c14",agent:"harriet",name:"Julian Park",kind:"Investor",status:"Watching",next:"Off-market brief",last:"Last week"},
 {id:"c15",agent:"harriet",name:"Dr Samir Rahman",kind:"Vendor",status:"Listed",next:"Weekly report",last:"Fri"},
 {id:"c16",agent:"luca",name:"Marlow Holdings",kind:"Landlord",status:"12 properties",next:"Quarterly review",last:"Mon"},
 {id:"c17",agent:"luca",name:"Mr & Mrs Bianchi",kind:"Landlord",status:"2 properties",next:"Rent review",last:"Today"},
 {id:"c18",agent:"luca",name:"Harold Davies",kind:"Tenant",status:"Renewing",next:"Lease renewal",last:"Yesterday"},
 {id:"c19",agent:"luca",name:"Priyanka Shah",kind:"Landlord",status:"1 property",next:"Annual statement",last:"Last week"},
 {id:"c20",agent:"luca",name:"Evergreen Trust",kind:"Landlord",status:"8 properties",next:"Maintenance plan",last:"Tue"}
];
W.sales=[
 {agent:"sam",addr:"28 Moray Street, New Farm",price:"$1,720,000",dom:19,when:"Last month"},
 {agent:"sam",addr:"Unit 9/60 Hawthorne Road",price:"$985,000",dom:26,when:"Aug"},
 {agent:"maya",addr:"Unit 20/11 Mowbray Terrace",price:"$890,000",dom:14,when:"Last month"},
 {agent:"maya",addr:"44 Stratton Street, East Brisbane",price:"$1,360,000",dom:22,when:"Aug"},
 {agent:"harriet",addr:"5 Ivory Lane, Ascot",price:"$4,900,000",dom:31,when:"Last month"},
 {agent:"harriet",addr:"12 Cavendish Road, Clayfield",price:"$2,400,000",dom:22,when:"Sep"},
 {agent:"luca",addr:"Rentals: 9 new leases this month",price:"Avg 6 days vacant",dom:0,when:"This month"}
];
W.agent=id=>W.agents.find(a=>a.id===id);
W.prop=id=>W.properties.find(p=>p.id===id);
})();
