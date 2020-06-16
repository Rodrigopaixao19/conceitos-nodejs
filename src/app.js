const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];






app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  // TODO PUT /repositories/:id: A rota deve alterar apenas o title, a url e as techs do repositório que possua o id igual ao id presente nos parâmetros da rota;

  const { title, url , techs } = request.body;
  const { id } = request.params;

  const repositoryId = repositories.findIndex(repository => repository.id === id)

  if(repositoryId < 0) {
    return response.status(400).json({ error: 'Repository not found'})
  }

  const uniqueRepository = repositories[repositoryId]

  repositories[repositoryId] = {
    ...uniqueRepository,
    id,
    title,
    url,
    techs
  }

 
  return response.json(repositories[repositoryId]);



});

app.delete("/repositories/:id", (request, response) => {
  // TODO DELETE /repositories/:id: A rota deve deletar o repositório com o id presente nos parâmetros da rota;

  const { id } = request.params;

  const repositoryId = repositories.findIndex(repository => repository.id === id)

  if(repositoryId < 0) {
    return response.status(400).json( { error: 'Repository not found'});
  }

  repositories.splice(repositoryId, 1)

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0){
    return response.status(400).json({ error: "Project not found"});
  }

  repositories[repositorieIndex].likes ++;


  return response.json(repositories[repositorieIndex]);
});

module.exports = app;
