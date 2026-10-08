'use client'

import { useState } from 'react'
import type { BubbleMapData, WorldMapData } from '@/lib/geo'
import { Segmented } from '@/components/pcu/Segmented'
import { WorldMap } from '@/components/viz/WorldMap'
import { BubbleMap } from '@/components/viz/BubbleMap'
import PartnerDirectory from './PartnerDirectory'

/** Maps that filter the partner directory: click a country or city to list its partners. */
export default function PartnerExplorer({ world, indonesia }: { world: WorldMapData; indonesia: BubbleMapData }) {
  const [view, setView] = useState<'intl' | 'dom'>('intl')
  const [country, setCountry] = useState<string | null>(null)
  const [city, setCity] = useState<string | null>(null)
  const clear = () => { setCountry(null); setCity(null) }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="mb-6">
          <Segmented
            label="Map"
            options={[{ key: 'intl', label: 'World' }, { key: 'dom', label: 'Indonesia' }]}
            value={view}
            onChange={k => { setView(k); clear() }}
          />
        </div>
        {view === 'intl' ? (
          <WorldMap map={world} unit="partners" label="International partners by country. Select a country to list its partners." selected={country} onSelect={c => { setCity(null); setCountry(c) }} />
        ) : (
          <BubbleMap map={indonesia} unit="partners" label="Domestic partners by city. Select a city to list its partners." selected={city} onSelect={c => { setCountry(null); setCity(c) }} />
        )}
        <p className="text-sm muted mt-2 mb-0">Tap a {view === 'intl' ? 'country' : 'city'} to filter the list.</p>
      </div>
      <PartnerDirectory bare country={country} city={city} onClear={clear} />
    </div>
  )
}
