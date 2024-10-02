import { errorDisplay } from '../../store/reducers/profileReducer';
import { AppDispatch } from '../../store/store';

export default function handlerFrontError(
  error: string,
  dispatch: AppDispatch
) {
  dispatch(errorDisplay(error));
}
