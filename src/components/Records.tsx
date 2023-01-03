import { RecordStyled } from "./Records.style";

const data = [
  {
    id: 1,
    name: "Igor Santos da Costa Costa Costa costa",
    score: 200,
    date: new Date(),
  },
  { id: 2, name: "Igor Santos", score: 200, date: new Date() },
  { id: 3, name: "Igor Santos", score: 200, date: new Date() },
  { id: 4, name: "Igor Santos", score: 200, date: new Date() },
  { id: 5, name: "Igor Santos", score: 200, date: new Date() },
  { id: 6, name: "Igor Santos", score: 200, date: new Date() },
  { id: 7, name: "Igor Santos", score: 200, date: new Date() },
  { id: 8, name: "Igor Santos", score: 200, date: new Date() },
  { id: 9, name: "Igor Santos", score: 200, date: new Date() },
  { id: 10, name: "Igor Santos", score: 200, date: new Date() },
];

export const Records = () => {
  return (
    <>
      <RecordStyled>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Pontuação</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value) => (
            <tr key={value.id}>
              <td>{value.name}</td>
              <td>{value.score}</td>
              <td>{value.date.toLocaleDateString("pt-BR")}</td>
            </tr>
          ))}
        </tbody>
      </RecordStyled>
    </>
  );
};
