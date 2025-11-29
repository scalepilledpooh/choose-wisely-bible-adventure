import { Story } from './types';

export const callOfDisciples: Story = {
  id: 'call-of-disciples',
  title: 'Boats on the Shore',
  description: 'Jesus steps into your boat at Capernaum and asks you to push out one more time.',
  eraId: 'jesus',
  locationId: 'capernaum',
  startId: 'context',
  nodes: {
    context: {
      id: 'context',
      title: 'Hometown Waters',
      passage:
        'Capernaum’s shoreline is familiar—the smell of nets, Roman patrols on the road, and crowds hungry for stories of healing. You know every inlet of this lake.',
      choices: [{ id: 'to_shore', text: 'Head to your boat', nextId: 'shore' }]
    },
    shore: {
      id: 'shore',
      title: 'Morning on the Lake',
      reference: 'Luke 5:1-3',
      passage:
        'Dawn mist lifts off the Sea of Galilee. You clean empty nets while crowds press around Jesus. He steps into your boat and asks you to push out a little from shore.',
      choices: [
        { id: 'push_out', text: 'Push out and let Him teach from the boat', nextId: 'teaching', setFlags: ['made_room'] },
        { id: 'stay_shore', text: 'Decline politely—nets are heavy and you are tired', nextId: 'missed_voice', setFlags: ['stayed_tired'] },
        { id: 'ask_zebedee', text: 'Ask Zebedee if this is wise', nextId: 'teaching', setFlags: ['sought_counsel'] }
      ]
    },
    teaching: {
      id: 'teaching',
      reference: 'Luke 5:3-4',
      passage:
        'The boat rocks gently as Jesus teaches. When He finishes, He turns and says, “Put out into deep water and let down the nets for a catch.”',
      choices: [
        { id: 'cast_again', text: 'Trust and cast the nets one more time', nextId: 'heavy_nets', setFlags: ['trusted_word'] },
        { id: 'explain_fail', text: 'Explain that you worked all night and caught nothing', nextId: 'hesitant_cast' }
      ]
    },
    hesitant_cast: {
      id: 'hesitant_cast',
      passage:
        'You sigh, nod, and let the nets down half-heartedly. The water looks quiet, but something stirs below.',
      choices: [
        { id: 'haul_anyway', text: 'Haul the nets up carefully', nextId: 'heavy_nets' },
        { id: 'stop_now', text: 'Pull them back in before you waste more time', nextId: 'empty_return', setFlags: ['quit_early'] }
      ]
    },
    heavy_nets: {
      id: 'heavy_nets',
      reference: 'Luke 5:6-7',
      passage:
        'The ropes strain. Nets bulge with silver. They threaten to tear. You call for partners; Zebedee’s sons rush to help.',
      choices: [
        { id: 'share_catch', text: 'Wave others over—fill every boat you can', nextId: 'boats_full', setFlags: ['shared_catch'] },
        { id: 'keep_quiet', text: 'Try to keep the haul for your crew alone', nextId: 'nets_tearing', setFlags: ['kept_catch'] }
      ]
    },
    nets_tearing: {
      id: 'nets_tearing',
      passage:
        'Nets rip faster than you can mend. Fish spill back into the deep. Sweat stings your eyes.',
      choices: [
        { id: 'call_help_late', text: 'Finally shout for help', nextId: 'boats_full' },
        { id: 'give_up_nets', text: 'Cut the nets free and save the boat', nextId: 'empty_return', setFlags: ['lost_nets'] }
      ]
    },
    empty_return: {
      id: 'empty_return',
      title: 'An Empty Boat',
      passage:
        'You head back with frayed nets and a restless heart. The invitation still hangs in the air.',
      choices: [],
      isEnding: true
    },
    boats_full: {
      id: 'boats_full',
      title: 'Boats Almost Sinking',
      reference: 'Luke 5:8-10',
      passage:
        'Both boats ride low, brimming with fish. You fall to your knees, aware of the Holy One standing in your boat.',
      choices: [
        { id: 'confess', text: 'Tell Him, “Depart from me—I am sinful.”', nextId: 'call_follow' },
        { id: 'stay_silent', text: 'Stay silent, trembling at what you have seen', nextId: 'call_follow' }
      ]
    },
    call_follow: {
      id: 'call_follow',
      passage:
        'Jesus meets your eyes. “Do not be afraid; from now on you will fish for people.” The shoreline waits, and the boats are full.',
      choices: [
        { id: 'leave_boats', text: 'Beach the boats and follow Him', nextId: 'new_path', setFlags: ['followed_call'] },
        { id: 'sell_first', text: 'Sell the fish first, then decide', nextId: 'empty_return', setFlags: ['delayed_call'] }
      ]
    },
    new_path: {
      id: 'new_path',
      title: 'Leaving Nets Behind',
      passage:
        'You step onto the shore, nets dripping behind you, and walk into a story larger than the sea.',
      choices: [],
      isEnding: true
    },
    missed_voice: {
      id: 'missed_voice',
      title: 'Missed Invitation',
      passage:
        'You stay on shore, fixing nets while the crowd leans in. His voice fades behind you.',
      choices: [],
      isEnding: true
    }
  }
};
