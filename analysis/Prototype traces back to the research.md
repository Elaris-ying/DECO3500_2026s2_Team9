# Prototype traces back to the research

## How our prototype links back to our research

Our current prototype, Gallery Echoes, is strongly aligned with the research because it does not treat the gallery experience as only an information-delivery problem. Across the literature, interviews, and culture probe, the gallery experience emerged as social, personal, spatial, reflective, and active. Our prototype already responds to many of these dimensions through features such as Nearby Footprints, response capture, visual memories, collections, and map-based exploration.

Our prototype is designed as a lightweight social and contextual layer around the physical gallery experience. Rather than replacing the artwork with digital content, it supports visitors in noticing, reflecting, sharing, remembering, and discovering while maintaining control over their own pace and attention.

# 1. Nearby Footprints: making social activity visible

One of the strongest features in our prototype is the **Nearby Footprints** section.

Examples currently shown include:

“Someone noticed the reflection.”

and

“A visitor sketched from this angle.”

This directly responds to one of the strongest interview findings: visitors often use the behaviour of other people as informal guidance. Participants described noticing where others stopped, following another person’s viewing position, observing people sketching, watching how others interacted with installations, and overhearing comments that caused them to look again. The analysis therefore described other visitors as an informal source of discovery and guidance.  

This also links back to the literature. The literature analysis found that social interaction does not necessarily need to mean direct conversation. Social presence, awareness of others, co-viewing, proximity, reciprocity, and shared activity can all contribute to the experience. The synthesis specifically concluded that social technologies should support **awareness and meaningful connection rather than simply adding messaging**.  

This makes the Nearby Footprints feature particularly defensible.

The important design principle is that our prototype is not saying:

“This artwork is popular, so you should look at it.”

Instead, it is showing:

**how someone else engaged with it.**

That distinction matters.

A popularity system could quickly become a ranking system. However, our interviews showed that social activity can both attract and repel visitors: moderate activity creates curiosity, whereas overcrowding can discourage engagement.  

Therefore, our social traces should focus on **qualities of engagement**, not quantities of engagement.

For example, the system could show:

“Someone returned to this artwork.”

“Someone noticed this from the left side.”

“Someone spent time looking at the reflection.”

“Someone sketched this detail.”

“Someone described this as nostalgic.”

That is stronger than:

“43 people viewed this artwork.”

# 2. Our prototype supports sociality without forcing communication

This is another important strength.

Our literature analysis found that visitors may value social functionality without necessarily wanting direct voice communication or instant messaging. The literature therefore distinguishes **social experience** from simply adding communication channels.  

Our interview findings reinforce this. Visitors valued:

-   discussing artworks;

-   sharing discoveries;

-   hearing another person’s interpretation;

-   seeing what others noticed;

but they also valued:

-   quiet observation;

-   moving at their own pace;

-   separating from companions;

-   reconnecting later.

The interview analysis therefore identified the key tension as **connection without losing autonomy**.  

Our current prototype is already moving in the right direction because Nearby Footprints are passive and optional. A visitor can see them without having to talk to anyone.

However, we can develop this further by introducing **two kinds of social footprints**:

### Public gallery traces

Anonymous traces left by other visitors.

For example:

“Someone noticed the reflection.”

### Companion traces

Traces left by members of the visitor’s own group.

For example:

“Mia left something for you here.”

This would allow our prototype to support both:

**ambient social awareness**

and

**meaningful connection with known companions.**

# 3. Add asynchronous group exploration

This is probably one of the strongest additional features we could develop.

The interview findings showed that some visitors enjoy visiting with others but dislike having to maintain the same pace. Some participants preferred exploring independently and then meeting again afterwards to discuss what they had seen.  

Our prototype could support exactly this behaviour.

For example:

**Visitor A discovers Artwork 07**

↓

They leave a footprint:

“Look at the reflection near the corner.”

↓

Visitor B is somewhere else in the gallery.

↓

Later, Visitor B reaches Artwork 07.

↓

The prototype says:

**“Someone in your group left a trace here.”**

↓

Visitor B chooses whether to view it.

This preserves independence.

The system does **not** send:

“Your friend wants you to come to Gallery 2 immediately.”

That would recreate the pacing pressure identified in the interviews.

Instead, it supports:

**explore separately → leave traces → discover them later → reconnect**

This makes asynchronous social interaction a core research-driven feature rather than just an add-on.

