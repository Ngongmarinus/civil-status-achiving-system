const { ipcRenderer } = require('electron');


const addBirth = document.querySelector('#add_birth');

addBirth.addEventListener('submit', (event) => {
  event.preventDefault();

  const newBorn = {

    first_name: addBirth.first_name.value,
    last_name: addBirth.last_name.value,
    date_of_birth:addBirth.date_of_birth.value,
    place_of_birth:addBirth.place_of_birth.value,
    gender:addBirth.gender.value,
    father_name:addBirth.father_name.value,
    born_at1:addBirth.born_at1.value,
    born_on1:addBirth.born_on1.value,
    ProfessionF:addBirth.ProfessionF.value,
    mother_name:addBirth.mother_name.value,
    born_at2:addBirth.born_at2.value,
    born_on2:addBirth.born_on2.value,
    ProfessionM:addBirth.ProfessionM.value
  };
  
  ipcRenderer.invoke('birth_certificates', newBorn)
    .then(() => {
      addBirth.reset();
      alert('Added successfully!');
    })
    .catch((error) => {
      console.error(error);
      alert('Failed to add !');
    });
});

const anotherDivorce = document.querySelector('#another_divorce');

anotherDivorce.addEventListener('submit', (event) => {
  event.preventDefault();

  const divorceAgain = {

    husband_id: anotherDivorce.husband_id.value,
    husband_name: anotherDivorce.husband_name.value,
    wife_id:anotherDivorce.wife_id.value,
    wife_name:anotherDivorce.wife_name.value,
    marriage_id:anotherDivorce.marriage_id.value,
    date_of_divorce:anotherDivorce.date_of_divorce.value,
    place_of_divorce:anotherDivorce.place_of_divorce.value,
  };
  
  ipcRenderer.invoke('divorce_certificates', divorceAgain)
    .then(() => {
      anotherDivorce.reset();
      alert('Added successfully!');
    })
    .catch((error) => {
      console.error(error);
      alert('Failed to add !');
    });
});

const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const result = await ipcRenderer.invoke('login', { username, password });

  if (result.success) {
    window.location.href = 'dashboard.html';
  } else {
    alert('Login failed. Please try again.');
  }
});