import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import "../styles/Locations.css";


interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

export default function Locations() {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    api.get("/location").then((res) => setLocations(res.data.results));
  }, []);

  return (
    <div>
      <h2>Localizações</h2>
      {locations.map((loc) => (
        <Link to={`/locations/${loc.id}`} key={loc.id}>
          <div>
            <h3>{loc.name}</h3>
            <p>Tipo: {loc.type}</p>
            <p>Dimensão: {loc.dimension}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
