import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Users,
  MapPin,
  Star,
  MessageCircle,
  Eye,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TourPackages: React.FC = () => {
  const navigate = useNavigate();

  const packages = [
    {
      id: 1,
      name: "Bale Mountains Adventure",
      destination: "Bale Mountains National Park",
      duration: "5 Days / 4 Nights",
      groupSize: "2-8 People",
      price: 899,
      originalPrice: 1199,
      rating: 4.9,
      reviews: 127,
      agency: "Oromia Adventure Tours",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      highlights: [
        "Ethiopian Wolf Tracking",
        "Sanetti Plateau Trek",
        "Mountain Nyala Viewing",
      ],
      includes: [
        "Accommodation",
        "All Meals",
        "Professional Guide",
        "Transportation",
      ],
    },
    {
      id: 2,
      name: "Wenchi Crater Lake Escape",
      destination: "Wenchi Crater Lake",
      duration: "3 Days / 2 Nights",
      groupSize: "2-12 People",
      price: 599,
      originalPrice: 799,
      rating: 4.7,
      reviews: 89,
      agency: "Highland Expeditions",
      image:
        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=500&h=300&fit=crop",
      highlights: ["Boat Rides", "Hot Springs", "Monastery Visit"],
      includes: ["Lakeside Lodge", "Meals", "Boat Tours", "Horseback Riding"],
    },
    {
      id: 3,
      name: "Rift Valley Lakes Safari",
      destination: "Rift Valley Lakes",
      duration: "4 Days / 3 Nights",
      groupSize: "2-10 People",
      price: 749,
      originalPrice: 999,
      rating: 4.6,
      reviews: 156,
      agency: "Safari Masters Ethiopia",
      image:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&h=300&fit=crop",
      highlights: ["Bird Watching", "Lake Ziway", "Cultural Villages"],
      includes: ["Resort Stay", "All Meals", "Bird Guide", "Cultural Tours"],
    },
    {
      id: 4,
      name: "Arsi Mountains Trek",
      destination: "Arsi Mountains",
      duration: "6 Days / 5 Nights",
      groupSize: "4-10 People",
      price: 1099,
      originalPrice: 1399,
      rating: 4.8,
      reviews: 73,
      agency: "Mountain Trails Oromia",
      image:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&h=300&fit=crop",
      highlights: ["High Altitude Trekking", "Alpine Lakes", "Endemic Flora"],
      includes: ["Camping Equipment", "All Meals", "Expert Guides", "Permits"],
    },
    {
      id: 5,
      name: "Awash National Park Safari",
      destination: "Awash National Park",
      duration: "3 Days / 2 Nights",
      groupSize: "2-8 People",
      price: 649,
      originalPrice: 849,
      rating: 4.5,
      reviews: 94,
      agency: "Wild Oromia Safaris",
      image:
        "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=300&fit=crop",
      highlights: ["Awash Falls", "Wildlife Viewing", "Hot Springs"],
      includes: ["Lodge Stay", "Game Drives", "All Meals", "Park Fees"],
    },
    {
      id: 6,
      name: "BABILE 4 day Package",
      destination: "Arsi Zone, Oromia",
      duration: "4 Days / 3 Nights",
      groupSize: "2-12 People",
      price: 799,
      originalPrice: 1099,
      rating: 4.7,
      reviews: 112,
      agency: "Cultural Heritage Tours",
      image: "https://www.oromiatourism.gov.et/images/Babile-Elephant.jpg",
      highlights: ["Historic City Tour", "Coffee Ceremony", "Local Markets"],
      includes: ["Historic Hotels", "Cultural Guide", "All Meals", "Transport"],
    },
  ];

  const handleViewMore = (packageId: number) => {
    navigate(`/package/${packageId}`);
  };

  const handleChatAssistant = (packageName: string) => {
    const chatEvent = new CustomEvent("openChat", {
      detail: {
        message: `I'm interested in the ${packageName} package. Can you tell me more about it?`,
      },
    });
    window.dispatchEvent(chatEvent);
  };

  return (
    <section id="packages" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Exclusive Tour Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Carefully crafted experiences that showcase the best of Oromia with
            expert guides and premium accommodations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-green-200"
            >
              <div className="relative h-48">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700">
                  Save ${pkg.originalPrice - pkg.price}
                </Badge>
                <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold">{pkg.rating}</span>
                  <span className="text-xs text-gray-500">({pkg.reviews})</span>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-gray-800">
                  {pkg.name}
                </CardTitle>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {pkg.destination}
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <Building2 className="h-4 w-4 mr-1" />
                  {pkg.agency}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {pkg.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {pkg.groupSize}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Tour Highlights:
                  </h4>
                  <div className="space-y-1">
                    {pkg.highlights.slice(0, 3).map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-green-600">
                        ${pkg.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${pkg.originalPrice}
                      </span>
                      <div className="text-xs text-gray-500">per person</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleViewMore(pkg.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View More
                    </Button>
                    <Button
                      onClick={() => handleChatAssistant(pkg.name)}
                      variant="outline"
                      className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat AI
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={() => navigate("/packages")}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg"
          >
            View All Packages
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TourPackages;
