/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useMapEvents } from "react-leaflet";

export function AddMarkerToClick({ onMapClick }) {
  useMapEvents({
    click(e) {
      //   onMapClick(e.latlng);
    },
    contextmenu(e) {
      onMapClick(e.latlng);
    },
  });

  return <></>;
}
