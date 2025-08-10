import  { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  characters: string[];
}

interface Character {
  id: number;
  name: string;
  image: string;
}

export default function EpisodeDetail() {
  const { id } = useParams();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    api.get(`/episode/${id}`).then((res) => {
      setEpisode(res.data);
      const ids = res.data.characters.map((url: string) => url.split("/").pop());
      api.get(`/character/${ids.join(",")}`).then((res) => {
        setCharacters(Array.isArray(res.data) ? res.data : [res.data]);
      });
    });
  }, [id]);

  if (!episode) return <p>Carregando...</p>;

  return (
    <div>
      <h2>{episode.name}</h2>
      <p>Data: {episode.air_date}</p>
      <h3>Personagens</h3>
      {characters.map((char) => (
        <Link to={`/characters/${char.id}`} key={char.id}>
          <img src={char.image} alt={char.name} />
          <p>{char.name}</p>
        </Link>
      ))}
    </div>
  );
}
