import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import "../styles/Episodes.css";


interface Episode {
  id: number;
  name: string;
  air_date: string;
}

export default function Episodes() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    api.get("/episode").then((res) => setEpisodes(res.data.results));
  }, []);

  return (
    <div>
      <h2>Episódios</h2>
      {episodes.map((ep) => (
        <Link to={`/episodes/${ep.id}`} key={ep.id}>
          <div>
            <h3>{ep.name}</h3>
            <p>Data: {ep.air_date}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
