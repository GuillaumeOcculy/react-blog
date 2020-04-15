import React from "react";

function UserDetail({ user }) {
  const { first_name, last_name } = user.attributes;
  return (
    <div>
      <h1>
        {first_name} {last_name}
      </h1>
    </div>
  );
}

export default UserDetail;
