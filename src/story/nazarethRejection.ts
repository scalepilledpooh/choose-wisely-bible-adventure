import { Story } from './types';

export const nazarethRejection: Story = {
  id: 'nazareth-rejection',
  title: 'Hometown Tension',
  description: 'Jesus reads Isaiah in Nazareth; the room shifts from wonder to fury.',
  eraId: 'jesus',
  locationId: 'nazareth',
  startId: 'context',
  nodes: {
    context: {
      id: 'context',
      title: 'Back in Nazareth',
      passage:
        'You return to the synagogue where you learned to read the Scriptures. Familiar faces fill the benches; whispers follow Jesus as He takes the scroll.',
      choices: [{ id: 'to_synagogue', text: 'Watch what He will read', nextId: 'synagogue' }]
    },
    synagogue: {
      id: 'synagogue',
      title: 'The Scroll of Isaiah',
      reference: 'Luke 4:16-19',
      passage:
        'Jesus stands to read. “The Spirit of the Lord is upon me…” The words hang in the quiet synagogue where you grew up.',
      choices: [
        { id: 'listen_close', text: 'Lean in and listen closely', nextId: 'fulfilled', setFlags: ['attentive'] },
        { id: 'watch_leaders', text: 'Watch the elders’ faces', nextId: 'fulfilled', setFlags: ['watching_elders'] }
      ]
    },
    fulfilled: {
      id: 'fulfilled',
      reference: 'Luke 4:20-22',
      passage:
        'He rolls up the scroll. “Today this Scripture is fulfilled in your hearing.” Some nod in wonder; others whisper, “Is this not Joseph’s son?”',
      choices: [
        { id: 'speak_up', text: 'Speak up in support—encourage the room to listen', nextId: 'pushback', setFlags: ['spoke_support'] },
        { id: 'stay_quiet', text: 'Stay quiet and watch reactions', nextId: 'pushback' }
      ]
    },
    pushback: {
      id: 'pushback',
      reference: 'Luke 4:23-24',
      passage:
        'Jesus names the doubts in the room: “No prophet is accepted in his hometown.” Murmurs grow. Arms cross. The atmosphere hardens.',
      choices: [
        { id: 'appeal_neighbors', text: 'Appeal to neighbors: “Let’s hear Him out.”', nextId: 'edge_of_cliff', setFlags: ['tried_peace'] },
        { id: 'ask_question', text: 'Ask Him to explain further', nextId: 'edge_of_cliff', setFlags: ['asked_more'] }
      ]
    },
    edge_of_cliff: {
      id: 'edge_of_cliff',
      reference: 'Luke 4:25-29',
      passage:
        'He reminds them of Elijah and Elisha blessing outsiders. Rage erupts. You are swept along as the crowd drags Him toward the cliff outside town.',
      choices: [
        { id: 'resist_crowd', text: 'Plant your feet and refuse to push Him forward', nextId: 'slips_away', setFlags: ['resisted_crowd'] },
        { id: 'stay_back', text: 'Hang back, praying silently', nextId: 'slips_away' }
      ]
    },
    slips_away: {
      id: 'slips_away',
      reference: 'Luke 4:30',
      passage:
        'Jesus turns and walks through the mob. Somehow the crowd parts. You watch Him disappear down the path toward other towns.',
      choices: [
        { id: 'follow', text: 'Follow Him down the road', nextId: 'leave_home', setFlags: ['left_nazareth'] },
        { id: 'return_home', text: 'Return home, heart pounding', nextId: 'remain', setFlags: ['stayed_home'] }
      ]
    },
    leave_home: {
      id: 'leave_home',
      title: 'Leaving Nazareth',
      passage:
        'You leave the familiar hillside behind, stepping into a road of uncertainty and calling.',
      choices: [],
      isEnding: true
    },
    remain: {
      id: 'remain',
      title: 'Silence in Nazareth',
      passage:
        'The village hums as if nothing happened. You carry the memory of the words fulfilled in your hearing.',
      choices: [],
      isEnding: true
    }
  }
};
