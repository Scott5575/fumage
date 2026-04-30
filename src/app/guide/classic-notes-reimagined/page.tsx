import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Classics, Reimagined — Fumage Guide",
  description:
    "Vetiver, leather, fougère, tobacco — the pillars of masculine perfumery aren't going anywhere. But they've shed their skins. Note by note, what's changed and what to wear.",
};

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-amber-500/30 pl-6 my-10">
      <p className="font-serif text-xl italic font-light text-stone-300 leading-relaxed">
        {children}
      </p>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-4 flex items-center gap-3">
      {children}
      <span className="flex-1 h-px bg-stone-800 max-w-[60px]" />
    </p>
  );
}

type Facet = {
  title: string;
  items: string[];
  cols:  1 | 2;
};

type Pick = {
  name:  string;
  house: string;
  role:  string;
};

type NoteEntry = {
  num:        string;
  label:      string;
  heading:    string;
  intro:      string;
  body:       string[];
  pullquote?: string;
  facet?:     Facet;
  picks?:     Pick[];
};

const NOTES: NoteEntry[] = [
  {
    num:   "01",
    label: "Earthy Roots",
    heading: "Vetiver",
    intro:
      "Vetiver is, arguably, the most masculine raw material in perfumery — and that word is earned. Extracted from the roots of a grass native to South Asia, it is earthy, smoky, woody, and dry in a way that feels almost geological: the olfactory equivalent of old stone, turned soil, and clean air after rain. Guerlain's Vétiver (1961) demonstrated that a single material, handled with intelligence, could be one of the most complete and sophisticated scents ever made. It still can.",
    body: [
      "The classic approach to vetiver was about restraint — let the material speak. The modern interpretation is more architectural. Today's perfumers use vetiver as a structural element rather than a starring one, pairing it with unexpected partners: mineral facets, saline accords, and light florals that lift its smokiness while preserving depth. Haitian vetiver, with its more transparent almost rum-like quality, has overtaken the heavier Bourbon and Java varieties in prestige releases, lending modern vetivers an airiness the classics never quite had.",
      "The synthetic landscape has also improved. Javanol and Iso E Super, carefully dosed, allow perfumers to amplify vetiver's woody facets without tipping into the dusty dryness that plagued many 1990s interpretations. The result is vetiver that reads as simultaneously ancient and contemporary — a material that smells like it exists outside of time, which is the highest compliment you can pay it.",
    ],
    pullquote: "The best vetiver doesn't just smell earthy — it smells earned. Like something that has been somewhere.",
    facet: {
      title: "Facet Profile",
      cols:  2,
      items: [
        "Smoky earth",
        "Dry wood",
        "Wet stone / mineral",
        "Rum, molasses",
        "Green, grassy",
        "Incense, resin",
        "Leather (Bourbon vetiver)",
        "Transparent smoke",
      ],
    },
    picks: [
      { name: "Vétiver Extraordinaire",  house: "Frédéric Malle",          role: "The Benchmark"       },
      { name: "Encre Noire À L'Extrême", house: "Lalique",                  role: "Dark & Architectural" },
      { name: "Vétiver (Original)",       house: "Guerlain",                 role: "The Ancestor"         },
      { name: "Vétiver & Bergamote",      house: "Maison Margiela Replica",  role: "Modern / Accessible"  },
    ],
  },
  {
    num:   "02",
    label: "Hide & Character",
    heading: "Leather",
    intro:
      "Leather is the note with the longest identity crisis in masculine perfumery. At its peak — the Russian leather chypres of the mid-20th century, Knize Ten (1925), certain iterations of Bel Ami — it was devastatingly sophisticated. Warm, animalic, slightly tarry, undeniably adult. Then IFRA restrictions gutted many of the birch tar and castoreum-based naturals that gave classic leather its backbone, and the mass market discovered cheap synthetic approximations that smelled like a briefcase from a discount office supply store.",
    body: [
      "Heritage leather is undergoing a genuine reconstruction — perfumers working to recapture the smoky, tarry animalic quality of pre-restriction materials using styrax analogues, labdanum, and creative workarounds. The best results smell genuinely ancient in the best possible sense: like inherited objects, not new purchases.",
      "The more interesting development is what perfumers call skin leather — accords built around Norlimbanol, Ambrox, and carefully handled musks that evoke warm, inhabited leather rather than raw hide. This is leather as body experience: the smell of a worn-in jacket, suede that carries memory. Intensely personal, shockingly wearable.",
    ],
    pullquote: "There are now two leathers in men's perfumery: the kind that whispers of saddlery and old money, and the kind that smells like you after a very good day.",
    picks: [
      { name: "Knize Ten",          house: "Knize",          role: "Heritage / The Original"     },
      { name: "Tuscan Leather",     house: "Tom Ford",        role: "Brutalist, Unforgettable"    },
      { name: "Portrait of a Lady", house: "Frédéric Malle",  role: "Rose-Leather Transcendence"  },
      { name: "Bel Ami Vétiver",    house: "Hermès",          role: "Sophisticated Daily Wear"    },
    ],
  },
  {
    num:   "03",
    label: "The Original Template",
    heading: "Fougère",
    intro:
      "If you have ever smelled a real barbershop you have smelled fougère. The word is French for fern — slightly absurd given that ferns don't smell like much — but the accord that carries the name is one of the most identifiable structures in Western perfumery: lavender, oakmoss, coumarin, and bergamot. Fougère Royale by Houbigant (1882) was arguably the first synthetic fragrance in history — coumarin was one of the first aromachemicals ever isolated — which makes the fougère family the origin point of modern perfumery itself.",
    body: [
      "Oakmoss, the soul of the classic fougère, has been heavily restricted by IFRA due to sensitisation concerns. The fragrance community's frustration about this is entirely legitimate. However, something interesting has happened in the void it left: a wave of perfumers has used the constraint as creative licence to rebuild the family from scratch. Modern fougères reach for clary sage, violet leaf, and new synthetic mossy accords. Some are disappointingly thin. Others are genuinely wonderful — leaner, crisper, less ponderous, with an almost abstract quality that makes them feel more like ideas than memories.",
    ],
    pullquote: "The modern fougère has done what all good traditions do when faced with constraint: it evolved. It got stranger, more interesting, and considerably better at dinner parties.",
    facet: {
      title: "The Accord — Anatomy",
      cols:  2,
      items: [
        "Lavender — bright, medicinal, clean",
        "Coumarin — warm, hay, tonka-like",
        "Oakmoss — damp, forest floor, dark",
        "Bergamot — citrus, aromatic lift",
        "Geranium — rose, metallic, herbal",
        "Musks — fixation, warmth",
      ],
    },
    picks: [
      { name: "Pour Monsieur Concentrée", house: "Chanel",  role: "Timeless Elegance"         },
      { name: "Reflection Man",           house: "Amouage", role: "Modern Fougère Pinnacle"   },
      { name: "Azzaro Pour Homme",        house: "Azzaro",  role: "The Classic — Revisit It"  },
      { name: "Égoïste Platinum",         house: "Chanel",  role: "Woody Fougère, Effortless" },
    ],
  },
  {
    num:   "04",
    label: "Fire & Slow Burn",
    heading: "Tobacco & Smoke",
    intro:
      "Tobacco in fragrance has nothing to do with cigarettes. Anyone who has encountered the tobacco chypres of Caron or Dunhill knows that this note is closer to a Cuban cigar humidor — rich cured leaf, dried figs, dark honey, and sun-warmed wood. It is one of the most complex raw material families in the perfumer's toolkit. When handled well it is almost narratively compelling: you smell it and you see a room, low light, leather chairs, old books, the particular quiet that comes with having nothing to prove.",
    body: [
      "Smoke is distinct from tobacco — though frequently accompanying it — and has undergone its own transformation. Frankincense, labdanum, and birch tar have always contributed smokiness to masculine compositions, but 2026 finds perfumers reaching for a more nuanced toolkit: oud smoke, gunpowder accords, and the mineral-smoke of wet stone and struck flint. The result feels less like an ashtray and more like atmosphere. Think embers long after a fire, not the fire itself.",
    ],
    pullquote: "Great tobacco in fragrance doesn't smell like something being consumed. It smells like something that has already been, and left the room better for it.",
    picks: [
      { name: "Tobacco Vanille",  house: "Tom Ford Private Blend", role: "The Modern Touchstone" },
      { name: "Tabac Blond",      house: "Réminiscence",           role: "Old Soul"               },
      { name: "Interlude Man",    house: "Amouage",                role: "Smoke as Ambition"      },
      { name: "Dark Lord",        house: "Etat Libre d'Orange",    role: "Difficult, Magnificent" },
    ],
  },
  {
    num:   "05",
    label: "The Foundation",
    heading: "Sandalwood, Cedarwood & the Aromatic Woods",
    intro:
      "Woody bases have always been where masculine fragrances go to resolve themselves — the final act that makes sense of everything that came before. Cedar, with its dry pencil-shaving clarity, has been a staple since before any of us were born. Sandalwood, particularly the genuine Mysore variety now so expensive it borders on obscene, offers that creamy, milky, tactile depth that nothing synthetic has yet fully replicated.",
    body: [
      "The shift in 2026 is less about new materials than new attitudes toward existing ones. The woody-oriental category, strip-mined for flankers throughout the 2010s, has been quietly elevated by a clutch of perfumers treating wood not as a shortcut to warmth but as a philosophical position. Wood as honesty. Wood as patience. Wood as something that outlasts every other material in the composition because it was never trying very hard to begin with.",
    ],
    facet: {
      title: "Know Your Woods",
      cols:  1,
      items: [
        "Sandalwood: creamy, milky, smooth — the diplomat of the palette; smooths everything it touches",
        "Cedarwood: dry, pencil-shaving, structural — Atlas adds softness; Virginian is drier and more austere",
        "Guaiac Wood: smoky, slightly rosy — one of the great underrated woods; can carry an entire composition",
        "Oud (Agarwood): complex, animalic, sweet, deep — wildly variable by origin; the most contentious raw material in the modern conversation",
      ],
    },
    picks: [
      { name: "Tam Dao",         house: "Diptyque", role: "Sandalwood Masterclass"        },
      { name: "Terre d'Hermès",  house: "Hermès",   role: "Mineral Wood — Iconic"         },
      { name: "Santal 33",       house: "Le Labo",  role: "Overexposed. Still Brilliant." },
      { name: "A*Men Pure Wood", house: "Mugler",   role: "Underrated — Seek It Out"      },
    ],
  },
  {
    num:   "06",
    label: "Under the Skin",
    heading: "Musk",
    intro:
      "No note has been more misused in masculine fragrance than musk. In its original form — derived from the musk deer's gland, now essentially banned — it was ferociously animalic, sexual, and intensely alive. What replaced it was, for two decades, a parade of white musks that smelled like clean laundry stretched into a product brief. Fresh, clean, soapy — not exactly inspiring.",
    body: [
      "Here is where 2026 gets genuinely interesting. The musk revolution is being driven by a new generation of macro-molecular musks — Ambrox, Iso E Super, Norlimbanol, Romandolide, Cashmeran — that don't pretend to be clean. They are skin musks: intimate, warm, slightly animalic, entirely modern. They don't announce themselves; they are discovered. The contemporary masculine that does musks well is a fragrance that seems to deepen and improve the further you get from the bottle, interacting with skin chemistry in ways that cheap laundry musks cannot.",
    ],
    pullquote: "A great musk base doesn't say 'I shower twice a day.' It says 'I've been somewhere interesting and I'm not telling you where.'",
  },
];

export default function ClassicNotesReimaginedPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">

      {/* Back */}
      <Link
        href="/guide"
        className="text-[10px] uppercase tracking-[0.2em] text-stone-600 hover:text-stone-400 transition-colors block mb-12"
      >
        ← Guide
      </Link>

      {/* Masthead */}
      <div className="mb-16 pb-16 border-b border-stone-800/60">
        <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-6">
          Education · Notes
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-100 leading-[1.08] mb-6">
          The Classics,<br />
          <em className="italic text-amber-400">Reimagined</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          Vetiver, leather, fougère, tobacco — the pillars of masculine perfumery aren&apos;t going
          anywhere. But they&apos;ve shed their skins. Note by note: what&apos;s changed, and what to wear.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          6 classic notes · facet profiles · bottle picks per note
        </p>
      </div>

      {/* Intro */}
      <div className="mb-16 pb-16 border-b border-stone-800/60">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          For most of the 2000s and into the early 2010s, &quot;masculine fragrance&quot; became olfactory
          shorthand for blunt aggression. Synthetic musks turned nuclear. Leathers became plasticky.
          The classics — vetiver, tobacco, oakmoss, birch tar, fougère — were either buried under
          flanker abuse or left to gather dust while the industry chased duty-free performance.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-5">
          That era is over. A new generation of perfumers has come up steeped in both the history and
          the chemistry, and they are doing something genuinely exciting: honouring the soul of these
          notes while completely rethinking how they&apos;re expressed. The results smell, in many cases,
          like the best possible version of what those notes always promised to be.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          Note by note — no nostalgia tourism, no hype. An honest assessment of where the pillars of
          masculine perfumery stand now, what has changed, and what belongs on your shelf.
        </p>
      </div>

      {/* Note sections */}
      {NOTES.map(({ num, label, heading, intro, body, pullquote, facet, picks }) => (
        <section key={num} className="mb-16 pb-16 border-b border-stone-800/60 last:border-0">

          <SectionLabel>Note {num} — {label}</SectionLabel>
          <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
            <em className="italic text-amber-400/80">{heading}</em>
          </h2>

          {/* Lead paragraph */}
          <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
            {intro}
          </p>

          {/* Body paragraphs */}
          {body.map((para, i) => (
            <p key={i} className="text-sm text-stone-400 font-light leading-relaxed mb-5">
              {para}
            </p>
          ))}

          {/* Facet card */}
          {facet && (
            <div className="border border-stone-800/60 rounded p-5 bg-stone-950/20 mb-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-4">
                {facet.title}
              </p>
              <div
                className={
                  facet.cols === 1
                    ? "space-y-3"
                    : "grid grid-cols-2 gap-x-6 gap-y-3"
                }
              >
                {facet.items.map((item) => (
                  <p
                    key={item}
                    className="text-[11px] text-stone-500 font-light leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-amber-800/50 flex-shrink-0 mt-0.5">◆</span>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Pullquote */}
          {pullquote && <PullQuote>{pullquote}</PullQuote>}

          {/* Picks */}
          {picks && picks.length > 0 && (
            <div className="border border-stone-800 rounded overflow-hidden">
              <div className="px-4 py-2.5 bg-stone-900/40 border-b border-stone-800">
                <p className="text-[9px] uppercase tracking-[0.2em] text-stone-600">
                  Recommended Bottles
                </p>
              </div>
              {picks.map(({ name, house, role }) => (
                <div
                  key={name}
                  className="flex items-baseline justify-between gap-4 px-4 py-3 border-b border-stone-800/60 last:border-0"
                >
                  <div className="min-w-0">
                    <span className="text-stone-300 text-[12px] font-light">{name}</span>
                    <span className="text-[11px] text-stone-600 font-light italic ml-2">{house}</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.12em] text-stone-700 flex-shrink-0 text-right">
                    {role}
                  </span>
                </div>
              ))}
            </div>
          )}

        </section>
      ))}

      {/* Verdict */}
      <section className="mb-16">
        <SectionLabel>The Verdict</SectionLabel>
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          The state of classical masculine notes is, quietly, excellent. The chemistry is better. The
          source materials are being handled with more reverence. And a critical mass of perfumers —
          in established houses and the niche space alike — have genuinely committed to understanding
          what made these notes great before trying to update them.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-5">
          The mistake to avoid is nostalgia without discernment. Not every older fragrance is worth
          preserving, and not every &quot;reimagined&quot; release is worth buying. The benchmark remains the
          same as it ever was: does it smell like a complete, intentional thing? Does it have
          somewhere to go, something to say?
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          When the answer is yes — and it increasingly is — there has never been a better time to be
          a man with a nose, a curiosity, and a well-edited shelf.
        </p>
      </section>

      {/* Close */}
      <div className="text-center pt-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-700">fin</span>
      </div>

    </main>
  );
}
