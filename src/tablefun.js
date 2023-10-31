import axios from "axios";
import React, { useEffect, useState } from "react";

const Debounce = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [editedItem, setEditedItem] = useState(null);
  const [editedItemData, setEditedItemData] = useState(null); // Store the edited item's data
  const [serialNumber, setSerialNumber] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://fakestoreapi.com/products");
        setData(res.data);
      } catch (error) {
        console.error("Error");
      }
    };

    fetchData();

    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // Reduce the debounce delay for quicker feedback

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleEdit = (index) => {
    setEditedItem(index);
    setEditedItemData(data[index]); // Store the original data for editing
  };

  const handleSaveEdit = () => {
    if (editedItemData) {
      // Update the item in the data array
      const newData = data.map((item, i) =>
        i === editedItem ? editedItemData : item
      );
      setData(newData);
      setEditedItem(null); // Clear the edited item
      setEditedItemData(null); // Clear the edited item's data
    }
  };

  const handleEditInputChange = (e) => {
    if (editedItemData) {
      // Update the edited item's data in real-time
      setEditedItemData({ ...editedItemData, title: e.target.value });
    }
  };
   const resetSerialNumbers = () => {
     serialNumber = 1; // Reset the serial number
   };
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );
  const handleDelete = (index) => {
    // Filter the data by excluding the item at the specified index
    const updatedData = filteredData.filter((item, i) => i !== index);
    setData(updatedData); // Update the data state with the filtered data
  };
  return (
    <div>
      {/* ... (your navigation code remains the same) ... */}
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>
                  {editedItem === i ? (
                    <input
                      type="text"
                      value={editedItemData ? editedItemData.title : ""}
                      onChange={handleEditInputChange}
                    />
                  ) : item.title.length > 15 ? (
                    `${item.title.slice(0, 15)}...`
                  ) : (
                    item.title
                  )}
                </td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  {editedItem === i ? (
                    <button
                      className="btn btn-success"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning m-2"
                        onClick={() => handleEdit(i)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(i)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Debounce;
