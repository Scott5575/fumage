import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Where a Fragrance Comes From Changes Everything — Fumage Guide",
  description:
    "French refinement, Italian sensuality, Mediterranean vitality, English eccentricity, Oriental depth, Arabian poetry, American democracy, and Japanese silence — a complete guide to masculine perfumery across eight great traditions.",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-4 flex items-center gap-3">
      {children}
      <span className="flex-1 h-px bg-stone-800 max-w-[60px]" />
    </p>
  );
}

type FragRef = { name: string; house: string; note: string; slug: string | null };

function FragCard({ name, house, note, slug }: FragRef) {
  const inner = (
    <div className="border border-stone-800 rounded p-4 bg-stone-950/30 h-full">
      <p className="text-stone-200 font-light text-sm mb-0.5">
        {slug ? (
          <span className="group-hover:text-amber-400 transition-colors">{name}</span>
        ) : name}
      </p>
      <p className="text-[10px] uppercase tracking-[0.1em] text-stone-600 mb-2">{house}</p>
      <p className="text-[11px] text-stone-500 font-light leading-relaxed italic">{note}</p>
    </div>
  );
  if (slug) {
    return (
      <Link href={`/fragrances/${slug}`} className="group block">
        {inner}
      </Link>
    );
  }
  return <div>{inner}</div>;
}

type Region = {
  tag: string;
  title: string;
  motto: string;
  body: string[];
  notes: string[];
  frags: FragRef[];
  wear: string;
};

