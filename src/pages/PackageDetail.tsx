import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Clock,
  Users,
  MapPin,
  Star,
  Calendar as CalendarIcon,
  X,
} from "lucide-react";
import Navigation from "@/components/Navigation";
// import Footer from "@/components/Footer"; // REMOVED: Old Footer import
import ECommerceFooter from "@/components/ECommerceFooter"; // ADDED: ECommerceFooter import
import ChatBar from "@/components/ChatBar";
import countries from "../countries.json";
import Loader from "@/components/Loader";

const PackageDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [roomType, setRoomType] = React.useState("double");
  const [showCheckoutModal, setShowCheckoutModal] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [passportFile, setPassportFile] = React.useState<File | null>(null);
  const [adults, setAdults] = React.useState(1);
  const [kids, setKids] = React.useState(0);

  const [nationality, setNationality] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

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
      description: "Experience the breathtaking Bale Mountains...",
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

    // ... other packages (2 to 6)
  };

  const pkg = packages[id as keyof typeof packages];

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Package not found
      </div>
    );
  }

  const submitCheckout = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", userName);
    formData.append("email", email);
    formData.append("country", nationality);
    formData.append("accomodation", roomType);
    formData.append("phone_number", phone);
    formData.append("no_of_guests", String(Number(adults) + Number(kids))); // Ensure number is converted to string for FormData
    if (passportFile) {
      // Only append if file exists
      formData.append("passport", passportFile);
    }
    formData.append("has_paid", "true"); // FormData appends as string

    try {
      const response = await fetch("http://localhost:4000/api/checkouts", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("🎉 Checkout successful!");
        navigate("/booking-checkout", {
          state: { total: pkg.price }, // This will be received by useLocation on the checkout page
        });
      } else {
        toast.error(
          `🚫 Submission failed: ${result.message || "Unknown error"}`
        );
      }
    } catch (error) {
      toast.error("🔥 Backend submission error. Please try again!");
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = () => {
    
    setShowCheckoutModal(true);
  };

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

  // Function to close the modal
  const closeModal = () => {
    setShowCheckoutModal(false);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
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
                Save ETB {pkg.originalPrice - pkg.price}
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
                    ETB {pkg.price}
                  </span>
                  <span className="text-lg text-gray-500 line-through ml-2">
                    ETB {pkg.originalPrice}
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
                            +ETB 100
                          </span>
                        )}
                        {type === "triple" && (
                          <span className="ml-auto text-sm text-gray-500">
                            - ETB 50
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-red-600 hover:bg-red-700 text-lg py-3"
                >
                  Book Now
                </Button>
                <Button
                  onClick={handleBooking}
                  className="w-full bg-red-600 hover:bg-red-700 text-lg py-3"
                >
                  Book Now - AI Checkout
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
      {showCheckoutModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4 max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md rounded-lg">
                <div className="animate-spin h-10 w-10 border-4 border-red-500 border-t-transparent rounded-full"></div>
                <p className="mt-3 text-sm text-gray-700">
                  Finalizing your booking...
                </p>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              onClick={closeModal}
            >
              <X className="h-5 w-5" />
            </Button>

            <h2 className="text-xl font-semibold text-gray-800">
              Complete Your Booking
            </h2>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border rounded-md"
                required // Added required
              />

              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-gray-100 border border-r-0 rounded-l-md">
                  +251
                </span>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  placeholder="912345678"
                  maxLength={9}
                  className="w-full px-3 py-2 border rounded-r-md"
                  required // Added required
                />
              </div>

              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email" // Changed type to email for browser validation
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full px-3 py-2 border rounded-md"
                required // Added required
              />

              <label className="block text-sm font-medium text-gray-700">
                Upload Passport
              </label>
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={(e) => setPassportFile(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border rounded-md"
                required // Added required
              />
              <label className="block text-sm font-medium text-gray-700">
                Nationality
              </label>
              <select
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required // Added required
              >
                <option value="">Select your country</option>
                {/* Map over the imported countries array */}
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              <div className="flex justify-between items-center mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Adults
                  </label>
                  <div className="flex items-center">
                    <Button
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      size="sm"
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      -
                    </Button>
                    <span className="px-3">{adults}</span>
                    <Button
                      onClick={() => setAdults(adults + 1)}
                      size="sm"
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Kids
                  </label>
                  <div className="flex items-center">
                    <Button
                      onClick={() => setKids(Math.max(0, kids - 1))}
                      size="sm"
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      -
                    </Button>
                    <span className="px-3">{kids}</span>
                    <Button
                      onClick={() => setKids(kids + 1)}
                      size="sm"
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              {/* Display selected room type and date for confirmation */}
              <label className="block text-sm font-medium text-gray-700">
                Selected Room Type
              </label>
              <div className="bg-gray-100 px-3 py-2 rounded-md capitalize">
                {roomType}
              </div>

              <label className="block text-sm font-medium text-gray-700">
                Selected Date
              </label>
              <div className="bg-gray-100 px-3 py-2 rounded-md">
                {selectedDate?.toDateString()}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="ghost" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                onClick={submitCheckout}
                className="bg-red-600 hover:bg-red-700 text-white"
                // Removed inline validation to rely on 'required' attributes and initial handleCheckout check
                disabled={isLoading}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      )}
      <ECommerceFooter /> {/* Replaced Footer with ECommerceFooter */}
      <ChatBar />
    </div>
  );
};

export default PackageDetail;
