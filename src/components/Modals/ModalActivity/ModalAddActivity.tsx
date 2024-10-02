import { Activities } from '../../../@types';
import ModalActivity from './ModalActivity';

interface ModalAddActivityProps {
  setModalType: React.Dispatch<
    React.SetStateAction<'edit' | 'delete' | 'add' | null>
  >;
  setMyActivities: React.Dispatch<React.SetStateAction<Activities[]>>;
}

function ModalAddActivity({
  setModalType,
  setMyActivities,
}: ModalAddActivityProps) {
  return (
    <ModalActivity
      setModalType={setModalType}
      setMyActivities={setMyActivities}
      type="add"
    />
  );
}
export default ModalAddActivity;
