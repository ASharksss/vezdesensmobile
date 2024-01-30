import fullStarSVG from "../../asserts/icons/fullStar.svg";
import halfStarSVG from "../../asserts/icons/halfStar.svg";
import emptyStarSVG from "../../asserts/icons/emptyStar.svg";
import Auth from "../../pages/Auth";

const StarComponent = ({average, type, handleClick}) => {
  const fullStars = Math.floor(average);
  const halfStars = average - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStars ? 1 : 0);
  if (type === 'write') {
    return (
      <div style={{cursor: 'pointer'}}>
        {[...Array(fullStars)].map((_, index) => (
          <img key={`full-${index}`} src={fullStarSVG} id={`full-${index}`}
               onClick={() => handleClick(index, 'full')} alt="Full Star" width='26'/>
        ))}
        {halfStars && <img src={halfStarSVG} alt="Half Star" width='26'/>}
        {[...Array(emptyStars)].map((_, index) => (
          <img key={`empty-${index}`} src={emptyStarSVG} id={`empty-${index}`}
               onClick={() => handleClick(index, 'empty')} alt="Empty Star" width='26'/>
        ))}
      </div>
    );
  }
  return (
    <div>
      {[...Array(fullStars)].map((_, index) => (
        <img key={`full-${index}`} src={fullStarSVG} alt="Full Star" width='26'/>
      ))}
      {halfStars && <img src={halfStarSVG} alt="Half Star" width='26'/>}
      {[...Array(emptyStars)].map((_, index) => (
        <img key={`empty-${index}`} src={emptyStarSVG} alt="Empty Star" width='26'/>
      ))}
    </div>
  );
};

export default StarComponent;