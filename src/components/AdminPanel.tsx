import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Edit,
  Trash2,
  Package,
  MapPin,
  BarChart,
  DollarSign,
  Users,
  TrendingUp,
  LineChart,
  ShieldCheck,
  Megaphone,
  Menu, // Added Menu icon for mobile toggle
  X, // Added X icon for close button
} from "lucide-react";

// Import charting components
import VisitorLineChart from "@/components/charts/VisitorLineChart";
import VisitorPieChart from "@/components/charts/VisitorPieChart";

interface TourPackage {
  id: number;
  name: string;
  destination: string;
  duration: string;
  groupSize: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  agency: string;
  image: string;
  highlights: string[];
  includes: string[];
}

interface Destination {
  id: number;
  name: string;
  image: string;
  description: string;
  rating: number;
  location: string;
  highlights: string[];
}

interface AnalyticsData {
  totalVisitors: number;
  dailyVisitors: { date: string; count: number }[];
  weeklyVisitors: { week: string; count: number }[];
  monthlyVisitors: { month: string; count: number }[];
  yearlyVisitors: { year: string; count: number }[];
  seasonalVisitors: { season: string; count: number }[];
  platformVisitors: { platform: string; count: number }[];
}

interface PopularPackage {
  packageId: number;
  packageName: string;
  views: number;
  bookings: number;
}

interface TopGuide {
  guideId: number;
  guideName: string;
  admirationScore: number;
}

interface EarningsData {
  totalEarnings: number;
  dailyEarnings: { date: string; amount: number }[];
  monthlyEarnings: { month: string; amount: number }[];
  packageEarnings: { packageName: string; amount: number }[];
}

interface Recommendation {
  type: "social_media" | "advertisement";
  details: string;
}

