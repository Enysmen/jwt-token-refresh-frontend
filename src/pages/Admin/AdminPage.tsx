import React from 'react';



export function AdminPage() {
    return <>
        <h1>Admin Panel:</h1>
        <section>
            <div>
                <div>
                    <table> 
                        <tbody>
                            <tr>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                            <tr>
                               {/* add user rows here */}
                           
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </>
}