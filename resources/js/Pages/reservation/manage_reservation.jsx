import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const DesignerAdminForm = ({ auth }) => {
  const [reservations, setReservations] = useState([]);
  const { id: userId } = auth.user;

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(`/api/reservation/${userId}`);
      setReservations(response.data.reservations);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const handleAccept = async (id) => {
    try {
      // Send PUT request to update reservation
      await axios.put(`/api/reservation/${id}`);

      // Update UI by marking the reservation as accepted
      fetchReservations();
    } catch (error) {
      console.error('Error accepting reservation:', error);
      // Optionally, you can display an error message to the user
      alert('Failed to accept reservation. Please try again later.');
    }
  };


  const handleReject = async (id) => {
    try {
      await axios.delete(`/api/delete/${id}`);
      // Update UI by removing the rejected reservation
      const updatedReservations = reservations.filter(reservation => reservation.id !== id);
      setReservations(updatedReservations);
    } catch (error) {
      console.error('Error rejecting reservation:', error);
    }
  };

  return (
    <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
>
    <div className="container mx-auto p-4">
  <h2 className="text-2xl font-semibold mb-4">Designer Admin Form</h2>
  <table className="table-auto w-full">
    <thead>
      <tr className="bg-gray-200">
        <th className="px-4 py-2">Username</th>
        <th className="px-4 py-2">Status</th>
        <th className="px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {reservations.map((reservation) => (
        <tr key={reservation.id} className="border-b ">
          <td className="px-4 py-2">{reservation.username}</td>
          <td className="px-4 py-2">{reservation.generate_ticket ? <span className="text-green-500">Accepted</span> : <span className="text-yellow-500">Pending</span>}</td>
          <td className="px-4 py-2">
            {!reservation.generate_ticket && (
              <div className="flex items-center">
                <button onClick={() => handleAccept(reservation.id)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2 transition duration-300 ease-in-out">Accept</button>
                <button onClick={() => handleReject(reservation.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out">Reject</button>
              </div>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</AuthenticatedLayout>


  );
};

export default DesignerAdminForm;
