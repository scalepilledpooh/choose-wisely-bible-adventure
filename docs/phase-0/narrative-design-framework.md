# Narrative Design Framework

## Candidate Stories
| Story | Core Conflict | Canonical Decision Points | Alternate Branch Opportunities | Scripture References |
|-------|---------------|---------------------------|-------------------------------|----------------------|
| Joseph in Egypt | Joseph's rise from slavery to governance | Betrayal by brothers, resisting Potiphar's wife, interpreting dreams before Pharaoh | Attempt escape, refuse to interpret dreams, negotiate differently with brothers | Genesis 37-50 |
| Esther before the King | Esther's courage to intercede for her people | Accepting Mordecai's call, approaching the king, revealing Haman's plot | Declining Mordecai, delaying audience, alternative diplomacy | Esther 1-10 |
| David and Goliath | Trust in God vs fear of Goliath | Accepting battle, choosing weapons, confronting Goliath | Opting for armor, negotiating with Saul, persuading Israelites | 1 Samuel 17 |
| Daniel in the Lions' Den | Faithfulness amidst persecution | Continuing prayer, confronting accusations, entering den | Fleeing Babylon, public defense, alliance-building with officials | Daniel 6 |
| Ruth's Journey | Loyalty and redemption | Staying with Naomi, gleaning in Boaz's field, seeking kinsman redeemer | Returning to Moab, approaching other guardians, negotiating inheritance | Ruth 1-4 |

### Launch Story Priorities
- **Daniel in the Lions' Den** will move into detailed outlining immediately. Focus the initial branch design on prayer perseverance versus self-preservation, and flag any deviations from Daniel 6 that could imply divine abandonment.
- **Esther before the King** is greenlit alongside Daniel. Emphasize the tension between secrecy and advocacy, ensuring decision branches reinforce providence rather than vengeance.

Document branch skeletons, scripture cross-references, and SME review needs for these two stories first; other candidate narratives remain in backlog until the initial pair is production-ready.

## Scene Structure Blueprint
Each story should follow a consistent narrative skeleton while allowing unique flavor:

1. **Introduction Scene**
   - Establish setting, key characters, and inciting incident.
   - Present initial decision that sets trajectory.
2. **Branching Decision Arcs**
   - Aim for 4-5 major arcs, each containing 3-4 decision points (total 15-20 decisions).
   - Every decision yields: narrative consequence, change to faith/hope/morale meters, and scripture anchor.
   - Incorporate "fail-forward" options that lead to alternate but coherent scenes.
3. **Climax & Resolution**
   - Canonical path results in historical outcome.
   - Alternative paths lead to redemptive lessons, soft failures, or tragic endings with brief epilogues.
4. **Epilogue & Reflection**
   - Summarize decisions, present scripture references, offer prompts for reflection/prayer.

## Node Specification
Use a structured JSON schema for story data:

```json
{
  "id": "esther",
  "title": "For Such a Time",
  "theme": "Courage and Providence",
  "scriptureRange": "Esther 1-10",
  "initialScene": "scene-001",
  "scenes": [
    {
      "id": "scene-001",
      "type": "narration",
      "background": "palace",
      "narrative": "Text...",
      "decisionPoints": [
        {
          "id": "decision-001",
          "prompt": "Do you approach the king immediately?",
          "choices": [
            {
              "id": "choice-001A",
              "label": "Go now",
              "consequence": "...",
              "nextScene": "scene-002",
              "scripture": "Esther 5:1-2",
              "metrics": {"faith": +2, "courage": +1}
            },
            {
              "id": "choice-001B",
              "label": "Wait and pray",
              "consequence": "...",
              "nextScene": "scene-003",
              "scripture": "Esther 4:16",
              "metrics": {"faith": +3, "risk": +1}
            }
          ]
        }
      ]
    }
  ]
}
```

## Detail Hooks Repository
Capture vivid textual anchors for authenticity:

- **Sensory Imagery**: incense in royal courts (Esther 5:1), desert winds at Dothan (Genesis 37:17), lion roars echoing in Babylonian cisterns (Daniel 6:16).
- **Cultural Artifacts**: signet rings, ephods, boaz's threshing floor customs, Egyptian chariots.
- **Character Motivations**: Joseph's testing of his brothers (Genesis 44), Mordecai's defiance (Esther 3:2), Naomi's bitterness (Ruth 1:20).
- **Symbolic Motifs**: dreams as divine guidance, royal decrees sealed with signets, covenant loyalty contrasted with fear.

## Documentation & Collaboration
- Maintain story bibles per narrative including timeline, cast, theological themes.
- Use shared glossary for ancient terms and translation notes.
- Review cycles with subject-matter experts prior to implementation.
