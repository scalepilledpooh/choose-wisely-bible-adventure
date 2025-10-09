export type Choice = {
  id: string;
  label: string;
  nextSceneId: string;
  impact: 'canonical' | 'alternative';
  outcome: string;
};

export type Scene = {
  id: string;
  title: string;
  scripture: string;
  summary: string;
  imagePrompt: string;
  choices: Choice[];
  finale?: boolean;
};

export type Story = {
  id: string;
  title: string;
  description: string;
  setting: string;
  entrySceneId: string;
  scenes: Record<string, Scene>;
};

export const danielStory: Story = {
  id: 'daniel-lions-den',
  title: "Daniel in the Lions' Den",
  description:
    'Stand firm with Daniel as royal intrigue threatens his devotion. Every decision shapes whether he remains faithful.',
  setting: 'Babylon, 6th century BC',
  entrySceneId: 'petition',
  scenes: {
    petition: {
      id: 'petition',
      title: 'A Royal Plot',
      scripture: 'Daniel 6:6-9',
      summary:
        'Jealous officials urge King Darius to sign a decree banning prayer to anyone but the king for thirty days.',
      imagePrompt:
        'Ancient Persian court, officials presenting scroll to king, warm lamplight, suspenseful mood',
      choices: [
        {
          id: 'petition-refuse',
          label: 'Advise Daniel to lay low and pause his prayers for a month.',
          nextSceneId: 'compromise',
          impact: 'alternative',
          outcome:
            'Daniel hesitates, weighing safety over devotion. The officials watch eagerly, sensing weakness.'
        },
        {
          id: 'petition-prepare',
          label: 'Warn Daniel and prepare for faithful resistance.',
          nextSceneId: 'prayer',
          impact: 'canonical',
          outcome:
            'Resolved, Daniel returns home determined to continue praying as he always has.'
        }
      ]
    },
    compromise: {
      id: 'compromise',
      title: 'A Quiet Proposal',
      scripture: 'Daniel 6:10',
      summary:
        'Daniel considers praying privately with windows closed so that no one can accuse him.',
      imagePrompt: 'Modest Judean home with shuttered windows, twilight, conflicted expression on Daniel',
      choices: [
        {
          id: 'compromise-hide',
          label: 'Encourage Daniel to hide his devotion until the decree expires.',
          nextSceneId: 'sentence',
          impact: 'alternative',
          outcome:
            'Daniel hides, but the officials barge in regardless, accusing him of rebellion without proof.'
        },
        {
          id: 'compromise-stand',
          label: 'Urge Daniel to throw open the windows and pray toward Jerusalem.',
          nextSceneId: 'prayer',
          impact: 'canonical',
          outcome: 'Daniel breathes deep, opens the lattice, and kneels toward Jerusalem three times a day.'
        }
      ]
    },
    prayer: {
      id: 'prayer',
      title: 'Faith on Display',
      scripture: 'Daniel 6:10-12',
      summary:
        'Daniel kneels and prays toward Jerusalem, giving thanks to God despite the decree. Officials wait in the courtyard.',
      imagePrompt:
        'Daniel kneeling in prayer by open window, warm sunlight streaming, officials whispering outside',
      choices: [
        {
          id: 'prayer-apologize',
          label: 'Ask Daniel to explain himself to the officials and beg mercy.',
          nextSceneId: 'sentence',
          impact: 'alternative',
          outcome: 'The officials twist his words, accusing him of defying the king to his face.'
        },
        {
          id: 'prayer-trust',
          label: 'Remain silent and trust God to defend Daniel.',
          nextSceneId: 'sentence',
          impact: 'canonical',
          outcome: 'Daniel is seized, yet his calm faith stirs King Darius to seek a rescue.'
        }
      ]
    },
    sentence: {
      id: 'sentence',
      title: 'Into the Den',
      scripture: 'Daniel 6:16-18',
      summary:
        'Despite his grief, King Darius orders Daniel to the lions. He spends a sleepless night fasting and praying.',
      imagePrompt:
        'Nighttime royal chamber, anxious king pacing, sealed lions den in distance, moonlight',
      choices: [
        {
          id: 'sentence-flee',
          label: 'Suggest orchestrating a daring escape before nightfall.',
          nextSceneId: 'escape',
          impact: 'alternative',
          outcome: 'Guards catch wind of the plan; Daniel is thrown to the lions with heavier chains.'
        },
        {
          id: 'sentence-rest',
          label: 'Encourage persistent prayer and trust in God’s deliverance.',
          nextSceneId: 'deliverance',
          impact: 'canonical',
          outcome:
            'Darius declares, “May your God deliver you!” Daniel is lowered into the den with steadfast peace.'
        }
      ]
    },
    escape: {
      id: 'escape',
      title: 'Foiled Escape',
      scripture: 'Daniel 6:19-24',
      summary:
        'Daniel’s attempted escape fails. At dawn the king discovers the lions feasting and mourns deeply.',
      imagePrompt:
        'Dawn light revealing tragic scene in lions den, sorrowful king at entrance',
      choices: [],
      finale: true
    },
    deliverance: {
      id: 'deliverance',
      title: 'Mouths of Lions Shut',
      scripture: 'Daniel 6:19-23',
      summary:
        'At daybreak Daniel emerges unharmed, proclaiming that God sent an angel to shut the lions’ mouths.',
      imagePrompt:
        'Triumphant Daniel emerging from lions den, angelic light, astonished king and officials',
      choices: [],
      finale: true
    }
  }
};
