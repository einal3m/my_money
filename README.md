# My Money

A simple web app for keeping track of personal finances.

This is my first Ruby on Rails app.

## Features

- Multiple bank accounts
- Categories/Subcategories for each transaction
- Import transactions from OFX files
- Automatically sets category and subcategory for transactions which match saved patterns
- Bank Reconciliation
- Income vs Expense reports

## To Do

- More reports
- Better account summaries
- Running totals when viewing transactions
- lots of other bugs, that I'm sure I'll find!

## Local development

Install dependencies:

```
bundle
yarn
```

Start the rails server and webpack (in separate terminals):

```
bin/rails s
bin/webpack-dev-server
```

The application is then available at http://localhost:3000

### Testing

Ruby unit tests:

```
bundle exec rake rspec:unit
```

Front-end tests:

```
yarn test
```

Rubocop:

```
bundle exec rake rubocop
```
