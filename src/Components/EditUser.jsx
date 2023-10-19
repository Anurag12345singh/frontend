import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditUser() {
    const [data, setData] = useState({
        uid: '',
        name: '',
        photo: '',
        email: '',
        address: '',
    });

    const [photoFile, setPhotoFile] = useState(null); // State to store the selected photo file

    const navigate = useNavigate();
    const { roleid } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:9090/api/admin/viewuser${roleid}`)
            .then((res) => {
                const roleData = res.data.Result[0];
                setData({
                    uid: roleData.uid,
                    name: roleData.name,
                    photo: roleData.photo,
                    email: roleData.email,
                    address: roleData.address,
                });
            })
            .catch((err) => console.error(err));
    }, [roleid]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhotoFile(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        //formData.append('uid', data.uid);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('address', data.address);

        if (photoFile) {
            formData.append('photo', photoFile);
        }

        axios.put(`http://localhost:9090/api/admin/updateuser/${roleid}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            if (res.data.status === 'success') {
                navigate('/EditRole');
            } else {
                console.error('Update failed');
            }
        })
        .catch((err) => console.error(err));
    };

    return (
        <div>
            <div className='d-flex flex-column align-items-center pt-4'>
                <h2>Edit role</h2>
                <form className="row g-3 w-50" onSubmit={handleSubmit}>
                    {/* <div className="col-12">
                        <label htmlFor="InputUid" className="form-label">
                            User id
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="InputUid"
                            placeholder="Enter uid"
                            autoComplete="off"
                            onChange={(e) =>
                                setData({ ...data, uid: e.target.value })
                            }
                            value={data.uid}
                        />
                    </div> */}
                    <div className="col-12">
                        <label htmlFor="InputName" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="InputName"
                            placeholder="Enter name"
                            autoComplete="off"
                            onChange={(e) =>
                                setData({ ...data, name: e.target.value })
                            }
                            value={data.name}
                        />
                    </div>
                   
                    <div className="col-12">
                        <label htmlFor="InputEmail" className="form-label">
                            Email
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="InputEmail"
                            placeholder="Enter email"
                            autoComplete="off"
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
                            value={data.email}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="InputPhoto" className="form-label">
                            Photo
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="InputPhoto"
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="InputAddress" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="InputAddress"
                            placeholder="Enter address"
                            autoComplete="off"
                            onChange={(e) =>
                                setData({ ...data, address: e.target.value })
                            }
                            value={data.address}
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditUser;

