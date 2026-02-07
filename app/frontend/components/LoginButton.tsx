import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function LoginButton() {
  return (
    <button type={'submit'} className='loginButton'>
      <FontAwesomeIcon icon={faRightToBracket} />
    </button>
  );
}
