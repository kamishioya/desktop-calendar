import React from 'react'
import CalendarHeader from './CalendarHeader'
import CalendarGrid from './CalendarGrid'
import { useCalendar } from '../../hooks/useCalendar'

interface CalendarProps {
  memoDates?: Set<string>
}

const Calendar: React.FC<CalendarProps> = ({ memoDates = new Set() }) => {
  const {
    calendarDays,
    monthLabel,
    yearLabel,
    weekDayLabels,
    nextMonth,
    prevMonth,
    goToToday,
    setSelectedDate
  } = useCalendar()

  return (
    <div className="select-none">
      <CalendarHeader
        yearLabel={yearLabel}
        monthLabel={monthLabel}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
        onToday={goToToday}
      />
      <CalendarGrid
        weekDayLabels={weekDayLabels}
        days={calendarDays}
        memoDates={memoDates}
        onSelectDate={setSelectedDate}
      />
    </div>
  )
}

export default React.memo(Calendar)
