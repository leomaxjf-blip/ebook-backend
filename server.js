require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

// ===============================
// CONFIGURAÇÕES
// ===============================
const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

// ===============================
// CRIAR PAGAMENTO
// ===============================
app.post("/create-payment", async (req, res) => {
  const { email } = req.body;

  try {
    const response = await axios.post(
      "https://api.mercadopago.com/checkout/preferences",
      {
        items: [
          {
            title: "Ebook - A Mulher e o Relacionamento Atual",
            quantity: 1,
            unit_price: 29.99
          }
        ],
        payer: {
          email: email
        }
      },
      {
