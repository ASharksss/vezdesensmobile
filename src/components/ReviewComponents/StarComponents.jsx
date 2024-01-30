import fullStarSVG from "../../asserts/icons/fullStar.svg";
import halfStarSVG from "../../asserts/icons/halfStar.svg";
import emptyStarSVG from "../../asserts/icons/emptyStar.svg";

const StarComponent = ({average, type, handleClick, width=26}) => {
  const fullStars = Math.floor(average);
  const halfStars = average - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStars ? 1 : 0);
  if (type === 'write') {
    return (
      <div style={{cursor: 'pointer'}} className='flex'>
        {[...Array(fullStars)].map((_, index) => (
          <img key={`full-${index}`} src={fullStarSVG} id={`full-${index}`}
               onClick={() => handleClick(index, 'full')} alt="Full Star" width={width} height={width}/>
        ))}
        {halfStars && <img src={halfStarSVG} alt="Half Star" width={width} height={width}/>}
        {[...Array(emptyStars)].map((_, index) => (
          <img key={`empty-${index}`} src={emptyStarSVG} id={`empty-${index}`}
               onClick={() => handleClick(index, 'empty')} alt="Empty Star" width={width} height={width}/>
        ))}
      </div>
    );
  }
  return (
    <div className='flex'>
      {[...Array(fullStars)].map((_, index) => (
        <img key={`full-${index}`} src={fullStarSVG} alt="Full Star" width={width} height={width}/>
      ))}
      {halfStars && <img src={halfStarSVG} alt="Half Star" width={width} height={width}/> }
      {[...Array(emptyStars)].map((_, index) => (
        <img key={`empty-${index}`} src={emptyStarSVG} alt="Empty Star" width={width} height={width}/>
      ))}
    </div>
  );
};

export default StarComponent;