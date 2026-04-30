import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Invisible Architecture — Fumage Guide",
  description:
    "From Iso E Super to Ambroxan, synthetic aromachemicals are the backbone of every great men's fragrance. What they are, what they do, and why the synthetic stigma is exactly backwards.",
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

const TIER_STYLES: Record<string, string> = {
  Budget:   "text-emerald-400 border-emerald-800/40 bg-emerald-900/10",
  Mid:      "text-sky-400 border-sky-800/40 bg-sky-900/10",
  Niche:    "text-amber-400 border-amber-800/40 bg-amber-900/10",
  Wildcard: "text-rose-400 border-rose-800/40 bg-rose-900/10",
};

const ROLES = [
  {
    name: "Backbone & Fixation",
    tag:  "Structure, weight, longevity",
    body: "Molecules that anchor a composition and slow evaporation. Vanillin, coumarin, and polycyclic musks form the base layer everything else sits on. Without them, your fragrance is gone in an hour.",
  },
  {
    name: "Lift & Radiance",
    tag:  "Luminosity, projection, air",
    body: "Hedione and aliphatic aldehydes make a composition feel more open and luminous than its raw materials suggest. Not what you smell so much as how far the fragrance travels and how it feels to encounter it.",
  },
  {
    name: "Skin Feel & Intimacy",
    tag:  "Warmth, skin-scent, proximity",
    body: "Ambroxan, Iso E Super, Cashmiran, musks — the close-range layer that makes a fragrance smell like someone rather than something. The quality that draws people in rather than broadcasting outward.",
  },
  {
    name: "Novel Territory",
    tag:  "Smells that don't exist in nature",
    body: "Calone's cold ocean accord doesn't exist anywhere in the natural world. Neither does Iso E Super's cedar-metallic-skin quality. Synthetics opened olfactory territory that no harvest, no distillation, and no extraction could ever access.",
  },
];

