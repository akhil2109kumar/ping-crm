import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
} from '@mui/material';
import axios from 'axios';

import { useEffect, useState } from 'react';

// Mock organizations data
const mockOrganizations = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Org ${i + 1}`,
    city: `City ${i + 1}`,
    phone: `123-456-78${i % 10}${i % 10}`,
}));

const ITEMS_PER_PAGE = 10;

type OrganizationForm = {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    country: string;
    postalCode: string;
};

const OrganizationsPage = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState<OrganizationForm[]>([]);
    

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const fetchData = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/organizations/");
            console.log("res",res);
            setData(res.data);  // Make sure res.data is the actual array of orgs
        } catch (error) {
            console.error("Error fetching organizations", error);
        }
    };
    useEffect(() => {
        
        fetchData();
    }, []);

    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setAnchorEl(null);
    };

    const filtered = data.filter(org =>
        org.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" fontWeight={600} sx={{ fontSize: "1.875rem", }}>Organizations</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Box display="flex" alignItems="center">
                    <Box display="flex" alignItems="center" justifyContent="center" gap={2} sx={{ minWidth: 102, height: 42, backgroundColor: "#fff", }} onClick={handleFilterClick}>
                        <span className="hidden text-gray-800 md:inline">Filter</span>
                        <svg style={{ height: 8, width: 8 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 961.243 599.998"><path d="M239.998 239.999L0 0h961.243L721.246 240c-131.999 132-240.28 240-240.624 239.999-.345-.001-108.625-108.001-240.624-240z"></path></svg>
                    </Box>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose}>
                        <MenuItem onClick={handleFilterClose}>All</MenuItem>
                        <MenuItem onClick={handleFilterClose}>Recently Added</MenuItem>
                    </Menu>

                    <TextField
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        sx={{
                            "& .MuiInputBase-root": {
                                backgroundColor: "#fff",
                                border: "none",
                                '& input': {
                                    padding: "0px 20px",
                                    border: "none",
                                    height: 42,
                                    minWidth: 296
                                },
                                '& fieldset': {
                                    borderColor: 'transparent !important',
                                    borderLeftColor: 'rgba(0, 0, 0, 0.23) !important'
                                }
                            }
                        }}
                    />

                    <Button onClick={() => setSearchQuery('')} sx={{ color: '#364153', fontSize: 14, textTransform: 'capitalize' }}>Reset</Button>
                </Box>

                <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ backgroundColor: "#5661b3", textTransform: "capitalize", height: 44, minWidth: 182 }}>
                    Create Organization
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>City</strong></TableCell>
                            <TableCell><strong>Phone</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginated.map(org => (
                            <TableRow key={org.id} hover>
                                <TableCell>{org.name}</TableCell>
                                <TableCell>{org.city}</TableCell>
                                <TableCell>{org.phone}</TableCell>
                            </TableRow>
                        ))}
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

            <CreateOrganizationModal open={isModalOpen} onClose={handleCloseModal} />
        </Box>
    );
};

const CreateOrganizationModal = ({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) => {
    const [form, setForm] = useState<OrganizationForm>({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        province: '',
        country: '',
        postalCode: '',
    });

    const handleChange = (field: keyof OrganizationForm, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/organizations/", form);
            console.log('Created:', res.data);
            onClose();
        } catch (error) {
            console.error('Error creating organization', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Create Organization</DialogTitle>
            <DialogContent>
                <Grid container spacing={3} mt={1}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Name" value={form.name} onChange={e => handleChange('name', e.target.value)} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Email" value={form.email} onChange={e => handleChange('email', e.target.value)} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Phone" value={form.phone} onChange={e => handleChange('phone', e.target.value)} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Address" value={form.address} onChange={e => handleChange('address', e.target.value)} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="City" value={form.city} onChange={e => handleChange('city', e.target.value)} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Province/State" value={form.province} onChange={e => handleChange('province', e.target.value)} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Country"
                            select
                            value={form.country}
                            onChange={e => handleChange('country', e.target.value)}
                        >
                            <MenuItem value="USA">USA</MenuItem>
                            <MenuItem value="Canada">Canada</MenuItem>
                            <MenuItem value="UK">UK</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Postal Code" value={form.postalCode} onChange={e => handleChange('postalCode', e.target.value)} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ pr: 3, pb: 2 }} bgcolor="#f5f5f5">
                <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: "#5661b3", textTransform: "capitalize", height: 44, minWidth: 182 }}>Create Organization</Button>
            </DialogActions>
        </Dialog>
    );
};

export default OrganizationsPage;
