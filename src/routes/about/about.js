import './about.scss'

const About = () => {
  return (
    <div className='about-container'>
      <div className='project-desc'>
        <span className='title'>About</span>
        <span className='desc'>
          Aria is a web application that allows users to join a virtual room with their friends, where they can collectively listen to music or watch YouTube videos. Incorporated chat communication to enhance social interaction within the virtual room. Created an engaging platform that provides a collaborative and interactive experience for users to enjoy music and video content together.
        </span>

      </div>
      <div className='socials'>
        <div className='container'>
          <span className='name'>Kevin Xie</span>
          <div className='link-container'>
            <img className='icon' src='https://cdn-icons-png.flaticon.com/512/733/733553.png' alt='Github'></img>
            <a href='https://github.com/kersv' className='icon-link' target='_blank'>Github</a>
          </div>
          <div className='link-container'>
            <img className='icon' src='https://cdn-icons-png.flaticon.com/512/3536/3536505.png' alt='Github'></img>
            <a href='https://www.linkedin.com/in/kersv-kevin-xie/' className='icon-link' target='_blank'>Linkedin</a>
          </div>
        </div>
        <div className='container'>
          <span className='name'>Michael Tse</span>
          <div className='link-container'>
            <img className='icon' src='https://cdn-icons-png.flaticon.com/512/733/733553.png' alt='Github'></img>
            <a href='https://github.com/MichaelTessey1' className='icon-link' target='_blank'>Github</a>
          </div>
          <div className='link-container'>
            <img className='icon' src='https://cdn-icons-png.flaticon.com/512/3536/3536505.png' alt='Github'></img>
            <a href='https://www.linkedin.com/in/michaeltse-tessey/' className='icon-link' target='_blank'>Linkedin</a>
          </div>
          
        </div>
        
        
        
      </div>
    </div>
    
  )
}
export default About