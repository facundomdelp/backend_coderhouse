const ProductManager = require('./ProductManager');

// Crear colección
const products = new ProductManager();

// Agregar productos
// OK
products.addProduct({
  title: 'Headset Pro',
  description: 'For professional audio',
  code: 'T-MX9',
  price: 890,
  stock: 100,
  category: 'technology',
  thumbnails: ['url1'],
});

products.addProduct({
  title: 'Wireless Mouse',
  description: 'For easy use',
  code: 'T-CR7',
  price: 299,
  stock: 50,
  category: 'technology',
  thumbnails: ['url2'],
});

products.addProduct({
  title: 'Programmable Keyboard',
  description: 'For customized shortcuts',
  code: 'T-FZ2',
  price: 499,
  stock: 200,
  category: 'technology',
  thumbnails: ['url3'],
});

products.addProduct({
  title: 'Smart Speaker',
  description: 'With voice assistant',
  code: 'T-HN8',
  price: 1999,
  stock: 25,
  category: 'technology',
  thumbnails: ['url4'],
});

products.addProduct({
  title: 'Ultra-Wide Monitor',
  description: 'For super immersive experience',
  code: 'T-JK1',
  price: 3799,
  stock: 15,
  category: 'technology',
  thumbnails: ['url5'],
});

products.addProduct({
  title: 'Smartphone',
  description: 'For communication',
  code: 'T-PT4',
  price: 899,
  stock: 300,
  category: 'technology',
  thumbnails: ['url6'],
});

products.addProduct({
  title: 'Laptop',
  description: 'For working and gaming',
  code: 'T-GV6',
  price: 1399,
  stock: 50,
  category: 'technology',
  thumbnails: ['url7'],
});

products.addProduct({
  title: 'Amazon Echo Dot',
  description: 'For voice assistant and smart home control',
  code: 'T-LB3',
  price: 59,
  stock: 500,
  category: 'technology',
  thumbnails: ['url8'],
});

products.addProduct({
  title: 'Tablet',
  description: 'For entertainment',
  code: 'T-RS7',
  price: 499,
  stock: 150,
  category: 'technology',
  thumbnails: ['url9'],
});

products.addProduct({
  title: 'Wireless Earbuds',
  description: 'For listening',
  code: 'T-NK5',
  price: 199,
  stock: 500,
  category: 'technology',
  thumbnails: ['url10'],
});

products.addProduct({
  title: 'Stand Mixer',
  description: 'For baking and cooking',
  code: 'K-SM1',
  price: 299,
  stock: 50,
  category: 'kitchen',
  thumbnails: ['url11'],
});
products.addProduct({
  title: 'Blender',
  description: 'For smoothies and soups',
  code: 'K-BL3',
  price: 149,
  stock: 100,
  category: 'kitchen',
  thumbnails: ['url12'],
});
products.addProduct({
  title: 'Food Processor',
  description: 'For chopping and pureeing',
  code: 'K-FP5',
  price: 199,
  stock: 75,
  category: 'kitchen',
  thumbnails: ['url13'],
});
products.addProduct({
  title: 'Slow Cooker',
  description: 'For easy one-pot meals',
  code: 'K-SC2',
  price: 99,
  stock: 200,
  category: 'kitchen',
  thumbnails: ['url14'],
});
products.addProduct({
  title: 'Toaster',
  description: 'For toast and bagels',
  code: 'K-TS1',
  price: 49,
  stock: 300,
  category: 'kitchen',
  thumbnails: ['url15'],
});
products.addProduct({
  title: 'Coffee Maker',
  description: 'For brewing coffee',
  code: 'K-CM4',
  price: 79,
  stock: 150,
  category: 'kitchen',
  thumbnails: ['url16'],
});
products.addProduct({
  title: 'Electric Kettle',
  description: 'For boiling water',
  code: 'K-EK6',
  price: 39,
  stock: 250,
  category: 'kitchen',
  thumbnails: ['url17'],
});
products.addProduct({
  title: 'Air Fryer',
  description: 'For healthier fried foods',
  code: 'K-AF8',
  price: 129,
  stock: 100,
  category: 'kitchen',
  thumbnails: ['url18'],
});
products.addProduct({
  title: 'Juicer',
  description: 'For fresh juice',
  code: 'K-JC9',
  price: 99,
  stock: 50,
  category: 'kitchen',
  thumbnails: ['url19'],
});
products.addProduct({
  title: 'Rice Cooker',
  description: 'For perfect rice every time',
  code: 'K-RC7',
  price: 69,
  stock: 75,
  category: 'kitchen',
  thumbnails: ['url20'],
});

