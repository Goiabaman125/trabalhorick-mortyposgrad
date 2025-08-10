// src/components/Header.tsx
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/characters">Personagens</Link></li>
          <li><Link to="/episodes">Episódios</Link></li>
          <li><Link to="/locations">Localizações</Link></li>
        </ul>
      </nav>
    </header>
  );
}
