'use client'

import { useState } from 'react'
import type { WorldMapData } from '@/lib/geo'
import { Segmented } from '@/components/pcu/Segmented'
import { WorldMap } from './WorldMap'

type Layer = { key: string; label: string; unit: string; map: WorldMapData }

/** Several world-map layers behind one switch (e.g. partners vs students). */
export function MapSwitch({ layers, label }: { layers: Layer[]; label: string }) {
  const [key, setKey] = useState(layers[0].key)
  const layer = layers.find(l => l.key === key) ?? layers[0]
  return (
    <div>
      {layers.length > 1 && (
        <div className="mb-6">
          <Segmented label={label} options={layers.map(l => ({ key: l.key, label: l.label }))} value={key} onChange={setKey} />
        </div>
      )}
      <WorldMap map={layer.map} unit={layer.unit} label={`${label}: ${layer.label}`} />
    </div>
  )
}
