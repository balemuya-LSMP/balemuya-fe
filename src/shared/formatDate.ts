import { format } from 'date-fns';

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    const formattedDate = format(date, 'MMM d, yyyy');
    const formattedTime = format(date, 'hh:mm aa');
    return `${formattedDate} at ${formattedTime}`;
  };
