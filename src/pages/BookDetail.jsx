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
import emptyCover from "../assets/empty_cover.png";
import { booksApi } from "../api/books";
import Typography from "@mui/material/Typography";


const BookDetail = () => {
  const {id:bookId} = useParams();
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
        <Box sx={{ minHeight: '100vh', backgroundColor: '#fff', padding: 2 }}>
          <BookOverview book={bookDetail}></BookOverview>
          <BookContent book={bookDetail} />
        </Box>
      </Container>
    </React.Fragment>
  )
}

const BookDetailHeader = ({book}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ boxShadow: 1, bgcolor: '#fff', color: '#222', boderBottom:  '1px solid #eee'}} position="sticky">
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
      sx={{
        bgcolor: '#fff',         // 배경 흰색
        color: '#222', 
        fontWeight: 600,
        fontSize: '1rem',
        px: 1.5,
        py: 1,
        border: '1px solid #eee',
        borderRadius: 2,
        boxShadow: 3,  
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
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
      variant="outlined"
      color="inherit"
      size="large"
      sx = {{
        borderColor: '#1976d2',
        color: '#1976d2',
        '&:hover': {
          borderColor: '#115293',
          color: '#115293',
          backgroundColor: 'transparent'
        },
      }}
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
      const confirmed = window.confirm("정말로 이 책을 삭제하시겠습니까?");
      if (!confirmed) return;
      await booksApi.deleteBook(bookId);
      window.alert("삭제가 완료되었습니다.");
      navigate('/');
    } catch (error) {
      window.alert("책 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Button
      variant="outlined"
      color="inherit"
      size="large"
      sx={{
        color: '#d32f2f',         // 글자색 빨강
        borderColor: '#d32f2f',   // 테두리색 빨강
        ml: 1,
        '&:hover': {
          color: '#9a0007',
          borderColor: '#9a0007',
          backgroundColor: 'transparent'
        }
      }}
      onClick={handleDelete}
    >
      삭제
    </Button>
  );
}

const BookContent = ({book}) => {
  return (
    <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2, width: '100%' }}>
      <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
        책 내용
      </Typography>
      <Typography variant="body2">
          {book ? book.content : "책 로드 중..."}
      </Typography>
    </Box>
  );
}

const BookOverview = ({book}) => {
  return (
    !book ? <p>Loading...</p> :
    // Display book details
    <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2, width: '100%' }}>
      <Grid
        container
        spacing={2}
        sx={{ width: '100%', gap: 5 }} // gap 추가
      >
        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            component="img"
            src={book.coverImageUrl ? book.coverImageUrl : emptyCover}
            alt={book.title}
            sx={{ width: '100%', maxWidth: 300, borderRadius: 2, boxShadow: 2 }}

            onError={(e) => {
              e.target.onerror = null
              e.target.src = empytyCover;
            }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <h2>{book.title}</h2>
          <p>저자: {book.author}</p>
          <p>등록일: {book.createdAt}   최종 수정: {book.updatedAt}</p>
          <p>{book.description}</p>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BookDetail 