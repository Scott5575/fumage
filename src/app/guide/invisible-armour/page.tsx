import Link from "next/link";

// Catalog slugs for linked rec cards. null = not in database.
const SLUG: Record<string, string | null> = {
  "terre-hermes":         "herm-s-terre-d-herm-s-edt",
  "santal-33":            "le-labo-santal-33",
  "grey-vetiver":         "tom-ford-grey-vetiver",
  "encre-noire":          "lalique-lalique-encre-noire",
  "acqua-di-gio":         "giorgio-armani-acqua-di-gi-edt",
  "eau-sauvage":          "dior-eau-sauvage",
  "silver-mountain-water":"creed-silver-mountain-water",
  "cool-water":           "davidoff-cool-water",
  "oud-wood":             "tom-ford-oud-wood",
  "abraaj-oud":           null,
  "knize-ten":            null,
  "bleu-de-chanel":       "chanel-bleu-de-chanel-edp",
  "la-nuit-de-lhomme":    "yves-saint-laurent-la-nuit-de-l-homme",
  "spicebomb-extreme":    "viktor-rolf-spicebomb-extreme",
};

function RecCard({
  n, id, name, house, desc, notes, price,
}: {
  n: number;
  id: string;
  name: string;
  house: string;
  desc: string;
  notes: string[];
  price: string;
}) {
  const slug = SLUG[id];
  const nameEl = slug ? (
    <Link
      href={`/fragrances/${slug}`}
      className="text-stone-100 font-serif text-xl leading-snug hover:text-amber-400 transition-colors"
    >
      {name}
    </Link>
  ) : (
    <span className="text-stone-100 font-serif text-xl leading-snug">{name}</span>
  );

  return (
    <div className="flex gap-5 py-6 border-b border-stone-800/60 last:border-0">
      <span className="font-serif text-4xl font-light text-stone-800 leading-none flex-shrink-0 w-8 text-right pt-1">
        {n}
      </span>
      <div className="flex-1 min-w-0">
        {nameEl}
        <p className="text-[10px] uppercase tracking-[0.18em] text-amber-500/70 mt-0.5 mb-2">
          {house}
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-3">{desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {notes.map((note) => (
            <span
              key={note}
              className="text-[10px] px-2 py-0.5 border border-stone-800 text-stone-600 rounded-full"
            >
              {note}
            </span>
          ))}
          <span className="text-[10px] px-2 py-0.5 border border-amber-900/40 text-amber-600/80 rounded-full">
            {price}
          </span>
        </div>
      </div>
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

function RecBlockLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 pb-3 border-b border-stone-800/60 mb-0">
      {children}
    </p>
  );
}

