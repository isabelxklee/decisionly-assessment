# Decisionly Assessment

## Getting Started

1. Install Node.js.

2. Git clone this repository.

3. Install the project packages.

```
$ npm install
```

4. Start development server.

```
$ npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Approach

The purpose of this app is to extract key information from chargeback representment documents and present a concise summary of the parsed data, using the assistance of Open AI.

Decisionly's value prop is in helping issuers process disputes _at scale_ via automation. With this in mind, deciding which data points are the most important in assessing chargebacks is integral in building any kind of tool that processes these documents.

The purpose of representment documents is to allow merchants to make a case for why the transactions in the chargeback claims are in fact legitimate and should not be reversed by the issuer.

While the formatting and lengths of these documents may vary, all the provided sample documents (DoorDash, Peloton, Revolve) contained the same information:

- Reason code or explanation as to why the customer may have flagged the transaction
- Customer information (shipping and billing addresses, email address, any other relevant account information with the merchant, etc.)
- Date of purchase, amount, and customer's payment information
- Evidence of fraud prevention from the merchant
- Customer's previous history with the merchant
- Merchant communication with the customer
- Proof of services rendered (physical or digital)
- Approved transaction by the customer

From this research, I gathered that the most important data points to extract and present were the following:

- Concise summary of the transaction
- Evidence showing that the transaction was approved by the cardholder
- Proof of services rendered

## Future considerations

If I were given more time for this assignment, here are the things that I would have tackled:

- Become more comfortable with AI tooling
  - Write more sophisticated prompts.
  - Expand the JSON schema to contain more concise data points.
- Error handling
  - My use of error handling in this application is quite rudimentary. I think I rely too heavily on `if...else` statements and `console.log` statements when providing feedback to the user.
  - I would like to implement more sophisticated error handling and create better guard rails for checking file formats and the parsed data within them.
- Batch file upload
  - Since the value prop is to help merchants process disputes at scale, there will need to be infrastructure for handling many, _many_ file uploads and parsing data, while ensuring speed and accuracy
  - My application is built with the goal of processing one file at a time, but that's not realisitc for the proposed use case

## Tech Stack

- Next.js
- TypeScript
- Open AI
- PDF2JSON, FilePond
