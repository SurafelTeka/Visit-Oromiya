import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Package, MapPin } from 'lucide-react';

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

const AdminPanel: React.FC = () => {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [packageForm, setPackageForm] = useState({
    name: '', destination: '', duration: '', groupSize: '', price: 0, originalPrice: 0,
    rating: 0, reviews: 0, agency: '', image: '', highlights: '', includes: ''
  });
  const [destinationForm, setDestinationForm] = useState({
    name: '', image: '', description: '', rating: 0, location: '', highlights: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedPackages = localStorage.getItem('tourPackages');
    const savedDestinations = localStorage.getItem('destinations');
    
    if (savedPackages) {
      setPackages(JSON.parse(savedPackages));
    }
    
    if (savedDestinations) {
      setDestinations(JSON.parse(savedDestinations));
    }
  };

  const handlePackageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPackage: TourPackage = {
      id: editingPackage?.id || Date.now(),
      ...packageForm,
      highlights: packageForm.highlights.split(',').map(h => h.trim()),
      includes: packageForm.includes.split(',').map(i => i.trim())
    };
    
    let updatedPackages;
    if (editingPackage) {
      updatedPackages = packages.map(p => p.id === editingPackage.id ? newPackage : p);
    } else {
      updatedPackages = [...packages, newPackage];
    }
    
    setPackages(updatedPackages);
    localStorage.setItem('tourPackages', JSON.stringify(updatedPackages));
    resetPackageForm();
  };

  const handleDestinationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDestination: Destination = {
      id: editingDestination?.id || Date.now(),
      ...destinationForm,
      highlights: destinationForm.highlights.split(',').map(h => h.trim())
    };
    
    let updatedDestinations;
    if (editingDestination) {
      updatedDestinations = destinations.map(d => d.id === editingDestination.id ? newDestination : d);
    } else {
      updatedDestinations = [...destinations, newDestination];
    }
    
    setDestinations(updatedDestinations);
    localStorage.setItem('destinations', JSON.stringify(updatedDestinations));
    resetDestinationForm();
  };

  const resetPackageForm = () => {
    setPackageForm({
      name: '', destination: '', duration: '', groupSize: '', price: 0, originalPrice: 0,
      rating: 0, reviews: 0, agency: '', image: '', highlights: '', includes: ''
    });
    setEditingPackage(null);
  };

  const resetDestinationForm = () => {
    setDestinationForm({
      name: '', image: '', description: '', rating: 0, location: '', highlights: ''
    });
    setEditingDestination(null);
  };

  const editPackage = (pkg: TourPackage) => {
    setEditingPackage(pkg);
    setPackageForm({
      ...pkg,
      highlights: pkg.highlights.join(', '),
      includes: pkg.includes.join(', ')
    });
  };

  const editDestination = (dest: Destination) => {
    setEditingDestination(dest);
    setDestinationForm({
      ...dest,
      highlights: dest.highlights.join(', ')
    });
  };

  const deletePackage = (id: number) => {
    const updatedPackages = packages.filter(p => p.id !== id);
    setPackages(updatedPackages);
    localStorage.setItem('tourPackages', JSON.stringify(updatedPackages));
  };

  const deleteDestination = (id: number) => {
    const updatedDestinations = destinations.filter(d => d.id !== id);
    setDestinations(updatedDestinations);
    localStorage.setItem('destinations', JSON.stringify(updatedDestinations));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Panel</h1>
      
      <Tabs defaultValue="packages" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="packages">Tour Packages</TabsTrigger>
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="packages">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{editingPackage ? 'Edit Package' : 'Add New Package'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePackageSubmit} className="space-y-4">
                  <Input
                    placeholder="Package Name"
                    value={packageForm.name}
                    onChange={(e) => setPackageForm({...packageForm, name: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Agency"
                    value={packageForm.agency}
                    onChange={(e) => setPackageForm({...packageForm, agency: e.target.value})}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Price"
                      type="number"
                      value={packageForm.price}
                      onChange={(e) => setPackageForm({...packageForm, price: parseInt(e.target.value)})}
                    />
                    <Input
                      placeholder="Original Price"
                      type="number"
                      value={packageForm.originalPrice}
                      onChange={(e) => setPackageForm({...packageForm, originalPrice: parseInt(e.target.value)})}
                    />
                  </div>
                  <Input
                    placeholder="Image URL"
                    value={packageForm.image}
                    onChange={(e) => setPackageForm({...packageForm, image: e.target.value})}
                  />
                  <Textarea
                    placeholder="Highlights (comma separated)"
                    value={packageForm.highlights}
                    onChange={(e) => setPackageForm({...packageForm, highlights: e.target.value})}
                  />
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      {editingPackage ? 'Update' : 'Add'} Package
                    </Button>
                    {editingPackage && (
                      <Button type="button" variant="outline" onClick={resetPackageForm}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Existing Packages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="border p-4 rounded-lg">
                      <h3 className="font-semibold">{pkg.name}</h3>
                      <p className="text-sm text-gray-600">{pkg.agency}</p>
                      <p className="text-green-600 font-bold">${pkg.price}</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" onClick={() => editPackage(pkg)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deletePackage(pkg.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="destinations">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{editingDestination ? 'Edit Destination' : 'Add New Destination'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDestinationSubmit} className="space-y-4">
                  <Input
                    placeholder="Destination Name"
                    value={destinationForm.name}
                    onChange={(e) => setDestinationForm({...destinationForm, name: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Location"
                    value={destinationForm.location}
                    onChange={(e) => setDestinationForm({...destinationForm, location: e.target.value})}
                    required
                  />
                  <Input
                    placeholder="Image URL"
                    value={destinationForm.image}
                    onChange={(e) => setDestinationForm({...destinationForm, image: e.target.value})}
                    required
                  />
                  <Textarea
                    placeholder="Description"
                    value={destinationForm.description}
                    onChange={(e) => setDestinationForm({...destinationForm, description: e.target.value})}
                    required
                  />
                  <Textarea
                    placeholder="Highlights (comma separated)"
                    value={destinationForm.highlights}
                    onChange={(e) => setDestinationForm({...destinationForm, highlights: e.target.value})}
                  />
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      {editingDestination ? 'Update' : 'Add'} Destination
                    </Button>
                    {editingDestination && (
                      <Button type="button" variant="outline" onClick={resetDestinationForm}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Existing Destinations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {destinations.map((dest) => (
                    <div key={dest.id} className="border p-4 rounded-lg">
                      <h3 className="font-semibold">{dest.name}</h3>
                      <p className="text-sm text-gray-600">{dest.location}</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" onClick={() => editDestination(dest)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteDestination(dest.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;