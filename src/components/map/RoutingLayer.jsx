import { useEffect, useMemo } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

export default function RoutingLayer({ start, end }) {
  const map = useMap();

  const waypoints = useMemo(() => {
    return [
      L.latLng(start.lat, start.lng),
      L.latLng(end.lat, end.lng),
    ];
  }, [start, end]);

  useEffect(() => {
    if (!map) return;

    const control = L.Routing.control({
      waypoints,
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1", // 데모
      }),
      showAlternatives: true,
      fitSelectedRoutes: true,
      addWaypoints: false,     // 사용자가 드래그로 경유지 추가 못 하게
      routeWhileDragging: false,
      draggableWaypoints: false,
      lineOptions: {
        extendToWaypoints: true,
        missingRouteTolerance: 0,
      },
      altLineOptions: {
        extendToWaypoints: true,
        missingRouteTolerance: 0,
      },
      createMarker: () => null, // 마커는 react-leaflet Marker로 이미 표시하므로 숨김
    }).addTo(map);

    return () => {
      map.removeControl(control);
    };
  }, [map, waypoints]);

  return null;
}