# 4. Capture a Response: supporting reflection and personal meaning-making

The second screen currently asks:

**“What did this artwork make you notice?”**

This is a strong prompt because it is open-ended.

It does not ask:

“What does this artwork mean?”

and it does not tell visitors what they should think.

This aligns strongly with the literature theme that museum experiences are simultaneously **social and personal**. The literature emphasises introspection, reflection, emotion, personal interpretation, and individual meaning-making alongside social experience.  

The interview analysis also showed that other people’s interpretations can deepen engagement, but visitors still want to retain ownership of their own interpretation.  

So our current prompt supports that quite well.

We could strengthen this by adding several **optional prompt types** rather than always asking the same question.

For example:

**Notice**

“What caught your attention?”

**Feel**

“How did this artwork make you feel?”

**Interpret**

“What do you think might be happening here?”

**Connect**

“Did this remind you of anything?”

**Observe**

“What detail did you notice after looking again?”

This would support different visitor styles without forcing everyone into the same type of reflection.

# 5. The feeling selection is supported, but should remain optional

Our prototype currently allows visitors to select:

-   Calm

-   Curious

-   Nostalgic

This aligns with the literature on emotional and introspective museum experiences. The literature analysis found that emotional technology can help visitors reflect on their responses to artworks.  

However, the same literature also identifies a risk: technology may appear authoritative and influence visitors to accept the system’s interpretation of what they feel.

Therefore, our prototype should avoid implying:

“We detected that you are nostalgic.”

Instead:

**“Choose a feeling, if you want.”**

The visitor should always define their own response.

We could also include:

**“Something else”**

or

**“Skip”**

because visitors may have emotional reactions that do not fit our predefined categories.

# 6. The Visual Footprint is a strong concept, but the AI language should change

The visual footprint feature is conceptually very interesting.

Our prototype turns a visitor’s response into an abstract visual memory. This connects to several literature concepts:

-   reflection;

-   emotional engagement;

-   visitor-generated content;

-   memory;

-   post-visit continuity;

-   personal interpretation.

The literature analysis specifically identifies emotional reflection and personal meaning as important aspects of museum experience.  

However, the wording:

**“AI translated your response into this abstract memory.”**

could create the impression that AI has accurately interpreted the visitor.

This conflicts slightly with one of the literature findings around system authority. The literature warns that visitors can defer to system-generated interpretations, especially when they appear scientific or authoritative.  

I would change the wording to something like:

**“Your response inspired this visual footprint.”**

or:

**“Here is one visual interpretation inspired by your response.”**

That wording is much safer conceptually.

It communicates:

**possibility**

rather than:

**truth.**

We could also give visitors more control by allowing:

**Regenerate**

**Adjust the mood**

**Keep my response without a visual**

**Save**

This strengthens visitor agency, which is one of the major literature themes.  

# 7. My Collection: supporting memory and continuity

The My Collection screen is another research-supported feature.

Visitors can keep the visual memories that matter to them.

This responds to the literature around:

-   personalisation;

-   visitor ownership;

-   reflection;

-   saving content;

-   continuing the experience beyond the immediate moment.

It also fits the culture probe, where **ways to save favourites** attracted interest.  

The collection should therefore be framed less as a digital gallery of generated images and more as a:

**personal record of what mattered during the visit.**

Each saved footprint could contain:

**Artwork**

**What I noticed**

**My feeling**

**Visual footprint**

**Where I was**

**What someone else noticed**

That creates a richer memory.

# 8. We could add a post-visit reflection experience

Our prototype currently focuses mostly on the in-gallery experience.

However, My Collection gives us a strong opportunity for a **post-visit layer**.

At the end of the visit, the prototype might show:

### Your Gallery Echoes

6 artworks stayed with you today.

You spent most time with visually quiet works.

You left 3 reflections.

2 people responded to traces you left.

Importantly, this should not become a performance dashboard.

We should avoid:

“You only visited 6/25 artworks.”

because our research supports autonomy rather than completion pressure.

Instead, the experience should celebrate:

**what the visitor connected with**

rather than:

**how much they completed.**

# 9. The Gallery Map supports orientation, but should not become a prescribed route

Our culture probe shows that visitors have different exploration preferences.

Some want:

-   clear routes;

-   personal-interest exploration;

-   social exploration;

-   maps or guides.

The culture probe therefore revealed a tension between **structure and freedom**.  

Our gallery map fits this well because it can provide orientation without necessarily controlling movement.