products.addProduct({
  title: 'Camping Tent',
  description: 'For camping and outdoor adventures',
  code: 'O-TN1',
  price: 299,
  stock: 50,
  category: 'outdoor',
  thumbnails: ['url21'],
});
products.addProduct({
  title: 'Sleeping Bag',
  description: 'For comfortable sleeping in the great outdoors',
  code: 'O-SB3',
  price: 149,
  stock: 100,
  category: 'outdoor',
  thumbnails: ['url22'],
});
products.addProduct({
  title: 'Backpack',
  description: 'For carrying all your outdoor essentials',
  code: 'O-BP5',
  price: 199,
  stock: 75,
  category: 'outdoor',
  thumbnails: ['url23'],
});
products.addProduct({
  title: 'Hiking Boots',
  description: 'For comfortable and durable hiking',
  code: 'O-HB2',
  price: 99,
  stock: 200,
  category: 'outdoor',
  thumbnails: ['url24'],
});
products.addProduct({
  title: 'Climbing Rope',
  description: 'For safe and secure climbing',
  code: 'O-CR1',
  price: 49,
  stock: 300,
  category: 'outdoor',
  thumbnails: ['url25'],
});
products.addProduct({
  title: 'Portable Grill',
  description: 'For outdoor cooking',
  code: 'O-PG4',
  price: 79,
  stock: 150,
  category: 'outdoor',
  thumbnails: ['url26'],
});
products.addProduct({
  title: 'Fishing Rod',
  description: 'For fishing in rivers and lakes',
  code: 'O-FR6',
  price: 39,
  stock: 250,
  category: 'outdoor',
  thumbnails: ['url27'],
});
products.addProduct({
  title: 'Kayak',
  description: 'For paddling in rivers and lakes',
  code: 'O-KY8',
  price: 129,
  stock: 100,
  category: 'outdoor',
  thumbnails: ['url28'],
});
products.addProduct({
  title: 'Tent Lantern',
  description: 'For lighting up your camping tent',
  code: 'O-TL9',
  price: 99,
  stock: 50,
  category: 'outdoor',
  thumbnails: ['url29'],
});
products.addProduct({
  title: 'Waterproof Backpack',
  description: 'For keeping your gear dry during outdoor activities',
  code: 'O-WB7',
  price: 69,
  stock: 75,
  category: 'outdoor',
  thumbnails: ['url30'],
});

products.addProduct({
  title: 'Ergonomic Office Chair',
  description: 'For comfortable and healthy sitting',
  code: 'HOC-EC1',
  price: 399,
  stock: 50,
  category: 'home office',
  thumbnails: ['url31'],
});
products.addProduct({
  title: 'Standing Desk',
  description: 'For improved health and productivity',
  code: 'HOC-SD3',
  price: 799,
  stock: 25,
  category: 'home office',
  thumbnails: ['url32'],
});
products.addProduct({
  title: 'Monitor Arm',
  description: 'For better posture and comfort',
  code: 'HOC-MA5',
  price: 99,
  stock: 100,
  category: 'home office',
  thumbnails: ['url33'],
});
products.addProduct({
  title: 'Wireless Keyboard and Mouse',
  description: 'For comfortable and easy typing',
  code: 'HOC-KM2',
  price: 149,
  stock: 75,
  category: 'home office',
  thumbnails: ['url34'],
});
products.addProduct({
  title: 'Laptop Stand',
  description: 'For better ergonomics and cooling',
  code: 'HOC-LS4',
  price: 49,
  stock: 300,
  category: 'home office',
  thumbnails: ['url35'],
});
products.addProduct({
  title: 'Noise-Cancelling Headphones',
  description: 'For better concentration and focus',
  code: 'HOC-NH6',
  price: 299,
  stock: 50,
  category: 'home office',
  thumbnails: ['url36'],
});
products.addProduct({
  title: 'Webcam',
  description: 'For high-quality video conferencing',
  code: 'HOC-WC8',
  price: 99,
  stock: 150,
  category: 'home office',
  thumbnails: ['url37'],
});
products.addProduct({
  title: 'Printer',
  description: 'For printing documents and photos',
  code: 'HOC-PR9',
  price: 199,
  stock: 100,
  category: 'home office',
  thumbnails: ['url38'],
});
products.addProduct({
  title: 'Document Scanner',
  description: 'For scanning and organizing documents',
  code: 'HOC-DS7',
  price: 149,
  stock: 75,
  category: 'home office',
  thumbnails: ['url39'],
});
products.addProduct({
  title: 'Desk Lamp',
  description: 'For better lighting and eye health',
  code: 'HOC-DL10',
  price: 59,
  stock: 200,
  category: 'home office',
  thumbnails: ['url40'],
});

