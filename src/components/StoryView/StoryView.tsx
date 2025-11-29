import type { Choice, Node } from '../../story/types';
import ChoiceButton from '../ChoiceButton';

type Props = {
  node: Node;
  choices: Choice[];
  onSelectChoice: (choice: Choice) => void;
  showRestart: boolean;
  onRestart: () => void;
};

export default function StoryView({ node, choices, onSelectChoice, showRestart, onRestart }: Props) {
  return (
    <div className="max-w-3xl rounded-2xl border border-slate-800/60 bg-slate-900/70 p-6 shadow-xl shadow-amber-200/5">
      <div className="space-y-1">
        {node.reference ? (
          <div className="text-xs uppercase tracking-[0.18em] text-amber-200/80">{node.reference}</div>
        ) : null}
        <h1 className="font-display text-2xl font-semibold text-amber-50">{node.title ?? 'Adventure'}</h1>
      </div>

      <p className="mt-3 whitespace-pre-wrap text-base leading-relaxed text-slate-100">{node.passage}</p>

      <div className="mt-6 space-y-3">
        {choices.map((choice) => (
          <ChoiceButton key={choice.id} onClick={() => onSelectChoice(choice)}>
            {choice.text}
          </ChoiceButton>
        ))}

        {showRestart ? (
          <button
            type="button"
            onClick={onRestart}
            className="mt-4 w-full rounded-xl border border-amber-200/50 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-200/20"
          >
            Restart story
          </button>
        ) : null}
      </div>
    </div>
  );
}
