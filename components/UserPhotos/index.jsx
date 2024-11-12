import React, { useState, useEffect } from "react";
import { Typography, Paper } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserPhotos({ userId }) {
  const [userPhotos, setUserPhotos] = useState([]);

  useEffect(() => {
    fetchModel(`/photosOfUser/${userId}`)
      .then(result => setUserPhotos(result.data))
      .catch(error => console.error("Error:", error));
  }, [userId]);

  return (
    <div className="photosContainer">
      <Typography variant="h4" className="photosHeader">Photos</Typography>
      <div className="gridList">
        {userPhotos.map((item) => (
          <Paper key={item._id} elevation={3} className="photo">
            <img
              src={`images/${item.file_name}`}
              alt={item.date_time}
              loading="lazy"
              className="images"
            />
            <div className="info">
              <Typography variant="subtitle1">{item.date_time}</Typography>
              <div className="commentsContainer">
                {item.comments ? (
                  item.comments.map((comment, index) => (
                    <Typography key={index} variant="body2" className="comment">
                      <strong>{comment.user.first_name}: </strong>
                      {comment.comment}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2" className="comment">
                    N/A
                  </Typography>
                )}
              </div>
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
}

export default UserPhotos;
