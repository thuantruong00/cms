var express = require('express');
var router = express.Router();
var path = require('path');
const cors = require('cors')
const { PrismaClient } = require('@prisma/client');
// ===== ===== ===== =====
const cors_conf = require("../../config/config.json").cors;

const prisma = new PrismaClient();
// ===== ===== ===== =====
// ===== ===== router ===== =====
router.get('/',
  (req, res) => {



    res.render('website-page/test2', { layout: "./layouts/website.ejs", page_title: "this is my website" })
  }
);

router.get('/a',
  async (req, res) => {

    try {
      // Use the Prisma Client to create a new user
      const user = await prisma.user.create({
        data: {
          id: 'John Doe',
          email: 'john@example.com',
          pwd_hash: 'asdasodajsd'
        },
      });

      console.log('Created user:', user);
      res.send({ status: "oke" })
    } catch (error) {

      console.error('Error creating user:', error);
      res.send({ status: "error" })
    } finally {
      // Disconnect the Prisma Client
      await prisma.$disconnect();
      // res.send({status:false})
    }
  }

  // res.render('index', {data_page:"index"})
);

router.get('/user',
  async (req, res) => {

    try {
      // Use the Prisma Client to create a new user
      const user = await prisma.user.findUnique({
        where: {
          email: "john@example.com",
        },
      });

      if (user) {
        console.log('Found user by email:', user);
      } else {
        console.log('User not found');
      }
      res.send({ status: "oke" })
    } catch (error) {

      console.error('Error creating user:', error);
      res.send({ status: "error" })
    } finally {
      // Disconnect the Prisma Client
      await prisma.$disconnect();
      // res.send({status:false})
    }
  }

  // res.render('index', {data_page:"index"})
);

router.post('/test',
  cors(cors_conf),
  (req, res) => {
    res.render('layout')
  }
);


module.exports = router;
