import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { RecordStyled } from "./Records.style";

export const Records = () => {
  const { level, records } = useContext(GameContext);

  return (
    <>
      <div style={{ width: "100%", overflowX: "scroll" }}>
        {records && (
          <RecordStyled>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Pontuação</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {records.map((value) => (
                <tr key={value.id}>
                  <td>{value.name}</td>
                  <td>{value.score.toLocaleString("pt-BR")}</td>
                  <td>
                    {new Date(value.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </RecordStyled>
        )}
      </div>
    </>
  );
};
