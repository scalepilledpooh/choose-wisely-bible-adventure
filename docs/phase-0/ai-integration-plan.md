# AI Integration Plan

## Use Cases
1. **Scene Illustrations**: Generate atmospheric images per scene to reinforce immersion.
2. **Character Portraits**: Provide consistent visuals for recurring characters across decision branches.
3. **Narrative Enhancements**: Offer optional descriptive embellishments (e.g., weather, ambient sounds) while ensuring canonical fidelity.

## OpenAI Image Generation Strategy
- **Model**: Leverage OpenAI's image generation endpoint (DALL·E or latest equivalent).
- **Prompt Framework**:
  - Template: `<setting>, <time period detail>, <character action>, biblical realism, painterly style, warm lighting`.
  - Include scripture reference keywords to anchor context.
  - Maintain consistent seed descriptors for recurring characters.
- **Asset Specs**:
  - Default size 1024x1024; generate 3 variants per request.
  - Store metadata with prompt, seed tags, and moderation status.

## Workflow
1. Gameplay client requests image for a scene.
2. API checks cache/CDN; if miss, enqueue job with prompt template.
3. Worker submits to OpenAI API, handles retries with exponential backoff (max 3 attempts).
4. On success, run moderation, persist metadata, push CDN URL to story payload.
5. On failure/moderation flag, fallback to curated illustration.

## Content Moderation & Safeguards
- Utilize OpenAI moderation endpoint before displaying content.
- Maintain allow/deny lists for prompt vocabulary (avoid graphic violence, anachronisms).
- Add human review queue for flagged assets with dashboard in future phase.
- Automatically blur or replace images failing moderation with thematic placeholder.

## Cost Management
- Cache generated assets aggressively; avoid duplicate requests by hashing prompt parameters.
- Implement daily request quotas per story and environment (dev/stage/prod).
- Batch generate assets during authoring phase; reuse across players.
- Monitor usage via analytics service; adjust prompt complexity for cost vs quality balance.

## Compliance & Privacy
- Ensure prompts exclude personal data; log only necessary metadata.
- Provide transparency in Terms of Service about AI-generated content and limitations.
- Maintain audit trail of prompts/responses for accountability.

## Future Enhancements
- Explore fine-tuning on approved biblical art dataset for stylistic consistency.
- Investigate lightweight on-device rendering for mobile clients to reduce API calls.
- Integrate text generation for dynamic epilogues with guardrails to maintain theological accuracy.
