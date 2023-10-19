import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditRole() {
    const [data, setData] = useState({
        roleid: '',
        rolename: '',

    });

    const navigate = useNavigate();
    const { roleid } = useParams();

    // For updating data
    useEffect(() => {
        axios
            .get('http://localhost:9090/api/admin/roles/view' + roleid)
            .then((res) => {
                setData({
                    ...data,
                    roleid: res.data.Result[0].subcategoryid,
                    rolename: res.data.Result[0].subcategoryname,

                });
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();


        axios.patch('http://localhost:9090/api/admin/roles/updaterole/:roleid' + roleid, data)
            .then((res) => {
                if (res.data.status === "success") {
                    navigate('/EditRole');
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <div className='d-flex flex-column align-items-center pt-4'>
                <h2>Edit role</h2>
                <form className="row g-3 w-50" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="Inputroleid" className="form-label">
                            Role id
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="Inputroleid"
                            placeholder="role id"
                            autoComplete="off"
                            onChange={(e) =>
                                setData({ ...data, roleid: e.target.value })
                            }
                            value={data.roleid}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="Inputrolename" className="form-label">
                            RoleName
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="Inputrolename"
                            placeholder="Enter rolename"
                            autoComplete="off"
                            onChange={(e) =>
                                setData({ ...data, rolename: e.target.value })
                            }
                            value={data.rolename}
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

export default EditRole;
