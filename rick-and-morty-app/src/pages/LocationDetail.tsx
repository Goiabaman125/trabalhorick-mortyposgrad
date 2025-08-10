import  { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";

interface Character {
  id: number;
  name: string;
  image: string;
}

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

export default function LocationDetail() {
  const { id } = useParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [residents, setResidents] = useState<Character[]>([]);

  useEffect(() => {
    api.get(`/location/${id}`).then((res) => {
      setLocation(res.data);
      const ids = res.data.residents.map((url: string) => url.split("/").pop());
      api.get(`/character/${ids.join(",")}`).then((res) => {
        setResidents(Array.isArray(res.data) ? res.data : [res.data]);
      });
    });
  }, [id]);

  if (!location) return <p>Carregando...</p>;

  return (
    <div>
      <h2>{location.name}</h2>
      <p>Tipo: {location.type}</p>
      <p>Dimensão: {location.dimension}</p>
      <h3>Residentes</h3>
      {residents.map((char) => (
        <Link to={`/characters/${char.id}`} key={char.id}>
          <img src={char.image} alt={char.name} />
          <p>{char.name}</p>
        </Link>
      ))}
    </div>
  );
}
