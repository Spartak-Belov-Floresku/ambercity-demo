

const Rating = ({value, text, color}) => {

    let stars = [];

    const starsReview = (idx, arr) => {

      if(idx < 5){
        arr.push(
            <i key={idx} style={{ color }} className={
              value >= idx + 1
                ? 'fas fa-star'
                  : value >= idx + .5
                      ? 'fas fa-star-half-alt'
                      : 'far fa-star'
            }></i>
          );
        idx++;
        starsReview(idx, arr);
      }

      return;
      
    }

    starsReview(0, stars);

  return (
    <div className='rating'>
      <span>{stars}</span>
      <span>{text && text}</span>
    </div>
  )
}

export default Rating
