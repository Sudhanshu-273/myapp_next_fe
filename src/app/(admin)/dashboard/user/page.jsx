"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Stack,
  Table,
  Button,
  Container,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import Iconify from "@/components/iconify";
import Scrollbar from "@/components/Scrollbar";
import toast from "react-hot-toast";
import TableNoData from "./components/table-no-data";
import TableEmptyRows from "./components/table-empty-rows";

export default function Page() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios
      .get("/api/user/list")
      .then((res) => {
        const formatted = res.data.data.map((user) => ({
          id: user.id,
          name: user.name || "-",
          email: user.email,
          phone: user.phone || "-",
          role: convertAccountType(user.account_type),
          isVerified: !!user.verified,
          status: user.account_status || "inactive",
        }));
        setUsers(formatted);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const convertAccountType = (type) => {
    switch (type) {
      case 1:
        return "admin";
      case 2:
        return "trainer";
      case 3:
        return "member";
      case 4:
        return "customer";
      default:
        return "unknown";
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterRole = (event) => {
    setFilterRole(event.target.value);
    setPage(0);
  };

  const handleFilterStatus = (event) => {
    setFilterStatus(event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setPage(0);
  };

  const handleToggleVerified = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isVerified: !user.isVerified } : user
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchRole = filterRole === "All" || user.role === filterRole;
    const matchStatus = filterStatus === "All" || user.status === filterStatus;
    const matchSearch = user.name.toLowerCase().includes(searchQuery);
    return matchRole && matchStatus && matchSearch;
  });

  const emptyRows = Math.max(
    0,
    (1 + page) * rowsPerPage - filteredUsers.length
  );
  const visibleRows = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleOpenDialog = (user) => {
    setSelectedUser({ ...user });
    setOpenDialog(true);
  };

  const handleDialogChange = (field, value) => {
    setSelectedUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleDialogSave = async () => {
    const payload = {
      id: selectedUser.id,
      verified: selectedUser.isVerified,
      account_status: selectedUser.status,
    };
    console.log(payload);
    try {
      await axios.patch("/api/user/edit", {
        id: selectedUser.id,
        account_status: selectedUser.status,
        verified: selectedUser.isVerified,
      });

      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                isVerified: selectedUser.isVerified,
                status: selectedUser.status,
              }
            : user
        )
      );
      setOpenDialog(false);
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mt={1}
        mb={4}
      >
        <Typography variant="h3">Users</Typography>
      </Stack>

      <Card>
        <Scrollbar>
          <Stack direction="row" spacing={2} mb={3} p={2}>
            <TextField
              label="Search by Name"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ width: 300 }}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>

          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>
                    <FormControl size="small" fullWidth>
                      <InputLabel>Role</InputLabel>
                      <Select
                        value={filterRole}
                        label="Role"
                        onChange={handleFilterRole}
                      >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="trainer">Trainer</MenuItem>
                        <MenuItem value="member">Member</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="customer">Customer</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Verified</TableCell>
                  <TableCell align="center">
                    <FormControl size="small" fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={filterStatus}
                        label="Status"
                        onChange={handleFilterStatus}
                      >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                        <MenuItem value="suspended">Suspended</MenuItem>
                        <MenuItem value="banned">Banned</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>{}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>

                    {/* Capitalized Role */}
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {row.role}
                    </TableCell>

                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>

                    {/* Verified Column with Green Checkbox */}
                    <TableCell>
                      <Tooltip
                        title={row.isVerified ? "Verified" : "Not Verified"}
                        arrow
                      >
                        <Checkbox
                          checked={row.isVerified}
                          onChange={() => handleToggleVerified(row.id)}
                          disabled
                          sx={{
                            color: row.isVerified ? "#2E7D32" : undefined,
                            "&.Mui-checked": {
                              color: "#2E7D32",
                            },
                          }}
                        />
                      </Tooltip>
                    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label={
                          row.status.charAt(0).toUpperCase() +
                          row.status.slice(1)
                        }
                        sx={{
                          backgroundColor:
                            row.status === "active"
                              ? "#C8E6C9" // light green
                              : row.status === "inactive"
                              ? "#FFCDD2" // light red
                              : row.status === "suspended"
                              ? "#FFE0B2" // light orange
                              : row.status === "banned"
                              ? "#E0E0E0" // light gray
                              : "#F5F5F5", // fallback

                          color:
                            row.status === "active"
                              ? "#2E7D32" // dark green
                              : row.status === "inactive"
                              ? "#C62828" // dark red
                              : row.status === "suspended"
                              ? "#EF6C00" // dark orange
                              : row.status === "banned"
                              ? "#424242" // dark gray
                              : "#212121", // fallback

                          fontWeight: 500,
                          textTransform: "capitalize",
                          px: 1,
                          py: 0.5,
                          fontSize: "0.875rem",
                          borderRadius: 1,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Tooltip title="Edit User" arrow>
                        <IconButton
                          onClick={() => handleOpenDialog(row)}
                          aria-label="edit"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableEmptyRows height={77} emptyRows={emptyRows} />
                )}
                {filteredUsers.length === 0 && (
                  <TableNoData query={`${filterRole} + ${filterStatus}`} />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Name"
              value={selectedUser?.name || ""}
              fullWidth
              disabled
            />
            <TextField
              label="Role"
              value={selectedUser?.role || ""}
              fullWidth
              disabled
            />
            <TextField
              label="Email"
              value={selectedUser?.email || ""}
              fullWidth
              disabled
            />
            <TextField
              label="Phone"
              value={selectedUser?.phone || ""}
              fullWidth
              disabled
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedUser?.status || ""}
                label="Status"
                onChange={(e) => handleDialogChange("status", e.target.value)}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
                <MenuItem value="banned">Banned</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ width: "50%" }}
              >
                <Checkbox
                  checked={selectedUser?.isVerified || false}
                  onChange={(e) =>
                    handleDialogChange("isVerified", e.target.checked)
                  }
                />
                <Typography>Verified</Typography>
              </Stack>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDialogSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
