import React from "react";
import './CommonTable.css';

const CommonTable=props=>{
    const {headersName,children}=props;
    return(
        <table className="common-table">
            <thead>
                <tr>
                    {
                        headersName.map((item,index)=>{
                            return(
                                <td className="common-table-header-column"
                                key={index}>
                                    {item}
                                </td>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {/* {children} */}
                    <td>{children.id}</td>
                    <td>{children.title}</td>
                    <td>{children}</td>
                    <td>{children}</td>
            </tbody>
        </table>
    )
}

export default CommonTable;