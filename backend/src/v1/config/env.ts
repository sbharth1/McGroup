import "dotenv/config";


export const ENV = {
  PORT: process.env.PORT || 5000,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "15m" ,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
};

if(!ENV.JWT_ACCESS_SECRET){
    throw new Error("JWT_ACCESS_SECRET is not defined in .env");
}

if(!ENV.JWT_REFRESH_SECRET){
    throw new Error("JWT_REFRESH_TOKEN is not defined in .env");
}