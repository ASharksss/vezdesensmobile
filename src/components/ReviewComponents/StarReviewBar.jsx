import React from 'react';
import StarComponent from "./StarComponents";

const statusBar = {
  "--height": "25px",
  "--fill-color": "#B5B7BD",
  "--fill-color2": "black",
  "--size": "100%",
  height: "5px",
  width: "50%",
  color: 'transparent',
  backgroundColor: "#eaeaea",
  borderRadius: "calc(var(--height) / 2)",
  borderTopRightRadius: "0",
  borderBottomRightRadius: "0",
  margin: '10px 25px',
  backgroundImage:
    "linear-gradient(to right, var(--fill-color) calc(var(--size, 100%) - calc(var(--height, 25px) / 2)), transparent 1%)"
};

const StarReviewBar = ({average, data}) => {
  const statusBarFive = {
    ...statusBar,
    "--size": `${Math.floor(data.filter(item => item.grade === 5).length / (data.length / 100))}%`
  };
  const statusBarFour = {
    ...statusBar,
    "--size": `${Math.floor(data.filter(item => item.grade === 4).length / (data.length / 100))}%`
  };
  const statusBarThree = {
    ...statusBar,
    "--size": `${Math.floor(data.filter(item => item.grade === 3).length / (data.length / 100))}%`
  };
  const statusBarTwo = {
    ...statusBar,
    "--size": `${Math.floor(data.filter(item => item.grade === 2).length / (data.length / 100))}%`
  };
  const statusBarOne = {
    ...statusBar,
    "--size": `${Math.floor(data.filter(item => item.grade === 1).length / (data.length / 100))}%`
  };
  return (
    <div style={{display: 'flex', marginTop: '10px'}}>
      <StarComponent average={average} width={18}/>
      <span
        style={average === 1 ? statusBarOne : average === 2 ? statusBarTwo : average === 3 ? statusBarThree : average === 4 ? statusBarFour : statusBarFive}>5</span>
      <span style={{color: '#B5B7BD'}}>{data.filter(item => item.grade === 5).length}</span>
    </div>
  );
};

export default StarReviewBar;