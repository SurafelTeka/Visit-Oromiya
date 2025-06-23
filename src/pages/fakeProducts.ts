export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  imageUrl: string;
  description: string;
  details: string;
  rating: number;
  stock: number;
}

export const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Oromo Handwoven Coffee Tray",
    price: "$29.99",
    category: "Home Decor",
    imageUrl: "/src/assets/artefact2.webp",
    description: "A stunning tray to elevate every coffee ceremony.",
    details: `
        
        Part of: Hear Your Story Books (21 books)
  Amazon Charts #1 this week
  See all formats and editions
  The Gift Your Father Will Enjoy and Appreciate
  Dad, I Want to Hear Your Story is the popular and cherished way for Fathers to share the memories and joys of their life while also creating a cherished legacy for you and the entire family.
  
  This is the Original and Best-Selling Way for Your Dad to Share His Life Story
  Dad, I Want to Hear Your Story will guide your Father with prompts and questions, making it fun and easy for him to share the stories of his childhood, teens, and adult years. This will be the tale of his life, his victories, his challenges, and his lessons. You will give your Dad a gift he will cherish while also giving yourself the gift of knowing him a little bit better.
  
  Think of all you will learn about your Dad when you read the stories of his life experiences. What will he share? What will you discover? What will you learn?
  
  Imagine Discovering the Details of His Amazing Life and Journey.
  Bestselling author Jeffrey Mason and Hear Your Story Books have expertly created this incredibly popular series of guided journals that have helped thousands share their story, chronicle their memories, and create a forever legacy for their families.
  
  Newly Expanded and Upgraded. More Prompts, More Pages, and More Space for your Dad to Share His Life and His Story with You!
  Over 250 expertly created guided prompts to make it simple for your father to share his memories with you.
  Each question has plenty of room for your Dad to write and share his life stories.
  Give your father the original memory-guided journal. Over tens of thousands have been bought for and cherished by Dads all over the world.
  100% designed, created, and printed in the US.
  Available in Softback and Hardback Versions.
  "My Dad loved telling us all of his stories." - Samuel Robert
  
  "I gave this book to my Dad for Christmas and he told me it was his favorite gift." - Christy Harris
  
  "I learned so much about my Dad because of this wonderful book." -Joe Costa
  
  Order Dad I Want to Hear Your Story and give your Father the gift that will continue to give as the years go by.`,
    rating: 4.7,
    stock: 12
  }
