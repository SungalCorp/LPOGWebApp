
import { redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const apiEndpoint = 'https://apiserver.sungalcorp.synology.me/dbGet_useraccounts';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const data = await request.formData();
  const username = data.get('username').trim();
  const password = data.get('password');

  const userRecListRaw = await fetch(`${apiEndpoint}?filter=username='${username}'`);
  const userRecList = await userRecListRaw.json();

  if (userRecList.length === 0) {
    alert('Invalid user ID');
    return false;
  }

  const userRec = userRecList[0];

  if (userRec.password !== password) {
    alert('Invalid password');
    return false;
  }

  return redirect('/LivingPOG');
}
