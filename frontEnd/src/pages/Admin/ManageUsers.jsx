import React, { useEffect, useState } from "react";
import { FaSearch, FaUserPlus, FaTrashAlt } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { useAdmin } from "../../Context/AdminContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ManageUsers() {
  const { users, getUsers ,deleteUser , changeAccountStatus } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await getUsers();
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [getUsers]);

  const handeleDeleteUser = async(id) => {
    try {
        await deleteUser(id);
        toast.success('user is delete with success');
      } catch (error) {
        toast.error("deletion user failed: " + error);
      }
  }

  const handeleBloque = async(id) => {
    try {
      await changeAccountStatus(id);
      toast.success('user Account Status is change it with success');
    } catch (error) {
      toast.error(error);
    }
  }

  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      selectedRole === "" || user.roles[0]?.name === selectedRole;
    return matchesSearch && matchesRole;
  });

  const uniqueRoles = Array.from(
    new Set(users?.flatMap((user) => user.roles.map((role) => role.name)) || [])
  );

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Chargement des utilisateurs...</div>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-end items-center mb-6">
        <Link to="/admin/addUser" className="flex items-center gap-2 bg-teal text-white px-4 py-2 rounded-lg hover:bg-darkteal transition">
          <FaUserPlus />
          Ajouter
        </Link>
      </div>

      {/* Search and Role Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
          />
        </div>
        <div className="flex-1">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
          >
            <option value="">Tous les rôles</option>
            {uniqueRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-burgundy text-white">
            <tr>
              <th className="p-4 text-left">Nom</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Ville</th>
              <th className="p-4 text-left">Rôle</th>
              <th className="p-4 text-left">Account Status</th>
              <th className="p-4 text-center w-[160px]" colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.city}</td>
                  <td className="p-4">{user.roles[0]?.name || "-"}</td>
                  <td className="p-4 text-center">
                    <span className={`rounded-2xl px-2 ${
                      user.accountStatus === "bloque"
                        ? "bg-red-300" 
                        : "bg-green-300"
                    }`}
                  >{user.accountStatus}</span>
                  </td>
                  <td className="p-4 flex gap-4 items-center">
                    <button onClick={() => handeleBloque(user.id)}
                      className={`w-24 cursor-pointer ${
                        user.accountStatus === "bloque"
                          ? "text-red-600 hover:text-green-500"
                          : "text-green-600 hover:text-red-500" 
                      }`}
                    >
                      {user.accountStatus === "bloque" ? "Débloquer" : "Bloquer"}
                      
                    </button>
                  </td>
                  <td className="p-4">
                    <button onClick={() => handeleDeleteUser(user.id)} className="text-red-500 hover:text-red-700 transition">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-6 text-center text-gray-500" colSpan="5">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
