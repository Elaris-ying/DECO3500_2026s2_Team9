# Gallery Echoes — Design Process & Conclusions

## Project Overview

Gallery Echoes is a gallery experience concept that uses mobile and wearable technology to help visitors:

- notice more artworks;
- see how other visitors interacted with artworks;
- leave their own thoughts or feelings;
- explore with friends without needing to stay together all the time;
- save meaningful moments from the visit.

The main idea is to use technology as a **small support layer**, while keeping the physical gallery and artworks as the main experience.

---

# 1. How We Developed the Concept

## Step 1 — Review our research

We looked back at three main research sources:

- literature review;
- interviews;
- culture probe.

Some ideas appeared repeatedly:

- visitors often notice artworks because of other people;
- visitors like social connection, but still want their own pace;
- people want freedom when moving through the gallery;
- reflection and personal interpretation are important;
- sketching and active tasks can make people look more carefully;
- too much phone use can distract from the artworks.

These findings became the starting point for our prototype.

---

## Step 2 — Turn the findings into design ideas

We then connected the research findings to possible functions.

For example:

**Research finding:**  
Visitors use other people's behaviour as informal guidance.

**Design idea:**  
Show small traces of what other visitors noticed.

**Interface:**  
Nearby Footprints.

Another example:

**Research finding:**  
Visitors want to explore with friends but do not always want to move at the same pace.

**Design idea:**  
Let people explore separately and reconnect later.

**Interface:**  
Companion traces and asynchronous group exploration.

---

## Step 3 — Check whether each feature is directly supported

We divided the features into two simple types.

### DIRECT

The research clearly supports the main function.

Example:

**Nearby Footprints** is directly connected to our interview finding that visitors use other people's behaviour to discover artworks.

### DERIVED

The research supports the general idea, but the exact technology is our design choice.

Example:

The research says technology should be optional and should not distract visitors.

We chose **NFC** as one possible way to do this.

So NFC is a **design choice**, not something the research says we must use.

---

# 2. Main Features and Their Sources

## 01 — Physical-first Entry & NFC

**Type:** DERIVED

### Source

**MD L13–15**

The prototype should be a lightweight layer around the physical gallery experience.

**MD L601–605**

Technology should remain secondary and should not dominate visitor attention.

**MD L725–735**

The research document also suggests that visitors could tap near an artwork to save or retrieve information.

### What we designed

Visitors first see the real artwork.

If they want more information, they can use an NFC tap to open the digital layer.

### Conclusion

The important research idea is:

> keep the gallery experience physical-first.

NFC is only one way to achieve this.

---

## 02 — Nearby Footprints

**Type:** DIRECT

### Source

**Interview — MD L29**

Visitors often use other people's behaviour as informal guidance.

**Literature — MD L31**

Social technology can support awareness without requiring direct messaging.

**MD L45–47**

The system should focus on the quality of engagement, not popularity numbers.

### What we designed

Instead of showing:

> 43 people viewed this artwork.

we show:

- Someone noticed the reflection.
- Someone sketched this detail.
- Someone returned to this artwork.

### Conclusion

Nearby Footprints helps visitors discover artworks through other people's activity without forcing them to communicate.

---

## 03 — Explore Together, Separately

**Type:** DIRECT

### Source

**Interview — MD L83–91**

Visitors want quiet observation, their own pace, and the ability to reconnect later.

**Interview — MD L125–169**

Some visitors enjoy visiting with others but do not want to maintain the same pace.

The research summarises the flow as:

> explore separately → leave traces → discover them later → reconnect

### What we designed

Friends can move through different parts of the gallery.

They can leave traces for each other and see them later.

### Conclusion

People can still feel connected without being forced to stay together.

---

## 04 — Capture a Response

**Type:** DIRECT

### Source

**MD L175–183**

The prompt:

> What did this artwork make you notice?

is open-ended and does not tell visitors what they should think.

**MD L185–189**

The research supports personal reflection and personal interpretation.

### What we designed

Visitors can leave:

- a short thought;
- a sketch;
- a photo;
- a voice note.

### Conclusion

The interface supports reflection without giving visitors a “correct answer”.

---

## 05 — Feeling Selection

**Type:** DIRECT

### Source

**MD L217–229**

Emotional reflection can help visitors think about their experience.

**MD L229–249**

The system should not tell visitors what they are feeling.

### What we designed

Visitors can choose:

- Calm
- Curious
- Nostalgic
- Something else
- Skip

### Conclusion

Feeling selection should always be optional.

The visitor chooses their own feeling.

---

## 06 — Visual Footprint

**Type:** DERIVED

### Source

**MD L251–269**

The research supports:

- reflection;
- emotion;
- memory;
- visitor-generated content;
- personal interpretation.

