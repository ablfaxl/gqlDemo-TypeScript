import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Stack,
  Card,
  Box,
  CardContent,
  Avatar,
} from "@mui/material";
import { gql, useMutation, useQuery } from "@apollo/client";
import { writerData } from "../interface";

const ADD_WRITER = gql`
  mutation Mutation($name: String!) {
    createAuthor(name: $name) {
      msg
      status
    }
  }
`;
const GET_WRITER = gql`
  query Query {
    getAuthors {
      _id
      name
      createdAt
    }
  }
`;

type mutationTypeReponse = {
  createAuthor: {
    msg: string;
    status: number;
    __typename: string;
  };
};
export default function Writer() {
  const [name, setName] = useState<string>("");
  const [mutateFunction] = useMutation<mutationTypeReponse,{
    name: string | undefined;
  }>(ADD_WRITER);
  const { data, loading, error } = useQuery(GET_WRITER);

  const addWriter = async (): Promise<void> => {
    if (!name) return alert("plz fill create authers");
    const writer = await mutateFunction({
      variables: {
        name: name,
      },
    });
    console.log(writer);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <>
      <Container sx={{ bgcolor: "white" }}>
        <Typography variant="h4" align="center">
          Add Writer
        </Typography>
        <Stack>
          <TextField
            sx={{ pb: 2 }}
            id="standard-basic"
            label="Add Writer"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant="contained" onClick={addWriter}>
            Create Auther
          </Button>
          <br />
          {data.getAuthors.map((auther: writerData, i: number) => {
            return (
              <div key={i}>
                <Avatar
                  sx={{
                    position: "relative",
                    left: "65rem",
                    top: "65px",
                    width: "50px",
                    height: "50px",
                  }}
                  alt="Cindy Baker"
                  src="https://i.pinimg.com/564x/3c/44/85/3c44857f41ed4b1abfdf5a1d0873b050.jpg"
                />
                <Box
                  sx={{
                    bgcolor: "#c6c6c6",
                    border: "1px solid black",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Author
                  </Typography>
                  <Typography variant="h6" component="div">
                    {auther.name}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontSize: "10px" }}>
                    Joined:{auther.createdAt}
                  </Typography>
                </Box>
                <br />
              </div>
            );
          })}
        </Stack>
      </Container>
    </>
  );
}