const MOLECULES = [
  {
    name:      "Iso E Super",
    tech:      "Tetrahydro-2-isobutyl-4-methylbenzaldehyde · IFF, 1973",
    character: "Woody, cedar, metallic, velvety, smoky",
    frags:     "Molecule 01, Terre d'Hermès, Dior Homme Intense",
    body:      "The strangest molecule in mainstream masculine perfumery. Its scent profile — simultaneously woody, cedary, metallic, and smoothly skin-like — shifts depending on how you encounter it, and a significant percentage of people cannot smell it at all due to specific anosmia. For those who can, it operates at a near-subconscious level: less a distinct note than a seamless woody warmth that makes a fragrance feel like skin chemistry rather than applied scent. At high concentrations it becomes the entire identity. Escentric Molecules built a brand on it by using nothing else.",
  },
  {
    name:      "Hedione",
    tech:      "Methyl Dihydrojasmonate · Firmenich, 1960s",
    character: "Light jasmine, dewy, luminous, transparent",
    frags:     "Dior Eau Sauvage, CK One, Bleu de Chanel",
    body:      "The molecule that changed what perfumery could feel like. Its scent is a light, diffuse jasmine — but describing it purely as floral misses what it actually does. Hedione is a diffuseur: it lifts and amplifies everything around it, making compositions feel airier and more radiant without adding weight. The fresh, luminous quality in classic masculines from Eau Sauvage onward is largely Hedione at work. Research in the early 2010s suggested it interacts with a human pheromone receptor in a way other molecules don't — debated in the literature, but compelling enough that perfumers paid attention.",
  },
  {
    name:      "Ambroxan",
    tech:      "Ambrox · Firmenich · Derived from Ambroxide",
    character: "Ambergris, warm skin, woody, radiant, sensual",
    frags:     "Dior Sauvage, Molecule 02, Emporio Armani Stronger with You",
    body:      "Originally derived from ambergris — the rare fixative expelled by sperm whales and sold by the gram — Ambroxan is the main odorous constituent responsible for that warm, radiant, skin-enveloping quality. The synthetic version is more consistent, more powerful, and ethically uncomplicated. At low concentrations it extends longevity and amplifies radiance; at high concentrations, as in Dior Sauvage, it becomes the fragrance's identity. Simultaneously warm and cool, woody and musky, with a skin-like intimacy that interacts differently with individual body chemistry. The defining molecule of the modern masculine era.",
  },
  {
    name:      "Coumarin",
    tech:      "2H-chromen-2-one · First synthesized 1868 · William Henry Perkin",
    character: "Sweet hay, tonka, warm vanilla-adjacent, dry, slightly bitter",
    frags:     "Azzaro Pour Homme, Drakkar Noir, Davidoff Cool Water",
    body:      "Where the story of synthetic perfumery formally begins. When Perkin synthesized coumarin from coal tar in 1868 he wasn't just making a fragrant molecule — he was demonstrating that the chemistry of smell could be divorced from the biology of plants. The compound occurs naturally in tonka beans, sweet woodruff, and fresh-cut hay; its scent is the warm, dry, slightly bitter-sweet quality that gives fougères their characteristic backbone. The classic fougère accord — lavender, oakmoss, coumarin — codified in Houbigant's Fougère Royale (1882) — is the structural DNA of masculine fragrance from Brut to Cool Water. Coumarin built the blueprint.",
  },
  {
    name:      "Vanillin",
    tech:      "4-hydroxy-3-methoxybenzaldehyde · Nature-identical synthetic",
    character: "Sweet vanilla, warm, creamy, comforting, fixative",
    frags:     "YSL La Nuit de L'Homme, Thierry Mugler A*Men, Guerlain L'Instant",
    body:      "The most widely used fragrance ingredient on earth, and almost certainly synthetic regardless of what the bottle implies. Vanillin is the primary odorous compound in vanilla pods, synthesized from lignin — and at the molecular level, identical to the natural compound. In fragrance it performs two roles simultaneously: at obvious concentrations it provides warm vanilla sweetness; at lower concentrations it works as a fixative, slowing the evaporation of other materials and extending longevity without smelling explicitly vanilla. Ethylvanillin, a close synthetic relative, is three times more intense — the molecule behind crème brûlée drydowns.",
  },
  {
    name:      "Calone",
    tech:      "7-methyl-2H-1,5-benzodioxepin-3(4H)-one · Pfizer, 1951, popularized 1990s",
    character: "Marine, oceanic, watermelon, ozone, cold aquatic",
    frags:     "Davidoff Cool Water, Issey Miyake L'Eau d'Issey Pour Homme, Polo Sport",
    body:      "No single molecule is more responsible for what the 1990s smelled like. Synthesized in 1951 but not widely deployed until Davidoff's Cool Water, Calone's effect was immediate and total: it smells like the Platonic ideal of the ocean. Not the actual sea — which smells of salt, seaweed, and geological time — but what your idea of the sea smells like: cold, clean, watermelon-salt-ozone freshness that suggests open water without the biological complications. The aquatic masculine category — hundreds of launches through the 1990s and 2000s — exists entirely because of this one molecule. Unfashionable now through overexposure; still remarkable in skilled hands.",
  },
  {
    name:      "Aldehydes",
    tech:      "C-10, C-11, C-12 Aliphatic Aldehydes · Various · Pre-1920s",
    character: "Waxy, soapy, metallic-floral, clean, effervescent",
    frags:     "Guerlain Habit Rouge, YSL Rive Gauche Pour Homme, Creed Royal Water",
    body:      "Few aromachemical families carry more historical weight. Ernest Beaux's use of C-11 and C-12 aldehydes in Chanel No. 5 (1921) wrote the rulebook everyone else has been working from since. C-10 is waxy-fatty-orange-peel; C-11 is clean, soapy, rose-adjacent — the source of the powdery soap quality in classic aldehydic fragrances; C-12 is the most conventionally aldehydic, sharp and metallic-floral. Deployed with skill, they create an extraordinary lift: a sensation of effervescence and radiance no other material replicates. In masculine fragrance they fell out of favour in the 1990s aquatic era but have been steadily returning — deployed subtly for diffusion, or boldly by niche houses invoking the confident authority of the Barbershop era.",
  },
  {
    name:      "Galaxolide & Polycyclic Musks",
    tech:      "HHCB · IFF · 1965",
    character: "Clean, powdery, warm, skin-close, intimate",
    frags:     "Almost everything — check the IFRA disclosure",
    body:      "You have been wearing Galaxolide your entire adult life whether you knew it or not. This polycyclic musk — developed to replace nitro musks being phased out for safety reasons — is in laundry detergent, fabric softener, and a staggering percentage of mainstream fragrances. Its character is clean, slightly powdery, warm, and pleasant in the most uncomplicated sense, which is precisely why it ended up everywhere. Musks form the base layer that extends longevity and creates the skin-closeness that makes a fragrance intimate rather than projecting in a cloud. The environmental coda: Galaxolide has been flagged as a persistent organic pollutant that accumulates in aquatic environments. The industry is developing biodegradable alternatives. Worth knowing, even if it doesn't change what you smell.",
  },
];

