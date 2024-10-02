import { Activities } from '../../../@types';
import ModalActivity from './ModalActivity';

interface ModalEditActivityProps {
  setModalType: React.Dispatch<
    React.SetStateAction<'edit' | 'delete' | 'add' | null>
  >;
  setActivityId: React.Dispatch<React.SetStateAction<number | null>>;
  id: number;
  setMyActivities: React.Dispatch<React.SetStateAction<Activities[]>>;
}

function ModalEditActivity({
  setModalType,
  setActivityId,
  id,
  setMyActivities,
}: ModalEditActivityProps) {
  return (
    <ModalActivity
      setModalType={setModalType}
      setMyActivities={setMyActivities}
      type="edit"
      id={id}
      setActivityId={setActivityId}
    />
  );
}
export default ModalEditActivity;
