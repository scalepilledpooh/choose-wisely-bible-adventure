import { Story } from './types';

export const goodSamaritan: Story = {
  id: 'good-samaritan',
  title: 'The Road to Jericho',
  description: 'Walk the road from Jerusalem to Jericho and decide how you will respond to a wounded stranger.',
  startId: 'intro',
  nodes: {
    intro: {
      id: 'intro',
      title: 'A Sudden Sight',
      reference: 'Luke 10:30',
      passage:
        'The sun beats down on the road to Jericho. Dust rises with every step when you notice a man crumpled beside the path—his clothes torn, blood on his brow.',
      choices: [
        { id: 'help', text: 'Stop and kneel beside him', nextId: 'help_arrival', setFlags: ['stopped_to_help'] },
        { id: 'ignore', text: 'Cross to the other side and keep walking', nextId: 'ignore_priest', setFlags: ['passed_by'] }
      ]
    },
    help_arrival: {
      id: 'help_arrival',
      title: 'Assessing the Wounds',
      reference: 'Luke 10:33-34',
      passage:
        'You crouch down. The man is barely conscious, his breath shallow. A donkey grazes nearby; its reins slip from his hand.',
      choices: [
        { id: 'lift', text: 'Lift him onto your donkey and head toward the nearest inn', nextId: 'inn_road', setFlags: ['carried_wounded'] },
        { id: 'wait_priest', text: 'Look for a priest approaching and wave for help', nextId: 'priest_delay' }
      ]
    },
    priest_delay: {
      id: 'priest_delay',
      reference: 'Luke 10:31',
      passage:
        'A priest appears in the distance. You raise your hand. He slows, takes in the scene, and hesitates on the far side.',
      choices: [
        { id: 'plead', text: 'Call out for him to stop and help you lift the man', nextId: 'priest_refuses' },
        { id: 'move_on', text: 'Stop asking—take the man yourself', nextId: 'inn_road', setFlags: ['carried_after_delay'] }
      ]
    },
    priest_refuses: {
      id: 'priest_refuses',
      title: 'Left Waiting',
      passage:
        'The priest averts his eyes and quickens his pace. Minutes pass while the wounded man grows colder in your arms.',
      choices: [
        { id: 'carry_anyway', text: 'Hoist him up alone and push onward', nextId: 'inn_road', setFlags: ['carried_after_refusal'] },
        { id: 'give_up', text: 'Leave him and continue your journey', nextId: 'bandits_return', setFlags: ['abandoned_after_wait'] }
      ]
    },
    inn_road: {
      id: 'inn_road',
      title: 'Toward Shelter',
      reference: 'Luke 10:34',
      passage:
        'You steady the man across the donkey. Each step is slow, but a lantern glows ahead—a roadside inn.',
      choices: [
        { id: 'hurry_in', text: 'Head straight to the inn door', nextId: 'inn' },
        { id: 'scan_area', text: 'Scan the area for the bandits who attacked him', nextId: 'bandits_watch' }
      ]
    },
    bandits_watch: {
      id: 'bandits_watch',
      passage:
        'You pause in the shadows. Voices murmur in the rocks; the bandits circle back, eyes on your donkey.',
      choices: [
        { id: 'hide', text: 'Stay hidden until they pass', nextId: 'inn' },
        {
          id: 'confront',
          text: 'Confront them and defend the wounded man',
          nextId: 'bandits_return',
          setFlags: ['confronted_bandits']
        }
      ]
    },
    bandits_return: {
      id: 'bandits_return',
      title: 'Too Late',
      passage:
        'The bandits rush forward. In the chaos you are forced to flee. When you return with guards, the man is gone.',
      choices: [],
      isEnding: true
    },
    inn: {
      id: 'inn',
      title: 'Care at the Inn',
      passage:
        'The innkeeper startles as you arrive. You clean wounds with oil and wine, wrapping cloth around bruised ribs.',
      choices: [
        { id: 'pay_room', text: 'Pay two denarii for a room and overnight care', nextId: 'overnight', setFlags: ['paid_innkeeper'] },
        { id: 'stay_watch', text: 'Stay by his bedside through the night', nextId: 'vigil', setFlags: ['kept_vigil'] }
      ]
    },
    overnight: {
      id: 'overnight',
      title: 'A Pledge',
      reference: 'Luke 10:35',
      passage:
        'You place coins on the counter. The innkeeper nods, promising to tend the man. Dawn light creeps over the hills.',
      choices: [
        {
          id: 'leave_promise',
          text: 'Promise to repay any extra costs on your return',
          nextId: 'hopeful_departure',
          setFlags: ['pledged_return']
        },
        { id: 'check_on', text: 'Check on the man before you go', nextId: 'vigil', requiredFlags: ['paid_innkeeper'] }
      ]
    },
    vigil: {
      id: 'vigil',
      passage:
        'The man wakes briefly. His eyes search yours, a whisper of thanks forming on cracked lips before he rests again.',
      choices: [
        { id: 'finish_care', text: 'Pray over him and continue your journey', nextId: 'hopeful_departure' },
        {
          id: 'write_note',
          text: 'Leave a note telling him you will return',
          nextId: 'hopeful_departure',
          setFlags: ['left_note']
        }
      ]
    },
    hopeful_departure: {
      id: 'hopeful_departure',
      title: 'Continuing the Road',
      passage:
        'You step back onto the road. Your purse is lighter, but your heart is strangely full. The man rests in safe hands.',
      choices: [],
      isEnding: true
    },
    ignore_priest: {
      id: 'ignore_priest',
      reference: 'Luke 10:31-32',
      passage:
        'You cross the road. Footsteps approach—a priest passes by on the far side, followed by a Levite who does the same.',
      choices: [
        { id: 'keep_moving', text: 'Keep walking and avoid the trouble', nextId: 'hardened', setFlags: ['persisted_passing'] },
        { id: 'turn_back', text: 'Regret it and turn back to help after all', nextId: 'late_return', setFlags: ['returned_after_passing'] }
      ]
    },
    hardened: {
      id: 'hardened',
      title: 'A Hardened Heart',
      passage:
        'You leave the wounded man behind. The road is quiet, but the silence presses heavy on your conscience.',
      choices: [],
      isEnding: true
    },
    late_return: {
      id: 'late_return',
      title: 'Second Chance',
      passage:
        'You hurry back. The man still breathes, but weaker now. There is no one else around to help.',
      choices: [
        {
          id: 'carry_now',
          text: 'Hoist him up and rush to the inn',
          nextId: 'inn',
          setFlags: ['carried_after_delay', 'stopped_to_help']
        },
        {
          id: 'stay_put',
          text: 'Stay with him and pray until someone comes',
          nextId: 'bandits_return',
          setFlags: ['waited_in_place']
        }
      ]
    }
  }
};
