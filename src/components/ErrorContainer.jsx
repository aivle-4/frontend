import { useNavigate } from 'react-router-dom'

function ErrorContainer({ error, onRetry }) {
  const navigate = useNavigate()

  return (
    <div>
      <h1>오류가 발생했습니다</h1>
      <p>{error}</p>
      <div>
        <button onClick={() => navigate('/')}>홈으로 가기</button>
        {onRetry && <button onClick={onRetry}>다시 시도</button>}
      </div>
    </div>
  )
}

export default ErrorContainer 