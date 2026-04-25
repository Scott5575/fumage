import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Scent Without the Sticker Shock — Fumage Guide",
  description:
    "From chemistry to commerce, why the clone market is booming — and how to navigate it without losing your nose or your wallet.",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-4 flex items-center gap-3">
      {children}
      <span className="flex-1 h-px bg-stone-800 max-w-[60px]" />
    </p>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-amber-500/30 pl-6 my-10">
      <p className="font-serif text-xl italic font-light text-stone-300 leading-relaxed">
        {children}
      </p>
    </div>
  );
}

type BadgeVariant = "rep" | "val" | "off" | "cult" | "prem" | "rising";

function HouseBadge({ variant, label }: { variant: BadgeVariant; label: string }) {
  const styles: Record<BadgeVariant, string> = {
    rep:    "bg-emerald-900/30 text-emerald-400 border border-emerald-800/40",
    val:    "bg-sky-900/30 text-sky-400 border border-sky-800/40",
    off:    "bg-amber-900/20 text-amber-500/80 border border-amber-800/30",
    cult:   "bg-violet-900/30 text-violet-400 border border-violet-800/40",
    prem:   "bg-stone-800/60 text-stone-300 border border-stone-700/40",
    rising: "bg-teal-900/30 text-teal-400 border border-teal-800/40",
  };
  return (
    <span
      className={`text-[9px] uppercase tracking-[0.1em] px-2.5 py-0.5 rounded-full font-medium ${styles[variant]}`}
    >
      {label}
    </span>
  );
}

const HOUSES: {
  name: string;
  origin: string;
  badge: { variant: BadgeVariant; label: string };
  desc: string;
}[] = [
  {
    name: "Armaf",
    origin: "Dubai, UAE",
    badge: { variant: "rep", label: "Strong reputation" },
    desc: "The most globally recognized clone house, and the one that arguably made the category mainstream in the West. Owned by Sterling Parfums and distributed widely — including on Amazon and in discount retailers — Armaf's quality-to-price ratio is remarkable. Club de Nuit Intense Man, their Creed Aventus accord, remains one of the most-discussed budget fragrances of the past decade. Longevity is typically strong, presentation clean if not luxurious, and bottles run $20–35.",
  },
  {
    name: "Lattafa Perfumes",
    origin: "Dubai, UAE",
    badge: { variant: "val", label: "Best value" },
    desc: "Often thought of as the budget-tier clone house, Lattafa punches well above its price point — many offerings retail under $18. Asad (Bleu de Chanel), Ramz Gold (La Nuit de l'Homme), and Karam are community favorites. Lattafa has also developed its own oud-heavy signature that earns fans entirely independent of cloning — it's a house worth exploring on its own terms.",
  },
  {
    name: "Al Haramain Perfumes",
    origin: "Saudi Arabia / UAE",
    badge: { variant: "rep", label: "Strong reputation" },
    desc: "One of the oldest and most respected Gulf fragrance houses. Their L'Aventure line, particularly L'Aventure Man, is an openly positioned Aventus accord with a devoted following. Ingredient quality is notably high relative to price, and the house carries strong credibility in the Arabic perfumery tradition. Bottles typically run $25–45.",
  },
  {
    name: "Afnan Perfumes",
    origin: "Dubai, UAE",
    badge: { variant: "val", label: "Best value" },
    desc: "Afnan has quietly built one of the strongest value reputations in the clone market. Their 9PM — an ultra-popular JPG Ultra Male accord — has become a near-universal recommendation for newcomers. The house produces across a wide range: fresh aquatics, dark orientals, and gourmand masculines, with consistent quality control and retail prices that almost always land under $20.",
  },
  {
    name: "Maison Alhambra (Fragrance World)",
    origin: "UAE",
    badge: { variant: "val", label: "Best value" },
    desc: "Maison Alhambra has built a fast-growing reputation for producing surprisingly faithful accords at extremely low prices — typically $12–22. Encode (Bleu de Chanel EDP), Marble (Dior Sauvage EDP), and Detour Noir (Terre d'Hermès EDP) are among the most frequently recommended. Critics note occasional batch inconsistency, but at this price point the community consensus is strongly positive.",
  },
  {
    name: "Pendora Scents (by Paris Corner)",
    origin: "UAE",
    badge: { variant: "rising", label: "Rising reputation" },
    desc: "Paris Corner's Pendora line has emerged as one of the most exciting budget clone operations of recent years. The house's willingness to tackle unusual or underserved source fragrances — rather than producing a hundredth Aventus clone — sets it apart. Retail prices typically fall between $15–25.",
  },
  {
    name: "Alexandria Fragrances",
    origin: "USA — California",
    badge: { variant: "rep", label: "Strong reputation" },
    desc: "A US-based house that has carved out a premium position in the clone market, selling at $35–65. Alexandria is transparent about their inspirations — every release is openly listed alongside its source fragrance — which has earned significant goodwill. Their versions of niche fragrances (Roja, Creed, Xerjoff, Initio) are particularly well-reviewed, and samples are widely available before committing to a full bottle.",
  },
  {
    name: "Parfums Vintage",
    origin: "USA — Florida",
    badge: { variant: "prem", label: "Premium tier" },
    desc: "Parfums Vintage occupies the upper end of the clone market — bottles retail at $50–90 and quality is regularly compared favorably to designer originals. The house focuses on faithful recreations with serious attention to ingredient sourcing. For buyers who want clone economics with near-original performance, Parfums Vintage is the most common recommendation.",
  },
  {
    name: "Dua Fragrances",
    origin: "USA / Canada",
    badge: { variant: "cult", label: "Cult following" },
    desc: "Dua occupies a fascinating niche: semi-custom, small-batch clone and original production under one roof. Pricing at $28–55 reflects above-average ingredient investment. The house has developed a dedicated enthusiast following for attentive customer service and willingness to produce unusual accords that other houses won't touch.",
  },
  {
    name: "Rasasi",
    origin: "Dubai, UAE",
    badge: { variant: "val", label: "Value + originals" },
    desc: "Rasasi blends clone production with genuine original offerings. La Yuqawam Pour Homme (JPG Ultra Male) and Hawas (Acqua di Giò Profondo/Profumo) are consistent recommendations. The house also produces quality oud-forward compositions entirely their own. Widely available and reliably enjoyable at $18–30.",
  },
  {
    name: "Zimaya (by Afnan)",
    origin: "Dubai, UAE",
    badge: { variant: "val", label: "Best value" },
    desc: "Zimaya is Afnan's more focused, clone-forward sub-label, targeting specific designer and niche profiles with impressive accuracy. Powerful, their take on the woody-spicy masculine space, is a regular recommendation in enthusiast circles. Prices stay firmly in the $15–22 range.",
  },
  {
    name: "Zara / Inditex",
    origin: "Spain — global retail",
    badge: { variant: "off", label: "Officially 'inspired by'" },
    desc: "The most mainstream example of an officially acknowledged inspired-by fragrance line. Zara openly designs their range to echo luxury originals. Quality is modest — longevity is limited — but on-trend olfactive profiles at $15–25 have brought millions of consumers into fragrance for the first time.",
  },
  {
    name: "Aldi / Lidl (seasonal)",
    origin: "Germany — global retail",
    badge: { variant: "off", label: "Officially 'inspired by'" },
    desc: "Both discount grocery chains run seasonal fragrance promotions featuring accords of Aventus, Sauvage, Bleu de Chanel, and Acqua di Giò, sold under in-house names at $7–14. Quality varies by batch, but enthusiast communities track these releases closely for standout runs.",
  },
];

