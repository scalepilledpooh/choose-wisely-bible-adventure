import { describe, expect, it } from 'vitest';
import { danielStory } from '../data/daniel';

describe("Daniel in the Lions' Den graph", () => {
  it('has an entry scene that exists', () => {
    expect(danielStory.scenes[danielStory.entrySceneId]).toBeDefined();
  });

  it('links every choice to a defined scene', () => {
    const sceneIds = new Set(Object.keys(danielStory.scenes));

    Object.values(danielStory.scenes).forEach((scene) => {
      scene.choices.forEach((choice) => {
        expect(sceneIds.has(choice.nextSceneId)).toBe(true);
      });
    });
  });

  it('marks finales when no choices remain and reaches all scenes from the entry', () => {
    const queue = [danielStory.entrySceneId];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const sceneId = queue.shift();
      if (!sceneId || visited.has(sceneId)) continue;

      const scene = danielStory.scenes[sceneId];
      expect(scene).toBeDefined();
      visited.add(sceneId);

      if (scene.choices.length === 0) {
        expect(scene.finale).toBe(true);
      }

      scene.choices.forEach((choice) => queue.push(choice.nextSceneId));
    }

    expect(visited.size).toBe(Object.keys(danielStory.scenes).length);
  });
});
