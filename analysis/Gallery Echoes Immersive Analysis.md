# Gallery Echoes — Immersive Interaction Analysis

## 1. Overview

This stage explores how **Gallery Echoes** can move from a screen-based concept toward a more immersive wearable experience.

The main idea is to use a **wearable wrist device with palm-based interaction**. Instead of asking visitors to repeatedly use a phone, the wearable gives subtle cues and projects lightweight visual interaction onto the palm. The goal is to support:

- personal reflection;
- low-pressure social awareness;
- active observation of artworks;
- asynchronous connection with other visitors;
- continued attention to the physical gallery environment.

The current interaction flow is:

> **Observe → Express → Create Echo → See Others → Follow Perspective → Save & Continue**

---

## 2. Early Form Exploration

### 2.1 Wearable form

The early sketches explore a device worn around the wrist rather than a conventional smartwatch.

Key characteristics:

- lightweight wristband form;
- small sensing / projection module near the wrist;
- palm used as the temporary interaction surface;
- interface appears only when needed;
- minimal permanent screen hardware.

This direction helps separate Gallery Echoes from a normal mobile or smartwatch application. The wearable is treated as a **quiet companion** rather than a second phone.

### 2.2 Palm as an interaction surface

The palm is explored as both:

1. a **display surface** for projected interface elements;
2. an **input surface** for touch or gesture interaction.

Possible interactions include:

- selecting a colour;
- tapping an Echo;
- swiping through nearby Echoes;
- confirming or saving;
- receiving a directional cue to look again at the artwork.

The palm interface should remain temporary and lightweight so that the visitor's attention can quickly return to the physical artwork.

---

## 3. Interaction Flow Analysis

### 3.1 Observe

**Purpose:** Help visitors notice that a new artwork or social trace is nearby without forcing interaction.

**Interaction:**

- the wristband detects an artwork or nearby Echo;
- the visitor receives a subtle vibration;
- a small visual cue appears on the palm;
- the visitor chooses whether to continue.

**Design implication:** Technology should support awareness, not demand attention.

### 3.2 Express

**Purpose:** Allow visitors to express their own response without requiring long text input.

**Interaction:**

- a colour wheel appears on the palm;
- the visitor chooses a colour based on how the artwork feels to them;
- colours are not given fixed emotional labels;
- the visitor defines the meaning personally.

**Design implication:** The interface avoids forcing users into predefined emotional categories.

### 3.3 Create Echo

**Purpose:** Turn the visitor's personal response into a visual memory.

**Interaction:**

- the selected colour becomes an abstract visual form;
- the form becomes the visitor's personal **Echo**;
- the Echo is associated with the current artwork.

**Design implication:** The output is visual and non-verbal, making contribution quick and accessible.

### 3.4 See Others

**Purpose:** Create low-pressure social awareness.

**Interaction:**

- visitors see abstract Echoes left by previous visitors;
- each Echo represents another person's experience or perspective;
- the interface does not use popularity rankings, follower counts, or competitive metrics;
- visitors can choose whether to open an Echo.

**Design implication:** The system supports **social awareness rather than social media behaviour**.

### 3.5 Follow Perspective

**Purpose:** Use another visitor's trace to encourage a new way of looking at the artwork.

**Interaction:**

- the visitor selects one Echo;
- the system reveals where or how the previous visitor engaged with the artwork;
- a light directional cue links the Echo back to the physical artwork;
- the visitor is encouraged to change position or look again.

**Design implication:** Digital interaction should lead back to physical observation.

### 3.6 Save & Continue

**Purpose:** Allow the experience to continue without keeping the visitor on the interface.

**Interaction:**

- the current Echo is saved;
- the interface fades;
- the visitor continues exploring the gallery;
- saved Echoes can later become part of a personal gallery journey.

**Design implication:** The wearable supports short moments of interaction rather than continuous screen use.

---

## 4. Interface Structure

| Interface state | Main visual element | Main action |
|---|---|---|
| Observe | Small coloured traces / artwork cue | Notice |
| Express | Colour wheel | Select colour |
| Create Echo | Abstract colour form | Confirm personal Echo |
| See Others | Multiple Echo bubbles | Browse / tap |
| Follow Perspective | Selected Echo + directional connection | Look again |
| Save & Continue | Echo cluster + save indicator | Save and leave |

### Interaction principles

