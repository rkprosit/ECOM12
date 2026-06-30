import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  {
    name: 'Midnight Oud',
    description: 'A rich, woody fragrance with hints of agarwood, saffron, and leather. Perfect for evening occasions.',
    price: 849, category: 'Woody', gender: 'male', stock: 25,
    image: 'https://images.pexels.com/photos/29805437/pexels-photo-29805437.jpeg',
  },
  {
    name: 'Ocean Breeze',
    description: 'Fresh aquatic notes blended with sea salt, bergamot, and white musk. A crisp daytime scent.',
    price: 599, category: 'Aquatic', gender: 'male', stock: 30,
    image: 'https://images.pexels.com/photos/8516275/pexels-photo-8516275.jpeg',
  },
  {
    name: 'Tobacco Vanille',
    description: 'Warm and spicy with tobacco leaf, vanilla, cocoa, and dried fruits. A cozy winter favorite.',
    price: 999, category: 'Oriental', gender: 'male', stock: 18,
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
  },
  {
    name: 'Citrus Burst',
    description: 'Zesty blend of lemon, grapefruit, and mandarin with a woody base. Energizing and fresh.',
    price: 449, category: 'Citrus', gender: 'male', stock: 40,
    image: 'https://images.pexels.com/photos/21574961/pexels-photo-21574961.jpeg',
  },
  {
    name: 'Rustic Leather',
    description: 'Bold leather accord with birch tar, juniper berries, and smoky vetiver. For the confident man.',
    price: 749, category: 'Leather', gender: 'male', stock: 22,
    image: 'https://images.pexels.com/photos/30463181/pexels-photo-30463181.jpeg',
  },
  {
    name: 'Floral Bliss',
    description: 'A delicate bouquet of rose, jasmine, and lily of the valley with a soft musk base.',
    price: 699, category: 'Floral', gender: 'female', stock: 35,
    image: 'https://images.pexels.com/photos/4938275/pexels-photo-4938275.jpeg',
  },
  {
    name: 'Velvet Rose',
    description: 'Deep rose absolute with blackcurrant, patchouli, and amber. Romantic and sophisticated.',
    price: 799, category: 'Floral', gender: 'female', stock: 28,
    image: 'https://images.pexels.com/photos/35825554/pexels-photo-35825554.jpeg',
  },
  {
    name: 'Vanilla Dream',
    description: 'Sweet vanilla bean with caramel, coconut milk, and sandalwood. Irresistibly warm.',
    price: 549, category: 'Gourmand', gender: 'female', stock: 32,
    image: 'https://images.pexels.com/photos/36833976/pexels-photo-36833976.jpeg',
  },
  {
    name: 'Lavender Fields',
    description: 'French lavender with chamomile, white tea, and honey. Calming and elegant.',
    price: 499, category: 'Floral', gender: 'female', stock: 20,
    image: 'https://images.pexels.com/photos/33691658/pexels-photo-33691658.jpeg',
  },
  {
    name: 'Berry Sparkle',
    description: 'Juicy raspberry and strawberry top notes with peony and vanilla. Playful and vibrant.',
    price: 399, category: 'Fruity', gender: 'female', stock: 45,
    image: 'https://images.pexels.com/photos/32816853/pexels-photo-32816853.jpeg',
  },
  {
    name: 'Fresh Linen',
    description: 'Clean cotton accord with aldehyde, white musk, and soft iris. Everyday fresh for anyone.',
    price: 429, category: 'Fresh', gender: 'unisex', stock: 50,
    image: 'https://images.pexels.com/photos/8361523/pexels-photo-8361523.jpeg',
  },
  {
    name: 'Sandalwood & Sage',
    description: 'Creamy sandalwood with clary sage, pink pepper, and cedar. Earthy and grounding.',
    price: 899, category: 'Woody', gender: 'unisex', stock: 15,
    image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg',
  },
  {
    name: 'Green Tea',
    description: 'Japanese green tea with mint, lemon zest, and bamboo. Light and invigorating.',
    price: 399, category: 'Fresh', gender: 'unisex', stock: 38,
    image: 'https://images.pexels.com/photos/32816853/pexels-photo-32816853.jpeg',
  },
  {
    name: 'Amber Nights',
    description: 'Warm amber with benzoin, labdanum, and a touch of cinnamon. Sensual and unisex.',
    price: 949, category: 'Oriental', gender: 'unisex', stock: 12,
    image: 'https://images.pexels.com/photos/29805437/pexels-photo-29805437.jpeg',
  },
  {
    name: 'Coconut & Lime',
    description: 'Tropical coconut water with key lime, sugarcane, and sea salt. Summer in a bottle.',
    price: 499, category: 'Fresh', gender: 'unisex', stock: 27,
    image: 'https://images.pexels.com/photos/8361523/pexels-photo-8361523.jpeg',
  },
  {
    name: 'Musk Gold',
    description: 'A seductive blend of white musk, amber, and warm vanilla with a touch of sandalwood. Long-lasting and luxurious.',
    price: 899, category: 'Musk', gender: 'male', stock: 20,
    image: 'https://images.pexels.com/photos/18105/pexels-photo-18105.jpeg',
  },
  {
    name: 'Rose Petals',
    description: 'Hundreds of hand-picked rose petals distilled into a delicate yet intoxicating fragrance with a hint of pear.',
    price: 749, category: 'Floral', gender: 'female', stock: 25,
    image: 'https://images.pexels.com/photos/874243/pexels-photo-874243.jpeg',
  },
  {
    name: 'Black Orchid',
    description: 'Dark orchid blended with blackcurrant, patchouli, and incense. Mysterious and captivating for any occasion.',
    price: 949, category: 'Oriental', gender: 'unisex', stock: 14,
    image: 'https://images.pexels.com/photos/2343711/pexels-photo-2343711.jpeg',
  },
  {
    name: 'Mountain Air',
    description: 'Crisp alpine air with pine, cedarwood, and fresh ozonic notes. Reminds you of a cool mountain morning.',
    price: 549, category: 'Fresh', gender: 'male', stock: 33,
    image: 'https://images.pexels.com/photos/3760073/pexels-photo-3760073.jpeg',
  },
  {
    name: 'Honey Suckle',
    description: 'Sweet honeysuckle nectar with orange blossom, jasmine, and a creamy vanilla base. Sunny and cheerful.',
    price: 649, category: 'Floral', gender: 'female', stock: 22,
    image: 'https://images.pexels.com/photos/5057883/pexels-photo-5057883.jpeg',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    const created = await Product.insertMany(products);
    console.log(`${created.length} products added successfully.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
