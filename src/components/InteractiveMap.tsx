
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, Home, Phone, HeartPulse, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

// This would normally be stored in an environment variable
const MAPBOX_TOKEN = "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

// Types for resource locations
interface ResourceLocation {
  id: number;
  name: string;
  category: "shelter" | "healthcare" | "food" | "crisis";
  address: string;
  phone: string;
  lat: number;
  lng: number;
}

// Sample data for demonstration purposes
const resourceLocations: ResourceLocation[] = [
  {
    id: 1,
    name: "Downtown Emergency Shelter",
    category: "shelter",
    address: "123 Main St, Anytown, USA",
    phone: "(555) 123-4567",
    lat: 38.9072,
    lng: -77.0369
  },
  {
    id: 2,
    name: "Westside Community Clinic",
    category: "healthcare",
    address: "456 Health Ave, Anytown, USA",
    phone: "(555) 234-5678",
    lat: 38.9142,
    lng: -77.0400
  },
  {
    id: 3,
    name: "Eastside Food Pantry",
    category: "food",
    address: "789 Food Blvd, Anytown, USA",
    phone: "(555) 345-6789",
    lat: 38.9002,
    lng: -77.0339
  },
  {
    id: 4,
    name: "Crisis Support Center",
    category: "crisis",
    address: "321 Help St, Anytown, USA",
    phone: "(555) 456-7890",
    lat: 38.9112,
    lng: -77.0300
  }
];

// Map component configuration
interface InteractiveMapProps {
  initialLat?: number;
  initialLng?: number;
  initialZoom?: number;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  initialLat = 38.9072,
  initialLng = -77.0369,
  initialZoom = 12
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedResource, setSelectedResource] = useState<ResourceLocation | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const markerRefs = useRef<{ [key: number]: mapboxgl.Marker }>({});

  // Function to get marker color based on category
  const getMarkerColor = (category: string): string => {
    switch (category) {
      case "shelter":
        return "#3b82f6"; // blue
      case "healthcare":
        return "#ef4444"; // red
      case "food":
        return "#22c55e"; // green
      case "crisis":
        return "#f59e0b"; // amber
      default:
        return "#6b7280"; // gray
    }
  };

  // Function to get icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "shelter":
        return <Home className="h-5 w-5" />;
      case "healthcare":
        return <HeartPulse className="h-5 w-5" />;
      case "food":
        return <Utensils className="h-5 w-5" />;
      case "crisis":
        return <Phone className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  // Initialize map on component mount
  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Initialize Mapbox
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [initialLng, initialLat],
      zoom: initialZoom
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    
    // Add geolocate control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );

    // Add markers when map loads
    map.current.on("load", () => {
      addMarkers();
    });

    // Cleanup function
    return () => {
      map.current?.remove();
    };
  }, [initialLat, initialLng, initialZoom]);

  // Add markers for all resource locations
  const addMarkers = () => {
    if (!map.current) return;

    resourceLocations.forEach((location) => {
      // Create HTML element for marker
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundColor = getMarkerColor(location.category);
      el.style.width = "24px";
      el.style.height = "24px";
      el.style.borderRadius = "50%";
      el.style.display = "flex";
      el.style.justifyContent = "center";
      el.style.alignItems = "center";
      el.style.cursor = "pointer";
      el.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";
      
      // Create and add marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([location.lng, location.lat])
        .addTo(map.current);
      
      // Store marker reference
      markerRefs.current[location.id] = marker;
      
      // Add click event
      el.addEventListener("click", () => {
        setSelectedResource(location);
        map.current?.flyTo({
          center: [location.lng, location.lat],
          zoom: 15
        });
      });
    });
  };

  // Filter markers by category
  const filterByCategory = (category: string | null) => {
    setSelectedCategory(category);
    
    resourceLocations.forEach(location => {
      const marker = markerRefs.current[location.id];
      if (!marker) return;
      
      if (!category || location.category === category) {
        marker.getElement().style.display = "flex";
      } else {
        marker.getElement().style.display = "none";
      }
    });
  };

  return (
    <div className="w-full">
      {/* Category filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Button 
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => filterByCategory(null)}
          className="flex items-center gap-2"
        >
          <MapPin className="h-4 w-4" />
          All Resources
        </Button>
        <Button 
          variant={selectedCategory === "shelter" ? "default" : "outline"}
          size="sm"
          onClick={() => filterByCategory("shelter")}
          className="flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Shelters
        </Button>
        <Button 
          variant={selectedCategory === "healthcare" ? "default" : "outline"}
          size="sm"
          onClick={() => filterByCategory("healthcare")}
          className="flex items-center gap-2"
        >
          <HeartPulse className="h-4 w-4" />
          Healthcare
        </Button>
        <Button 
          variant={selectedCategory === "food" ? "default" : "outline"}
          size="sm" 
          onClick={() => filterByCategory("food")}
          className="flex items-center gap-2"
        >
          <Utensils className="h-4 w-4" />
          Food
        </Button>
        <Button 
          variant={selectedCategory === "crisis" ? "default" : "outline"}
          size="sm"
          onClick={() => filterByCategory("crisis")}
          className="flex items-center gap-2"
        >
          <Phone className="h-4 w-4" />
          Crisis Centers
        </Button>
      </div>
      
      {/* Map container */}
      <div className="relative">
        <div ref={mapContainer} className="w-full h-96 rounded-lg overflow-hidden" />
        
        {/* Resource information card */}
        {selectedResource && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-xs bg-white p-4 rounded-lg shadow-lg">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedResource(null)}
            >
              &times;
            </button>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-full" style={{backgroundColor: getMarkerColor(selectedResource.category)}}>
                {getCategoryIcon(selectedResource.category)}
              </div>
              <h3 className="text-lg font-bold">{selectedResource.name}</h3>
            </div>
            <div className="space-y-2 mt-4">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-1" />
                <span>{selectedResource.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href={`tel:${selectedResource.phone}`} className="text-blue-600 hover:underline">
                  {selectedResource.phone}
                </a>
              </p>
            </div>
            <div className="mt-4">
              <Button variant="default" size="sm" className="w-full">
                Get Directions
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveMap;
