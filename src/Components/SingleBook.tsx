import React, { FC } from "react";
import { Container, Typography, Box, Avatar } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

const GET_WRITER = gql`
query GetAuthor($id: ID!) {
  getAuthor(_id: $id) {
    _id
    name
    books {
      title
    }
    createdAt
  }
}
`;
type GetAuthorType = {
  _id: string,
  name: string,
  books:[
    title: string | any
  ],
  createdAt:string
}
type GetWriterTypeResponse = {
  getAuthor: GetAuthorType
}


const SingleBook: FC = () => {
  const { id } = useParams();
  const { data, loading, error, refetch } = useQuery<
    GetWriterTypeResponse,
    {
      id: string | undefined;
    }
  >(GET_WRITER, {
    variables: {
      id: id,
    },
  });
  if (loading) return <p>loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <>
      <Container sx={{ bgcolor: "white", width: "30%" }}>
        <br />
        <Typography variant="h5" align="center">
          Book Info
        </Typography>
        <br />
        <Box
          sx={{
            backgroundColor: "background.paper",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            height: "60%",
            gap: "20px",
            // marginLeft: "250px",
          }}
        >
          <Typography align="center">
            Author :{data?.getAuthor.name}
          </Typography>
          <Typography align="center">
            Book : {data?.getAuthor.books.map((item)=>{return(<>{item.title}</>)})}
          </Typography>
          <Avatar
            sx={{ width: "300px", height: "300px" }}
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=628&q=80"
          />
          <Link to='/add-book'>back</Link>
          <br />
        </Box>
      </Container>
    </>
  );
};

export default SingleBook;
