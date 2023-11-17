import Cookies from 'js-cookie';
import checkEnvironment from '@/util/check-environment';

class User {
  constructor(public email: string, public id: string) {}
}

const getCookieUser = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('email');
  const id = urlParams.get('id');

  console.log('_email:'+email+'_');
  console.log('_id'+id+'_');
  
  if (email != null) {
    Cookies.set('email', email);
    Cookies.set('id', email);
    return new User(email, id);
  }
  const user = new User(Cookies.get('email'), Cookies.get('id'));
  return user;
};

export default getCookieUser;
