import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const libraries = ["places"]; // Important: stable array to avoid reload

const AddressStep = ({ form, setForm }) => {
  const [coords, setCoords] = useState({ lat: 9.03, lng: 38.74 });
  const [focused, setFocused] = useState(false);
  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude, longitude } = coords;
      setCoords({ lat: latitude, lng: longitude });

      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );
      const json = await res.json();
      const geo = json.results?.[0];

      if (!geo) return;

      const addressData = parseAddress(geo, latitude, longitude);
      console.log("📦 Parsed Address:", addressData);

      setForm((prev) => ({ ...prev, address: addressData.formatted_address }));
      setValue(addressData.formatted_address, false);

      // Auto-send to backend
      const token = localStorage.getItem("auth_token");
      if (token) {
        fetch("http://localhost:3000/api/addresses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(addressData),
        })
          .then((res) => res.json())
          .then((result) => console.log("✅ Address submitted:", result))
          .catch((err) => console.error("❌ Failed to submit address:", err));
      }
    });
  }, []);

  const parseAddress = (geo, lat, lng) => {
    const components = (type) =>
      geo.address_components.find((c) => c.types.includes(type))?.long_name || null;

    return {
      country: components("country"),
      state: components("administrative_area_level_1"),
      city:
        components("locality") || components("administrative_area_level_2"),
      street:
        components("route") || components("neighborhood") || geo.formatted_address,
      postal_code: components("postal_code"),
      formatted_address: geo.formatted_address,
      latitude: lat,
      longitude: lng,
      place_id: geo.place_id,
    };
  };

  const handleInput = (e) => {
    const input = e.target.value;
    setValue(input);
    setForm((prev) => ({ ...prev, address: input }));
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    const geoRes = await getGeocode({ address });
    const { lat, lng } = await getLatLng(geoRes[0]);
    setCoords({ lat, lng });

    const addressData = parseAddress(geoRes[0], lat, lng);
    console.log("📌 Selected Address Parsed:", addressData);

    setForm((prev) => ({ ...prev, address: addressData.formatted_address }));

    const token = localStorage.getItem("auth_token");
    if (token) {
      fetch("http://localhost:3000/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      })
        .then((res) => res.json())
        .then((result) => console.log("✅ Address submitted:", result))
        .catch((err) => console.error("❌ Failed to submit address:", err));
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search for your address"
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
        value={value}
        onChange={handleInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        disabled={!ready}
      />

      {focused && status === "OK" && (
        <ul className="bg-white border rounded shadow-sm max-h-48 overflow-auto text-sm z-10 relative">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {description}
            </li>
          ))}
        </ul>
      )}

      <div className="w-full h-64 border rounded-md overflow-hidden shadow">
        {isLoaded ? (
          <GoogleMap
            center={coords}
            zoom={15}
            mapContainerStyle={containerStyle}
            options={{ disableDefaultUI: true }}
          >
            <Marker position={coords} />
          </GoogleMap>
        ) : (
          <p className="text-sm text-gray-500 p-4">Loading map...</p>
        )}
      </div>
    </div>
  );
};

export default AddressStep;
