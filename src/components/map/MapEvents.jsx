// src/components/map/MapEvents.jsx
import { useMapEvents } from "react-leaflet";

export default function MapEvents({ onBoundsChange, onClickLatLng }) {
  useMapEvents({
    moveend(e) {
      onBoundsChange?.(e.target.getBounds());
    },
    zoomend(e) {
      onBoundsChange?.(e.target.getBounds());
    },
    click(e) {
      onClickLatLng?.(e.latlng);
    },
  });

  return null;
}
