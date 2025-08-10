import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import CharacterCard from "../assets/components/CharacterCard";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  location: { name: string };
}

export default function Characters() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    api.get("/character").then((res) => setCharacters(res.data.results));
  }, []);

  return (
    <div>
      <h2>Personagens</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {characters.map((char) => (
          <Link
            to={`/characters/${char.id}`}
            key={char.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <CharacterCard
              name={char.name}
              image={char.image}
              status={char.status}
              species={char.species}
              location={char.location.name}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
