
export default function SignUp() {
   return (
      // <!-- Section: Design Block -->
      <section className="text-center">
         {/* <!-- Background image --> */}
         <div className="p-5 bg-image"></div>
         {/* <!-- Background image --> */}

         <div className="card mx-4 mx-md-5 shadow-5-strong">
            <div className="card-body py-5 px-md-5">
               <div className="row d-flex justify-content-center">
                  <div className="col-lg-8">
                     <h2 className="fw-bold mb-5">Sign up now</h2>
                     <form>
                        {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                        <div className="row">
                           <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                 <input
                                    type="text"
                                    id="form3Example1"
                                    className="form-control"
                                 />
                                 <label
                                    className="form-label"
                                    htmlFor="form3Example1"
                                 >
                                    First name
                                 </label>
                              </div>
                           </div>
                           <div className="col-md-6 mb-4">
                              <div className="form-outline">
                                 <input
                                    type="text"
                                    id="form3Example2"
                                    className="form-control"
                                 />
                                 <label
                                    className="form-label"
                                    htmlFor="form3Example2"
                                 >
                                    Last name
                                 </label>
                              </div>
                           </div>
                        </div>

                        {/* <!-- Email input --> */}
                        <div className="form-outline mb-4">
                           <input
                              type="email"
                              id="form3Example3"
                              className="form-control"
                           />
                           <label
                              className="form-label"
                              htmlFor="form3Example3"
                           >
                              Email address
                           </label>
                        </div>

                        {/* <!-- Password input --> */}
                        <div className="form-outline mb-4">
                           <input
                              type="password"
                              id="form3Example4"
                              className="form-control"
                           />
                           <label
                              className="form-label"
                              htmlFor="form3Example4"
                           >
                              Password
                           </label>
                        </div>

                        {/* <!-- Submit button --> */}
                        <button
                           type="submit"
                           className="btn btn-primary btn-block mb-4"
                        >
                           Sign up
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </section>
      //   <!-- Section: Design Block -->
   );
}
