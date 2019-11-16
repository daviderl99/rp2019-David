import React from "react";
import "../../public/item.css";

class NotFound extends React.PureComponent{
  render(){
    return(
      <div className="error-404">
        Page not found
      </div>
    );
  }
}

export default NotFound;