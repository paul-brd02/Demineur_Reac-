import "../style/case.css"

export default function Case({ keyCase, value, isRevealed, hasMine, hasFlag, onClick, rightClick }) 
{
  const bombCSS = hasMine && isRevealed ? "bomb" : ""
  const flagCSS = hasFlag ? "flag" : ""
  const revealedCSS = isRevealed ? "revealed" : ""
  return (
    <button className={`case ${bombCSS} ${flagCSS} ${revealedCSS}`} onClick={onClick} onContextMenu={rightClick}>
      {isRevealed ? value : ''}      
    </button>
  );

}