import {  UserButton } from "@clerk/nextjs";

// Corrected the function declaration by replacing the emoji with a closing parenthesis
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Hellow World!</h2>
      <UserButton/>
    </div>
  );
}
