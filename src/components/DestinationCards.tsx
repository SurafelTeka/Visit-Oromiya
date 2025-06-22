import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DestinationCards: React.FC = () => {
  const navigate = useNavigate();

  const destinations = [
    {
      id: 1,
      name: "Bale Mountains National Park",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      description:
        "Home to rare wildlife and stunning alpine landscapes. Perfect for hiking and wildlife photography.",
      rating: 4.8,
      location: "Bale Zone, Oromia",
      highlights: ["Ethiopian Wolf", "Mountain Nyala", "Sanetti Plateau"],
    },
    {
      id: 2,
      name: "Wenchi Crater Lake",
      image:
        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=500&h=300&fit=crop",
      description:
        "A pristine crater lake surrounded by lush forests. Enjoy boat rides and horseback adventures.",
      rating: 4.7,
      location: "West Shewa, Oromia",
      highlights: ["Boat Rides", "Hot Springs", "Monastery Island"],
    },
    {
      id: 3,
      name: "Rift Valley Lakes",
      image:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&h=300&fit=crop",
      description:
        "A chain of beautiful lakes perfect for bird watching, fishing, and relaxation.",
      rating: 4.6,
      location: "Central Rift Valley, Oromia",
      highlights: ["Bird Watching", "Fishing", "Lake Ziway", "Lake Langano"],
    },
    {
      id: 4,
      name: "BABILE Elephant Sanctuary",
      image:
        "https://visitoromia.org/wp-content/uploads/2023/06/photo_2023-06-11_11-25-17.jpg",
      description:
        "Situated between Oromia and Somali Regional State,it covers an area of about 6982 square kilometres and is a significant destination for wildlife watchers.",

      rating: 4.9,
      location: "Arsi Zone, Oromia",
      highlights: ["High Altitude Trekking", "Alpine Lakes", "Endemic Plants"],
    },
    {
      id: 5,
      name: "Awash National Park",
      image:
        "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=300&fit=crop",
      description:
        "Famous for Awash Falls and diverse wildlife in semi-arid landscapes.",
      rating: 4.5,
      location: "East Shewa, Oromia",
      highlights: ["Awash Falls", "Wildlife Safari", "Hot Springs"],
    },

    {
      id: 7,
      name: "Sof Omar Caves",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=300&fit=crop",
      description:
        "One of the longest cave systems in Africa with stunning limestone formations.",
      rating: 4.6,
      location: "Bale Zone, Oromia",
      highlights: [
        "Cave Exploration",
        "Underground Rivers",
        "Limestone Formations",
      ],
    },
    {
      id: 8,
      name: "Debre Libanos",
      image:
        "https://plus.unsplash.com/premium_photo-1667401373119-f9af8c7ccf8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fERlYnJlJTIwTGliYW5vcyUyQyUyMEV0aGlvcGlhfGVufDB8fDB8fHww",
      description:
        "Historic monastery with breathtaking gorge views and endemic gelada monkeys.",
      rating: 4.4,
      location: "North Shewa, Oromia",
      highlights: ["Historic Monastery", "Gelada Monkeys", "Portuguese Bridge"],
    },
  ];

  const handleExploreDestination = (destinationId: number) => {
    navigate(`/destination/${destinationId}`);
  };

  const handleChatAssistant = (destinationName: string) => {
    const chatEvent = new CustomEvent("openChat", {
      detail: {
        message: `Tell me more about ${destinationName} and available tour packages.`,
      },
    });
    window.dispatchEvent(chatEvent);
  };

  return (
    <section id="destinations" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Discover Oromia's Top Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From majestic mountains to serene lakes, explore the natural wonders
            that make Oromia unforgettable.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {destinations.slice(0, 8).map((destination) => (
            <Card
              key={destination.id}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
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

              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-gray-800">
                  {destination.name}
                </CardTitle>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {destination.location}
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 mb-3 text-sm">
                  {destination.description}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {destination.highlights
                      .slice(0, 2)
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

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleExploreDestination(destination.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-sm"
                  >
                    Explore
                  </Button>
                  <Button
                    onClick={() => handleChatAssistant(destination.name)}
                    variant="outline"
                    size="sm"
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={() => navigate("/destinations")}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg"
          >
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DestinationCards;
