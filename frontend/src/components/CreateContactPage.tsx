import {
    Box,
    Button,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

interface ContactFormValues {
    firstName: string;
    lastName: string;
    organization: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}

const countries = ['United States', 'Canada', 'India'];

const CreateContactPage = () => {
    const [formValues, setFormValues] = useState<ContactFormValues>({
        first_name: '',
        last_name: '',
        organization_id: 0,
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
    });

    const handleChange = (field: keyof ContactFormValues) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const res = await axios.post("http://127.0.0.1:8000/contacts/", formValues);
            console.log('Created:', res.data);
        } catch (error) {
            console.error('Error creating organization', error);
        }
    };

    const handleDelete = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/contacts/&{id}`);
            console.log('Created:', res.data);
        } catch (error) {
            console.error('Error creating organization', error);
        }
    };

    return (
        <Box p={4}>
            <Typography variant="h5" fontWeight={600} mb={3} fontSize="1.875rem">
                <span style={{ color: "#6574cd" }}>Contacts</span> / Create
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ backgroundColor: '#fff', borderRadius: 2, maxWidth: 792, width: "100%" }}
            >
                <Grid container spacing={3} p={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="First name"
                            value={formValues.firstName}
                            onChange={handleChange('firstName')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Last name"
                            value={formValues.lastName}
                            onChange={handleChange('lastName')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            select
                            fullWidth
                            label="Organization"
                            value={formValues.organization}
                            onChange={handleChange('organization')}
                        >
                            <MenuItem value="">Select organization</MenuItem>
                            <MenuItem value="1">Org 1</MenuItem>
                            <MenuItem value="2">Org 2</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={formValues.email}
                            onChange={handleChange('email')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Phone"
                            value={formValues.phone}
                            onChange={handleChange('phone')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Address"
                            value={formValues.address}
                            onChange={handleChange('address')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="City"
                            value={formValues.city}
                            onChange={handleChange('city')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Province/State"
                            value={formValues.state}
                            onChange={handleChange('state')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            select
                            fullWidth
                            label="Country"
                            value={formValues.country}
                            onChange={handleChange('country')}
                        >
                            {countries.map((c) => (
                                <MenuItem key={c} value={c}>
                                    {c}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Postal code"
                            value={formValues.postalCode}
                            onChange={handleChange('postalCode')}
                        />
                    </Grid>
                </Grid>

                <Box mt={3} p={3} display="flex" justifyContent="space-between" bgcolor="#f5f5f5">
                    <Button variant="text" onClick={handleDelete} color="primary" sx={{ backgroundColor: "#FFFFF", color: "#c10007", textTransform: "capitalize", height: 44, }}>
                        Delete Contact
                    </Button>
                    <Button variant="contained" type="submit" color="primary" sx={{ backgroundColor: "#5661b3", textTransform: "capitalize", height: 44, minWidth: 182 }}>
                        Create Contact
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CreateContactPage;
