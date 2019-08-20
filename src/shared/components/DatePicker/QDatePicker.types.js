export interface IQDatePickerProps {
  dateFormat: string;
  dueDate: Date;
  onDateChange: (date: Date) => void;
}
