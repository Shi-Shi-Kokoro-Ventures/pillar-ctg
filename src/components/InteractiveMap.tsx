import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, Home, Phone, HeartPulse, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import LoadingSpinner from "./LoadingSpinner";

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

// Sample data for demonstration purposes - expanded with more locations per category
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
  },
  {
    id: 5,
    name: "North Side Shelter",
    category: "shelter",
    address: "555 North Ave, Anytown, USA",
    phone: "(555) 567-8901",
    lat: 38.9200,
    lng: -77.0350
  },
  {
    id: 6,
    name: "Family Health Center",
    category: "healthcare",
    address: "777 Medical Dr, Anytown, USA",
    phone: "(555) 678-9012",
    lat: 38.9050,
    lng: -77.0450
  },
  {
    id: 7,
    name: "Community Food Bank",
    category: "food",
    address: "888 Hunger St, Anytown, USA",
    phone: "(555) 789-0123",
    lat: 38.9100,
    lng: -77.0250
  },
  {
    id: 8,
    name: "Mental Health Crisis Line",
    category: "crisis",
    address: "999 Support Lane, Anytown, USA",
    phone: "(555) 890-1234",
    lat: 38.9150,
    lng: -77.0420
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
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [visibleResources, setVisibleResources] = useState<ResourceLocation[]>(resourceLocations);
  const [isLoadingToken, setIsLoadingToken] = useState<boolean>(true);

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

  // Fetch Mapbox token from Supabase Edge Function
  useEffect(() => {
    const fetchMapboxToken = async () => {
      try {
        console.log("Fetching Mapbox token...");
        setIsLoadingToken(true);
        
        const { data, error } = await supabase.functions.invoke('get-mapbox-token');
        
        if (error) {
          console.error('Error fetching Mapbox token:', error);
          setMapError('Could not load the map. Please try again later.');
          setIsLoadingToken(false);
          toast.error('Error loading map: Could not retrieve map token');
          return;
        }
        
        console.log("Token response:", data ? "Token received" : "No token data");
        
        if (!data?.token) {
          setMapError('Mapbox token not found');
          setIsLoadingToken(false);
          toast.error('Error loading map: Token not available');
          return;
        }

        // Initialize map with token
        console.log("Initializing map...");
        initializeMap(data.token);
        setIsLoadingToken(false);
      } catch (error) {
        console.error('Error in fetchMapboxToken:', error);
        setMapError('An unexpected error occurred while loading the map');
        setIsLoadingToken(false);
        toast.error('Error loading map: Unexpected error');
      }
    };

    fetchMapboxToken();
  }, [initialLat, initialLng, initialZoom]);

  // Initialize map with the token
  const initializeMap = (token: string) => {
    if (!mapContainer.current) {
      console.error("Map container not available");
      return;
    }
    
    try {
      console.log("Setting Mapbox token...");
      
      // Initialize Mapbox
      mapboxgl.accessToken = token;
      
      console.log("Creating map instance...");
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [initialLng, initialLat],
        zoom: initialZoom
      });

      console.log("Adding map controls...");
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
        console.log("Map loaded, setting mapLoaded state");
        setMapLoaded(true);
        addMarkers();
      });

      // Handle errors
      map.current.on("error", (e) => {
        console.error("Mapbox error:", e);
        setMapError('An error occurred with the map');
        toast.error('Map error: Please refresh the page');
      });

      // Cleanup function
      return () => {
        if (map.current) {
          console.log("Removing map");
          map.current.remove();
        }
      };
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError('Could not initialize the map: ' + (error instanceof Error ? error.message : String(error)));
      toast.error('Error initializing map');
    }
  };

  // Add markers for all resource locations
  const addMarkers = () => {
    if (!map.current) return;

    // Clear existing markers
    Object.values(markerRefs.current).forEach(marker => {
      marker.remove();
    });
    markerRefs.current = {};

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
      
      // Set initial visibility based on selected category
      if (selectedCategory && location.category !== selectedCategory) {
        el.style.display = "none";
      }
      
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

  // Filter markers by category and fit the map to show them
  const filterByCategory = (category: string | null) => {
    setSelectedCategory(category);
    
    let filtered: ResourceLocation[] = [];
    
    resourceLocations.forEach(location => {
      const marker = markerRefs.current[location.id];
      if (!marker) return;
      
      if (!category || location.category === category) {
        marker.getElement().style.display = "flex";
        filtered.push(location);
      } else {
        marker.getElement().style.display = "none";
      }
    });
    
    setVisibleResources(filtered);
    
    // If we have filtered locations, fit map to show them all
    if (filtered.length > 0 && map.current) {
      // Create bounds object
      const bounds = new mapboxgl.LngLatBounds();
      
      // Extend bounds to include all filtered locations
      filtered.forEach(location => {
        bounds.extend([location.lng, location.lat]);
      });
      
      // Fit map to these bounds with some padding
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 14
      });
    }
  };

  // Effect to update markers when selected category changes
  useEffect(() => {
    if (mapLoaded && map.current) {
      filterByCategory(selectedCategory);
    }
  }, [selectedCategory, mapLoaded]);

  // Show loading state with more details
  if (isLoadingToken) {
    return (
      <div className="w-full p-6 bg-gray-50 rounded-lg shadow-inner flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 mb-2">Loading map resources...</p>
          <p className="text-sm text-gray-500">Retrieving map information</p>
        </div>
      </div>
    );
  }

  // Show more detailed error message if there's a problem
  if (mapError) {
    return (
      <div className="w-full p-6 bg-red-50 rounded-lg border border-red-200">
        <h3 className="text-xl font-medium mb-4 text-red-700">Map Error</h3>
        <p className="mb-4 text-red-600">{mapError}</p>
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
          <Button
            variant="default"
            onClick={() => {
              setMapError(null);
              setIsLoadingToken(true);
              const fetchMapboxToken = async () => {
                try {
                  const { data, error } = await supabase.functions.invoke('get-mapbox-token');
                  
                  if (error || !data?.token) {
                    throw new Error(error?.message || 'Token not available');
                  }
                  
                  initializeMap(data.token);
                  setIsLoadingToken(false);
                } catch (error) {
                  setMapError('Failed to retry: ' + (error instanceof Error ? error.message : String(error)));
                  setIsLoadingToken(false);
                }
              };
              fetchMapboxToken();
            }}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

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
          All Resources ({resourceLocations.length})
        </Button>
        <Button 
          variant={selectedCategory === "shelter" ? "default" : "outline"}
          size="sm"
          onClick={() => filterByCategory("shelter")}
          className="flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Shelters ({resourceLocations.filter(r => r.category === "shelter").length})
        </Button>
        <Button 
          variant={selectedCategory === "healthcare" ? "default" : "outline"}
          size="sm"
          onClick={() => filterByCategory("healthcare")}
          className="flex items-center gap-2"
        >
          <HeartPulse className="h-4 w-4" />
          Healthcare ({resourceLocations.filter(r => r.category === "healthcare").length})
        </Button>
        <Button 
          variant={selectedCategory === "food" ? "default" : "outline"}
          size="sm" 
          onClick={() => filterByCategory("food")}
          className="flex items-center gap-2"
        >
          <Utensils className="h-4 w-4" />
          Food ({resourceLocations.filter(r => r.category === "food").length})
        </Button>
        <Button 
          variant={selectedCategory === "crisis" ? "default" : "outline"}
          size="sm"
          onClick={() => filterByCategory("crisis")}
          className="flex items-center gap-2"
        >
          <Phone className="h-4 w-4" />
          Crisis Centers ({resourceLocations.filter(r => r.category === "crisis").length})
        </Button>
      </div>
      
      {/* Map container */}
      <div className="relative">
        <div ref={mapContainer} className="w-full h-96 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
          {!mapLoaded && !mapError && (
            <div className="text-center p-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading map...</p>
              <p className="text-sm text-gray-400 mt-2">This may take a moment</p>
            </div>
          )}
        </div>
        
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
        
        {/* No resources message */}
        {mapLoaded && selectedCategory && visibleResources.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <div className="text-center p-6">
              <p className="text-gray-700 font-medium">No {selectedCategory} resources found in this area.</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => filterByCategory(null)}
                className="mt-4"
              >
                Show All Resources
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveMap;
