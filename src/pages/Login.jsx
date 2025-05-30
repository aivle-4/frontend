import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {authApi} from '../api/auth'
import {login} from '../store/authSlice'
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Box
} from '@mui/material'

function Login() {
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
    const response = await authApi.login({ loginId, password })
    
    if (response?.data?.isSuccess) {
      const memberId = response.data.result.memberId

      dispatch(login({
        token: memberId
      }))

      // token에 memberId 저장
      localStorage.setItem('token', memberId)

      navigate('/')
    }
  } catch (error) {
    console.error('로그인 실패:', error)
    alert('로그인에 실패했습니다.')
  }
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: 'center' }}>   
        <Typography variant="h5" mt={2}>내 책 리스트</Typography>
        <Typography color="textSecondary" mb={3}>다시 오신 것을 환영합니다</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="이메일"
            placeholder="example@email.com"
            margin="normal"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <TextField
            fullWidth
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            로그인
          </Button>
        </form>
        <Typography variant="body2" mt={2}>
          아직 계정이 없으신가요?{' '}
          <Link href="/register">회원가입</Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default Login 