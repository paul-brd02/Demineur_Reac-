import "../style/case.css"

import Unopened from '../cell/unopened.png'
import One from '../cell/one.png'
import Two from '../cell/two.png'
import Three from '../cell/three.png'
import Four from '../cell/four.png'
import Five from '../cell/five.png'
import Six from '../cell/six.png'
import Seven from '../cell/seven.png'
import Eight from '../cell/eight.png'
import Empty from '../cell/empty.png'
import Bomb from '../cell/redBomb.jpg'
import Flag from '../cell/flag.png'

export default function Case({ keyCase, value, isRevealed, hasMine, hasFlag, onClick, rightClick, size }) {

  let img = Unopened

  let maxSize = 800;

  if (value !== '' && isRevealed && !hasMine) {
    switch (value) {
      case '1':
        img = One
        break
      case '2':
        img = Two
        break
      case '3':
        img = Three
        break
      case '4':
        img = Four
        break
      case '5':
        img = Five
        break
      case '6':
        img = Six
        break
      case '7':
        img = Seven
        break
      case '8':
        img = Eight
        break
      default:
        img = Empty
        break
    }
  }
  else if (hasMine && isRevealed)
  {
    img = Bomb
  }
  else if (hasFlag) {
    img = Flag
  } 
  

    return (
      <img 
      className="case" 
      src={img} 
      alt="Case du jeu" 
      onClick={onClick} 
      onContextMenu={rightClick}
      style={{height: `${maxSize/size}px`, width: `${maxSize/size}px`}}
      />
    );

}