import type { Era, EraId } from '../world/types';

type Props = {
  eras: Era[];
  activeEraId: EraId;
  onSelectEra: (eraId: EraId) => void;
};

export default function EraSelector({ eras, activeEraId, onSelectEra }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {eras.map((era) => {
        const isActive = era.id === activeEraId;
        const disabled = era.comingSoon;
        return (
          <button
            key={era.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelectEra(era.id)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              disabled
                ? 'cursor-not-allowed border-slate-800 bg-slate-900/40 text-slate-500'
                : isActive
                  ? 'border-amber-200/70 bg-amber-100/90 text-slate-900 shadow-lg shadow-amber-200/30'
                  : 'border-slate-800 bg-slate-900/60 text-amber-50 hover:-translate-y-0.5 hover:border-amber-200/50'
            }`}
          >
            <span>{era.label}</span>
            <span className="ml-2 text-[11px] uppercase tracking-[0.12em] text-slate-400">{era.yearRange}</span>
            {disabled ? <span className="ml-2 text-[11px] uppercase text-slate-500">Soon</span> : null}
          </button>
        );
      })}
    </div>
  );
}
