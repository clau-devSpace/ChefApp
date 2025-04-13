 import logo from './deli.png'
 
 function Header(){
    return(
     <div className='header-container'>
       <div className='header'>
       <img src={logo} alt="logo chef"/>
       <h1>Your instant recipe!</h1>
       </div>
     </div> 
    
    )
}

export default Header;