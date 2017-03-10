import React from 'react';

const Email = (props) => {
  return (
    <div className="form__email">
      <form>
        <input className="form__email--input" name="email" type="email" onChange={props._handleTyping} placeholder="Email"/><br/>
      </form>
    </div>
  );
}
export default Email;
