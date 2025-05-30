import { Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { booksApi } from '../api/books'
import BookFormFields from '../components/BookFormFields'
import ErrorContainer from '../components/ErrorContainer'

function BookForm({mode}) {
  const {id} = useParams()
  const navigate = useNavigate()
  const initialData = {
    title: '',
    author: '',
    content: '',
    coverImageUrl: ''
  }
  const [formData, setFormData] = useState({...initialData})
  const [error, setError] = useState(null)

  useEffect(() => {
    if (mode === "edit") fetchBookData()
  }, [mode, id])

  const fetchBookData = async () => {
    if (id) {
      try {
        const response = await booksApi.getBook(id)
        const {title, author, content, coverImageUrl} = response.data.result
        setFormData({title, author, content, coverImageUrl})
        setError(null)
      } catch (error) {
        setError('책 정보를 가져오는데 실패했습니다.')
        setFormData({...initialData})
      }
    } else {
      setFormData({...initialData})
      setError("유효하지 않는 책입니다")
    }
  }


  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleGenerateCover = async () => {
    const {title, author, content} = formData
    if (!title || !author) {
      alert('책 제목과 작가 이름을 먼저 입력해주세요.')
      return
    }

    try {
      const response = await booksApi.createCover({title, content})
      setFormData(prev => ({
        ...prev,
        coverImageUrl: response.data.result.coverImageUrl
      }))
    } catch (error) {
      const errorMessage = error.response?.data?.message || '표지 생성에 실패했습니다.'
      alert(errorMessage)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {title, author, content, coverImageUrl} = formData

    try {
      if (mode === 'create') {
        await booksApi.createBook({title, author, content, coverImageUrl})
        alert('책이 추가되었습니다.')
        navigate('/')
      } else {
        await booksApi.updateBook(id, {title, author, content, coverImageUrl})
        alert('책이 수정되었습니다.')
        navigate('/')
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || (mode === 'create' ? '책 추가에 실패했습니다.' : '책 수정에 실패했습니다.')
      alert(errorMessage)
    }
  }

  if (error) {
    return <ErrorContainer error={error} onRetry={mode === 'edit' ? fetchBookData : undefined}/>
  }

  return (
    <Container maxWidth="md" sx={{py: 4}}>
      <Typography variant="h4" component="h1" gutterBottom>
        {mode === 'create' ? '새 책 추가' : '책 수정'}
      </Typography>
      <BookFormFields
        formData={formData}
        handleChange={handleChange}
        handleGenerateCover={handleGenerateCover}
        mode={mode}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
      />
    </Container>
  )
}

export default BookForm