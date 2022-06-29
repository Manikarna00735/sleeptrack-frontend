import React from 'react';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';


function Introduction() {
  return (
    <div >
    <div className='sleeptrack'>
      <div>
      <h1 >INTRODUCTION</h1>
      <p id='para'>Irregular sleeping patterns are a common problem. 
        This web app will fulfill the user's needs in tracking their sleeping patterns, 
        including duration and timings. single person in the world sleeps, 
        but why or what exactly makes us sleep? This is a very good question because everyone does it without actually thinking about it. 
        Knowing or even trying to understand how one sleeps can be a very interesting topic to dissect. 
        </p>
        </div>
        <LoginPage /><br/>
        <SignupPage/>
    </div>
    </div>
  );
}

export default Introduction;
