import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {logout} from '../store/authSlice'
import {booksApi} from '../api/books'

import Button from '@mui/material/Button';

import {useEffect, useState} from 'react';


// const dummyBooks = [
//   {
//     id: 1,
//     title: '1984',
//     author: '조지 오웰',
//     category: '소설',
//     createdAt: '2023.1.15',
//     coverImageUrl: '../ni.png'
//   },
//   {
//     id: 2,
//     title: '사피엔스',
//     author: '유발 하라리',
//     category: '역사',
//     createdAt: '2023.1.15',
//     coverImageUrl: '../ni.png'
//   },
//   {
//     id: 3,
//     title: '미드나잇 라이브러리',
//     author: '매트 헤이그',
//     category: '소설',
//     createdAt: '2023.1.15',
//     coverImageUrl: '../ni.png'
//   },
//   {
//     id: 4,
//     title: '총, 균, 쇠',
//     author: '재레드 다이아몬드',
//     category: '역사',
//     createdAt: '2023.1.15',
//     coverImageUrl: '../ni.png'
//   },
//   {
//     id: 5,
//     title: '부자 아빠 가난한 아빠',
//     author: '로버트 기요사키',
//     category: '경제',
//     createdAt: '2023.1.15',
//     coverImageUrl: '../ni.png'
//   }
// ];


function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');


  const fetchBooks = async() => {
      try{
        const response = await booksApi.getBooks(title);
        setBooks(response.data.result);

      } catch(error){
          console.error('책 불러오기 실패 :', error);
      }
  };


  useEffect(() => {
      fetchBooks();
      }, []);


  // test
  // useEffect(() => {
  //   dummyBooks;
  //   setBooks(dummyBooks);
  // }, []);


  return (
    <div>
      <div style={{
        position: "relative",
        textAlign: "center",
        padding: "20px"
        }}><h1>내 책 목록</h1>

        <Button variant = "contained" style={{
          position: "absolute",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "10px"
        }} onClick={() => {
          dispatch(logout())
          navigate('/login')
        }}>로그아웃
        </Button>
      </div>


      <div style={{
        marginBottom: '20px',
        display: "flex"
        }}><input 
          type = "text"
          placeholder = "책 제목으로 검색..." 
          value = {title} 
          onChange = {(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter"){
              fetchBooks();
            }
          }}

          style={{
            padding: '8px',
            fontSize: '14px',
            width: '200px',
            marginRight: '10px'
          }}>
        </input>
        
        <Button variant = "contained" onClick={() => {
          navigate('/register')
          }}>책 추가
        </Button>
      </div>
      
      <div style={{
        display: "flex",
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {books.map((book) => (
          <div key={book.bookId} style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
            borderRadius: "10px"
          }}>

            {/* <img
              src={book.coverImageUrl}
              alt={`${book.title} 표지`}
            ></img> */}

            <strong><p style={{
              fontSize: "25px"
            }}>{book.title}</p></strong>
            
            <p style={{
              fontSize: "12px"
            }}>{book.author}</p>
            
            <p style={{
              fontSize: "5px"
            }}>{book.createdAt}</p>
          </div>
          ))
        }
      </div>

    </div>
  )
}

export default Home 