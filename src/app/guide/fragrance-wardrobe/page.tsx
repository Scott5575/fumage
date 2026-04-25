import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Fragrance Wardrobe — Fumage Guide",
  description: "How to build a versatile fragrance collection from scratch — five essential slots, seasonal logic, and collector traps to avoid.",
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

type FragRef = { name: string; slug: string | null };

function FragLinks({ frags }: { frags: FragRef[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {frags.map(({ name, slug }) =>
        slug ? (
          <Link
            key={name}
            href={`/fragrances/${slug}`}
            className="text-[10px] px-2 py-0.5 border border-stone-800 hover:border-amber-800/50 text-stone-500 hover:text-amber-400 rounded transition-colors"
          >
            {name}
          </Link>
        ) : (
          <span
            key={name}
            className="text-[10px] px-2 py-0.5 border border-stone-800 text-stone-600 rounded"
          >
            {name}
          </span>
        )
      )}
    </div>
  );
}

const SLOTS = [
  {
    n: "01",
    name: "The Daily Driver",
    context: "Every day · All seasons",
    desc: "Versatile and likable. Needs to work at 7am on public transit and still be appropriate at 7pm at dinner.",
    frags: [
      { name: "Bleu de Chanel EDP",  slug: "chanel-bleu-de-chanel-edp"      },
      { name: "Sauvage EDP",          slug: "dior-sauvage-edp"                },
      { name: "Terre d'Hermès EDT",   slug: "herm-s-terre-d-herm-s-edt"      },
    ],
  },
  {
    n: "02",
    name: "The Office Scent",
    context: "Weekdays · Enclosed spaces",
    desc: "Light projection, clean character. If colleagues can smell you clearly from three feet away, you've failed.",
    frags: [
      { name: "L'Eau d'Issey",     slug: "issey-miyake-l-eau-d-issey-pour-homme" },
      { name: "Azzaro Chrome",     slug: "azzaro-azzaro-chrome"                   },
      { name: "Voyage d'Hermès",   slug: "herm-s-voyage-d-herm-s"                },
    ],
  },
  {
    n: "03",
    name: "The Evening Scent",
    context: "Evenings · Cool weather · Close company",
    desc: "Richer, warmer, more projection. The one you reach for when the lighting is deliberately low.",
    frags: [
      { name: "La Nuit de L'Homme", slug: "yves-saint-laurent-la-nuit-de-l-homme" },
      { name: "Oud Wood",           slug: "tom-ford-oud-wood"                      },
      { name: "Reflection Man",     slug: "amouage-reflection-man"                 },
    ],
  },
  {
    n: "04",
    name: "The Summer Scent",
    context: "Warm months · Outdoors · Active",
    desc: "Heat amplifies everything. This slot needs something genuinely light — EDT or EDC territory. Don't bring your evening scent here.",
    frags: [
      { name: "Cool Water",    slug: "davidoff-cool-water"               },
      { name: "Acqua di Giò", slug: "giorgio-armani-acqua-di-gi-edt"    },
      { name: "Sailing Day",   slug: "maison-margiela-replica-sailing-day" },
    ],
  },
  {
    n: "05",
    name: "The Wildcard",
    context: "When you want to be interesting",
    desc: "The one bottle where you stopped thinking about wearability. Something divisive, specific, and unmistakably yours.",
    frags: [
      { name: "Polo",           slug: "ralph-lauren-polo"     },
      { name: "Tuscan Leather", slug: "tom-ford-tuscan-leather" },
      { name: "Knize Ten",      slug: null                     },
    ],
  },
];

const SEASONS = [
  {
    name: "Spring",
    tag: "Fresh starts, unpredictable weather",
    note: "Aromatic fougères, light woodies, anything with green or herbal elements. Lavender has its moment here. Avoid anything too heavy.",
    frags: [
      { name: "Terre d'Hermès EDT", slug: "herm-s-terre-d-herm-s-edt" },
      { name: "Sauvage EDT",         slug: "dior-sauvage"               },
      { name: "Azzaro Chrome",       slug: "azzaro-azzaro-chrome"       },
    ],
  },
  {
    name: "Summer",
    tag: "Heat, skin, projection",
    note: "EDT or EDC territory. Citrus, aquatic, and marine notes thrive here. Keep it light. One spray of something fresh beats three sprays of anything heavy.",
    frags: [
      { name: "Acqua di Giò EDT", slug: "giorgio-armani-acqua-di-gi-edt"     },
      { name: "Cool Water",        slug: "davidoff-cool-water"                },
      { name: "Sailing Day",       slug: "maison-margiela-replica-sailing-day" },
    ],
  },
  {
    name: "Autumn",
    tag: "The best fragrance season",
    note: "Cooler air slows projection just enough. Woody and spicy notes settle beautifully. The context — coats, wool, shorter days — suits richer scents perfectly.",
    frags: [
      { name: "Bleu de Chanel EDP",  slug: "chanel-bleu-de-chanel-edp"              },
      { name: "La Nuit de L'Homme", slug: "yves-saint-laurent-la-nuit-de-l-homme"  },
      { name: "Polo",                slug: "ralph-lauren-polo"                       },
    ],
  },
  {
    name: "Winter",
    tag: "Rich, warm, intimate",
    note: "The season for orientals, ambers, and leathers. Cold air suppresses projection, so you can wear heavier fragrances without overwhelming anyone.",
    frags: [
      { name: "Tobacco Vanille",  slug: "tom-ford-tobacco-vanille" },
      { name: "Reflection Man",   slug: "amouage-reflection-man"   },
      { name: "Knize Ten",        slug: null                        },
    ],
  },
];

const STAGES = [
  {
    n: "1",
    name: "Anchor",
    action: "Fill Slot 01 — the daily driver",
    body: "Start with the most versatile bottle you can find. Wear it every day for at least a month. Understand it thoroughly before buying anything else. This becomes your reference point.",
    tip: "Bleu de Chanel EDP or Dior Sauvage EDP are the safest starting anchors.",
  },
  {
    n: "2",
    name: "Contrast",
    action: "Add something that fills your biggest gap",
    body: "If your anchor is a rich EDP, your gap is probably summer or office. Add the bottle that serves the context your daily driver can't. Should feel noticeably different.",
    tip: "The contrast principle: warm anchor → add something fresh. Fresh anchor → add something warm.",
  },
  {
    n: "3",
    name: "Character",
    action: "Add the wildcard — something entirely yours",
    body: "Once you know your baseline preferences, take a real risk. Something leather, oud, smoky, or strange. The wildcard slot is where your fragrance identity actually develops.",
    tip: "Sample aggressively here. This slot deserves more consideration than the other four combined.",
  },
  {
    n: "4",
    name: "Refine",
    action: "Fill remaining slots only as the need becomes real",
    body: "Don't buy a summer scent in January just because the wardrobe needs one. Buy it in April when summer is approaching and you actually feel the gap.",
    tip: "A five-bottle wardrobe built over two years beats a ten-bottle collection assembled in a month.",
  },
];

const TRAPS = [
  {
    name: "The FOMO buy",
    body: "A limited release, a soon-to-be-discontinued bottle. Ask yourself: would I buy this at full price if it were permanent? If no, the scarcity is doing the selling.",
  },
  {
    name: "The decant-to-bottle pipeline",
    body: "You sample a fragrance and immediately order the full bottle before finishing the decant. Finish the decant first. Consistently reaching for it over weeks is the only real proof you want it.",
  },
  {
    name: "The duplicate slot",
    body: "Buying a second fresh EDT when you already have a great one. Ask whether your wardrobe has the gap, or whether you just want another bottle. Both are valid — just be honest.",
  },
  {
    name: "The holy grail chase",
    body: "The belief that somewhere is a perfect fragrance that will make the search feel complete. There isn't. The search is the hobby. This is fine — just don't spend money hunting a finish line that doesn't exist.",
  },
];

export default function FragranceWardrobePage() {
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
          The Art of Fragrance
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-100 leading-[1.08] mb-6">
          The Fragrance Wardrobe:<br />
          <em className="italic text-amber-400">Why One Bottle Isn&apos;t Enough</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          You wouldn&apos;t wear a tuxedo to the gym or trainers to a job interview. Fragrance works the same way — context matters, and the right scent for every occasion is almost never the same bottle.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          Wardrobe building, seasonal rotation, collector traps, and the five slots · 13 min read
        </p>
      </div>

      {/* Intro */}
      <div className="mb-14">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          Most men own one cologne. They spray it every day regardless of season, occasion, or mood — in July heat and December cold, at job interviews and beach holidays alike. It works, technically. Nobody has ever been arrested for wearing Bleu de Chanel to a barbecue.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          But fragrance responds to context in a way that almost no other grooming decision does. Temperature changes how a fragrance projects. Occasion changes what it communicates. Mood shapes what you want to smell like — and what you smell like shapes your mood right back.
        </p>
      </div>

      {/* Five slots */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Framework</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          The five <em className="italic text-amber-400/80">wardrobe slots</em>
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-8">
          Five well-chosen bottles will cover essentially every situation a person regularly encounters. Think of these as slots — positions on a roster that need filling — rather than a shopping list.
        </p>

        <div className="space-y-3">
          {SLOTS.map(({ n, name, context, desc, frags }) => (
            <div key={n} className="border border-stone-800 rounded p-5 bg-stone-950/30 flex gap-5">
              <span className="font-serif text-4xl font-light text-stone-800 leading-none flex-shrink-0 w-8 text-right pt-0.5">
                {n}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-stone-200 font-light mb-0.5">{name}</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-amber-500/50 mb-2">{context}</p>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed">{desc}</p>
                <FragLinks frags={frags} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seasons */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Rotation</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          Season changes <em className="italic text-amber-400/80">everything</em>
        </h2>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-8">
          Temperature isn&apos;t just weather — it&apos;s a fragrance variable. Heat accelerates evaporation, so a fragrance projects more intensely and burns through its stages faster in summer. In winter, projection drops but longevity often extends, and heavier materials that would be oppressive in August become perfectly calibrated in December.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SEASONS.map(({ name, tag, note, frags }) => (
            <div key={name} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              <p className="text-stone-200 font-light text-sm mb-0.5">{name}</p>
              <p className="text-[10px] uppercase tracking-[0.12em] text-amber-500/50 mb-3">{tag}</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed mb-0">{note}</p>
              <FragLinks frags={frags} />
            </div>
          ))}
        </div>
      </section>

      {/* Build stages */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Getting There</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          How to actually <em className="italic text-amber-400/80">build one</em>
        </h2>

        <div className="space-y-0">
          {STAGES.map(({ n, name, action, body, tip }) => (
            <div key={n} className="flex gap-5 py-6 border-b border-stone-800/60 last:border-0">
              <div className="flex-shrink-0 text-center w-8">
                <span className="font-serif text-3xl font-light text-stone-700 leading-none">{n}</span>
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500/70 mb-1">Stage {n} — {name}</p>
                <p className="text-stone-200 font-light text-sm mb-2">{action}</p>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed mb-3">{body}</p>
                <div className="border-l-2 border-amber-900/40 pl-3">
                  <p className="text-[11px] text-amber-700/70 font-light leading-relaxed">{tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <PullQuote>
          The best wardrobe isn&apos;t the biggest one. It&apos;s the one where every bottle gets worn.
        </PullQuote>
      </section>

      {/* Collector traps */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Watch Out</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          The collector trap — <em className="italic text-amber-400/80">and how to avoid it</em>
        </h2>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-8">
          There&apos;s a specific affliction that strikes fragrance enthusiasts around bottle twelve or fifteen. Somewhere along the way the goal quietly shifts from &ldquo;smelling great&rdquo; to &ldquo;acquiring more.&rdquo; New bottles get bought because they&apos;re interesting, because the reviews are compelling, because a limited edition won&apos;t come back. The fragrance community rewards acquisition. Nobody makes a video called &ldquo;I wore the same four bottles contentedly for six months.&rdquo;
        </p>

        <div className="space-y-0">
          {TRAPS.map(({ name, body }) => (
            <div key={name} className="flex gap-4 py-5 border-b border-stone-800/60 last:border-0">
              <span className="text-[10px] uppercase tracking-[0.12em] text-rose-500/50 border border-rose-900/30 px-2 py-0.5 rounded flex-shrink-0 h-fit">
                Trap
              </span>
              <div>
                <p className="text-stone-300 font-light text-sm mb-1.5">{name}</p>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Signature scent */}
      <section className="mb-16">
        <SectionLabel>The Big Question</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          The signature <em className="italic text-amber-400/80">scent question</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            A signature scent is genuinely powerful. People will associate that scent with you, and encountering it anywhere will bring you to mind. But a rigid signature scent worn regardless of season misses what fragrance can do.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            The answer most experienced fragrance people land on is the &ldquo;seasonal signature&rdquo; — one bottle that becomes your primary scent for each season, worn consistently enough to become associated with that version of you.
          </p>
        </div>

        <PullQuote>
          You don&apos;t need a signature scent. You need a scent people associate with you at your best.
        </PullQuote>
      </section>

      {/* Close */}
      <div className="text-center pt-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-700">fin</span>
      </div>

    </main>
  );
}
