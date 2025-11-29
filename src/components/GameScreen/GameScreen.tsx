import { Story } from '../../story/types';
import { useGameState } from '../../hooks/useGameState';
import StoryView from '../StoryView/StoryView';
import TopBar from '../TopBar';

type Props = {
  story: Story;
  onBack?: () => void;
};

export default function GameScreen({ story, onBack }: Props) {
  const { currentNode, visibleChoices, selectChoice, restartGame } = useGameState(story);

  if (!currentNode) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-xl border border-amber-200/40 bg-slate-900/80 px-6 py-4 text-amber-100">
          Missing story node. Try restarting.
          <button
            type="button"
            className="ml-3 rounded-lg border border-amber-200/50 px-3 py-1 text-sm font-semibold text-amber-50"
            onClick={restartGame}
          >
            Restart
          </button>
        </div>
      </div>
    );
  }

  const isEnding = !!currentNode.isEnding;

  return (
    <div className="flex flex-col gap-6">
      <TopBar storyTitle={story.title} onRestart={restartGame} onBackToMap={onBack} />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <StoryView
          node={currentNode}
          choices={visibleChoices}
          onSelectChoice={selectChoice}
          showRestart={isEnding}
          onRestart={restartGame}
        />

        <aside className="h-fit rounded-2xl border border-slate-800/60 bg-slate-900/70 p-5 shadow-lg shadow-amber-200/5">
          <p className="text-xs uppercase tracking-[0.18em] text-amber-200/80">Story</p>
          <h2 className="font-display text-xl font-semibold text-amber-50">{story.title}</h2>
          {story.description ? <p className="mt-2 text-sm text-slate-200/80">{story.description}</p> : null}
          {isEnding ? (
            <div className="mt-4 rounded-xl border border-amber-300/40 bg-amber-100/10 px-4 py-3 text-sm text-amber-100">
              You reached an ending. Restart anytime to explore another path.
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
