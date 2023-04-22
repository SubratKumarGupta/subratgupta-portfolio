import { useState } from "react";
const schema = `
type Query{
	pizzas: [Pizza!]
}
`;

export const EmbeddedEditor = () => {
  const [gql, setGql] = useState("");
  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        alignSelf: "stretch",
        display: "flex",
        position: "relative",
      }}
    >
      {/* <GraphQLGqlEditor
        gql={""}
        setGql={(gqlString) => setGql(gqlString)}
        schema={{ code: schema }}
      /> */}
    </div>
  );
};
