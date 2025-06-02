// REACT
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react';

// API settings
import {logout} from '../store/authSlice'
import {booksApi} from '../api/books'

// MUI
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import emptyCover from '../assets/empty_cover.png'

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');


  // state settings
  const fetchBooks = async(searchTitle = '') => {
      try{
        const response = await booksApi.getBooks(searchTitle);
        let results = response.data.result;

        if(searchTitle.trim() !== ''){
          results = results.filter(book =>
            book.title.includes(searchTitle.trim())
          );
        }

        setBooks(results);
      } catch(error){
          console.error('책 불러오기 실패 :', error);
      }
  };


  useEffect(() => {
      fetchBooks();
      }, []);


  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "60px",
          backgroundColor: "#007BFF",
          position: "relative",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: "20px"
        }}
      ><Button
          variant="outlined"
          style={{
            fontSize: "12px",
            borderColor: "white",
            color: "white"
          }}

          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
        >로그아웃 ⤷
        </Button>
      </div>

      <div style={{
        textAlign: "center", 
        padding: "20px" 
        }}><h1>내 책 목록</h1>
      </div>

      <div style={{
        marginBottom: "30px",
        display: "flex",
        width: "100%"
        }}><input 
          type = "text"
          placeholder = "책 제목으로 검색..." 
          value = {title} 
          onChange = {(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter"){
              console.log(e.target.value);
              e.preventDefault();
              fetchBooks(title);
            }
          }}

          style={{
            borderRadius: "6px",
            flex: 4,
            padding: "8px",
            fontSize: "14px",
            marginRight: "10px"
          }}>
        </input>
        
        <Button variant = "contained" onClick={() => {
          navigate('/write')
          }}>책 추가
        </Button>
      </div>
      
      <div style={{
        flex: 1,
        display: "flex",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        
        {books.map((book) => (
          <Card key = {book.bookId} sx={{ maxWidth: 350 }}>
            <CardActionArea
            onClick={() => {
              navigate(`/${book.bookId}`)
            }}>
              <CardMedia
                component = "img"
                height = "140"
                image = {book.coverImageUrl}
                alt = {book.title}

                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = emptyCover
                }}
              />
              <CardContent>
                <Typography gutterBottom variant = "h5" component = "div">
                  <strong>{book.title}</strong>
                </Typography>

                <Typography variant = "subtitle2" sx = {{ color: 'text.secondary' }}>
                  <p></p>
                  {book.author}
                </Typography>

                <Typography variant = "body2" sx = {{ color: 'text.secondary' }} fontSize = "10px">
                  {book.createdAt.split('T')[0].replaceAll('-', '.')}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          ))
        }
      </div>
    </div>
  )
}

export default Home