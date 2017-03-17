import React from 'react';

const Name = (props) => {
  return (
    <div className="form__name">
      <input className="form__name--first" name="first" onChange={props._handleTyping} placeholder="First Name" required="true"/><br/>
      <input className="form__name--last" name="last" onChange={props._handleTyping} placeholder="Last Name" required="true"/><br/>
    </div>
  );
}
export default Name;
