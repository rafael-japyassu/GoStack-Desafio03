import React, { useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const repository = {
      url: "https://github.com/Rafa11j/GoStack-Desafio03",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"]
    };

    const response = await api.post('/repositories', repository);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const repositoriesIndex = repositories.findIndex(repository => repository.id === id);
    const repositoriesList = repositories;
    repositoriesList.splice(repositoriesIndex, 1);

    setRepositories([...repositoriesList]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              { repository.title }

              <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>
          ))
        }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>{' '}
      <button onClick={() => setRepositories([])}>Remover</button>
    </div>
  );
}

export default App;
