import React from 'react';

const Phone = (props) => {
  return (
    <div className="form__phone">
      <input className="form__phone--input" name="phone" onChange={props._handleTyping} placeholder="Phone" required="true"/><br/>
    </div>
  );
}
export default Phone;
