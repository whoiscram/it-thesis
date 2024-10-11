import React from "react";

export default ({ user }) => {
  const userDetails = (
    <div>
      <div className="UserName">Name: {user ? user.firstName : null}</div>
      <div className="UserId">Id: {user ? user.userID : null}</div>
    </div>
  );
  return <div className="UserDetails">{user ? userDetails : null}</div>;
};
