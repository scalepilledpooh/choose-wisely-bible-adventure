import type { Scene } from '../data/daniel';

type SceneCardProps = {
  scene: Scene;
  onChoice: (choiceId: string) => void;
  disabled?: boolean;
};

export function SceneCard({ scene, onChoice, disabled }: SceneCardProps) {
  return (
    <section className="scene-card">
      <header>
        <p className="scene-eyebrow">{scene.scripture}</p>
        <h2>{scene.title}</h2>
      </header>
      <p className="scene-summary">{scene.summary}</p>
      <figure className="prompt">
        <figcaption>Image prompt</figcaption>
        <p>{scene.imagePrompt}</p>
      </figure>
      {scene.choices.length > 0 ? (
        <div className="choices">
          {scene.choices.map((choice) => (
            <button
              key={choice.id}
              className={`choice choice-${choice.impact}`}
              onClick={() => onChoice(choice.id)}
              disabled={disabled}
            >
              <span className="choice-label">{choice.label}</span>
              <span className="choice-outcome">{choice.outcome}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="finale">
          <p>This path concludes the story.</p>
        </div>
      )}
    </section>
  );
}
