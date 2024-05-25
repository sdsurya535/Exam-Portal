import authService from "../../services/auth";

const Profile = () => {

  const users = authService.getUser();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-1">
            <div className="mb-6">
              <img className="me-auto ms-auto h-64" src="/images/man.png" alt="" />
            </div>
            <h1 className="text-center mb-7">{users.firstname} {users.lastname}</h1>
            <table className="table text-center table-striped">
              <tbody>
                <tr>
                  <td>User Name</td>
                  <td><span className="text-green-700 font-bold text-lg uppercase">{users.username}</span></td>
                </tr>
                <tr>
                  <td>User ID</td>
                  <td><span className="inline-flex rounded-sm bg-slate-200 px-2  font-semibold leading-5 text-md text-red-600">
                      EXAM{users.id}
                    </span></td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td><span className="inline-flex rounded-md bg-yellow-100 px-2  font-semibold leading-5 text-md text-yellow-600">
                      {users.phone}
                    </span></td>
                </tr>
                <tr>
                  <td>ROLE</td>
                  <td><span className="inline-flex rounded-md bg-sky-100 px-2  font-semibold leading-5 text-sm text-sky-600">
                      {authService.getUserRole()}
                    </span></td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>
                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                      {users.enabled && "ACTIVE"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
