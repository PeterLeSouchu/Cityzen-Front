import { Activities } from '../@types';

export default function isInclude(activities: Activities[], id: number) {
  return activities.some((activity) => activity.id === id);
}
