import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import MiaLogo from "../../assets/mia.svg";
import api from "../../services/api";
import { Container } from "./style";

interface ILatAndLong {
  latitude: number;
  longitude: number;
}

interface InfectedLocation {
  created_at: string;
  disease_id: string;
  id: string;
  latitude: string;
  longitude: string;
  user_id: string;
}

const locationMarkerColor = { color: "red" };

export default function Home() {
  const [userLocation, setUserLocation] = useState<ILatAndLong>({
    latitude: 0,
    longitude: 0,
  });
  const [infectedLocation, setInfectedLocation] = useState<InfectedLocation[]>(
    []
  );

  useEffect(() => {
    function getuserLocation() {
      const location = window.navigator && window.navigator.geolocation;
      if (location) {
        location.getCurrentPosition((position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      }
    }
    getuserLocation();
  }, []);

  useEffect(() => {
    async function getInfectedLocations() {
      const { data } = await api.get("/infected");
      setInfectedLocation(data);
    }
    getInfectedLocations();
  }, []);

  return (
    <Container>
        <img src={MiaLogo} height="70" className="miaLogo" alt="mia logo"/>
      {userLocation.latitude !== 0 && (
        <MapContainer
          center={[userLocation.latitude, userLocation.longitude]}
          zoom={14.5}
          scrollWheelZoom={true}
          zoomControl={false}
          className="leafMap"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {infectedLocation?.map((location) => (
            <Circle
              center={[Number(location.latitude), Number(location.longitude)]}
              pathOptions={locationMarkerColor}
              radius={100}
            />
          ))}
        </MapContainer>
      )}
    </Container>
  );
}
