import { updateSingleShiftClockEvent, updateShiftsClockEvents, replaceShiftInList } from './schedule.redux.helpers';

describe('schedule.redux.helpers.test', () => {
  let clockEvents;

  describe('updateSingleShiftClockEvent', () => {
    let shift;
    beforeEach(() => {
      clockEvents = [
        { id: 'ce-1', updated: true },
        { id: 'ce-2', updated: true },
        { id: 'ce-3', updated: true },
      ];

      shift = {
        clockEvents:
        [
          { id: 'ce-1' },
          { id: 'ce-2' },
        ],
      };
    });

    it('shouldn\'t update shift with no clockEvents', () => {
      shift.clockEvents = [];
      const res = updateSingleShiftClockEvent(shift, clockEvents);
      expect(res).toEqual(shift);
      expect(res).toBe(shift);
    });

    it('shouldn\'t update shift where clockEvents do not have occurences', () => {
      shift.clockEvents = [
        { id: 'ce-4' },
      ];
      const res = updateSingleShiftClockEvent(shift, clockEvents);
      expect(res).toEqual(shift);
      expect(res).toBe(shift);
    });

    it('should update shift where clockEvents do have occurences', () => {
      const res = updateSingleShiftClockEvent(shift, clockEvents);
      expect(res).not.toEqual(shift);
      expect(res.clockEvents[0].updated).toBeTruthy();
      expect(res.clockEvents[1].updated).toBeTruthy();
    });

    it('should create a clone of the shift', () => {
      const res = updateSingleShiftClockEvent(shift, clockEvents);
      expect(res).not.toBe(shift);
      expect(res.clockEvents).toContain(clockEvents[0]);
      expect(res.clockEvents).toContain(clockEvents[1]);
      expect(res.clockEvents).not.toContain(clockEvents[2]);
    });
  });

  describe('updateShiftsClockEvents', () => {
    let shifts;
    beforeEach(() => {
      clockEvents = [
        { id: 'ce-1', updated: true },
        { id: 'ce-2', updated: true },
        { id: 'ce-3', updated: true },
        { id: 'ce-4', updated: true },
      ];

      shifts = [
        {
          id: 'sh-1',
          clockEvents:
            [
              { id: 'ce-1' },
              { id: 'ce-2' },
            ],
        },
        {
          id: 'sh-2',
          clockEvents:
            [
              { id: 'ce-3' },
            ],
        },
      ];
    });


    it('shouldn\'t update shifts with no clockEvents', () => {
      shifts[0].clockEvents = [];
      shifts[1].clockEvents = null;
      const res = updateShiftsClockEvents(shifts, clockEvents);
      expect(res).toEqual(shifts);
      expect(res).toBe(shifts);
    });

    it('shouldn\'t update shift where clockEvents do not have occurences', () => {
      shifts[0].clockEvents = [{ id: 'ce-6' }];
      shifts[1].clockEvents = [{ id: 'ce-9' }];
      const res = updateShiftsClockEvents(shifts, clockEvents);
      expect(res).toEqual(shifts);
      expect(res).toBe(shifts);
    });

    it('should update shifts where clockEvents do not have occurences', () => {
      const res = updateShiftsClockEvents(shifts, clockEvents);
      expect(res[0].clockEvents).toContain(clockEvents[0]);
      expect(res[0].clockEvents).toContain(clockEvents[1]);
      expect(res[1].clockEvents).toContain(clockEvents[2]);
      // Not contain
      expect(res[1].clockEvents).not.toContain(clockEvents[3]);
      expect(res[0].clockEvents).not.toContain(clockEvents[3]);
    });
  });

  describe('replaceShiftInList', () => {
    let shifts;
    beforeEach(() => {
      shifts = [
        {
          id: 'sh-1',
          clockExceptions:
            [
              { exception: 'ex-1' },
            ],
        },
        {
          id: 'sh-2',
          clockExceptions:
            [
              { exception: 'ex-2' },
            ],
        },
      ];
    });
    it('should replace shift in list', () => {
      const shift = {
        id: 'sh-1',
        clockExceptions:
        [
          { exception: 'ex-x' },
        ],
      };
      const res = replaceShiftInList(shifts, shift);
      expect(res).toContain(shift);
      expect(res[0].clockExceptions).toContain(shift.clockExceptions[0]);
    });
    it('should not replace shift if not found in list', () => {
      const shift = {
        id: 'sh-x',
        clockExceptions:
        [
          { exception: 'ex-x' },
        ],
      };
      const res = replaceShiftInList(shifts, shift);
      expect(res).not.toContain(shift);
    });
  });
});

