import { useMemo, useState } from 'react';
import Layout from './components/Layout';
import GameScreen from './components/GameScreen/GameScreen';
import EraSelector from './components/EraSelector';
import MapView from './components/MapView/MapView';
import { baseLocations, defaultEraId, eraLocations, eras, storiesById } from './world/data';
import type { EraId } from './world/types';
import SeaPlatformer from './three/SeaPlatformer';

export default function App() {
  const [activeEraId, setActiveEraId] = useState<EraId>(defaultEraId);
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [view, setView] = useState<'map' | 'three'>('map');

  const activeEra = useMemo(() => eras.find((era) => era.id === activeEraId) ?? eras[0], [activeEraId]);
  const activeStory = activeStoryId ? storiesById[activeStoryId] : null;

  const handleSelectStory = (storyId: string) => {
    setActiveStoryId(storyId);
  };

  const handleExitStory = () => {
    setActiveStoryId(null);
  };

  if (view === 'three') {
    return (
      <Layout>
        <div className="flex items-center justify-between rounded-2xl border border-slate-800/60 bg-slate-900/70 px-5 py-4 shadow-lg shadow-amber-200/5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">Sea of Galilee</p>
            <h1 className="font-display text-3xl font-semibold text-amber-50">3D walk + talk demo</h1>
            <p className="text-sm text-slate-200/80">Walk on water, board a boat, and speak with nearby people.</p>
          </div>
          <button
            type="button"
            onClick={() => setView('map')}
            className="rounded-full border border-amber-200/60 bg-amber-100/90 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-200/40"
          >
            Back to era map
          </button>
        </div>
        <SeaPlatformer />
      </Layout>
    );
  }

  return (
    <Layout>
      {activeStory ? (
        <GameScreen story={activeStory} onBack={handleExitStory} />
      ) : (
        <div className="space-y-6">
          <header className="space-y-2 rounded-2xl border border-slate-800/60 bg-slate-900/70 px-5 py-4 shadow-lg shadow-amber-200/5">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">Paths Through the Land</p>
            <h1 className="font-display text-3xl font-semibold text-amber-50">One land, many times</h1>
            <p className="text-sm text-slate-200/80">Pick an era, tap a place, and step into a story.</p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setView('three')}
                className="rounded-full border border-amber-200/60 bg-amber-100/90 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-200/40"
              >
                Launch 3D Sea demo
              </button>
            </div>
          </header>

          <EraSelector eras={eras} activeEraId={activeEra.id} onSelectEra={setActiveEraId} />

          <MapView
            era={activeEra}
            baseLocations={baseLocations}
            eraLocations={eraLocations}
            storiesById={storiesById}
            onSelectStory={(story) => handleSelectStory(story.id)}
          />
        </div>
      )}
    </Layout>
  );
}
