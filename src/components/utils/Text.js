import React from "react";

function Text(props) {
  return (
    <React.Fragment>
      {props.text.split("\n").map((item, key) => {
        return (
          <React.Fragment key={key}>
            {item}
            <br />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}

export default Text;
