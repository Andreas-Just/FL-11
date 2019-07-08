const adminData ={
  email: 'admin@gmail.com',
  password: 'AdminPass'
};
const userData ={
  email: 'user@gmail.com',
  password: 'UserPass'
};
const minNumberCharacters ={
  emailLength: 6,
  passwordLength: 5
};

const email = prompt('Please, enter your e-mail (the one you indicated when registering in the system): ', '');

if (email === null) {
  alert('Canceled');
} else if (email.length < minNumberCharacters.emailLength) {
  alert('I don\'t know any emails having name length less than 6 symbols');
} else if (email === adminData.email || email === userData.email) {
  const password = prompt('Please enter your password: ', '');
  if (password === null || password === '') {
    alert('Canceled');
  } else if (email === adminData.email && password === adminData.password ||
             email === userData.email && password === userData.password) {
    const isChangePassword = confirm('Do you want to change your password?');
    if (isChangePassword) {
      const oldPassword = prompt('Please enter your current password: ', '');
      if (oldPassword === null || oldPassword === '') {
        alert('Canceled');
      } else if (oldPassword === password) {
        const newPassword = prompt('Please enter your new password: ', '');
        if (newPassword < minNumberCharacters.passwordLength) {
          alert('It\'s too short password. Sorry');
        } else {
          const newPasswordAgain = prompt('Please enter your new password again: ', '');
          if (newPasswordAgain === newPassword) {
            alert('You have successfully changed your password');
          } else if (newPasswordAgain !== newPassword) {
            alert('You wrote the wrong password');
          } else {
            alert('Canceled');
          }
        }
      } else {
        alert('Wrong password');
      }
    } else {
      alert('You have failed the change');
    }
  } else {
    alert('Wrong password');
  }
} else {
  alert('I don’t know you');
}