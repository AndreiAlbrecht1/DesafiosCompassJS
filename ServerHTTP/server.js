const { createServer } = require('node:http');
const { URL } = require('node:url');

const hostname = '127.0.0.1';
const port = 3000;

let numeroCounter = 0;

const server = createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    try {

        const url = new URL(req.url, `http://${hostname}:${port}`);
        const pathParts = url.pathname.split('/').filter(Boolean);
        

        if (req.method === 'GET' && url.pathname === '/health-check') {

            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, timeStamp: `${(new Date().toISOString())}`}));

        } else if (req.method === 'GET' && (url.pathname === '/is-prime-number' || pathParts[0] === 'is-prime-number')) {

            let numero = 0

            if (pathParts.length > 1) {
                numero = Number(pathParts[1])
            } else {
                const queryParams = Object.fromEntries(url.searchParams.entries());
                numero = Number(queryParams.number);
            }

            function ehPrimo(numero) {
                if (numero < 2) return false;
                for (let i = 2; i < numero; i++) {
                    if (numero % i == 0) return false;
                }
                return true;
            }

            if (!isNaN(numero) && numero >= 1) {
                res.statusCode = 200;
                res.end(JSON.stringify({isPrime: ehPrimo(numero)}))
            } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "Invalid input" }));
            }

            

        } else if (req.method === 'POST' && url.pathname === '/count'){

            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () =>{
                try {
                    const data = JSON.parse(body);
                    const incrementBy = Number(data.incrementBy);
        
                    if (!isNaN(incrementBy)) {
                        numeroCounter += incrementBy;
                        res.statusCode = 200;
                        res.end(JSON.stringify({ counter: numeroCounter }));
                    } else {
                        res.statusCode = 400;
                        res.end(JSON.stringify({ error: "Invalid number format" }));
                    }
                } catch (error) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: "Invalid JSON body" }));
                }
            });
        } else {

            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Route not found' }));

        }
            
    } catch (error) {
        console.error(error)
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});