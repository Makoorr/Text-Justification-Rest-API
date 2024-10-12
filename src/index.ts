import createServer from "./server";

const app = createServer();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello TicTac!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;