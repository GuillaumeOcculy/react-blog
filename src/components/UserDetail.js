import React from "react";

function UserDetail({ user }) {
  const { username } = user.attributes;
  return (
    <div>
      <h1>{username}</h1>
    </div>
  );
}

export default UserDetail;
