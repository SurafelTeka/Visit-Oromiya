import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, MessageCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
// import Footer from "@/components/Footer"; // REMOVED the old Footer import
import ECommerceFooter from "@/components/ECommerceFooter"; // IMPORTED the ECommerceFooter
import ChatBar from "@/components/ChatBar";

const Destinations: React.FC = () => {
  const destinations = [
    {
      id: 1,
      name: "Bale Mountains National Park",
      image:
        "https://d64gsuwffb70l.cloudfront.net/684ec8cbd778b5af2d6cb1f6_1750578666391_a9a3627f.jpeg",
      description:
        "Home to rare wildlife including Ethiopian Wolf and Mountain Nyala. Experience pristine Afro-alpine landscapes, endemic species, and breathtaking mountain vistas across 2,200 km² of protected wilderness.",
      rating: 4.8,
      location: "Bale Zone, Oromia",
      highlights: [
        "Ethiopian Wolf",
        "Mountain Nyala",
        "Sanetti Plateau",
        "Harenna Forest",
      ],
      bestTime: "October - March",
      activities: [
        "Wildlife Tracking",
        "Trekking",
        "Photography",
        "Bird Watching",
      ],
    },
    {
      id: 2,
      name: "Wenchi Crater Lake",
      image:
        "https://d64gsuwffb70l.cloudfront.net/684ec8cbd778b5af2d6cb1f6_1750578669722_b3aa7d81.jpeg",
      description:
        "A stunning volcanic crater lake formed 10,000 years ago, surrounded by lush forests and natural hot springs. Perfect for spiritual reflection, boat rides, and horseback adventures.",
      rating: 4.7,
      location: "West Shewa, Oromia",
      highlights: [
        "Crater Lake",
        "Hot Springs",
        "Monastery Island",
        "Forest Trails",
      ],
      bestTime: "Year Round",
      activities: ["Boat Rides", "Horseback Riding", "Hot Springs", "Hiking"],
    },
    {
      id: 3,
      name: "Rift Valley Lakes",
      image:
        "https://d64gsuwffb70l.cloudfront.net/684ec8cbd778b5af2d6cb1f6_1750578668654_00c436ce.jpeg",
      description:
        "A chain of pristine lakes along the Great Rift Valley, hosting over 400 bird species including flamingos, pelicans, and fish eagles. A paradise for ornithologists and nature lovers.",
      rating: 4.6,
      location: "Central Rift Valley, Oromia",
      highlights: [
        "Lake Ziway",
        "Lake Langano",
        "Flamingo Colonies",
        "Cultural Villages",
      ],
      bestTime: "November - April",
      activities: [
        "Bird Watching",
        "Boat Excursions",
        "Cultural Tours",
        "Fishing",
      ],
    },
    {
      id: 4,
      name: "Abijatta-Shalla Lakes",
      image:
        "https://d64gsuwffb70l.cloudfront.net/684ec8cbd778b5af2d6cb1f6_1750578668654_00c436ce.jpeg",
      description:
        "Twin lakes offering spectacular wildlife viewing and geological wonders. Lake Shalla is the deepest lake in Ethiopia, while Abijatta attracts thousands of flamingos.",
      rating: 4.5,
      location: "East Shewa, Oromia",
      highlights: [
        "Twin Lakes",
        "Flamingo Flocks",
        "Hot Springs",
        "Geological Sites",
      ],
      bestTime: "October - May",
      activities: [
        "Wildlife Viewing",
        "Photography",
        "Geological Tours",
        "Bird Watching",
      ],
    },
    {
      id: 5,
      name: "Awash National Park",
      image:
        "https://d64gsuwffb70l.cloudfront.net/684ec8cbd778b5af2d6cb1f6_1750578666391_a9a3627f.jpeg",
      description:
        "Ethiopia's oldest national park featuring diverse landscapes from acacia woodlands to volcanic formations. Home to Beisa oryx, Soemmerring's gazelle, and over 450 bird species.",
      rating: 4.4,
      location: "East Shewa, Oromia",
      highlights: [
        "Awash Falls",
        "Volcanic Landscapes",
        "Beisa Oryx",
        "Acacia Woodlands",
      ],
      bestTime: "October - March",
      activities: [
        "Game Drives",
        "Waterfall Visits",
        "Cultural Encounters",
        "Camping",
      ],
    },
    {
      id: 6,
      name: "Debre Libanos",
      image:
        "https://d64gsuwffb70l.cloudfront.net/684ec8cbd778b5af2d6cb1f6_1750578669722_b3aa7d81.jpeg",
      description:
        "Historic monastery and natural wonder featuring the endemic Gelada monkeys and dramatic gorge landscapes. A perfect blend of spiritual heritage and wildlife encounters.",
      rating: 4.3,
      location: "North Shewa, Oromia",
      highlights: [
        "Historic Monastery",
        "Gelada Monkeys",
        "Jemma River Gorge",
        "Portuguese Bridge",
      ],
      bestTime: "September - May",
      activities: [
        "Monastery Visits",
        "Monkey Watching",
        "Gorge Viewing",
        "Cultural Tours",
      ],
    },
  ];

  const handleChatAssistant = (destinationName: string) => {
    const chatEvent = new CustomEvent("openChat", {
      detail: {
        message: `I'm interested in visiting ${destinationName}. Can you tell me about tour packages and the best time to visit?`,
      },
    });
    window.dispatchEvent(chatEvent);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* This is your specific Destinations page banner, it will remain here */}
      <div className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Explore Oromia Destinations
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover the natural wonders, wildlife sanctuaries, and cultural
            treasures of Ethiopia's largest region
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-green-200"
            >
              <div className="relative h-48">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold">
                    {destination.rating}
                  </span>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-gray-800">
                  {destination.name}
                </CardTitle>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {destination.location}
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {destination.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                    Highlights:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {destination.highlights
                      .slice(0, 4)
                      .map((highlight, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                        >
                          {highlight}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      <strong>Best Time:</strong> {destination.bestTime}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => handleChatAssistant(destination.name)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat with AI Assistant
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <ECommerceFooter /> {/* Replaced Footer with ECommerceFooter */}
      <ChatBar />
    </div>
  );
};

export default Destinations;
