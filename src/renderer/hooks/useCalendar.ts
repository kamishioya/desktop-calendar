import { useMemo } from 'react'
import { format, isSameDay, isSameMonth, isToday } from 'date-fns'
import { useCalendarStore } from '../stores/calendarStore'

interface DayInfo {
  date: Date
  dateStr: string
  dayNumber: number
  isToday: boolean
  isSelected: boolean
  isCurrentMonth: boolean
}

interface UseCalendarReturn {
  currentDate: Date
  selectedDate: Date
  calendarDays: DayInfo[]
  monthLabel: string
  yearLabel: string
  weekDayLabels: string[]
  nextMonth: () => void
  prevMonth: () => void
  goToToday: () => void
  setSelectedDate: (date: Date) => void
}

export function useCalendar(): UseCalendarReturn {
  const {
    currentDate,
    selectedDate,
    calendarDays,
    firstDayOfWeek,
    nextMonth,
    prevMonth,
    goToToday,
    setSelectedDate
  } = useCalendarStore()

  const dayInfos: DayInfo[] = useMemo(() => {
    return calendarDays.map((date) => ({
      date,
      dateStr: format(date, 'yyyy-MM-dd'),
      dayNumber: date.getDate(),
      isToday: isToday(date),
      isSelected: isSameDay(date, selectedDate),
      isCurrentMonth: isSameMonth(date, currentDate)
    }))
  }, [calendarDays, selectedDate, currentDate])

  const monthLabel = format(currentDate, 'M月')
  const yearLabel = format(currentDate, 'yyyy年')

  const weekDayLabels = useMemo(() => {
    const labels = ['日', '月', '火', '水', '木', '金', '土']
    if (firstDayOfWeek === 1) {
      return [...labels.slice(1), labels[0]]
    }
    return labels
  }, [firstDayOfWeek])

  return {
    currentDate,
    selectedDate,
    calendarDays: dayInfos,
    monthLabel,
    yearLabel,
    weekDayLabels,
    nextMonth,
    prevMonth,
    goToToday,
    setSelectedDate
  }
}