function ProfileBlock({
  n, tag, title, body,
}: {
  n: string; tag: string; title: string; body: string;
}) {
  return (
    <div className="flex gap-5 mb-8">
      <span className="font-serif text-5xl font-light text-stone-800/60 leading-none flex-shrink-0 w-12 text-right">
        {n}
      </span>
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500 mb-1">{tag}</p>
        <h3 className="font-serif text-xl font-light text-stone-200 mb-2">{title}</h3>
        <p className="text-sm text-stone-400 font-light leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

export default function InvisibleArmourPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">

      {/* Masthead */}
      <div className="mb-16 pb-16 border-b border-stone-800/60">
        <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-6">
          The Art of Fragrance
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl font-light text-stone-100 leading-[1.05] mb-6">
          The Invisible<br />
          <em className="italic text-amber-400">Armour</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed max-w-sm">
          How the right cologne doesn&apos;t just change how others perceive you — it changes how you feel about yourself.
        </p>
      </div>

      {/* Intro */}
      <div className="mb-12">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed">
          There&apos;s a moment you probably know — you spray on a familiar cologne, and before you&apos;ve even left the bathroom, something shifts. Your posture straightens almost imperceptibly. The day feels more manageable. You feel, in some quiet and hard-to-articulate way, ready. That&apos;s not coincidence. That&apos;s your brain doing something remarkable.
        </p>
      </div>

      {/* Science box */}
      <div className="border-l-2 border-amber-700/50 pl-5 py-1 bg-stone-950/40 pr-5 mb-12">
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-600/70 mb-2">The Science, Briefly</p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          Scent is the only sense with a direct pathway to the limbic system — the brain&apos;s emotional and memory hub. Unlike sight or sound, smell bypasses the thalamus entirely, triggering emotional responses in milliseconds. This is why fragrance can reshape your mood, your energy, even your sense of identity almost before you&apos;ve registered the scent at all.
        </p>
      </div>

      {/* Pull quote */}
      <div className="border-l-2 border-amber-500/30 pl-6 mb-16">
        <p className="font-serif text-xl italic font-light text-stone-300 leading-relaxed mb-3">
          A fragrance isn&apos;t just something you wear. It&apos;s a psychological state you step into — an invisible layer between who you are and who you intend to be today.
        </p>
        <cite className="text-[10px] uppercase tracking-[0.2em] text-stone-600 not-italic">
          On the psychology of scent
        </cite>
      </div>

      {/* ── Section 1: Calm ── */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Scent &amp; Calm</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          When the world quiets <em className="italic text-amber-400/80">down</em>
        </h2>
        <div className="space-y-4 mb-8">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            In an age of relentless stimulation, some fragrances serve as a slow exhale. These are the colognes that lower the temperature of a racing mind — built on ingredients used in aromatherapy for centuries, now dressed up for a modern man&apos;s wrist.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Sandalwood, vetiver, and ambergris are the architects of this category. Deep, unhurried, and faintly woody, they share a common character: they settle rather than excite. Reach for one before a difficult meeting not because you want to project power, but because you want to feel grounded inside your own skin first.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Lavender-forward colognes have quietly made a comeback precisely because of what they do neurochemically. Studies have documented lavender&apos;s ability to reduce cortisol levels, the hormone most closely associated with stress. Worn before a long flight or a high-stakes presentation, they function less like perfume and more like slow medicine.
          </p>
        </div>
        <RecBlockLabel>Recommended — Calm &amp; Grounding</RecBlockLabel>
        <RecCard n={1} id="terre-hermes"  name="Terre d'Hermès"    house="Hermès"     price="$$"   notes={["Vetiver","Flint","Cedar","Grapefruit"]}  desc="A masterclass in earthy restraint. Flint, vetiver, and grapefruit over a cedar and benzoin base — it smells of quiet confidence and open landscape. Ideal for the man who wants to feel rooted without smelling heavy." />
        <RecCard n={2} id="santal-33"     name="Santal 33"         house="Le Labo"    price="$$$"  notes={["Sandalwood","Cedar","Leather","Iris"]}     desc="Cult status for a reason. Sandalwood, cedarwood, and a trace of leather create something that smells simultaneously like the American West and a monk's study. Deeply calming, almost meditative." />
        <RecCard n={3} id="grey-vetiver"  name="Grey Vetiver"      house="Tom Ford"   price="$$$"  notes={["Vetiver","Oakmoss","Sage","Nutmeg"]}       desc="A refined, office-appropriate vetiver that feels calm without being boring. Clean and composed, with a soft soapy quality that makes it feel like the olfactory equivalent of a well-pressed shirt." />
        <RecCard n={4} id="encre-noire"   name="Encre Noire"       house="Lalique"    price="$"    notes={["Vetiver","Cypress","Musk"]}                desc="The great underdog of vetiver fragrances. Dark, smoky, and almost austere — Encre Noire costs a fraction of its luxury counterparts while delivering a depth of character most can't match." />
      </section>

      {/* ── Section 2: Energy ── */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Scent &amp; Energy</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          The cologne that says <em className="italic text-amber-400/80">let&apos;s begin</em>
        </h2>
        <div className="space-y-4 mb-8">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Some fragrances are a starting pistol. Bright, sharp, and almost aggressive at first spray, they tell your nervous system the same thing a cold shower does: we&apos;re moving now. Citrus-forward colognes — particularly those built on bergamot, grapefruit, and yuzu — work by stimulating the sympathetic nervous system in a mild but measurable way.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Peppermint and eucalyptus notes, often found in aquatic or fougère fragrances, have well-documented effects on alertness. Researchers found that peppermint scent improves reaction time and memory performance. This is the cologne you reach for on a slow Monday morning, before a gym session, or when the afternoon slump threatens to derail your focus.
          </p>
        </div>
        <RecBlockLabel>Recommended — Energy &amp; Focus</RecBlockLabel>
        <RecCard n={1} id="acqua-di-gio"         name="Acqua di Giò"          house="Giorgio Armani" price="$$"   notes={["Sea Notes","Bergamot","Rosemary","Cedarwood"]} desc="The bestselling men's fragrance in the world for a reason — it distills that sense of open air, sea breeze, and motion into a single bottle. Aquatic, clean, and energising without effort." />
        <RecCard n={2} id="eau-sauvage"           name="Eau Sauvage"           house="Dior"           price="$$"   notes={["Bergamot","Lemon","Rosemary","Vetiver"]}       desc="One of the great citrus-forward classics. It smells like a man who was up early and has already accomplished something. Still radically modern despite being over 60 years old." />
        <RecCard n={3} id="silver-mountain-water" name="Silver Mountain Water" house="Creed"          price="$$$$" notes={["Bergamot","Green Tea","Neroli","Musk"]}        desc="Bergamot, green tea, and a mineral aquatic base that evokes cold Alpine air. Sharp and clarifying in the best possible sense — like the mental reset of stepping outside." />
        <RecCard n={4} id="cool-water"            name="Cool Water"            house="Davidoff"       price="$"    notes={["Mint","Lavender","Oakmoss","Sandalwood"]}      desc="The affordable gateway to aquatic freshness. Mint, lavender, and sandalwood over an oceanic base — delivering an unmistakable sense of energy and forward motion at a price that makes daily use effortless." />
      </section>

      {/* ── Section 3: Confidence ── */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Scent &amp; Confidence</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          Wearing authority <em className="italic text-amber-400/80">quietly</em>
        </h2>
        <div className="space-y-4 mb-10">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            The most coveted category in men&apos;s fragrance isn&apos;t the loudest — it&apos;s the one that makes you feel ten degrees more certain of yourself the moment it settles on your skin. Confidence-building fragrances tend to share a common architecture: a bold but refined opening, significant depth in the base, and a quality of presence that feels earned rather than announced.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            There&apos;s also a social psychology dimension worth noting: research on &ldquo;enclothed cognition&rdquo; — the idea that what we wear changes how we think and perform — extends naturally to scent. When you wear something that feels expensive and considered, you move differently. You give people more eye contact. You take up space without apology.
          </p>
        </div>

        <ProfileBlock n="01" tag="The Power Player — Oud & Dark Spices" title="Rich, complex, unapologetically commanding" body="Oud-based fragrances are among the oldest perfumery traditions in the world, and their depth communicates something synthetic light fragrances simply cannot: history, gravity, and permanence. Best worn to boardrooms, negotiations, and anywhere you need to feel fully armored." />
        <RecBlockLabel>Recommended — Power &amp; Oud</RecBlockLabel>
        <RecCard n={1} id="oud-wood"   name="Oud Wood"   house="Tom Ford Private Blend" price="$$$$" notes={["Oud Wood","Cardamom","Sandalwood","Amber"]} desc="The fragrance that introduced the Western market to oud done elegantly. Rare oud wood, rosewood, and cardamom over a sandalwood and amber base. Commanding without being confrontational." />
        <RecCard n={2} id="abraaj-oud" name="Abraaj Oud" house="Swiss Arabian"           price="$"    notes={["Oud","Rose","Musk"]}                       desc="For those who want authentic Middle Eastern oud character at an accessible price point. Swiss Arabian is beloved by fragrance enthusiasts for delivering genuine oud complexity without the luxury markup." />

        <div className="mt-10">
          <ProfileBlock n="02" tag="The Quiet Authority — Leather & Iris" title="Sophisticated without being showy" body="Leather accords in fragrance create a sense of wear and refinement. Paired with the cool, powdery quality of iris, this profile communicates confidence through restraint — the person who doesn't need to raise their voice." />
          <RecBlockLabel>Recommended — Leather &amp; Sophistication</RecBlockLabel>
          <RecCard n={1} id="knize-ten"      name="Knize Ten"      house="Knize"   price="$$"  notes={["Leather","Birch Tar","Oakmoss","Florals"]} desc="One of the oldest leather fragrances in the world, and still one of the finest. A dry, almost abstract leather built around birch tar and floral notes — it smells of old libraries, well-worn luggage, and unshakeable self-possession." />
          <RecCard n={2} id="bleu-de-chanel" name="Bleu de Chanel" house="Chanel"  price="$$$" notes={["Citrus","Incense","Ginger","Sandalwood"]}    desc="The modern standard-bearer for masculine confidence. Citrus, incense, and a dry woody base that projects authority without effort. Universally flattering and widely regarded as one of the most complete masculine fragrances of the last 20 years." />
        </div>

        <div className="mt-10">
          <ProfileBlock n="03" tag="The Modern Classic — Amber & Warmth" title="Warm, magnetic, and unforgettable" body="Amber-heavy fragrances create an aura — they're the scents that tend to prompt the 'what are you wearing?' question. Worn well, they project warmth and self-assurance, making them ideal for social confidence: first dates, celebrations, evenings where you want to leave an impression." />
          <RecBlockLabel>Recommended — Warmth &amp; Magnetism</RecBlockLabel>
          <RecCard n={1} id="la-nuit-de-lhomme" name="La Nuit de L'Homme" house="Yves Saint Laurent" price="$$"  notes={["Cardamom","Lavender","Cedar","Vetiver"]}   desc="One of the most seductive masculine fragrances ever produced. Cardamom, lavender, and cedar over a warm, sensual base of vetiver and coumarin. The go-to recommendation for evening confidence and social situations." />
          <RecCard n={2} id="spicebomb-extreme"  name="Spicebomb Extreme"  house="Viktor & Rolf"      price="$$"  notes={["Tobacco","Vanilla","Cinnamon","Amber"]}    desc="The cold-weather powerhouse. Tobacco, vanilla, and a warming spice accord create something that's as bold as it is comforting. Best suited to autumn and winter evenings when you want to walk into a room and be noticed." />
        </div>
      </section>

      {/* ── Section 4: Wardrobe ── */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Practical Wisdom</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          Building your <em className="italic text-amber-400/80">scent wardrobe</em>
        </h2>
        <div className="space-y-4 mb-8">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            The most sophisticated approach to fragrance isn&apos;t finding one signature scent and wearing it forever — it&apos;s understanding that a fragrance is a tool, and different days require different instruments. Start with three anchors and build from there.
          </p>
        </div>

        <div className="border border-stone-800 rounded overflow-hidden mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-800">
                <th className="text-left text-[10px] uppercase tracking-[0.18em] text-stone-600 px-4 py-3 font-normal">Occasion</th>
                <th className="text-left text-[10px] uppercase tracking-[0.18em] text-stone-600 px-4 py-3 font-normal hidden sm:table-cell">Profile</th>
                <th className="text-left text-[10px] uppercase tracking-[0.18em] text-stone-600 px-4 py-3 font-normal">Pick to start</th>
              </tr>
            </thead>
            <tbody>
              {[
                { occ: "Daily / Office",   profile: "Clean, fresh, inoffensive",         pick: "Bleu de Chanel or Terre d'Hermès",        note: "Versatile and appropriate in any professional setting." },
                { occ: "Focus / Morning",  profile: "Bright citrus or aquatic",           pick: "Eau Sauvage or Cool Water",               note: "Start the day with something that wakes you up." },
                { occ: "Evening / Social", profile: "Warm, complex, projection-forward",  pick: "La Nuit de L'Homme or Spicebomb Extreme", note: "Rich enough to be noticed; confident enough to invite conversation." },
                { occ: "High Stakes",      profile: "Authoritative, deep, memorable",     pick: "Oud Wood or Santal 33",                   note: "Wear these when you need to feel entirely yourself." },
                { occ: "Stress / Recovery",profile: "Grounding, earthy, slow",            pick: "Encre Noire or Grey Vetiver",             note: "The olfactory equivalent of a long, steady breath." },
              ].map(({ occ, profile, pick, note }) => (
                <tr key={occ} className="border-b border-stone-800/60 last:border-0">
                  <td className="px-4 py-4 text-[10px] uppercase tracking-[0.12em] text-amber-500/70 font-medium whitespace-nowrap align-top">{occ}</td>
                  <td className="px-4 py-4 text-stone-500 font-light leading-snug align-top hidden sm:table-cell">{profile}</td>
                  <td className="px-4 py-4 align-top">
                    <p className="text-stone-300 font-light leading-snug mb-1">{pick}</p>
                    <p className="text-[11px] text-stone-600 font-light">{note}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            One overlooked variable: the season matters more than most men realise. Heavy orientals and smoky leather fragrances can feel suffocating in August. Bright citrus colognes evaporate too quickly in winter cold and can read as thin. Match the character of a fragrance to the season and it will work with your skin chemistry rather than against it.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            A note on price: the tiers above span from $20 to $350+. A well-curated collection doesn&apos;t require spending at every tier — one or two affordable workhorses alongside a single special-occasion splurge is a perfectly considered approach.
          </p>
        </div>
      </section>

      {/* Close */}
      <div className="text-center py-8">
        <p className="font-serif text-lg italic font-light text-stone-500 max-w-md mx-auto leading-relaxed mb-8">
          Scent is one of the few tools available to us that is simultaneously invisible and deeply felt — by others and by ourselves. Used with intention, it becomes something rare: a private ritual that shapes how you move through the world.
        </p>
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-700">fin</span>
      </div>

    </main>
  );
}
