// // bootstrap form component
// // problems encountered so far: input tags had to close at the ends
// import { useState } from 'react';

// // formType is used to distinguish which form we are using, between login and register
// function Form({ formType}) {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formType === 'register') {
//       console.log('User registering:', firstName, lastName, email);
//     } else if (formType === 'login') {
//       console.log('User logging in:', email);
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       {formType === 'register' && (
//         <>
//           <div className="form-group">
//             <label htmlFor="firstName">First Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="inputFirstName"
//               placeholder="Enter first name"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="lastName">Last Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="inputLastName"
//               placeholder="Enter last name"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//             />
//           </div>
//         </>
//       )}
//       <div className="form-group">
//         <label htmlFor="exampleInputEmail1">Email address</label>
//         <input
//           type="email"
//           className="form-control"
//           id="exampleInputEmail1"
//           aria-describedby="emailHelp"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <small id="emailHelp" className="form-text text-muted">
//           We will never share your email with anyone else.
//         </small>
//       </div>
//       <div className="form-group">
//         <label htmlFor="exampleInputPassword1">Password</label>
//         <input
//           type="password"
//           className="form-control"
//           id="exampleInputPassword1"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <button type="submit" className="btn btn-primary">
//         {formType === 'register' ? 'Register' : 'Login'}
//       </button>
//     </form>
//   );
// }

// export default Form;
