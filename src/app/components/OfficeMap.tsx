import React from "react";
import GoogleMapReact from "google-map-react";
import Image from "next/image";
const AnyReactComponent: React.FC<{ text: string }> = ({ text }) => (
  <div>{text}</div>
);

const Marker: React.FC = () => {
  return (
    <Image
      className="flex justify-center items-center"
      src="/pin.svg"
      alt="Map marker"
      width={24}
      height={24}
    />
  );
};
export default function OfficeMap({ lat, lng }: { lat: number; lng: number }) {
  const defaultProps = {
    center: {
      lat: lat,
      lng: lng,
    },
    zoom: 16,
  };

  return (
    // Important! Always set the container height explicitly
    <div
      style={{ height: "100%", width: "100%" }}
      className="aspect-square w-full h-full"
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <Marker />
      </GoogleMapReact>
    </div>
  );
}
