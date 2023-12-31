import '../Form.css';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

function EduRegd() {

const Navigate=useNavigate();

const [userDetails,setUserDetails]=useState({
    "name": "",
    "email": "",
    "gender": "",
    "designation": "",
    "organisation": "",
    "mobileno": "",
    "password": "",
    "c_password": "",
    "dob": ""
})

const changeInputs=(e)=>
{
    
    setUserDetails((prev)=>
    {
        return{
            ...prev,[e.target.name]:e.target.value
        }
    })

    // console.log(userDetails);
}

const Submit=async(e)=>
{
    e.preventDefault();
    console.log(userDetails);

    try
    {
        const res=await fetch('/register/Edu',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })
        const response=await res.json();
        if(!res || res.status===400)
        {
            alert(response.error);
            // if(response.signedUp)
            // {
            //     Navigate('/login');
            // }
        }
     
        else
        {
            alert('Successfully Registered');
            console.log("userdata sent to server");
            Navigate('/educator/login');

        }
    }
    catch(err)
    {
        console.log(err);
    }
   

}



    return (
        <div className="container">
            <div className="title">Educator Registration</div>
            <form onSubmit={Submit}>
                <div className="user-details">
                    <div className="input-box">
                        <span className="details">Name</span>
                        <input type="text" placeholder="Enter Your Username" name='name'  required onChange={changeInputs} />
                    </div>
                    <div className="input-box">
                        <span className="details">Designation</span>
                        <input type="text" placeholder="Enter Your Designation" name='designation' required onChange={changeInputs}/>
                    </div>
                    <div className="input-box">
                        <span className="details">Organisation</span>
                        <input type="text" placeholder="Enter Your Organisation" name='organisation' required onChange={changeInputs}/>
                    </div>
                    <div className="input-box">
                        <span className="details">Email</span>
                        <input type="text" placeholder="Enter Your Email" name='email' required onChange={changeInputs}/>
                    </div>
                    <div className="input-box">
                        <span className="details">Date of Birth</span>
                        <input type="date" placeholder="Enter Your DOB" name='dob' required onChange={changeInputs}/>
                    </div>
                    <div className="input-box">
                        <span className="details">Phone Number</span>
                        <input type="phone" placeholder="Enter Your Number" name='mobileno' required onChange={changeInputs}/>
                    </div>
                    <div className="input-box">
                        <span className="details">Password</span>
                        <input type="password" placeholder="Enter Your Password" name='password' required onChange={changeInputs}/>
                    </div>
                    <div className="input-box">
                        <span className="details">Confirm Password</span>
                        <input type="password" placeholder="Confirm Your Password" name='c_password' required onChange={changeInputs}/>
                    </div>
                </div>
                <div className="gender-details">
                    <input type="radio" value="Male" name="gender" id="dot-1"  onChange={changeInputs} />
                    <input type="radio" value="Female"  name="gender" id="dot-2" onChange={changeInputs} />
                    <input type="radio" value="Other" name="gender" id="dot-3" onChange={changeInputs}/>
                    <span className="gender-titles">Gender</span>
                    <div className="category">
                        <label htmlFor="dot-1">
                            <span className="dot one" />
                            <span className="gender">Male</span>
                        </label>
                        <label htmlFor="dot-2">
                            <span className="dot two" />
                            <span className="gender">Female</span>
                        </label>
                        <label htmlFor="dot-3">
                            <span className="dot three" />
                            <span className="gender">Prefer not to say</span>
                        </label>
                    </div>
                </div>
                <div className="button">
                    <input type="Submit" defaultValue="Register" />
                </div>
            </form>
        </div>

    );
}

export { EduRegd };