import "./CharacterBuilder.css";

export const DEFAULT_CHARACTER = {
  skin: "#e8b896",
  hair: "long",
  hairColor: "#2c1810",
  outfit: "#a65e78",
  accessory: "flower",
};

const SKINS = [
  { id: "#f5d0c5", label: "Light" },
  { id: "#e8b896", label: "Warm" },
  { id: "#c68642", label: "Medium" },
  { id: "#8d5524", label: "Deep" },
];

const HAIRS = [
  { id: "short", label: "Short" },
  { id: "long", label: "Long" },
  { id: "curly", label: "Curly" },
  { id: "bun", label: "Bun" },
];

const HAIR_COLORS = [
  { id: "#2c1810", label: "Dark" },
  { id: "#6b4423", label: "Brown" },
  { id: "#d4a574", label: "Blonde" },
  { id: "#e8a0bf", label: "Pink" },
];

const OUTFITS = [
  { id: "#a65e78", label: "Rose" },
  { id: "#9b7bc4", label: "Lilac" },
  { id: "#619d88", label: "Sage" },
  { id: "#6e9abd", label: "Sky" },
];

const ACCESSORIES = [
  { id: "none", label: "None", icon: "" },
  { id: "flower", label: "Flower", icon: "✿" },
  { id: "star", label: "Star", icon: "✦" },
  { id: "heart", label: "Heart", icon: "♥" },
];

export function CharacterAvatar({ character = DEFAULT_CHARACTER, size = "md" }) {
  const c = { ...DEFAULT_CHARACTER, ...character };
  return (
    <div className={`character-avatar size-${size}`} aria-hidden="true">
      <div className="avatar-body" style={{ background: c.outfit }} />
      <div className="avatar-neck" style={{ background: c.skin }} />
      <div className="avatar-head" style={{ background: c.skin }}>
        <div className={`avatar-hair hair-${c.hair}`} style={{ background: c.hairColor }} />
        <div className="avatar-face">
          <span className="avatar-eye" /><span className="avatar-eye" />
          <span className="avatar-smile" />
        </div>
        {c.accessory !== "none" && (
          <span className="avatar-accessory">
            {ACCESSORIES.find((item) => item.id === c.accessory)?.icon}
          </span>
        )}
      </div>
    </div>
  );
}

export default function CharacterBuilder({ value, onChange }) {
  const character = { ...DEFAULT_CHARACTER, ...value };

  const set = (key, val) => onChange({ ...character, [key]: val });

  return (
    <div className="character-builder">
      <div className="character-preview-wrap">
        <CharacterAvatar character={character} size="lg" />
        <p>Your wellness companion</p>
      </div>

      <fieldset className="character-options">
        <legend>Skin tone</legend>
        <div className="option-row">
          {SKINS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`swatch ${character.skin === item.id ? "selected" : ""}`}
              style={{ background: item.id }}
              aria-label={item.label}
              aria-pressed={character.skin === item.id}
              onClick={() => set("skin", item.id)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="character-options">
        <legend>Hair style</legend>
        <div className="option-row pills">
          {HAIRS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={character.hair === item.id ? "selected" : ""}
              aria-pressed={character.hair === item.id}
              onClick={() => set("hair", item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="character-options">
        <legend>Hair colour</legend>
        <div className="option-row">
          {HAIR_COLORS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`swatch ${character.hairColor === item.id ? "selected" : ""}`}
              style={{ background: item.id }}
              aria-label={item.label}
              aria-pressed={character.hairColor === item.id}
              onClick={() => set("hairColor", item.id)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="character-options">
        <legend>Outfit</legend>
        <div className="option-row">
          {OUTFITS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`swatch outfit ${character.outfit === item.id ? "selected" : ""}`}
              style={{ background: item.id }}
              aria-label={item.label}
              aria-pressed={character.outfit === item.id}
              onClick={() => set("outfit", item.id)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="character-options">
        <legend>Accessory</legend>
        <div className="option-row pills">
          {ACCESSORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={character.accessory === item.id ? "selected" : ""}
              aria-pressed={character.accessory === item.id}
              onClick={() => set("accessory", item.id)}
            >
              {item.icon ? `${item.icon} ${item.label}` : item.label}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
