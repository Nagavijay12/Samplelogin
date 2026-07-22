"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [fullnameerror,setFullnameerror]=useState("");

const [email, setEmail] = useState("");
const [emailerror,setEmailerror]=useState("");

const [phone, setPhone] = useState("");
const [phoneerror,setPhoneerror]=useState("");

const [password, setPassword] = useState("");
const [passworderror,setPassworderror]=useState("");

const [showPasswordRules, setShowPasswordRules] = useState(false);

const [confirmPassword, setConfirmPassword] = useState("");
const [confirmpassworderror,setConfirmpassworderror]=useState("");


const [terms, setTerms] = useState(false);

const router = useRouter();

const fullnameblur=()=>{
  if(fullName===""){
      setFullnameerror("Please enter your fullname");
  }
  else{
    setFullnameerror("");
  }
}

const emailblur=()=>{
  if(email===""){
    setEmailerror("Please enter your email")
  }
  else{
    setEmailerror("")
  }
}

const phoneblur=()=>{
   if(phone===""){
    setPhoneerror("Please enter your phone number")
   }
   else{
    if(phone.length<10){
      setPhoneerror("Please enter valid phone number")
    }
    else{
      setPhoneerror("")
    }
   }
}

const passwordblur=()=>{
   if(password===""){
      setPassworderror("please enter your password")
   }
   else{
       setPassworderror("");
   }
}

const confirmpasswordblur=()=>{
     if(confirmPassword===""){
        setConfirmpassworderror("please enter your confirmpassword")
     }
     else{
        setConfirmpassworderror("");
     }
}

const passwordValidation = {
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /[0-9]/.test(password),
  special: /[@$!%*?&]/.test(password),
};
const passwordValid =
  passwordValidation.length &&
  passwordValidation.uppercase &&
  passwordValidation.lowercase &&
  passwordValidation.number &&
  passwordValidation.special;




const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if(fullName===""){
      alert("Please Enter your fullname")
      return;
    }
    if(email===""){
       alert("Please Enter your email")
       return;
    }
    if(phone===""){
          alert("Please Enter your phone number")
       return;
    }
    if(password===""){
          alert("Please Enter your password")
       return;
    }
    if(confirmPassword===""){
          alert("Please confirm your password")
       return;
    }

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  alert("Please enter a valid email address.");
  return;
}   

  
if (!phone || !isValidPhoneNumber(phone)) {
alert("Enter a valid 10-digit phone number.");
  return;
}




const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
if (!passwordRegex.test(password)) {
  alert(
    "Password must contain:\n" +
    "• 8 characters\n" +
    "• Uppercase\n" +
    "• Lowercase\n" +
    "• Number\n" +
    "• Special Character"
  );

  return;
}
   if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
}

    if (!terms) {
        alert("Please accept Terms & Conditions");
        return;
    }

  // Create user in Supabase Authentication
const { data, error } = await supabase.auth.signUp({
  email,
  password,
});



if (error) {
  alert(error.message);
  return;
}
 // 2. Store extra details in profiles table
  const { error: profileError } = await supabase
  .from("profiles")
  .insert({
    id: data.user?.id,
    full_name: fullName,
    phone: phone,
  });



if (profileError) {
  alert(profileError.message);
  return;
}


alert("Account Created Successfully");

    router.push("/login");
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-700">
            Create Account 🎉
          </h1>

          <p className="mt-2 text-gray-500">
            Create your account to continue
          </p>
        </div>

         <form onSubmit={handleSignup} className="space-y-5"  autoComplete="off">

          {/* Full Name */}
          <div>
            <label className="block mb-2 font-bold text-blue-700" htmlFor="fullname">
              Full Name
            </label>

           <input
  type="text"
  name="fullName"
  id="fullName"
  placeholder="Enter your full name"
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
  onBlur={fullnameblur}
   autoComplete="off"
  className="
    w-full
    rounded-xl
    border-2 border-blue-200
    px-4 py-3
    text-gray-900
    text-lg
    font-normal
    placeholder:text-gray-400
    placeholder:text-sm
    caret-blue-700
    shadow-sm
    transition-all
    duration-300
    focus:border-blue-600
    focus:ring-4
    focus:ring-blue-200
    focus:outline-none
  "
/>
<p className="text-red-600 font-bold">
  {fullnameerror}
</p>
          </div>

          {/* Email */}
          <div>
         

           <label
  htmlFor="email"
  className="block mb-2 text-lg font-semibold text-blue-700"
>
  Email Address
</label>

<input
  type="email"
  name="email"
  id="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  onBlur={emailblur}
autoComplete="new-email"
  className="
    w-full
    rounded-xl
    border-2 border-blue-200
    px-4 py-3
    text-gray-900
    text-base
    font-medium
    placeholder:text-gray-400
    placeholder:text-base
    caret-blue-700
    shadow-sm
    transition-all
    duration-300
    focus:border-blue-600
    focus:ring-4
    focus:ring-blue-200
    focus:outline-none
  "
