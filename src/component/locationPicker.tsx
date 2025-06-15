import React, { useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader, StandaloneSearchBox, Libraries } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "400px",
};

const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
};

interface PlaceInfo {
    lat: number;
    lng: number;
    city: string;
    neighborhood: string;
    district: string;
}

interface LocationPickerProps {
    setLocation: (location: PlaceInfo) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = (props) => {
    const { setLocation } = props;
    const [center, setCenter] = useState(defaultCenter);
    const [placeInfo, setPlaceInfo] = useState<PlaceInfo | null>(null);
    const autocompleteRef = useRef<google.maps.places.SearchBox | null>(null);
    const [libraries] = useState<Libraries>(["drawing", "geometry", "places", "visualization"]);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBKO9OFZ8qypY2eykvm2rVNt-yA0oSDddw", // replace this
        libraries,
    });

    const fetchPlaceInfo = async (lat: number, lng: number) => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBKO9OFZ8qypY2eykvm2rVNt-yA0oSDddw`);
        const data = await response.json();
        console.log({ data });
        if (data.status === "OK") {
            console.log("==>", data.results);
            const components = data.results[0]?.address_components || [];

            const getComponent = (types: string[]): string => components.find((c: any) => types.every((t) => c.types.includes(t)))?.long_name || "";

            setPlaceInfo({
                lat,
                lng,
                city: getComponent(["locality"]),
                neighborhood: getComponent(["sublocality", "sublocality_level_1"]),
                district: getComponent(["administrative_area_level_2"]),
            });
            setLocation({
                lat,
                lng,
                city: getComponent(["locality"]),
                neighborhood: getComponent(["sublocality", "sublocality_level_1"]),
                district: getComponent(["administrative_area_level_2"]),
            });
        }
    };

    const onPlaceChanged = async () => {
        if (!autocompleteRef.current) return;

        const place = autocompleteRef.current.getPlaces();
        if (place && place?.length === 1) {
            const newPosition = place[0]?.geometry?.location?.toJSON();

            if (newPosition) {
                setCenter({ lat: newPosition.lat, lng: newPosition.lng });
                // await fetchPlaceInfo(newPosition.lat, newPosition.lng);
            }
        }
    };

    const handleDoubleClick = async (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            console.log({ lat, lng });
            setCenter({ lat, lng });
            await fetchPlaceInfo(lat, lng);
        }
    };

    const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setCenter({ lat, lng });
            fetchPlaceInfo(lat, lng);
        }
    };
    console.log({ placeInfo });
    if (!isLoaded) return <div>Loading map...</div>;

    return (
        <div className="rounded-xl shadow-lg p-4 bg-white">
            <StandaloneSearchBox onLoad={(ref) => (autocompleteRef.current = ref)} onPlacesChanged={onPlaceChanged}>
                <input type="text" placeholder="Search a place" className="w-full p-2 mb-2.5 border border-gray-300 rounded-md" />
            </StandaloneSearchBox>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
                onDblClick={handleDoubleClick}
                onLoad={(map) => {
                    if (autocompleteRef.current) {
                        map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(autocompleteRef.current as unknown as HTMLElement);
                    }
                }}>
                <Marker position={center} onDragEnd={handleMarkerDragEnd} />
            </GoogleMap>

            {placeInfo && (
                <div style={{ marginTop: "1rem" }}>
                    <p>
                        <strong>Latitude:</strong> {placeInfo.lat}
                    </p>
                    <p>
                        <strong>Longitude:</strong> {placeInfo.lng}
                    </p>
                    <p>
                        <strong>City:</strong> {placeInfo.city}
                    </p>
                    <p>
                        <strong>Neighborhood:</strong> {placeInfo.neighborhood}
                    </p>
                    <p>
                        <strong>District:</strong> {placeInfo.district}
                    </p>
                </div>
            )}
        </div>
    );
};

export default LocationPicker;

//<script async defer
//   src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBKO9OFZ8qypY2eykvm2rVNt-yA0oSDddw">
// </script>
// GOOGLE MAPS API KEY AIzaSyBKO9OFZ8qypY2eykvm2rVNt-yA0oSDddw

// another api key AIzaSyBKO9OFZ8qypY2eykvm2rVNt-yA0oSDddw
