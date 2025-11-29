type Props = {
  storyTitle: string;
  onRestart: () => void;
};

export default function TopBar({ storyTitle, onRestart }: Props) {
  return (
    <header className="flex w-full items-center justify-between gap-4 rounded-2xl border border-slate-800/60 bg-slate-900/70 px-5 py-4 shadow-lg shadow-amber-200/5 backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">Choose Your Adventure</p>
        <h1 className="font-display text-2xl font-semibold text-amber-50">{storyTitle}</h1>
      </div>
      <button
        type="button"
        onClick={onRestart}
        className="rounded-full border border-amber-200/60 bg-amber-100/80 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-200/40"
      >
        Start over
      </button>
    </header>
  );
}
