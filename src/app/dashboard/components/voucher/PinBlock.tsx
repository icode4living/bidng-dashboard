"use client"
import { useCallback, useEffect, useMemo, useState } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, Button, TextField, MenuItem, Select, FormControl, InputLabel, Grid, Typography, Input } from "@mui/material";
import { gql } from "@apollo/client";
import { useDebounce } from "use-debounce";
import graphqlHelper from "@/utils/graphqlClient";
import axios from "axios";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import OtpRequest from "./OtpRequest";


export interface User {
  name?: string;
  id: string;
  email?: string;
  phone?: string;
}

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      name
      email
      id
      phone
    }
  }
`;
const voucherTypes = ["ticket", "order"];

const AdminVoucher = () => {
  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(false);
 // const [selectedUser, setSelectedUser] = useState("");
  const [voucherType, setVoucherType] = useState("");
 // const [vouchers, setVouchers] = useState([]);
 const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  //const [message, setMessage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [users, setUsers] = useState<User[]>([]);
  const [sending, setSending] = useState<boolean>(false);
  const [value, setValue] =  useState<string>();
  const [expiresAt, setExpiresAt] = useState<string>()
  const validateOtp = () => {
    setSending(true)
    axios.post('/api/validate-otp',{
        otp:otp
    }).then((resp)=>{
        if(!resp)setIsOtpValid(false)
            setIsOtpValid(true)
        setSending(false)

    }).catch((err)=>{
        alert("Invalid request!");
        setSending(false)
        console.log(err.message)
    })
   
  };
  async function getUsers() {
    try {
      const { getUsers } = await graphqlHelper.executeQuery(GET_USERS);
      setUsers(getUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);
  const requestOtp = async () =>{
    axios.get('/api/get-otp').then((resp:any)=>{
      if(!resp) alert(resp.message)
    }).catch((err:any)=>{
  console.log(err)
    })
  }
  const handleSubmit = async () => {
    
    setSending(true);
    axios.post('/api/create-voucher',{
        userId:selectedUserId,
        expiresAt,
        appliesTo:voucherType,
        value:parseFloat(value!)
    }).then((resp)=>{
      alert(resp.message)
      setSending(false)
    }).catch((err)=>{
      console.log(err)

    })
  };
 const filteredUsers = useMemo(() => {
    if (!debouncedSearchQuery) return [];
    const query = debouncedSearchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.phone?.toLowerCase().includes(query)
    );
  }, [users, debouncedSearchQuery]);
 const handleUserSelection = useCallback((userId: string) => {
  //  if (broadcast) return; // Prevent selection if broadcast mode is on
    setSelectedUserId((prev) => (prev === userId ? null : userId));
  }, []);
  return (
    <Container>
      <Typography variant="h5" gutterBottom>Admin Voucher Management</Typography>

      {!isOtpValid ? (
        <>
<div className="w-[400px]">
<div className="flex flex-col items-center">
<OtpRequest onResend={requestOtp}/>

<TextField 
  label="Enter OTP" 
  type="password"
  value={otp} 
  onChange={(e) => setOtp(e.target.value)} 
  onKeyDown={(e) => e.preventDefault()} // Prevents physical keyboard input
  fullWidth 
/>

          </div>
          <Grid container spacing={1} style={{ marginTop: 10 }}>
            {[1,2,3,4,5,6,7,8,9,0].map((num) => (
              <Grid item xs={4} key={num}>
                <Button fullWidth variant="contained" onClick={() => setOtp(otp + num)}>{num}</Button>
              </Grid>
            ))}
          </Grid>
          <Button variant="contained" onClick={() => setOtp(otp.slice(0, -1))} fullWidth style={{ marginTop: 10, backgroundColor:'red' }}>Delete</Button>

          <Button variant="contained" onClick={validateOtp} fullWidth style={{ marginTop: 10 }}>{sending ? "Please wait ..." :"Validate OTP"}</Button>
        </div>
        </>
      ) : (
        <>
     
     <div className="p-6 bg-white rounded-lg shadow-md">

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
<>
{debouncedSearchQuery && (
        <div className="mb-6 max-h-96 overflow-y-auto">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 border-b">
                <div>
                  <p className="font-semibold">{user.name || "No Name"}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-600">{user.phone}</p>
                </div>
                <input
                  type="radio"
                  checked={selectedUserId === user.id}
                  onChange={() => handleUserSelection(user.id)}
                  className="form-radio h-5 w-5 text-blue-600"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No users found.</p>
          )}
        </div>
)}
</>
        
          <FormControl fullWidth style={{ marginTop: 10 }}>
            <InputLabel>Voucher Type</InputLabel>
            <Select value={voucherType} onChange={(e) => setVoucherType(e.target.value)}>
              {voucherTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="mt-4">
          <FormControl fullWidth style={{ marginTop: 10 }}>
            <label>Voucher Type</label>
            <input
  value={value}
  onChange={(e) => {
    let inputValue = e.target.value.replace(/[^0-9.]/g, ""); // Remove non-numeric characters

    if (inputValue === "") {
      setValue(""); // Allow clearing input
      return;
    }

    const parsedValue = parseFloat(inputValue);
    if (!isNaN(parsedValue)) {
      setValue(parsedValue);
    }
  }}
  onKeyDown={(e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault(); // Block invalid keys
    }
  }}
  type="text"
  inputMode="decimal"
  className="w-full border border-gray-300 rounded-lg mt-2 px-4 py-2 text-sm"
  placeholder="value"
/>
          </FormControl>
          </div>
          <div className="mt-4">
      <DatePickerOne label="Start Date" value={expiresAt} onChange={setExpiresAt} />

      </div>
          <Button variant="contained" onClick={handleSubmit} fullWidth style={{ marginTop: 10 }}>{sending?"Please wait...":"Generate Voucher"}</Button>
        </div>
        </>
        
      )};
        </Container>
      )}

      export default AdminVoucher;