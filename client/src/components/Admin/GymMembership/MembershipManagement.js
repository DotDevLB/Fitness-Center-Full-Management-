import React, { useState, useEffect } from "react";
import axios from "axios";

const MembershipManagement = () => {
  const [memberships, setMemberships] = useState([]);
  const [selectedMembership, setSelectedMembership] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    phoneNumber: "",
    membershipStartDate: new Date().toISOString().slice(0, 10), 
    membershipEndDate: "",
  });

  const fetchMemberships = async () => {
    try {
      const response = await axios.get("/memberships");
      console.log(response.data); 
      setMemberships(response.data);
    } catch (error) {
      console.error("Error fetching memberships: ", error);
    }
  };
  

  const createMembership = async () => {
    try {
      const response = await axios.post(
        "/memberships/save",
        selectedMembership
      );
      setMemberships([...memberships, response.data]);
      setSelectedMembership({
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        phoneNumber: "",
        membershipStartDate: new Date().toISOString().slice(0, 10),
        membershipEndDate: "",
      });
    } catch (error) {
      console.error("Error creating membership: ", error);
    }
  };

  useEffect(() => {
    fetchMemberships();
    console.log(memberships);
  }, []);

  const [membershipsWithThreeDaysLeft, setMembershipsWithThreeDaysLeft] = useState([]);

  useEffect(() => {
    // Filter memberships that have 3 days or less remaining
    const filteredMemberships = memberships.filter((membership) => {
      const daysDifference = getDaysDifference(new Date(), new Date(membership.membershipEndDate));
      return daysDifference <= 3 && daysDifference >= 0; // Memberships with 3 days or less remaining
    });
    
    setMembershipsWithThreeDaysLeft(filteredMemberships);
  }, [memberships]);

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const editMembership = (id) => {
    const membershipToEdit = memberships.find(
      (membership) => membership.id === id
    );
    if (membershipToEdit) {
      setSelectedMembership({ ...membershipToEdit });
      setIsEditing(true);
      setEditId(id);
    }
  };
  const updateMembership = async () => {
    try {
      const response = await axios.put(
        `/memberships/update/${editId}`,
        selectedMembership
      );
      const updatedMemberships = memberships.map((membership) =>
        membership.id === editId ? response.data : membership
      );
      setMemberships(
        updatedMemberships.filter((membership) => membership.id !== editId)
      ); 
      setIsEditing(false);
      setEditId(null);
      setSelectedMembership({
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        phoneNumber: "",
        membershipStartDate: new Date().toISOString().slice(0, 10),
        membershipEndDate: "",
      });
    } catch (error) {
      console.error("Error updating membership: ", error);
    }
  };
  const deleteMembership = async (id) => {
    try {
      await axios.delete(`/memberships/delete/${id}`);
      setMemberships(memberships.filter((membership) => membership.id !== id));
    } catch (error) {
      console.error("Error deleting membership: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedMembership({ ...selectedMembership, [name]: value });
  };

  const handleMembershipSelection = (months) => {
    const startDate = new Date(selectedMembership.membershipStartDate);
    startDate.setMonth(startDate.getMonth() + months);
    setSelectedMembership({
      ...selectedMembership,
      membershipEndDate: startDate.toISOString().slice(0, 10),
    });
  };


  const sendEmailToMemberships = async () => {
    try {
      for (const membership of membershipsWithThreeDaysLeft) {
        const formData = new FormData();
        formData.append('file', '');
        formData.append('to', membershipsWithThreeDaysLeft.email); // Send email to each member's email
        formData.append('cc', '');
        formData.append('subject', 'Payment Reminder');
        formData.append('body', `Dear ${membership.firstName},\n\nThis is a reminder that your membership will expire in 3 days. Please ensure that your payment is up-to-date to avoid any service interruptions.\n\nThank you.`);
    
  
        await axios.post('http://localhost:8080/mail/send', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log(`Email sent to ${membership.email} successfully!`);
      }
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  };
  

  const getDaysDifference = (dateA, dateB) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((dateA - dateB) / oneDay));
  };

  const getMembershipStatusClass = (endDate) => {
    const daysDifference = getDaysDifference(new Date(), new Date(endDate));
    if (daysDifference <= 3) {
      return "text-warning";
    } else if (daysDifference < 0) {
      return "text-danger";
    }
    return "";
  };
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const handleEmailSubjectChange = (e) => {
    setEmailSubject(e.target.value);
  };

  const handleEmailBodyChange = (e) => {
    setEmailBody(e.target.value);
  };
  const sendEmailToAllMemberships = async () => {
    try {
      for (const membership of memberships) {
        const formData = new FormData();
        formData.append('file', '');
        formData.append('to', membership.email);
        formData.append('cc', '');
        formData.append('subject', emailSubject); // Use the subject from the state
        formData.append('body', emailBody); // Use the body from the state

        await axios.post('http://localhost:8080/mail/send', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log(`Email sent to ${membership.email} successfully!`);
      }
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Membership Management</h1>
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={selectedMembership.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={selectedMembership.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                id="dob"
                name="dob"
                value={selectedMembership.dob}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={selectedMembership.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={selectedMembership.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label>Select Membership Duration:</label>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleMembershipSelection(1)}
                >
                  1 Month
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleMembershipSelection(3)}
                >
                  3 Months
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleMembershipSelection(6)}
                >
                  6 Months
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleMembershipSelection(12)}
                >
                  12 Months
                </button>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={createMembership}
            >
              Create Membership
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h2>Memberships List</h2>
          <ul className="list-group">
            {memberships.map((membership) => (
              <li
                className={`list-group-item d-flex justify-content-between align-items-center ${getMembershipStatusClass(
                  membership.membershipEndDate
                )}`}
                key={membership.id}
              >
                <div>
                  {membership.firstName} {membership.lastName}
                </div>
                <div>
                  End Date: {membership.membershipEndDate}
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => deleteMembership(membership.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => editMembership(membership.id)}
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-primary"
              onClick={sendEmailToMemberships} 
            >
              Send Payment Reminder
            </button>
          </div>
        </div>
        <div className="col-md-6">
        <h2>Compose Email</h2>
        <div className="mb-3">
          <label htmlFor="emailSubject" className="form-label">
            Email Subject
          </label>
          <input
            type="text"
            className="form-control"
            id="emailSubject"
            value={emailSubject}
            onChange={handleEmailSubjectChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailBody" className="form-label">
            Email Body
          </label>
          <textarea
            className="form-control"
            id="emailBody"
            rows="4"
            value={emailBody}
            onChange={handleEmailBodyChange}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={sendEmailToAllMemberships}
        >
          Send Email to All Users
        </button>
      </div>
      </div>
    </div>
  );
};

export default MembershipManagement;
