import React from "react";
import { NavLink } from "react-router-dom";
function Signup() {
  return (
    <div>
      <div className="row page-header">
        <div className="col-lg-12 " />
      </div>
      <div className="row" align="center">
        <div className="login col-md-6">
          <form
            className="center form-horizontal"
            id="login"
          >
            <div className="form-group">
              <label className="col-xs-10 col-sm-2 control-label">
                Ad Soyad:
              </label>
              <div className="col-xs-12 col-sm-10">
                <input
                  className="form-control"
                  name="username"
                  defaultValue="asy"
                />
              </div>
            </div>
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
                Kayıt Ol
              </button>
              <NavLink  to="/login" className="pull-right-href">Giriş Yap</NavLink>
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Signup;
