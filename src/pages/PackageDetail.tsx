import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  ArrowLeft,
  Clock,
  Users,
  MapPin,
  Star,
  Calendar as CalendarIcon,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatBar from "@/components/ChatBar";

const PackageDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [roomType, setRoomType] = React.useState("double");

  const packages = {
    "1": {
      name: "Bale Mountains Adventure",
      destination: "Bale Mountains National Park",
      duration: "5 Days / 4 Nights",
      groupSize: "2-8 People",
      price: 899,
      originalPrice: 1199,
      rating: 4.9,
      reviews: 127,
      image:
        "https://d64gsuwffb70l.cloudfront.net/684ec8cbd778b5af2d6cb1f6_1750578666391_a9a3627f.jpeg",
      description:
        "Experience the breathtaking Bale Mountains, home to endemic wildlife including the Ethiopian Wolf and Mountain Nyala. Trek through Afro-alpine landscapes and witness unique biodiversity.",
      highlights: [
        "Ethiopian Wolf Tracking",
        "Sanetti Plateau Trek",
        "Mountain Nyala Viewing",
        "Harenna Forest Exploration",
      ],
      includes: [
        "Accommodation",
        "All Meals",
        "Professional Guide",
        "Transportation",
        "4WD Vehicle",
        "Park Fees",
      ],
    },
    "2": {
      name: "Wenchi Crater Lake Escape",
      destination: "Wenchi Crater Lake",
      duration: "3 Days / 2 Nights",
      groupSize: "2-12 People",
      price: 599,
      originalPrice: 799,
      rating: 4.7,
      reviews: 89,
      image:
        "https://d64gsuwffb70l.cloudfront.net/684ec8cbd778b5af2d6cb1f6_1750578669722_b3aa7d81.jpeg",
      description:
        "Discover the serene beauty of Wenchi Crater Lake, a volcanic caldera surrounded by lush forests. Enjoy boat rides, hot springs, and spiritual monastery visits.",
      highlights: [
        "Boat Rides",
        "Hot Springs",
        "Monastery Visit",
        "Horseback Riding",
        "Forest Hiking",
      ],
      includes: [
        "Lakeside Lodge",
        "Meals",
        "Boat Tours",
        "Horseback Riding",
        "Guide Services",
        "Hot Spring Access",
      ],
    },
    "3": {
      name: "Rift Valley Lakes Safari",
      destination: "Rift Valley Lakes",
      duration: "4 Days / 3 Nights",
      groupSize: "2-10 People",
      price: 749,
      originalPrice: 999,
      rating: 4.6,
      reviews: 156,
      image:
        "https://d64gsuwffb70l.cloudfront.net/684ec8cbd778b5af2d6cb1f6_1750578668654_00c436ce.jpeg",
      description:
        "Explore the stunning Rift Valley Lakes, a paradise for bird watchers and nature lovers. Witness flamingos, pelicans, and diverse wildlife across multiple pristine lakes.",
      highlights: [
        "Bird Watching",
        "Lake Ziway",
        "Cultural Villages",
        "Flamingo Viewing",
        "Boat Excursions",
      ],
      includes: [
        "Resort Stay",
        "All Meals",
        "Bird Guide",
        "Cultural Tours",
        "Boat Trips",
        "Binoculars",
      ],
    },
    "4": {
      name: "Rift Valley Lakes Safari",
      destination: "Rift Valley Lakes",
      duration: "4 Days / 3 Nights",
      groupSize: "2-10 People",
      price: 749,
      originalPrice: 999,
      rating: 4.6,
      reviews: 156,
      image:
        "https://d64gsuwffb70l.cloudfront.net/684ec8cbd778b5af2d6cb1f6_1750578668654_00c436ce.jpeg",
      description:
        "Explore the stunning Rift Valley Lakes, a paradise for bird watchers and nature lovers. Witness flamingos, pelicans, and diverse wildlife across multiple pristine lakes.",
      highlights: [
        "Bird Watching",
        "Lake Ziway",
        "Cultural Villages",
        "Flamingo Viewing",
        "Boat Excursions",
      ],
      includes: [
        "Resort Stay",
        "All Meals",
        "Bird Guide",
        "Cultural Tours",
        "Boat Trips",
        "Binoculars",
      ],
    },
    "5": {
      name: "Rift Valley Lakes Safari",
      destination: "Rift Valley Lakes",
      duration: "4 Days / 3 Nights",
      groupSize: "2-10 People",
      price: 749,
      originalPrice: 999,
      rating: 4.6,
      reviews: 156,
      image:
        "https://d64gsuwffb70l.cloudfront.net/684ec8cbd778b5af2d6cb1f6_1750578668654_00c436ce.jpeg",
      description:
        "Explore the stunning Rift Valley Lakes, a paradise for bird watchers and nature lovers. Witness flamingos, pelicans, and diverse wildlife across multiple pristine lakes.",
      highlights: [
        "Bird Watching",
        "Lake Ziway",
        "Cultural Villages",
        "Flamingo Viewing",
        "Boat Excursions",
      ],
      includes: [
        "Resort Stay",
        "All Meals",
        "Bird Guide",
        "Cultural Tours",
        "Boat Trips",
        "Binoculars",
      ],
    },
    "6": {
      name: "BABILE Elephant Sanctuary",
      destination: "Harar & Surroundings",
      duration: "4 Days / 3 Nights",
      groupSize: "2-10 People",
      price: 749,
      originalPrice: 999,
      rating: 4.6,
      reviews: 156,
      image:
        "https://visitoromia.org/wp-content/uploads/2023/06/photo_2023-06-11_11-25-17.jpg",
      description:
        "Situated between Oromia and Somali Regional State,it covers an area of about 6982 square kilometres and is a significant destination for wildlife watchers.",
      highlights: [
        "Bird Watching",
        "Lake Ziway",
        "Cultural Villages",
        "Flamingo Viewing",
        "Boat Excursions",
      ],
      includes: [
        "Resort Stay",
        "All Meals",
        "Bird Guide",
        "Cultural Tours",
        "Boat Trips",
        "Binoculars",
      ],
    },
  };

  const pkg = packages[id as keyof typeof packages];

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Package not found
      </div>
    );
  }

  const handleBooking = () => {
    const chatEvent = new CustomEvent("openChat", {
      detail: {
        message: `I want to book the ${
          pkg.name
        } for ${selectedDate?.toDateString()} with ${roomType} room accommodation. Please help me complete the booking.`,
      },
    });
    window.dispatchEvent(chatEvent);
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-6 text-red-600 hover:bg-red-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Packages
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="relative h-96 rounded-lg overflow-hidden mb-6">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700">
                Save ${pkg.originalPrice - pkg.price}
              </Badge>
              <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-semibold">{pkg.rating}</span>
                <span className="text-xs text-gray-500">({pkg.reviews})</span>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">
                  {pkg.name}
                </CardTitle>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {pkg.destination}
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
                <p className="text-gray-600 mb-6">{pkg.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Tour Highlights:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {pkg.highlights.map((highlight, index) => (
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

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Package Includes:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {pkg.includes.map((item, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl">Book Your Adventure</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="text-center">
                  <span className="text-3xl font-bold text-green-600">
                    ${pkg.price}
                  </span>
                  <span className="text-lg text-gray-500 line-through ml-2">
                    ${pkg.originalPrice}
                  </span>
                  <div className="text-sm text-gray-500">per person</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CalendarIcon className="h-4 w-4 inline mr-1" />
                    Select Travel Date
                  </label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Type
                  </label>
                  <div className="space-y-2">
                    {["single", "double", "triple"].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="radio"
                          name="roomType"
                          value={type}
                          checked={roomType === type}
                          onChange={(e) => setRoomType(e.target.value)}
                          className="mr-2"
                        />
                        <span className="capitalize">{type} Room</span>
                        {type === "single" && (
                          <span className="ml-auto text-sm text-gray-500">
                            +$100
                          </span>
                        )}
                        {type === "triple" && (
                          <span className="ml-auto text-sm text-gray-500">
                            -$50
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleBooking}
                  className="w-full bg-red-600 hover:bg-red-700 text-lg py-3"
                >
                  Book Now - Chat with AI Assistant
                </Button>

                <div className="text-center text-sm text-gray-500">
                  <p>💬 Our AI assistant will help you complete your booking</p>
                  <p>✅ Free cancellation up to 48 hours before departure</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
      <ChatBar />
    </div>
  );
};

export default PackageDetail;
