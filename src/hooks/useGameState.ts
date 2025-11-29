import { useEffect, useMemo, useState } from 'react';
import type { Choice, FlagId, Story } from '../story/types';

type GameState = {
  currentNodeId: string;
  flags: Record<FlagId, boolean>;
};

const STORAGE_KEY_PREFIX = 'bible-adventure:';

export function useGameState(story: Story) {
  const storageKey = `${STORAGE_KEY_PREFIX}${story.id}`;

  const [state, setState] = useState<GameState>(() => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        try {
          return JSON.parse(raw) as GameState;
        } catch (error) {
          console.warn('Failed to parse saved game state', error);
        }
      }
    }

    return {
      currentNodeId: story.startId,
      flags: {}
    };
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  const currentNode = story.nodes[state.currentNodeId];

  const visibleChoices = useMemo(() => {
    if (!currentNode) return [];
    return currentNode.choices.filter((choice) => {
      if (!choice.requiredFlags) return true;
      return choice.requiredFlags.every((flag) => state.flags[flag]);
    });
  }, [currentNode, state.flags]);

  const selectChoice = (choice: Choice) => {
    setState((prev) => {
      const nextFlags = { ...prev.flags };
      choice.setFlags?.forEach((flag) => {
        nextFlags[flag] = true;
      });

      return {
        currentNodeId: choice.nextId,
        flags: nextFlags
      };
    });
  };

  const restartGame = () => {
    setState({
      currentNodeId: story.startId,
      flags: {}
    });
  };

  return {
    currentNode,
    visibleChoices,
    flags: state.flags,
    selectChoice,
    restartGame
  };
}
