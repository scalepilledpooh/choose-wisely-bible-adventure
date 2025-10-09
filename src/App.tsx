import { useMemo, useState } from 'react';
import { danielStory, type Scene } from './data/daniel';
import { ProgressTracker, type TrailItem } from './components/ProgressTracker';
import { SceneCard } from './components/SceneCard';

function getScene(sceneId: string): Scene {
  return danielStory.scenes[sceneId];
}

export default function App() {
  const initialScene = useMemo(() => getScene(danielStory.entrySceneId), []);
  const [currentSceneId, setCurrentSceneId] = useState(initialScene.id);
  const [trail, setTrail] = useState<TrailItem[]>([{ scene: initialScene }]);

  const currentScene = getScene(currentSceneId);
  const isComplete = currentScene.finale ?? currentScene.choices.length === 0;

  const handleChoice = (choiceId: string) => {
    const choice = currentScene.choices.find((item) => item.id === choiceId);
    if (!choice) {
      return;
    }

    const nextScene = getScene(choice.nextSceneId);
    setTrail((previous) => {
      const updated = [...previous];
      const lastIndex = updated.length - 1;
      const lastItem = updated[lastIndex];
      updated[lastIndex] = {
        ...lastItem,
        choiceLabel: choice.label,
        choiceImpact: choice.impact
      };
      updated.push({ scene: nextScene });
      return updated;
    });
    setCurrentSceneId(nextScene.id);
  };

  const handleRestart = () => {
    const resetScene = getScene(danielStory.entrySceneId);
    setCurrentSceneId(resetScene.id);
    setTrail([{ scene: resetScene }]);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-eyebrow">Interactive Scripture Demo</p>
          <h1>{danielStory.title}</h1>
          <p className="app-description">{danielStory.description}</p>
          <p className="app-setting">Setting: {danielStory.setting}</p>
        </div>
        <button className="restart" onClick={handleRestart}>
          Start over
        </button>
      </header>
      <main>
        <SceneCard scene={currentScene} onChoice={handleChoice} disabled={isComplete} />
        <ProgressTracker trail={trail} />
      </main>
      <footer className="app-footer">
        <p>
          This MVP showcases a single narrative path. Each scene includes a prompt suitable for generating concept art with
          OpenAI’s image models.
        </p>
        {isComplete ? (
          <div className="completion-banner">
            <p>
              {currentScene.id === 'deliverance'
                ? 'You stayed faithful with Daniel and witnessed deliverance!'
                : 'An alternate ending reveals the cost of compromise. Explore again to find the canonical conclusion.'}
            </p>
          </div>
        ) : null}
      </footer>
    </div>
  );
}
