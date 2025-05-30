import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api/auth'
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Box
} from '@mui/material'

function Register() {
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await authApi.register({ loginId, password })
      if (response?.data?.isSuccess) {
        alert('회원가입이 완료되었습니다!')
        navigate('/login')
      }
    } catch (error) {
      alert('회원가입에 실패했습니다.')
      console.error('회원가입 오류:', error)
    }
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: 'center' }}>      
        <Typography variant="h5" mt={2}>회원가입</Typography>
        <Typography color="textSecondary" mb={3}>내 책 리스트와 함께 시작하세요</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="아이디"
            placeholder="영문, 숫자 4-20자"
            margin="normal"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <TextField
            fullWidth
            label="비밀번호"
            type="password"
            placeholder="8자 이상의 비밀번호"
            helperText="영문, 숫자를 포함하여 8자 이상 입력해주세요"
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
            회원가입
          </Button>
        </form>
        <Typography variant="body2" mt={2}>
          이미 계정이 있으신가요?{' '}
          <Link href="/login">로그인</Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default Register
