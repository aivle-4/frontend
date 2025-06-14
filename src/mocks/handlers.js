import {http, HttpResponse} from 'msw'

export const handlers = [
  // 회원가입
  http.post('/api/members/new', async ({request}) => {
    const {loginId, password} = await request.json()

    if (!loginId || !password) {
      return HttpResponse.json({
        isSuccess: false,
        message: '아이디와 비밀번호를 입력해주세요.',
        result: null
      }, {status: 400})
    }

    return HttpResponse.json({
      isSuccess: true,
      message: '회원가입이 완료되었습니다.'
    })
  }),

  // 로그인
  http.post('/api/members/login', async ({request}) => {
    const {loginId, password} = await request.json()

    if (!loginId || !password) {
      return HttpResponse.json({
        isSuccess: false,
        message: '아이디와 비밀번호를 입력해주세요.',
        result: null
      }, {status: 400})
    }

    return HttpResponse.json({
      isSuccess: true,
      message: '성공입니다.',
      result: {
        memberId: 1,
        type: 'Bearer',
        accessToken: 'asc'
      }
    })
  }),

  // 책 목록 조회
  http.get('/api/books', ({request}) => {


    return HttpResponse.json({
      isSuccess: true,
      message: '성공입니다.',
      result: [
        {
          bookId: 1,
          title: '토지',
          author: '작가1',
          createdAt: '2025-05-29T10:15:30',
          coverImageUrl: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788975044946.jpg'
        },
        {
          bookId: 2,
          title: '백설공주',
          author: '작가2',
          createdAt: '2025-05-28T14:02:45',
          coverImageUrl: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788975044946.jpg'
        }
      ]
    })
  }),

  // 책 상세 조회
  http.get('/api/books/:bookId', ({params}) => {
    if (!params.bookId) {
      return HttpResponse.json({
        isSuccess: false,
        message: '책 ID가 필요합니다.',
        result: null
      }, {status: 400})
    }
    //
    // // 401 에러 리턴
    // return HttpResponse.json({
    //   isSuccess: false,
    //   message: '인증이 필요합니다.',
    //   result: null
    // }, {status: 401})

    return HttpResponse.json({
      isSuccess: true,
      message: '성공입니다.',
      result: {
        bookId: 1,
        author: '작가1',
        title: '책 제목 예시',
        content: '이 책의 본문 내용이 여기에 들어갑니다.…',
        createdAt: '2025-05-29T10:15:30',
        updatedAt: '2025-06-01T14:20:00',
        coverImageUrl: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788975044946.jpg'
      }
    })
  }),

  // 책 생성
  http.post('/api/books', async ({request}) => {
    const data = await request.json()

    if (!data.title || !data.content) {
      return HttpResponse.json({
        isSuccess: false,
        message: '제목과 내용을 입력해주세요.',
        result: null
      }, {status: 400})
    }

    return HttpResponse.json({
      isSuccess: true,
      message: '성공입니다.',
      result: {
        bookId: 1,
        authorId: 1,
        ...data,
        createdAt: '2025-05-29T10:15:30',
        updatedAt: '2025-06-01T14:20:00'
      }
    })
  }),

  // 책 수정
  http.put('/api/books/:bookId', async ({params, request}) => {
    if (!params.bookId) {
      return HttpResponse.json({
        isSuccess: false,
        message: '책 ID가 필요합니다.',
        result: null
      }, {status: 400})
    }

    const data = await request.json()
    if (!data.title || !data.content) {
      return HttpResponse.json({
        isSuccess: false,
        message: '제목과 내용을 입력해주세요.',
        result: null
      }, {status: 400})
    }

    return HttpResponse.json({
      isSuccess: true,
      message: '성공입니다.',
      result: {
        bookId: params.bookId,
        ...data,
        updatedAt: '2025-06-01T14:20:00'
      }
    })
  }),

  // 책 삭제
  http.delete('/api/books/:bookId', ({params}) => {
    if (!params.bookId) {
      return HttpResponse.json({
        isSuccess: false,
        message: '책 ID가 필요합니다.',
        result: null
      }, {status: 400})
    }

    return HttpResponse.json({
      isSuccess: true,
      message: '성공입니다.',
      result: null
    })
  }),

  // 표지 생성
  http.post('/api/books/cover', async ({request}) => {
    const {title, content} = await request.json()

    if (!title || !content) {
      return HttpResponse.json({
        isSuccess: false,
        message: '제목과 내용을 입력해주세요.',
        result: null
      }, {status: 400})
    }

    return HttpResponse.json({
      isSuccess: true,
      message: '성공입니다.',
      result: {
        coverImageUrl: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788975044946.jpg'
      }
    })
  }),

  // 키워드 검색
  http.get('/api/books/keyword', ({request}) => {
    const url = new URL(request.url)
    const keyword = url.searchParams.get('keyword')

    if (!keyword) {
      return HttpResponse.json({
        isSuccess: false,
        message: '검색어를 입력해주세요.',
        result: null
      }, {status: 400})
    }

    return HttpResponse.json({
      isSuccess: true,
      message: '성공입니다.',
      result: {
        title: '검색된 책 제목',
        bookId: 1,
        createdAt: '2025-05-29T10:15:30',
        coverImageUrl: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788975044946.jpg'
      }
    })
  })
] 