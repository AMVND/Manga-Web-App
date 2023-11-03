import React from "react";
import AuthService from "../services/auth.service";
import klee from '../../assests/klee_icon.png';
export default function Profile() {
  const currentUser = AuthService.getCurrentUser();
  // console.log(currentUser);

  return (
    <div
      className="border-spacing-x-0.5 border-dashed border-2 border-red-600 flex justify-start md:justify-center ">
      <a href="/profile" className="w-36 md:w-48 justify-center lg:w-48">
        <img
          src={klee}
          alt="" />
      </a>
      <div className="p-6">
        <h5
          className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          <strong>{currentUser.username}</strong> Profile
        </h5>
        <div className="mb-2 text-base text-neutral-600 dark:text-neutral-200">
          <p>
            <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
            {currentUser.token.substr(currentUser.token.length - 20)}
          </p>
          <p>
            <strong>Id:</strong> {currentUser.id}  <img src={currentUser.img} alt="" />
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {currentUser.role &&
              currentUser.role.map((role, index) => <li key={index}>{role}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};
