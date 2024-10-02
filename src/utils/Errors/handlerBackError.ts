import { errorDisplay } from '../../store/reducers/profileReducer';
import { AppDispatch } from '../../store/store';
import { AxiosError } from '../../@types';

export default function handlerBackError(
  error: AxiosError,
  dispatch: AppDispatch
) {
  if (error) {
    if (error.response.data.error.originalMessage) {
      const { originalMessage } = error.response.data.error;

      switch (true) {
        case originalMessage.includes('title'):
          dispatch(
            errorDisplay('Le titre doit contenir au moins 2 caractères')
          );
          break;
        case originalMessage.includes('description'):
          dispatch(
            errorDisplay('La description doit contenir au moins 2 caractères')
          );
          break;
        case originalMessage.includes('phone'):
          dispatch(errorDisplay('Numéro de téléphone incorrect'));
          break;
        case originalMessage.includes('address'):
          dispatch(errorDisplay('Addresse non trouvée '));
          break;
        case originalMessage.includes('city'):
          dispatch(errorDisplay('Ville inconnue'));
          break;
        case originalMessage.includes('password'):
        case originalMessage.includes('passwordConfirm'):
        case originalMessage.includes('newPassword'):
        case originalMessage.includes('newPasswordConfirm'):
          // case originalMessage.includes('value'):
          dispatch(
            errorDisplay(
              'Le mot de passe doit contenir au moins 8 caractères, 1 chiffre, 1 majuscule, 1 minuscule et 1 caractère spécial'
            )
          );
          break;
        case originalMessage.includes('OTP'):
          dispatch(errorDisplay('Code OTP invalide'));
          break;
        case originalMessage.includes('email'):
          dispatch(errorDisplay('Email incorrect'));
          break;
        case originalMessage.includes('pseudo'):
          dispatch(errorDisplay('Pseudo incorrect'));
          break;

        default:
          dispatch(errorDisplay('Valeur incorrecte'));
      }
      return;
    }

    dispatch(errorDisplay(error.response.data.error.message));
  } else {
    dispatch(errorDisplay('Une erreur inconnue est survenue.'));
  }
}