- large touch targets;
- minimal text;
- no complex menus;
- visual-first communication;
- one primary action per state;
- optional interaction;
- short interaction duration.

---

## 5. Wearable and Mobile Relationship

The wearable should handle the **in-gallery core interaction**, while a mobile interface can provide optional deeper information.

### Wearable

Responsible for:

- artwork detection;
- vibration cues;
- colour expression;
- Echo generation;
- nearby Echo discovery;
- perspective prompts;
- quick save actions.

### Mobile

Responsible for:

- initial device setup;
- detailed artwork information;
- gallery map;
- saved Echo collection;
- post-visit review;
- device settings and accessibility options.

This division keeps the gallery experience lightweight while still allowing richer information when needed.

---

## 6. Related Design Precedents

### 6.1 LumiWatch

**Project:** LumiWatch — On-skin Projected Interface  
**Institution:** Carnegie Mellon University  
**Year:** 2018

LumiWatch demonstrates a wrist-worn system that projects an interactive interface onto the user's skin.

**Relevant inspiration for Gallery Echoes:**

- wrist-mounted projection;
- body surface as an extended display;
- touch interaction beyond a small wearable screen;
- temporary interfaces that appear only when needed.

**Connection to Gallery Echoes:**

Gallery Echoes adapts this interaction model to a gallery context. Instead of reproducing a complete mobile interface, the palm is used only for short reflective and social interactions.

Reference:  
https://www.futureinterfaces.com/research/2018/lumiwatch

### 6.2 OmniTouch

**Project:** OmniTouch — Wearable Multitouch Interaction Everywhere  
**Authors:** Harrison, Benko & Wilson  
**Year:** 2011  
**Venue:** UIST

OmniTouch explores wearable projection and sensing that can turn hands, arms, walls, and other surfaces into interactive interfaces.

**Relevant inspiration for Gallery Echoes:**

- palm as both input and output;
- direct touch on projected interface elements;
- large, simple projected targets;
- interaction without holding a phone.

**Connection to Gallery Echoes:**

Gallery Echoes uses a similar body-surface interaction principle but applies it to short gallery interactions such as choosing colour, opening another visitor's Echo, and following a visual perspective cue.

Reference:  
https://www.microsoft.com/en-us/research/publication/omnitouch-wearable-multitouch-interaction-everywhere/

---

## 7. Design Synthesis

The concept combines three main ideas.

### 7.1 Embodied interaction

The visitor interacts through their own body rather than continuously looking at a separate screen.

### 7.2 Lightweight social traces

Visitors encounter small traces of other people's experiences without needing synchronous conversation.

### 7.3 Return to the artwork

The digital layer is not the final destination. Its role is to encourage the visitor to:

- look again;
- move to another viewpoint;
- notice a different detail;
- reflect on another interpretation.

The core design principle is therefore:

> **The interface should appear briefly, support reflection or discovery, and then disappear so attention returns to the artwork.**

---

## 8. Prototype Direction

For a low-fidelity prototype, the full projection technology does not need to be implemented.

Possible simulation methods include:

- transparent plastic tube as the wristband;
- paper or foam board for the wearable module;
- coloured paper circles to simulate LED / Echo states;
- printed colour-wheel interface;
- transparent film or tracing paper placed over the palm to simulate projection;
- facilitator-triggered vibration or verbal cues;
- paper interface states swapped manually during user testing.

### What should be tested

The prototype should investigate:

1. whether users understand the palm interface;
2. whether the colour wheel feels intuitive;
3. whether users understand what an Echo represents;
4. whether seeing other Echoes encourages new perspectives;
5. whether the Look Again interaction successfully redirects attention to the artwork;
6. whether the wearable feels less distracting than using a phone;
7. whether the interaction remains optional and lightweight.

---

## 9. Current Design Direction

The current direction can be summarised as:

**Wearable cue**  
→ **Palm interaction**  
→ **Personal expression**  
→ **Visual Echo**  
→ **Shared social traces**  
→ **Perspective discovery**  
→ **Return to artwork**  
→ **Save and continue**

This creates a gallery experience where digital technology supports rather than replaces physical observation.

---

## 10. Key Design Statement

> **Gallery Echoes uses lightweight wearable interaction and palm-projected visual traces to support personal reflection, asynchronous social awareness, and renewed attention to physical artworks.**

The wearable is not designed to become another screen. Its role is to create short moments of reflection and connection before letting the visitor return to the gallery experience.
