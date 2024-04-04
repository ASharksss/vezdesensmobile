import "../nothingYeat/nothingYeat.css"

const NothingYeat = ({message}) => {
    //////////////// 
    // message for text
    ////////////////
return (
<>
    <p className="flex center items-center h-400 nothing-p" >{message ? message : "Пока ничего нет"}</p>
</>
);
}
export default NothingYeat;