const REGIONS: Region[] = [
  {
    tag: "France",
    title: "The French Tradition",
    motto: "Perfume is the art that makes memory speak.",
    body: [
      "France is, without argument, the birthplace of modern perfumery as a formal discipline. The town of Grasse, nestled in the Provençal hills, has supplied the world's finest raw materials — jasmine, rose, iris — for centuries, and Paris transformed those materials into an art form. French perfumery is defined by a belief in balance and structure: a classical top-heart-base architecture where no single element dominates. The parfumeur is regarded as an artist; the formula, a composition analogous to music or painting.",
      "For masculine fragrances, the tradition tends toward elegant restraint: the fougère (lavender, oakmoss, coumarin), the chypre (citrus, labdanum, oakmoss), and the aromatic. These are fragrances built for the civilised world — the dinner table, the office, the theatre. They age gracefully and reward patience, the dry-down often being far more interesting than the opening.",
    ],
    notes: ["Iris", "Vetiver", "Oakmoss", "Lavender", "Citrus", "Leather", "Chypre base"],
    frags: [
      { name: "Terre d'Hermès",   house: "Hermès",        note: "Flint, orange, vetiver. The platonic ideal of earthy French masculinity.",      slug: null                          },
      { name: "Habit Rouge",      house: "Guerlain, 1965", note: "The original masculine oriental. Spiced citrus over a powdery amber base.",     slug: "guerlain-habit-rouge"        },
      { name: "Vetiver",          house: "Guerlain, 1961", note: "Smoky, dry, aristocratic. The definitive French gentleman's vetiver.",           slug: "guerlain-vetiver"            },
      { name: "Eau Sauvage",      house: "Dior, 1966",     note: "Citrus and hedione — the scent that quietly changed everything.",               slug: "dior-eau-sauvage"            },
      { name: "Encre Noire",      house: "Lalique",        note: "Deep cypress and vetiver. Austere, elegant, almost monastic.",                  slug: "lalique-lalique-encre-noire" },
      { name: "Pour un Homme",    house: "Caron, 1934",    note: "Lavender and vanilla. The grandfather of the masculine fragrance.",             slug: "caron-caron-pour-un-homme"   },
    ],
    wear: "Formal occasions, client dinners, theatre, date nights. The French fragrance rarely shouts — it expects you to lean in.",
  },
  {
    tag: "Italy",
    title: "The Italian Sensibility",
    motto: "Sprezzatura — the art of making the difficult look effortless.",
    body: [
      "Italian perfumery is inseparable from la dolce vita — the sun on Amalfi limestone, espresso in a ceramic cup, linen that somehow never wrinkles. Where the French approach fragrance as a formal art, Italians approach it as a component of lifestyle. The result prizes freshness, radiance, and sensuous warmth over complexity for its own sake.",
      "The Italian school excels at citrus masculines and aromatic woods, drawing heavily on the Hesperidic tradition while deepening it with Mediterranean earthiness. Bergamot from Calabria, iris from Florence — these are not abstractions but things you can point to on a map. The niche Italian houses — Xerjoff, Profumum Roma, Santa Maria Novella — have produced some of the most opulent masculines in the world.",
    ],
    notes: ["Bergamot", "Cedarwood", "Vetiver", "Iris", "Sandalwood", "Tobacco", "Warm woods"],
    frags: [
      { name: "Colonia",             house: "Acqua di Parma",       note: "Sunny bergamot and vetiver. The definitive Italian gentleman's cologne.",    slug: "acqua-di-parma-colonia"       },
      { name: "Alexandria II",       house: "Xerjoff",              note: "Opulent sandalwood and oud. Where Italian luxury meets the East.",           slug: "xerjoff-xerjoff-alexandria-ii"},
      { name: "Tabac Aurea",         house: "Profumum Roma",        note: "Rich tobacco and honey — dark, masculine, deeply Italian.",                  slug: null                           },
      { name: "Man in Black",        house: "Bvlgari",              note: "Rum, tobacco, guaiac. Theatrical, bold Italian drama.",                      slug: "bvlgari-bvlgari-man-in-black" },
      { name: "Acqua di Colonia",    house: "Santa Maria Novella",  note: "An ancient recipe, still luminous with citrus and herbs.",                   slug: null                           },
      { name: "Nettuno",             house: "Xerjoff",              note: "Ozonic marine meets warm woods. The Italian Riviera in a bottle.",           slug: null                           },
    ],
    wear: "Warm weather, weekend brunches, the beach, or any situation calling for effortless charm. Italian fragrances are ideal companions to casual luxury.",
  },
  {
    tag: "Mediterranean",
    title: "The Mediterranean Coast",
    motto: "Salt air, wild herbs, and the particular blue of a sea that has no equal.",
    body: [
      "The Mediterranean tradition belongs not to one country but to a coastline stretching from the Iberian Peninsula through Provence, down the Italian Riviera, across to Greece and the Aegean. What unites it is a shared landscape: the wild aromatic scrubland of the garrigue, sea salt carried on warm winds, and herbs — rosemary, thyme, sage, cistus, lavender — that grow in dry rocky soil. The Spanish fragrance tradition deserves particular attention: houses like Loewe and Ramon Monegal produce masculines of exceptional quality — dry, resinous, and possessed of a sun-dried intensity that is neither French nor Italian but entirely their own.",
      "Beyond specific houses, the Mediterranean style permeates many fragrances from other traditions. Almost anything structured around fig, sea salt, or garrigue herbs owes a debt to this coastline. These are fragrances of luminous warmth — not the blazing heat of the Arabian Peninsula, but the dry herb-scented warmth of a hillside overlooking the sea.",
    ],
    notes: ["Rosemary", "Sea salt", "Fig", "Cistus", "Thyme", "Mastic", "Cypress", "Warm stone"],
    frags: [
      { name: "Esencia",         house: "Loewe",         note: "Neroli, vetiver, tarragon. Dry, herbal, unmistakably Iberian.",                   slug: null                         },
      { name: "Dry Wood",        house: "Ramon Monegal", note: "Cypress and cedar smoke. Spanish niche at its most confident.",                   slug: null                         },
      { name: "Neroli Portofino",house: "Tom Ford",      note: "Neroli, sea, and sun-warmed citrus. The Italian Riviera, perfectly rendered.",    slug: "tom-ford-neroli-portofino"  },
      { name: "Philosykos",      house: "Diptyque",      note: "Bark, leaves, fresh fig. One of the great unisex masculines.",                   slug: "diptyque-philosykos"        },
      { name: "Eau d'Italie",    house: "Eau d'Italie",  note: "Garrigue, marine notes, warm woods. The Amalfi hillside in perfume.",            slug: null                         },
      { name: "Cap Bréhat",      house: "Heeley",        note: "Sea spray, oakmoss, driftwood. The Atlantic coast in miniature.",                slug: null                         },
    ],
    wear: "Summer and spring, especially outdoors. These fragrances bloom in heat — the warm herbs and sea-salt notes open rather than turn sour. Among the most natural-smelling masculines in any tradition.",
  },
  {
    tag: "England",
    title: "The English School",
    motto: "Never explain, never complain — and always smell quietly magnificent.",
    body: [
      "English perfumery is the great eccentric of the fragrance world. Where France has prestige and Italy has sunshine, England has heritage, understatement, and a fondness for the peculiar. The great London houses — Penhaligon's, Floris, Czech & Speake — were built around the barbershop, the haberdashery, the country estate. Their masculines tend toward green outdoorsy compositions, barbershop fougères, and leather-tobacco accords.",
      "The English philosophy treats fragrance as part of the wardrobe — chosen with the same care as a pocket square, worn with the same discretion as a well-cut suit. One does not impose one's scent upon others.",
    ],
    notes: ["Fern", "Oakmoss", "English lavender", "Lime", "Leather", "Tobacco", "Green herbs"],
    frags: [
      { name: "Green Irish Tweed",  house: "Creed",           note: "Violet leaf, iris, sandalwood. The gentleman's fougère, elevated.",         slug: "creed-green-irish-tweed"  },
      { name: "Blenheim Bouquet",   house: "Penhaligon's, 1902", note: "Lime, black pepper, pine. Freshly pressed shirts on a country weekend.", slug: null                       },
      { name: "English Fern",       house: "Floris, 1911",    note: "The archetype of the British fougère. Oakmoss, coumarin, dry woods.",       slug: null                       },
      { name: "No. 88",             house: "Czech & Speake",  note: "Bergamot and neroli with a barbershop heart. Impeccably proper.",           slug: null                       },
      { name: "Halfeti",            house: "Penhaligon's",    note: "Oud and spice with a distinctly modern British eccentricity.",              slug: "penhaligon-s-halfeti"     },
      { name: "Tobacco Oud",        house: "Roja Dove",       note: "Where English tobacco artistry meets the Oriental tradition.",              slug: null                       },
    ],
    wear: "The office, the countryside, autumn walks, or any moment requiring quiet authority. English fragrances reward those who lean in to smell them.",
  },
  {
    tag: "Oriental Style",
    title: "The Oriental Tradition",
    motto: "Warmth, depth, and the slow burn of amber at midnight.",
    body: [
      "\"Oriental\" refers to a fragrance family rather than a single geography, carrying the weight of centuries of trade routes, spice markets, and the Western imagination's encounter with the East. These fragrances share a common DNA: rich amber bases, warm resins, spice, and a sweetness that deepens rather than lightens over time. Historically a Western interpretation of Eastern luxury — imagined by French parfumeurs but built from ingredients traveling from the Gulf, India, and Southeast Asia — the tradition has been revitalised by houses like Tom Ford, Serge Lutens, and Maison Margiela.",
    ],
    notes: ["Amber", "Benzoin", "Sandalwood", "Vanilla", "Patchouli", "Incense", "Spice"],
    frags: [
      { name: "Tuscan Leather", house: "Tom Ford",        note: "Raspberry, saffron, leather. Ruthlessly confident dark Oriental.",         slug: "tom-ford-tuscan-leather"  },
      { name: "Chergui",        house: "Serge Lutens",    note: "Tobacco, hay, iris. A hot desert wind in a bottle.",                      slug: "serge-lutens-chergui"     },
      { name: "Santal 33",      house: "Le Labo",         note: "Cardamom, sandalwood, violet. The warm-Oriental standard-bearer.",        slug: "le-labo-santal-33"        },
      { name: "A*Men",          house: "Thierry Mugler",  note: "Patchouli, coffee, caramel. Bold, polarising, utterly distinctive.",      slug: "thierry-mugler-a-men"     },
      { name: "Ombre Leather",  house: "Tom Ford",        note: "Smoky leather and patchouli. Powerful and deeply wearable.",              slug: null                       },
      { name: "Noir de Noir",   house: "Tom Ford Private",note: "Black rose, oud, truffle. Sumptuous, nocturnal, deeply Oriental.",        slug: "tom-ford-noir-de-noir"    },
    ],
    wear: "Evening wear, cold weather, intimate settings. Oriental fragrances project warmly and last well into the night — not for the crowded elevator.",
  },
  {
    tag: "Arabia & The Middle East",
    title: "The Arabian Masters",
    motto: "To perfume the air around you is an act of hospitality.",
    body: [
      "If France elevated perfumery into an art form, the Middle East reminds us that perfume is also a ritual, a language, and a form of prayer. The Arabian tradition is the oldest continuous perfume culture in the world — oud has been burned, worn, and traded across the region for over a thousand years. Fragrance here is not an accessory but an essential expression of self, status, and welcome. The host who fails to perfume a guest commits an act of disrespect.",
      "Arabian fragrances operate on entirely different terms. Concentration is extreme — attars and heavy EDPs are the norm. The palette anchors on oud, rose, saffron, amber, musk, and incense. The rise of Amouage brought this tradition to the global niche market. Houses like Arabian Oud, Rasasi, Al Haramain, and Ajmal represent the traditional end — less polished in presentation, often breathtaking in quality.",
    ],
    notes: ["Oud", "Rose", "Saffron", "Amber", "Musk", "Incense", "Frankincense"],
    frags: [
      { name: "Reflection Man", house: "Amouage",       note: "Neroli, rosemary, white musk. Amouage at its most wearable — still monumental.",    slug: "amouage-reflection-man"            },
      { name: "Interlude Man",  house: "Amouage",       note: "Incense, oregano, patchouli. Deliberately challenging, undeniably brilliant.",        slug: "amouage-interlude-man"             },
      { name: "Dahn Al Oudh",   house: "Arabian Oud",   note: "Pure agarwood attar. The most direct expression of oud available.",                   slug: null                                },
      { name: "Junoon Sable",   house: "Rasasi",        note: "Oud, leather, amber. Extraordinary depth at a fraction of niche pricing.",            slug: null                                },
      { name: "Amber Oud",      house: "Al Haramain",   note: "Warm amber, musk, saffron. Approachable luxury from a storied house.",                slug: "al-haramain-amber-oud-gold-edition" },
      { name: "Epic Man",       house: "Amouage",       note: "Frankincense, cardamom, leather. A sweeping Omani masculine of rare grandeur.",       slug: "amouage-amouage-epic-man"          },
    ],
    wear: "Evening, formal occasions, cold weather, or whenever you wish to make a statement that cannot be ignored. Arabian fragrances do not exist in the background. They are a commitment.",
  },
  {
    tag: "United States",
    title: "The American Voice",
    motto: "Fragrance for the many, not the few — and then, eventually, a quiet revolt against that very idea.",
    body: [
      "The United States created an entire genre of masculine fragrance that reshaped the global market and articulated a philosophy no European tradition had yet put into words: democratic accessibility. Ralph Lauren's Polo, Calvin Klein's CK One, and the clean fresh-sport masculines of the 1990s were built on the premise that fragrance should project confidence without demanding education from the wearer.",
      "But American niche perfumery tells a second, contrarian story. Houses like Le Labo (New York), DS & Durga (Brooklyn), Imaginary Authors (Portland), and Commodity represent a deliberate rejection of the mainstream — literary, concept-driven, often strange, and thoroughly disinterested in mass appeal. The tension between the America of Polo Ralph Lauren and the America of DS & Durga is one of the most interesting fault lines in contemporary fragrance.",
    ],
    notes: ["White musk", "Ozonic", "Clean woods", "Citrus", "Tobacco", "Leather", "Smoked accords"],
    frags: [
      { name: "Polo",             house: "Ralph Lauren, 1978",  note: "Green, herbaceous, leathery. The American masculine that built an empire.",  slug: "ralph-lauren-polo"                     },
      { name: "Aramis",           house: "Estée Lauder, 1966",  note: "Leather, vetiver, moss. A cornerstone of the American power fragrance.",    slug: "aramis-aramis"                         },
      { name: "CK One",           house: "Calvin Klein, 1994",  note: "Clean citrus musk. Defined the unisex generation. Still works.",            slug: "calvin-klein-ck-one"                   },
      { name: "Big Sur After Rain",house: "DS & Durga",         note: "Petrichor, coastal sage, sea air. American niche at its most poetic.",       slug: null                                    },
      { name: "Bowmakers",        house: "DS & Durga",          note: "Violin rosin, cedar, amber. Artisan masculinity, Brooklyn-forged.",          slug: null                                    },
      { name: "Gold Knight",      house: "Imaginary Authors",   note: "Leather, vetiver, cedar smoke. The literary American masculine.",            slug: null                                    },
    ],
    wear: "The mainstream tradition excels as a daily driver and in casual settings. The niche tradition suits those who want their fragrance to start a conversation rather than blend into one.",
  },
  {
    tag: "Japan",
    title: "The Japanese Silence",
    motto: "The scent of empty space is the most difficult thing to compose.",
    body: [
      "Japanese fragrance philosophy is unlike anything in the Western tradition, and understanding it requires setting aside most assumptions about what perfume is supposed to do. It is rooted in kōdō — the centuries-old art of incense appreciation, in which participants gather in silence to listen to the smoke. Kōdō trains the nose to find meaning in subtlety, in the interplay between notes, in what is not there as much as what is. Fragrance, in this tradition, is not a statement. It is a question.",
      "The result is a masculine fragrance aesthetic defined by radical minimalism, restraint, and deliberate impermanence. Japanese masculines do not project loudly or announce themselves across a room. They are discovered at close range. They do not persist aggressively. They arrive, and then, at precisely the right moment, they depart — leaving a suggestion rather than a memory. This is the philosophical opposite of the Arabian tradition, and one of the most genuinely civilised ideas in perfumery.",
    ],
    notes: ["Hinoki cypress", "Yuzu", "Incense", "Green tea", "Cedarwood", "Mineral", "Dry woods", "Moss"],
    frags: [
      { name: "L'Eau d'Issey Pour Homme", house: "Issey Miyake, 1994",    note: "Aquatic, woody, yuzu. Introduced an entire masculine genre to the world.", slug: "issey-miyake-l-eau-d-issey-pour-homme" },
      { name: "Wonderwood",               house: "Comme des Garçons",      note: "Ten woods, no flowers, no fruit. Pure structural minimalism.",            slug: null                                   },
      { name: "Incense Avignon",          house: "Comme des Garçons",      note: "Church incense, frankincense, cedar. Cold stone and ceremony.",            slug: null                                   },
      { name: "Basala",                   house: "Shiseido",               note: "Green, mineral, understated power. Japanese restraint perfected.",          slug: null                                   },
      { name: "Hinoki",                   house: "Monocle × CdG",          note: "Japanese cypress, patchouli, labdanum. Architecture you can wear.",         slug: null                                   },
      { name: "2 Man",                    house: "Comme des Garçons",      note: "Ink, iris, cedar. Quietly one of the great modern masculines.",             slug: null                                   },
    ],
    wear: "Meditative moments, creative work, minimalist dressing, or any occasion where the goal is depth without display. Japanese fragrances are for the person standing next to you, not the room.",
  },
];

