
export function RateByStars ({rating,onSetRating}) {

     function handleSelect(rating){
        const newRating = {rating: rating}
        onSetRating(newRating)
        console.log('newRating', newRating)
     }
    
      return (
        <div>
          <label htmlFor="rating">Rating:</label>
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              selected={index < rating}
              onSelect={() => handleSelect(index + 1)}
            />
          ))}
        </div>
      );
}

function Star({ selected, onSelect }) {
    console.log('selected',selected)
    return (
      <span style={{ cursor: 'pointer' }} onClick={onSelect}>
        {selected ? '★' : '☆'}
      </span>
    )
  }