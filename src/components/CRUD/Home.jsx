import React, { useState } from "react";

const Home = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
  });
  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [eidtIndex, setEditIndex] = useState("");
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editClick) {
      const tempTableData = tableData;
      Object.assign(tempTableData[eidtIndex], input);
      setTableData([...tempTableData]);
      setEditClick(false);
      setInput({
        name: "",
        email: "",
      });
    } else {
      setTableData([...tableData, input]);
      setInput({
        name: "",
        email: "",
      });
    }
  };
  const handleDelete = (index) => {
    const filterdata = tableData.filter((item, i) => i !== index);
    setTableData(filterdata);
  };
  const handleEdit = (index) => {
    const tempData = tableData[index];
    setInput({
      name: tempData.name,
      email: tempData.email,
    });
    setEditClick(true);
    setEditIndex(index);
  };
  return (
    <div className="min-h-screen ">
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="bg-white max-w-fit m-auto p10">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={input.email}
              onChange={handleChange}
            />
          </div>
          <button type="submit">{editClick ? "Update" : "Add"}</button>
        </form>
      </div>
      <div>
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button onClick={() => handleEdit(i)}>Edit</button>
                  <button onClick={() => handleDelete(i)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
