var http = require("http");
var nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'siphosethudyasi98@gmail.com',
        pass: '16Sipdya98!'
    }
});

let mailOption = {
    from: 'siphosethudyasi98@gmail.com',
    to: 'siphosethudyasi@gmail.com',
    subject: 'Testing and testing',
    text: 'IT works'
};

const data = JSON.stringify({
    utmSource: "i dont know what it is",
    emailAddress: "siphosethudyasi@gmail.com",
    message: "messageSent"
});

const options = {
    hostname: 'localhost',
    path: '/api/contact',
    port: 3000,
    method: 'POST',
    header: {
        'Content-Type': 'application/json'
    }
}

async function sendMail(jsonEmail, jsonMessage) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'siphosethudyasi98@gmail.com',
            pass: '16Sipdya98!'
        }
    });

    let mailOption = {
        from: 'siphosethudyasi98@gmail.com',
        to: jsonEmail,
        subject: 'Testing and testing',
        text: jsonMessage
    };

    transporter.sendMail(mailOption, function (err, data) {


        if (err) {
            console.log('Error Occurs', err);
        } else {
            console.log('Email sent!!!');
        }
    });
}

const req = http.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`)

    if (res.statusCode !== 200) {
        console.log(`error occured`)
        return
    }

    const contentType = res.headers["content-type"];
    console.log(`Content type: ${res.headers["content-type"]}`)
    if (contentType !== 'application/json') {
        console.log('cannot handle the data provided')
        return

    }

    let body = '';
    res.on('data', (chunk) => {
        //body += chunk;
        body += chunk.toString('utf8');
        try {
            const json = JSON.parse(data);
            console.log(`Json data is ${json}`);

            if (json["emailAddress"] == "") {
                console.log(`400 - BAD REQUEST empty values`);
                return

            } else if (json["emailAddress"] == null) {
                console.log(`400 - BAD REQUEST empty values`);
                return

            } else if (json["utmSource"] == "") {
                console.log(`400 - BAD REQUEST empty values`);
                return

            } else if (json["utmSource"] == null) {
                console.log(`400 - BAD REQUEST empty values`);
                return

            } else {
                sendMail(json["emailAddress"], json["message"]);
            }
        } catch (error) {
            console.log(`400 - BAD REQUEST`)
        }


    })
    /*
    res.on('data', (d) => {
        process.stdout.write(d)
    })
    */

    res.on('end', () => {
        console.log("Recieved data:", JSON.parse(data));

    })

})

/*
req.on('error', (error) => {
    console.error(error)
})*/

req.write(data)
req.end();
