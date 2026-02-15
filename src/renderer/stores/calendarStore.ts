import { create } from 'zustand'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths
} from 'date-fns'

interface CalendarState {
  currentDate: Date
  selectedDate: Date
  calendarDays: Date[]
  firstDayOfWeek: 0 | 1

  setSelectedDate: (date: Date) => void
  nextMonth: () => void
  prevMonth: () => void
  goToToday: () => void
  setFirstDayOfWeek: (day: 0 | 1) => void
  computeCalendarDays: () => void
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  currentDate: new Date(),
  selectedDate: new Date(),
  calendarDays: [],
  firstDayOfWeek: 0,

  setSelectedDate: (date: Date): void => {
    set({ selectedDate: date, currentDate: date })
    get().computeCalendarDays()
  },

  nextMonth: (): void => {
    const next = addMonths(get().currentDate, 1)
    set({ currentDate: next })
    get().computeCalendarDays()
  },

  prevMonth: (): void => {
    const prev = subMonths(get().currentDate, 1)
    set({ currentDate: prev })
    get().computeCalendarDays()
  },

  goToToday: (): void => {
    const today = new Date()
    set({ currentDate: today, selectedDate: today })
    get().computeCalendarDays()
  },

  setFirstDayOfWeek: (day: 0 | 1): void => {
    set({ firstDayOfWeek: day })
    get().computeCalendarDays()
  },

  computeCalendarDays: (): void => {
    const { currentDate, firstDayOfWeek } = get()
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: firstDayOfWeek })
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: firstDayOfWeek })
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })
    set({ calendarDays: days })
  }
}))

// Initialize calendar days
useCalendarStore.getState().computeCalendarDays()
