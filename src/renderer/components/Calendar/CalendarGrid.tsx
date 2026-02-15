import React from 'react'
import DayCell from './DayCell'

interface DayInfo {
  date: Date
  dateStr: string
  dayNumber: number
  isToday: boolean
  isSelected: boolean
  isCurrentMonth: boolean
}

interface CalendarGridProps {
  weekDayLabels: string[]
  days: DayInfo[]
  memoDates: Set<string>
  onSelectDate: (date: Date) => void
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  weekDayLabels,
  days,
  memoDates,
  onSelectDate
}) => {
  return (
    <div className="px-2">
      {/* Week day headers */}
      <div className="grid grid-cols-7 mb-1">
        {weekDayLabels.map((label, i) => (
          <div
            key={i}
            className={`text-center text-xs font-medium py-1 ${
              i === 0 || (i === 6 && weekDayLabels[0] !== '月')
                ? 'text-red-400/70'
                : i === 6 || (weekDayLabels[0] === '月' && i === 5)
                  ? 'text-blue-400/70'
                  : 'text-gray-500'
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((day) => (
          <DayCell
            key={day.dateStr}
            dayNumber={day.dayNumber}
            isToday={day.isToday}
            isSelected={day.isSelected}
            isCurrentMonth={day.isCurrentMonth}
            hasMemo={memoDates.has(day.dateStr)}
            onClick={() => onSelectDate(day.date)}
          />
        ))}
      </div>
    </div>
  )
}

export default React.memo(CalendarGrid)
