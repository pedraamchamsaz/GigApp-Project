// "use client";
// import { useEffect, useState } from "react";
// import LogoutButton from "../components/logoutButton";
// import GetStartedButton from "../components/ProfileButton";
// import Card from "../components/Card";

// const Dashboard = (props) => {
//   const [events, setEvents] = useState([]);
//   const [current, setCurrent] = useState(undefined);

//   // gets the events from the backend and updates the state in this file

//   const refreshList = () => {
//     props.client.getEvents().then((response) => {
//       setEvents(response.data);
//     }).catch((err) => {
//       console.log("failed to get API request (GET)")
//     });
//   };


//   useEffect(() => {
//     console.log("Update current")
//   }, [current])


//   useEffect(() => {
//     refreshList();
//     console.log(events);
//   }, []);

//   return (
//     <div>
//       <div className="fixed z-[1] right-4 top-4">
//         <LogoutButton setToken={props.setToken} />
//       </div>
//       <div className="fixed  right-28 top-4">
//         <GetStartedButton />
//       </div>

         
//       <SearchBar />
      
//       {/* <Card /> */}

//     </div>
//   );
// };

// export default Dashboard;
