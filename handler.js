'use strict';

module.exports.find = async (event, context) => {
  const moltin = require('@moltin/request')
	 
  const client = new moltin.createClient({
	 client_id: process.env.MOLTIN_CLIENT_ID,
	 client_secret: process.env.MOLTIN_CLIENT_SECRET
  })

  let body = JSON.parse(event.body);

  let emailToFind = body.email;

  let url = 'customers?filter=eq(email,' + emailToFind + ')';

  let res = await client.get(url)

  let mes;

  if(res.data.length == 0) {
  	mes = {found: false, customer: null}
  } else if(res.data.length == 1) {
  	mes = {found: true, multiple: false, customer: res.data[0]}
  } else {
  	mes = {found: true, multiple: true, customer: res.data}
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: mes,
      input: event,
    }),
  };

};