,  
  {
    id: 2,
    name: 'Traditional Jebena Coffee Pot',
    price: '$42.00',
    category: 'Coffee & Ceramics',
    imageUrl: '/src/assets/coffe1.jpg',
    description: 'Iconic clay pot for authentic Ethiopian coffee rituals.',
    details:
      'This handcrafted jebena is a cultural staple across Ethiopia. Made from durable earthenware, its curved silhouette and hand-burnished finish deliver both performance and timeless design. Perfect for home baristas, cultural displays, or ceremonial gifting.',
    rating: 4.8,
    stock: 9,
  },
  {
    id: 3,
    name: 'Cultural Beaded Necklace',
    price: '$18.50',
    category: 'Jewelry & Accessories',
    imageUrl: '/src/assets/artefact4.jpg',
    description: 'Handmade beadwork celebrating indigenous Ethiopian styles.',
    details:
      'Every bead in this necklace tells a story — of heritage, of resilience, of artistic flair. Lightweight yet bold, it’s designed to complement both contemporary fashion and traditional attire. Wear it as a statement of pride or a celebration of craft.',
    rating: 4.5,
    stock: 15,
  },
  {
    id: 4,
    name: 'Oromo Cotton Shawl',
    price: '$35.00',
    category: 'Clothing & Fabrics',
    imageUrl: '/src/assets/cloth2.jpg',
    description: 'Soft, breathable, and proudly Oromo in pattern and palette.',
    details:
      'This shawl is handwoven with locally sourced cotton and dyed using eco-friendly natural pigments. Its stripes and embroidery mirror indigenous Oromia motifs, creating a wrap that’s stylish, symbolic, and comfortable year-round.',
    rating: 4.4,
    stock: 18,
  },
  {
    id: 5,
    name: 'Embroidered Wall Tapestry',
    price: '$62.00',
    category: 'Home Decor',
    imageUrl: '/src/assets/artefact1.jpg',
    description: 'Traditional storytelling stitched into every thread.',
    details:
      'This large-format tapestry captures Oromo folklore in vivid embroidery. Hand-stitched with precision, it serves as a captivating focal point for living rooms, cafes, or gallery spaces. Limited batch, each with slightly unique stitch variations.',
    rating: 4.9,
    stock: 7,
  },
  
     {
      "id": 6,
      "name": "Oromo Handwoven Coffee Tray #6",
      "price": "$32.99",
      "category": "Home Decor",
      "imageUrl": "/src/assets/artefact2.webp",
      "description": "A stunning tray to elevate every coffee ceremony.",
      "details": "Crafted by Oromo artisans using traditional weaving techniques passed down through generations.",
      "rating": 4.6,
      "stock": 10
    },
    {
      "id": 7,
      "name": "Traditional Jebena Coffee Pot #7",
      "price": "$44.50",
      "category": "Coffee & Ceramics",
      "imageUrl": "/src/assets/coffe1.jpg",
      "description": "Iconic clay pot for authentic Ethiopian coffee rituals.",
      "details": "Handcrafted jebena made from durable earthenware with a hand-burnished finish.",
      "rating": 4.9,
      "stock": 8
    },
    {
      "id": 8,
      "name": "Cultural Beaded Necklace #8",
      "price": "$19.25",
      "category": "Jewelry & Accessories",
      "imageUrl": "/src/assets/artefact4.jpg",
      "description": "Handmade beadwork celebrating indigenous Ethiopian styles.",
      "details": "Every bead in this necklace tells a story of heritage, resilience, and artistic flair.",
      "rating": 4.4,
      "stock": 14
    },
    {
      "id": 9,
      "name": "Oromo Cotton Shawl #9",
      "price": "$38.00",
      "category": "Clothing & Fabrics",
      "imageUrl": "/src/assets/cloth2.jpg",
      "description": "Soft, breathable, and proudly Oromo in pattern and palette.",
      "details": "Handwoven with locally sourced cotton and dyed using eco-friendly natural pigments.",
      "rating": 4.5,
      "stock": 20
    },
    {
      "id": 10,
      "name": "Embroidered Wall Tapestry #10",
      "price": "$64.00",
      "category": "Home Decor",
      "imageUrl": "/src/assets/artefact1.jpg",
      "description": "Traditional storytelling stitched into every thread.",
      "details": "Captures Oromo folklore in vivid embroidery. Each with unique stitch variations.",
      "rating": 4.8,
      "stock": 5
    },
    {
      "id": 11,
      "name": "Oromo Handwoven Coffee Tray #11",
      "price": "$31.00",
      "category": "Home Decor",
      "imageUrl": "/src/assets/artefact2.webp",
      "description": "A stunning tray to elevate every coffee ceremony.",
      "details": "Crafted by Oromo artisans using traditional weaving techniques passed down through generations.",
      "rating": 4.7,
      "stock": 11
    },
    {
      "id": 12,
      "name": "Traditional Jebena Coffee Pot #12",
      "price": "$46.00",
      "category": "Coffee & Ceramics",
      "imageUrl": "/src/assets/coffe1.jpg",
      "description": "Iconic clay pot for authentic Ethiopian coffee rituals.",
      "details": "Handcrafted jebena made from durable earthenware with a hand-burnished finish.",
      "rating": 4.9,
      "stock": 6
    },
    {
      "id": 13,
      "name": "Cultural Beaded Necklace #13",
      "price": "$20.75",
      "category": "Jewelry & Accessories",
      "imageUrl": "/src/assets/artefact4.jpg",
      "description": "Handmade beadwork celebrating indigenous Ethiopian styles.",
      "details": "Every bead in this necklace tells a story of heritage, resilience, and artistic flair.",
      "rating": 4.3,
      "stock": 12
    },
    {
      "id": 14,
      "name": "Oromo Cotton Shawl #14",
      "price": "$33.00",
      "category": "Clothing & Fabrics",
      "imageUrl": "/src/assets/cloth2.jpg",
      "description": "Soft, breathable, and proudly Oromo in pattern and palette.",
      "details": "Handwoven with locally sourced cotton and dyed using eco-friendly natural pigments.",
      "rating": 4.6,
      "stock": 19
    },
    {
      "id": 15,
      "name": "Embroidered Wall Tapestry #15",
      "price": "$59.50",
      "category": "Home Decor",
      "imageUrl": "/src/assets/artefact1.jpg",
      "description": "Traditional storytelling stitched into every thread.",
      "details": "Captures Oromo folklore in vivid embroidery. Each with unique stitch variations.",
      "rating": 5.0,
      "stock": 4
    }
    // ...continue this pattern up to id: 45
  
  
];
