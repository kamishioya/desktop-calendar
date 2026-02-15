import React from 'react'

interface CalendarHeaderProps {
  yearLabel: string
  monthLabel: string
  onPrevMonth: () => void
  onNextMonth: () => void
  onToday: () => void
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  yearLabel,
  monthLabel,
  onPrevMonth,
  onNextMonth,
  onToday
}) => {
  return (
    <div className="flex items-center justify-between px-2 py-2">
      <button
        onClick={onPrevMonth}
        className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
        aria-label="前月"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      <button
        onClick={onToday}
        className="text-white font-medium text-sm hover:text-blue-400 transition-colors"
        title="今日に戻る"
      >
        {yearLabel} {monthLabel}
      </button>

      <button
        onClick={onNextMonth}
        className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
        aria-label="翌月"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  )
}

export default React.memo(CalendarHeader)
