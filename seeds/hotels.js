const hotels = [

  /* ===== NILGIRIS ===== */
  {
    name: "Sterling Ooty Fern Hill",
    district: "Nilgiris", state: "Tamil Nadu",
    location: { address: "Fern Hill Road, Ooty, Tamil Nadu 643004", coordinates: { type: "Point", coordinates: [76.6950, 11.4102] } },
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/7a/42/6f/a-stunning-aerial-view.jpg?h=500&s=1&w=900",
    description: "Heritage property with panoramic Nilgiri views, close to Doddabetta Peak.",
    contact: { phone: 4232244100, alternatePhone: 9876543210, website: "https://www.sterlingholidays.com" },
    pricerange: 4500, rating: 4.3, aminities: ["WiFi", "Restaurant", "Room Service", "Parking", "Garden"], bookingAvailable: true
  },
  {
    name: "Jungle Retreat Masinagudi",
    district: "Nilgiris", state: "Tamil Nadu",
    location: { address: "Bokkapuram Road, Masinagudi, Tamil Nadu 643223", coordinates: { type: "Point", coordinates: [76.6370, 11.5690] } },
    image: "https://www.junglehut.in/images/home_banner.jpg",
    description: "Eco-resort near Mudumalai buffer, ideal for Mukkurthi and Emerald Lake treks.",
    contact: { phone: 4232526469, website: "https://www.jungleretreat.com" },
    pricerange: 7200, rating: 4.6,
    aminities: ["Restaurant", "Nature Walks", "Wildlife Safari", "Bonfire, Parking"], bookingAvailable: true
  },
  {
    name: "Kotagiri Valley View Homestay",
    district: "Nilgiris", state: "Tamil Nadu",
    location: { address: "Catherine Falls Road, Kotagiri, Tamil Nadu 643217", coordinates: { type: "Point", coordinates: [76.8900, 11.4500] } },
    image: "https://gos3.ibcdn.com/1b8f3b2a88ac11eb99820242ac110002.jpg",
    description: "Budget homestay with direct access to Catherine Falls and Elk Falls trails.",
    contact: { phone: 9994441122 },
    pricerange: 1000, rating: 4.1,
    aminities: ["Home Cooked Meals", "Trek Guide", "Parking"], bookingAvailable: false
  },

  /* ===== COIMBATORE ===== */
  {
    name: "The Residency Coimbatore",
    district: "Coimbatore", state: "Tamil Nadu",
    location: { address: "1076 Avinashi Road, Coimbatore, Tamil Nadu 641018", coordinates: { type: "Point", coordinates: [76.9558, 11.0168] } },
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/145258867.jpg?k=9b86b3f9e3e005964d0a89418b1fa8d649ff57bdedb8837174e4406fb11c29f1&o=",
    description: "City hotel with easy access to Velliangiri Hills and Siruvani trailheads.",
    contact: { phone: 4224444444, alternatePhone: 9994445555, website: "https://www.theresidency.com" },
    pricerange: 3200, rating: 4.1,
    aminities: ["WiFi", "Pool", "Restaurant", "Bar", "Gym", "Parking"], bookingAvailable: true
  },
  {
    name: "Topslip Forest Guesthouse",
    district: "Coimbatore", state: "Tamil Nadu",
    location: { address: "Anamalai Tiger Reserve, Topslip, Tamil Nadu 642126", coordinates: { type: "Point", coordinates: [76.8760, 10.3080] } },
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/d8/2b/d4/getlstd-property-photo.jpg?h=-1&s=1&w=1200",
    description: "Forest department guesthouse inside Anamalai Tiger Reserve, adjacent to Topslip trek.",
    contact: { phone: 4253244000 },
    pricerange: 1200, rating: 3.8,
    aminities: ["Basic Meals", "Parking", "Nature Guide"], bookingAvailable: false
  },
  {
    name: "Valparai Misty Heights Resort",
    district: "Coimbatore", state: "Tamil Nadu",
    location: { address: "Tea Estate Road, Valparai, Tamil Nadu 642127", coordinates: { type: "Point", coordinates: [76.9510, 10.3260] } },
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/3d/a6/af/exterior-view-of-property.jpg?h=-1&s=1&w=1200",
    description: "Tea estate resort with Valparai Grass Hills and Topslip trek access.",
    contact: { phone: 4253252100, website: "https://www.valpairairesort.com" },
    pricerange: 4800, rating: 4.4,
    aminities: ["WiFi", "Restaurant", "Tea Factory Tour", "Parking", "Bonfire"], bookingAvailable: true
  },

  /* ===== DINDIGUL ===== */
  {
    name: "Club Mahindra Kodaikanal",
    district: "Dindigul", state: "Tamil Nadu",
    location: { address: "Coaker's Walk Road, Kodaikanal, Tamil Nadu 624101", coordinates: { type: "Point", coordinates: [77.4890, 10.2350] } },
    image: "https://pix10.agoda.net/hotelImages/621/621493/621493_16071511310044702742.jpg?ca=6&ce=1&s=1024x768",
    description: "Resort close to Pillar Rocks, Dolphins Nose and Vattakanal trek routes.",
    contact: { phone: 4542241180, website: "https://www.clubmahindra.com" },
    pricerange: 5800, rating: 4.4,
    aminities: ["WiFi", "Restaurant", "Children's Play Area", "Bonfire", "Parking"], bookingAvailable: true
  },
  {
    name: "Rajan's Homestay Vattakanal",
    district: "Dindigul", state: "Tamil Nadu",
    location: { address: "Vattakanal Village, Kodaikanal, Tamil Nadu 624101", coordinates: { type: "Point", coordinates: [77.4870, 10.2240] } },
    image: "https://pix10.agoda.net/hotelImages/58939895/0/f77e7fdde1d5d9db499c3c701c4c6dd0.jpg?ce=2&s=702x392",
    description: "Budget homestay at Vattakanal, walking distance to forest trail and Berijam Lake road.",
    contact: { phone: 9842100234 },
    pricerange: 900, rating: 4.2,
    aminities: ["Home Cooked Meals", "Bonfire", "Trek Guide on Request"], bookingAvailable: false
  },
  {
    name: "Kodaikanal Resort (TTDC)",
    district: "Dindigul", state: "Tamil Nadu",
    location: { address: "Lake Road, Kodaikanal, Tamil Nadu 624101", coordinates: { type: "Point", coordinates: [77.4920, 10.2390] } },
    image: "https://media-cdn.tripadvisor.com/media/photo-s/21/46/34/9d/exterior.jpg",
    description: "Tamil Nadu Tourism resort near Kodai Lake, central access to all Kodaikanal treks.",
    contact: { phone: 4542241336, website: "https://www.ttdconline.com" },
    pricerange: 2200, rating: 3.7,
    aminities: ["Restaurant", "Parking", "24hr Reception", "Garden"], bookingAvailable: true
  },

  /* ===== SALEM ===== */
  {
    name: "Hotel Shevaroys Yercaud",
    district: "Salem", state: "Tamil Nadu",
    location: { address: "Shevaroy Temple Road, Yercaud, Tamil Nadu 636601", coordinates: { type: "Point", coordinates: [78.2100, 11.8080] } },
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/6a/3e/34/hotel-shevaroys.jpg?h=-1&s=1&w=500",
    description: "Mid-range hotel near Pagoda Point and Kiliyur Falls trailheads.",
    contact: { phone: 4281222300, website: "https://www.hotelshevaroys.com" },
    pricerange: 2200, rating: 3.9,
    aminities: ["WiFi", "Restaurant", "Room Service", "Parking"], bookingAvailable: true
  },
  {
    name: "GRT Grand Salem",
    district: "Salem", state: "Tamil Nadu",
    location: { address: "Saradha College Road, Salem, Tamil Nadu 636007", coordinates: { type: "Point", coordinates: [78.1200, 11.6700] } },
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/4f/65/0d/caption.jpg?h=-1&s=1&w=1200",
    description: "City business hotel, good base for Nagaramalai and Kanjamalai hill treks.",
    contact: { phone: 4272267777, website: "https://www.grthotels.com" },
    pricerange: 3500, rating: 4.2,
    aminities: ["WiFi", "Pool", "Restaurant", "Bar", "Gym", "Parking"], bookingAvailable: true
  },

  /* ===== TIRUNELVELI ===== */
  {
    name: "Hotel Ahila Courtallam",
    district: "Tirunelveli", state: "Tamil Nadu",
    location: { address: "Main Falls Road, Courtallam, Tamil Nadu 627802", coordinates: { type: "Point", coordinates: [77.2760, 8.9310] } },
    image: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201811301215065004-e3647196f31811e884470242ac110003.jpg?downsize=328%3A180&output-format=jpg&output-quality=75",
    description: "Budget hotel near Courtallam waterfalls and Papanasam hills trail access.",
    contact: { phone: 4633280123, alternatePhone: 9944112233 },
    pricerange: 1400, rating: 3.5,
    aminities: ["Restaurant", "Parking", "24hr Reception"], bookingAvailable: false
  },
  {
    name: "Mundanthurai Tiger Camp",
    district: "Tirunelveli", state: "Tamil Nadu",
    location: { address: "Kalakkad Mundanthurai Tiger Reserve, Papanasam, Tamil Nadu 627425", coordinates: { type: "Point", coordinates: [77.3650, 8.5600] } },
    image: "https://www.tataneu.com/pages/travel/_next/image?q=75&url=https%3A%2F%2Fd1msew97rp2nin.cloudfront.net%2Fprodin%2Ftntravel%2Fctaimages%2Fe4e1ef21-376c-4674-8f6c-5a9990d56d96.jpeg&w=3840",
    description: "Forest camp inside KMTR, direct access to Mundanthurai and Kalakkad trek routes.",
    contact: { phone: 4632250111 },
    pricerange: 2800, rating: 4.3,
    aminities: ["Forest Meals", "Guide", "Safari", "Parking"], bookingAvailable: true
  },
  {
    name: "Tirunelveli TTDC Hotel",
    district: "Tirunelveli", state: "Tamil Nadu",
    location: { address: "Palayamkottai Road, Tirunelveli, Tamil Nadu 627002", coordinates: { type: "Point", coordinates: [77.4120, 8.7270] } },
    image: "https://ttdconline.com/assets/img/hotel/mamallapuram/rooms/psr/01.png",
    description: "Budget government hotel, base for Manimuthar, Papanasam and Agasthiyar trek access.",
    contact: { phone: 4622334455, website: "https://www.ttdconline.com" },
    pricerange: 1100, rating: 3.4,
    aminities: ["Restaurant", "Parking", "24hr Reception"], bookingAvailable: true
  },

  /* ===== NAMAKKAL ===== */
  {
    name: "Kolli Hills Nature Stay",
    district: "Namakkal", state: "Tamil Nadu",
    location: { address: "Semmedu Road, Kollimalai, Tamil Nadu 637411", coordinates: { type: "Point", coordinates: [78.3380, 11.2800] } },
    image: "https://q-xx.bstatic.com/xdata/images/hotel/840x460/787046561.jpg?k=e1f0353847ba76307abc1bc0f79bc1f779b8092517fd7a914f465b074d49543f&o=",
    description: "Quiet hillside guesthouse 5 min walk from Agaya Gangai Falls trailhead.",
    contact: { phone: 9787654321 },
    pricerange: 1100, rating: 4.0,
    aminities: ["Home Cooked Meals", "Parking", "Bonfire"], bookingAvailable: false
  },
  {
    name: "Kolli Eco Lodge",
    district: "Namakkal", state: "Tamil Nadu",
    location: { address: "Arapaleeswarar Temple Road, Kollimalai, Tamil Nadu 637411", coordinates: { type: "Point", coordinates: [78.3400, 11.2780] } },
    image: "https://pix10.agoda.net/hotelImages/38132797/-1/fccdf7cff305137a5ac693af617c3beb.jpg?ce=0&s=702x392",
    description: "Eco lodge near Seekuparai viewpoint, ideal for Arapaleeswarar temple trail.",
    contact: { phone: 9843210987 },
    pricerange: 1400, rating: 4.1,
    aminities: ["Meals", "Trek Guide", "Organic Farm", "Parking"], bookingAvailable: true
  },

  /* ===== KRISHNAGIRI ===== */
  {
    name: "Melagiri Forest Homestay",
    district: "Krishnagiri", state: "Tamil Nadu",
    location: { address: "Denkanikottai Road, Krishnagiri, Tamil Nadu 635107", coordinates: { type: "Point", coordinates: [77.7800, 12.5400] } },
    image: "https://a0.muscache.com/im/pictures/hosting/Hosting-1313836680761489731/original/1f157277-cfd7-4211-8853-2d97dda6d551.jpeg",
    description: "Small homestay near Melagiri elephant corridor, base for Melagiri Hills trek.",
    contact: { phone: 9791234560 },
    pricerange: 1200, rating: 3.9,
    aminities: ["Home Cooked Meals", "Parking", "Trek Guide"], bookingAvailable: false
  },
  {
    name: "Hotel Mayflower Krishnagiri",
    district: "Krishnagiri", state: "Tamil Nadu",
    location: { address: "NH 44, Krishnagiri, Tamil Nadu 635001", coordinates: { type: "Point", coordinates: [78.2140, 12.5260] } },
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/15/29/cc/in-room-decoration.jpg?h=-1&s=1&w=700",
    description: "Highway hotel convenient for Melagiri Hills and Hogenakkal day trips.",
    contact: { phone: 4343231000, alternatePhone: 9994443333, website: "https://www.hotelmayflower.in" },
    pricerange: 1800, rating: 3.6,
    aminities: ["WiFi", "Restaurant", "Parking"], bookingAvailable: true
  },

  /* ===== DHARMAPURI ===== */
  {
    name: "Hogenakkal Falls View Resort",
    district: "Dharmapuri", state: "Tamil Nadu",
    location: { address: "Hogenakkal Road, Dharmapuri, Tamil Nadu 636807", coordinates: { type: "Point", coordinates: [77.7740, 12.1140] } },
    image: "https://pix6.agoda.net/hotelImages/35353580/0/974ddc522ca67b67d8e34e6817e99591.jpg?ce=0&s=1024x768",
    description: "Resort right at the Hogenakkal falls entrance, with coracle boating packages.",
    contact: { phone: 9843220011 },
    pricerange: 2500, rating: 4.2,
    aminities: ["Restaurant", "Boating Packages", "Parking", "24hr Reception"], bookingAvailable: true
  },
  {
    name: "TTDC Hogenakkal Tourist Home",
    district: "Dharmapuri", state: "Tamil Nadu",
    location: { address: "Hogenakkal, Dharmapuri, Tamil Nadu 636807", coordinates: { type: "Point", coordinates: [77.7760, 12.1160] } },
    image: "https://content.jdmagicbox.com/v2/comp/kanyakumari/g9/9999p4653.4653.231025091731.i5g9/catalogue/ttdc-hotel-tamil-nadu-new-road-kanyakumari-hotels-1sFVfIdLtH.jpg",
    description: "Government tourist home at Hogenakkal, budget option for falls and coracle trips.",
    contact: { phone: 4342244234, website: "https://www.ttdconline.com" },
    pricerange: 900, rating: 3.3,
    aminities: ["Basic Meals", "Parking"], bookingAvailable: true
  },

  /* ===== MADURAI ===== */
  {
    name: "Heritage Madurai",
    district: "Madurai", state: "Tamil Nadu",
    location: { address: "11 Melakkal Main Road, Kochadai, Madurai, Tamil Nadu 625016", coordinates: { type: "Point", coordinates: [78.0950, 9.9252] } },
    image: "https://lh3.googleusercontent.com/p/AF1QipPKK1a6cRLzxyO2MBqybA3fHbX6DpSvb5hlkk8n=w243-h174-n-k-no-nu",
    description: "Boutique heritage hotel, good base for Samanar Hills and Arittapatti day treks.",
    contact: { phone: 4522386100, website: "https://www.heritagemadurai.com" },
    pricerange: 5500, rating: 4.5,
    aminities: ["WiFi", "Pool", "Restaurant", "Spa", "Parking"], bookingAvailable: true
  },
  {
    name: "Arittapatti Eco Homestay",
    district: "Madurai", state: "Tamil Nadu",
    location: { address: "Arittapatti Village, Melur Taluk, Madurai, Tamil Nadu 625106", coordinates: { type: "Point", coordinates: [78.1660, 10.0290] } },
    image: "https://content.jdmagicbox.com/comp/madurai/z1/0452px452.x452.180118210903.p6z1/catalogue/fern-hill-mango-plantation-madurai-farm-house-on-hire-3rhqnkwgrb.jpg",
    description: "Village homestay at the foot of Arittapatti granite hills, farm-to-table meals.",
    contact: { phone: 9787001122 },
    pricerange: 1000, rating: 4.3,
    aminities: ["Organic Farm Meals", "Trek Guide", "Parking"], bookingAvailable: false
  },

  /* ===== THENI ===== */
  {
    name: "Meghamalai Highlands Resort",
    district: "Theni", state: "Tamil Nadu",
    location: { address: "Meghamalai, Bodinayakanur, Tamil Nadu 625582", coordinates: { type: "Point", coordinates: [77.3250, 9.6800] } },
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/10/e2/32/briar-tea-bungalows-megamalai.jpg?h=-1&s=1&w=900",
    description: "Luxury tea-estate resort with guided Meghamalai and Kolukkumalai trek packages.",
    contact: { phone: 4562210000, website: "https://www.meghamalairesort.com" },
    pricerange: 6500, rating: 4.7,
    aminities: ["WiFi", "Restaurant", "Tea Estate Tour", "Trek Guide", "Parking"], bookingAvailable: true
  },
  {
    name: "Suruli Falls Tourist Bungalow",
    district: "Theni", state: "Tamil Nadu",
    location: { address: "Suruli Falls Road, Cumbum, Tamil Nadu 625516", coordinates: { type: "Point", coordinates: [77.2640, 9.6710] } },
    image: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/202108261833334775-5605620a2b2e11ec90990a58a9feac02.jpg",
    description: "TTDC bungalow near Suruli Falls forest trail, affordable base in Cumbum valley.",
    contact: { phone: 4546252100, website: "https://www.ttdconline.com" },
    pricerange: 1000, rating: 3.6,
    aminities: ["Restaurant", "Parking", "Basic Amenities"], bookingAvailable: true
  },

  /* ===== IDUKKI (Kerala) ===== */
  {
    name: "Spice Tree Munnar",
    district: "Idukki", state: "Kerala",
    location: { address: "Murugali Estate, Munnar, Kerala 685612", coordinates: { type: "Point", coordinates: [77.0620, 10.0880] } },
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/c4/06/a6/the-mountainview-retreat.jpg?h=500&s=1&w=900",
    description: "Boutique hillside resort with Meesapulimala and Anamudi trek access packages.",
    contact: { phone: 4865232777, website: "https://www.thespicetree.com" },
    pricerange: 9500, rating: 4.8,
    aminities: ["WiFi", "Infinity Pool", "Restaurant", "Trek Packages", "Spa", "Parking"], bookingAvailable: true
  },
  {
    name: "Vagamon Pine Castle",
    district: "Idukki", state: "Kerala",
    location: { address: "Pine Forest Road, Vagamon, Kerala 685503", coordinates: { type: "Point", coordinates: [76.9030, 9.6850] } },
    image: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201910311624465648-72ca96fa4bd111ea950a0242ac110002.jpg",
    description: "Resort inside Vagamon pine forest, easy access to Kurishumala and Thangalpara treks.",
    contact: { phone: 4829262188, website: "https://www.vagamonpinecastle.com" },
    pricerange: 3800, rating: 4.3,
    aminities: ["WiFi", "Restaurant", "Bonfire", "Paragliding Packages", "Parking"], bookingAvailable: true
  },
  {
    name: "Periyar Eco Lodge",
    district: "Idukki", state: "Kerala",
    location: { address: "Lake Road, Thekkady, Kerala 685536", coordinates: { type: "Point", coordinates: [77.1810, 9.4680] } },
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/8e/08/4f/hotel.jpg?w=1200&h=-1&s=1",
    description: "Forest lodge at Periyar Tiger Reserve entrance, offers boat safaris and bamboo rafting.",
    contact: { phone: 4869224571, website: "https://www.periyarecolodge.com" },
    pricerange: 4200, rating: 4.5,
    aminities: ["Restaurant", "Boat Safari", "Forest Trek", "Guide", "Parking"], bookingAvailable: true
  },

  /* ===== WAYANAD (Kerala) ===== */
  {
    name: "Vythiri Resort",
    district: "Wayanad", state: "Kerala",
    location: { address: "Vythiri Village, Lakkidi, Wayanad, Kerala 673576", coordinates: { type: "Point", coordinates: [76.2580, 11.5140] } },
    image: "https://media-cdn.tripadvisor.com/media/photo-s/2b/55/f4/71/the-beautiful-mountain.jpg",
    description: "Rainforest resort near Chembra Peak and Meenmutty Falls trek routes.",
    contact: { phone: 4936255366, website: "https://www.vythiriresort.com" },
    pricerange: 8200, rating: 4.6,
    aminities: ["WiFi", "Restaurant", "Pool", "Trek Guide", "Treetop Stay", "Parking"], bookingAvailable: true
  },
  {
    name: "Edakkal Hermitage",
    district: "Wayanad", state: "Kerala",
    location: { address: "Ambukuthi Hills, Sultan Bathery, Wayanad, Kerala 673592", coordinates: { type: "Point", coordinates: [76.2350, 11.6240] } },
    image: "https://www.keralatourism.org/images/service-providers/photos/property-3495-Exterior-10566-20180828083407.jpg",
    description: "Boutique resort adjacent to Edakkal Caves, with Pakshipathalam trek packages.",
    contact: { phone: 4936221155, website: "https://www.edakkalhermitage.com" },
    pricerange: 5500, rating: 4.5,
    aminities: ["WiFi, Restaurant", "Cave Trek Packages", "Parking"], bookingAvailable: true
  },

  /* ===== KOTTAYAM (Kerala) ===== */
  {
    name: "Vagamon Meadows Resort",
    district: "Kottayam", state: "Kerala",
    location: { address: "Marmala Road, Vagamon, Kottayam, Kerala 686518", coordinates: { type: "Point", coordinates: [76.8620, 9.6920] } },
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/810229291.jpg?k=2ec8f847822421a339bc4b7e8eeebe1a34979cb475615d53e4f8275b644c3e7b&o=",
    description: "Resort near Marmala Waterfalls and Illikkal Kallu trek points in Vagamon.",
    contact: { phone: 4828215000, website: "https://www.vagamonmeadows.com" },
    pricerange: 3200, rating: 4.2,
    aminities: ["WiFi", "Restaurant", "Bonfire", "Trekking", "Parking"], bookingAvailable: true
  },

  /* ===== THIRUVANANTHAPURAM (Kerala) ===== */
  {
    name: "Ponmudi Mist Valley Resort",
    district: "Thiruvananthapuram", state: "Kerala",
    location: { address: "Golden Valley, Ponmudi, Kerala 695562", coordinates: { type: "Point", coordinates: [77.1150, 8.7560] } },
    image: "https://www.ktdc.com/photo-gallery/large/golden-peak/golden-peak-2.jpg",
    description: "Hill station resort at Ponmudi with direct access to misty forest trails.",
    contact: { phone: 4712890011, website: "https://www.ponmudimistvalley.com" },
    pricerange: 3500, rating: 4.3,
    aminities: ["WiFi", "Restaurant", "Trek Guide", "Butterfly Garden", "Parking"], bookingAvailable: true
  },
  {
    name: "Agasthyavanam Eco Camp",
    district: "Thiruvananthapuram", state: "Kerala",
    location: { address: "Bonacaud Forest Station, Thiruvananthapuram, Kerala 695541", coordinates: { type: "Point", coordinates: [77.1720, 8.6340] } },
    image: "https://d26dp53kz39178.cloudfront.net/media/uploads/products/248-1716921787135.jpg",
    description: "Forest department eco camp, sole base for Agasthyakoodam peak permit treks.",
    contact: { phone: 4712321456 },
    pricerange: 1800, rating: 4.1,
    aminities: ["Forest Meals", "Trek Guide", "Basic Accommodation", "Parking"], bookingAvailable: false
  },

  /* ===== KOZHIKODE (Kerala) ===== */
  {
    name: "Thusharagiri Forest Camp",
    district: "Kozhikode", state: "Kerala",
    location: { address: "Thusharagiri Waterfalls Road, Kodenchery, Kozhikode, Kerala 673580", coordinates: { type: "Point", coordinates: [75.9300, 11.4320] } },
    image: "https://cdn.tripuntold.com/media/photos/stay/2021/07/11/a09b2a1c-8010-44f7-9d1f-b2e1f11ee4e2.jpg",
    description: "Eco camp at Thusharagiri waterfalls entrance, trek guide packages available.",
    contact: { phone: 9847120034 },
    pricerange: 1500, rating: 4.0,
    aminities: ["Forest Meals", "Trek Guide", "Camping", "Parking"], bookingAvailable: true
  },

  /* ===== PALAKKAD (Kerala) ===== */
  {
    name: "Silent Valley Base Camp",
    district: "Palakkad", state: "Kerala",
    location: { address: "Mukkali, Silent Valley National Park, Palakkad, Kerala 678582", coordinates: { type: "Point", coordinates: [76.4510, 11.1010] } },
    image: "https://images.exoticamp.com/vendors/images/profile/4_20240824T084320355Z.jpg",
    description: "Forest department base camp, only accommodation permitted for Silent Valley trekkers.",
    contact: { phone: 4924255345 },
    pricerange: 1500, rating: 4.0, aminities: ["Forest Meals", "Trek Guide", "Parking"], bookingAvailable: false
  },

  /* ===== KASARAGOD (Kerala) ===== */
  {
    name: "Ranipuram Summit Stay",
    district: "Kasaragod", state: "Kerala",
    location: { address: "Panathady, Kasaragod, Kerala 671314", coordinates: { type: "Point", coordinates: [75.3610, 12.4710] } },
    image: "https://content.jdmagicbox.com/v2/comp/kasaragod/h4/9999p4994.4994.250715135559.t7h4/catalogue/hilltop-services-villa-panathady-ranipuram-resorts-wf5qy6mpog.jpg",
    description: "Hilltop guesthouse at Ranipuram meadows, sweeping views of Kannur and Kasaragod.",
    contact: { phone: 4994212233 },
    pricerange: 1200, rating: 4.1,
    aminities: ["Basic Meals", "Parking", "Bonfire"], bookingAvailable: false
  },

  /* ===== KARNATAKA (Coorg) ===== */
  {
    name: "Coorg Wilderness Resort",
    district: "Karnataka", state: "Karnataka",
    location: { address: "Virajpet Road, Coorg, Karnataka 571201", coordinates: { type: "Point", coordinates: [75.9370, 11.9730] } },
    image: "https://www.pauljohnhotels.com/images/slides/coorg-wilderness-resort-madikeri.jpg",
    description: "Jungle resort in Brahmagiri hills, ideal for Brahmagiri ridge and Irrupu Falls treks.",
    contact: { phone: 8272200100, website: "https://www.coorgwilderness.com" },
    pricerange: 7500, rating: 4.6,
    aminities: ["WiFi, Restaurant", "Pool", "Safari", "Trek Guide", "Parking"], bookingAvailable: true
  }
];

module.exports = hotels;