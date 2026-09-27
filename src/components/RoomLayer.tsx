import { memo } from 'react'
import { px, py } from '../data/plan'
import { ROOMS } from '../data/qto'

/**
 * The three rooms the user marks with BetterCalc's rectangle tool.
 * Each room replays the product gesture: click a corner, drag to the opposite corner,
 * release — then the handles settle, the area fills and its quantity is written on the plan.
 * All motion is CSS, triggered by the story's data-reached tokens.
 */
export const RoomLayer = memo(function RoomLayer() {
  return (
    <div className="rooms" aria-hidden="true">
      {ROOMS.map((room, i) => {
        const { x0, y0, x1, y1 } = room.rect
        const w = x1 - x0
        const h = y1 - y0
        return (
          <div key={room.id} className="room" data-room={i + 1} style={{ left: px(x0), top: py(y0), width: px(w), height: py(h) }}>
            <span className="room__shape" />
            <span className="room__handle room__handle--tl" />
            <span className="room__handle room__handle--tr" />
            <span className="room__handle room__handle--br" />
            <span className="room__handle room__handle--bl" />
            <span className="room__cursor" />
            <span className="room__tag" style={{ left: `${((room.tag.x - x0) / w) * 100}%`, top: `${((room.tag.y - y0) / h) * 100}%` }} dir="rtl">
              <span className="room__tag-name"><bdi dir="ltr" className="room__tag-index">{room.index}</bdi>{room.name}</span>
              <span className="room__tag-value"><bdi dir="ltr">{room.area}</bdi>&nbsp;מ״ר</span>
            </span>
          </div>
        )
      })}
    </div>
  )
})
