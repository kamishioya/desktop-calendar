import React, { useEffect } from 'react'
import Calendar from './components/Calendar/Calendar'
import MemoPanel from './components/Memo/MemoPanel'
import WidgetContainer from './components/Widget/WidgetContainer'
import { useCalendar } from './hooks/useCalendar'
import { useMemos } from './hooks/useMemos'
import { useSettings } from './hooks/useSettings'
import { useCalendarStore } from './stores/calendarStore'

function App(): React.JSX.Element {
  const { selectedDate } = useCalendar()
  const { dateMemos, memoDates, addMemo, updateMemo, deleteMemo } = useMemos(selectedDate)
  const { settings, updateSettings } = useSettings()
  const setFirstDayOfWeek = useCalendarStore((s) => s.setFirstDayOfWeek)

  // Sync firstDayOfWeek setting with calendar store
  useEffect(() => {
    setFirstDayOfWeek(settings.firstDayOfWeek)
  }, [settings.firstDayOfWeek, setFirstDayOfWeek])

  return (
    <WidgetContainer settings={settings} onUpdateSettings={updateSettings}>
      <Calendar memoDates={memoDates} />
      <MemoPanel
        selectedDate={selectedDate}
        memos={dateMemos}
        onAdd={addMemo}
        onUpdate={updateMemo}
        onDelete={deleteMemo}
      />
    </WidgetContainer>
  )
}

export default App