However, I would be careful with route recommendation.

Instead of:

**“Go to Artwork 7 next.”**

we could provide:

“3 traces nearby.”

“A quiet area is nearby.”

“Someone from your group left something in Gallery 3.”

“You saved an artwork nearby.”

This supports contextual exploration rather than prescribing a route.

# 10. Reconsider the “Missing artwork” concept

The current screen says:

**“Which artwork did I missing today”**

Conceptually, I would change this substantially.

The word **missing** suggests that visitors should complete the gallery.

But our research tells us that visitors want control over:

-   pace;

-   depth;

-   route;

-   interests;

-   attention.

The literature also found resistance to recommendations telling visitors which exhibits they should see.  

A better concept might be:

## Discover More

or:

## Other Echoes Nearby

or:

## Something Different

The system could say:

“Here are a few artworks you haven’t encountered yet.”

Then allow visitors to choose.

An even stronger research-driven version could be:

### Based on how you want to explore

**Something quiet**

**Something interactive**

**Something other visitors noticed differently**

**Something your friend left a trace on**

This offers choice without saying:

“You should see this.”

# 11. Add observation challenges

This is one of the clearest areas where our prototype can expand.

The culture probe showed strong interest in **interactive activities**, and observation challenges were one of the proposed future experiences.  

The interviews strongly reinforce this. Sketching and other active behaviours made visitors slow down and notice details they would otherwise miss.  

Our prototype currently focuses mostly on:

**notice → record**

We could add:

**prompt → look again → notice → optionally record**

For example:

### Echo Challenge

“Look at this artwork for another 20 seconds.”

Then:

“What changed?”

or:

“Find one detail someone else might miss.”

or:

“Move two steps to the side. What looks different?”

or:

“Choose one section you would sketch.”

These interactions are important because they return attention to the artwork.

The desired interaction loop becomes:

**prototype → physical action → artwork → reflection**

rather than:

**artwork → screen → screen → screen.**

That is exactly aligned with the literature finding that technology should augment rather than replace the physical gallery experience.  

# 12. Add lightweight visitor-generated sketches

Sketching emerged particularly strongly in the interview analysis.

Participants reported that sketching made them notice:

-   brushwork;

-   composition;

-   shadows;

-   spacing;

-   detail.

Our prototype could therefore allow visitors to create a **very simple visual trace**.

Not a full drawing application.

Instead:

**Add a 10-second sketch**

or:

**Circle what you noticed**

This could then become another type of footprint.

For example:

“Someone sketched this shape.”

That connects:

**active engagement**

with:

**social awareness.**

This could become a signature interaction of Gallery Echoes.

# 13. Connect the Collection back to social experience

Currently My Collection appears mainly personal.

We could introduce a very light social layer:

### My Echoes

what I saved

### Shared with me

things my companions left for me

### Echoes I left

things I contributed to the gallery

This would create a nice distinction between:

**private memory**

and

**shared social memory.**

That supports the interview finding that visitors want both personal reflection and social connection.  

# 14. Apple Watch and wearable extension

The wearable extension could actually become one of the strongest parts of our concept because it directly addresses the research concern around **screen distraction**.

The literature analysis repeatedly argues that digital technology should remain secondary to the physical experience and should not dominate visitor attention.  

The interviews also showed that participants did not want constant phone use, notifications, or screen-heavy experiences.  

Therefore, we should not make the Apple Watch simply a smaller version of the mobile app.

Instead, the wearable should act as a:

**quiet contextual companion.**

## Apple Watch function 1 — Subtle haptic social trace

When a visitor approaches an artwork where there is something meaningful nearby:

**one gentle vibration**

The watch shows:

**An Echo is nearby**

The visitor can:

**View**

or

**Ignore**

This reduces visual distraction.

## Apple Watch function 2 — Companion trace

If someone from the visitor’s temporary group has left a trace on the artwork:

**Mia left an Echo here**

Again:

**View**

**Later**

No need to immediately bring out the phone.

## Apple Watch function 3 — Reflection capture

After the visitor has stayed near an artwork for some time, the watch might quietly offer:

**Remember this?**

Then three quick options:

❤️ Save

💭 Reflect

→ Later

The detailed response could happen on the phone only if the visitor chooses.

## Apple Watch function 4 — Feeling input

Instead of opening the phone:

**How did this feel?**

The visitor can tap:

Calm

Curious

Surprised