const COMPARISON = [
  { tradition: "French",          character: "Balanced, intellectual, structured",           projection: "Moderate · 4–8 hrs",       seasons: "Spring, Fall, Year-round",    entry: "Guerlain Vetiver" },
  { tradition: "Italian",         character: "Fresh, sensual, effortless",                   projection: "Light–Mod · 3–6 hrs",      seasons: "Spring, Summer",              entry: "Acqua di Parma Colonia" },
  { tradition: "Mediterranean",   character: "Herbal, luminous, salt-kissed",                projection: "Light–Mod · 3–6 hrs",      seasons: "Spring, Summer",              entry: "Loewe Esencia" },
  { tradition: "English",         character: "Restrained, green, eccentric",                 projection: "Moderate · 4–7 hrs",       seasons: "Fall, Winter, Spring",        entry: "Creed Green Irish Tweed" },
  { tradition: "Oriental",        character: "Warm, ambered, seductive",                     projection: "Heavy · 8–12 hrs",         seasons: "Fall, Winter",                entry: "Tom Ford Ombre Leather" },
  { tradition: "Arabian",         character: "Rich, ceremonial, immense depth",              projection: "Extreme · 12–24+ hrs",     seasons: "Fall, Winter, Evening",       entry: "Amouage Reflection Man" },
  { tradition: "American",        character: "Democratic, confident, fresh or literary",     projection: "Light–Mod · 3–7 hrs",      seasons: "Year-round",                  entry: "DS & Durga Big Sur / Polo" },
  { tradition: "Japanese",        character: "Minimal, restrained, meditative",              projection: "Soft · 3–6 hrs",           seasons: "Year-round",                  entry: "L'Eau d'Issey PH" },
];

