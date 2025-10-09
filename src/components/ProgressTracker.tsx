import type { Scene } from '../data/daniel';

export type TrailItem = {
  scene: Scene;
  choiceLabel?: string;
  choiceImpact?: 'canonical' | 'alternative';
};

type ProgressTrackerProps = {
  trail: TrailItem[];
};

export function ProgressTracker({ trail }: ProgressTrackerProps) {
  if (trail.length === 0) {
    return null;
  }

  const canonicalCount = trail.filter((item) => item.choiceImpact === 'canonical').length;

  return (
    <aside className="progress">
      <h3>Journey Log</h3>
      <ol>
        {trail.map((item, index) => (
          <li key={`${item.scene.id}-${index}`} className={item.choiceImpact ?? 'neutral'}>
            <span className="progress-step">{index + 1}</span>
            <div>
              <p className="progress-title">{item.scene.title}</p>
              <p className="progress-scripture">{item.scene.scripture}</p>
              {item.choiceLabel ? (
                <p className="progress-choice">
                  Choice: <span>{item.choiceLabel}</span>
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
      <p className="progress-summary">
        Canonical decisions chosen: <strong>{canonicalCount}</strong>
      </p>
    </aside>
  );
}
