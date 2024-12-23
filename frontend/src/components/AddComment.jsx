import Header from "./Header";
import React from "react";
import { useParams,useLocation,useNavigate} from "react-router-dom";
import VenueDataService from "../services/VenueDataService";
import { useDispatch } from "react-redux"
function AddComment() {
  const { id } = useParams();
  //Bir önceki sayfadan gelen bilgisi almak için kullanılır.
  const location = useLocation();
  //Redux kullanımı
  const dispatch = useDispatch(); 
  //Sayfa yönlendirme işlemleri için kullanılır.
  const navigate = useNavigate();
  const onSubmit = (evt) => {
    evt.preventDefault();
    if(evt.target.elements.author.value && 
      evt.target.elements.text.value && 
      evt.target.elements.rating.value){
        let newComment = {
          author: evt.target.elements.author.value,
          text: evt.target.elements.text.value, 
          rating: evt.target.elements.rating.value
        }       
        VenueDataService.addComment(id, newComment).then(() => {
          dispatch({ type: "ADD_COMMENT_SUCCESS" });
          navigate(`/venue/${id}`);
        }).catch(() => {
          dispatch({ type: "ADD_COMMENT_FAILURE" });
        });
      }
  };
    return (
      <>
        <Header headerText={location.state.name} motto=" mekanına yorum yap" />
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <form
              className="form-horizontal"
              id="yorumEkle"
              onSubmit={(evt) => onSubmit(evt)}
            >
              <div className="form-group">
                <label className="col-sm-2 control-label">İsim:</label>
                <div className="col-sm-10">
                  <input type="text"
                    className="form-control"
                    id="author"
                    name="author"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-xs-10 col-sm-2 control-label">
                  Puan:
                </label>
                <div className="col-xs-12 col-sm-2">
                  <select
                    className="form-control input-sm"
                    id="rating"
                    name="rating"
                  >
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">Yorum:</label>
                <div className="col-sm-10">
                  <textarea
                    className="review form-control"
                    name="text"
                    rows={5}
                  />
                </div>
              </div>
              <button className="btn btn-default pull-right">Yorum Ekle</button>
            </form>
          </div>
        </div>
      </>
    );
}
export default AddComment;