export default function RegionalTraditionsPage() {
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
          Regional Traditions · Education
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-100 leading-[1.08] mb-6">
          Where a Fragrance Comes From<br />
          <em className="italic text-amber-400">Changes Everything</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          French refinement, Italian sensuality, Mediterranean vitality, English eccentricity, Oriental depth,
          Arabian poetry, American democracy, and Japanese silence — eight great traditions in masculine perfumery.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          8 traditions · 4 budget tiers · 48 fragrance examples · 2 starter wardrobes · 22 min read
        </p>
      </div>

      {/* Lede */}
      <div className="mb-14">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          Perfume does not exist in a vacuum. It is the product of soil, climate, culture, philosophy,
          and trade — and nowhere is this truer than in the masculine fragrance world, where regional
          identity shapes not just what goes into the bottle, but what wearing it means. The French
          house and the Arabian atelier are not simply producing different scents; they are expressing
          fundamentally different ideas about beauty, identity, and the relationship between a man and
          his surroundings.
        </p>
      </div>

      {/* Callout: Concentration */}
      <div className="border border-stone-800 border-l-2 border-l-amber-500/50 rounded p-5 bg-stone-950/30 mb-14">
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500 mb-3">Essential Reading First</p>
        <h2 className="font-serif text-xl font-light text-stone-200 mb-3">
          The Hierarchy That Matters Most: Concentration & Projection
        </h2>
        <p className="text-[11px] text-stone-500 font-light leading-relaxed">
          Before region, before notes, before price — understand concentration. It determines how a
          fragrance behaves on your skin, how far it projects, and whether you fill a room or simply
          scent your collar. As a general rule, the further east you travel on the fragrance map, the
          heavier the concentration becomes. Italian, American, and English fragrances tend to stay
          close to the skin and project moderately. Arabian fragrances — especially attars and heavy
          EDPs — operate on entirely different terms. The rule of thumb:{" "}
          <span className="text-stone-300">the richer the tradition, the lighter your hand.</span>{" "}
          A French EDT can be applied generously. An Arabian EDP should be a single wrist touch, at
          most. Context always wins.
        </p>
      </div>

      {/* Eight Regions */}
      {REGIONS.map((region, regionIdx) => (
        <section key={region.tag} className="mb-16 pb-16 border-b border-stone-800/60">

          {/* Callout: French vs Italian — between French and Italian */}
          {regionIdx === 1 && (
            <div className="border border-stone-800 border-l-2 border-l-amber-500/50 rounded p-5 bg-stone-950/30 mb-14">
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500 mb-3">A Critical Distinction</p>
              <h2 className="font-serif text-xl font-light text-stone-200 mb-3">
                French vs. Italian: Philosophy, Not Just Geography
              </h2>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                A French fragrance from Guerlain or Hermès is{" "}
                <span className="text-stone-300">architectural</span>: it expects you to sit with it,
                to discover what it becomes over three hours, to appreciate the structure holding the
                whole thing together. An Italian fragrance from Acqua di Parma or Xerjoff is{" "}
                <span className="text-stone-300">sensorial</span>: it wants you to enjoy yourself
                right now, to feel the warmth and the citrus and the easy pleasure of it, without
                demanding the patience of a wine connoisseur. France makes art; Italy makes pleasure.
                Reach for French when you want to impress, Italian when you want to enjoy.
              </p>
            </div>
          )}

          {/* Callout: Arabian value — after Arabian */}
          {regionIdx === 5 && (
            <div className="border border-stone-800 border-l-2 border-l-amber-500/50 rounded p-5 bg-stone-950/30 mb-14">
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500 mb-3">The Smartest Move in Fragrance</p>
              <h2 className="font-serif text-xl font-light text-stone-200 mb-3">
                The Best Value Proposition in the Space
              </h2>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                The single most underappreciated category in masculine fragrance is the traditional
                Arabian market — specifically Rasasi, Al Haramain, Ajmal, and Abdul Samad Al Qurashi.
                You can spend $30–60 on a Rasasi or Ajmal EDP that smells as complex, as long-lasting,
                and as compliment-earning as something priced at five to eight times the cost from a
                European niche house. The reason is structural: these houses exist within a culture
                where fragrance is a daily necessity and quality is non-negotiable, but the Western
                markup for prestige packaging and boutique distribution has not been applied. The
                bottles are not always beautiful. The marketing is minimal.{" "}
                <span className="text-stone-300">The juice is frequently extraordinary.</span>
              </p>
            </div>
          )}

          <SectionLabel>{region.tag}</SectionLabel>
          <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-2">
            {region.title}
          </h2>
          <p className="font-serif italic text-stone-500 font-light mb-5 text-sm">
            &ldquo;{region.motto}&rdquo;
          </p>

          {region.body.map((para, i) => (
            <p key={i} className="text-sm text-stone-400 font-light leading-relaxed mb-4">
              {para}
            </p>
          ))}

          {/* Signature notes */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-[10px] uppercase tracking-[0.15em] text-stone-600 self-center">Signature notes</span>
            {region.notes.map((note) => (
              <span key={note} className="text-[10px] px-2 py-0.5 border border-stone-800 text-stone-600 rounded">
                {note}
              </span>
            ))}
          </div>

          {/* Fragrance grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
            {region.frags.map((frag) => (
              <FragCard key={frag.name} {...frag} />
            ))}
          </div>

          {/* Wear strip */}
          <div className="border-l-2 border-stone-800 pl-4 py-1">
            <p className="text-[10px] uppercase tracking-[0.15em] text-stone-600 mb-1">When to reach for {region.tag.split(" ")[0]}</p>
            <p className="text-[11px] text-stone-500 font-light leading-relaxed italic">{region.wear}</p>
          </div>

        </section>
      ))}

      {/* At a Glance */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Quick Reference</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-2">
          At a glance
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-8">
          Each tradition's character, projection, seasonality, and best entry point.
        </p>

        <div className="border border-stone-800 rounded overflow-hidden overflow-x-auto">
          <div className="grid grid-cols-[80px_1fr_100px_100px_120px] min-w-[600px] bg-stone-900/60 border-b border-stone-800">
            {["Tradition", "Character", "Projection", "Seasons", "Entry Point"].map((h) => (
              <p key={h} className="text-[10px] uppercase tracking-[0.12em] text-stone-500 px-3 py-2.5">{h}</p>
            ))}
          </div>
          {COMPARISON.map(({ tradition, character, projection, seasons, entry }, i) => (
            <div
              key={tradition}
              className={`grid grid-cols-[80px_1fr_100px_100px_120px] min-w-[600px] ${i < COMPARISON.length - 1 ? "border-b border-stone-800/50" : ""}`}
            >
              <p className="text-[10px] uppercase tracking-[0.1em] text-amber-500/80 px-3 py-3 self-center font-medium">{tradition}</p>
              <p className="text-[11px] text-stone-400 font-light px-3 py-3 leading-snug">{character}</p>
              <p className="text-[11px] text-stone-500 font-light px-3 py-3 leading-snug">{projection}</p>
              <p className="text-[11px] text-stone-500 font-light px-3 py-3 leading-snug">{seasons}</p>
              <p className="text-[11px] text-stone-600 font-light px-3 py-3 leading-snug italic">{entry}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Budget Tiers */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Budget Tiers</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-2">
          Navigating price honestly
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-8">
          Quality masculine fragrance exists at every price point.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              badge: "Tier 1 · Entry",
              price: "$25–$75",
              name: "The Accessible Tier",
              desc: "Designer and mass-niche releases. Enormous variation in quality. Some of the best value in fragrance — especially in the Arabian and American sub-markets.",
              picks: ["Lalique Encre Noire — French — ~$30", "Rasasi Junoon Sable — Arabian — ~$35", "Al Haramain Amber Oud — Arabian — ~$45", "Polo Ralph Lauren — American — ~$55", "L'Eau d'Issey PH — Japanese — ~$65", "Loewe Esencia — Mediterranean — ~$65"],
            },
            {
              badge: "Tier 2 · Mid-Range",
              price: "$75–$180",
              name: "The Sweet Spot",
              desc: "The most productive tier for the educated buyer. Quality designer and accessible niche. Many of the definitive masculines of any tradition live here.",
              picks: ["Terre d'Hermès EDP — French — ~$130", "Acqua di Parma Colonia — Italian — ~$140", "Tom Ford Ombre Leather — Oriental — ~$160", "Penhaligon's Blenheim Bouquet — English — ~$155", "CdG Wonderwood — Japanese — ~$155", "DS & Durga Big Sur — American — ~$175"],
            },
            {
              badge: "Tier 3 · Premium Niche",
              price: "$180–$400",
              name: "Serious Niche",
              desc: "Bolder ingredients, longer wear, genuine artistic ambition. Requires more research — but rewards it generously.",
              picks: ["Amouage Reflection Man — Arabian — ~$295", "Serge Lutens Chergui — Oriental — ~$200", "Tom Ford Tuscan Leather — Oriental — ~$270", "Xerjoff Alexandria II — Italian — ~$380", "Ramon Monegal Dry Wood — Mediterranean — ~$230", "CdG Series 3 Incense — Japanese — ~$195"],
            },
            {
              badge: "Tier 4 · Collector",
              price: "$400+",
              name: "Luxury & Collector",
              desc: "Ultra-niche, private collection lines, and attars. Price does not always equal quality here — research is non-negotiable. Diminishing returns exist, but the ceiling is extraordinary.",
              picks: ["Amouage Interlude Man — Arabian — ~$450", "Creed Green Irish Tweed — English — ~$420", "Tom Ford Noir de Noir — Oriental — ~$500", "Roja Dove Tobacco Oud — English — ~$600+", "Xerjoff Naxos — Italian — ~$420", "Arabian Oud Dahn Al Oudh — Arabian — varies"],
            },
          ].map(({ badge, price, name, desc, picks }) => (
            <div key={badge} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              <p className="text-[10px] uppercase tracking-[0.15em] text-stone-600 mb-1">{badge}</p>
              <p className="font-serif text-2xl font-light text-stone-100 mb-0.5">{price}</p>
              <p className="text-stone-300 font-light text-sm mb-3">{name}</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed italic mb-4 pb-4 border-b border-stone-800/60">{desc}</p>
              <ul className="space-y-1.5">
                {picks.map((p) => {
                  const [fragName, ...rest] = p.split(" — ");
                  return (
                    <li key={p} className="flex gap-2 items-baseline">
                      <span className="text-amber-500/40 text-[10px] shrink-0">—</span>
                      <span className="text-[11px] text-stone-400 font-light leading-snug">
                        {fragName}
                        <span className="text-stone-600"> · {rest.join(" · ")}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Starter Wardrobes */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Building a Starting Wardrobe</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-2">
          Two wardrobes
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-8">
          A well-considered fragrance wardrobe doesn't need to be large — it needs to be complete.
          Below are two full wardrobes: one built for maximum value, one without compromise.
        </p>

        {[
          {
            label: "Wardrobe A · Maximum Value",
            total: "~$250–350 total",
            seats: [
              { role: "Seat 1 · The Everyday", title: "Daily Driver", occasion: "Work, errands, casual days", picks: [{ tier: "Entry · ~$55", name: "Polo Ralph Lauren (American)" }, { tier: "or · ~$30", name: "Lalique Encre Noire (French)" }] },
              { role: "Seat 2 · The Summer",   title: "Warm Weather",  occasion: "Hot days, outdoors, casual",   picks: [{ tier: "Entry · ~$65", name: "L'Eau d'Issey PH (Japanese)" }, { tier: "or · ~$65", name: "Loewe Esencia (Mediterranean)" }] },
              { role: "Seat 3 · The Occasion", title: "Dinner / Date", occasion: "Evenings out, special dinners", picks: [{ tier: "Mid · ~$95", name: "Bvlgari Man in Black (Italian)" }, { tier: "or · ~$75", name: "Dior Eau Sauvage (French)" }] },
              { role: "Seat 4 · The Statement",title: "Cold Weather / Night", occasion: "Winter, formal, evenings", picks: [{ tier: "Entry · ~$35", name: "Rasasi Junoon Sable (Arabian)" }, { tier: "or · ~$45", name: "Al Haramain Amber Oud (Arabian)" }] },
            ],
          },
          {
            label: "Wardrobe B · Without Compromise",
            total: "~$900–1,200 total",
            seats: [
              { role: "Seat 1 · The Everyday", title: "Daily Driver", occasion: "Work, errands, casual days", picks: [{ tier: "Mid · ~$130", name: "Terre d'Hermès EDP (French)" }, { tier: "alt · ~$155", name: "Penhaligon's Blenheim Bouquet (English)" }] },
              { role: "Seat 2 · The Summer",   title: "Warm Weather", occasion: "Hot days, travel, outdoors",  picks: [{ tier: "Mid · ~$140", name: "Acqua di Parma Colonia (Italian)" }, { tier: "alt · ~$155", name: "CdG Wonderwood (Japanese)" }] },
              { role: "Seat 3 · The Occasion", title: "Dinner / Date", occasion: "Evenings out, special dinners", picks: [{ tier: "Mid · ~$160", name: "Tom Ford Ombre Leather (Oriental)" }, { tier: "alt · ~$175", name: "DS & Durga Big Sur (American)" }] },
              { role: "Seat 4 · The Statement",title: "Night / Formal", occasion: "Winter, formal, evenings", picks: [{ tier: "Premium · ~$295", name: "Amouage Reflection Man (Arabian)" }, { tier: "alt · ~$270", name: "Tom Ford Tuscan Leather (Oriental)" }] },
              { role: "Seat 5 · The Wildcard", title: "The Signature", occasion: "Your one truly personal scent", picks: [{ tier: "Any tier", name: "Chosen after sampling — the fragrance that stops you cold the first time you smell it. Every great wardrobe has one." }] },
              { role: "Seat 6 · The Discovery",title: "Deep Dive", occasion: "Mandatory research, any budget", picks: [{ tier: "Entry · ~$35–55", name: "Rasasi Junoon Sable or Al Haramain Amber Oud. A $40 bottle that recalibrates everything." }] },
            ],
          },
        ].map(({ label, total, seats }) => (
          <div key={label} className="mb-10">
            <div className="flex items-baseline gap-3 mb-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">{label}</p>
              <p className="text-[10px] text-stone-700">{total}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {seats.map((seat) => (
                <div key={seat.role} className="border border-stone-800 rounded p-4 bg-stone-950/30">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-stone-600 mb-1">{seat.role}</p>
                  <p className="text-stone-200 font-light text-sm mb-0.5">{seat.title}</p>
                  <p className="text-[10px] text-stone-600 italic mb-3">{seat.occasion}</p>
                  <div className="border-t border-stone-800/60 pt-3 space-y-2">
                    {seat.picks.map((pick) => (
                      <div key={pick.tier}>
                        <p className="text-[10px] uppercase tracking-[0.1em] text-stone-700">{pick.tier}</p>
                        <p className="text-[11px] text-stone-400 font-light leading-snug">{pick.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Footnote: German + Nordic */}
      <section className="mb-16">
        <SectionLabel>Traditions on the Horizon</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          Worth noting
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              title: "German / Teutonic",
              body: "Germany's contribution to fragrance history is both foundational and underappreciated: Eau de Cologne was invented in Cologne in the early 1700s, and 4711 — still in production — is one of the oldest continuously manufactured fragrances in existence. The Teutonic philosophy is clean, functional, and anti-decorative. Worth knowing as a chapter of history; the original 4711 remains a genuinely excellent introduction to the classic Eau de Cologne style.",
              examples: ["4711 Original", "Hugo Boss Bottled", "Maurer & Wirtz Tabac", "Baldessarini"],
            },
            {
              title: "Nordic / Scandinavian",
              body: "Nordic perfumery is a young but coherent school, defined by cold-climate minimalism: birch, pine resin, frozen air, dark forest, wet stone, and woodsmoke. Where the Mediterranean smells of sun-warmed herbs, the Nordic tradition smells of the absence of warmth — a stark, beautiful austerity that sits philosophically close to the Japanese tradition while arriving there through an entirely different landscape. Houses like Björk & Berries, Stora Skuggan, and Vilhelm Parfumerie are gaining genuine international traction.",
              examples: ["Stora Skuggan Monstrum", "Björk & Berries White Forest", "Vilhelm Parfumerie"],
            },
          ].map(({ title, body, examples }) => (
            <div key={title} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              <p className="font-serif text-xl font-light text-stone-200 mb-3">{title}</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed italic mb-4">{body}</p>
              <div className="flex flex-wrap gap-2">
                {examples.map((e) => (
                  <span key={e} className="text-[10px] px-2 py-0.5 border border-stone-800 text-stone-600 rounded">{e}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing */}
      <div className="mb-12 border-t border-stone-800/60 pt-10">
        <p className="font-serif text-lg text-stone-400 font-light leading-relaxed italic">
          A fragrance wardrobe built across these eight traditions is not merely a collection of bottles.
          It is a set of tools — and a record of the world's most enduring argument about what it means
          to smell like yourself. The American bottle that gets you through Monday. The Japanese one
          that makes Tuesday feel considered. The Italian for Wednesday's lunch in the sun. The French
          for the dinner you want to remember. The Arabian for the Saturday night that asks something
          of you. And somewhere in the collection, one bottle that defies categorisation entirely —
          that crosses traditions, confounds expectations, and smells, above all else, like no one but you.
        </p>
      </div>

      {/* Close */}
      <div className="text-center pt-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-700">fin</span>
      </div>

    </main>
  );
}
