type Props = {
  storyTitle: string;
  onRestart: () => void;
  onBackToMap?: () => void;
};

export default function TopBar({ storyTitle, onRestart, onBackToMap }: Props) {
  return (
    <header className="flex w-full flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/70 px-5 py-4 shadow-lg shadow-amber-200/5 backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">Choose Your Adventure</p>
        <h1 className="font-display text-2xl font-semibold text-amber-50">{storyTitle}</h1>
      </div>
      <div className="flex flex-wrap gap-2">
        {onBackToMap ? (
          <button
            type="button"
            onClick={onBackToMap}
            className="rounded-full border border-slate-700/80 px-4 py-2 text-sm font-semibold text-amber-50 transition hover:-translate-y-0.5 hover:border-amber-200/50 hover:bg-slate-800"
          >
            Back to map
          </button>
        ) : null}
        <button
          type="button"
          onClick={onRestart}
          className="rounded-full border border-amber-200/60 bg-amber-100/80 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-200/40"
        >
          Start over
        </button>
      </div>
    </header>
  );
}
