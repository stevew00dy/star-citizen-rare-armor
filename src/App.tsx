import { armors } from './data/armorAll'
import type { ArmorItem } from './types'

function App() {
  return (
    <div className="app">
      <h1>Star Citizen — Rare Armour Tracker</h1>
      <p style={{ marginBottom: '1rem', color: '#94a3b8' }}>
        Locations, set pieces, variants, and grey-market values. Track progress and favourites.
      </p>
      <div className="armor-list">
        {armors.map((a: ArmorItem) => (
          <article key={a.id} className="armor-card">
            <h2>{a.name}</h2>
            <div className="armor-meta">
              {a.type} · {a.manufacturer} · {a.val}
            </div>
            <div className="armor-where"><strong>Where:</strong> {a.where}</div>
            {a.how && <div className="armor-how">{a.how}</div>}
            <div className="variants">
              <span>Variants: </span>
              {a.variants.join(', ')}
            </div>
            {a.setPieces && a.setPieces.length > 0 && (
              <ul className="set-pieces">
                {a.setPieces.map((p) => (
                  <li key={p.slot}>
                    <span className="slot">{p.slot}:</span> {p.item}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}

export default App
