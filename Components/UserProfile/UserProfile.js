// import { useParams } from "react-router-dom"
// import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
// import { useEffect, useState } from "react";
// import { Axios } from "../../Axios";

// const UserProfile=()=>{
//     const {id}=useParams()
//     const [user,setUser]=useState()
//     useEffect(()=>{
//         Axios
//         .get('/account/${id}')
//         .then(r=>{
//             setUser(r.data.user)
//         })
//     })
//     return <div>
//         <h3>UserProfile</h3>
//         <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
//       {/* <input
//       type='file'
//       style={{display:'none'}}
//       ref={photoRef}
//       onChange={handleProfileUpload}/> */}

//       <MDBContainer className="py-5 h-100">
//         <MDBRow className="justify-content-center align-items-center h-100">
//           <MDBCol lg="9" xl="7">
//             <MDBCard>
//               <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
//                 <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
//                   {/* <MDBCardImage src={account.profilePicture} onClick={()=>photoRef.current.click()} */}
//                     {/* alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} /> */}
//                   <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
//                     Edit profile
//                   </MDBBtn>
//                 </div>
//                 <div className="ms-3" style={{ marginTop: '130px' }}>
//                   {/* <MDBTypography tag="h5">{account.name} {account.surname}</MDBTypography> */}
//                   <MDBCardText>New York</MDBCardText>
//                 </div>
//               </div>
//               <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
//                 <div className="d-flex justify-content-end text-center py-1">
//                   <div>
//                     {/* <MDBCardText className="mb-1 h5">{account.photos.length}</MDBCardText> */}
//                     <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
//                   </div>
//                   <div className="px-3">
//                     <MDBCardText className="mb-1 h5">1026</MDBCardText>
//                     <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
//                   </div>
//                   <div>
//                     <MDBCardText className="mb-1 h5">478</MDBCardText>
//                     <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
//                   </div>
//                 </div>
//               </div>
//               <MDBCardBody className="text-black p-4">
//                 <div className="mb-5">
//                   <p className="lead fw-normal mb-1">About</p>
//                   <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
//                     <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
//                     <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
//                     <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
//                   </div>
//                 </div>
//                 <div className="d-flex justify-content-between align-items-center mb-4">
//                   <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
//                   <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
//                 </div>
//                 <MDBRow>
//                   {/* <input type="file" ref={uploadRef}/>
//                   <input type='text'
//                   value={title}
//                   onChange={e=>setTitle(e.target.value)}/>
//                   <button onClick={handlePhotos} > upload</button>
//                      {account.photos.map((photo,index)=>(
//                       <div key={index} className="m-2">

//                         <img src={photo.src}  alt={`Uploaded ${photo.title}`}style={{maxWidth: '100px'}} />

//                          <p>Title: {photo.title}</p>
//                           <p>Likes: {photo.likes.length} </p>
//                       </div>
//                     ))} */}
//                 </MDBRow>
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//     </div>
//     </div>
// }
// export default UserProfile

import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Axios } from "../../Axios";
import { useOutletContext } from "react-router-dom";
import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";

const Account = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const { account } = useOutletContext();

  const handleFollow = () => {
    Axios.post("follow/" + user.id).then((response) => {
      switch (response.data.status) {
        case "requested":
          setUser({ ...user, requested: true });
          break;
        case "cancelled":
          setUser({ ...user, requested: false });
          break;
        case "following":
          setUser({ ...user, amIFollow: true });
          break;
        case "unfollowed":
          setUser({ ...user, amIFollow: false });
          break;
      }
    });
  };

  // const photoRef = useRef()
  // const postPhotoRef = useRef()
  useEffect(() => {
    Axios.get("account/" + id).then((r) => {
      setUser(r.data.user);
    });
  }, [id]);
  if (!user) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
        <input
          type="file"
          // ref={photoRef}
          style={{ display: "none" }}
        />
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">
              <MDBCard>
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#000", height: "200px" }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <MDBCardImage
                      src={user.profilePicture}
                      alt="Generic placeholder image"
                      className="mt-4 mb-2 img-thumbnail"
                      fluid
                      style={{ width: "150px", zIndex: "1" }}
                    />
                    <MDBBtn
                      outline
                      color="dark"
                      style={{ height: "36px", overflow: "visible" }}
                    >
                      Edit profile
                    </MDBBtn>
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <MDBTypography tag="h5">
                      {user.name} {user.surname}
                    </MDBTypography>
                    <MDBCardText>New York</MDBCardText>
                  </div>
                </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <MDBCardText className="mb-1 h5">
                        {user.photos.length}
                      </MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Photos
                      </MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">
                        {user.followers.length}
                      </MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Followers
                      </MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">
                        {user.following.length}
                      </MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Following
                      </MDBCardText>
                    </div>
                  </div>
                </div>
                <MDBCardBody className="text-black p-4">
                  <div className="mb-5">
                    {account.isPrivate && (
                      <strong>This is a private profile</strong>
                    )}
                    {user.requested ? (
                      <button className="btn btn-danger" onClick={handleFollow}>
                        Cancel
                      </button>
                    ) : user.amIFollow ? (
                      <button
                        className="btn btn-warning"
                        onClick={handleFollow}
                      >
                        unfollow
                      </button>
                    ) : user.followsMe ? (
                      <button className="btn btn-info" onClick={handleFollow}>
                        follow back
                      </button>
                    ) : (
                      <button
                        className="btn btn-success"
                        onClick={handleFollow}
                      >
                        Follow
                      </button>
                    )}
                    {/* <p className="lead fw-normal mb-1">About</p> */}
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      {/* <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText> */}
                      {/* <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText> */}
                      {/* <MDBCardText className="font-italic mb-0">Photographer</MDBCardText> */}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <MDBCardText className="lead fw-normal mb-0">
                      Recent photos
                    </MDBCardText>
                    <MDBCardText className="mb-0">
                      <a href="#!" className="text-muted">
                        Show all
                      </a>
                    </MDBCardText>
                  </div>
                  {user.photos.map((elm, i) => {
                    return (
                      <div key={i}>
                        <img
                          style={{ width: "300px", marginBottom: "20px" }}
                          src={elm.src}
                        />
                      </div>
                    );
                  })}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
};

export default Account;
