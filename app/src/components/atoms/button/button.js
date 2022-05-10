import './button.css';

function Button(props) {
  return (
    <div className='button-container'>
      <p onClick={props.onClick}>{props.text}</p>
    </div>
  );
}

export default Button;
