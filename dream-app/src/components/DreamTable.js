import React from 'react';




export const DreamTable = ({ dreamData, removeDreamById }) => {
    return (
        <table className="table text-light table-borderless table-responsive-md btn-table">
            <thead>
                <tr>
                    <th><h3>Your Dream</h3></th>
                    <th><h3>Name</h3></th>
                    <th><h3 className="text-center">Actions</h3></th>
                </tr>
            </thead>
            <tbody>
                {dreamData.map((dreamBody) => (
                    <tr key={dreamBody.id} className="animated-row">
                        <td>{dreamBody.dream}</td>
                        <td>{dreamBody.name}</td>
                        <td className="d-flex justify-content-center">
                            <button onClick={() => removeDreamById(dreamBody.id)} className="btn btn-outline-primary btn-sm m-0 waves-effect">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )

};

