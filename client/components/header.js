import Link from 'next/link';

const Header = ({ currentUser }) => {
   const links=[
      !currentUser && {label:'Sign In', href:'/auth/signin'},
      !currentUser && {label:'Sign Up', href:'/auth/signup'},
      currentUser && {label:'Sign Out', href:'/auth/signout'},
   ]. 
   filter(linkConfig=>linkConfig). 
   map(el=>{
      return (
         <li className='nav-item' key={el.href}>
            <Link className='nav-item'>
               {el.label }
            </Link>
         </li>
      )
   });

   return (
      <nav className="navbar navbar-light bg-light">
         <Link className="navbar-brand" href="/">
            Gimme ma Ticks
         </Link>
         <div className='d-flex justify-content-end'>
            <ul className='nav d-flex align-items-center'>
               {links}
            </ul>
         </div>
      </nav>
   )
}

export default Header;