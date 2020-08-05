const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateLoginInput = require("../validation/login");

const appRouter = (app, fs) => {
    const dataPath = "./data/users.json";

    app.post("/login", (req, res) => {
        // Check validation
        const { errors, isValid } = validateLoginInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        fs.readFile(dataPath, "utf8", (err, data) => {
            if (err) {
                res.status(400).send(err);
            }

            const json = JSON.parse(data);
            let emailFound = false;
            var keys = Object.keys(json);

            for (key of keys) {
                if (json[key].email == req.body.email) {
                    emailFound = true;

                    // Compare password with hashed password in database
                    bcrypt.compare(req.body.password, json[key].password).then(isMatch => {
                        if (isMatch) {
                            const user = json[key];
                            const payload = {
                                email: user.email,
                                age: user.age,
                                isAdmin: user.isAdmin
                            };
                            // Create token
                            jwt.sign(
                                payload,
                                'secret', {
                                    expiresIn: 60 * 15 // 15 mins 
                                },
                                (err, token) => {
                                	if(err) {
                                		res.status(400).send(err);
                                	}
                                    res.status(200).json({
                                        token: "Bearer " + token,
                                        user: payload
                                    });
                                }
                            );
                        } else {
                            return res.status(403).json({ password: "Password incorrect" });
                        }
                    });
                }
            }

            if (!emailFound) {
                return res.status(403).json({ email: "Email not found" });
            }
        });
    });
}

module.exports = appRouter;