const PICKS = [
  {
    tier:    "Budget",
    price:   "~$30",
    best:    false,
    house:   "Davidoff",
    name:    "Cool Water",
    slug:    null,
    profile: "Lavender, calone, geranium, rosemary, sandalwood, musk",
    body:    "The fragrance that demonstrates Calone's world-altering capability. Launched 1988, it made the 1990s aquatic era inevitable — every brand that chased it for the next fifteen years was chasing this one molecule. Still excellent, still cheap, still one of the most recognisable synthetic signatures in perfumery history. The correct entry point for understanding how a single aromachemical can define an era.",
  },
  {
    tier:    "Mid",
    price:   "~$100",
    best:    true,
    house:   "Dior",
    name:    "Sauvage EDP",
    slug:    null,
    profile: "Bergamot, pepper, lavender, ambroxan, woody musks",
    body:    "Ambroxan at its most uncompromising. The most commercially successful masculine fragrance of the 2010s and 2020s is essentially a masterclass in what a single synthetic molecule can achieve when deployed without apology. The EDP over the EDT for depth in the drydown — the Ambroxan warmth becomes more tactile as the pepper and lavender recede. Overexposed; still correct. Understanding Sauvage is understanding the modern masculine era.",
  },
  {
    tier:    "Mid",
    price:   "~$120",
    best:    false,
    house:   "Hermès",
    name:    "Terre d'Hermès EDP",
    slug:    null,
    profile: "Orange, grapefruit, flint, pepper, vetiver, Iso E Super",
    body:    "Iso E Super as structural architecture. Jean-Claude Ellena built a woody-mineral composition around flint, vetiver, and orange that would not exist without a synthetic woody backbone — and that demonstrates what the molecule does when deployed with complete control. No obvious synthetic signature; just an extraordinary sense of depth and materiality. The EDP over the EDT for the fuller expression of Iso E Super's skin-warmth quality in the drydown.",
  },
  {
    tier:    "Niche",
    price:   "~$150",
    best:    false,
    house:   "Escentric Molecules",
    name:    "Molecule 01",
    slug:    null,
    profile: "Iso E Super — and nothing else",
    body:    "The most educational fragrance in this list. Molecule 01 contains one ingredient: Iso E Super. No blending, no accord-building, no layers — just the molecule on skin. The result is either remarkable or imperceptible, depending entirely on your anosmia status. A significant minority cannot smell it at all. Those who can experience a warm, cedar-metallic, uncannily skin-like quality that rewards proximity. Worth trying as a diagnostic as much as a fragrance.",
  },
  {
    tier:    "Wildcard",
    price:   "~$55",
    best:    false,
    house:   "Azzaro",
    name:    "Pour Homme EDT",
    slug:    null,
    profile: "Basil, anise, lavender, coumarin, oakmoss, vetiver, tonka",
    body:    "Coumarin's finest showcase in a widely available bottle. Launched 1978, Azzaro Pour Homme is the fougère accord — lavender, oakmoss, coumarin — in its most authoritative form: dry, warm, structured, and entirely unapologetic. The molecule that Perkin synthesized in 1868 is still doing the structural work here, 150 years later. If you want to understand where modern masculine fragrance came from and why coumarin remains the fougère foundation, this is the fragrance that answers the question.",
  },
];

const PITFALLS = [
  {
    name: "The naturals-are-better bias",
    body: "The most persistent error in fragrance evaluation. A molecule is a molecule: vanillin synthesized from lignin and vanillin extracted from vanilla pods are chemically identical. Natural materials have genuine advantages — depth, complexity, organic aliveness — but synthetics have their own: consistency, sustainability, novel olfactory territory, and precision. The best fragrances blend both. Dismissing any composition for being 'too synthetic' without understanding what that means is bad analysis dressed as connoisseurship.",
  },
  {
    name: "Conflating synthetic with cheap",
    body: "Dior Sauvage retails for over £100 and is structurally dominated by Ambroxan. Molecule 01 charges niche prices for a single synthetic compound. The cost of a fragrance has essentially no relationship to its synthetic content. What matters is the skill with which materials — natural or synthetic — are deployed. Cheap fragrances are cheap because of low-grade materials and rushed formulation, not because they contain synthetics.",
  },
  {
    name: "Evaluating only by the note pyramid",
    body: "The note pyramid on Fragrantica tells you the naturals — bergamot, lavender, amber. It rarely tells you the aromachemicals doing the structural work. Two fragrances can share an identical note pyramid and smell completely different because one uses Ambroxan in the base and the other uses Galaxolide, or one carries Hedione in the heart and the other doesn't. Learning to identify what you're actually smelling — not just what the marketing describes — is the skill that separates informed buying from expensive guesswork.",
  },
];

