
import React, { useEffect, useRef, useState } from "react";
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Icon, Style } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Overlay from 'ol/Overlay';
import 'ol/ol.css';
import { Home, Phone, HeartPulse, Utensils, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

// Resource location interface
interface ResourceLocation {
  id: number;
  name: string;
  category: "shelter" | "healthcare" | "food" | "crisis";
  address: string;
  phone: string;
  lat: number;
  lng: number;
}

// Sample resource locations
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

interface InteractiveMapProps {
  initialLat?: number;
  initialLng?: number;
  initialZoom?: number;
  fullScreen?: boolean;
  onViewFullMap?: () => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  initialLat = 38.9072,
  initialLng = -77.0369,
  initialZoom = 12,
  fullScreen = false,
  onViewFullMap
}) => {
  console.log("Rendering InteractiveMap component with simplified approach");
  
  const mapElement = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const popupOverlayRef = useRef<Overlay | null>(null);
  
  const [selectedResource, setSelectedResource] = useState<ResourceLocation | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleResources, setVisibleResources] = useState<ResourceLocation[]>(resourceLocations);
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);

  // Get marker color based on category
  const getMarkerColor = (category: string): string => {
    switch (category) {
      case "shelter": return "#3b82f6";
      case "healthcare": return "#ef4444";
      case "food": return "#22c55e";
      case "crisis": return "#f59e0b";
      default: return "#6b7280";
    }
  };

  // Get category icon component
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "shelter": return <Home className="h-5 w-5" />;
      case "healthcare": return <HeartPulse className="h-5 w-5" />;
      case "food": return <Utensils className="h-5 w-5" />;
      case "crisis": return <Phone className="h-5 w-5" />;
      default: return <MapPin className="h-5 w-5" />;
    }
  };

  // Create marker icon as canvas
  const createMarkerIcon = (category: string): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    if (context) {
      context.beginPath();
      context.arc(16, 16, 12, 0, 2 * Math.PI);
      context.fillStyle = getMarkerColor(category);
      context.fill();
      context.strokeStyle = 'white';
      context.lineWidth = 3;
      context.stroke();
      
      context.beginPath();
      context.arc(16, 16, 4, 0, 2 * Math.PI);
      context.fillStyle = 'white';
      context.fill();
    }
    return canvas;
  };

  // Filter resources by category
  const filterByCategory = (category: string | null) => {
    console.log(`Filtering by category: ${category || 'all'}`);
    setSelectedCategory(category);
    
    if (category === null) {
      setVisibleResources(resourceLocations);
    } else {
      setVisibleResources(resourceLocations.filter(resource => resource.category === category));
    }
    
    if (mapRef.current) {
      const vectorLayer = mapRef.current.getLayers().getArray().find(
        layer => layer instanceof VectorLayer
      ) as VectorLayer<VectorSource> | undefined;
      
      if (vectorLayer && vectorLayer.getSource()) {
        const features = vectorLayer.getSource()?.getFeatures() || [];
        
        features.forEach(feature => {
          const properties = feature.get('properties') as ResourceLocation;
          
          if (category === null || properties.category === category) {
            feature.setStyle(new Style({
              image: new Icon({
                img: createMarkerIcon(properties.category),
                scale: 1
              })
            }));
          } else {
            feature.setStyle(new Style({}));
          }
        });
      }
    }
  };

  // Initialize map
  useEffect(() => {
    if (!mapElement.current) {
      console.error("Map container not available");
      return;
    }

    console.log("Initializing map with simple approach");
    setIsLoading(true);
    setMapError(null);

    // Create vector source for markers
    const vectorSource = new VectorSource();
    
    // Create vector layer for markers
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      zIndex: 10
    });

    // Base map with OSM tiles
    const baseLayer = new TileLayer({
      source: new OSM()
    });

    // Initialize map
    try {
      // If map already exists, destroy it first
      if (mapRef.current) {
        mapRef.current.setTarget(undefined);
      }

      // Create new map
      const map = new Map({
        target: mapElement.current,
        layers: [baseLayer, vectorLayer],
        view: new View({
          center: fromLonLat([initialLng, initialLat]),
          zoom: initialZoom
        }),
        controls: []
      });

      mapRef.current = map;

      // Add popup overlay if reference exists
      if (popupRef.current) {
        popupOverlayRef.current = new Overlay({
          element: popupRef.current,
          autoPan: true,
          positioning: 'bottom-center',
          offset: [0, -15]
        });
        map.addOverlay(popupOverlayRef.current);
      }

      // Add markers for each resource
      resourceLocations.forEach(location => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([location.lng, location.lat])),
          properties: location
        });

        // Set marker style
        feature.setStyle(new Style({
          image: new Icon({
            img: createMarkerIcon(location.category),
            scale: 1
          })
        }));

        vectorSource.addFeature(feature);
      });

      // Handle map click
      map.on('click', (event) => {
        const feature = map.forEachFeatureAtPixel(event.pixel, feature => feature);

        if (feature) {
          const properties = feature.get('properties') as ResourceLocation;
          setSelectedResource(properties);
          
          if (popupOverlayRef.current) {
            const geometry = feature.getGeometry();
            if (geometry && geometry.getType() === 'Point') {
              const coordinates = (geometry as Point).getCoordinates();
              popupOverlayRef.current.setPosition(coordinates);
            }
          }
        } else {
          setSelectedResource(null);
          
          if (popupOverlayRef.current) {
            popupOverlayRef.current.setPosition(undefined);
          }
        }
      });

      // Force map to update its size after rendering
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.updateSize();
          setIsLoading(false);
          console.log("Map initialized successfully");
        }
      }, 300);

    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError(`Failed to initialize map: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsLoading(false);
    }

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(undefined);
        mapRef.current = null;
      }
    };
  }, [initialLat, initialLng, initialZoom]);

  // Update markers when category changes
  useEffect(() => {
    if (mapRef.current) {
      filterByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.updateSize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Display error message
  if (mapError) {
    return (
      <div className="w-full p-6 bg-red-50 rounded-lg shadow-inner flex items-center justify-center" style={{ height: fullScreen ? '600px' : '400px' }}>
        <div className="text-center">
          <p className="text-red-600 font-medium mb-4">{mapError}</p>
          <Button onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </div>
      </div>
    );
  }

  // Display loading state
  if (isLoading) {
    return (
      <div className="w-full p-6 bg-gray-50 rounded-lg shadow-inner flex items-center justify-center" style={{ height: fullScreen ? '600px' : '400px' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map resources...</p>
        </div>
      </div>
    );
  }

  // Render map and controls
  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => filterByCategory(null)}
                className="flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                All Resources ({resourceLocations.length})
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Show all resource types
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={selectedCategory === "shelter" ? "default" : "outline"}
                size="sm"
                onClick={() => filterByCategory("shelter")}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Shelters ({resourceLocations.filter(r => r.category === "shelter").length})
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Emergency and transitional shelters
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={selectedCategory === "healthcare" ? "default" : "outline"}
                size="sm"
                onClick={() => filterByCategory("healthcare")}
                className="flex items-center gap-2"
              >
                <HeartPulse className="h-4 w-4" />
                Healthcare ({resourceLocations.filter(r => r.category === "healthcare").length})
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Medical and mental health services
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={selectedCategory === "food" ? "default" : "outline"}
                size="sm" 
                onClick={() => filterByCategory("food")}
                className="flex items-center gap-2"
              >
                <Utensils className="h-4 w-4" />
                Food ({resourceLocations.filter(r => r.category === "food").length})
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Food pantries and meal programs
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={selectedCategory === "crisis" ? "default" : "outline"}
                size="sm"
                onClick={() => filterByCategory("crisis")}
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Crisis Centers ({resourceLocations.filter(r => r.category === "crisis").length})
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Emergency support and crisis intervention
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="relative">
        {/* Map Container */}
        <div 
          ref={mapElement} 
          className="w-full rounded-lg overflow-hidden bg-gray-100 shadow-inner"
          style={{ 
            height: fullScreen ? '600px' : '400px',
            border: '1px solid #ddd'
          }}
        ></div>
        
        {/* Popup Overlay */}
        <div 
          ref={popupRef} 
          className="absolute bg-white rounded-lg shadow-lg p-4 transform -translate-x-1/2 z-50"
          style={{ 
            maxWidth: '250px',
            bottom: '12px',
            pointerEvents: 'auto',
            display: selectedResource ? 'block' : 'none'
          }}
        >
          {selectedResource && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-full" style={{ backgroundColor: getMarkerColor(selectedResource.category) }}>
                  {getCategoryIcon(selectedResource.category)}
                </div>
                <h3 className="font-bold text-sm">{selectedResource.name}</h3>
              </div>
              <p className="text-xs text-gray-600 mb-2">{selectedResource.address}</p>
              <div className="flex items-center gap-1 text-xs text-blue-600 mb-3">
                <Phone className="h-3 w-3" />
                <span>{selectedResource.phone}</span>
              </div>
              <Button size="sm" className="w-full">Get Directions</Button>
            </>
          )}
        </div>
        
        {/* View Full Map Button */}
        {!fullScreen && onViewFullMap && (
          <div className="absolute bottom-3 right-3">
            <Button 
              variant="secondary" 
              size="sm" 
              className="shadow-md bg-white/90 hover:bg-white text-gray-800"
              onClick={onViewFullMap}
            >
              View Full Map
            </Button>
          </div>
        )}
      </div>
      
      {/* Legend (for full screen view) */}
      {fullScreen && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-bold mb-2">Map Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { category: "shelter", label: "Shelters" },
              { category: "healthcare", label: "Healthcare" },
              { category: "food", label: "Food Resources" },
              { category: "crisis", label: "Crisis Centers" }
            ].map((item) => (
              <div key={item.category} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getMarkerColor(item.category) }}></div>
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Resource list (for full screen view) */}
      {fullScreen && (
        <div className="mt-4">
          <h3 className="font-bold mb-3">
            {selectedCategory 
              ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Resources (${visibleResources.length})` 
              : `All Resources (${visibleResources.length})`
            }
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {visibleResources.map((resource) => (
              <div 
                key={resource.id} 
                className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md cursor-pointer transition-shadow"
                onClick={() => {
                  setSelectedResource(resource);
                  if (mapRef.current) {
                    mapRef.current.getView().animate({
                      center: fromLonLat([resource.lng, resource.lat]),
                      zoom: 15,
                      duration: 500
                    });
                    
                    if (popupOverlayRef.current) {
                      popupOverlayRef.current.setPosition(
                        fromLonLat([resource.lng, resource.lat])
                      );
                    }
                  }
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full mt-1" style={{ backgroundColor: getMarkerColor(resource.category) }}>
                    {getCategoryIcon(resource.category)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{resource.name}</h4>
                    <p className="text-sm text-gray-600">{resource.address}</p>
                    <div className="flex items-center gap-1 text-sm text-blue-600 mt-1">
                      <Phone className="h-3.5 w-3.5" />
                      <span>{resource.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
