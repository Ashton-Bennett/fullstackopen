import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const bodyStyle = {
  backgroundColor: "#00C2BA",
  color: "white",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontSize: "2rem",
};

const headerStyle = {
  fontSize: "4rem",
  fontWeight: "700",
  marginTop: "2em",
  marginBottom: "1em",
};

const Users = () => {
  const [users, setUsers] = useState();

  const usersInDb = async () => {
    const userinDB = (await axios.get("/api/users")).data;
    setUsers(userinDB);
  };

  useEffect(() => {
    usersInDb();
  }, []);

  return (
    <div style={bodyStyle}>
      <h1 style={headerStyle}>Users</h1>

      <TableContainer>
        <Table size="lg" variant="simple">
          <Thead>
            <Tr>
              <Th color="white" fontFamily="inherit">
                Name
              </Th>
              <Th color="white" fontFamily="inherit">
                Number of Blogs
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {users &&
              users.map((user) => (
                <Tr key={user.username}>
                  <Td
                    color="#9765E0"
                    _hover={{
                      color: "white",
                    }}
                  >
                    <Link state={user} to={`/users/${user.id}`}>
                      {user.username}
                    </Link>
                  </Td>
                  <Td isNumeric>{user.blogs.length}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