export default function SyntheticNotesPage() {
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
          Chemistry Deep Dive
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-100 leading-[1.08] mb-6">
          The Invisible Architecture:<br />
          <em className="italic text-amber-400">Synthetic Aromachemicals</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          Every bottle in your collection owes more to a laboratory than a garden. The molecules doing
          the real work — what they are, what they do, and why the synthetic stigma is exactly backwards.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          4 functions, 8 key molecules, 5 recommendations, and 3 pitfalls to avoid
        </p>
      </div>

      {/* Intro */}
      <div className="mb-14">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          There&apos;s a word thrown around fragrance circles with the kind of dismissive certainty that only
          comes from half-understanding something: <em>synthetic</em>. Say it in the wrong company and
          you&apos;ll watch people recoil, as if you&apos;d admitted to adulterating something pure. That piece of
          received wisdom is wrong — almost completely, embarrassingly wrong.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-5">
          Modern perfumery is, to an overwhelming degree, the art of synthetic molecules. Not as a
          compromise, not as a budget workaround, but as an intentional and often superior choice made by
          the greatest perfumers working today. Sauvage, Bleu de Chanel, Aventus, Terre d&apos;Hermès — built
          on structural frames of synthetic aromachemicals that no field of jasmine or acre of ambergris
          could replicate alone.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          The story starts in 1868, when William Henry Perkin synthesized coumarin from coal tar and
          demonstrated that the chemistry of smell could be divorced from the biology of plants. By 1921,
          Ernest Beaux had used aliphatic aldehydes in Chanel No. 5 at concentrations that scandalized
          the perfumery establishment and redefined the category for a century. We have been living in
          the synthetic age ever since. It&apos;s time to talk about it honestly.
        </p>
      </div>

      {/* What Synthetics Do */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>What They Do</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          The <em className="italic text-amber-400/80">four functions</em>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ROLES.map(({ name, tag, body }) => (
            <div key={name} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              <p className="text-stone-200 font-light text-sm mb-0.5">{name}</p>
              <p className="text-[10px] uppercase tracking-[0.12em] text-amber-500/50 mb-3">{tag}</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Molecules */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Hall of Fame</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          Eight <em className="italic text-amber-400/80">key molecules</em>
        </h2>

        <div className="space-y-3">
          {MOLECULES.map(({ name, tech, character, frags, body }) => (
            <div key={name} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              <p className="text-stone-200 font-light text-sm mb-0.5">{name}</p>
              <p className="text-[10px] text-stone-600 mb-3 leading-relaxed tracking-wide">{tech}</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed mb-3">{body}</p>
              <div className="flex gap-6 flex-wrap pt-3 border-t border-stone-800/60">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.15em] text-stone-700 block mb-0.5">Character</span>
                  <span className="text-[11px] text-stone-500 italic">{character}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-[0.15em] text-stone-700 block mb-0.5">Key fragrances</span>
                  <span className="text-[11px] text-stone-500 italic">{frags}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <PullQuote>
          The greatest perfumers didn&apos;t reach for synthetics because they had to. They reached for them
          because synthetics opened doors that nature had left permanently locked.
        </PullQuote>
      </section>

      {/* Recommendations */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Picks</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          The <em className="italic text-amber-400/80">recommendations</em>
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-8">
          Five fragrances chosen to showcase specific molecules — each a case study in what a single
          aromachemical can achieve in skilled hands.
        </p>

        <div className="space-y-3">
          {PICKS.map(({ tier, price, best, house, name, slug, profile, body }) => (
            <div key={name} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className={`text-[9px] uppercase tracking-[0.15em] border rounded px-2 py-0.5 ${TIER_STYLES[tier]}`}>
                  {tier} · {price}
                </span>
                {best && (
                  <span className="text-[9px] uppercase tracking-[0.12em] border border-amber-700/30 text-amber-500/60 rounded px-2 py-0.5 bg-amber-900/10">
                    Best in class
                  </span>
                )}
              </div>
              <p className="text-[10px] uppercase tracking-[0.12em] text-stone-500 mb-0.5">{house}</p>
              {slug ? (
                <Link
                  href={`/fragrances/${slug}`}
                  className="text-stone-200 font-light hover:text-amber-400 transition-colors block mb-2"
                >
                  {name}
                </Link>
              ) : (
                <p className="text-stone-200 font-light mb-2">{name}</p>
              )}
              <p className="text-[10px] text-stone-600 mb-3 leading-relaxed">{profile}</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pitfalls */}
      <section className="mb-16">
        <SectionLabel>Watch Out</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          The <em className="italic text-amber-400/80">pitfalls</em>
        </h2>

        <div className="space-y-0">
          {PITFALLS.map(({ name, body }) => (
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

      {/* Close */}
      <div className="text-center pt-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-700">fin</span>
      </div>

    </main>
  );
}
