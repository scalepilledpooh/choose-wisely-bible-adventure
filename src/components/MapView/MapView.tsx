import { useMemo, useState } from 'react';
import type { BaseLocation, Era, EraLocationMeta } from '../../world/types';
import type { Story } from '../../story/types';

export type MapViewProps = {
  era: Era;
  baseLocations: BaseLocation[];
  eraLocations: EraLocationMeta[];
  storiesById: Record<string, Story>;
  onSelectStory: (story: Story) => void;
};

export default function MapView({ era, baseLocations, eraLocations, storiesById, onSelectStory }: MapViewProps) {
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

  const eraLocationMap = useMemo(() => {
    const map = new Map<string, EraLocationMeta>();
    eraLocations
      .filter((loc) => loc.eraId === era.id)
      .forEach((loc) => map.set(loc.locationId, loc));
    return map;
  }, [era.id, eraLocations]);

  const selectedEraLocation = selectedLocationId ? eraLocationMap.get(selectedLocationId) : undefined;
  const selectedBaseLocation = selectedLocationId
    ? baseLocations.find((base) => base.id === selectedLocationId)
    : undefined;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/70 shadow-lg shadow-amber-200/5">
        <img src={era.mapImageUrl} alt={era.label} className="h-full w-full object-cover opacity-90" />
        {baseLocations.map((loc) => (
          <button
            key={loc.id}
            type="button"
            style={{
              position: 'absolute',
              left: `${loc.coords.x * 100}%`,
              top: `${loc.coords.y * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => setSelectedLocationId(loc.id)}
            className={`h-4 w-4 rounded-full border transition ${
              selectedLocationId === loc.id
                ? 'border-amber-200 bg-amber-200 shadow-[0_0_0_6px_rgba(251,191,36,0.2)]'
                : 'border-white/80 bg-white/70 hover:bg-amber-200 hover:border-amber-200'
            }`}
            aria-label={`Select ${loc.baseName}`}
          />
        ))}
      </div>

      <div className="flex h-full flex-col gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/70 p-5 shadow-lg shadow-amber-200/5">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">{era.label}</p>
          <h2 className="font-display text-xl font-semibold text-amber-50">{era.label}</h2>
          <p className="text-xs text-slate-400">{era.yearRange}</p>
        </div>

        {selectedEraLocation && selectedBaseLocation ? (
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-amber-50">
                {selectedEraLocation.displayName}
                {selectedEraLocation.displayName !== selectedBaseLocation.baseName ? (
                  <span className="ml-2 text-xs text-slate-400">({selectedBaseLocation.baseName})</span>
                ) : null}
              </h3>
              {selectedEraLocation.description ? (
                <p className="text-sm text-slate-200/90">{selectedEraLocation.description}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Stories</p>
              {selectedEraLocation.storyIds.map((sid) => {
                const story = storiesById[sid];
                if (!story) return null;
                return (
                  <button
                    key={sid}
                    onClick={() => onSelectStory(story)}
                    className="w-full rounded-xl border border-slate-800/80 bg-slate-900/60 px-3 py-2 text-left text-sm font-semibold text-amber-50 transition hover:-translate-y-0.5 hover:border-amber-200/60 hover:bg-slate-900"
                  >
                    <span className="block text-base font-semibold">{story.title}</span>
                    {story.description ? (
                      <span className="text-xs font-normal text-slate-300">{story.description}</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-300">Tap a location on the map to see stories from this time.</p>
        )}
      </div>
    </div>
  );
}
