import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditSubCategory() {
    const [data, setData] = useState({
        subcategoryid: '',
        subcategoryname: '',
        photo: '',
    });

    const navigate = useNavigate();
    const { subcategoryid } = useParams();

    // For updating data
    useEffect(() => {
        axios
            .get('http://localhost:9090/api/admin/subcategory/viewsubcat/' + subcategoryid)
            .then((res) => {
                setData({
                    ...data,
                    subcategoryid: res.data.Result[0].subcategoryid,
                    subcategoryname: res.data.Result[0].subcategoryname,
                    photo: res.data.Result[0].photo,
                });
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();


        axios.patch('http://localhost:9090/api/admin/subcategory/updatesubcat/' + subcategoryid, data)
            .then((res) => {
                if (res.data.status === "success") {
                    navigate('/subcategory');
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <div className='d-flex flex-column align-items-center pt-4'>
                <h2>Update Subcategory</h2>
                <form className="row g-3 w-50" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="InputPcategoryid" className="form-label">
                            Pcategory ID
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="InputPcategoryid"
                            placeholder="Enter Pcategory ID"
                            autoComplete="off"
                            onChange={(e) =>
                                setData({ ...data, Pcategoryid: e.target.value })
                            }
                            value={data.Pcategoryid}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="InputSubcategoryid" className="form-label">
                            Subcategory ID
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="InputSubcategoryid"
                            placeholder="Enter Subcategory ID"
                            autoComplete="off"
                            onChange={(e) =>
                                setData({ ...data, subcategoryid: e.target.value })
                            }
                            value={data.subcategoryid}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="InputSubcategoryname" className="form-label">
                            Subcategory Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="InputSubcategoryname"
                            placeholder="Enter Name"
                            autoComplete="off"
                            onChange={(e) =>
                                setData({ ...data, subcategoryname: e.target.value })
                            }
                            value={data.subcategoryname}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="InputPhoto" className="form-label">
                            Photo
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="InputPhoto"
                            placeholder="Enter Photo URL"
                            autoComplete="off"
                            onChange={(e) => setData({ ...data, photo: e.target.value })}
                            value={data.photo}
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

export default EditSubCategory;