/>
<p className="text-red-600 font-bold">
  {emailerror}
</p>
          </div>

          {/* Phone */}
          <div>
           <label
  htmlFor="phone"
  className="block mb-2 text-lg font-semibold text-green-700"
>
  Phone Number
</label>

    
    <PhoneInput
  international
  defaultCountry="IN"
  value={phone}
  onChange={(value) => setPhone(value || "")}
  onBlur={phoneblur}
  placeholder="Enter your phone number"
  id="phone"

  
  className="
    w-full
    rounded-xl
    border-2 border-green-200
     text-gray-900
    text-base
    font-medium
    placeholder:text-gray-400
    placeholder:text-base
    caret-blue-700
    px-4 py-3
    shadow-sm
    transition-all
    duration-300
    focus-within:border-green-600
    focus-within:ring-4
    focus-within:ring-green-200
  "
/>
<p className="text-red-600 font-bold">
  {phoneerror}
</p>

          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-bold text-purple-700">
              Password
            </label>

            <div className="relative">
             <input
  type={showPassword ? "text" : "password"}
  placeholder="Create password"
  value={password}
  onBlur={passwordblur}
  autoComplete="new-password"
  onChange={(e) => {
  const value = e.target.value;

  setPassword(value);

  if (value.length > 0) {
    setShowPasswordRules(true);
  } else {
    setShowPasswordRules(false);
  }
}}
  
  className="
    w-full
    rounded-xl
    border-2
    border-green-200
    px-4
    py-3
    text-gray-900
    text-base
    font-medium
    placeholder:text-gray-400
    placeholder:text-base
    caret-green-700
    shadow-sm
    transition-all
    duration-300
    focus:border-green-600
    focus:ring-4
    focus:ring-green-200
    focus:outline-none
  "
/>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-blue-600 font-semibold"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              <p className="text-red-600 font-bold">
                 {passworderror}
              </p>
              {showPasswordRules && !passwordValid && (
  <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 animate-fade-in">

    <p className="mb-3 text-sm font-semibold text-gray-800">
      Password must contain
    </p>

    <ul className="space-y-2">

      <li
        className={`flex items-center gap-2 text-sm ${
          passwordValidation.length
            ? "text-green-600"
            : "text-gray-500"
        }`}
      >
        <span>
          {passwordValidation.length ? "✅" : "⭕"}
        </span>
        At least 8 characters
      </li>

      <li
        className={`flex items-center gap-2 text-sm ${
          passwordValidation.uppercase
            ? "text-green-600"
            : "text-gray-500"
        }`}
      >
        <span>
          {passwordValidation.uppercase ? "✅" : "⭕"}
        </span>
        One uppercase letter
      </li>

      <li
        className={`flex items-center gap-2 text-sm ${
          passwordValidation.lowercase
            ? "text-green-600"
            : "text-gray-500"
        }`}
      >
        <span>
          {passwordValidation.lowercase ? "✅" : "⭕"}
        </span>
        One lowercase letter
      </li>

      <li
        className={`flex items-center gap-2 text-sm ${
          passwordValidation.number
            ? "text-green-600"
            : "text-gray-500"
        }`}
      >
        <span>
          {passwordValidation.number ? "✅" : "⭕"}
        </span>
        One number
      </li>

      <li
        className={`flex items-center gap-2 text-sm ${
          passwordValidation.special
            ? "text-green-600"
            : "text-gray-500"
        }`}
      >
        <span>
          {passwordValidation.special ? "✅" : "⭕"}
        </span>
        One special character
      </li>

    </ul>
  </div>
)}
            </div>
         </div>



          {/* Confirm Password */}
          <div>
            <label className="block mb-2 font-bold text-pink-700">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                autoComplete="new-password"
                value={confirmPassword}
                onBlur={confirmpasswordblur}
onChange={(e)=>setConfirmPassword(e.target.value)}
                className="
    w-full
    rounded-xl
    border-2 border-green-200
    px-4 py-3
    text-gray-900
    text-base
    font-medium
    placeholder:text-gray-400
    placeholder:text-base
    caret-green-700
    shadow-sm
    transition-all
    duration-300
    focus:border-green-600
    focus:ring-4
    focus:ring-green-200
    focus:outline-none
  "
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-3 text-blue-600 font-semibold"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
               <p className="text-red-600 font-bold">
                 {confirmpassworderror}
              </p>
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-center gap-2 text-gray-700">
           <input type="checkbox"checked={terms} onChange={(e)=>setTerms(e.target.checked)}/>
            I agree to the Terms & Conditions
          </label>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-lg font-bold text-white hover:from-purple-600 hover:to-pink-600 transition"
          >
            Create Account
          </button>

          {/* Login */}
          <p className="text-center text-gray-700">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-blue-700 hover:text-purple-700"
            >
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}