products.addProduct({
  title: 'Adjustable Dumbbells',
  description: 'For strength training',
  code: 'HG-AD1',
  price: 499,
  stock: 50,
  category: 'home gym',
  thumbnails: ['url41'],
});
products.addProduct({
  title: 'Treadmill',
  description: 'For cardio exercise',
  code: 'HG-TR2',
  price: 1999,
  stock: 10,
  category: 'home gym',
  thumbnails: ['url42'],
});
products.addProduct({
  title: 'Exercise Bike',
  description: 'For cardio exercise',
  code: 'HG-EB3',
  price: 899,
  stock: 25,
  category: 'home gym',
  thumbnails: ['url43'],
});
products.addProduct({
  title: 'Kettlebell Set',
  description: 'For strength training',
  code: 'HG-KS4',
  price: 299,
  stock: 75,
  category: 'home gym',
  thumbnails: ['url44'],
});
products.addProduct({
  title: 'Resistance Bands',
  description: 'For strength training',
  code: 'HG-RB5',
  price: 49,
  stock: 200,
  category: 'home gym',
  thumbnails: ['url45'],
});
products.addProduct({
  title: 'Yoga Mat',
  description: 'For yoga and stretching',
  code: 'HG-YM6',
  price: 29,
  stock: 300,
  category: 'home gym',
  thumbnails: ['url46'],
});
products.addProduct({
  title: 'Foam Roller',
  description: 'For muscle recovery and relaxation',
  code: 'HG-FR7',
  price: 39,
  stock: 150,
  category: 'home gym',
  thumbnails: ['url47'],
});
products.addProduct({
  title: 'Pull-Up Bar',
  description: 'For upper body strength training',
  code: 'HG-PB8',
  price: 99,
  stock: 50,
  category: 'home gym',
  thumbnails: ['url48'],
});
products.addProduct({
  title: 'Jump Rope',
  description: 'For cardio and coordination',
  code: 'HG-JR9',
  price: 19,
  stock: 500,
  category: 'home gym',
  thumbnails: ['url49'],
});
products.addProduct({
  title: 'Gymnastics Rings',
  description: 'For upper body strength and core stability',
  code: 'HG-GR10',
  price: 89,
  stock: 25,
  category: 'home gym',
  thumbnails: ['url50'],
});