const EXAMPLES: {
  clone: string;
  cloneSlug: string | null;
  original: string;
  originalSlug: string | null;
  note: string;
}[] = [
  {
    clone: "Armaf Club de Nuit Intense Man",
    cloneSlug: "armaf-club-de-nuit-intense-man-edp",
    original: "Creed Aventus",
    originalSlug: "creed-aventus",
    note: "The most famous clone in existence. Birch smoke, pineapple, and ambergris. Excellent longevity; many say projection surpasses the original. ~$25 for 105ml.",
  },
  {
    clone: "Al Haramain L'Aventure Man",
    cloneSlug: null,
    original: "Creed Aventus",
    originalSlug: "creed-aventus",
    note: "A warmer, amber-forward Aventus interpretation. Leans slightly sweeter than the Armaf version. Considered a legitimate flanker-tier Aventus experience. ~$30.",
  },
  {
    clone: "Armaf Club de Nuit Sillage",
    cloneSlug: null,
    original: "Creed Silver Mountain Water",
    originalSlug: "creed-silver-mountain-water",
    note: "Crisp, icy green tea and neroli over a white musk base. One of Armaf's most underrated releases — frequently overlooked next to CDNIM but deserving serious attention. ~$30.",
  },
  {
    clone: "Armaf Tres Nuit",
    cloneSlug: "armaf-tres-nuit",
    original: "Bleu de Chanel EDT",
    originalSlug: "chanel-bleu-de-chanel-edt",
    note: "Crisp, fresh, and linear — targeting the EDT profile rather than the richer EDP. A reliable commuter and office fragrance for minimal investment. ~$22.",
  },
  {
    clone: "Lattafa Asad",
    cloneSlug: null,
    original: "Bleu de Chanel EDP",
    originalSlug: "chanel-bleu-de-chanel-edp",
    note: "A very faithful fresh-woody accord. Cedar, patchouli, and clean aromatics. Outstanding performance for under $15. The go-to daily beater recommendation.",
  },
  {
    clone: "Maison Alhambra Encode",
    cloneSlug: null,
    original: "Bleu de Chanel EDP",
    originalSlug: "chanel-bleu-de-chanel-edp",
    note: "Slightly darker and drier than Asad. Particularly well-suited to office wear and cooler weather. ~$14–18.",
  },
  {
    clone: "Maison Alhambra Marble",
    cloneSlug: null,
    original: "Dior Sauvage EDP",
    originalSlug: "dior-sauvage-edp",
    note: "Bergamot-forward spicy-ambroxan profile. Strong projection and longevity. Not as refined as the original, but remarkably close for ~$15.",
  },
  {
    clone: "Maison Alhambra Detour Noir",
    cloneSlug: null,
    original: "Terre d'Hermès EDP",
    originalSlug: "herm-s-terre-d-herm-s-edp",
    note: "Earthy flint, pepper, vetiver, and woods. Captures the austere, mineralic character of the Hermès original with impressive fidelity. A strong pick for autumn. ~$16.",
  },
  {
    clone: "Afnan 9PM",
    cloneSlug: null,
    original: "JPG Ultra Male",
    originalSlug: "jean-paul-gaultier-ultra-male",
    note: "The community's near-universal first recommendation for Ultra Male fans. Lavender, vanilla, and pear — longevity frequently described as outstanding. ~$18.",
  },
  {
    clone: "Rasasi La Yuqawam Pour Homme",
    cloneSlug: null,
    original: "JPG Ultra Male",
    originalSlug: "jean-paul-gaultier-ultra-male",
    note: "A slightly warmer, more oriental interpretation of the same DNA as 9PM. Where Afnan leans sweet, Rasasi leans spicy. Worth comparing both on skin. ~$22.",
  },
  {
    clone: "Rasasi Hawas",
    cloneSlug: null,
    original: "Acqua di Giò Profondo",
    originalSlug: "giorgio-armani-acqua-di-gi-profondo",
    note: "Aquatic, aromatic, and minerally with a strong ambroxan base. Lasts considerably longer than the Armani original on most wearers. ~$25.",
  },
  {
    clone: "Lattafa Ramz Gold",
    cloneSlug: null,
    original: "YSL La Nuit de l'Homme",
    originalSlug: "yves-saint-laurent-la-nuit-de-l-homme",
    note: "Cardamom, cedar, and vetiver over a warm, slightly smoky base. A dead-ringer for the spicy-woody YSL masculine for under $15. Exceptional for evenings and date wear.",
  },
  {
    clone: "Pendora Scents Encre Bleue",
    cloneSlug: null,
    original: "Lalique Encre Noire",
    originalSlug: "lalique-lalique-encre-noire",
    note: "Dark, somber vetiver and cypress over a woody base. One of the more unusual budget accords — Encre Noire's cult following is well-served here. ~$18.",
  },
  {
    clone: "Alexandria Fragrances Wanted",
    cloneSlug: null,
    original: "Xerjoff Naxos",
    originalSlug: "xerjoff-naxos",
    note: "Tobacco, honey, lavender, and vanilla — a rich, bookish autumn/winter masculine. One of the best arguments for paying mid-tier clone prices. ~$45.",
  },
  {
    clone: "Alexandria Fragrances Mango Tango",
    cloneSlug: null,
    original: "Creed Aventus",
    originalSlug: "creed-aventus",
    note: "Targets the specific tropical-fruity opening Aventus is famous for, amplified. A crowd-pleaser that leans more exuberant than the austere Armaf accord. ~$40.",
  },
  {
    clone: "Parfums Vintage Smoked Oud",
    cloneSlug: null,
    original: "Tom Ford Oud Wood",
    originalSlug: "tom-ford-oud-wood",
    note: "Smoky, resinous oud over spiced rosewood and sandalwood. Premium ingredient sourcing is evident — competes seriously with the $320 Tom Ford original. ~$65.",
  },
  {
    clone: "Dua The Dreamer",
    cloneSlug: null,
    original: "Roja Elysium / Enigma Man",
    originalSlug: "roja-dove-elysium-pour-homme",
    note: "Small-batch quality with artisan attention that genuinely closes the gap to niche-tier. More expensive than most clones, but one of the most convincing. ~$45.",
  },
  {
    clone: "Lattafa Oud For Glory",
    cloneSlug: null,
    original: "Amouage Interlude Man",
    originalSlug: "amouage-interlude-man",
    note: "Incense, labdanum, and smoky oud in an unapologetically intense oriental profile. Extraordinarily powerful and long-lasting. Not for the faint of heart. ~$20.",
  },
  {
    clone: "Zimaya Powerful",
    cloneSlug: null,
    original: "Niche woody-spicy genre",
    originalSlug: null,
    note: "Spiced woods, labdanum, and a clean white musk base. A genre accord rather than a specific clone — and a very good one at a very good price. ~$18.",
  },
  {
    clone: "Armaf Niche Oud",
    cloneSlug: null,
    original: "Creed Royal Oud",
    originalSlug: "creed-royal-oud",
    note: "Spiced woody oud over creamy sandalwood and pink pepper. Armaf at their most ambitious — a genuine attempt at niche-tier oud complexity for under $30.",
  },
];

