
export function updateSingleShiftClockEvent(shift, clockEvents, clockEventsIds = null) {
  const ids = clockEventsIds || clockEvents.map(ev => ev.id);
  const isIncludedInClockEvents = e => ids.includes(e.id);

  // Check before cloning the object
  if (!shift.clockEvents || !shift.clockEvents.find(isIncludedInClockEvents)) return shift;

  const clone = { ...shift };
  clone.clockEvents = clone.clockEvents.map(ev => clockEvents.find(e => e.id === ev.id) || ev);
  return clone;
}


export function updateShiftsClockEvents(shifts, clockEvents) {
  const ids = clockEvents.map(ev => ev.id);
  const isIncludedInClockEvents = e => ids.includes(e.id);

  // Check before cloning the array
  if (!shifts.find(shift => shift.clockEvents && shift.clockEvents.find(isIncludedInClockEvents))) return shifts;

  return shifts.map(shift => updateSingleShiftClockEvent(shift, clockEvents, ids));
}

export function replaceShiftInList(shifts, shift) {
  const shiftsCopy = shifts.slice();
  const index = shiftsCopy.findIndex(s => s.id === shift.id);
  if (index > -1) shiftsCopy[index] = shift;
  return shiftsCopy;
}
