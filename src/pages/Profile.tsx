
const Profile = () => {
  return (
    <div>Profile</div>
  )
}

export default Profile

// // pages/Profile.tsx
// import React, { useEffect, useState } from "react";
// import { useQuery } from "@apollo/client";
// import { GET_USER_PROFILE } from "../backend/QueryData";
// import Loader from "../components/Loader";
// import ErrorMessage from "../components/ErrorMessage";

// type UserProfile = {
//   id: string;
//   name: string;
//   email: string;
//   joinedAt: string;
// };

// const Profile: React.FC = () => {
//   const { data, loading, error, refetch } = useQuery<{ profile: UserProfile }>(GET_USER_PROFILE);

//   const [profile, setProfile] = useState<UserProfile | null>(null);

//   useEffect(() => {
//     if (data?.profile) {
//       setProfile(data.profile);
//     }
//   }, [data]);

//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   if (loading) return <Loader />;
//   if (error) return <ErrorMessage message={error.message} />;

//   if (!profile) return <p className="text-center text-gray-500 mt-10">Profile not found.</p>;

//   return (
//     <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h1>
//       <div className="space-y-4 text-gray-700">
//         <p><span className="font-semibold">Name:</span> {profile.name}</p>
//         <p><span className="font-semibold">Email:</span> {profile.email}</p>
//         <p><span className="font-semibold">Joined:</span> {new Date(profile.joinedAt).toLocaleDateString()}</p>
//       </div>
//     </div>
//   );
// };

// export default Profile;
