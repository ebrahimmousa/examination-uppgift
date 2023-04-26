const express = require('express');
const app = express();
const axios = require('axios');



const apiClient = axios.create({
    baseURL: 'http://localhost:1337/api',
});



async function fetchData(resource) {
    const response = await apiClient.get(`http://127.0.0.1:1337/${resource}`);
    return response.data;
}



app.use(express.json());



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});



function setupRoutes(category) {
    app.get(`/${category}`, async (req, res) => {
        try {
            const data = await fetchData(`${category}`);
            res.json(data);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: `Error retrieving data from Strapi for ${category}` });
        }
    });



    app.get(`/${category}/:id`, async (req, res) => {
        try {
            const data = await fetchData(`${category}/${req.params.id}`);
            res.json(data);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: `Error retrieving ${category} data from Strapi` });
        }
    });



    app.post(`/${category}`, async (req, res) => {
        console.log(req.body);
        try {
            const response = await axios.post(`http://127.0.0.1:1337/${category}`, req.body);
            res.json(response.data);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: `Error creating new ${category}` });
        }
    });



    app.put(`/${category}/:id`, async (req, res) => {
        try {
            const response = await axios.put(`http://127.0.0.1:1337/${category}/${req.params.id}`, req.body);
            res.json(response.data);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: `Error updating ${category}` });
        }
    });



    app.delete(`/${category}/:id`, async (req, res) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:1337/${category}/${req.params.id}`);
            res.json(response.data);
        } catch (err) {
            res.status(500).json({ message: `Error deleting ${category}` });
        }
    });
}



setupRoutes('Audio_devices');
setupRoutes('Computers');
setupRoutes('Mobiles');
setupRoutes('Televisions');



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));