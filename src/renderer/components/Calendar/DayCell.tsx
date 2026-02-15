import React from 'react'

interface DayCellProps {
  dayNumber: number
  isToday: boolean
  isSelected: boolean
  isCurrentMonth: boolean
  hasMemo: boolean
  onClick: () => void
}

const DayCell: React.FC<DayCellProps> = ({
  dayNumber,
  isToday,
  isSelected,
  isCurrentMonth,
  hasMemo,
  onClick
}) => {
  const baseClasses =
    'relative flex flex-col items-center justify-center h-9 w-full rounded-md text-xs cursor-pointer transition-all duration-150'

  let colorClasses = ''
  if (isSelected) {
    colorClasses = 'bg-blue-500 text-white font-bold'
  } else if (isToday) {
    colorClasses = 'bg-blue-500/20 text-blue-400 font-semibold ring-1 ring-blue-500/50'
  } else if (isCurrentMonth) {
    colorClasses = 'text-gray-200 hover:bg-white/10'
  } else {
    colorClasses = 'text-gray-600 hover:bg-white/5'
  }

  return (
    <button
      className={`${baseClasses} ${colorClasses}`}
      onClick={onClick}
      type="button"
    >
      <span>{dayNumber}</span>
      {hasMemo && (
        <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-blue-400" />
      )}
    </button>
  )
}

export default React.memo(DayCell)
