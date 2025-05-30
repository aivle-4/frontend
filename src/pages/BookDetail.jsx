import { useParams } from "react-router-dom";
import { booksApi } from "../api/books";
import { useEffect, useState } from "react";
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import empytyCover from '../assets/empty_cover.png';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';

const BookDetail = () => {
  const {bookId} = useParams();
  const [bookDetail, setBookDetail] = useState();

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await booksApi.getBook(bookId);
        console.log("Book detail response:", response);
        setBookDetail(response.data.result);
      } catch (error) {
        console.error("Failed to fetch book details:", error);
      }
    };
    fetchBookDetail();
  }, [bookId]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ height: '100vh', backgroundColor: '#cfe8fc', padding: 2 }}>
          <BookOverview book={bookDetail}></BookOverview>
        </Box>
      </Container>
    </React.Fragment>
  )
}


const BookOverview = ({book}) => {
  return (
    !book ? <p>Loading...</p> :
    // Display book details
    <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2, width: '100%' }}>
      <Grid container spacing={2} sx={{ width: '100%' }}>
        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            component="img"
            src={empytyCover}
            alt={book.title}
            sx={{ width: '100%', maxWidth: 300, borderRadius: 2, boxShadow: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <h2>{book.title}</h2>
          <p>저자: {book.author}</p>
          <p>등록일: {book.createdAt} 최종 수정: {book.updatedAt}</p>
          <p>{book.description}</p>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BookDetail 