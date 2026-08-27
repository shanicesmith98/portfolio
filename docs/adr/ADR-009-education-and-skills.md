# ADR-009: Add `education` and `skills` as sections, not timeline entries

- **Status:** Accepted
- **Date:** 2026-08-27
- **Deciders:** Shanice Smith

## Context

The content model in [ADR-003](ADR-003-content-model.md) covers `timeline` (work and
project entries) and `links`. A resume also carries two things that model does not have
a field for: **education** (degree, institution, dates) and **skills** (a list of
languages, frameworks and tools, often at more than one proficiency level).

Filling in `profile.ts` from a resume that has both currently means one of two things
happens: the information is silently dropped, or someone squeezes it into a field that
does not fit - a degree jammed into a `timeline` entry's `summary`, or every skill from
"professional experience" and "familiar with" flattened into one undifferentiated tag
list. The second is the sharper problem. Chris knows Python professionally and has
poked at Rust twice. A flat skill list that renders both the same way is not a
formatting compromise; it is a misstatement of what the person actually knows, on a
public page, which is exactly the kind of thing [ADR-003](ADR-003-content-model.md)'s
"never invent content" rule exists to prevent - even though nothing here is invented,
the shape of the field would force something true into something misleading.

## Decision

Two new top-level fields on `Profile`, each with its own section id, following the
pattern [ADR-006](ADR-006-section-order.md) established: a schema-validated array, a
Zod entry type, and an entry in `SECTION_IDS` so `sections.tsx` and the anchor nav pick
it up for free.

**`education: EducationEntry[]`**, defaulting to `[]`.

```ts
export const educationEntrySchema = z.object({
  id: z.string().min(1),
  institution: z.string().min(1),
  degree: z.string().min(1),
  /** "Emerging Media Technology: Game Design and Interactive Media" */
  field: z.string().optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}$/).nullable(),
  location: z.string().optional(),
  /** Affiliations, honors, relevant coursework - short lines, not paragraphs. */
  highlights: z.array(z.string()).default([]),
});
```

It is a separate array and a separate `Education` component, not a third `kind` on
`timelineEntrySchema`, but it reuses the same date-descending sort `Timeline` already
has, so "most recent first" behaves identically in both places without new code to
review.

**`skills: SkillGroup[]`**, defaulting to `[]`.

```ts
export const skillGroupSchema = z.object({
  /** "Professional experience", "Familiar with", "Languages" - the person's own label. */
  label: z.string().min(1),
  skills: z.array(z.string().min(1)).min(1),
});
```

`label` is a free string the person fills in, not a fixed enum of proficiency levels.
Someone with one undifferentiated skill list writes one group; someone whose resume
splits "professional" from "familiar with" writes two, in those words. The schema
enforces that a group exists and is not empty; it has no opinion on what the groups
are called.

Both fields are added to `SECTION_IDS` in `src/content/schema.ts` and get entries in
`src/components/sections.tsx`, exactly as `timeline` and `links` do today. Either
section can be omitted from `profile.sections` for a profile that has no education to
list (self-taught, bootcamp) or no separate skills section (someone whose skills are
already evident from their `tags`).

## Options we rejected

### Option: `kind: 'education'` as a third timeline entry kind

Reuse `timelineEntrySchema` - `title` becomes the degree, `organization` becomes the
institution, `summary` becomes the field of study - and let `Timeline` render it
alongside work and projects in one reverse-chronological stream.

Rejected mainly for `skills`, which has no date and cannot go in `timeline` under any
mapping - so a second mechanism is needed regardless, and once it exists, education fits
it better than it fits timeline. Splicing education into the work/project stream also
means `TIMELINE_FILTERS` grows a fourth state, and a visitor filtering to "Work" has to
understand why a degree sometimes shows up anyway or sometimes doesn't. A resume keeps
education in its own block for the same reason: it answers a different question
("what are you qualified in") than a career history does ("what have you shipped").
Cheaper to build, but it blurs a distinction readers already expect.

### Option: Flat `skills: string[]`, no grouping

The smallest possible shape - one array of strings, rendered as a tag cloud.

Rejected in the Context section above: it is the option that erases the
professional/familiar distinction a resume like this one actually draws, and doing
that is a misstatement of proficiency, not a simplification. The grouped shape costs
one extra field (`label`) and is still just an array of small objects.

### Option: Fixed proficiency enum (`level: 'professional' | 'familiar'`)

Instead of a free-text `label`, constrain it to a known set of levels.

Rejected because resumes do not agree on a vocabulary - "Proficient", "Working
knowledge", "Familiar with", "Comfortable in" all mean roughly the same thing to
different people, and forcing one of two enum values would make the model doing the
minute-22 rewrite guess which bucket a resume's own wording maps to. A free string
records what the resume actually says.

### Option: Education as prose in `intro`

No schema change at all - fold the degree into the existing first-person `intro`
paragraph.

Rejected because `intro` is voice, not fact. It is not schema-validated the way
`timeline` entries are, there is no field named `institution` or `startDate` for a test
to check, and multiple degrees or honors have nowhere to go without turning `intro`
into a paragraph nobody would actually write about themselves.

## Consequences

- **Good:** Resume information that currently has no home - degree, institution, and
  skills at their real proficiency level - gets a schema-validated field instead of
  being dropped or misrepresented.
- **Good:** Both sections are optional (default `[]`) and independently orderable or
  omittable via `profile.sections`, consistent with every other section.
- **Good:** `Education` reuses `Timeline`'s date-descending sort instead of inventing a
  second convention for the same idea.
- **Bad:** Two more Zod schemas, two more React components, two more entries in
  `sections.tsx`, and new fixtures in `tests/content.test.ts` - real surface area for a
  personal portfolio, justified only because the alternative is losing or distorting
  real content.
- **Bad:** `skills` groups are free-labeled, so nothing stops someone from writing
  confusing or overlapping group labels. Accepted the same way `profile.sections`
  accepts a nonsensical order: the schema validates shape, not judgment.
- **We will need to revisit this when:** someone wants a skill tied to specific
  timeline entries (e.g., "used at ACLU, familiar everywhere else") rather than a
  flat proficiency group - at which point skills stop being their own section and
  become a derived view over `timeline[].tags`, which is a bigger change than this one.
