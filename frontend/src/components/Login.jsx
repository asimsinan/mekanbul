import React from "react";
import { NavLink } from "react-router-dom";
function Login() {
  return (
    <div>
      <div className="row page-header">
        <div className="col-lg-12 " />
      </div>
      <div className="row" align="center">
        <div className="login col-md-6">
          <form className="center form-horizontal" id="login">
            <div className="form-group">
              <label className="col-xs-10 col-sm-2 control-label">
                E-Posta:
              </label>
              <div className="col-xs-12 col-sm-10">
                <input
                  className="form-control"
                  name="email"
                  defaultValue="asy"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-10 col-sm-2 control-label">Şifre:</label>
              <div className="col-xs-12 col-sm-10">
                <input
                  className="form-control"
                  name="password"
                  defaultValue="asy"
                />
              </div>
            </div>
            <div className="form-group">
              <button className="btn-login btn-default pull-right">
                Giriş Yap
              </button>
              <NavLink to="/signup" className="pull-right-href">
                Kayıt Ol
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