**MD L271–307**

The research also warns that AI should not look like it has found the “correct” meaning of a visitor's response.

### What we designed

A visitor's response can inspire an abstract visual memory.

The user can:

- regenerate it;
- adjust it;
- save it;
- keep the original response without a visual.

### Conclusion

The visual should be presented as:

> Your response inspired this visual.

not:

> AI understood your emotion.

The visual generation itself is our design idea.

---

## 07 — My Collection

**Type:** DIRECT

### Source

**MD L309–325**

The research supports personalisation, saving content and continuing the experience after the visit.

**Culture Probe — MD L327**

Participants showed interest in saving favourites.

**MD L353–381**

The experience should focus on what the visitor connected with, not how much they completed.

### What we designed

My Collection can save:

- artworks;
- personal thoughts;
- feelings;
- visual footprints;
- shared traces.

### Conclusion

The collection is a personal memory of the visit, not a progress score.

---

## 08 — Gallery Map

**Type:** DIRECT

### Source

**Culture Probe — MD L383–397**

Different visitors prefer different ways of exploring.

Some want:

- routes;
- maps;
- personal-interest exploration;
- social exploration.

The research describes this as a balance between:

> structure and freedom

### What we designed

Instead of saying:

> Go to Artwork 7 next.

the map can show:

- 3 traces nearby;
- a quiet area nearby;
- a friend left something in Gallery 3;
- a saved artwork nearby.

### Conclusion

The map gives useful information but still lets the visitor choose where to go.

---

## 09 — Echo Challenge & 10-second Sketch

**Type:** DIRECT

### Source

**Culture Probe — MD L481–483**

Interactive activities received strong interest.

**Interview — MD L483 and L529–541**

Sketching helped visitors slow down and notice details such as:

- brushwork;
- composition;
- shadows;
- spacing;
- small details.

**MD L517–525**

The preferred interaction is:

> prototype → physical action → artwork → reflection

### What we designed

Examples include:

- Look at the artwork for another 20 seconds.
- Find one detail someone else might miss.
- Move to another angle.
- Add a 10-second sketch.
- Circle what you noticed.

### Conclusion

The goal is not to make a full drawing app.

The goal is to make visitors look at the artwork more carefully.

---

## 10 — Wearable / Quiet Companion

**Type:** DERIVED

### Source

**MD L599–605**

The research says technology should not dominate the gallery experience.

Participants also did not want constant phone use or notifications.

**MD L607–631**

The wearable is described as a:

> quiet contextual companion

**MD L737–752**

The research document summarises the device roles as:

> The phone handles depth.  
> The wearable handles presence.  
> The gallery remains the primary experience.

### What we designed

The wearable can give:

- one gentle vibration;
- a simple “An Echo is nearby” message;
- View / Later;
- quick save;
- simple reflection prompts.

### Conclusion

The research does not require an Apple Watch.

A wearable is one possible way to reduce screen use and keep interaction simple.

---

# 3. Main Conclusions

After comparing the research with our prototype, we reached several main conclusions.

## 1. The artwork should stay at the centre

The phone, wearable and other digital functions should support the gallery experience, not replace it.

## 2. Social interaction does not need to mean chatting

Visitors can feel connected by seeing small traces of what other people noticed or did.

## 3. Visitors need their own pace

Group visitors should be able to separate, explore independently and reconnect later.

## 4. The system should not tell visitors what to think

Prompts and feeling selections should stay open and optional.

## 5. Maps should guide, not control

The system can show useful nearby information without telling visitors exactly where to go.

## 6. Active tasks can help people look more carefully

Short challenges and sketches can redirect attention back to the artwork.

## 7. Saving memories is more useful than tracking completion

The system should remember what mattered to the visitor, instead of showing how many artworks they completed.

---

# 4. Final Feature Set

The final concept can be summarised into five main functions:

| Function | Purpose |
|---|---|
| **Discover Echoes** | See how other visitors engaged with artworks |
| **Look Again** | Use small activities to notice more details |
| **Leave an Echo** | Record thoughts, feelings or sketches |
| **Explore Together, Separately** | Stay connected while keeping your own pace |
| **Remember the Visit** | Save meaningful moments after the visit |

---

# 5. Final Concept

Gallery Echoes is a lightweight social layer for the gallery.

Visitors can see small traces from other people, leave their own responses, explore independently with friends, and save meaningful moments.

The main idea is simple:

> **Use technology to help visitors notice, reflect and connect — without taking attention away from the artworks.**

---

## Source Note

The main source used for this summary is:

**`Prototype traces back to the research.md`**

The line numbers above refer to that document.

External papers can be added as supporting references, but the interview and culture-probe findings come from our own project research.