interface MostVisitedSite {
  siteId: number;
  siteName: string;
  visits: number;
}
const AdminPanel: React.FC = () => {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(
    null
  );
  const [editingDestination, setEditingDestination] =
    useState<Destination | null>(null);
  const [packageForm, setPackageForm] = useState({
    name: "",
    destination: "",
    duration: "",
    groupSize: "",
    price: 0,
    originalPrice: 0,
    rating: 0,
    reviews: 0,
    agency: "",
    image: "",
    highlights: "",
    includes: "",
  });
  const [destinationForm, setDestinationForm] = useState({
    name: "",
    image: "",
    description: "",
    rating: 0,
    location: "",
    highlights: "",
  });

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [popularPackages, setPopularPackages] = useState<PopularPackage[]>([]);
  const [mostVisitedSites, setMostVisitedSites] = useState<MostVisitedSite[]>(
    []
  );
  const [topGuides, setTopGuides] = useState<TopGuide[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [earningsData, setEarningsData] = useState<EarningsData | null>(null);

  const [activeTab, setActiveTab] = useState("packages"); // State to control the active tab for the main content
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar toggle

  useEffect(() => {
    loadData();
    fetchAnalyticsData();
    fetchEarningsData();
    fetchPopularPackages();
    fetchTopGuides();
    fetchRecommendations();
    fetchMostVisitedSites();

    // Close sidebar automatically on larger screens if it was open on small screen
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint
        setIsSidebarOpen(false); // Close sidebar automatically on larger screens
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadData = () => {
    const savedPackages = localStorage.getItem("tourPackages");
    const savedDestinations = localStorage.getItem("destinations");

    if (savedPackages) {
      setPackages(JSON.parse(savedPackages));
    }

    if (savedDestinations) {
      setDestinations(JSON.parse(savedDestinations));
    }
  };

  // --- Mock Data Fetching Functions ---
  const fetchAnalyticsData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setAnalyticsData({
      totalVisitors: 12500,
      dailyVisitors: [
        { date: "2025-06-18", count: 320 },
        { date: "2025-06-19", count: 350 },
        { date: "2025-06-20", count: 410 },
        { date: "2025-06-21", count: 380 },
        { date: "2025-06-22", count: 450 },
        { date: "2025-06-23", count: 420 }, // Current date
      ],
      weeklyVisitors: [
        { week: "Week 24 (June 10-16)", count: 2200 },
        { week: "Week 25 (June 17-23)", count: 2800 },
      ],
      monthlyVisitors: [
        { month: "May", count: 8000 },
        { month: "June", count: 9500 },
      ],
      yearlyVisitors: [
        { year: "2024", count: 90000 },
        { year: "2025", count: 45000 },
      ],
      seasonalVisitors: [
        { season: "Summer", count: 6000 },
        { season: "Autumn", count: 3000 },
        { season: "Winter", count: 2000 },
        { season: "Spring", count: 1500 },
      ],
      platformVisitors: [
        { platform: "Instagram", count: 4000 },
        { platform: "Facebook", count: 3000 },
        { platform: "Google Search", count: 2500 },
        { platform: "Direct", count: 1000 },
        { platform: "Other", count: 2000 },
      ],
    });
  };

  const fetchEarningsData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setEarningsData({
      totalEarnings: 150230.5,
      dailyEarnings: [
        { date: "2025-06-21", amount: 1200 },
        { date: "2025-06-22", amount: 1500 },
        { date: "2025-06-23", amount: 1350 },
      ],
      monthlyEarnings: [
        { month: "May", amount: 45000 },
        { month: "June", amount: 52000 },
      ],
      packageEarnings: [
        { packageName: "Bali Adventure", amount: 30000 },
        { packageName: "Mountain Trek", amount: 22000 },
        { packageName: "City Explorer", amount: 18000 },
      ],
    });
  };

  const fetchPopularPackages = async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    setPopularPackages([
      {
        packageId: 1,
        packageName: "Bali Adventure",
        views: 5000,
        bookings: 150,
      },
      {
        packageId: 2,
        packageName: "Mountain Trek",
        views: 4200,
        bookings: 120,
      },
      { packageId: 3, packageName: "Desert Safari", views: 3800, bookings: 90 },
      { packageId: 4, packageName: "City Explorer", views: 3000, bookings: 70 },
    ]);
  };

  const fetchTopGuides = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setTopGuides([
      { guideId: 101, guideName: "Aisha Jemal", admirationScore: 4.9 },
      { guideId: 102, guideName: "Bekele Mosisa", admirationScore: 4.7 },
      { guideId: 103, guideName: "Chaltu Geleta", admirationScore: 4.6 },
    ]);
  };
  const fetchMostVisitedSites = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 750)); // Slightly different delay
    setMostVisitedSites([
      { siteId: 201, siteName: "Lalibela Churches", visits: 7200 },
      { siteId: 202, siteName: "Simien Mountains National Park", visits: 6500 },
      { siteId: 203, siteName: "Blue Nile Falls", visits: 5800 },
      { siteId: 204, siteName: "Konso Cultural Landscape", visits: 4900 },
      { siteId: 205, siteName: "Axum Obelisks", visits: 4100 },
    ]);
  };

  const fetchRecommendations = async () => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    setRecommendations([
      {
        type: "social_media",
        details:
          "Focus Instagram ads on younger demographics interested in adventure travel to promote Mountain Trek package.",
      },
      {
        type: "advertisement",
        details:
          'Launch Google Ads campaign targeting "honeymoon destinations" for Bali Adventure package.',
      },
      {
        type: "social_media",
        details:
          "Create engaging TikTok content showcasing short, exciting clips from Desert Safari.",
      },
      {
        type: "advertisement",
        details:
          "Consider partnerships with local travel bloggers for sponsored content about City Explorer.",
      },
    ]);
  };
  // Mock Fetch end
  const handlePackageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPackage: TourPackage = {
      id: editingPackage?.id || Date.now(),
      ...packageForm,
      highlights: packageForm.highlights
        .split(",")
        .map((h) => h.trim())
        .filter(Boolean),
      includes: packageForm.includes
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
    };

    let updatedPackages;
    if (editingPackage) {
      updatedPackages = packages.map((p) =>
        p.id === editingPackage.id ? newPackage : p
      );
    } else {
      updatedPackages = [...packages, newPackage];
    }

    setPackages(updatedPackages);
    localStorage.setItem("tourPackages", JSON.stringify(updatedPackages));
    resetPackageForm();
  };

  const handleDestinationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDestination: Destination = {
      id: editingDestination?.id || Date.now(),
      ...destinationForm,
      highlights: destinationForm.highlights
        .split(",")
        .map((h) => h.trim())
        .filter(Boolean),
    };

    let updatedDestinations;
    if (editingDestination) {
      updatedDestinations = destinations.map((d) =>
        d.id === editingDestination.id ? newDestination : d
      );
    } else {
      updatedDestinations = [...destinations, newDestination];
    }

    setDestinations(updatedDestinations);
    localStorage.setItem("destinations", JSON.stringify(updatedDestinations));
    resetDestinationForm();
  };

  const resetPackageForm = () => {
    setPackageForm({
      name: "",
      destination: "",
      duration: "",
      groupSize: "",
      price: 0,
      originalPrice: 0,
      rating: 0,
      reviews: 0,
      agency: "",
      image: "",
      highlights: "",
      includes: "",
    });
    setEditingPackage(null);
  };

  const resetDestinationForm = () => {
    setDestinationForm({
      name: "",
      image: "",
      description: "",
      rating: 0,
      location: "",
      highlights: "",
    });
    setEditingDestination(null);
  };

  const editPackage = (pkg: TourPackage) => {
    setEditingPackage(pkg);
    setPackageForm({
      ...pkg,
      highlights: pkg.highlights.join(", "),
      includes: pkg.includes.join(", "),
    });
    setActiveTab("packages");
    if (window.innerWidth < 768) setIsSidebarOpen(false); // Close sidebar on mobile after action
  };

  const editDestination = (dest: Destination) => {
    setEditingDestination(dest);
    setDestinationForm({
      ...dest,
      highlights: dest.highlights.join(", "),
    });
    setActiveTab("destinations");
    if (window.innerWidth < 768) setIsSidebarOpen(false); // Close sidebar on mobile after action
  };

  const deletePackage = (id: number) => {
    const updatedPackages = packages.filter((p) => p.id !== id);
    setPackages(updatedPackages);
    localStorage.setItem("tourPackages", JSON.stringify(updatedPackages));
  };

  const deleteDestination = (id: number) => {
    const updatedDestinations = destinations.filter((d) => d.id !== id);
    setDestinations(updatedDestinations);
    localStorage.setItem("destinations", JSON.stringify(updatedDestinations));
  };

  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      {/* Overlay for small screens when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-8 shadow-lg flex flex-col z-50
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:w-64`} // Responsive and toggle classes
      >
        {/* Admin Panel Title */}
        <div className="mb-20 text-center pt-4">
          <h2 className="text-3xl font-extrabold text-white leading-none">
            Admin <span className="text-oromiaRed">Panel</span>
          </h2>
          <p className="text-sm text-gray-400 mb-4">Visit Oromia</p>
        </div>

        {/* Close Button for mobile sidebar */}
        {isSidebarOpen && (
          <button
            className="absolute top-4 right-4 md:hidden p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        )}

        {/* Tabs for Navigation */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            if (window.innerWidth < 768) setIsSidebarOpen(false); // Close sidebar after selecting tab on mobile
          }}
          orientation="vertical"
          className="flex flex-col flex-grow mt-20"
        >
          <TabsList className="!flex !flex-col space-y-3 !items-start bg-transparent w-full">
            <TabsTrigger
              value="packages"
              className="w-full justify-start data-[state=active]:bg-oromiaRed data-[state=active]:text-white data-[state=active]:font-bold transition-colors duration-200 hover:bg-gray-700 rounded-md py-2.5 px-4"
            >
              <Package className="mr-3 h-5 w-5" /> Tour Packages
            </TabsTrigger>
            <TabsTrigger
              value="destinations"
              className="w-full justify-start data-[state=active]:bg-oromiaRed data-[state=active]:text-white data-[state=active]:font-bold transition-colors duration-200 hover:bg-gray-700 rounded-md py-2.5 px-4"
            >
              <MapPin className="mr-3 h-5 w-5" /> Destinations
            </TabsTrigger>
            <TabsTrigger
              value="visitors"
              className="w-full justify-start data-[state=active]:bg-oromiaRed data-[state=active]:text-white data-[state=active]:font-bold transition-colors duration-200 hover:bg-gray-700 rounded-md py-2.5 px-4"
            >
              <Users className="mr-3 h-5 w-5" /> Visitors Stats
            </TabsTrigger>
            <TabsTrigger
              value="packages-stats"
              className="w-full justify-start data-[state=active]:bg-oromiaRed data-[state=active]:text-white data-[state=active]:font-bold transition-colors duration-200 hover:bg-gray-700 rounded-md py-2.5 px-4"
            >
              <LineChart className="mr-3 h-5 w-5" /> Package Usage
            </TabsTrigger>
            <TabsTrigger
              value="guides"
              className="w-full justify-start data-[state=active]:bg-oromiaRed data-[state=active]:text-white data-[state=active]:font-bold transition-colors duration-200 hover:bg-gray-700 rounded-md py-2.5 px-4"
            >
              <ShieldCheck className="mr-3 h-5 w-5" /> Tourist Guides
            </TabsTrigger>
            <TabsTrigger
              value="earnings"
              className="w-full justify-start data-[state=active]:bg-oromiaRed data-[state=active]:text-white data-[state=active]:font-bold transition-colors duration-200 hover:bg-gray-700 rounded-md py-2.5 px-4"
            >
              <DollarSign className="mr-3 h-5 w-5" /> Earnings
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="w-full justify-start data-[state=active]:bg-oromiaRed data-[state=active]:text-white data-[state=active]:font-bold transition-colors duration-200 hover:bg-gray-700 rounded-md py-2.5 px-4"
            >
              <Megaphone className="mr-3 h-5 w-5" /> Recommendations
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Hamburger Menu Button for small screens (positioned in main content) */}
        <button
          className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-gray-800 text-white shadow-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
          Dashboard Overview
        </h1>

        {/* This Tabs component will render the content based on the activeTab state */}
        <Tabs value={activeTab}>
          {/* Tour Packages Content */}
          <TabsContent value="packages">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
              Tour Packages Management
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-oromiaRed">
                {" "}
                {/* Added border-t-4 */}
                <CardHeader className="border-b pb-4">
                  <CardTitle className="text-2xl font-semibold text-oromiaRed">
                    {editingPackage ? "Edit Package" : "Add New Package"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handlePackageSubmit} className="space-y-5">
                    <Input
                      placeholder="Package Name"
                      value={packageForm.name}
                      onChange={(e) =>
                        setPackageForm({ ...packageForm, name: e.target.value })
                      }
                      required
                      className="p-3 border border-gray-300 rounded-md focus:border-oromiaRed focus:ring-1 focus:ring-oromiaRed"
                    />
                    <Input
                      placeholder="Destination"
                      value={packageForm.destination}
                      onChange={(e) =>
                        setPackageForm({
                          ...packageForm,
                          destination: e.target.value,
                        })
                      }
                      required
                      className="p-3 border border-gray-300 rounded-md focus:border-oromiaRed focus:ring-1 focus:ring-oromiaRed"
                    />
                    <Input
                      placeholder="Duration (e.g., 5 Days / 4 Nights)"
                      value={packageForm.duration}
                      onChange={(e) =>
                        setPackageForm({
                          ...packageForm,
                          duration: e.target.value,
                        })
                      }
                      required
                      className="p-3 border border-gray-300 rounded-md focus:border-oromiaRed focus:ring-1 focus:ring-oromiaRed"
                    />
                    <Input
                      placeholder="Group Size (e.g., Max 10 people)"
                      value={packageForm.groupSize}
                      onChange={(e) =>
                        setPackageForm({
                          ...packageForm,
                          groupSize: e.target.value,
                        })
                      }
                      required
                      className="p-3 border border-gray-300 rounded-md focus:border-oromiaRed focus:ring-1 focus:ring-oromiaRed"
                    />
                    <Input
                      placeholder="Agency"
                      value={packageForm.agency}
                      onChange={(e) =>
                        setPackageForm({
                          ...packageForm,
                          agency: e.target.value,
                        })
                      }
                      required
                      className="p-3 border border-gray-300 rounded-md focus:border-oromiaRed focus:ring-1 focus:ring-oromiaRed"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Price"
                        type="number"
                        value={packageForm.price || ""}
                        onChange={(e) =>
                          setPackageForm({
                            ...packageForm,
                            price: parseInt(e.target.value) || 0,
                          })
                        }
                        className="p-3 border border-gray-300 rounded-md focus:border-oromiaRed focus:ring-1 focus:ring-oromiaRed"
                      />
                      <Input
                        placeholder="Original Price (for discount display)"
                        type="number"
                        value={packageForm.originalPrice || ""}
                        onChange={(e) =>
                          setPackageForm({
                            ...packageForm,
                            originalPrice: parseInt(e.target.value) || 0,
                          })
                        }
                        className="p-3 border border-gray-300 rounded-md focus:border-oromiaRed focus:ring-1 focus:ring-oromiaRed"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Rating (0-5)"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={packageForm.rating || ""}
                        onChange={(e) =>
                          setPackageForm({
                            ...packageForm,
                            rating: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="p-3 border border-gray-300 rounded-md focus:border-oromiaRed focus:ring-1 focus:ring-oromiaRed"
                      />
                      <Input
                        placeholder="Reviews Count"
                        type="number"
                        value={packageForm.reviews || ""}
                        onChange={(e) =>
                          setPackageForm({
                            ...packageForm,
                            reviews: parseInt(e.target.value) || 0,
                          })
                        }
                        className="p-3 border border-gray-300 rounded-md focus:border-oromiaRed focus:ring-1 focus:ring-oromiaRed"
                      />
                    </div>
                    <Input
                      placeholder="Image URL"
                      value={packageForm.image}
                      onChange={(e) =>
                        setPackageForm({
                          ...packageForm,
                          image: e.target.value,
                        })
                      }
                      className="p-3 border border-gray-300 rounded-md focus:border-oromiaRed focus:ring-1 focus:ring-oromiaRed"
                    />
                    <Textarea
                      placeholder="Highlights (comma separated, e.g., Scenic Views, Local Cuisine)"
                      value={packageForm.highlights}
                      onChange={(e) =>
                        setPackageForm({
                          ...packageForm,
                          highlights: e.target.value,
                        })
                      }
                      className="p-3 border border-gray-300 rounded-md focus:border-oromiaRed focus:ring-1 focus:ring-oromiaRed min-h-[80px]"
                    />
                    <Textarea
                      placeholder="Includes (comma separated, e.g., Flights, Accommodation, Guide)"
                      value={packageForm.includes}
                      onChange={(e) =>
                        setPackageForm({
                          ...packageForm,
                          includes: e.target.value,
                        })
                      }
                      className="p-3 border border-gray-300 rounded-md focus:border-oromiaRed focus:ring-1 focus:ring-oromiaRed min-h-[80px]"
                    />
                    <div className="flex gap-3 pt-2">
                      <Button
                        type="submit"
                        className="bg-oromiaRed hover:bg-oromiaRedDark text-white px-6 py-3 rounded-md transition-colors duration-200 flex items-center space-x-2"
                      >
                        {editingPackage ? (
                          <Edit className="h-5 w-5" />
                        ) : (
                          <Plus className="h-5 w-5" />
                        )}
                        <span>
                          {editingPackage ? "Update Package" : "Add Package"}
                        </span>
                      </Button>
                      {editingPackage && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={resetPackageForm}
                          className="px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-200 transition-colors duration-200"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="text-2xl font-semibold text-gray-800">
                    Existing Packages
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {packages.length === 0 ? (
                      <p className="text-gray-500 text-center py-10">
                        No tour packages added yet. Start by adding one!
                      </p>
                    ) : (
                      packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          className="border border-gray-200 p-4 rounded-lg bg-white flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900">
                              {pkg.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {pkg.destination} | {pkg.duration}
                            </p>
                            <div className="flex items-center space-x-2 text-sm mt-1">
                              {pkg.rating > 0 && (
                                <span className="text-yellow-500 flex items-center">
                                  {"★".repeat(Math.floor(pkg.rating))}
                                  {"☆".repeat(5 - Math.floor(pkg.rating))} (
                                  {pkg.rating.toFixed(1)})
                                </span>
                              )}
                              {pkg.reviews > 0 && (
                                <span className="text-gray-500">
                                  ({pkg.reviews} reviews)
                                </span>
                              )}
                            </div>
                            <div className="flex items-baseline mt-2">
                              <span className="text-oromiaRed font-extrabold text-xl">
                                ${pkg.price.toLocaleString()}
                              </span>
                              {pkg.originalPrice > pkg.price && (
                                <span className="ml-2 text-gray-500 line-through">
                                  ${pkg.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => editPackage(pkg)}
                              className="w-9 h-9 p-0 rounded-full hover:bg-blue-100 transition-colors duration-200"
                            >
                              <Edit className="h-4 w-4 text-blue-600" />
                            </Button>
                            <Button
                              size="icon"
                              variant="destructive"
                              onClick={() => deletePackage(pkg.id)}
                              className="w-9 h-9 p-0 rounded-full hover:bg-red-100 transition-colors duration-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Destinations Content */}
          <TabsContent value="destinations">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
              Destinations Management
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-oromiaRed">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="text-2xl font-semibold text-oromiaRed">
                    {editingDestination
                      ? "Edit Destination"
                      : "Add New Destination"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <form
                    onSubmit={handleDestinationSubmit}
                    className="space-y-5"
                  >
                    <Input
                      placeholder="Destination Name"
                      value={destinationForm.name}
                      onChange={(e) =>
                        setDestinationForm({
                          ...destinationForm,
                          name: e.target.value,
                        })
                      }
                      required
                      className="p-3 border border-gray-300 rounded-md focus:border-oromiaRed focus:ring-1 focus:ring-oromiaRed"
                    />
                    <Input
                      placeholder="Location (e.g., Asia, Africa)"
                      value={destinationForm.location}
                      onChange={(e) =>
                        setDestinationForm({
                          ...destinationForm,
                          location: e.target.value,
                        })
                      }
                      required
                      className="p-3 border border-gray-300 rounded-md focus:border-oromiaRed focus:ring-1 focus:ring-oromiaRed"
                    />
                    <Input
                      placeholder="Image URL"
                      value={destinationForm.image}
                      onChange={(e) =>
                        setDestinationForm({
                          ...destinationForm,
                          image: e.target.value,
                        })
                      }
                      required
                      className="p-3 border border-gray-300 rounded-md focus:border-oromiaRed focus:ring-1 focus:ring-oromiaRed"
                    />
                    <Input
                      placeholder="Rating (0-5)"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={destinationForm.rating || ""}
                      onChange={(e) =>
                        setDestinationForm({
                          ...destinationForm,
                          rating: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="p-3 border border-gray-300 rounded-md focus:border-oromiaRed focus:ring-1 focus:ring-oromiaRed"
                    />
                    <Textarea
                      placeholder="Description"
                      value={destinationForm.description}
                      onChange={(e) =>
                        setDestinationForm({
                          ...destinationForm,
                          description: e.target.value,
                        })
                      }
                      required
                      className="p-3 border border-gray-300 rounded-md focus:border-oromiaRed focus:ring-1 focus:ring-oromiaRed min-h-[100px]"
                    />
                    <Textarea
                      placeholder="Highlights (comma separated, e.g., Ancient Ruins, Beautiful Beaches)"
                      value={destinationForm.highlights}
                      onChange={(e) =>
                        setDestinationForm({
                          ...destinationForm,
                          highlights: e.target.value,
                        })
                      }
                      className="p-3 border border-gray-300 rounded-md focus:border-oromiaRed focus:ring-1 focus:ring-oromiaRed min-h-[80px]"
                    />
                    <div className="flex gap-3 pt-2">
                      <Button
                        type="submit"
                        className="bg-oromiaRed hover:bg-oromiaRedDark text-white px-6 py-3 rounded-md transition-colors duration-200 flex items-center space-x-2"
                      >
                        {editingDestination ? (
                          <Edit className="h-5 w-5" />
                        ) : (
                          <Plus className="h-5 w-5" />
                        )}
                        <span>
                          {editingDestination
                            ? "Update Destination"
                            : "Add Destination"}
                        </span>
                      </Button>
                      {editingDestination && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={resetDestinationForm}
                          className="px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-200 transition-colors duration-200"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="text-2xl font-semibold text-gray-800">
                    Existing Destinations
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {destinations.length === 0 ? (
                      <p className="text-gray-500 text-center py-10">
                        No destinations added yet. Start by adding one!
                      </p>
                    ) : (
                      destinations.map((dest) => (
                        <div
                          key={dest.id}
                          className="border border-gray-200 p-4 rounded-lg bg-white flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900">
                              {dest.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {dest.location}
                            </p>
                            {dest.rating > 0 && (
                              <span className="text-yellow-500 flex items-center text-sm mt-1">
                                {"★".repeat(Math.floor(dest.rating))}
                                {"☆".repeat(5 - Math.floor(dest.rating))} (
                                {dest.rating.toFixed(1)})
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => editDestination(dest)}
                              className="w-9 h-9 p-0 rounded-full hover:bg-blue-100 transition-colors duration-200"
                            >
                              <Edit className="h-4 w-4 text-blue-600" />
                            </Button>
                            <Button
                              size="icon"
                              variant="destructive"
                              onClick={() => deleteDestination(dest.id)}
                              className="w-9 h-9 p-0 rounded-full hover:bg-red-100 transition-colors duration-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Visitor Statistics Content with Graphs */}
          <TabsContent value="visitors">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
              Visitor Statistics
            </h2>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-2xl font-semibold text-gray-800">
                  Website Traffic Data
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {analyticsData ? (
                  <div className="space-y-8 text-gray-700">
                    {" "}
                    {/* Increased space-y for better separation */}
                    <p className="text-3xl font-bold text-oromiaRed mb-4">
                      Total Visitors:{" "}
                      {analyticsData.totalVisitors.toLocaleString()}
                    </p>
                    {/* Daily Visitors Line Chart */}
                    <Card className="shadow-sm border border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                          Daily Visitor Trends
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <VisitorLineChart data={analyticsData.dailyVisitors} />
                      </CardContent>
                    </Card>
                    {/* Visitors by Platform Pie Chart */}
                    <Card className="shadow-sm border border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                          Visitors by Platform/Source
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <VisitorPieChart
                          data={analyticsData.platformVisitors}
                        />
                      </CardContent>
                    </Card>
                    {/* Original detailed lists (can keep or remove based on preference) */}
                    <div>
                      <h4 className="font-semibold text-xl mb-2 border-b pb-1">
                        Detailed Visitor Breakdown:
                      </h4>
                      <h5 className="font-medium text-lg mb-2 mt-4">
                        Visitors by Time Period:
                      </h5>
                      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <li className="p-3 bg-gray-50 rounded-md shadow-sm">
                          <strong className="text-lg text-gray-900">
                            Daily:
                          </strong>
                          <ul className="list-disc list-inside text-sm mt-1">
                            {analyticsData.dailyVisitors.map((d) => (
                              <li key={d.date}>
                                {d.date}: {d.count}
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="p-3 bg-gray-50 rounded-md shadow-sm">
                          <strong className="text-lg text-gray-900">
                            Weekly:
                          </strong>
                          <ul className="list-disc list-inside text-sm mt-1">
                            {analyticsData.weeklyVisitors.map((w) => (
                              <li key={w.week}>
                                {w.week}: {w.count}
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="p-3 bg-gray-50 rounded-md shadow-sm">
                          <strong className="text-lg text-gray-900">
                            Monthly:
                          </strong>
                          <ul className="list-disc list-inside text-sm mt-1">
                            {analyticsData.monthlyVisitors.map((m) => (
                              <li key={m.month}>
                                {m.month}: {m.count}
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="p-3 bg-gray-50 rounded-md shadow-sm">
                          <strong className="text-lg text-gray-900">
                            Yearly:
                          </strong>
                          <ul className="list-disc list-inside text-sm mt-1">
                            {analyticsData.yearlyVisitors.map((y) => (
                              <li key={y.year}>
                                {y.year}: {y.count}
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-lg mb-2 mt-4">
                        Visitors by Season:
                      </h5>
                      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {analyticsData.seasonalVisitors.map((s) => (
                          <li
                            key={s.season}
                            className="p-3 bg-gray-50 rounded-md shadow-sm"
                          >
                            <strong className="text-lg text-gray-900">
                              {s.season}:
                            </strong>{" "}
                            {s.count}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-10">
                    Loading visitor data...
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Package Usage Statistics Content */}
          <TabsContent value="packages-stats">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
              Package Usage Statistics
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {" "}
              {/* NEW: Grid container for side-by-side cards */}
              {/* Card for Most Used Packages (Existing) */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-oromiaRed">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="text-2xl font-semibold text-gray-800">
                    Most Used Packages
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {popularPackages.length > 0 ? (
                    <div className="space-y-4 text-gray-700">
                      <ul className="list-decimal pl-6 space-y-3">
                        {popularPackages.map((pkg) => (
                          <li
                            key={pkg.packageId}
                            className="p-3 bg-gray-50 rounded-md shadow-sm"
                          >
                            <strong className="text-lg text-gray-900">
                              {pkg.packageName}:
                            </strong>
                            <p className="text-md ml-4">
                              Views:{" "}
                              <span className="font-medium text-oromiaRed">
                                {pkg.views.toLocaleString()}
                              </span>
                            </p>
                            <p className="text-md ml-4">
                              Bookings:{" "}
                              <span className="font-medium text-green-600">
                                {pkg.bookings.toLocaleString()}
                              </span>
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-10">
                      Loading package usage data...
                    </p>
                  )}
                </CardContent>
              </Card>
              {/* NEW: Card for Most Visited Sites */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-oromiaRed">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="text-2xl font-semibold text-gray-800">
                    Most Visited Sites
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {mostVisitedSites.length > 0 ? (
                    <div className="space-y-4 text-gray-700">
                      <ul className="list-decimal pl-6 space-y-3">
                        {mostVisitedSites.map((site) => (
                          <li
                            key={site.siteId}
                            className="p-3 bg-gray-50 rounded-md shadow-sm"
                          >
                            <strong className="text-lg text-gray-900">
                              {site.siteName}:
                            </strong>
                            <p className="text-md ml-4">
                              Visits:{" "}
                              <span className="font-medium text-blue-600">
                                {" "}
                                {/* Changed color for differentiation */}
                                {site.visits.toLocaleString()}
                              </span>
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-10">
                      Loading most visited sites data...
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>{" "}
            {/* END: Grid container */}
          </TabsContent>

          {/* Tourist Guide Performance Content */}
          <TabsContent value="guides">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
              Tourist Guide Performance
            </h2>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-oromiaRed">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-2xl font-semibold text-gray-800">
                  Most Admired Tourist Guides
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {topGuides.length > 0 ? (
                  <div className="space-y-4 text-gray-700">
                    <ul className="list-decimal pl-6 space-y-3">
                      {topGuides.map((guide) => (
                        <li
                          key={guide.guideId}
                          className="p-3 bg-gray-50 rounded-md shadow-sm"
                        >
                          <strong className="text-lg text-gray-900">
                            {guide.guideName}:
                          </strong>
                          <p className="text-md ml-4">
                            Admiration Score:{" "}
                            <span className="font-medium text-oromiaRed">
                              {guide.admirationScore.toFixed(1)}
                            </span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-10">
                    Loading tourist guide data...
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earnings Overview Content */}
          <TabsContent value="earnings">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
              Earnings Overview
            </h2>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-oromiaRed">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-2xl font-semibold text-gray-800">
                  Financial Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {earningsData ? (
                  <div className="space-y-6 text-gray-700">
                    <p className="text-2xl font-bold text-oromiaRed">
                      Total Earnings: $
                      {earningsData.totalEarnings.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>

                    <div>
                      <h4 className="font-semibold text-xl mb-2">
                        Daily Earnings:
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {earningsData.dailyEarnings.map((e) => (
                          <li
                            key={e.date}
                            className="p-3 bg-gray-50 rounded-md shadow-sm"
                          >
                            <strong className="text-lg text-gray-900">
                              {e.date}:
                            </strong>{" "}
                            $
                            {e.amount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-xl mb-2">
                        Monthly Earnings:
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {earningsData.monthlyEarnings.map((e) => (
                          <li
                            key={e.month}
                            className="p-3 bg-gray-50 rounded-md shadow-sm"
                          >
                            <strong className="text-lg text-gray-900">
                              {e.month}:
                            </strong>{" "}
                            $
                            {e.amount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-xl mb-2">
                        Earnings by Package:
                      </h4>
                      <ul className="list-decimal pl-6 space-y-3">
                        {earningsData.packageEarnings.map((e) => (
                          <li
                            key={e.packageName}
                            className="p-3 bg-gray-50 rounded-md shadow-sm"
                          >
                            <strong className="text-lg text-gray-900">
                              {e.packageName}:
                            </strong>{" "}
                            $
                            {e.amount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-10">
                    Loading earnings data...
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommendations Content */}
          <TabsContent value="recommendations">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
              Recommendations
            </h2>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-oromiaRed">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-2xl font-semibold text-gray-800">
                  Social Media & Advertisement Strategies
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {recommendations.length > 0 ? (
                  <div className="space-y-4 text-gray-700">
                    <ul className="list-disc pl-6 space-y-3">
                      {recommendations.map((rec, index) => (
                        <li
                          key={index}
                          className="p-3 bg-gray-50 rounded-md shadow-sm"
                        >
                          <strong className="text-lg text-gray-900">
                            {rec.type === "social_media"
                              ? "Social Media:"
                              : "Advertisement:"}{" "}
                          </strong>
                          {rec.details}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-10">
                    Loading recommendations...
                  </p>
                )}
                <p className="text-sm text-gray-600 mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-md">
                  <span className="font-semibold">Note:</span> These
                  recommendations are conceptual and are typically generated by
                  analyzing visitor behavior, package popularity, and market
                  trends from your backend data.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
