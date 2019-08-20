import _ from 'lodash';
import { TaskItemController } from './TaskItemController';
import { TaskStatus } from '../../../../shared/types/TaskRedux.types';

describe('TaskItemController', () => {
  beforeAll(() => {
    _.debounce = jest.fn(fn => fn);
  });

  afterAll(() => {
    jest.unmock('lodash');
  });

  it('should set notes', () => {
    const controller = new TaskItemController({ notes: null }, {});
    controller.setNotes('some notes');
    expect(controller.item.notes).toBe('some notes');
  });

  it('should not save when data is unchanged', () => {
    const setItem = jest.fn();
    const saveItem = jest.fn();
    const controller = new TaskItemController({ notes: 'original-notes' }, {}, { setItem, saveItem });
    controller.save();
    expect(setItem).not.toHaveBeenCalled();
    expect(saveItem).not.toHaveBeenCalled();
  });

  it('should save when notes is changed', () => {
    const setItem = jest.fn();
    const saveItem = jest.fn();
    const controller = new TaskItemController({ notes: 'original-notes' }, {}, { setItem, saveItem });
    controller.setNotes('new-notes');
    controller.save();
    expect(setItem).toHaveBeenCalled();
    expect(saveItem).toHaveBeenCalled();
  });

  it('should save when rating is changed from empty', () => {
    const setItem = jest.fn();
    const saveItem = jest.fn();
    const controller = new TaskItemController({ }, {}, { setItem, saveItem });
    controller.setRating(3);
    controller.save();
    expect(setItem).toHaveBeenCalled();
    expect(saveItem).toHaveBeenCalled();
  });

  it('should save when rating is changed', () => {
    const setItem = jest.fn();
    const saveItem = jest.fn();
    const controller = new TaskItemController({ rating: { value: 2 } }, {}, { setItem, saveItem });
    controller.setRating(3);
    controller.save();
    expect(setItem).toHaveBeenCalled();
    expect(saveItem).toHaveBeenCalled();
  });

  it('should set canEdit to true when task is anything other than complete', () => {
    const controller = new TaskItemController({}, { status: TaskStatus.Pending }, { });
    expect(controller.canEdit).toBe(true);
  });

  it('should set editing to false when task is complete', () => {
    const controller = new TaskItemController(
      {},
      { status: TaskStatus.Complete },
      { updateItem: jest.fn() },
    );
    expect(controller.canEdit).toBe(false);
  });
});
