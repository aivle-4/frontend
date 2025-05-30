import {Box, Button, TextField, Typography} from '@mui/material'

function BookFormFields({formData, handleChange, handleGenerateCover, mode, onCancel, onSubmit}) {
  const {title, author, content, coverImageUrl} = formData
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
      <TextField
        label="책 제목"
        name="title"
        value={title}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="작가 이름"
        name="author"
        value={author}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="내용"
        name="content"
        value={content}
        onChange={handleChange}
        required
        multiline
        rows={4}
        fullWidth
      />
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          표지 이미지
        </Typography>
        {coverImageUrl ? (
          <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
            <img
              src={coverImageUrl}
              alt="책 표지"
              style={{maxWidth: '200px'}}
            />
            <Button
              variant="outlined"
              onClick={handleGenerateCover}
              sx={{alignSelf: 'flex-start'}}
            >
              표지 다시 생성
            </Button>
          </Box>
        ) : (
          <Button
            variant="outlined"
            onClick={handleGenerateCover}
          >
            표지 생성하기
          </Button>
        )}
      </Box>
      <Box sx={{display: 'flex', gap: 2, justifyContent: 'flex-end'}}>
        <Button variant="outlined" color="inherit" onClick={onCancel}>
          취소
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          {mode === 'create' ? '책 추가' : '수정하기'}
        </Button>
      </Box>
    </Box>
  )
}

export default BookFormFields 