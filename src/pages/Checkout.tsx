import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, CreditCard, User, Mail, Phone, MapPin } from 'lucide-react';
import { format } from 'date-fns';

const Checkout: React.FC = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [roomType, setRoomType] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: ''
  });

  const packageData = {
    1: { name: 'Bale Mountains Adventure', price: 899, duration: '5 Days / 4 Nights' },
    2: { name: 'Wenchi Crater Lake Escape', price: 599, duration: '3 Days / 2 Nights' },
    3: { name: 'Rift Valley Lakes Safari', price: 749, duration: '4 Days / 3 Nights' },
    4: { name: 'Arsi Mountains Trek', price: 1099, duration: '6 Days / 5 Nights' },
    5: { name: 'Awash National Park Safari', price: 649, duration: '3 Days / 2 Nights' },
    6: { name: 'Harar Cultural Journey', price: 799, duration: '4 Days / 3 Nights' }
  };

  const currentPackage = packageData[packageId as keyof typeof packageData];
  
  const roomPrices = {
    single: 0,
    double: -100,
    triple: -200
  };

  const calculateTotal = () => {
    if (!currentPackage || !roomType) return 0;
    const basePrice = currentPackage.price;
    const roomAdjustment = roomPrices[roomType as keyof typeof roomPrices] || 0;
    return (basePrice + roomAdjustment) * travelers;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBooking = () => {
    if (!selectedDate || !roomType || !formData.firstName || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }
    
    const bookingData = {
      package: currentPackage,
      date: selectedDate,
      roomType,
      travelers,
      total: calculateTotal(),
      customer: formData,
      bookingId: Date.now().toString()
    };
    
    localStorage.setItem('lastBooking', JSON.stringify(bookingData));
    alert('Booking confirmed! You will receive a confirmation email shortly.');
    navigate('/');
  };

  if (!currentPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Package Not Found</h2>
          <Button onClick={() => navigate('/')} className="bg-red-600 hover:bg-red-700">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Booking</h1>
          <p className="text-gray-600">Secure your adventure with just a few details</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Trip Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Travel Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, 'PPP') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Room Type *</Label>
                  <Select value={roomType} onValueChange={setRoomType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Room (+$0)</SelectItem>
                      <SelectItem value="double">Double Room (-$100)</SelectItem>
                      <SelectItem value="triple">Triple Room (-$200)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Number of Travelers</Label>
                  <Select value={travelers.toString()} onValueChange={(value) => setTravelers(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'Person' : 'People'}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{currentPackage.name}</h3>
                    <p className="text-gray-600">{currentPackage.duration}</p>
                  </div>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Base Price</span>
                      <span>${currentPackage.price}</span>
                    </div>
                    {roomType && (
                      <div className="flex justify-between">
                        <span>Room ({roomType})</span>
                        <span>{roomPrices[roomType as keyof typeof roomPrices] >= 0 ? '+' : ''}${roomPrices[roomType as keyof typeof roomPrices]}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Travelers</span>
                      <span>×{travelers}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-green-600">${calculateTotal()}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleBooking}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                    disabled={!selectedDate || !roomType || !formData.firstName || !formData.email}
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Confirm Booking
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Secure payment • Free cancellation up to 48 hours
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;