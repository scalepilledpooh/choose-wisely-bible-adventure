import { Story } from './types';

export const petersDenial: Story = {
  id: 'peters-denial',
  title: 'Courtyard Firelight',
  description: 'In the high priest’s courtyard, whispers turn toward you. Will you stand with Jesus?',
  eraId: 'jesus',
  locationId: 'jerusalem',
  startId: 'context',
  nodes: {
    context: {
      id: 'context',
      title: 'Jerusalem at Night',
      passage:
        'Passover fills Jerusalem. Roman torches line the streets. After the arrest in Gethsemane, you follow at a distance to the high priest’s house.',
      choices: [{ id: 'to_courtyard', text: 'Slip into the courtyard', nextId: 'courtyard' }]
    },
    courtyard: {
      id: 'courtyard',
      title: 'Cold Night',
      reference: 'Luke 22:54-56',
      passage:
        'Servants huddle around a fire. You slip closer, trying to hear what happens inside. A servant girl stares. “You were with Him.”',
      choices: [
        { id: 'deny_first', text: 'Shake your head: “I don’t know Him.”', nextId: 'second_accuse', setFlags: ['first_denial'] },
        { id: 'deflect', text: 'Change the subject and ask for news from inside', nextId: 'second_accuse' },
        { id: 'admit', text: 'Admit quietly, “He is my teacher.”', nextId: 'stand_firm', setFlags: ['stood_firm'] }
      ]
    },
    second_accuse: {
      id: 'second_accuse',
      reference: 'Luke 22:57-59',
      passage:
        'Another voice joins: “You are one of them.” A rooster stirs nearby. The fire snaps.',
      choices: [
        { id: 'deny_again', text: 'Deny again, louder this time', nextId: 'third_accuse', setFlags: ['second_denial'] },
        { id: 'stay_silent', text: 'Stay silent and stare at the flames', nextId: 'third_accuse' },
        { id: 'speak_truth', text: 'Admit you followed Him from Galilee', nextId: 'stand_firm', setFlags: ['confessed'] }
      ]
    },
    third_accuse: {
      id: 'third_accuse',
      reference: 'Luke 22:59-60',
      passage:
        '“Surely this man was with Him; he is a Galilean.” All eyes turn. The rooster shifts on its perch.',
      choices: [
        { id: 'deny_final', text: 'Call down a denial: “I do not know what you are talking about!”', nextId: 'rooster', setFlags: ['third_denial'] },
        { id: 'break', text: 'Break and confess in tears', nextId: 'stand_firm', setFlags: ['broken_confession'] }
      ]
    },
    rooster: {
      id: 'rooster',
      reference: 'Luke 22:60-62',
      passage:
        'The rooster crows. From inside, Jesus turns and meets your eyes. Heat rushes to your face.',
      choices: [
        { id: 'weep', text: 'Run out and weep bitterly', nextId: 'outside_weeping', setFlags: ['wept'] },
        { id: 'stay', text: 'Stay in the courtyard, stunned', nextId: 'outside_weeping' }
      ]
    },
    stand_firm: {
      id: 'stand_firm',
      passage:
        'You draw a breath. “Yes, I was with Him.” The courtyard falls quiet. A few scoff; others reconsider.',
      choices: [
        { id: 'held_fast', text: 'Remain by the fire and wait for the dawn', nextId: 'kept_watch', setFlags: ['held_fast'] },
        { id: 'move_back', text: 'Move to the shadows but stay nearby', nextId: 'kept_watch' }
      ]
    },
    kept_watch: {
      id: 'kept_watch',
      title: 'Holding the Place',
      passage:
        'You stay near while Jesus endures questioning. Fear lingers, but so does loyalty.',
      choices: [],
      isEnding: true
    },
    outside_weeping: {
      id: 'outside_weeping',
      title: 'Bitter Tears',
      passage:
        'Outside the courtyard you crumble, remembering His words. The rooster still echoes as you wait for dawn.',
      choices: [],
      isEnding: true
    }
  }
};
