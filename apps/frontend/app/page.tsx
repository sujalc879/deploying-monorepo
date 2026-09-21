"use client";

import { useEffect, useState } from "react";

type User = {
id: string;
[key: string]: unknown;
};

export default function Home() {
const [users, setUsers] = useState<User[]>([]);

useEffect(() => {
  let cancelled = false;

  fetch("/api/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      if (!cancelled) {
        setUsers(data.users ?? data);
      }
    })
    .catch((error) => {
      console.error("Failed to fetch users:", error);
    });

  return () => {
    cancelled = true;
  };
}, []);

return ( <div>
{users.map((val) => (
<div
key={val.id}
style={{
border: "solid white 2px",
margin: "5px 0px",
}}
>
{JSON.stringify(val)} </div>
))} </div>
);
}
