// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());

// // Routes
// const adminStanRoutes = require('./routes/adminStanRoutes');
// const siswaRoutes = require('./routes/siswaRoutes');

// app.use('/api/admin-stan', adminStanRoutes);
// app.use('/api/siswa', siswaRoutes);

// // Start Server
// app.listen(PORT, () => {
//     console.log(`Server of Kantin run on port ${PORT}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const siswaRoutes = require('./routes/siswaRoutes');
const adminStanRoutes = require ('./routes/adminStanroutes');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/siswa', siswaRoutes);
app.use('/adminstan', adminStanRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
