export const getPeopleAPI = async () => {
  try {
    return (await fetch('https://swapi.dev/api/people/')).json();
  } catch (error) {
    console.error(error);
  }
};

export const getFilmsAPI = async () => {
  try {
    return (await fetch('https://swapi.dev/api/films/')).json();
  } catch (error) {
    console.error(error);
  }
};
