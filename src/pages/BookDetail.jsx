import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import empytyCover from "../assets/empty_cover.png";
import { booksApi } from "../api/books";
import Typography from "@mui/material/Typography";


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
        <BookDetailHeader book={bookDetail} />
        <Box sx={{ minHeight: '100vh', backgroundColor: '#cfe8fc', padding: 2 }}>
          <BookOverview book={bookDetail}></BookOverview>
        </Box>
      </Container>
    </React.Fragment>
  )
}

const BookDetailHeader = ({book}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="primary" sx={{ boxShadow: 1 }} position="sticky">
        <Toolbar sx={{ position: "relative" }}>
          <GoBackButton />
          <Typography
            variant="h6"
            component="div"
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              margin: "0 auto",
              textAlign: "center",
              width: "fit-content",
              pointerEvents: "none",
            }}
          >
            {!book ? "hello" : book.title}
          </Typography>
          <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
            {!book ? "" : <EditButton bookId={book.bookId} />}
            {!book ? "" : <DeleteButton bookId={book.bookId} />}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      startIcon={<ArrowBackIcon />}
      size="large"
      edge="start"
      aria-label="go back"
      sx={{ mr: 10 }}
      onClick={() => navigate('/')}
    >
      목록으로 돌아가기
    </Button>
  );
};

const EditButton = ({bookId}) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      onClick={() => navigate(`/${bookId}/edit`)}
    >
      수정
    </Button>
  );
}

const DeleteButton = ({bookId}) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await booksApi.deleteBook(bookId);
      navigate('/');
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      size="large"
      onClick={handleDelete}
    >
      삭제
    </Button>
  );
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