export default function FragranceClonesPage() {
  return (
    <main className="min-h-screen" style={{ background: "#0c0906" }}>
      <div className="max-w-2xl mx-auto px-6 py-16 pb-24">

        {/* HERO */}
        <SectionLabel>Buying Guide · Clones &amp; Dupes</SectionLabel>
        <h1 className="font-serif text-4xl sm:text-5xl font-light leading-[1.1] text-stone-100 mb-5">
          Scent Without the<br />
          <em className="italic">Sticker Shock</em>
        </h1>
        <p className="font-serif text-lg italic font-light text-stone-400 leading-relaxed mb-3 max-w-xl">
          From chemistry to commerce — why the clone market is booming, and how to navigate it without losing your nose or your wallet.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-12">
          A guide for fragrance enthusiasts &nbsp;·&nbsp; Masculine &amp; masculine-leaning focus
        </p>

        {/* LEDE */}
        <p className="font-serif text-xl font-light text-stone-200 leading-relaxed mb-10">
          You&apos;ve smelled it on someone else — that impossibly clean, woody, magnetic trail that makes you turn your head.
          You track it down: Creed Aventus. $340 for 50ml. You put the bottle back on the shelf and wonder if there&apos;s
          another way. There is. Welcome to the world of fragrance clones.
        </p>

        {/* WHAT IS A CLONE */}
        <h2 className="font-serif text-2xl font-light text-stone-100 mb-4 mt-12">What exactly is a clone?</h2>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          A fragrance clone (also called a dupe, inspired-by, or accord) is a perfume intentionally formulated to smell
          similar — sometimes nearly identical — to an established, usually more expensive fragrance. The term spans a wide
          spectrum: from pixel-perfect copies that chase the exact scent profile to &ldquo;inspired-by&rdquo; compositions
          that capture the spirit or genre of an original without matching it molecule for molecule.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-10">
          Clones are distinct from counterfeits. A counterfeit imitates the brand&apos;s packaging and claims to be the
          original product. A clone is openly sold under its own name, by its own brand, and makes no claim to be anything
          it isn&apos;t. This distinction matters — legally, ethically, and practically. When you buy a $20 bottle of Armaf
          Club de Nuit Intense Man, the label says exactly what it is.
        </p>

        <div className="border-t border-stone-800/60 my-10" />

        {/* WHY CLONES EXIST */}
        <h2 className="font-serif text-2xl font-light text-stone-100 mb-4">Why clones exist: the economics and chemistry</h2>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          The economics of luxury fragrance are more theatrical than most consumers realize. The liquid inside a $300 bottle
          of designer cologne often costs less than $15 to produce. The remainder covers bottle design, marketing campaigns,
          celebrity contracts, retail markup, and above all — brand prestige. You&apos;re not paying for a rare or
          proprietary formula; you&apos;re largely paying for what wearing it <em>signals</em>.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          More importantly, fragrance formulas are not patentable in most jurisdictions. You can copyright a specific
          written formula, but you cannot own a smell. The olfactory profile of a fragrance — its particular balance of
          bergamot, ambergris, birch tar, and musk — is fair game for anyone skilled enough to reverse-engineer it. A
          process called olfactive matching, often assisted by gas chromatography–mass spectrometry (GC-MS) analysis, allows
          skilled perfumers to identify the ingredient composition of any fragrance to a high degree of accuracy and
          replicate the effect using the same or functionally equivalent molecules.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6">
          Clone houses have industrialized this process. They employ experienced evaluators who assess both the GC-MS data
          and the subjective, human sensory experience of a fragrance to close the gap between chemical analysis and genuine
          artistry.
        </p>

        <PullQuote>
          You can&apos;t own a smell. The olfactory profile of a fragrance is fair game for anyone skilled enough to
          reverse-engineer it.
        </PullQuote>

        {/* WHY WE WANT THEM */}
        <h2 className="font-serif text-2xl font-light text-stone-100 mb-4">Why we want them</h2>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          Access and affordability are the obvious answers, but the reasons run deeper. Luxury fragrance prices have
          increased dramatically over the past decade — often far outpacing inflation — as houses have repositioned
          themselves as status goods rather than everyday pleasures. Niche and artisan fragrances from houses like Xerjoff,
          Amouage, or Roja Parfums routinely run $250–$500 for 50ml.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          For enthusiasts who want to explore broadly — testing genres, building a collection, rotating seasonally — the
          economics simply don&apos;t add up at those prices. Clones democratize olfactory exploration. They also serve a
          specific practical role: &ldquo;beaters&rdquo; for daily wear, travel, or the gym, where spending $8 worth of
          Aventus on a sweaty afternoon feels genuinely wasteful. A $20 clone removes that anxiety entirely.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-8">
          There&apos;s also the discontinued fragrance angle. When a beloved scent is reformulated or discontinued — as
          happens constantly due to IFRA (International Fragrance Association) ingredient restrictions or shifting business
          priorities — clones sometimes preserve older profiles. Enthusiasts hunting the pre-2010 character of a classic
          masculine may find a clone captures what the current official bottle no longer can.
        </p>

        {/* PRO / CON */}
        <h2 className="font-serif text-2xl font-light text-stone-100 mb-5">The good and the bad</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <div className="border border-emerald-800/30 bg-emerald-900/10 rounded-sm p-4">
            <p className="text-[9px] uppercase tracking-[0.15em] text-emerald-500 font-medium mb-3">The upside</p>
            <ul className="space-y-1.5">
              {[
                "Radical accessibility — $15–40 vs $150–500+",
                "Lower stakes for daily wear and travel",
                "Gateway into niche and artisan genres",
                "Sometimes preserves discontinued profiles",
                "Some clone houses have earned genuine quality reputations",
                "Encourages exploration over brand loyalty",
              ].map((item) => (
                <li key={item} className="text-[11px] text-emerald-300/80 font-light leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-red-800/30 bg-red-900/10 rounded-sm p-4">
            <p className="text-[9px] uppercase tracking-[0.15em] text-red-400/80 font-medium mb-3">The downside</p>
            <ul className="space-y-1.5">
              {[
                "Quality varies wildly across houses",
                "Longevity and projection often fall short",
                "Blind buys are risky without sampling first",
                "Some houses use lower-grade aroma chemicals",
                "Reduces revenue for creative original houses",
                "Occasional batch inconsistency",
              ].map((item) => (
                <li key={item} className="text-[11px] text-red-300/70 font-light leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          The quality concern deserves nuance. The gap between a well-made clone and its source has narrowed considerably.
          Houses like Armaf, Alexandria Fragrances, and Parfums Vintage use reputable fragrance oil suppliers — sometimes
          the same ingredient houses as their designer counterparts — and the results can be genuinely impressive. The
          criticism that &ldquo;clones smell synthetic&rdquo; is far less true than it was ten years ago, though it remains
          a real risk at the very budget end of the market.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-10">
          The ethical dimension is more complicated. Clone houses don&apos;t steal intellectual property in any legally
          meaningful sense, but they do free-ride on the creative investment of the original perfumers. Whether that bothers
          you is a personal call — most enthusiasts land somewhere in the middle, buying originals they truly love while
          using clones for everyday rotation and discovery.
        </p>

        <div className="border-t border-stone-800/60 my-10" />

        {/* HOUSES */}
        <SectionLabel>The Houses</SectionLabel>
        <h2 className="font-serif text-2xl font-light text-stone-100 mb-2">Reputation, quality, and where to find them</h2>
        <p className="font-serif text-sm italic font-light text-stone-500 mb-8">
          Reputations below are composite assessments drawn from community consensus across fragrance forums, review
          channels, and enthusiast publications.
        </p>

        {HOUSES.map((house) => (
          <div key={house.name} className="border border-stone-800 bg-stone-900/20 rounded-sm p-4 mb-3">
            <div className="flex flex-wrap items-baseline gap-2 mb-2">
              <span className="font-serif text-base font-medium text-stone-100">{house.name}</span>
              <span className="text-[10px] text-stone-600 tracking-wide">{house.origin}</span>
              <HouseBadge variant={house.badge.variant} label={house.badge.label} />
            </div>
            <p className="font-serif text-sm font-light text-stone-400 leading-relaxed">{house.desc}</p>
          </div>
        ))}

        <div className="border-t border-stone-800/60 my-10" />

        {/* OFFICIAL ACCORDS */}
        <h2 className="font-serif text-2xl font-light text-stone-100 mb-4">Official and sanctioned accords</h2>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          Some fragrance producers occupy a legitimized grey zone — not covert clone operations, but openly positioned
          within the tradition of established perfumery without claiming to copy any specific fragrance.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          Montblanc Explorer EDP is a commercially sold designer fragrance that clearly draws from the fresh, woody
          masculine tradition pioneered by Bleu de Chanel and Dior Sauvage. Montblanc doesn&apos;t claim inspiration from
          any specific fragrance — but the olfactive DNA is unmistakable, and it&apos;s sold in department stores worldwide
          at around $65–85. Similarly, Davidoff Cool Water built its entire identity in 1988 largely in the shadow of
          Fahrenheit and Antaeus. These &ldquo;genre followers&rdquo; represent the legitimized, department-store tier of
          the clone tradition — originals that are themselves inspired by other originals.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-10">
          Even at the apex of prestige perfumery, the line between &ldquo;original&rdquo; and &ldquo;inspired&rdquo; is
          more porous than it appears. Parfums de Marly — retailing firmly at $250–400 — builds entire fragrance profiles
          around the vocabulary of 18th-century French royal perfumery, a tradition that is itself a form of deeply
          institutionalized creative inheritance.
        </p>

        <div className="border-t border-stone-800/60 my-10" />

        {/* EXAMPLES GRID */}
        <SectionLabel>Popular Pairings</SectionLabel>
        <h2 className="font-serif text-2xl font-light text-stone-100 mb-2">
          Masculine clones with strong community consensus
        </h2>
        <p className="font-serif text-sm italic font-light text-stone-500 mb-7">
          Wear through the full dry-down before judging — opening notes often diverge before the heart and base align.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-12">
          {EXAMPLES.map((ex) => (
            <div key={ex.clone} className="border border-stone-800 bg-stone-900/30 rounded-sm p-3.5">
              <p className="font-serif text-sm font-medium text-stone-200 leading-snug mb-1">
                {ex.cloneSlug ? (
                  <Link
                    href={`/fragrances/${ex.cloneSlug}`}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {ex.clone}
                  </Link>
                ) : (
                  ex.clone
                )}
              </p>
              <p className="text-[9px] text-stone-700 mb-0.5">accord for</p>
              <p className="text-[11px] text-amber-500/80 mb-2.5 font-medium">
                {ex.originalSlug ? (
                  <Link
                    href={`/fragrances/${ex.originalSlug}`}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {ex.original}
                  </Link>
                ) : (
                  ex.original
                )}
              </p>
              <p className="text-[11px] text-stone-500 leading-relaxed font-light">{ex.note}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-stone-800/60 my-10" />

        {/* HOW TO BUY SMART */}
        <SectionLabel>Evaluation Guide</SectionLabel>
        <h2 className="font-serif text-2xl font-light text-stone-100 mb-4">
          How to buy smart — and evaluate a clone without owning the original
        </h2>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          Here&apos;s the central challenge every clone buyer faces: you&apos;re trying to judge how accurately something
          recreates an experience you may have never had. Most people researching an Aventus clone have smelled Aventus
          once, briefly, at a counter or on a friend — not worn it through a full day, in multiple seasons, on their own
          skin. That gap between a momentary impression and genuine olfactory familiarity is where clone evaluation gets
          genuinely tricky.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-8">
          The good news is that a working evaluation method doesn&apos;t require you to own the original. It requires you
          to understand what makes the original distinctive — and then develop a vocabulary for tracking how well a clone
          captures those qualities.
        </p>

        {/* STEP 1 */}
        <p className="text-[10px] uppercase tracking-[0.22em] text-amber-500/70 mb-3 border-b border-stone-800 pb-2.5">
          Step 1 — Learn the pillars of the original before you smell anything
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5 mt-4">
          Every fragrance iconic enough to spawn a cottage industry of clones has a small set of defining characteristics
          — the two or three elements that make it immediately recognizable. Before purchasing any clone, identify those
          pillars from reviews, interviews with perfumers, and community descriptions of the original. For Creed Aventus,
          the pillars are broadly agreed to be:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-7">
          {[
            {
              title: "Pineapple-citrus brightness",
              desc: "A juicy, almost fizzing tropical top note that's immediately distinctive and surprisingly refined — not synthetic-fruity.",
            },
            {
              title: "Birch smoke",
              desc: "A cool, dry smokiness in the heart — the element most associated with Aventus's masculine character and most variable between batches.",
            },
            {
              title: "Ambergris base",
              desc: "A warm, animalic, almost oceanic depth in the dry-down that gives the fragrance its lasting character and skin-close intimacy.",
            },
            {
              title: "Oakmoss / patchouli structure",
              desc: "The earthy, chypre-adjacent foundation that stops the fragrance reading as purely fresh and gives it substance and age.",
            },
          ].map((p) => (
            <div key={p.title} className="bg-amber-900/10 border border-amber-800/25 rounded-sm p-3.5">
              <p className="text-[11px] font-medium text-amber-400/80 mb-1.5">{p.title}</p>
              <p className="text-[11px] text-stone-500 leading-relaxed font-light">{p.desc}</p>
            </div>
          ))}
        </div>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-8">
          Armed with those pillars, you can now ask a specific, answerable question about any Aventus clone: does it have
          all four? Which ones are stronger or weaker? Which is missing entirely? Suddenly you&apos;re not just asking
          &ldquo;does this smell like Aventus?&rdquo; — you&apos;re asking a series of smaller, more precise questions that
          are far easier to evaluate independently.
        </p>

        {/* STEP 2 */}
        <p className="text-[10px] uppercase tracking-[0.22em] text-amber-500/70 mb-3 border-b border-stone-800 pb-2.5">
          Step 2 — Understand when during the dry-down clones diverge
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5 mt-4">
          The opening — the first 15–30 minutes on skin — is where almost all clones diverge most from the original. Top
          notes are volatile and highly dependent on precise ratios and grades of specific aroma chemicals. Clone houses
          frequently nail the heart and base of a fragrance while opening with something noticeably different.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          This means the common mistake of spraying a clone, smelling the opening, and deciding it&apos;s nothing like the
          original is a genuine error. Patience is the most important evaluation tool you have.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-8">
          {[
            {
              label: "Top notes",
              time: "First 5–30 min",
              verdict: "Highest divergence",
              note: "Volatile molecules evaporate fastest. Clones frequently differ here due to ingredient grade and ratio. Don't judge yet.",
              bg: "bg-sky-900/15 border-sky-800/25",
              accent: "text-sky-400",
            },
            {
              label: "Heart notes",
              time: "30 min – 3 hours",
              verdict: "Where clones converge",
              note: "The character of the fragrance stabilizes. This is the phase where good clones prove themselves — and where your pillar evaluation begins.",
              bg: "bg-emerald-900/15 border-emerald-800/25",
              accent: "text-emerald-400",
            },
            {
              label: "Base notes",
              time: "3 hours onward",
              verdict: "The truest test",
              note: "Musks, woods, and resins. A clone that follows the original into the dry-down is a genuinely faithful accord — this phase is the hardest to fake.",
              bg: "bg-amber-900/15 border-amber-800/25",
              accent: "text-amber-400",
            },
          ].map((phase) => (
            <div key={phase.label} className={`border rounded-sm p-3.5 ${phase.bg}`}>
              <p className={`text-[9px] uppercase tracking-[0.15em] font-medium mb-1 ${phase.accent}`}>
                {phase.label}
              </p>
              <p className="text-[9px] text-stone-600 mb-2">{phase.time}</p>
              <p className="text-[11px] font-medium text-stone-300 mb-1.5">{phase.verdict}</p>
              <p className="text-[11px] text-stone-500 leading-relaxed font-light">{phase.note}</p>
            </div>
          ))}
        </div>

        {/* STEP 3 */}
        <p className="text-[10px] uppercase tracking-[0.22em] text-amber-500/70 mb-3 border-b border-stone-800 pb-2.5">
          Step 3 — Use multiple clones to triangulate the original
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5 mt-4">
          When several houses produce clones of the same fragrance, comparing them against each other is one of the most
          effective ways to map the original — even without owning it. Each clone represents a different interpretation of
          the same olfactive brief, and the qualities they share in common are the most reliable indicators of the
          original&apos;s true character.
        </p>

        <div className="border border-stone-800 bg-stone-900/20 rounded-sm p-4 mb-6">
          <p className="text-[9px] uppercase tracking-[0.15em] text-stone-600 mb-4">
            Aventus clone comparison — character differences
          </p>
          {[
            { clone: "Armaf CDNIM",             char: "Smokier, drier, more birch-forward"       },
            { clone: "Al Haramain L'Aventure",  char: "Warmer, sweeter, more amber in the base"  },
            { clone: "Alexandria Mango Tango",  char: "More tropical up front, brighter and fruitier" },
          ].map((row, i, arr) => (
            <div
              key={row.clone}
              className={`grid grid-cols-[1fr_auto_1fr] gap-3 items-center py-2.5 ${
                i < arr.length - 1 ? "border-b border-stone-800/50" : ""
              }`}
            >
              <span className="text-[11px] font-medium text-stone-300 bg-stone-800/50 rounded px-2 py-1 text-center">
                {row.clone}
              </span>
              <span className="text-[9px] text-stone-600 text-center whitespace-nowrap">reads as</span>
              <span className="text-[11px] text-stone-400 font-light text-right">{row.char}</span>
            </div>
          ))}
        </div>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-8">
          All three share the pineapple-birch-ambergris DNA. The differences tell you something precise: Armaf emphasizes
          the smoke pillar, Al Haramain emphasizes warmth, and Alexandria emphasizes the fruit. The Aventus original sits
          in the center of all three — wearing all three gives you a surprisingly complete picture of what the original is
          doing, even if you&apos;ve never touched a bottle of the real thing.
        </p>

        {/* STEP 4 */}
        <p className="text-[10px] uppercase tracking-[0.22em] text-amber-500/70 mb-3 border-b border-stone-800 pb-2.5">
          Step 4 — Build a reference vocabulary, not just impressions
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4 mt-4">
          Olfactory memory is notoriously unreliable in isolation but becomes far more useful when anchored to language.
          After wearing each clone, write down a few sentences — not about whether you like it, but about what you smell,
          phase by phase, and which of your identified pillars are present or absent. That&apos;s an evaluative record, not
          just an impression.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-8">
          Over time, this habit creates a personal reference database that makes you a far more reliable judge of any new
          clone. It also reveals something counterintuitive: some of the most beloved clones are not the most accurate. A
          clone that gets every pillar right but turns them all up can be more satisfying to wear than a more faithful but
          quieter interpretation — which raises the question actually worth asking.
        </p>

        <PullQuote>
          The best question isn&apos;t &ldquo;how close is this to the original?&rdquo; It&apos;s &ldquo;does this capture
          what made the original worth wanting in the first place?&rdquo;
        </PullQuote>

        {/* STEP 5 */}
        <p className="text-[10px] uppercase tracking-[0.22em] text-amber-500/70 mb-3 border-b border-stone-800 pb-2.5">
          Step 5 — Evaluate on your own terms, not just accuracy
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5 mt-4">
          A clone that is 70% faithful to the original but projects twice as long, costs one-tenth as much, and works
          better on your skin chemistry is, by most practical measures, the better fragrance for you. Separate your
          evaluation into these questions.
        </p>

        <div className="border border-stone-800 bg-stone-900/20 rounded-sm overflow-hidden mb-8">
          {[
            {
              label: "Genre fidelity.",
              text: "Does it capture the spirit of the original — the mood, occasion, and olfactive family it belongs to?",
            },
            {
              label: "Pillar accuracy.",
              text: "Are the two or three defining characteristics of the original present and recognizable in the heart and base?",
            },
            {
              label: "Dry-down integrity.",
              text: "Does the fragrance remain coherent and pleasant through the heart and base, not just the opening?",
            },
            {
              label: "Performance.",
              text: "Longevity (hours on skin) and projection (how far the sillage carries) relative to the price you're paying.",
            },
            {
              label: "Skin chemistry fit.",
              text: "Some fragrances — clones and originals alike — simply work better on certain skin types. Never judge from paper or a cold sniff off the cap.",
            },
            {
              label: "Independent wearability.",
              text: "Would you wear this if you'd never heard of the original? If the answer is yes, you've found a keeper.",
            },
          ].map((item, i, arr) => (
            <div
              key={item.label}
              className={`flex gap-3 items-start px-4 py-3 ${
                i < arr.length - 1 ? "border-b border-stone-800/60" : ""
              }`}
            >
              <span className="text-amber-500/50 text-sm mt-0.5 flex-shrink-0">✓</span>
              <p className="text-[12px] text-stone-400 leading-relaxed font-light">
                <span className="font-medium text-stone-300">{item.label}</span>{" "}
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          The single best thing you can do before any clone purchase is get a sample or decant. Many online fragrance
          retailers and specialty decanting services offer 1–5ml samples from most major clone houses for $3–7. Wear it
          through a full day — commute, lunch, late afternoon — before making any judgment. That full wear, evaluated
          against the pillars you identified in advance, will tell you more than any review.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-12">
          You may find, as many collectors do, that the fragrance journey becomes as rewarding as the destination: a
          well-developed nose, a personal reference vocabulary, and a rotation built entirely on what you actually love
          wearing, irrespective of what any bottle costs.
        </p>

        <p className="text-[11px] italic text-stone-600 border-t border-stone-800 pt-6">
          All prices are approximate USD and vary by retailer and bottle size. Batch variation is real across all houses
          listed — community reviews often note specific batch codes for standout runs. Sample before committing to full
          bottles whenever possible.
        </p>

      </div>
    </main>
  );
}
