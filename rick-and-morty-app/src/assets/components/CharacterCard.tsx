import './CharacterCard.css';

interface CharacterCardProps {
  name: string;
  image: string;
  status: string;
  species: string;
  location: string;
}

export default function CharacterCard({
  name,
  image,
  status,
  species,
  location,
}: CharacterCardProps) {
  return (
    <div className="card">
      <img src={image} alt={name} />
      <div className="card-content">
        <h3>{name}</h3>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Espécie:</strong> {species}</p>
        <p><strong>Localização:</strong> {location}</p>
      </div>
    </div>
  );
}
