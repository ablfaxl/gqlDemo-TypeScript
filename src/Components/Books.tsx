import React, { useState, FC, ChangeEvent } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Stack,
  TextField,
  Box,
  Button,
  CardContent,
  Card,
  CardActions,
  Select,
  MenuItem,
} from "@mui/material";
// ##################
const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $authorId: ID!) {
    createBook(title: $title, authorId: $authorId) {
      msg
      status
    }
  }
`;

const GET_WRITER = gql`
  query GetAuthors {
    getAuthors {
      _id
      name
      createdAt
    }
  }
`;

const GET_BOOKS = gql`
  query GetBooks {
    getBooks {
      _id
      title
      authorId
      createdAt
    }
  }
`;

type GetAuthorsType = {
  __typename: string;
  _id: string;
  name: string;
  createdAt: string;
};

type GetBooksType = {
  __typename: string;
  _id: string;
  title: string;
  authorId: string;
  createdAt: string;
};

type GetWriterTypeResponse = {
  getAuthors: GetAuthorsType[];
};
type GetBooksTypeResponse = {
  getBooks: GetBooksType[];
};

type mutationTypeReponse = {
  data: {
    createBook: {
      msg: string;
      status: number;
      __typename: string;
    };
  };
};

const Books: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [athurId, setAthurId] = useState<string>("xx");
  const [CreateBook] = useMutation<mutationTypeReponse>(CREATE_BOOK);
  const { data, loading, error,refetch } = useQuery<GetWriterTypeResponse>(GET_WRITER);
  const { data: getBooks } = useQuery<GetBooksTypeResponse>(GET_BOOKS);

  const addBook = async (): Promise<void> => {
    if (!title) return alert("Please complete the form");
    try {
      const res = await CreateBook({
        variables: {
          title: title,
          authorId: athurId,
        },
      });
      console.log(res);
      setTitle("");
      if (res) return alert("ok");
    } catch (error) {
      console.log(error);
      return alert("plz select writer");
    }
  };
  if (error) return <p>Error!</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Container
        sx={{
          bgcolor: "white",
          mb: 3,
          pl: 4,
          pt: 2,
          position: "relative",
          bottom: "80px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            judtifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="h5" align="center" mb={2}>
            Add Book
          </Typography>

          <select
            style={{ display: "flex", padding: 1 }}
            name="authorlist"
            value={athurId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              console.log(e.target.value);
              setAthurId(e.target.value);
            }}
          >
            {data?.getAuthors.map((athors, i: number) => {
              return (
                <>
                  <option key={i} value={athors._id}>
                    {athors.name}
                  </option>
                </>
              );
            })}
          </select>
          <TextField
            type="text"
            placeholder="write book"
            value={title}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => void setTitle(e.target.value)}
          />
          <Button variant="contained" onClick={addBook}>
            Add Book
          </Button>
          {/*  */}
          {getBooks?.getBooks.map((book, i: number) => {
            return (
              <Box sx={{ width: "100%" }}>
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h5" component="div" align="center">
                        <p style={{ fontSize: "15px" }}>Book:</p>
                        {book.title}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link to={`/add-book/${book.authorId}`}>
                        <Button sx={{ padding: 4 }} size="small">
                          See More to info of author
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </div>
              </Box>
            );
          })}
        </Box>
      </Container>
    </>
  );
};
export default Books;
