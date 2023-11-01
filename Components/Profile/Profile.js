import React, { useRef, useState } from "react";
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
import { useOutletContext } from "react-router-dom";
import { Axios } from "../../Axios";

export default function Profile() {
  const { account } = useOutletContext();
  const photoRef = useRef();
  const uploadRef = useRef();
  const [uploadedPhotos, setUploadedPhotos] = useState([
    {
      title: "In Paris",
      likes: 2500,
      image:
        "https://geektrippers.com/wp-content/uploads/2020/10/bridge-5456073_1280-1024x473.jpg",
    },
    {
      title: "Les deux comperes",
      likes: 15000,
      image:
        "https://compass-media.vogue.it/photos/63b30cba93719e1a142e224c/3:2/w_1044,h_696,c_limit/Il%20ristorante%20di%20Emily%20in%20Paris%20esiste%20davvero%20e%20propone%20cucina%20italiana%20e%20non%20francese.jpeg",
    },
  ]);

  const [title, setTitle] = useState("");
  const handlePhotos = () => {
    let form = new FormData();
    form.append("photo", uploadRef.current.files[0]);
    form.append("title", title);

    Axios.post("/uploadPhoto", form)
      .then((r) => {
        setUploadedPhotos([
          ...uploadedPhotos,
          { title, likes: 0, image: r.data.image },
        ]);
        setTitle("");
        console.log(r.data);
      })
      .catch((error) => {
        console.error("Upload error:", error);
      });
  };
  const handleProfileUpload = () => {
    console.log(photoRef.current.files[0]);
    let form = new FormData();
    form.append("profile", photoRef.current.files[0]);

    Axios.post("/uploadProfilePicture", form).then((r) => {
      console.log(r.data);
      // const newAccount={...account,profilePicture:r.data.photo}
      // useOutletContext.setAccount(newAccount)
    });
  };
  return (
    <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
      <input
        type="file"
        style={{ display: "none" }}
        ref={photoRef}
        onChange={handleProfileUpload}
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
                    src={account.profilePicture}
                    onClick={() => photoRef.current.click()}
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
                    {account.name} {account.surname}
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
                      {account.photos.length}
                    </MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Photos
                    </MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">1026</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Followers
                    </MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">478</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Following
                    </MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                    <MDBCardText className="font-italic mb-1">
                      Web Developer
                    </MDBCardText>
                    <MDBCardText className="font-italic mb-1">
                      Lives in New York
                    </MDBCardText>
                    <MDBCardText className="font-italic mb-0">
                      Photographer
                    </MDBCardText>
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
                <MDBRow>
                  <input type="file" ref={uploadRef} />
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <button onClick={handlePhotos}> upload</button>
                  {account.photos.map((photo, index) => (
                    <div key={index} className="m-2">
                      <img
                        src={photo.src}
                        alt={`Uploaded ${photo.title}`}
                        style={{ maxWidth: "100px" }}
                      />

                      <p>Title: {photo.title}</p>
                      <p>Likes: {photo.likes.length} </p>
                    </div>
                  ))}
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
