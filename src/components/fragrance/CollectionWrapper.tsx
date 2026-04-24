"use client";

import { useState } from "react";
import { CollectionButton } from "@/components/collection/CollectionButton";
import type { CollectionEntry } from "@/types/ugc";

export default function CollectionWrapper({
  fragranceId,
  fragranceName,
  initialEntry,
}: {
  fragranceId: string;
  fragranceName: string;
  initialEntry: CollectionEntry | null;
}) {
  const [entry, setEntry] = useState<CollectionEntry | null>(initialEntry);

  return (
    <CollectionButton
      fragranceId={fragranceId}
      fragranceName={fragranceName}
      currentEntry={entry}
      onUpdate={setEntry}
    />
  );
}
