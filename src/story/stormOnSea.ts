import { Story } from './types';

export const stormOnSea: Story = {
  id: 'storm-on-sea',
  title: 'Storm on the Lake',
  description: 'Night wind rises on the Sea of Galilee. Will you panic or trust?',
  eraId: 'jesus',
  locationId: 'sea_of_galilee',
  startId: 'nightfall',
  nodes: {
    nightfall: {
      id: 'nightfall',
      title: 'Crossing at Dusk',
      reference: 'Mark 4:35-36',
      passage:
        'Evening settles. Jesus rests in the stern as you push off. The sky darkens faster than expected; the lake turns rough.',
      choices: [
        { id: 'steady_course', text: 'Hold the course across', nextId: 'rising_wind', setFlags: ['steady'] },
        { id: 'hug_shore', text: 'Stay near the shoreline', nextId: 'near_shore' }
      ]
    },
    near_shore: {
      id: 'near_shore',
      passage:
        'You angle closer to shore. Rocks loom; waves slap the hull.',
      choices: [
        { id: 'wake_jesus', text: 'Wake Jesus before you run aground', nextId: 'wake_call' },
        { id: 'row_harder', text: 'Row harder on your own', nextId: 'rising_wind', setFlags: ['self_reliant'] }
      ]
    },
    rising_wind: {
      id: 'rising_wind',
      reference: 'Mark 4:37',
      passage:
        'A furious squall erupts. Waves crash over the bow. Water pools around your feet; the boat groans.',
      choices: [
        { id: 'bail', text: 'Grab buckets and start bailing', nextId: 'bailing', setFlags: ['tried_bailing'] },
        { id: 'wake', text: 'Wake Jesus now', nextId: 'wake_call' }
      ]
    },
    bailing: {
      id: 'bailing',
      passage:
        'You bail frantically, arms burning. Another wave drenches you. Fear rises.',
      choices: [
        { id: 'cry_out', text: 'Cry out, “Teacher, do you not care?”', nextId: 'wake_call', setFlags: ['cried_out'] },
        { id: 'keep_bailing', text: 'Keep bailing and hope for calmer water', nextId: 'swamped' }
      ]
    },
    wake_call: {
      id: 'wake_call',
      reference: 'Mark 4:38-39',
      passage:
        'You shake Jesus awake. He rises, looks at the wind, and says, “Peace! Be still.” The gale collapses into silence.',
      choices: [
        { id: 'stand_in_awe', text: 'Stand in stunned silence', nextId: 'after_calm' },
        { id: 'ask_question', text: 'Whisper, “Who is this?”', nextId: 'after_calm', setFlags: ['asked_identity'] }
      ]
    },
    after_calm: {
      id: 'after_calm',
      passage:
        'The lake becomes like glass. Your heart still pounds. His question lingers: “Why are you so afraid? Have you still no faith?”',
      choices: [
        { id: 'kneel', text: 'Kneel and thank Him for the calm', nextId: 'faith_grows', setFlags: ['bowed'] },
        { id: 'avoid_eyes', text: 'Avoid His gaze, unsure how to answer', nextId: 'faith_grows' }
      ]
    },
    faith_grows: {
      id: 'faith_grows',
      title: 'A Quiet Crossing',
      passage:
        'You continue across under a sky full of stars. Fear fades into a quiet resolve to trust the One who commands storms.',
      choices: [],
      isEnding: true
    },
    swamped: {
      id: 'swamped',
      title: 'Overwhelmed',
      passage:
        'Water fills the boat faster than you can bail. You beach the vessel near the reeds, shaken by the storm and by your own limits.',
      choices: [],
      isEnding: true
    }
  }
};
