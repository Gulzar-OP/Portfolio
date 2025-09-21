import React from 'react'
import '../styles/Home.css'
import Skills from './Skills'

export default function Home() {
  return (
    <>

      <div className='main-container'>
        <div className="heading">
          <h1>Welcome to My Portfolio</h1>
          <p>
            Hi, I’m Gulzar Hussain — a passionate web developer who loves building
            modern, responsive and user-friendly applications.
          </p>
          <p>
            I enjoy exploring new technologies, experimenting with ideas, and turning
            concepts into reality through clean and efficient code. Every project I
            create is a part of my learning journey and a step towards crafting better
            digital experiences.
          </p>
        </div>


        {/* Profile Image */}
        <div className="image">
          <img src="/Gulzar.png" alt="Gulzar pic" />


        </div>
      </div>
      <Skills />
    </>
  )
}