products.addProduct({
  title: 'Showerhead',
  description: 'For a refreshing shower',
  code: 'BH-SH1',
  price: 49,
  stock: 500,
  category: 'bathroom',
  thumbnails: ['url61'],
});
products.addProduct({
  title: 'Toilet Seat',
  description: 'For comfort and hygiene',
  code: 'BH-TS2',
  price: 99,
  stock: 200,
  category: 'bathroom',
  thumbnails: ['url62'],
});
products.addProduct({
  title: 'Bathroom Scale',
  description: 'For monitoring weight and health',
  code: 'BH-BS3',
  price: 29,
  stock: 300,
  category: 'bathroom',
  thumbnails: ['url63'],
});
products.addProduct({
  title: 'Towel Rack',
  description: 'For organizing towels',
  code: 'BH-TR4',
  price: 39,
  stock: 250,
  category: 'bathroom',
  thumbnails: ['url64'],
});
products.addProduct({
  title: 'Bathroom Mirror',
  description: 'For personal grooming and style',
  code: 'BH-BM5',
  price: 149,
  stock: 100,
  category: 'bathroom',
  thumbnails: ['url65'],
});
products.addProduct({
  title: 'Toothbrush Holder',
  description: 'For organizing toothbrushes',
  code: 'BH-TBH6',
  price: 9,
  stock: 500,
  category: 'bathroom',
  thumbnails: ['url66'],
});
products.addProduct({
  title: 'Soap Dispenser',
  description: 'For easy access to liquid soap',
  code: 'BH-SD7',
  price: 19,
  stock: 400,
  category: 'bathroom',
  thumbnails: ['url67'],
});
products.addProduct({
  title: 'Bath Mat',
  description: 'For safety and comfort in the shower',
  code: 'BH-BM8',
  price: 29,
  stock: 350,
  category: 'bathroom',
  thumbnails: ['url68'],
});
products.addProduct({
  title: 'Shower Curtain',
  description: 'For privacy and style in the shower',
  code: 'BH-SC9',
  price: 19,
  stock: 450,
  category: 'bathroom',
  thumbnails: ['url69'],
});
products.addProduct({
  title: 'Hand Dryer',
  description: 'For quick and efficient hand drying',
  code: 'BH-HD10',
  price: 149,
  stock: 75,
  category: 'bathroom',
  thumbnails: ['url70'],
});

products.addProduct({
  title: 'Framed Artwork',
  description: 'For adding color and character to walls',
  code: 'D-FA1',
  price: 89,
  stock: 200,
  category: 'decoration',
  thumbnails: ['url71'],
});
products.addProduct({
  title: 'Throw Pillow',
  description: 'For adding comfort and style to sofas',
  code: 'D-TP2',
  price: 19,
  stock: 500,
  category: 'decoration',
  thumbnails: ['url72'],
});
products.addProduct({
  title: 'Area Rug',
  description: 'For adding warmth and texture to floors',
  code: 'D-AR3',
  price: 199,
  stock: 100,
  category: 'decoration',
  thumbnails: ['url73'],
});
products.addProduct({
  title: 'Wall Clock',
  description: 'For keeping time in style',
  code: 'D-WC4',
  price: 39,
  stock: 400,
  category: 'decoration',
  thumbnails: ['url74'],
});
products.addProduct({
  title: 'Table Lamp',
  description: 'For adding ambient lighting to rooms',
  code: 'D-TL5',
  price: 69,
  stock: 300,
  category: 'decoration',
  thumbnails: ['url75'],
});
products.addProduct({
  title: 'Candle Holder',
  description: 'For adding warmth and fragrance to rooms',
  code: 'D-CH6',
  price: 29,
  stock: 250,
  category: 'decoration',
  thumbnails: ['url76'],
});
products.addProduct({
  title: 'Picture Frame',
  description: 'For displaying cherished memories',
  code: 'D-PF7',
  price: 14,
  stock: 600,
  category: 'decoration',
  thumbnails: ['url77'],
});
products.addProduct({
  title: 'Wall Sconce',
  description: 'For adding elegant lighting to walls',
  code: 'D-WS8',
  price: 99,
  stock: 150,
  category: 'decoration',
  thumbnails: ['url78'],
});
products.addProduct({
  title: 'Sculpture',
  description: 'For adding texture and interest to tables',
  code: 'D-SC9',
  price: 119,
  stock: 75,
  category: 'decoration',
  thumbnails: ['url79'],
});
products.addProduct({
  title: 'Window Curtain',
  description: 'For adding privacy and style to windows',
  code: 'D-WC10',
  price: 49,
  stock: 350,
  category: 'decoration',
  thumbnails: ['url80'],
});

// NOK
products.addProduct({
  title: 'Curtain',
  description: 'For adding privacy ',
  code: 'D-WC10',
  price: 44,
  stock: 30,
  category: 'decoration',
  thumbnails: ['url81'],
});
products.addProduct({ title: 'Mouse', description: 'For gaming' });

// Ver productos
products.getProducts();

// Ver producto por ID
// OK
products.getProductById(2);
// NOK
products.getProductById(8);

// Actualizar producto por ID
products.updateProduct({ id: 3, title: 'Headset', description: 'For playing music', price: 600 });

// Eliminar producto por ID
products.deleteProduct(61);