Other

Again, this should remain optional.

## Apple Watch function 5 — Micro observation prompt

The watch could occasionally provide very short prompts:

**Look closer.**

**Try another angle.**

**Notice one detail.**

No long text.

This fits our active engagement findings very well.

# 15. Other wearable possibilities

If our concept extends beyond Apple Watch, we should think in terms of **interaction qualities**, rather than specific products.

For example:

### Haptic wristband

Could provide:

-   subtle proximity cues;

-   companion traces;

-   confirmation that a footprint has been saved;

-   low-attention navigation.

### Smart glasses

Could potentially show:

-   a tiny social trace;

-   an arrow toward a viewing position;

-   a minimal icon showing that a companion left something.

However, smart glasses create a greater risk of visual distraction, so this would need to be designed very carefully.

### NFC wristband

Visitors could tap near an artwork to:

-   save it;

-   leave a footprint;

-   retrieve it later.

This could be particularly useful because the literature supports tangible and embodied interaction.  

# 16. Our phone and wearable should have different roles

| **Device**                 | **Role**                                                                                           |
|----------------------------|----------------------------------------------------------------------------------------------------|
| **Phone**                  | Reflection, creating a footprint, viewing collection, detailed map, editing and reviewing memories |
| **Apple Watch / wearable** | Awareness, haptic cues, quick save, quick emotion, micro-prompts, companion traces                 |
| **Physical gallery**       | Main experience: artwork, movement, looking, conversation, sketching                               |
| **Gallery Echoes system**  | Connects these layers without becoming the centre of attention                                     |

This is a strong socio-technical design story.

The phone handles **depth**.

The wearable handles **presence**.

The gallery remains the **primary experience**.

# 17. What We would remove or reduce

There are also a few things I would simplify.

### NFT

The NFT option does not have strong grounding in our current research.

The culture probe supports saving favourites and personal memories, but that is not the same as wanting blockchain ownership.  

I would replace:

“Mint selected visuals as NFT”

with:

**Save as memory**

or:

**Keep in My Collection**

Unless NFT is required by the project brief.

### Too many notifications

Because our interviews strongly reject constant interruption, the wearable should not vibrate at every artwork.

The system should use a very conservative trigger model.

For example:

only when:

-   a companion left something;

-   the visitor explicitly enabled discovery mode;

-   there is a particularly relevant contextual cue.

Otherwise the system should remain silent.

### Too much AI language

We should avoid positioning AI as the intelligence that understands visitors.

Our prototype is stronger when AI is simply a **creative transformation mechanism**.

So:

“AI understood your emotion”

is weak.

But:

“Your response inspired this visual”

is strong.

# 18. A stronger research-grounded feature set

| **Core function**                | **Research connection**                                                       |
|----------------------------------|-------------------------------------------------------------------------------|
| **Discover Echoes**              | Other visitors influence attention; social awareness without direct messaging |
| **Look Again**                   | Active participation and observation deepen engagement                        |
| **Leave an Echo**                | Reflection, interpretation and visitor-generated contribution                 |
| **Explore Together, Separately** | Social connection while maintaining autonomy                                  |
| **Remember the Visit**           | Collection, personal memory and post-visit reflection                         |

# 19. The strongest concept statement for our prototype

Gallery Echoes is a social and contextual gallery experience that allows visitors to discover lightweight traces of how other people have engaged with artworks, leave their own reflections, and build a personal visual memory of their visit. Rather than requiring visitors to remain together or communicate directly, the system supports asynchronous connection and social awareness while preserving individual pace and interpretation. Mobile and wearable interactions are intentionally brief and peripheral, encouraging visitors to return their attention to the artworks, surrounding space, and people around them.

# 20. How the three research sources justify the prototype

The overall logic is:

**Literature tells us:**  
Museum experience is social and personal; active participation matters; visitors need agency; sociality does not require messaging; and technology should augment rather than replace the physical experience.

**Interviews tell us:**  
Visitors actually use other people’s behaviour as guidance, benefit from different perspectives, want to move at their own pace, engage more deeply through active participation, and dislike screen-heavy guidance.

**Culture probe tells us:**  
Visitors value social exploration, interactive activity, visual and atmospheric experiences, and a balance between structured navigation and freedom.

Together, these lead very naturally to:

**lightweight social traces + active observation + personal reflection + asynchronous connection + contextual wearable support**

rather than:

**another traditional museum information app.**
