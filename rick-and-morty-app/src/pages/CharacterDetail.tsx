import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  origin: { name: string };
  location: { name: string };
  episode: string[];
}

interface Episode {
  id: number;
  name: string;
}

export default function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    api.get(`/character/${id}`).then((res) => {
      setCharacter(res.data);

      const episodeIds = res.data.episode.map((url: string) =>
        url.split("/").pop()
      );

      api.get(`/episode/${episodeIds.join(",")}`).then((res) => {
        setEpisodes(Array.isArray(res.data) ? res.data : [res.data]);
      });
    });
  }, [id]);

  if (!character) return <p>Carregando...</p>;

  return (
    <div>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Espécie: {character.species}</p>
      <p>Origem: {character.origin.name}</p>
      <p>Localização: {character.location.name}</p>
      <h3>Episódios</h3>
      <ul>
        {episodes.map((ep: Episode) => (
          <li key={ep.id}>
            <Link to={`/episodes/${ep.id}`}>{ep.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
