const { useParams, useNavigate } = ReactRouter

import { ReviewList} from '../cmps/ReviewList.jsx'

export function AddReview() {
  const params = useParams()
  console.log('params add', params.bookId)
  

      return <ReviewList bookId={params.bookId}/>

}