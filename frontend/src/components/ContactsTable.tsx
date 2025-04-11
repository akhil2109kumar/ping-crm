import React, { useState, useMemo, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, TextField, Box, Typography, Button
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { fetchContactData, fetchData } from './hooks/useOrg';

type Contact = {
  name: string;
  organization: string;
  city: string;
  phone: string;
};



const ContactsTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data,setData] = useState<Contact[]>([]);


  const filteredContacts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return data.filter((contact) =>
      `${contact.name} ${contact.organization} ${contact.city} ${contact.phone}`
        .toLowerCase()
        .includes(query)
    );
  }, [searchQuery]);

  const paginatedContacts = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredContacts.slice(start, start + rowsPerPage);
  }, [filteredContacts, page, rowsPerPage]);

  useEffect(() => {
    if (page > 0 && page * rowsPerPage >= filteredContacts.length) {
      setPage(0);
    }
  }, [filteredContacts.length, page, rowsPerPage]);

 
  useEffect(() => {
    const getContacts = async () => {
      const res = await fetchContactData();
      console.log("qqq", res);
      setData(res.data);
    };
  
    getContacts();
  }, []);
  const totalPages = Math.ceil(filteredContacts.length / rowsPerPage);

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Contacts
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search contacts..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: '300px' }}
        />
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/contacts/create"
        >
          Create Contact
        </Button>
      </Box>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Organization</strong></TableCell>
                <TableCell><strong>City</strong></TableCell>
                <TableCell><strong>Phone</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedContacts.length > 0 ? (
                paginatedContacts.map((contact, index) => (
                  <TableRow key={`${contact.name}-${index}`}>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.organization}</TableCell>
                    <TableCell>{contact.city}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No contacts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>

                <Box>
                    <Button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        sx={{
                            border: "1px solid #99a1af",
                            padding: '5px'
                        }}
                    >
                        Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                            key={i}
                            variant={i + 1 === currentPage ? 'contained' : 'outlined'}
                            onClick={() => setCurrentPage(i + 1)}
                            sx={{ mx: 0.5 }}
                        >
                            {i + 1}
                        </Button>
                    ))}
                </Box>

                <Button
                sx={{
                    border: "1px solid #99a1af",
                    padding: '5px'
                }}
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                    Next
                </Button>
            </Box>
      </Paper>
    </Box>
  );
};

export default ContactsTable;


